/** Transforma las filas crudas del Excel en documentos públicos de Sanity + registro interno de proveedor. */
import {
  STORE_DESTINATIONS,
  STORE_DOC_TYPES,
  type StoreDestination,
  type StorePriority,
  type StoreProductStatus,
} from "../../lib/store-constants"
import { calcCostBase, calcMarginAmount, calcMillanPrice, toCop } from "./pricing"
import type {
  ImportOptions,
  ParsedCategory,
  PricingParams,
  PublicCategoryDoc,
  PublicProductDoc,
  RawProductRow,
  TransformResult,
} from "./types"

const EXTERNAL_ID_PREFIX = "MILLAN-"
const EXTERNAL_ID_DIGITS = 4
const SLUG_MAX_LENGTH = 96
const DESTINATION_SEPARATOR = " / " // con espacios: "Casa/Villa" es un único valor
const CATEGORY_PATTERN = /^(\d+)([a-z]?)\.\s*(.+)$/i
const CATEGORY_SPLIT = /\s+[—–]\s+/
const SUPPLIER_PATTERN = /maestri milano/i
const PRIORITIES: Record<string, StorePriority> = {
  esencial: "esencial",
  recomendado: "recomendado",
}
const ESTIMATED_PREFIX = "estimado"
const VERIFY_KEYWORD = "verificar"
const PUBLISHABLE_STATES = new Set(["precio online", "lista proveedor (pdf)"])

export function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, SLUG_MAX_LENGTH)
    .replace(/-+$/, "")
}

export function formatExternalId(num: number): string {
  return `${EXTERNAL_ID_PREFIX}${String(num).padStart(EXTERNAL_ID_DIGITS, "0")}`
}

const productDocId = (externalId: string) => `store-product-${externalId}`
const categoryDocId = (slug: string) => `store-category-${slug}`

/**
 * "3a. Cava premium — Whisky y bourbon" → padre "Cava premium" + hija "Whisky y bourbon".
 * "4. Vinos y licores italianos — Maestri Milano" → el proveedor se separa del nombre público.
 */
export function parseCategory(raw: string): ParsedCategory | null {
  const match = raw.trim().match(CATEGORY_PATTERN)
  if (!match) return null

  const [, numText, letter, name] = match
  const baseOrder = Number(numText)
  const parts = name.split(CATEGORY_SPLIT).map((part) => part.trim())

  if (parts.length === 2 && SUPPLIER_PATTERN.test(parts[1])) {
    return { raw, slug: slugify(parts[0]), title: parts[0], order: baseOrder, supplier: parts[1] }
  }

  if (parts.length === 2 && letter) {
    const parentTitle = parts[0]
    const letterOffset = (letter.toLowerCase().charCodeAt(0) - 96) / 100
    return {
      raw,
      slug: slugify(`${parentTitle} ${parts[1]}`),
      title: parts[1],
      order: baseOrder + letterOffset,
      parent: { slug: slugify(parentTitle), title: parentTitle, order: baseOrder },
    }
  }

  return { raw, slug: slugify(name), title: name, order: baseOrder + (letter ? (letter.toLowerCase().charCodeAt(0) - 96) / 100 : 0) }
}

function parseDestinations(value: string): { valid: StoreDestination[]; invalid: string[] } {
  const valid: StoreDestination[] = []
  const invalid: string[] = []
  for (const part of value.split(DESTINATION_SEPARATOR).map((p) => p.trim()).filter(Boolean)) {
    const match = STORE_DESTINATIONS.find((d) => d === part)
    if (!match) invalid.push(part)
    else if (!valid.includes(match)) valid.push(match)
  }
  return { valid, invalid }
}

function isValidUrl(value: string): boolean {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

function statusFromPriceState(
  priceState: string,
  options: ImportOptions
): { status: StoreProductStatus; kind: "publishable" | "estimated" | "review" | "unknown" } {
  const normalized = priceState.trim().toLowerCase()
  if (PUBLISHABLE_STATES.has(normalized)) return { status: "active", kind: "publishable" }
  if (normalized.startsWith(ESTIMATED_PREFIX)) return { status: "draft", kind: "estimated" }
  if (normalized.includes(VERIFY_KEYWORD)) return { status: options.reviewAs, kind: "review" }
  return { status: "draft", kind: "unknown" }
}

function toPositiveNumber(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) && value > 0 ? value : null
}

export function transformRows(
  rows: RawProductRow[],
  params: PricingParams,
  options: ImportOptions
): TransformResult {
  const result: TransformResult = {
    products: [],
    categories: [],
    supplier: [],
    skipped: [],
    differences: [],
    warnings: [],
    draftCount: 0,
    reviewDraftCount: 0,
    estimatedDraftCount: 0,
    priceSum: 0,
    excelCategoryCount: new Set(rows.map((r) => r.category).filter(Boolean)).size,
    perCategory: {},
  }

  const categoryDocs = new Map<string, PublicCategoryDoc>()
  const usedSlugs = new Set<string>()
  const seenNums = new Set<number>()

  const registerCategory = (parsed: ParsedCategory): string => {
    if (parsed.parent && !categoryDocs.has(parsed.parent.slug)) {
      categoryDocs.set(parsed.parent.slug, {
        _id: categoryDocId(parsed.parent.slug),
        _type: STORE_DOC_TYPES.category,
        title: parsed.parent.title,
        slug: { _type: "slug", current: parsed.parent.slug },
        order: parsed.parent.order,
      })
    }
    if (!categoryDocs.has(parsed.slug)) {
      categoryDocs.set(parsed.slug, {
        _id: categoryDocId(parsed.slug),
        _type: STORE_DOC_TYPES.category,
        title: parsed.title,
        slug: { _type: "slug", current: parsed.slug },
        order: parsed.order,
        ...(parsed.parent && {
          parent: { _type: "reference" as const, _ref: categoryDocId(parsed.parent.slug) },
        }),
      })
    }
    return categoryDocId(parsed.slug)
  }

  for (const row of rows) {
    const externalId = formatExternalId(row.num)
    const reasons: string[] = []

    if (seenNums.has(row.num)) reasons.push(`# duplicado (${row.num})`)
    if (!row.title) reasons.push("producto sin nombre")
    if (!row.category) reasons.push("categoría vacía")

    const parsedCategory = row.category ? parseCategory(row.category) : null
    if (row.category && !parsedCategory) reasons.push(`categoría con formato no reconocido: "${row.category}"`)

    const quantity = toPositiveNumber(row.quantity)
    if (quantity === null) reasons.push(`cantidad inválida: ${String(row.quantity)}`)

    const unitPrice = toPositiveNumber(row.unitPrice)
    if (unitPrice === null) reasons.push(`precio unitario inválido: ${String(row.unitPrice)}`)

    const destinations = parseDestinations(row.destination)
    if (destinations.valid.length === 0 && destinations.invalid.length === 0) reasons.push("destino vacío")
    if (destinations.invalid.length > 0) reasons.push(`destino inválido: ${destinations.invalid.join(", ")}`)

    if (row.link && !isValidUrl(row.link)) reasons.push(`URL inválida: ${row.link}`)

    if (reasons.length > 0 || quantity === null || unitPrice === null || !parsedCategory) {
      result.skipped.push({ excelRow: row.excelRow, num: row.num, title: row.title, reasons })
      continue
    }
    seenNums.add(row.num)

    const margin = options.marginOverride ?? params.margin
    const rounding = options.roundingOverride ?? params.rounding
    const costBase = calcCostBase(quantity, unitPrice)
    const marginAmount = calcMarginAmount(costBase, margin)
    const millanPrice = calcMillanPrice(quantity, unitPrice, margin, rounding)

    if (millanPrice <= 0) {
      result.skipped.push({ excelRow: row.excelRow, num: row.num, title: row.title, reasons: ["precio calculado <= 0"] })
      continue
    }

    const cachedCost = toCop(row.cachedCost)
    if (cachedCost !== null && cachedCost !== costBase) {
      result.differences.push({ externalId, excelRow: row.excelRow, field: "costo base", cached: cachedCost, recalculated: costBase })
    }
    const cachedPrice = toCop(row.cachedPrice)
    if (cachedPrice !== null && cachedPrice !== millanPrice) {
      result.differences.push({ externalId, excelRow: row.excelRow, field: "MILLAN PRICE", cached: cachedPrice, recalculated: millanPrice })
    }

    const { status, kind } = statusFromPriceState(row.priceState, options)
    if (kind === "unknown") result.warnings.push(`${externalId}: estado de precio desconocido "${row.priceState}" → borrador`)
    if (status === "draft") {
      result.draftCount++
      if (kind === "estimated") result.estimatedDraftCount++
      if (kind === "review") result.reviewDraftCount++
    }

    const priority = PRIORITIES[row.priority.trim().toLowerCase()]
    if (row.priority && !priority) result.warnings.push(`${externalId}: prioridad desconocida "${row.priority}" (se omite)`)

    // Slug único: nombre + presentación; si colisiona se desambigua con el # estable.
    let slug = slugify(`${row.title} ${row.presentation}`)
    if (!slug || usedSlugs.has(slug)) slug = slugify(`${slug}-${row.num}`)
    usedSlugs.add(slug)

    const categoryRef = registerCategory(parsedCategory)

    result.products.push({
      _id: productDocId(externalId),
      _type: STORE_DOC_TYPES.product,
      externalId,
      title: row.title,
      slug: { _type: "slug", current: slug },
      presentation: row.presentation,
      price: millanPrice,
      category: { _type: "reference", _ref: categoryRef },
      destinations: destinations.valid,
      ...(priority && { priority }),
      ...(row.note && { description: row.note }),
      status,
    })

    const listPrice = toCop(row.listPrice)
    result.supplier.push({
      externalId,
      excelRow: row.excelRow,
      quantity,
      source: row.source,
      foundProduct: row.foundProduct,
      unitPrice,
      listPrice,
      supplierDiscountDetected: listPrice !== null && listPrice > unitPrice,
      costBase,
      marginAmount,
      millanPrice,
      supplierLink: row.link || null,
      priceState: row.priceState,
      priceQueryDate: params.queryDate,
      ...(parsedCategory.supplier && { categorySupplier: parsedCategory.supplier }),
    })

    result.priceSum += millanPrice
    const stats = (result.perCategory[row.category] ??= { count: 0, sum: 0 })
    stats.count++
    stats.sum += millanPrice
  }

  result.categories = [...categoryDocs.values()].sort((a, b) => a.order - b.order)
  return result
}

/** Cantidad de categorías del Excel que produjeron al menos un producto válido (hojas, sin contar padres sintéticos). */
export function countLeafCategories(categories: PublicCategoryDoc[]): number {
  const parentIds = new Set(categories.map((c) => c.parent?._ref).filter(Boolean))
  return categories.filter((c) => !parentIds.has(c._id)).length
}


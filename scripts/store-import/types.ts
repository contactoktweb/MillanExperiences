/** Tipos compartidos por los módulos del importador de la tienda. */
import type {
  StoreDestination,
  StorePriority,
  StoreProductStatus,
} from "../../lib/store-constants"

export type ReviewMode = "draft" | "active"

export interface ImportOptions {
  filePath: string
  apply: boolean
  deactivateMissing: boolean
  /** Sobrescribe el margen de la hoja Parámetros (ej. 0.3). */
  marginOverride?: number
  /** Sobrescribe el redondeo de la hoja Parámetros (COP). */
  roundingOverride?: number
  /** Estado asignado a los productos "verificar". */
  reviewAs: ReviewMode
  expectedProducts: number
  expectedCategories: number
}

export interface PricingParams {
  margin: number
  rounding: number
  queryDate: string
}

/** Fila cruda de producto leída de la hoja principal (sin interpretar). */
export interface RawProductRow {
  excelRow: number
  num: number
  category: string
  title: string
  presentation: string
  quantity: unknown
  source: string
  foundProduct: string
  unitPrice: unknown
  listPrice: unknown
  cachedCost: unknown
  cachedMargin: unknown
  cachedPrice: unknown
  destination: string
  priority: string
  priceState: string
  link: string
  note: string
}

export interface SummaryRow {
  category: string
  products: number
  millanPriceSum: number
}

export interface ParsedCategory {
  /** Texto original de la celda (clave de conteo). */
  raw: string
  slug: string
  title: string
  order: number
  parent?: { slug: string; title: string; order: number }
  /** Proveedor indicado en el nombre (dato interno, no se publica). */
  supplier?: string
}

/** Documento público que se escribe en Sanity. */
export interface PublicProductDoc {
  _id: string
  _type: "storeProduct"
  externalId: string
  title: string
  slug: { _type: "slug"; current: string }
  presentation: string
  price: number
  category: { _type: "reference"; _ref: string }
  destinations: StoreDestination[]
  priority?: StorePriority
  description?: string
  status: StoreProductStatus
}

export interface PublicCategoryDoc {
  _id: string
  _type: "storeCategory"
  title: string
  slug: { _type: "slug"; current: string }
  order: number
  parent?: { _type: "reference"; _ref: string }
}

/** Datos internos: nunca van a Sanity (el dataset es público). */
export interface SupplierRecord {
  externalId: string
  excelRow: number
  quantity: number
  source: string
  foundProduct: string
  unitPrice: number
  listPrice: number | null
  supplierDiscountDetected: boolean
  costBase: number
  marginAmount: number
  millanPrice: number
  supplierLink: string | null
  priceState: string
  priceQueryDate: string
  categorySupplier?: string
}

export interface SkippedRow {
  excelRow: number
  num: number | null
  title: string
  reasons: string[]
}

export interface PriceDifference {
  externalId: string
  excelRow: number
  field: "costo base" | "MILLAN PRICE"
  cached: number
  recalculated: number
}

export interface TransformResult {
  products: PublicProductDoc[]
  categories: PublicCategoryDoc[]
  supplier: SupplierRecord[]
  skipped: SkippedRow[]
  differences: PriceDifference[]
  warnings: string[]
  draftCount: number
  reviewDraftCount: number
  estimatedDraftCount: number
  /** Suma de MILLAN PRICE de todos los productos válidos. */
  priceSum: number
  excelCategoryCount: number
  /** Conteo y suma de precios por texto original de categoría (para validar contra la hoja Resumen). */
  perCategory: Record<string, { count: number; sum: number }>
}

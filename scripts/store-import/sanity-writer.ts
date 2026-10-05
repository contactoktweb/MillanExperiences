/** Planificación (dry-run) y escritura atómica (apply) de los documentos de tienda en Sanity. */
import { createClient, type SanityClient } from "@sanity/client"
import { STORE_DOC_TYPES } from "../../lib/store-constants"
import type { PublicCategoryDoc, PublicProductDoc } from "./types"

const API_VERSION = "2024-01-01"
const DEFAULT_PROJECT_ID = "a94tk6u3"
const DEFAULT_DATASET = "production"

/** Campos que el script administra en productos. `mainImage` nunca se toca. */
const MANAGED_PRODUCT_FIELDS = [
  "externalId",
  "title",
  "slug",
  "presentation",
  "price",
  "category",
  "destinations",
  "priority",
  "description",
  "status",
] as const

type ManagedField = (typeof MANAGED_PRODUCT_FIELDS)[number]
type ExistingDoc = Record<string, unknown> & { _id: string }

export interface MissingProduct {
  id: string
  externalId: string | null
  title: string
  status: string
}

export interface WritePlan {
  products: { create: PublicProductDoc[]; update: PublicProductDoc[]; unchanged: string[] }
  categories: { create: PublicCategoryDoc[]; update: PublicCategoryDoc[]; unchanged: string[] }
  missing: MissingProduct[]
  deactivated: string[]
}

export function createSanityClient(requireToken: boolean): SanityClient {
  const token = process.env.SANITY_API_WRITE_TOKEN
  if (requireToken && !token) {
    throw new Error("SANITY_API_WRITE_TOKEN no está definido en .env.local (necesario para --apply).")
  }
  return createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || DEFAULT_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || DEFAULT_DATASET,
    apiVersion: API_VERSION,
    useCdn: false,
    token,
  })
}

function stableStringify(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(stableStringify).join(",")}]`
  if (value && typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>)
      .filter(([, v]) => v !== undefined)
      .sort(([a], [b]) => a.localeCompare(b))
    return `{${entries.map(([k, v]) => `${JSON.stringify(k)}:${stableStringify(v)}`).join(",")}}`
  }
  return JSON.stringify(value)
}

function sameFields(
  desired: Record<string, unknown>,
  existing: Record<string, unknown>,
  fields: readonly string[]
): boolean {
  return fields.every((field) => stableStringify(desired[field]) === stableStringify(existing[field]))
}

const CATEGORY_FIELDS = ["title", "slug", "order", "parent"] as const

export async function buildPlan(
  client: SanityClient,
  products: PublicProductDoc[],
  categories: PublicCategoryDoc[],
  deactivateMissing: boolean
): Promise<WritePlan> {
  const ids = [...products.map((p) => p._id), ...categories.map((c) => c._id)]
  const existingDocs = await client.fetch<ExistingDoc[]>(`*[_id in $ids]`, { ids })
  const existingById = new Map(existingDocs.map((doc) => [doc._id, doc]))

  const plan: WritePlan = {
    products: { create: [], update: [], unchanged: [] },
    categories: { create: [], update: [], unchanged: [] },
    missing: [],
    deactivated: [],
  }

  for (const category of categories) {
    const existing = existingById.get(category._id)
    if (!existing) plan.categories.create.push(category)
    else if (sameFields({ ...category }, existing, CATEGORY_FIELDS)) plan.categories.unchanged.push(category._id)
    else plan.categories.update.push(category)
  }

  for (const product of products) {
    const existing = existingById.get(product._id)
    if (!existing) plan.products.create.push(product)
    else if (sameFields({ ...product }, existing, MANAGED_PRODUCT_FIELDS)) plan.products.unchanged.push(product._id)
    else plan.products.update.push(product)
  }

  const importedExternalIds = products.map((p) => p.externalId)
  plan.missing = (
    await client.fetch<{ _id: string; externalId?: string; title: string; status?: string }[]>(
      `*[_type == $type && !(externalId in $externalIds)]{_id, externalId, title, status}`,
      { type: STORE_DOC_TYPES.product, externalIds: importedExternalIds }
    )
  ).map((doc) => ({
    id: doc._id,
    externalId: doc.externalId ?? null,
    title: doc.title,
    status: doc.status ?? "active",
  }))

  if (deactivateMissing) {
    plan.deactivated = plan.missing.filter((doc) => doc.status === "active").map((doc) => doc.id)
  }

  return plan
}

/** Escribe todo en UNA transacción de Sanity: si algo falla, no se aplica nada. */
export async function applyPlan(client: SanityClient, plan: WritePlan): Promise<void> {
  const transaction = client.transaction()

  // Las categorías van primero para que las referencias de los productos existan al confirmar.
  for (const category of [...plan.categories.create, ...plan.categories.update]) {
    transaction.createOrReplace(category)
  }

  for (const product of plan.products.create) {
    transaction.create(product)
  }

  for (const product of plan.products.update) {
    const setFields: Partial<Record<ManagedField, unknown>> = {}
    const unsetFields: ManagedField[] = []
    for (const field of MANAGED_PRODUCT_FIELDS) {
      const value = (product as unknown as Record<string, unknown>)[field]
      if (value === undefined) unsetFields.push(field)
      else setFields[field] = value
    }
    transaction.patch(product._id, (patch) => {
      const withSet = patch.set(setFields)
      return unsetFields.length > 0 ? withSet.unset(unsetFields) : withSet
    })
  }

  for (const id of plan.deactivated) {
    transaction.patch(id, (patch) => patch.set({ status: "draft" }))
  }

  await transaction.commit()
}


/** Constantes compartidas entre el esquema de Sanity, el script de importación y el front de la tienda. */

export const STORE_DESTINATIONS = ["Casa/Villa", "Lancha", "Yate"] as const
export type StoreDestination = (typeof STORE_DESTINATIONS)[number]

export const STORE_PRIORITIES = [
  { title: "Esencial", value: "esencial" },
  { title: "Recomendado", value: "recomendado" },
] as const
export type StorePriority = (typeof STORE_PRIORITIES)[number]["value"]

export const STORE_PRODUCT_STATUSES = [
  { title: "Activo", value: "active" },
  { title: "Borrador (oculto)", value: "draft" },
] as const
export type StoreProductStatus = (typeof STORE_PRODUCT_STATUSES)[number]["value"]

export const STORE_DOC_TYPES = {
  product: "storeProduct",
  category: "storeCategory",
} as const

import type { StoreDestination, StorePriority } from "./store-constants"

/** Producto tal como lo consume el front: solo campos públicos (nunca costos ni datos de proveedor). */
export interface StoreProduct {
  id: string
  name: string
  presentation: string
  priceCOP: number
  categoryId: string
  categoryLabel: string
  /** Categoría principal (para "Cava premium" es el padre; en el resto, la misma categoría). */
  groupId: string
  description?: string
  image?: string
  priority?: StorePriority
  destinations: StoreDestination[]
}

export interface StoreCategoryOption {
  id: string
  label: string
}

export interface StoreCategoryGroup extends StoreCategoryOption {
  children: StoreCategoryOption[]
}

export interface StoreCatalog {
  products: StoreProduct[]
  groups: StoreCategoryGroup[]
}

export const PRIORITY_LABELS: Record<StorePriority, string> = {
  esencial: "Esencial",
  recomendado: "Recomendado",
}

export function formatCOP(price: number): string {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(price)
}

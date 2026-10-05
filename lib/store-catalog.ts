import { client } from "@/sanity/lib/client"
import type { StoreCatalog, StoreCategoryGroup, StoreProduct } from "./store-data"

const REVALIDATE_SECONDS = 60

/** Solo proyecta campos públicos y productos activos; los borradores nunca llegan al front. */
const PRODUCTS_QUERY = `*[_type == "storeProduct" && status == "active"]{
  "id": externalId,
  "name": title,
  presentation,
  "priceCOP": price,
  priority,
  description,
  "destinations": coalesce(destinations, []),
  "image": mainImage.asset->url,
  "categoryId": category->slug.current,
  "categoryLabel": category->title,
  "groupId": coalesce(category->parent->slug.current, category->slug.current),
  "groupLabel": coalesce(category->parent->title, category->title),
  "groupOrder": coalesce(category->parent->order, category->order),
  "categoryOrder": category->order
}`

type ProductRow = StoreProduct & {
  groupLabel: string
  groupOrder: number
  categoryOrder: number
}

function buildGroups(rows: ProductRow[]): StoreCategoryGroup[] {
  const groups = new Map<string, StoreCategoryGroup & { order: number }>()
  const childOrder = new Map<string, number>()

  for (const row of rows) {
    const group = groups.get(row.groupId) ?? {
      id: row.groupId,
      label: row.groupLabel,
      order: row.groupOrder,
      children: [],
    }
    if (row.categoryId !== row.groupId && !group.children.some((c) => c.id === row.categoryId)) {
      group.children.push({ id: row.categoryId, label: row.categoryLabel })
      childOrder.set(row.categoryId, row.categoryOrder)
    }
    groups.set(row.groupId, group)
  }

  return [...groups.values()]
    .sort((a, b) => a.order - b.order)
    .map(({ order: _order, ...group }) => ({
      ...group,
      children: group.children.sort((a, b) => (childOrder.get(a.id) ?? 0) - (childOrder.get(b.id) ?? 0)),
    }))
}

export async function fetchStoreCatalog(): Promise<StoreCatalog> {
  const rows = await client.fetch<ProductRow[]>(PRODUCTS_QUERY, {}, { next: { revalidate: REVALIDATE_SECONDS } })

  const sorted = [...rows].sort(
    (a, b) =>
      a.groupOrder - b.groupOrder ||
      a.categoryOrder - b.categoryOrder ||
      a.name.localeCompare(b.name, "es")
  )

  const products: StoreProduct[] = sorted.map(
    ({ groupLabel: _groupLabel, groupOrder: _groupOrder, categoryOrder: _categoryOrder, image, ...product }) => ({
      ...product,
      image: image ?? undefined,
    })
  )

  return { products, groups: buildGroups(sorted) }
}

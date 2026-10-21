// Renders one or more schema.org objects as a JSON-LD script tag.
export function JsonLd({ data }: { data: object | (object | null)[] | null }) {
  const items = (Array.isArray(data) ? data : [data]).filter(Boolean)
  if (items.length === 0) return null
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(items.length === 1 ? items[0] : items).replace(/</g, "\\u003c"),
      }}
    />
  )
}

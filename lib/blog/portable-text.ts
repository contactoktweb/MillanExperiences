/*
  Converts seed articles (SeedBlock plus inline bold, italic and link syntax)
  into Sanity Portable Text, so seeds and CMS posts share one renderer.
  Used at runtime (fallback) and by scripts/blog-import.ts.
*/
import type { PortableTextNode, SeedBlock } from "./types"

const INLINE = /(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)\s]+\))/g

export function inlineToBlock(
  text: string,
  key: string,
  extra: Record<string, unknown> = {},
): PortableTextNode {
  const markDefs: { _type: "link"; _key: string; href: string }[] = []
  const children = text
    .split(INLINE)
    .filter(Boolean)
    .map((part, i) => {
      const span = { _type: "span", _key: `${key}s${i}`, text: part, marks: [] as string[] }
      const link = part.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/)
      if (part.startsWith("**") && part.endsWith("**")) {
        span.text = part.slice(2, -2)
        span.marks = ["strong"]
      } else if (link) {
        const markKey = `${key}l${i}`
        markDefs.push({ _type: "link", _key: markKey, href: link[2] })
        span.text = link[1]
        span.marks = [markKey]
      } else if (part.length > 2 && part.startsWith("*") && part.endsWith("*")) {
        span.text = part.slice(1, -1)
        span.marks = ["em"]
      }
      return span
    })
  return { _type: "block", _key: key, style: "normal", markDefs, children, ...extra }
}

export function seedToPortableText(blocks: SeedBlock[], prefix = "b"): PortableTextNode[] {
  const out: PortableTextNode[] = []
  blocks.forEach((block, i) => {
    const key = `${prefix}${i}`
    switch (block.type) {
      case "h2":
      case "h3":
        out.push(inlineToBlock(block.text, key, { style: block.type }))
        break
      case "quote":
        out.push(inlineToBlock(block.text, key, { style: "blockquote" }))
        break
      case "ul":
      case "ol":
        block.items.forEach((item, j) =>
          out.push(
            inlineToBlock(item, `${key}i${j}`, {
              listItem: block.type === "ul" ? "bullet" : "number",
              level: 1,
            }),
          ),
        )
        break
      case "tip":
        out.push({ _type: "blogCallout", _key: key, title: block.title, text: block.text })
        break
      default:
        out.push(inlineToBlock(block.text, key))
    }
  })
  return out
}

export function blockPlainText(node: PortableTextNode): string {
  if (node._type === "block") return (node.children || []).map((c: any) => c.text || "").join("")
  if (node._type === "blogCallout") return `${node.title || ""} ${node.text || ""}`
  if (node._type === "image") return node.caption || ""
  return ""
}

export function headingId(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80)
}

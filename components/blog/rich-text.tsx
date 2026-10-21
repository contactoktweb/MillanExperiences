import Link from "next/link"
import type { ReactNode } from "react"
import type { BlogBlock } from "@/lib/blog"

// Inline syntax: **bold**, *italic* and [label](href).
const INLINE = /(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)\s]+\))/g

export function InlineText({ text }: { text: string }) {
  const parts = text.split(INLINE).filter(Boolean)
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={i} className="font-medium text-[var(--color-text-dark)]">
              {part.slice(2, -2)}
            </strong>
          )
        }
        const link = part.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/)
        if (link) {
          const [, label, href] = link
          const cls =
            "text-[var(--color-deep-sea)] underline decoration-[var(--color-sand)] decoration-1 underline-offset-4 transition-colors hover:text-[var(--color-dark-sand)]"
          return href.startsWith("/") ? (
            <Link key={i} href={href} className={cls}>
              {label}
            </Link>
          ) : (
            <a key={i} href={href} target="_blank" rel="noopener noreferrer" className={cls}>
              {label}
            </a>
          )
        }
        if (part.length > 2 && part.startsWith("*") && part.endsWith("*")) {
          return <em key={i}>{part.slice(1, -1)}</em>
        }
        return part
      })}
    </>
  )
}

export function BlogBody({ blocks }: { blocks: BlogBlock[] }) {
  return (
    <div className="font-sans text-[1.0625rem] font-light leading-[1.85] text-[var(--color-text-dark)]/85">
      {blocks.map((block, i) => renderBlock(block, i))}
    </div>
  )
}

function renderBlock(block: BlogBlock, key: number): ReactNode {
  switch (block.type) {
    case "h2":
      return (
        <h2
          key={key}
          id={block.id}
          className="display mt-16 mb-6 scroll-mt-32 text-[clamp(1.85rem,3vw,2.5rem)] leading-tight text-[var(--color-text-dark)] first:mt-0"
        >
          {block.text}
        </h2>
      )
    case "h3":
      return (
        <h3 key={key} className="mt-10 mb-4 font-serif text-2xl text-[var(--color-text-dark)]">
          {block.text}
        </h3>
      )
    case "ul":
      return (
        <ul key={key} className="my-6 space-y-3">
          {block.items.map((item, j) => (
            <li key={j} className="relative pl-6">
              <span aria-hidden className="absolute left-0 top-[0.85em] h-px w-3 bg-[var(--color-sand)]" />
              <InlineText text={item} />
            </li>
          ))}
        </ul>
      )
    case "ol":
      return (
        <ol key={key} className="my-6 space-y-4">
          {block.items.map((item, j) => (
            <li key={j} className="relative pl-10">
              <span
                aria-hidden
                className="absolute left-0 top-0 font-serif text-xl leading-[1.6] text-[var(--color-sand)]"
              >
                {String(j + 1).padStart(2, "0")}
              </span>
              <InlineText text={item} />
            </li>
          ))}
        </ol>
      )
    case "tip":
      return (
        <aside
          key={key}
          className="my-10 border-l-2 border-[var(--color-sand)] bg-[var(--color-card)] px-6 py-6 md:px-8"
        >
          <p className="eyebrow text-[var(--color-dark-sand)]">{block.title}</p>
          <p className="mt-3 text-[var(--color-text-dark)]/85">
            <InlineText text={block.text} />
          </p>
        </aside>
      )
    case "quote":
      return (
        <blockquote
          key={key}
          className="my-12 font-serif text-[clamp(1.5rem,2.5vw,2rem)] italic leading-snug text-[var(--color-deep-sea)]"
        >
          “<InlineText text={block.text} />”
        </blockquote>
      )
    default:
      return (
        <p key={key} className="my-6">
          <InlineText text={block.text} />
        </p>
      )
  }
}

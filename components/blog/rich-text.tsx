import Image from "next/image"
import Link from "next/link"
import { PortableText, type PortableTextComponents } from "next-sanity"
import { headingId, type PortableTextNode } from "@/lib/blog"

// Inline syntax for plain-text fields (takeaways): **bold**, *italic*, [label](href).
const INLINE = /(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)\s]+\))/g

const linkClass =
  "text-[var(--color-deep-sea)] underline decoration-[var(--color-sand)] decoration-1 underline-offset-4 transition-colors hover:text-[var(--color-dark-sand)]"

function SmartLink({ href, children }: { href: string; children: React.ReactNode }) {
  return href.startsWith("/") ? (
    <Link href={href} className={linkClass}>
      {children}
    </Link>
  ) : (
    <a href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
      {children}
    </a>
  )
}

export function InlineText({ text }: { text: string }) {
  return (
    <>
      {text
        .split(INLINE)
        .filter(Boolean)
        .map((part, i) => {
          if (part.startsWith("**") && part.endsWith("**")) {
            return (
              <strong key={i} className="font-medium text-[var(--color-text-dark)]">
                {part.slice(2, -2)}
              </strong>
            )
          }
          const link = part.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/)
          if (link) return <SmartLink key={i} href={link[2]}>{link[1]}</SmartLink>
          if (part.length > 2 && part.startsWith("*") && part.endsWith("*")) {
            return <em key={i}>{part.slice(1, -1)}</em>
          }
          return part
        })}
    </>
  )
}

function nodeText(value: any): string {
  return (value?.children || []).map((c: any) => c.text || "").join("")
}

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="my-6">{children}</p>,
    h2: ({ children, value }) => (
      <h2
        id={headingId(nodeText(value))}
        className="display mt-16 mb-6 scroll-mt-32 text-[clamp(1.85rem,3vw,2.5rem)] leading-tight text-[var(--color-text-dark)] first:mt-0"
      >
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-10 mb-4 font-serif text-2xl text-[var(--color-text-dark)]">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-12 font-serif text-[clamp(1.5rem,2.5vw,2rem)] italic leading-snug text-[var(--color-deep-sea)]">
        “{children}”
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="my-6 space-y-3">{children}</ul>,
    number: ({ children }) => <ol className="my-6 space-y-4 [counter-reset:item]">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="relative pl-6">
        <span aria-hidden className="absolute left-0 top-[0.85em] h-px w-3 bg-[var(--color-sand)]" />
        {children}
      </li>
    ),
    number: ({ children, index }) => (
      <li className="relative pl-10">
        <span aria-hidden className="absolute left-0 top-0 font-serif text-xl leading-[1.6] text-[var(--color-sand)]">
          {String(index + 1).padStart(2, "0")}
        </span>
        {children}
      </li>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-medium text-[var(--color-text-dark)]">{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    link: ({ children, value }) => (value?.href ? <SmartLink href={value.href}>{children}</SmartLink> : <>{children}</>),
  },
  types: {
    blogCallout: ({ value }) => (
      <aside className="my-10 border-l-2 border-[var(--color-sand)] bg-[var(--color-card)] px-6 py-6 md:px-8">
        {value?.title && <p className="eyebrow text-[var(--color-dark-sand)]">{value.title}</p>}
        <p className="mt-3 whitespace-pre-line text-[var(--color-text-dark)]/85">{value?.text}</p>
      </aside>
    ),
    image: ({ value }) => {
      if (!value?.url) return null
      const width = value.dimensions?.width || 1600
      const height = value.dimensions?.height || 1067
      return (
        <figure className="my-12">
          <Image
            src={value.url}
            alt={value.alt || ""}
            width={width}
            height={height}
            sizes="(min-width: 1024px) 720px, 100vw"
            placeholder={value.lqip ? "blur" : "empty"}
            blurDataURL={value.lqip || undefined}
            className="h-auto w-full rounded-[min(var(--radius-lg),16px)] object-cover"
          />
          {value.caption && (
            <figcaption className="mt-3 font-sans text-sm font-light text-[var(--color-blue-gray)]">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
  },
}

export function BlogBody({ value }: { value: PortableTextNode[] }) {
  return (
    <div className="font-sans text-[1.0625rem] font-light leading-[1.85] text-[var(--color-text-dark)]/85">
      <PortableText value={value as any} components={components} />
    </div>
  )
}

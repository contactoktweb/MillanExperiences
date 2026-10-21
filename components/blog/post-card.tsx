import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { formatPostDate, readingMinutes, type BlogPost, type Locale } from "@/lib/blog"

const t = {
  en: { read: "Read article", min: "min read" },
  es: { read: "Leer artículo", min: "min de lectura" },
}

export function PostMeta({ post, locale, className }: { post: BlogPost; locale: Locale; className?: string }) {
  return (
    <p className={cn("font-sans text-[0.7rem] uppercase tracking-[0.18em]", className)}>
      <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt, locale)}</time>
      <span aria-hidden className="mx-2.5 opacity-50">·</span>
      {readingMinutes(post, locale)} {t[locale].min}
    </p>
  )
}

export function PostCard({ post, locale, featured = false }: { post: BlogPost; locale: Locale; featured?: boolean }) {
  const c = post.content[locale]
  const href = `/blog/${post.slug}`

  return (
    <article
      className={cn(
        "group flex flex-col overflow-hidden rounded-[min(var(--radius-lg),16px)] bg-[var(--color-warm-white)] shadow-sm transition-shadow duration-500 hover:shadow-md",
        featured && "lg:grid lg:grid-cols-[1.25fr_1fr]",
      )}
    >
      <Link
        href={href}
        tabIndex={-1}
        aria-hidden
        className={cn(
          "relative block w-full overflow-hidden bg-[var(--color-deep-sea)]",
          featured ? "aspect-[4/3] lg:aspect-auto lg:min-h-[480px]" : "aspect-[4/3]",
        )}
      >
        <Image
          src={post.image}
          alt={c.imageAlt}
          fill
          sizes={featured ? "(min-width: 1024px) 60vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"}
          className="object-cover transition-transform duration-[900ms] ease-[var(--ease-editorial)] group-hover:scale-105"
        />
      </Link>
      <div className={cn("flex flex-1 flex-col p-8", featured && "lg:justify-center lg:p-14")}>
        <p className="eyebrow text-[var(--color-dark-sand)]">{c.category}</p>
        <h3
          className={cn(
            "mt-4 font-serif leading-tight text-[var(--color-text-dark)] transition-colors group-hover:text-[var(--color-deep-sea)]",
            featured ? "text-[clamp(1.85rem,3vw,2.75rem)]" : "text-2xl",
          )}
        >
          <Link href={href}>{c.title}</Link>
        </h3>
        <p
          className={cn(
            "mt-4 font-sans font-light leading-relaxed text-[var(--color-blue-gray)]",
            featured ? "text-base md:text-lg" : "text-sm line-clamp-3",
          )}
        >
          {c.description}
        </p>
        <PostMeta post={post} locale={locale} className="mt-6 text-[var(--color-blue-gray)]" />
        <Link
          href={href}
          className="mt-6 inline-flex w-fit items-center gap-2 font-sans text-[0.72rem] font-medium uppercase tracking-[0.22em] text-[var(--color-deep-sea)] transition-colors hover:text-[var(--color-dark-sand)]"
        >
          <span className="link-underline">{t[locale].read}</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1" strokeWidth={1.5} />
        </Link>
      </div>
    </article>
  )
}

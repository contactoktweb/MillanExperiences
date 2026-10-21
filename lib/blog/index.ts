import { cache } from "react"
import { client } from "@/sanity/lib/client"
import { blogPostsQuery } from "@/sanity/lib/queries"
import type { BlogPost, BlogPostContent, Locale, SeedPost } from "./types"
import { blockPlainText, seedToPortableText } from "./portable-text"
import { seedPosts } from "./seed"

export type { BlogPost, BlogPostContent, Locale, PortableTextNode } from "./types"
export { headingId } from "./portable-text"

/* ---------- Normalizers ---------- */

function fromSeed(post: SeedPost, index: number): BlogPost {
  const content = (locale: Locale): BlogPostContent => {
    const c = post.content[locale]
    return { ...c, body: seedToPortableText(c.body, `${locale}b`) }
  }
  return {
    slug: post.slug,
    image: post.image,
    publishedAt: post.publishedAt,
    updatedAt: post.updatedAt,
    featured: index === 0,
    keywords: post.keywords,
    related: post.related,
    content: { en: content("en"), es: content("es") },
  }
}

function fromSanity(doc: any): BlogPost | null {
  const en = doc.contentEn
  if (!doc.slug || !doc.image || !en?.title) return null
  // Spanish falls back to English when it has not been written yet.
  const es = doc.contentEs?.title && doc.contentEs?.body?.length ? doc.contentEs : en
  const content = (c: any, locale: Locale): BlogPostContent => ({
    title: c.title,
    metaTitle: c.seo?.metaTitle || undefined,
    description: c.description || "",
    metaDescription: c.seo?.metaDescription || undefined,
    category: (locale === "es" ? doc.category?.titleEs : doc.category?.titleEn) || doc.category?.titleEn || "",
    imageAlt: (locale === "es" ? doc.imageAltEs : doc.imageAltEn) || doc.imageAltEn || c.title,
    takeaways: (c.takeaways || []).filter(Boolean),
    body: c.body || [],
    faqs: (c.faqs || []).filter((f: any) => f?.question && f?.answer),
    cta: {
      title: c.cta?.title || (locale === "es" ? "¿Listo para planear tu viaje?" : "Ready to plan your trip?"),
      text:
        c.cta?.text ||
        (locale === "es"
          ? "Cuéntanos cómo imaginas tu viaje y nuestro concierge diseñará cada detalle."
          : "Tell us how you imagine your trip and our concierge will design every detail."),
      label: c.cta?.label || (locale === "es" ? "Comenzar a planear" : "Start planning"),
      href: c.cta?.href || "/contact",
    },
  })
  const date = (v?: string) => (v || "").slice(0, 10)
  return {
    slug: doc.slug,
    image: doc.image,
    publishedAt: date(doc.publishedAt),
    updatedAt: date(doc.updatedAt || doc._updatedAt || doc.publishedAt),
    featured: Boolean(doc.featured),
    keywords: doc.keywords || [],
    related: (doc.relatedLinks || [])
      .filter((r: any) => r?.href)
      .map((r: any) => ({ href: r.href, label: { en: r.labelEn || r.labelEs, es: r.labelEs || r.labelEn } })),
    content: { en: content(en, "en"), es: content(es, "es") },
  }
}

/* ---------- Data access ---------- */

// Posts come from Sanity. Until the first post is published there (run
// `pnpm blog:import`), the seed articles keep /blog populated.
export const getAllPosts = cache(async (): Promise<BlogPost[]> => {
  let posts: BlogPost[] = []
  try {
    const docs = await client.fetch(blogPostsQuery)
    posts = (docs || []).map(fromSanity).filter(Boolean) as BlogPost[]
  } catch (error) {
    console.error("[blog] Could not load posts from Sanity", error)
  }
  if (posts.length === 0) posts = seedPosts.map(fromSeed)

  // Featured first, then newest first.
  return posts.sort(
    (a, b) => Number(b.featured) - Number(a.featured) || b.publishedAt.localeCompare(a.publishedAt),
  )
})

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  return (await getAllPosts()).find((p) => p.slug === slug)
}

export function getRelatedPosts(all: BlogPost[], slug: string, limit = 3): BlogPost[] {
  return all
    .filter((p) => p.slug !== slug)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, limit)
}

export function readingMinutes(post: BlogPost, locale: Locale): number {
  const c = post.content[locale]
  const text = [
    ...c.takeaways,
    ...c.body.map(blockPlainText),
    ...c.faqs.map((f) => `${f.question} ${f.answer}`),
  ].join(" ")
  return Math.max(1, Math.round(text.split(/\s+/).length / 220))
}

export function formatPostDate(iso: string, locale: Locale): string {
  return new Date(`${iso.slice(0, 10)}T12:00:00Z`).toLocaleDateString(locale === "es" ? "es-CO" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  })
}

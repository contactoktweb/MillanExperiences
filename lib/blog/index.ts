import type { BlogBlock, BlogPost, Locale } from "./types"
import { rosarioIslands } from "./posts/rosario-islands"
import { bestTimeCartagena } from "./posts/best-time-cartagena"
import { yachtCharter } from "./posts/yacht-charter"
import { bachelorParty } from "./posts/bachelor-party"
import { destinationWedding } from "./posts/destination-wedding"

export type { BlogPost, BlogBlock, Locale } from "./types"

// Newest first; ties keep this order (the first post is featured on /blog).
const posts: BlogPost[] = [
  rosarioIslands,
  bestTimeCartagena,
  yachtCharter,
  destinationWedding,
  bachelorParty,
]

export function getAllPosts(): BlogPost[] {
  return [...posts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug)
}

export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  return getAllPosts().filter((p) => p.slug !== slug).slice(0, limit)
}

function blockText(block: BlogBlock): string {
  if (block.type === "ul" || block.type === "ol") return block.items.join(" ")
  if (block.type === "tip") return `${block.title} ${block.text}`
  return block.text
}

export function readingMinutes(post: BlogPost, locale: Locale): number {
  const c = post.content[locale]
  const text = [...c.takeaways, ...c.body.map(blockText), ...c.faqs.map((f) => `${f.question} ${f.answer}`)].join(" ")
  return Math.max(1, Math.round(text.split(/\s+/).length / 220))
}

export function formatPostDate(iso: string, locale: Locale): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString(locale === "es" ? "es-CO" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  })
}

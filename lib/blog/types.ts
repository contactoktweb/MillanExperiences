/*
  Blog content model.

  BlogPost is what the pages render. It is normalized from Sanity
  (`blogPost` documents) or, when the dataset has no posts yet, from the
  seed articles in ./seed (the same ones `pnpm blog:import` uploads).
  The body is Portable Text in both cases.
*/
export type Locale = "en" | "es"

// Minimal Portable Text node shape (blocks, images and callouts).
export type PortableTextNode = { _type: string; _key: string; [key: string]: any }

export type BlogFaq = { question: string; answer: string }

export type BlogPostContent = {
  title: string
  // Optional shorter <title> for search results (falls back to title).
  metaTitle?: string
  // Hero intro / card excerpt.
  description: string
  // <meta name="description"> (falls back to description).
  metaDescription?: string
  category: string
  imageAlt: string
  // "In short" answer-first summary — the block AI answer engines quote.
  takeaways: string[]
  body: PortableTextNode[]
  faqs: BlogFaq[]
  cta: { title: string; text: string; label: string; href: string }
}

export type BlogPost = {
  slug: string
  image: string
  publishedAt: string
  updatedAt: string
  featured: boolean
  keywords: string[]
  // Service pages this article supports (internal linking + "Plan it with us").
  related: { href: string; label: Record<Locale, string> }[]
  content: Record<Locale, BlogPostContent>
}

/* ---------- Seed articles (source for the Sanity importer) ---------- */

// Paragraph-level text supports **bold**, *italic* and [label](/href).
export type SeedBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string; id: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "tip"; title: string; text: string }
  | { type: "quote"; text: string }

export type SeedPostContent = Omit<BlogPostContent, "body" | "metaDescription"> & {
  metaDescription: string
  body: SeedBlock[]
}

export type SeedPost = {
  slug: string
  image: string
  publishedAt: string
  updatedAt: string
  keywords: string[]
  related: { href: string; label: Record<Locale, string> }[]
  content: Record<Locale, SeedPostContent>
}

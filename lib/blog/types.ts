/*
  Blog content model. Posts are bilingual (EN/ES) and live in code so they
  render without depending on the CMS. Paragraph-level text supports a tiny
  inline syntax: **bold** and [label](/internal-or-external-url).
*/
export type Locale = "en" | "es"

export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string; id: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "tip"; title: string; text: string }
  | { type: "quote"; text: string }

export type BlogFaq = { question: string; answer: string }

export type BlogPostContent = {
  title: string
  // Optional shorter <title> for search results (falls back to title).
  metaTitle?: string
  // Hero intro / card excerpt.
  description: string
  // <meta name="description"> (≤155 chars).
  metaDescription: string
  category: string
  imageAlt: string
  // "In short" answer-first summary — the block AI answer engines quote.
  takeaways: string[]
  body: BlogBlock[]
  faqs: BlogFaq[]
  cta: { title: string; text: string; label: string; href: string }
}

export type BlogPost = {
  slug: string
  image: string
  publishedAt: string
  updatedAt: string
  keywords: string[]
  // Service pages this article supports (internal linking + "Plan it with us").
  related: { href: string; label: Record<Locale, string> }[]
  content: Record<Locale, BlogPostContent>
}

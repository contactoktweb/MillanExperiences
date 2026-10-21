import type { MetadataRoute } from "next"
import { client } from "@/sanity/lib/client"
import { getAllPosts } from "@/lib/blog"
import { SITE_URL } from "@/lib/seo"

export const revalidate = 3600

type SanityPath = { slug: string; _updatedAt?: string }
type ListingPath = SanityPath & { properties?: SanityPath[] }

const sitemapQuery = `{
  "services": *[_type == "servicePage" && defined(slug.current)]{ "slug": slug.current, _updatedAt },
  "pages": *[_type in ["listingPage", "eventPage"] && defined(slug.current)]{
    "slug": slug.current,
    _updatedAt,
    "properties": *[_type == ^.slug.current && defined(slug.current)]{ "slug": slug.current, _updatedAt }
  }
}`

// The private store (/tienda) is intentionally excluded.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const url = (path: string) => `${SITE_URL}${path}`
  const posts = await getAllPosts()

  const entries: MetadataRoute.Sitemap = [
    { url: url("/"), changeFrequency: "weekly", priority: 1 },
    { url: url("/about"), changeFrequency: "monthly", priority: 0.7 },
    { url: url("/contact"), changeFrequency: "yearly", priority: 0.6 },
    { url: url("/blog"), lastModified: posts[0]?.updatedAt, changeFrequency: "weekly", priority: 0.8 },
    ...posts.map((post) => ({
      url: url(`/blog/${post.slug}`),
      lastModified: post.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      images: [url(post.image)],
    })),
  ]

  try {
    const data = await client.fetch<{ services: SanityPath[]; pages: ListingPath[] }>(sitemapQuery)
    for (const s of data?.services || []) {
      entries.push({ url: url(`/services/${s.slug}`), lastModified: s._updatedAt, changeFrequency: "monthly", priority: 0.8 })
    }
    for (const page of data?.pages || []) {
      entries.push({ url: url(`/${page.slug}`), lastModified: page._updatedAt, changeFrequency: "weekly", priority: 0.9 })
      for (const prop of page.properties || []) {
        entries.push({
          url: url(`/${page.slug}/${prop.slug}`),
          lastModified: prop._updatedAt,
          changeFrequency: "monthly",
          priority: 0.7,
        })
      }
    }
  } catch (error) {
    console.error("[sitemap] Could not load Sanity paths", error)
  }

  return entries
}

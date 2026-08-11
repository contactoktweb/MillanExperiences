import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { cookies } from "next/headers"
import { client } from "@/sanity/lib/client"
import { pageBySlugQuery } from "@/sanity/lib/queries"
import { ListingPageComponent } from "@/components/pages/listing-page"
import { EventPageComponent } from "@/components/pages/event-page"

// Note: In a real implementation you would fetch all listing and event slugs
export async function generateStaticParams() {
  return [
    { slug: "luxury-villas" },
    { slug: "private-islands" },
    { slug: "speedboats" },
    { slug: "yachts-catamarans" },
    { slug: "weddings" },
    { slug: "bachelor-bachelorette-parties" },
    { slug: "corporate-groups" },
    { slug: "birthdays-and-celebrations" },
  ]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const p = await params
  const data = await client.fetch(pageBySlugQuery, { slug: p.slug })
  
  if (!data) return {}

  const cookieStore = await cookies()
  const locale = cookieStore.get("NEXT_LOCALE")?.value || "en"
  const content = locale === "es" ? data.contentEs : data.contentEn

  if (!content) {
    return {
      title: "Page Not Found | Millan Experiences",
    }
  }

  return {
    title: content.seo?.title || "Millan Experiences",
    description: content.seo?.description || "Millan Experiences",
  }
}

export default async function DynamicSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const p = await params
  const data = await client.fetch(pageBySlugQuery, { slug: p.slug })

  if (!data) {
    notFound()
  }

  const cookieStore = await cookies()
  const locale = cookieStore.get("NEXT_LOCALE")?.value || "en"
  const content = locale === "es" ? data.contentEs : data.contentEn

  if (!content) {
    notFound()
  }

  if (data._type === 'listingPage') {
    return <ListingPageComponent content={content} locale={locale} />
  }

  if (data._type === 'eventPage') {
    return <EventPageComponent content={content} locale={locale} />
  }

  // Fallback if type is unknown
  notFound()
}

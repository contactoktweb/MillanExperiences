import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { cookies } from "next/headers"
import { client } from "@/sanity/lib/client"
import { pageBySlugQuery } from "@/sanity/lib/queries"
import { ListingPageComponent } from "@/components/pages/listing-page"
import { EventPageComponent } from "@/components/pages/event-page"
import { JsonLd } from "@/components/json-ld"
import { breadcrumbJsonLd, buildMetadata, faqJsonLd } from "@/lib/seo"

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
    return { title: "Page Not Found", robots: { index: false } }
  }

  return buildMetadata({
    title: content.seo?.title || content.hero?.title || content.hero?.headline || content.hubLeft?.title,
    description: content.seo?.description || content.hero?.description || content.hero?.subHeadline,
    path: `/${p.slug}`,
    locale: locale === "es" ? "es" : "en",
    image: content.hero?.backgroundImageUrl || content.hubLeft?.imageUrl,
  })
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

  const pageName = content.hero?.title || content.hero?.headline || content.seo?.title || p.slug
  const structuredData = (
    <JsonLd
      data={[
        breadcrumbJsonLd([
          { name: locale === "es" ? "Inicio" : "Home", path: "/" },
          { name: pageName, path: `/${p.slug}` },
        ]),
        faqJsonLd(content.seoFaq?.questions),
      ]}
    />
  )

  if (data._type === 'listingPage') {
    return (
      <>
        <ListingPageComponent content={data} locale={locale} />
        {structuredData}
      </>
    )
  }

  if (data._type === 'eventPage') {
    return (
      <>
        <EventPageComponent content={content} locale={locale} />
        {structuredData}
      </>
    )
  }

  // Fallback if type is unknown
  notFound()
}

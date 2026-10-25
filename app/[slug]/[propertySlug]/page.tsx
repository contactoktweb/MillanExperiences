import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { cookies } from "next/headers"
import { client } from "@/sanity/lib/client"
import { propertyBySlugQuery, propertyReviewsQuery } from "@/sanity/lib/queries"
import { PropertyPageComponent } from "@/components/pages/property-page"
import { JsonLd } from "@/components/json-ld"
import { breadcrumbJsonLd, buildMetadata, faqJsonLd, propertyJsonLd } from "@/lib/seo"
import { navItems } from "@/lib/site-data"

// Slugs can contain non-ASCII characters (e.g. "cuña"): Next passes them
// percent-encoded, so decode (and normalize) before querying Sanity.
function decodeSlug(value: string) {
  try {
    return decodeURIComponent(value).normalize("NFC")
  } catch {
    return value
  }
}

// Human-readable category name for breadcrumbs, from the main navigation.
function categoryLabel(slug: string, locale: "en" | "es") {
  const child = navItems.flatMap((item) => item.children || []).find((c) => c.href === `/${slug}`)
  return child?.label[locale] || slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
}

function propertyDescription(data: any, locale: "en" | "es") {
  return (
    (locale === "es" ? data.descriptionEs || data.descriptionEn : data.descriptionEn || data.descriptionEs) ||
    (locale === "es" ? "Propiedad de lujo por Millan Experiences en Cartagena." : "Luxury property by Millan Experiences in Cartagena.")
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; propertySlug: string }>
}): Promise<Metadata> {
  const p = await params
  const propertySlug = decodeSlug(p.propertySlug)
  const data = await client.fetch(propertyBySlugQuery, { slug: propertySlug, categorySlug: p.slug })

  if (!data) return {}

  const cookieStore = await cookies()
  const locale = cookieStore.get("NEXT_LOCALE")?.value === "es" ? "es" : "en"

  return buildMetadata({
    title: data.title,
    description: truncate(propertyDescription(data, locale), 158),
    path: `/${p.slug}/${propertySlug}`,
    locale,
    image: data.mainImageUrl,
    imageAlt: data.title,
  })
}

function truncate(text: string, max: number) {
  const clean = text.replace(/\s+/g, " ").trim()
  return clean.length <= max ? clean : `${clean.slice(0, clean.lastIndexOf(" ", max - 1))}…`
}

import { Preloader } from "@/components/preloader"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default async function PropertyDynamicPage({
  params,
}: {
  params: Promise<{ slug: string; propertySlug: string }>
}) {
  const p = await params
  const propertySlug = decodeSlug(p.propertySlug)
  const [data, reviews] = await Promise.all([
    client.fetch(propertyBySlugQuery, { slug: propertySlug, categorySlug: p.slug }),
    client.fetch(propertyReviewsQuery, { slug: propertySlug })
  ])

  if (!data) {
    notFound()
  }

  const cookieStore = await cookies()
  const locale = cookieStore.get("NEXT_LOCALE")?.value || "en"
  const loc = locale === "es" ? "es" : "en"
  const path = `/${p.slug}/${propertySlug}`

  return (
    <>
      <Preloader />
      <SiteHeader forceSolid={true} />
      <PropertyPageComponent content={data} locale={locale} initialReviews={reviews || []} />
      <SiteFooter />
      <JsonLd
        data={[
          propertyJsonLd(p.slug, data, loc, path, truncate(propertyDescription(data, loc), 300)),
          breadcrumbJsonLd([
            { name: loc === "es" ? "Inicio" : "Home", path: "/" },
            { name: categoryLabel(p.slug, loc), path: `/${p.slug}` },
            { name: data.title, path },
          ]),
          faqJsonLd(
            (data.faqs || []).map((f: any) => ({
              question: loc === "es" ? f.questionEs || f.questionEn : f.questionEn || f.questionEs,
              answer: loc === "es" ? f.answerEs || f.answerEn : f.answerEn || f.answerEs,
            })),
          ),
        ]}
      />
    </>
  )
}

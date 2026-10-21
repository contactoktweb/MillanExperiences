import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { cookies } from "next/headers"
import { client } from "@/sanity/lib/client"
import { propertyBySlugQuery, propertyReviewsQuery } from "@/sanity/lib/queries"
import { PropertyPageComponent } from "@/components/pages/property-page"
import { JsonLd } from "@/components/json-ld"
import { breadcrumbJsonLd, buildMetadata, faqJsonLd } from "@/lib/seo"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; propertySlug: string }>
}): Promise<Metadata> {
  const p = await params
  const data = await client.fetch(propertyBySlugQuery, { slug: p.propertySlug, categorySlug: p.slug })
  
  if (!data) return {}

  const cookieStore = await cookies()
  const locale = cookieStore.get("NEXT_LOCALE")?.value === "es" ? "es" : "en"
  const rawDescription =
    (locale === "es" ? data.descriptionEs || data.descriptionEn : data.descriptionEn || data.descriptionEs) ||
    (locale === "es" ? "Propiedad de lujo por Millan Experiences en Cartagena." : "Luxury property by Millan Experiences in Cartagena.")

  return buildMetadata({
    title: data.title,
    description: truncate(rawDescription, 158),
    path: `/${p.slug}/${p.propertySlug}`,
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
  const [data, reviews] = await Promise.all([
    client.fetch(propertyBySlugQuery, { slug: p.propertySlug, categorySlug: p.slug }),
    client.fetch(propertyReviewsQuery, { slug: p.propertySlug })
  ])

  if (!data) {
    notFound()
  }

  const cookieStore = await cookies()
  const locale = cookieStore.get("NEXT_LOCALE")?.value || "en"

  return (
    <>
      <Preloader />
      <SiteHeader forceSolid={true} />
      <PropertyPageComponent content={data} locale={locale} initialReviews={reviews || []} />
      <SiteFooter />
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: locale === "es" ? "Inicio" : "Home", path: "/" },
            { name: p.slug.replace(/-/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase()), path: `/${p.slug}` },
            { name: data.title, path: `/${p.slug}/${p.propertySlug}` },
          ]),
          faqJsonLd(
            (data.faqs || []).map((f: any) => ({
              question: locale === "es" ? f.questionEs || f.questionEn : f.questionEn || f.questionEs,
              answer: locale === "es" ? f.answerEs || f.answerEn : f.answerEn || f.answerEs,
            })),
          ),
        ]}
      />
    </>
  )
}


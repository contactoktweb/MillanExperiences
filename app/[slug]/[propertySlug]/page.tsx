import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { cookies } from "next/headers"
import { client } from "@/sanity/lib/client"
import { propertyBySlugQuery } from "@/sanity/lib/queries"
import { PropertyPageComponent } from "@/components/pages/property-page"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; propertySlug: string }>
}): Promise<Metadata> {
  const p = await params
  const data = await client.fetch(propertyBySlugQuery, { slug: p.propertySlug, categorySlug: p.slug })
  
  if (!data) return {}

  return {
    title: `${data.title} | Millan Experiences`,
    description: data.descriptionEn || data.descriptionEs || "Luxury property by Millan Experiences",
  }
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
  const data = await client.fetch(propertyBySlugQuery, { slug: p.propertySlug, categorySlug: p.slug })

  if (!data) {
    notFound()
  }

  const cookieStore = await cookies()
  const locale = cookieStore.get("NEXT_LOCALE")?.value || "en"

  return (
    <>
      <Preloader />
      <SiteHeader forceSolid={true} />
      <PropertyPageComponent content={data} locale={locale} />
      <SiteFooter />
    </>
  )
}

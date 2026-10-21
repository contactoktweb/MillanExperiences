import type { Metadata } from "next"
import { cookies } from "next/headers"
import { notFound } from "next/navigation"
import { client } from "@/sanity/lib/client"
import { servicePageQuery } from "@/sanity/lib/queries"
import ServicePageComponent from "@/app/services/[slug]/page"
import { buildMetadata } from "@/lib/seo"

export async function generateMetadata(): Promise<Metadata> {
  const data = await client.fetch(servicePageQuery, { slug: "concierge" })
  if (!data) return {}

  const cookieStore = await cookies()
  const locale = cookieStore.get("NEXT_LOCALE")?.value || "en"
  const content = locale === "es" ? data.contentEs : data.contentEn

  // /concierge mirrors /services/concierge: canonicalize to avoid duplicate content.
  return buildMetadata({
    title: content?.seo?.title || (locale === "es" ? "Concierge Personal en Colombia" : "Your Personal Concierge in Colombia"),
    description: content?.seo?.description || (locale === "es" ? "Desde el momento en que llegas, nos encargamos de cada detalle: reservas, logística y acceso exclusivo." : "From the moment you arrive, we handle every detail — reservations, logistics and exclusive access."),
    path: "/services/concierge",
    locale: locale === "es" ? "es" : "en",
    image: content?.hero?.backgroundImageUrl,
  })
}

export default async function ConciergePage() {
  return <ServicePageComponent params={Promise.resolve({ slug: "concierge" })} />
}

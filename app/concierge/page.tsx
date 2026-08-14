import type { Metadata } from "next"
import { cookies } from "next/headers"
import { notFound } from "next/navigation"
import { client } from "@/sanity/lib/client"
import { servicePageQuery } from "@/sanity/lib/queries"
import ServicePageComponent from "@/app/services/[slug]/page"

export async function generateMetadata(): Promise<Metadata> {
  const data = await client.fetch(servicePageQuery, { slug: "concierge" })
  if (!data) return {}

  const cookieStore = await cookies()
  const locale = cookieStore.get("NEXT_LOCALE")?.value || "en"
  const content = locale === "es" ? data.contentEs : data.contentEn

  return {
    title: content?.seo?.title || (locale === "es" ? "Concierge Personal en Colombia | Millan Experiences" : "Your Personal Concierge in Colombia | Millan Experiences"),
    description: content?.seo?.description || (locale === "es" ? "Desde el momento en que llegas, nos encargamos de cada detalle: reservas, logística y acceso exclusivo." : "From the moment you arrive, we handle every detail — reservations, logistics and exclusive access."),
  }
}

export default async function ConciergePage() {
  return <ServicePageComponent params={Promise.resolve({ slug: "concierge" })} />
}

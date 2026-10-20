import type { Metadata } from "next"
import { cookies } from "next/headers"
import { Preloader } from "@/components/preloader"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { StorePageClient } from "@/components/store/store-page-client"
import { fetchStoreCatalog } from "@/lib/store-catalog"
import type { StoreCatalog } from "@/lib/store-data"

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies()
  const locale = cookieStore.get("NEXT_LOCALE")?.value === "es" ? "es" : "en"

  return {
    title:
      locale === "es"
        ? "Boutique & Cava Privada | Millan Experiences"
        : "Private Boutique & Cellar | Millan Experiences",
    description:
      locale === "es"
        ? "Selección exclusiva de licores ultra-premium, champagnes, vinos, cervezas y delicias gourmet para tu yate o villa privada en Cartagena y el Caribe Colombiano. Servicio de reserva con al menos 8 horas de anticipación."
        : "Exclusive selection of ultra-premium spirits, champagnes, fine wines, beers, and gourmet provisions for your private yacht or villa in Cartagena. Advance reservation required at least 8 hours ahead.",
    robots: {
      index: false,
      follow: false,
    },
  }
}

export default async function TiendaPage() {
  let catalog: StoreCatalog = { products: [], groups: [] }
  let loadFailed = false

  try {
    catalog = await fetchStoreCatalog()
  } catch (error) {
    console.error("[tienda] No se pudo cargar el catálogo desde Sanity", error)
    loadFailed = true
  }

  const cookieStore = await cookies()
  const locale = cookieStore.get("NEXT_LOCALE")?.value === "es" ? "es" : "en"

  return (
    <>
      <Preloader />
      <SiteHeader forceSolid />
      <StorePageClient catalog={catalog} loadFailed={loadFailed} locale={locale} />
      <SiteFooter />
    </>
  )
}

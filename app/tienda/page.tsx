import type { Metadata } from "next"
import { Preloader } from "@/components/preloader"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { StorePageClient } from "@/components/store/store-page-client"
import { fetchStoreCatalog } from "@/lib/store-catalog"
import type { StoreCatalog } from "@/lib/store-data"

export const metadata: Metadata = {
  title: "Boutique & Cava Privada | Millan Experiences",
  description:
    "Selección exclusiva de licores ultra-premium, champagnes, vinos, cervezas y delicias gourmet para tu yate o villa privada en Cartagena y el Caribe Colombiano. Servicio de reserva con al menos 8 horas de anticipación.",
  robots: {
    index: false,
    follow: false,
  },
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

  return (
    <>
      <Preloader />
      <SiteHeader forceSolid />
      <StorePageClient catalog={catalog} loadFailed={loadFailed} />
      <SiteFooter />
    </>
  )
}

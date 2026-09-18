import type { Metadata } from "next"
import { Preloader } from "@/components/preloader"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { StorePageClient } from "@/components/store/store-page-client"

export const metadata: Metadata = {
  title: "Boutique & Cava Privada | Millan Experiences",
  description:
    "Selección exclusiva de licores ultra-premium, champagnes, vinos, cervezas y delicias gourmet para tu yate o villa privada en Cartagena y el Caribe Colombiano. Servicio de reserva con al menos 8 horas de anticipación.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function TiendaPage() {
  return (
    <>
      <Preloader />
      <SiteHeader forceSolid />
      <StorePageClient />
      <SiteFooter />
    </>
  )
}

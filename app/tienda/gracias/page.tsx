import type { Metadata } from "next"
import { Suspense } from "react"
import { Preloader } from "@/components/preloader"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ThankYouClient } from "@/components/store/thank-you-client"

export const metadata: Metadata = {
  title: "Reserva Confirmada | Boutique Millan Experiences",
  description:
    "Tu reserva de cava y productos gourmet ha sido registrada con éxito. Nuestro concierge se encargará de coordinar la entrega y logística.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function TiendaGraciasPage() {
  return (
    <>
      <Preloader />
      <SiteHeader forceSolid />
      <main id="main">
        <Suspense
          fallback={
            <div className="min-h-screen bg-[var(--color-warm-white)] flex items-center justify-center">
              <p className="font-serif text-xl text-[var(--color-deep-sea)]">
                Cargando tu confirmación...
              </p>
            </div>
          }
        >
          <ThankYouClient />
        </Suspense>
      </main>
      <SiteFooter />
    </>
  )
}

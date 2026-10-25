import type { Metadata } from "next"
import { Preloader } from "@/components/preloader"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ContactSection } from "@/components/home/contact-section"
import { JsonLd } from "@/components/json-ld"
import { SITE_URL, absoluteUrl, buildMetadata, getLocale } from "@/lib/seo"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  return buildMetadata({
    title: locale === "es" ? "Contacto: Planea tu Viaje a Cartagena" : "Contact Us: Plan Your Trip to Cartagena",
    description:
      locale === "es"
        ? "Habla con nuestro concierge en Cartagena sobre villas, yates, islas privadas o eventos. Diseñamos cada detalle. WhatsApp +57 310 710 2651."
        : "Speak with our Cartagena concierge about villas, yachts, private islands or events — we design every detail. WhatsApp +57 310 710 2651.",
    path: "/contact",
    locale,
  })
}

export default async function ContactPage() {
  const isEs = (await getLocale()) === "es"
  return (
    <>
      <Preloader />
      <SiteHeader forceSolid />
      <main id="main" className="pt-20 lg:pt-28 bg-[var(--color-blue-gray)]">
        <h1 className="sr-only">{isEs ? "Contacta a Millan Experiences: concierge privado en Cartagena" : "Contact Millan Experiences: private concierge in Cartagena"}</h1>
        <ContactSection />
      </main>
      <SiteFooter />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          url: absoluteUrl("/contact"),
          about: { "@id": `${SITE_URL}/#organization` },
        }}
      />
    </>
  )
}

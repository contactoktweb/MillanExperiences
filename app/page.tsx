import { Preloader } from "@/components/preloader"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Hero } from "@/components/home/hero"
import { CoreServices } from "@/components/home/core-services"
import { WhyMillan } from "@/components/home/why-millan"
import { Testimonials } from "@/components/home/testimonials"
import { ContactSection } from "@/components/home/contact-section"
import { client } from "@/sanity/lib/client"
import { homePageQuery, approvedReviewsQuery } from "@/sanity/lib/queries"
import { JournalPreview } from "@/components/home/journal-preview"
import { cookies } from "next/headers"
import type { Metadata } from "next"
import { buildMetadata, getLocale } from "@/lib/seo"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const isEs = locale === "es"
  const meta = buildMetadata({
    title: isEs ? "Concierge de lujo en Cartagena" : "Luxury Concierge in Cartagena",
    description: isEs
      ? "Viajes de lujo en Cartagena y el Caribe colombiano: villas privadas, Islas del Rosario, yates, chef privado, bodas y eventos con concierge dedicado."
      : "Luxury travel in Cartagena and the Colombian Caribbean: private villas, Rosario Islands, yacht charters, private chefs, weddings and events, fully handled.",
    path: "/",
    locale,
  })
  // Brand first on the home page.
  return {
    ...meta,
    title: {
      absolute: isEs
        ? "Millan Experiences — Concierge de lujo en Cartagena, Colombia"
        : "Millan Experiences — Luxury Concierge in Cartagena, Colombia",
    },
  }
}

export default async function HomePage() {
  const [homePageData, approvedReviews] = await Promise.all([
    client.fetch(homePageQuery),
    client.fetch(approvedReviewsQuery)
  ])
  const cookieStore = await cookies()
  const locale = cookieStore.get("NEXT_LOCALE")?.value || "en"
  const content = locale === "es" ? homePageData?.contentEs : homePageData?.contentEn

  // Prioriza los testimonios configurados en Home de Sanity o las reseñas dinámicas
  const homeTestimonials = (content?.testimonialsSection?.list || []).filter((item: any) => item?.quote?.trim())
  const reviewsList = (approvedReviews || []).filter((item: any) => item?.quote?.trim())
  const listToDisplay = homeTestimonials.length > 0 ? homeTestimonials : reviewsList

  const testimonialsData = {
    ...content?.testimonialsSection,
    list: listToDisplay
  }

  return (
    <>
      <Preloader />
      <SiteHeader />
      <main id="main">
        <Hero data={content?.hero} />
        <CoreServices data={content?.coreServices} />
        <WhyMillan data={content?.whyMillan} />
        <Testimonials data={testimonialsData} locale={locale} />
        <JournalPreview locale={locale === "es" ? "es" : "en"} />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  )
}

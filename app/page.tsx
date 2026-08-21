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
import { cookies } from "next/headers"

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: "Millan Experiences",
  description:
    "Luxury travel and private concierge in Colombia — villas, islands, yachts and bespoke journeys.",
  areaServed: "Cartagena, Colombia",
  slogan: "Colombia, Designed for you.",
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
        <ContactSection />
      </main>
      <SiteFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
    </>
  )
}

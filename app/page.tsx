import { Preloader } from "@/components/preloader"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Hero } from "@/components/home/hero"
import { CoreServices } from "@/components/home/core-services"
import { WhyMillan } from "@/components/home/why-millan"
import { Testimonials } from "@/components/home/testimonials"
import { ContactSection } from "@/components/home/contact-section"
import { client } from "@/sanity/lib/client"
import { homePageQuery } from "@/sanity/lib/queries"
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
  const homePageData = await client.fetch(homePageQuery)
  const cookieStore = await cookies()
  const locale = cookieStore.get("NEXT_LOCALE")?.value || "en"
  const content = locale === "es" ? homePageData?.contentEs : homePageData?.contentEn

  return (
    <>
      <Preloader />
      <SiteHeader />
      <main id="main">
        <Hero data={content?.hero} />
        <CoreServices data={content?.coreServices} />
        <WhyMillan data={content?.whyMillan} />
        <Testimonials data={content?.testimonialsSection} />
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

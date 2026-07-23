import { Preloader } from "@/components/preloader"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Hero } from "@/components/home/hero"
import { CoreServices } from "@/components/home/core-services"
import { WhyMillan } from "@/components/home/why-millan"
import { Testimonials } from "@/components/home/testimonials"
import { ContactSection } from "@/components/home/contact-section"

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: "Millan Experiences",
  description:
    "Luxury travel and private concierge in Colombia — villas, islands, yachts and bespoke journeys.",
  areaServed: "Cartagena, Colombia",
  slogan: "Colombia, Designed for you.",
}

export default function HomePage() {
  return (
    <>
      <Preloader />
      <SiteHeader />
      <main id="main">
        <Hero />
        <CoreServices />
        <WhyMillan />
        <Testimonials />
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

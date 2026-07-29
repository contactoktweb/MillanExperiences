import type { Metadata } from "next"
import { Preloader } from "@/components/preloader"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ContactSection } from "@/components/home/contact-section"

export const metadata: Metadata = {
  title: "Contact Us | Millan Experiences",
  description:
    "Get in touch with Millan Experiences. Tell us about your vision for your next Colombian escape, and we will handle the rest.",
}

export default function ContactPage() {
  return (
    <>
      <Preloader />
      <SiteHeader forceSolid />
      <main id="main" className="pt-20 lg:pt-28 bg-[var(--color-blue-gray)]">
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  )
}

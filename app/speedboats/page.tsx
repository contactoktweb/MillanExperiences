import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Preloader } from "@/components/preloader"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ContactSection } from "@/components/home/contact-section"
import { Cta } from "@/components/cta"

export const metadata: Metadata = {
  title: "Speedboats in Cartagena | Millan Experiences",
  description:
    "Discover the islands in the most exciting and effortless way with our premium speedboat experiences.",
}

// Temporary static array. This will later be replaced by Sanity dynamic content.
const dummyBoats = [
  {
    id: "cohiba",
    title: "Cohiba",
    dimensions: "32 feet",
    capacity: 14,
    bathrooms: 1,
    image: "/millan/boat-cohiba.webp",
    href: "/speedboats/cohiba",
  },
]

const processSteps = [
  {
    number: "01",
    title: "Quote",
    description: "Submit your inquiry for a quote.",
    image: "/millan/step-quote.png",
  },
  {
    number: "02",
    title: "Secure",
    description: "Secure your boat by making the first payment.",
    image: "/millan/step-secure.webp",
  },
  {
    number: "03",
    title: "Add-ons",
    description: "Include add-ons to your request.",
    image: "/millan/step-addons.webp",
  },
  {
    number: "04",
    title: "Itinerary",
    description: "Get your personalized itinerary.",
    image: "/millan/step-itinerary.webp",
  },
]

export default function SpeedboatsPage() {
  return (
    <>
      <Preloader />
      <SiteHeader />
      
      <main id="main">
        {/* HERO SECTION */}
        <section className="relative flex min-h-[75svh] items-center overflow-hidden bg-[var(--color-deep-sea)] pt-32 pb-24 md:pb-32">
          <div className="absolute inset-0">
             <Image
                src="/millan/speedboats-hero.webp"
                alt="Speedboats in Cartagena"
                fill
                priority
                className="object-cover opacity-50"
             />
             <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-deep-sea)]/90 via-[var(--color-deep-sea)]/50 to-transparent" />
          </div>
          <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 md:px-10 text-[var(--color-warm-white)]">
             <div className="max-w-2xl">
               <h2 className="eyebrow text-[var(--color-sand)]">BOATS</h2>
               <h1 className="display mt-6 text-[clamp(3rem,5vw,5rem)] leading-tight">Speedboats in Cartagena</h1>
               <p className="mt-8 font-sans text-lg font-light leading-relaxed text-[var(--color-warm-white)]/85">
                 Discover the islands in the most exciting and effortless way with our premium speedboat experiences.
               </p>
               <div className="mt-10">
                 <Cta href="/contact" tone="sand">Contact us</Cta>
               </div>
             </div>
          </div>
        </section>

        {/* PROCESS STEPS */}
        <section className="bg-[var(--color-warm-white)] py-16 md:py-24 border-b border-[var(--color-border)]">
          <div className="mx-auto max-w-[1440px] px-6 md:px-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-10">
              {processSteps.map((step) => (
                <div key={step.number} className="flex flex-col items-center text-center group">
                  <div className="flex flex-col items-center w-full max-w-[200px]">
                    <span className="font-serif text-lg text-[var(--color-text-dark)]">{step.number}. {step.title}</span>
                    <div className="w-full h-[1px] bg-[var(--color-border)] my-4"></div>
                    <div className="relative w-20 h-20 md:w-24 md:h-24 my-2 opacity-80 group-hover:opacity-100 transition-opacity">
                      <Image 
                        src={step.image} 
                        alt={step.title} 
                        fill 
                        className="object-contain"
                      />
                    </div>
                    <p className="mt-4 font-sans text-sm font-light text-[var(--color-blue-gray)] leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BOATS GRID */}
        <section className="bg-[var(--color-card)] py-24 md:py-32">
          <div className="mx-auto max-w-[1440px] px-6 md:px-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {dummyBoats.map((boat) => (
                <div key={boat.id} className="group flex flex-col overflow-hidden rounded-[min(var(--radius-lg),16px)] bg-[var(--color-warm-white)] shadow-sm transition-shadow hover:shadow-md">
                  <Link href={boat.href} className="relative aspect-[4/3] w-full overflow-hidden block">
                    <Image 
                      src={boat.image} 
                      alt={boat.title} 
                      fill
                      className="object-cover transition-transform duration-[900ms] ease-[var(--ease-editorial)] group-hover:scale-105"
                    />
                  </Link>
                  <div className="flex flex-col p-8">
                    <Link href={boat.href} className="inline-block hover:text-[var(--color-sand)] transition-colors">
                      <h3 className="font-serif text-2xl text-[var(--color-text-dark)]">{boat.title}</h3>
                    </Link>
                    <div className="mt-6 flex flex-col gap-2 font-sans text-sm font-light text-[var(--color-blue-gray)]">
                      <p>Dimensions: {boat.dimensions}</p>
                      <p>Capacity: {boat.capacity} pax</p>
                      <p>Bathrooms: {boat.bathrooms}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <ContactSection />
      </main>
      
      <SiteFooter />
    </>
  )
}

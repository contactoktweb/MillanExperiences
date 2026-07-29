"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Check } from "lucide-react"
import { Preloader } from "@/components/preloader"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Cta } from "@/components/cta"

const images = [
  "/millan/hilda-img-1.webp",
  "/millan/hilda-img-2.webp",
  "/millan/hilda-img-3.webp",
  "/millan/hilda-img-4.webp",
  "/millan/hilda-img-5.webp",
  "/millan/hilda-img-6.webp",
  "/millan/hilda-img-7.webp",
  "/millan/hilda-img-8.webp",
]

const details = [
  "Historic Center",
  "Capacity: 15 pax",
  "Rooms: 7",
  "Bathrooms: 8",
  "Rooftop pool with a 200\" projector",
  "24/7 Staff",
  "BBQ area",
  "Rooftop bar",
]

const steps = [
  { title: "01. Quote", image: "/millan/icon-quote.webp" },
  { title: "02. Secure", image: "/millan/icon-secure.webp" },
  { title: "03. Add-ons", image: "/millan/icon-addons.webp" },
  { title: "04. Itinerary", image: "/millan/icon-calendar.webp" },
]

const pairings = [
  {
    title: "Private Transportation",
    description: "Enhance your experience with our Private Transportation service. We'll handle seamless airport pick-ups and door-to-door transfers, ensuring every transition throughout your day feels smooth, effortless, and perfectly timed—so you feel secure while enjoying each moment.",
    image: "/millan/pair-trans.webp"
  },
  {
    title: "Concierge Service",
    description: "Elevate your stay with our full-service concierge. We'll handle every detail—from reservations and grocery shopping to tours and activity planning—while crafting a fully customized itinerary. From the moment you arrive and throughout your stay, we'll be by your side to ensure a seamless experience.",
    image: "/millan/pair-concierge.webp"
  },
  {
    title: "Private Chef",
    description: "Indulge in a private chef experience with personalized menus tailored to you and your friends. From fresh, locally sourced ingredients to seamless in-villa service, every meal is carefully prepared— so you can relax and enjoy every bite.",
    image: "/millan/pair-chef.webp"
  }
]

const faqs = [
  {
    q: "1. When should I request reservations for restaurants or activities?",
    a: "We recommend sharing your preferences as soon as your travel dates are confirmed. Exclusive restaurants, private yachts, and high-demand experiences often book up weeks or months in advance. Once you give us your wishlist, our team will proactively handle the outreach and secure your spots."
  },
  {
    q: "2. Can your private chefs accommodate specific dietary restrictions?",
    a: "Absolutely. Our curated network of private chefs is highly experienced in designing bespoke menus tailored to any dietary requirement, allergy, or personal preference. We gather all this information well before your arrival to ensure every in-home dining experience is flawless and safe."
  },
  {
    q: "3. Will I have support available during the actual trip?",
    a: "Yes. While we meticulously orchestrate your itinerary in advance, we know that true luxury requires flexibility. Your dedicated concierge team is available throughout your stay to manage last-minute adjustments, coordinate additional transportation, or secure new reservations, giving you absolute peace of mind."
  }
]

export default function CasaHildaPage() {
  const [activeImg, setActiveImg] = useState(0)

  const nextImg = () => setActiveImg((prev) => (prev + 1) % images.length)
  const prevImg = () => setActiveImg((prev) => (prev - 1 + images.length) % images.length)

  return (
    <>
      <Preloader />
      <SiteHeader forceSolid />
      
      <main id="main" className="bg-[var(--color-warm-white)] pt-44 lg:pt-48 pb-24 md:pb-32">
        <div className="mx-auto max-w-[1440px] px-6 md:px-10">
          
          {/* BREADCRUMB */}
          <nav className="font-sans text-xs tracking-widest text-[var(--color-blue-gray)] uppercase mb-8">
            <Link href="/luxury-villas" className="hover:text-[var(--color-sand)] transition-colors">Luxury Villas</Link>
            <span className="mx-3 text-gray-400">/</span>
            <span className="text-[var(--color-text-dark)]">Casa Hilda</span>
          </nav>

          {/* MAIN SPLIT DETAILS */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* LEFT COLUMN: CAROUSEL */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="relative aspect-square md:aspect-[4/3] w-full overflow-hidden rounded-[min(var(--radius-lg),16px)] bg-gray-100">
                <Image 
                  src={images[activeImg]} 
                  alt="Casa Hilda Luxury Villa" 
                  fill 
                  className="object-cover transition-all duration-700 ease-out" 
                />
                
                {/* NAVIGATION ARROWS */}
                <button 
                  onClick={prevImg}
                  className="absolute left-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/80 text-[var(--color-text-dark)] shadow backdrop-blur-sm transition-colors hover:bg-white hover:text-[var(--color-sand)]"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-6 w-6" strokeWidth={1.5} />
                </button>
                <button 
                  onClick={nextImg}
                  className="absolute right-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/80 text-[var(--color-text-dark)] shadow backdrop-blur-sm transition-colors hover:bg-white hover:text-[var(--color-sand)]"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-6 w-6" strokeWidth={1.5} />
                </button>
              </div>

              {/* THUMBNAILS GRID */}
              <div className="grid grid-cols-8 gap-2">
                {images.map((img, index) => (
                  <button 
                    key={index} 
                    onClick={() => setActiveImg(index)}
                    className={`relative aspect-square overflow-hidden rounded-[min(var(--radius-sm),6px)] transition-all ${
                      activeImg === index ? "ring-2 ring-[var(--color-sand)] opacity-100" : "opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image 
                      src={img} 
                      alt={`Thumbnail ${index + 1}`} 
                      fill 
                      className="object-cover" 
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* RIGHT COLUMN: HOUSE INFO */}
            <div className="lg:col-span-5 flex flex-col">
              <h1 className="font-serif text-4xl md:text-5xl text-[var(--color-text-dark)] mb-6">Casa Hilda</h1>
              
              {/* DETAILS TABS CARD */}
              <div className="border border-[var(--color-border)] rounded-[min(var(--radius-lg),16px)] bg-[var(--color-card)] p-8 mb-8">
                <h3 className="font-sans text-xs tracking-widest text-[var(--color-blue-gray)] uppercase border-b border-[var(--color-border)] pb-3 mb-6">Details</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[var(--color-text-dark)] font-sans text-sm font-light">
                  {details.map((detail, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="text-[var(--color-sand)] text-lg leading-none">•</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* BOOKING PROCESS STEPS */}
              <div className="grid grid-cols-4 gap-4 mb-8 text-center">
                {steps.map((step, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <p className="font-serif text-xs text-[var(--color-text-dark)] mb-3 leading-snug">{step.title}</p>
                    <div className="relative h-12 w-12 flex items-center justify-center bg-[var(--color-card)] border border-[var(--color-border)] rounded-full shadow-sm">
                      <Image 
                        src={step.image} 
                        alt={step.title} 
                        width={24} 
                        height={24} 
                        className="object-contain" 
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* ACTION BUTTON */}
              <div>
                <Cta href="/contact" tone="sand" className="w-full text-center py-4 text-xs font-semibold justify-center">Book Now</Cta>
              </div>
            </div>

          </div>

          {/* A SEAMLESS PAIRING SECTION */}
          <section className="mt-28 border-t border-[var(--color-border)] pt-20">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="eyebrow text-[var(--color-blue-gray)] uppercase tracking-widest text-sm">A SEAMLESS PAIRING</span>
              <h2 className="mt-6 font-serif text-3xl md:text-4xl text-[var(--color-text-dark)]">Experiences curated to perfectly complement.</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pairings.map((pair, index) => (
                <div key={index} className="flex flex-col overflow-hidden rounded-[min(var(--radius-lg),16px)] bg-[var(--color-card)] shadow-sm border border-[var(--color-border)]">
                  <div className="relative aspect-square w-full overflow-hidden">
                    <Image 
                      src={pair.image} 
                      alt={pair.title} 
                      fill 
                      className="object-cover" 
                    />
                  </div>
                  <div className="flex flex-col p-8 flex-grow">
                    <h3 className="font-serif text-xl text-[var(--color-text-dark)] mb-4">{pair.title}</h3>
                    <p className="font-sans text-sm font-light text-[var(--color-blue-gray)] leading-relaxed mb-8 flex-grow">
                      {pair.description}
                    </p>
                    <div className="mt-auto">
                      <Cta href="https://wa.me/573107102651" tone="dark" className="w-full justify-center text-xs py-3">Add to My Experience</Cta>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ SECTION */}
          <section className="mt-28 border-t border-[var(--color-border)] pt-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
              <div>
                <span className="eyebrow text-[var(--color-blue-gray)] uppercase tracking-widest text-sm">FAQ</span>
                <h2 className="mt-6 font-serif text-4xl md:text-5xl text-[var(--color-text-dark)] leading-tight">Casa Hilda Luxury Villa</h2>
              </div>
              
              <div className="flex flex-col">
                {faqs.map((faq, index) => (
                  <details key={index} className="group border-b border-[var(--color-border)] [&_summary::-webkit-details-marker]:hidden" open={index === 0}>
                    <summary className="flex cursor-pointer items-center justify-between py-6 font-serif text-xl text-[var(--color-text-dark)] transition-colors hover:text-[var(--color-sand)]">
                      <span className="font-normal pr-8">{faq.q}</span>
                      <span className="ml-2 flex-shrink-0 transition duration-300 group-open:-rotate-180">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                      </span>
                    </summary>
                    <div className="pb-6">
                      <p className="font-sans text-sm font-light text-[var(--color-blue-gray)] leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  </details>
                ))}
              </div>
            </div>

            <div className="mt-16 flex justify-start">
              <Cta href="/contact" tone="dark">Plan your trip</Cta>
            </div>
          </section>

        </div>
      </main>

      <SiteFooter />
    </>
  )
}

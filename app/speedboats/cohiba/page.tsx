"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Preloader } from "@/components/preloader"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Cta } from "@/components/cta"

const images = [
  "/millan/cohiba-img-1.webp",
  "/millan/cohiba-img-2.webp",
  "/millan/cohiba-img-3.webp",
  "/millan/cohiba-img-4.webp",
]

const details = [
  "Dimensions: 32 feet",
  "Capacity: 14 pax",
  "Bathrooms: 1",
  "Bluetooth included: Yes",
  "Includes: Crew, Gasoline, Ice",
]

const policies = [
  "If the Coast Guard deems conditions unsafe before boarding, you will receive a full refund.",
  "If the boat becomes unavailable for any reason, and we can not find a boat with similar characteristics, a full refund will also be issued.",
  "A 50% deposit is required to confirm your reservation. This deposit is non-refundable.",
  "If you cancel after making the reservation, you will forfeit the deposit but will not be required to pay the remaining 50%.",
]

const steps = [
  { title: "01. Quote", image: "/millan/icon-quote.webp" },
  { title: "02. Secure", image: "/millan/icon-secure.webp" },
  { title: "03. Add-ons", image: "/millan/icon-addons.webp" },
  { title: "04. Itinerary", image: "/millan/icon-calendar.webp" },
]

const pairings = [
  {
    title: "Boat Delivery",
    description: "Don't worry about waking up earlier and grocery shopping. With our Boat Delivery add-on, your selected food and drinks will be on board before you arrive—so you can start enjoying immediately.",
    image: "/millan/cohiba-pair-delivery.webp",
    href: "https://wa.me/573107102651",
    linkText: "Add to My Experience"
  },
  {
    title: "Private transportation",
    description: "Enhance your experience with our Private Transportation add-on. We'll handle seamless, door-to-dock transfers and your return journey—so every part of your day is effortless and stress-free.",
    image: "/millan/pair-trans.webp",
    href: "https://wa.me/573107102651",
    linkText: "Add to My Experience"
  },
  {
    title: "Be the life of the party",
    description: "Take your celebration beyond the islands. We can also plan the after-party in Cartagena—handling restaurant bookings and club reservations—so the experience flows seamless from day to night.",
    image: "/millan/cohiba-pair-party.webp",
    href: "/contact",
    linkText: "Add to My Experience"
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

export default function CohibaPage() {
  const [activeImg, setActiveImg] = useState(0)
  const [activeTab, setActiveTab] = useState<"details" | "policies">("details")

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
            <Link href="/speedboats" className="hover:text-[var(--color-sand)] transition-colors">Speedboats</Link>
            <span className="mx-3 text-gray-400">/</span>
            <span className="text-[var(--color-text-dark)]">Cohiba</span>
          </nav>

          {/* MAIN SPLIT DETAILS */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* LEFT COLUMN: CAROUSEL */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="relative aspect-square md:aspect-[4/3] w-full overflow-hidden rounded-[min(var(--radius-lg),16px)] bg-gray-100">
                <Image 
                  src={images[activeImg]} 
                  alt="Cohiba Private Boat Experience" 
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
              <div className="grid grid-cols-4 gap-2">
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

            {/* RIGHT COLUMN: INFO & TABS */}
            <div className="lg:col-span-5 flex flex-col">
              <h1 className="font-serif text-4xl md:text-5xl text-[var(--color-text-dark)] mb-6">Cohiba</h1>
              
              {/* TABS HEADERS */}
              <div className="flex border-b border-[var(--color-border)] mb-6">
                <button
                  onClick={() => setActiveTab("details")}
                  className={`pb-3 font-sans text-sm tracking-widest uppercase transition-colors mr-8 ${
                    activeTab === "details" ? "border-b-2 border-[var(--color-sand)] text-[var(--color-text-dark)] font-semibold" : "text-[var(--color-blue-gray)] hover:text-[var(--color-text-dark)]"
                  }`}
                >
                  Details
                </button>
                <button
                  onClick={() => setActiveTab("policies")}
                  className={`pb-3 font-sans text-sm tracking-widest uppercase transition-colors ${
                    activeTab === "policies" ? "border-b-2 border-[var(--color-sand)] text-[var(--color-text-dark)] font-semibold" : "text-[var(--color-blue-gray)] hover:text-[var(--color-text-dark)]"
                  }`}
                >
                  Policies
                </button>
              </div>

              {/* TABS CONTENT */}
              <div className="min-h-[200px] mb-8">
                {activeTab === "details" ? (
                  <div className="border border-[var(--color-border)] rounded-[min(var(--radius-lg),16px)] bg-[var(--color-card)] p-8">
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[var(--color-text-dark)] font-sans text-sm font-light">
                      {details.map((detail, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-[var(--color-sand)] text-lg leading-none mt-0.5">•</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="border border-[var(--color-border)] rounded-[min(var(--radius-lg),16px)] bg-[var(--color-card)] p-8">
                    <ul className="flex flex-col gap-4 text-[var(--color-text-dark)] font-sans text-sm font-light leading-relaxed">
                      {policies.map((policy, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-[var(--color-sand)] text-lg leading-none mt-0.5">•</span>
                          <span>{policy}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
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
                      <Cta href={pair.href} tone="dark" className="w-full justify-center text-xs py-3">{pair.linkText}</Cta>
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
                <h2 className="mt-6 font-serif text-4xl md:text-5xl text-[var(--color-text-dark)] leading-tight">Cohiba Private Boat Experience</h2>
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

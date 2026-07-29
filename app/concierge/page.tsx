import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Preloader } from "@/components/preloader"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ContactSection } from "@/components/home/contact-section"
import { Cta } from "@/components/cta"

export const metadata: Metadata = {
  title: "Your Personal Concierge in Colombia | Millan Experiences",
  description:
    "From the moment you arrive, we handle every detail — reservations, logistics and exclusive access.",
}

const servicesList = [
  "Airport transfers",
  "Private chefs",
  "Restaurant & nightlife reservations",
  "Wellness & spa experiences",
  "Private tours",
  "Exclusive local insider experiences",
  "Personal security services",
  "Land & marine transportation",
  "Private aviation arrangements",
  "Event planning"
]

const faqs = [
  {
    title: "1. Why hire a concierge service during your stay?",
    content: "A concierge service is like having a personal assistant dedicated to making your trip easy, comfortable, and completely stress-free. Instead of spending time planning, booking, coordinating, or solving problems during your stay, your concierge handles everything for you — from airport pickups and restaurant reservations to private chefs, boat rentals, tours, nightlife, grocery shopping and special requests. You simply tell us what you want your experience to feel like, and we take care of the rest."
  },
  {
    title: "2. Can your private chefs accommodate specific dietary restrictions?",
    content: "Absolutely. Our curated network of private chefs is highly experienced in designing bespoke menus tailored to any dietary requirement, allergy, or personal preference. We gather all this information well before your arrival to ensure every in-home dining experience is flawless and safe."
  },
  {
    title: "3. When should I request reservations for restaurants or activities?",
    content: "We recommend sharing your preferences as soon as your travel dates are confirmed. Exclusive restaurants, private yachts, and high-demand experiences often book up weeks or months in advance. Once you give us your wishlist, our team will proactively handle the outreach and secure your spots."
  },
  {
    title: "4. Will I have support available during the actual trip?",
    content: "Yes. While we meticulously orchestrate your itinerary in advance, we know that true luxury requires flexibility. Your dedicated concierge team is available throughout your stay to manage last-minute adjustments, coordinate additional transportation, or secure new reservations, giving you absolute peace of mind."
  }
]

const seoFaqs = [
  {
    title: "What does a private concierge in Cartagena handle?",
    content: "Concierge support can include itinerary design, villa services, restaurant and nightlife reservations, boats, private chefs, transportation, events and guest logistics."
  },
  {
    title: "Can concierge services be used without booking a villa?",
    content: "Yes. Concierge planning can support full trips, single experiences, private events, boat days, celebrations and group logistics."
  },
  {
    title: "Is concierge support available for groups?",
    content: "Yes. Millan Experiences works with bachelor and bachelorette groups, wedding guests, families, corporate teams and private groups visiting Colombia."
  },
  {
    title: "Can the itinerary be customized?",
    content: "Yes. Each itinerary is shaped around guest preferences, travel dates, pace, privacy, budget range and the kind of Colombia experience the group wants."
  }
]

const possibilities = [
  {
    title: "Luxury Villas and Islands",
    description: "Hand-selected luxury villas and private islands in Colombia's most desirable destinations.",
    image: "/millan/pos-villas.webp",
    href: "/luxury-villas",
    linkText: "Explore Our Villas"
  },
  {
    title: "Boats and Yachts",
    description: "Private yachts, catamarans and speedboats carefully selected for your days in the islands.",
    image: "/millan/pos-boats.webp",
    href: "/speedboats",
    linkText: "Discover Our Fleet"
  },
  {
    title: "Events & Celebrations",
    description: "Destination weddings, private celebrations and corporate retreats.",
    image: "/millan/pos-events.webp",
    href: "/contact",
    linkText: "Plan Your Event"
  }
]

export default function ConciergePage() {
  return (
    <>
      <Preloader />
      <SiteHeader />
      
      <main id="main">
        {/* HERO SECTION */}
        <section className="relative flex min-h-[85svh] items-center overflow-hidden bg-[var(--color-deep-sea)] pt-32 pb-24 md:pb-32">
          <div className="absolute inset-0">
             <Image
                src="/millan/concierge-hero.webp"
                alt="Your Personal Concierge in Colombia"
                fill
                priority
                className="object-cover opacity-60"
             />
             <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-deep-sea)]/80 via-[var(--color-deep-sea)]/40 to-transparent" />
          </div>
          <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 md:px-10 text-[var(--color-warm-white)]">
             <div className="max-w-2xl">
               <h2 className="eyebrow text-[var(--color-sand)] uppercase tracking-widest text-sm mb-4">SERVICES</h2>
               <h1 className="display mt-4 text-[clamp(3rem,5vw,5rem)] leading-tight">Your Personal Concierge in Colombia</h1>
               <p className="mt-8 font-sans text-lg font-light leading-relaxed text-[var(--color-warm-white)]/90">
                 From the moment you arrive, we handle every detail — reservations, logistics and exclusive access.
               </p>
               <div className="mt-10">
                 <Cta href="/contact" tone="sand">Contact us</Cta>
               </div>
             </div>
          </div>
        </section>

        {/* WHAT WE HANDLE */}
        <section className="bg-[var(--color-warm-white)] py-24 md:py-32">
           <div className="mx-auto max-w-[1440px] px-6 md:px-10">
             <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
               <span className="eyebrow text-[var(--color-blue-gray)] uppercase tracking-widest text-sm">WHAT WE HANDLE</span>
               <h2 className="mt-6 font-serif text-4xl md:text-5xl text-[var(--color-text-dark)] leading-tight">Complete lifestyle management during your stay.</h2>
             </div>
             
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
               <div className="relative aspect-[3/4] md:aspect-[4/5] w-full max-w-md mx-auto lg:mx-0 overflow-hidden rounded-[min(var(--radius-lg),16px)]">
                 <Image
                   src="/millan/concierge-cottonbro.webp"
                   alt="Concierge with Millan Experiences in Colombia"
                   fill
                   className="object-cover"
                 />
               </div>
               
               <div className="flex flex-col text-center lg:text-left">
                 <p className="font-sans text-lg font-light text-[var(--color-blue-gray)] leading-relaxed mb-6">
                   We take the friction out of travel by seamlessly managing every detail of your stay. Before you even arrive, your dedicated concierge curates and oversees a fully personalized itinerary tailored to your preferences, ensuring a smooth and elevated experience from start to finish.
                 </p>
                 <p className="font-sans text-lg text-[var(--color-text-dark)] mb-6">
                   Our concierge services include:
                 </p>
                 <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 mb-10 text-left">
                   {servicesList.map((service, index) => (
                     <li key={index} className="flex items-start text-[var(--color-blue-gray)] font-light">
                       <span className="text-[var(--color-sand)] mr-3 mt-1">•</span>
                       <span>{service}</span>
                     </li>
                   ))}
                 </ul>
                 <div className="flex justify-center lg:justify-start">
                   <Cta href="https://wa.me/573107102651" tone="dark">Plan your itinerary</Cta>
                 </div>
               </div>
             </div>
           </div>
        </section>

        {/* FAQ - AT YOUR SERVICE */}
        <section className="bg-[var(--color-card)] py-24 md:py-32 border-y border-[var(--color-border)]">
           <div className="mx-auto max-w-[1440px] px-6 md:px-10">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
               {/* Left side text */}
               <div>
                  <span className="eyebrow text-[var(--color-blue-gray)] uppercase tracking-widest text-sm">FAQ</span>
                  <h2 className="mt-6 font-serif text-4xl md:text-5xl text-[var(--color-text-dark)] leading-tight">At Your Service</h2>
               </div>
               
               {/* Right side accordion */}
               <div className="flex flex-col">
                 {faqs.map((item, index) => (
                   <details key={index} className="group border-b border-[var(--color-border)] [&_summary::-webkit-details-marker]:hidden" open={index === 0}>
                     <summary className="flex cursor-pointer items-center justify-between py-6 font-serif text-xl md:text-2xl text-[var(--color-text-dark)] transition-colors hover:text-[var(--color-sand)]">
                       <span className="font-normal pr-8">{item.title}</span>
                       <span className="ml-2 flex-shrink-0 transition duration-300 group-open:-rotate-180">
                         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                       </span>
                     </summary>
                     <div className="pb-6">
                       <p className="font-sans text-lg font-light text-[var(--color-blue-gray)] leading-relaxed whitespace-pre-line">
                         {item.content}
                       </p>
                     </div>
                   </details>
                 ))}
               </div>
             </div>
           </div>
        </section>

        {/* LIMITLESS POSSIBILITIES */}
        <section className="bg-[var(--color-warm-white)] py-24 md:py-32">
          <div className="mx-auto max-w-[1440px] px-6 md:px-10">
            <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
              <span className="eyebrow text-[var(--color-blue-gray)] uppercase tracking-widest text-sm">LIMITLESS POSIBILITIES</span>
              <h2 className="mt-6 font-serif text-3xl md:text-4xl text-[var(--color-text-dark)]">If you can envision it, we can orchestrate it</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {possibilities.map((pos, index) => (
                <div key={index} className="group relative flex flex-col justify-end overflow-hidden rounded-[min(var(--radius-lg),16px)] aspect-[4/5] p-8">
                  <Image 
                    src={pos.image} 
                    alt={pos.title} 
                    fill
                    className="object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />
                  <div className="relative z-10 flex flex-col h-full justify-end">
                    <h3 className="font-serif text-2xl text-[var(--color-warm-white)] mb-3">{pos.title}</h3>
                    <p className="font-sans text-[var(--color-warm-white)]/80 font-light leading-relaxed mb-6">
                      {pos.description}
                    </p>
                    <div>
                      <Cta href={pos.href} tone="sand" className="py-2 px-6 text-sm">{pos.linkText}</Cta>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <ContactSection />
        
        {/* SEO FAQ */}
        <section className="bg-[var(--color-warm-white)] py-24">
          <div className="mx-auto max-w-[1440px] px-6 md:px-10">
            <h2 className="font-serif text-3xl text-[var(--color-text-dark)] mb-4">Private Concierge in Colombia FAQ</h2>
            <p className="font-sans text-lg font-light text-[var(--color-blue-gray)] mb-12">
              A private concierge helps connect every part of the trip, from reservations to logistics and special experiences.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              {seoFaqs.map((faq, index) => (
                <div key={index} className="border-t border-[var(--color-border)] pt-6">
                  <h3 className="font-serif text-xl text-[var(--color-text-dark)] mb-3">{faq.title}</h3>
                  <p className="font-sans font-light text-[var(--color-blue-gray)] leading-relaxed">
                    {faq.content}
                  </p>
                </div>
              ))}
            </div>
            
            <div className="mt-16">
              <Cta href="/contact" tone="dark">Start planning</Cta>
            </div>
          </div>
        </section>
      </main>
      
      <SiteFooter />
    </>
  )
}

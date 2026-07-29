import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Preloader } from "@/components/preloader"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ContactSection } from "@/components/home/contact-section"
import { AccordionCustom, type AccordionItem } from "@/components/ui/accordion-custom"
import { Cta } from "@/components/cta"
import { contact } from "@/lib/site-data"

export const metadata: Metadata = {
  title: "Personal Concierge in Colombia",
  description:
    "Complete lifestyle management during your stay. We handle every detail, from airport transfers to private chefs, reservations, and exclusive access in Colombia.",
}

const faqItems: AccordionItem[] = [
  {
    id: "faq-1",
    title: "Why hire a concierge service during your stay?",
    content: (
      <div className="space-y-4">
        <p>
          A concierge service is like having a personal assistant dedicated to making your trip easy, comfortable, and completely stress-free. Instead of spending time planning, booking, coordinating, or solving problems during your stay, your concierge handles everything for you — from airport pickups and restaurant reservations to private chefs, boat rentals, tours, nightlife, grocery shopping and special requests.
        </p>
        <p>
          You simply tell us what you want your experience to feel like, and we take care of the rest.
        </p>
      </div>
    ),
  },
  {
    id: "faq-2",
    title: "Can your private chefs accommodate specific dietary restrictions?",
    content: (
      <p>
        Absolutely. Our curated network of private chefs is highly experienced in designing bespoke menus tailored to any dietary requirement, allergy, or personal preference. We gather all this information well before your arrival to ensure every in-home dining experience is flawless and safe.
      </p>
    ),
  },
  {
    id: "faq-3",
    title: "When should I request reservations for restaurants or activities?",
    content: (
      <p>
        We recommend sharing your preferences as soon as your travel dates are confirmed. Exclusive restaurants, private yachts, and high-demand experiences often book up weeks or months in advance. Once you give us your wishlist, our team will proactively handle the outreach and secure your spots.
      </p>
    ),
  },
  {
    id: "faq-4",
    title: "Will I have support available during the actual trip?",
    content: (
      <p>
        Yes. While we meticulously orchestrate your itinerary in advance, we know that true luxury requires flexibility. Your dedicated concierge team is available throughout your stay to manage last-minute adjustments, coordinate additional transportation, or secure new reservations, giving you absolute peace of mind.
      </p>
    ),
  },
]

export default function ConciergePage() {
  return (
    <>
      <Preloader />
      <SiteHeader />
      
      <main id="main">
        {/* HERO SECTION */}
        <section className="relative flex min-h-[75svh] items-center overflow-hidden bg-[var(--color-deep-sea)] pt-32 pb-24 md:pb-32">
          <div className="absolute inset-0">
             <Image
                src="/millan/concierge.png"
                alt="Concierge Services in Colombia"
                fill
                priority
                className="object-cover opacity-50"
             />
             <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-deep-sea)]/90 via-[var(--color-deep-sea)]/50 to-transparent" />
          </div>
          <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 md:px-10 text-[var(--color-warm-white)]">
             <div className="max-w-2xl">
               <h2 className="eyebrow text-[var(--color-sand)]">SERVICES</h2>
               <h1 className="display mt-6 text-[clamp(3rem,5vw,5rem)] leading-tight">Your Personal Concierge in Colombia</h1>
               <p className="mt-8 font-sans text-lg font-light leading-relaxed text-[var(--color-warm-white)]/85">
                 From the moment you arrive, we handle every detail — reservations, logistics and exclusive access.
               </p>
               <div className="mt-10">
                 <Cta href="/contact" tone="sand">Contact us</Cta>
               </div>
             </div>
          </div>
        </section>

        {/* WHAT WE HANDLE */}
        <section className="bg-[var(--color-warm-white)] py-24 md:py-32 text-[var(--color-text-dark)]">
          <div className="mx-auto max-w-[1440px] px-6 md:px-10">
            <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
              <h2 className="eyebrow text-[var(--color-blue-gray)]">WHAT WE HANDLE</h2>
              <h3 className="display mt-6 text-[clamp(2rem,4vw,3.5rem)] leading-tight">
                Complete lifestyle management during your stay.
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
              <div className="relative aspect-[4/5] w-full max-w-md mx-auto lg:mx-0 overflow-hidden rounded-[min(var(--radius-lg),16px)]">
                <Image 
                  src="/millan/events.png" 
                  alt="Concierge handling lifestyle management" 
                  fill 
                  className="object-cover" 
                />
              </div>
              <div className="lg:pl-12">
                <div className="space-y-6 font-sans text-base font-light leading-relaxed opacity-85 text-[var(--color-text-dark)]">
                  <p>
                    We take the friction out of travel by seamlessly managing every detail of your stay. Before you even arrive, your dedicated concierge curates and oversees a fully personalized itinerary tailored to your preferences, ensuring a smooth and elevated experience from start to finish.
                  </p>
                  <p>Our concierge services include:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Airport transfers</li>
                    <li>Private chefs</li>
                    <li>Restaurant &amp; nightlife reservations</li>
                    <li>Wellness &amp; spa experiences</li>
                    <li>Private tours</li>
                    <li>Exclusive local insider experiences</li>
                    <li>Personal security services</li>
                    <li>Land &amp; marine transportation</li>
                    <li>Private aviation arrangements</li>
                    <li>Event planning</li>
                  </ul>
                  <div className="pt-8">
                    <Cta href={contact.whatsapp} variant="solid" tone="dark">Plan your itinerary</Cta>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AT YOUR SERVICE FAQ */}
        <section className="bg-[var(--color-card)] py-24 md:py-32 text-[var(--color-text-dark)]">
          <div className="mx-auto max-w-[1440px] px-6 md:px-10 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-24">
            <div>
              <h2 className="eyebrow text-[var(--color-blue-gray)]">FAQ</h2>
              <h3 className="display mt-6 text-[clamp(2.5rem,4vw,3.5rem)] leading-[1.1]">
                At Your Service
              </h3>
            </div>
            <div className="lg:pt-4">
              {/* Reuse AccordionCustom, but with styling tweaks for dark text if needed, 
                  Wait, AccordionCustom defaults to expecting dark background based on text-[var(--color-warm-white)]. 
                  Let's map and render a customized light-mode accordion here or update AccordionCustom 
                  to support color modes. For simplicity, we can render it inline here since it's light theme. */}
              <div className="flex flex-col border-t border-[color:var(--color-border-light)]">
                {faqItems.map((item, i) => (
                  <details key={item.id} className="group border-b border-[color:var(--color-border-light)] [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex w-full cursor-pointer items-center justify-between py-6 text-left hover:text-[var(--color-sand)] transition-colors">
                      <div className="flex items-center gap-6 pr-4">
                        <span className="font-sans text-sm font-medium tracking-widest text-[var(--color-blue-gray)]">0{i + 1}</span>
                        <h4 className="font-serif text-xl md:text-2xl">{item.title}</h4>
                      </div>
                      <span className="relative flex h-5 w-5 shrink-0 items-center justify-center">
                        <span className="absolute h-0.5 w-full bg-current transition-transform group-open:rotate-180" />
                        <span className="absolute h-full w-0.5 bg-current transition-transform group-open:rotate-90" />
                      </span>
                    </summary>
                    <div className="pb-8 pl-[3.5rem] pr-4 font-sans text-sm font-light leading-relaxed text-[var(--color-text-dark)]/80">
                      {item.content}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* LIMITLESS POSSIBILITIES */}
        <section className="bg-[var(--color-deep-sea)] py-24 md:py-32 text-[var(--color-warm-white)]">
          <div className="mx-auto max-w-[1440px] px-6 md:px-10">
            <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
              <h2 className="eyebrow text-[var(--color-sand)]">LIMITLESS POSSIBILITIES</h2>
              <h3 className="display mt-6 text-[clamp(2rem,4vw,3.5rem)] leading-tight">
                If you can envision it, we can orchestrate it
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {/* Card 1 */}
              <div className="group relative flex h-[450px] md:h-[500px] flex-col overflow-hidden rounded-[min(var(--radius-lg),16px)]">
                <Image 
                  src="/millan/villa-island.png" 
                  alt="Luxury Villas and Islands" 
                  fill 
                  className="object-cover transition-transform duration-[900ms] ease-[var(--ease-editorial)] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                <div className="relative z-10 mt-auto flex flex-col p-8">
                  <h4 className="font-serif text-2xl">Luxury Villas and Islands</h4>
                  <p className="mt-3 font-sans text-sm font-light text-white/80 line-clamp-3 mb-6">
                    Hand-selected luxury villas and private islands in Colombia's most desirable destinations.
                  </p>
                  <Link href="/luxury-villas" className="inline-block border border-white/30 rounded-full px-6 py-2.5 text-xs tracking-widest uppercase transition-colors hover:bg-white hover:text-black w-fit font-medium">
                    Explore Our Villas
                  </Link>
                </div>
              </div>
              
              {/* Card 2 */}
              <div className="group relative flex h-[450px] md:h-[500px] flex-col overflow-hidden rounded-[min(var(--radius-lg),16px)]">
                <Image 
                  src="/millan/boat-turquoise.jpg" 
                  alt="Boats and Yachts" 
                  fill 
                  className="object-cover transition-transform duration-[900ms] ease-[var(--ease-editorial)] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                <div className="relative z-10 mt-auto flex flex-col p-8">
                  <h4 className="font-serif text-2xl">Boats and Yachts</h4>
                  <p className="mt-3 font-sans text-sm font-light text-white/80 line-clamp-3 mb-6">
                    Private yachts, catamarans and speedboats carefully selected for your days in the islands.
                  </p>
                  <Link href="/speedboats" className="inline-block border border-white/30 rounded-full px-6 py-2.5 text-xs tracking-widest uppercase transition-colors hover:bg-white hover:text-black w-fit font-medium">
                    Discover Our Fleet
                  </Link>
                </div>
              </div>

              {/* Card 3 */}
              <div className="group relative flex h-[450px] md:h-[500px] flex-col overflow-hidden rounded-[min(var(--radius-lg),16px)]">
                <Image 
                  src="/millan/cartagena-night.png" 
                  alt="Events and Celebrations" 
                  fill 
                  className="object-cover transition-transform duration-[900ms] ease-[var(--ease-editorial)] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                <div className="relative z-10 mt-auto flex flex-col p-8">
                  <h4 className="font-serif text-2xl">Events &amp; Celebrations</h4>
                  <p className="mt-3 font-sans text-sm font-light text-white/80 line-clamp-3 mb-6">
                    Destination weddings, private celebrations and corporate retreats.
                  </p>
                  <Link href="/contact" className="inline-block border border-white/30 rounded-full px-6 py-2.5 text-xs tracking-widest uppercase transition-colors hover:bg-white hover:text-black w-fit font-medium">
                    Plan Your Event
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <ContactSection />

        {/* SEO FAQ BLOCK */}
        <section className="bg-[var(--color-warm-white)] py-20 border-t border-[color:var(--color-border-light)] text-[var(--color-text-dark)]">
          <div className="mx-auto max-w-[1440px] px-6 md:px-10">
            <div className="max-w-3xl">
              <h2 className="display text-3xl md:text-4xl">Private Concierge in Colombia FAQ</h2>
              <p className="mt-4 font-sans text-lg font-light text-[var(--color-text-dark)]/80">
                A private concierge helps connect every part of the trip, from reservations to logistics and special experiences.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              <div className="border-t border-[color:var(--color-border-light)] pt-6">
                <h3 className="font-serif text-xl">What does a private concierge in Cartagena handle?</h3>
                <p className="mt-3 font-sans text-sm font-light text-[var(--color-text-dark)]/80 leading-relaxed">
                  Concierge support can include itinerary design, villa services, restaurant and nightlife reservations, boats, private chefs, transportation, events and guest logistics.
                </p>
              </div>
              <div className="border-t border-[color:var(--color-border-light)] pt-6">
                <h3 className="font-serif text-xl">Can concierge services be used without booking a villa?</h3>
                <p className="mt-3 font-sans text-sm font-light text-[var(--color-text-dark)]/80 leading-relaxed">
                  Yes. Concierge planning can support full trips, single experiences, private events, boat days, celebrations and group logistics.
                </p>
              </div>
              <div className="border-t border-[color:var(--color-border-light)] pt-6">
                <h3 className="font-serif text-xl">Is concierge support available for groups?</h3>
                <p className="mt-3 font-sans text-sm font-light text-[var(--color-text-dark)]/80 leading-relaxed">
                  Yes. Millan Experiences works with bachelor and bachelorette groups, wedding guests, families, corporate teams and private groups visiting Colombia.
                </p>
              </div>
              <div className="border-t border-[color:var(--color-border-light)] pt-6">
                <h3 className="font-serif text-xl">Can the itinerary be customized?</h3>
                <p className="mt-3 font-sans text-sm font-light text-[var(--color-text-dark)]/80 leading-relaxed">
                  Yes. Each itinerary is shaped around guest preferences, travel dates, pace, privacy, budget range and the kind of Colombia experience the group wants.
                </p>
              </div>
            </div>
            <div className="mt-12">
              <Cta href="/contact" variant="outline" tone="dark">Start planning</Cta>
            </div>
          </div>
        </section>
      </main>
      
      <SiteFooter />
    </>
  )
}

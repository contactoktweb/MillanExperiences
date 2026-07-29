import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Preloader } from "@/components/preloader"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ContactSection } from "@/components/home/contact-section"
import { Cta } from "@/components/cta"
import { contact } from "@/lib/site-data"

export const metadata: Metadata = {
  title: "Private Aviation in Colombia",
  description:
    "Fly on your schedule, with total privacy and comfort. We arrange private aircraft for any domestic or international route — so you arrive where you need to be, exactly when you want.",
}

const faqItems = [
  {
    id: "faq-1",
    title: "What routes can you arrange?",
    content: (
      <p>
        We can source aircraft for any domestic Colombian route as well as regional flights to destinations like Panama City, Bogotá, Medellín, San Andrés, Santa Marta and beyond. If you have a specific route in mind, simply contact us and we&apos;ll confirm availability.
      </p>
    ),
  },
  {
    id: "faq-2",
    title: "How many passengers can fly?",
    content: (
      <p>
        It depends on the aircraft type. We work with turboprops, light jets and mid-size jets capable of carrying between 4 and 12 passengers. For larger groups, multi-aircraft solutions are also available.
      </p>
    ),
  },
  {
    id: "faq-3",
    title: "Can I choose my departure time?",
    content: (
      <p>
        Yes. One of the main advantages of private aviation is full scheduling flexibility. We coordinate your departure around your plans — not the other way around.
      </p>
    ),
  },
  {
    id: "faq-4",
    title: "How far in advance should I book?",
    content: (
      <p>
        We recommend booking at least 48–72 hours in advance for domestic routes. For international or more complex itineraries, earlier is always better to secure the right aircraft at the best rate.
      </p>
    ),
  },
]

export default function PrivateAviationPage() {
  return (
    <>
      <Preloader />
      <SiteHeader />
      
      <main id="main">
        {/* HERO SECTION */}
        <section className="relative flex min-h-[75svh] items-center overflow-hidden bg-[var(--color-deep-sea)] pt-32 pb-24 md:pb-32">
          <div className="absolute inset-0">
             <Image
                src="/millan/private-aviation-hero.webp"
                alt="Private Aviation in Colombia"
                fill
                priority
                className="object-cover opacity-50"
             />
             <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-deep-sea)]/90 via-[var(--color-deep-sea)]/50 to-transparent" />
          </div>
          <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 md:px-10 text-[var(--color-warm-white)]">
             <div className="max-w-2xl">
               <h2 className="eyebrow text-[var(--color-sand)]">SERVICES</h2>
               <h1 className="display mt-6 text-[clamp(3rem,5vw,5rem)] leading-tight">Private Aviation in Colombia</h1>
               <p className="mt-8 font-sans text-lg font-light leading-relaxed text-[var(--color-warm-white)]/85">
                 Fly on your schedule, with total privacy and comfort. We arrange private aircraft for any domestic or international route — so you arrive where you need to be, exactly when you want.
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
                Skip the terminal. Fly the way it should feel.
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
              <div className="relative aspect-[4/5] w-full max-w-md mx-auto lg:mx-0 overflow-hidden rounded-[min(var(--radius-lg),16px)]">
                <Image 
                  src="/millan/private-aviation-what-we-handle.webp" 
                  alt="Private Aviation" 
                  fill
                  className="object-cover" 
                />
              </div>
              <div className="lg:pl-12">
                <div className="space-y-6 font-sans text-base font-light leading-relaxed opacity-85 text-[var(--color-text-dark)]">
                  <p>
                    From a quick hop between Colombian cities to an international flight into the USA or beyond, we source and coordinate private aircraft tailored to your group size and route. No queues, no fixed schedules, no compromises — just a seamless journey from door to destination. Your dedicated aviation coordinator handles everything from the moment you confirm.
                  </p>
                  <p>Our private aviation service includes:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Private aircraft sourcing for any domestic or regional route</li>
                    <li>Flexible departure times — your schedule, always</li>
                    <li>Private terminal access (FBO)</li>
                    <li>Dedicated aviation coordinator from booking to landing</li>
                    <li>Ground transport on arrival</li>
                    <li>Baggage handling assistance</li>
                    <li>Full itinerary integration with your stay</li>
                    <li>Private Helicopter Experiences</li>
                    <li>24/7 support throughout your journey</li>
                  </ul>
                  <div className="pt-8">
                    <Cta href={contact.whatsapp} variant="solid" tone="dark">Request A Quote</Cta>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ BLOCK */}
        <section className="bg-[var(--color-card)] py-24 md:py-32 text-[var(--color-text-dark)]">
          <div className="mx-auto max-w-[1440px] px-6 md:px-10 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-24">
            <div>
              <h2 className="eyebrow text-[var(--color-blue-gray)]">FAQ</h2>
              <h3 className="display mt-6 text-[clamp(2.5rem,4vw,3.5rem)] leading-[1.1]">
                Everything you need to know
              </h3>
            </div>
            <div className="lg:pt-4">
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
                  src="/millan/limitless-villas.webp" 
                  alt="Luxury Villas and Islands" 
                  fill
                  className="object-cover transition-transform duration-[900ms] ease-[var(--ease-editorial)] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                <div className="relative z-10 mt-auto flex flex-col p-8">
                  <h4 className="font-serif text-2xl">Luxury Villas and Islands</h4>
                  <p className="mt-3 font-sans text-sm font-light text-white/80 line-clamp-3 mb-6">
                    Hand-selected luxury villas and private islands in Colombia&apos;s most desirable destinations.
                  </p>
                  <Link href="/luxury-villas" className="inline-block border border-white/30 rounded-full px-6 py-2.5 text-xs tracking-widest uppercase transition-colors hover:bg-white hover:text-black w-fit font-medium">
                    Explore Our Villas
                  </Link>
                </div>
              </div>
              
              {/* Card 2 */}
              <div className="group relative flex h-[450px] md:h-[500px] flex-col overflow-hidden rounded-[min(var(--radius-lg),16px)]">
                <Image 
                  src="/millan/limitless-boats.webp" 
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
                  src="/millan/limitless-events.webp" 
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
      </main>
      
      <SiteFooter />
    </>
  )
}

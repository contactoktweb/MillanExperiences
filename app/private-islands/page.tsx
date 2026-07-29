import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Preloader } from "@/components/preloader"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ContactSection } from "@/components/home/contact-section"
import { Cta } from "@/components/cta"

export const metadata: Metadata = {
  title: "Private Islands in Colombia | Millan Experiences",
  description:
    "Total privacy. Your own piece of the Caribbean. Our hand-selected private islands near Cartagena offer unmatched exclusivity for celebrations, retreats and unforgettable escapes.",
}

// Temporary static array. This will later be replaced by Sanity dynamic content.
const dummyIslands = [
  {
    id: "isla-mambo",
    title: "Isla Mambo",
    location: "Rosario Islands",
    capacity: 14,
    rooms: 7,
    bathrooms: 7,
    image: "/millan/isla-mambo.webp",
    href: "/private-islands/isla-mambo",
  },
]

export default function PrivateIslandsPage() {
  return (
    <>
      <Preloader />
      <SiteHeader />
      
      <main id="main">
        {/* HERO SECTION */}
        <section className="relative flex min-h-[75svh] items-center overflow-hidden bg-[var(--color-deep-sea)] pt-32 pb-24 md:pb-32">
          <div className="absolute inset-0">
             <Image
                src="/millan/private-islands-hero.webp"
                alt="Private Islands in Colombia"
                fill
                priority
                className="object-cover opacity-50"
             />
             <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-deep-sea)]/90 via-[var(--color-deep-sea)]/50 to-transparent" />
          </div>
          <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 md:px-10 text-[var(--color-warm-white)]">
             <div className="max-w-2xl">
               <h2 className="eyebrow text-[var(--color-sand)]">HOUSES</h2>
               <h1 className="display mt-6 text-[clamp(3rem,5vw,5rem)] leading-tight">Private Islands in Colombia</h1>
               <p className="mt-8 font-sans text-lg font-light leading-relaxed text-[var(--color-warm-white)]/85">
                 Total privacy. Your own piece of the Caribbean. Our hand-selected private islands near Cartagena offer unmatched exclusivity for celebrations, retreats and unforgettable escapes.
               </p>
               <div className="mt-10">
                 <Cta href="/contact" tone="sand">Contact us</Cta>
               </div>
             </div>
          </div>
        </section>

        {/* ISLANDS GRID */}
        <section className="bg-[var(--color-card)] py-24 md:py-32">
          <div className="mx-auto max-w-[1440px] px-6 md:px-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {dummyIslands.map((island) => (
                <div key={island.id} className="group flex flex-col overflow-hidden rounded-[min(var(--radius-lg),16px)] bg-[var(--color-warm-white)] shadow-sm transition-shadow hover:shadow-md">
                  <Link href={island.href} className="relative aspect-[4/3] w-full overflow-hidden block">
                    <Image 
                      src={island.image} 
                      alt={island.title} 
                      fill
                      className="object-cover transition-transform duration-[900ms] ease-[var(--ease-editorial)] group-hover:scale-105"
                    />
                  </Link>
                  <div className="flex flex-col p-8">
                    <Link href={island.href} className="inline-block hover:text-[var(--color-sand)] transition-colors">
                      <h3 className="font-serif text-2xl text-[var(--color-text-dark)]">{island.title}</h3>
                    </Link>
                    <div className="mt-6 flex flex-col gap-2 font-sans text-sm font-light text-[var(--color-blue-gray)]">
                      <p>{island.location}</p>
                      <p>Capacity: {island.capacity} pax</p>
                      <p>Rooms: {island.rooms}</p>
                      <p>Bathrooms: {island.bathrooms}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BENTO BANNER: YACHTS */}
        <section className="relative flex min-h-[50svh] items-center overflow-hidden bg-[var(--color-deep-sea)] py-24 md:py-32">
          <div className="absolute inset-0">
             <Image
                src="/millan/yachts-banner.webp"
                alt="Elevate your experience"
                fill
                className="object-cover opacity-60"
             />
             <div className="absolute inset-0 bg-black/40" />
          </div>
          <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 md:px-10 text-[var(--color-warm-white)] flex justify-center">
             <div className="max-w-3xl text-center">
               <h2 className="display text-[clamp(2.5rem,4vw,3.5rem)] leading-tight">Elevate your experience</h2>
               <p className="mt-6 font-sans text-lg font-light leading-relaxed text-[var(--color-warm-white)]/85">
                 Discover our yachts and catamarans designed for those seeking the ultimate in comfort, space, and style.
               </p>
               <div className="mt-10 flex justify-center">
                 <Cta href="/yachts-catamarans" tone="sand">Explore Yachts & Catamarans</Cta>
               </div>
             </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="bg-[var(--color-warm-white)] py-24 md:py-32">
          <div className="mx-auto max-w-[1440px] px-6 md:px-10">
            <div className="mx-auto max-w-4xl">
              <h2 className="font-serif text-3xl md:text-4xl text-[var(--color-text-dark)]">Private Islands in Colombia FAQ</h2>
              <p className="mt-4 text-lg font-light text-[var(--color-blue-gray)]">
                Private island experiences give groups a more secluded way to enjoy the Caribbean coast near Cartagena.
              </p>
              
              <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                <div className="border-t border-[var(--color-border)] pt-6">
                  <h3 className="font-serif text-xl text-[var(--color-text-dark)]">Can I book a private island near Cartagena for the day?</h3>
                  <p className="mt-4 font-sans text-[var(--color-blue-gray)] font-light leading-relaxed">
                    Yes. Millan Experiences curates private island options for day trips, celebrations and tailored escapes with boat transfers and service coordination.
                  </p>
                </div>
                <div className="border-t border-[var(--color-border)] pt-6">
                  <h3 className="font-serif text-xl text-[var(--color-text-dark)]">What services can be added to a private island experience?</h3>
                  <p className="mt-4 font-sans text-[var(--color-blue-gray)] font-light leading-relaxed">
                    Private chefs, drinks, boat transfers, music, decor, event support, staff coordination and concierge services can be arranged depending on the island.
                  </p>
                </div>
                <div className="border-t border-[var(--color-border)] pt-6">
                  <h3 className="font-serif text-xl text-[var(--color-text-dark)]">Are private islands good for weddings or celebrations?</h3>
                  <p className="mt-4 font-sans text-[var(--color-blue-gray)] font-light leading-relaxed">
                    Yes. Private islands can be a strong fit for intimate weddings, birthdays, bachelor and bachelorette plans, corporate retreats and premium group escapes.
                  </p>
                </div>
                <div className="border-t border-[var(--color-border)] pt-6">
                  <h3 className="font-serif text-xl text-[var(--color-text-dark)]">How does transportation to a private island work?</h3>
                  <p className="mt-4 font-sans text-[var(--color-blue-gray)] font-light leading-relaxed">
                    Millan Experiences coordinates boat transfers, timing, departure points and return logistics so the day stays comfortable and organized.
                  </p>
                </div>
              </div>
              
              <div className="mt-12">
                <Cta href="/contact" tone="sand" className="text-sm px-6 py-3" withArrow={false}>Start planning</Cta>
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

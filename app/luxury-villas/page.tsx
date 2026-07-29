import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Preloader } from "@/components/preloader"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ContactSection } from "@/components/home/contact-section"
import { Cta } from "@/components/cta"

export const metadata: Metadata = {
  title: "Luxury Villas in Cartagena",
  description:
    "Handpicked luxury villas in Cartagena's most exclusive locations. Where privacy, comfort, and timeless Caribbean elegance come together.",
}

// Temporary static array. This will later be replaced by Sanity dynamic content.
const dummyVillas = [
  {
    id: "casa-hilda",
    title: "Casa Hilda",
    location: "Historic Center",
    capacity: 15,
    rooms: 7,
    bathrooms: 8,
    image: "/millan/casa-hilda.webp",
    href: "/luxury-villas/casa-hilda",
  },
]

export default function LuxuryVillasPage() {
  return (
    <>
      <Preloader />
      <SiteHeader />
      
      <main id="main">
        {/* HERO SECTION */}
        <section className="relative flex min-h-[75svh] items-center overflow-hidden bg-[var(--color-deep-sea)] pt-32 pb-24 md:pb-32">
          <div className="absolute inset-0">
             <Image
                src="/millan/luxury-villas-hero.webp"
                alt="Luxury Villas in Cartagena"
                fill
                priority
                className="object-cover opacity-50"
             />
             <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-deep-sea)]/90 via-[var(--color-deep-sea)]/50 to-transparent" />
          </div>
          <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 md:px-10 text-[var(--color-warm-white)]">
             <div className="max-w-2xl">
               <h2 className="eyebrow text-[var(--color-sand)]">HOUSES</h2>
               <h1 className="display mt-6 text-[clamp(3rem,5vw,5rem)] leading-tight">Luxury Villas</h1>
               <p className="mt-8 font-sans text-lg font-light leading-relaxed text-[var(--color-warm-white)]/85">
                 Handpicked luxury villas in Cartagena&apos;s most exclusive locations. Where privacy, comfort, and timeless Caribbean elegance come together.
               </p>
               <div className="mt-10">
                 <Cta href="/contact" tone="sand">Book Your Villa</Cta>
               </div>
             </div>
          </div>
        </section>

        {/* VILLAS GRID */}
        <section className="bg-[var(--color-card)] py-24 md:py-32">
          <div className="mx-auto max-w-[1440px] px-6 md:px-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {dummyVillas.map((villa) => (
                <div key={villa.id} className="group flex flex-col overflow-hidden rounded-[min(var(--radius-lg),16px)] bg-[var(--color-warm-white)] shadow-sm transition-shadow hover:shadow-md">
                  <Link href={villa.href} className="relative aspect-[4/3] w-full overflow-hidden block">
                    <Image 
                      src={villa.image} 
                      alt={villa.title} 
                      fill
                      className="object-cover transition-transform duration-[900ms] ease-[var(--ease-editorial)] group-hover:scale-105"
                    />
                  </Link>
                  <div className="flex flex-col p-8">
                    <Link href={villa.href} className="inline-block hover:text-[var(--color-sand)] transition-colors">
                      <h3 className="font-serif text-2xl text-[var(--color-text-dark)]">{villa.title}</h3>
                    </Link>
                    <div className="mt-6 flex flex-col gap-2 font-sans text-sm font-light text-[var(--color-blue-gray)]">
                      <p>{villa.location}</p>
                      <p>Capacity: {villa.capacity} pax</p>
                      <p>Rooms: {villa.rooms}</p>
                      <p>Bathrooms: {villa.bathrooms}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BENTO BANNER: PRIVATE ISLANDS */}
        <section className="relative flex min-h-[50svh] items-center overflow-hidden bg-[var(--color-deep-sea)] py-24 md:py-32">
          <div className="absolute inset-0">
             <Image
                src="/millan/private-island-banner.webp"
                alt="Discover Your Private Island"
                fill
                className="object-cover opacity-60"
             />
             <div className="absolute inset-0 bg-black/40" />
          </div>
          <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 md:px-10 text-[var(--color-warm-white)] flex justify-center">
             <div className="max-w-3xl text-center">
               <h2 className="display text-[clamp(2.5rem,4vw,3.5rem)] leading-tight">Discover Your Private Island</h2>
               <p className="mt-6 font-sans text-lg font-light leading-relaxed text-[var(--color-warm-white)]/85">
                 Looking for something even more exclusive? Explore our curated selection of private islands near Cartagena—designed for total privacy, elevated experiences, and unforgettable celebrations.
               </p>
               <div className="mt-10 flex justify-center">
                 <Cta href="/private-islands" tone="sand">Explore Private Islands</Cta>
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

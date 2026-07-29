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
  title: "Private Tours and Experiences in Colombia",
  description:
    "Colombia seen through the eyes of someone who truly knows it. Our private tours are crafted around you — your rhythm, your curiosity, your pace.",
}

const exploreCards = [
  {
    title: "Historic Tours",
    description: "A guided journey through the city — colonial churches, hidden plazas, fortresses and stories behind every stone. Private guide, your pace.",
    image: "/millan/private-tours-historic.webp",
  },
  {
    title: "Art, Design & Fashion",
    description: "From the ateliers of local designers to curated gallery visits and artisan workshops — an insider's tour through Colombia's most creative scene.",
    image: "/millan/private-tours-art.webp", 
  },
  {
    title: "Gastronomic Experiences",
    description: "A market conversation, a rooftop table at sunset, a kitchen you would never find on your own — each experience feels intimate.",
    image: "/millan/private-tours-gastronomic.webp", 
  },
  {
    title: "Wellness Experience",
    description: "Private yoga at sunrise, cacao ceremonies, spa treatments and nature immersion. A journey designed to bring you back to yourself.",
    image: "/millan/private-tours-wellness.webp", 
  },
  {
    title: "Cultural Imersion",
    description: "Cartagena's identity is shaped by many roots — African heritage, colonial influence, Indigenous craftsmanship, music, dance, and traditions that still live in everyday life.",
    image: "/millan/private-tours-cultural.webp",
  },
  {
    title: "Adrenaline & Sports",
    description: "Kitesurfing, diving, ATV rides and more. We design adrenaline-packed itineraries for those who want to push further and experience a different angle.",
    image: "/millan/private-tours-adrenaline.webp",
  },
  {
    title: "Ecotourism",
    description: "Explore mangrove channels, coral reefs, and birdwatching routes shaped by regional biodiversity. Private, guided, and sustainable.",
    image: "/millan/private-tours-ecotourism.webp",
  },
  {
    title: "Islands & Beachclubs",
    description: "Some of the best moments in Cartagena happen on Private islands, exclusive beach clubs and open water — all arranged so you can arrive and enjoy.",
    image: "/millan/private-tours-islands.webp",
  },
  {
    title: "Kid Friendly Experiences",
    description: "Interactive, engaging and genuinely fun — experiences designed with younger travelers in mind.",
    image: "/millan/private-tours-kids.webp",
  }
]

export default function PrivateToursPage() {
  return (
    <>
      <Preloader />
      <SiteHeader />
      
      <main id="main">
        {/* HERO SECTION */}
        <section className="relative flex min-h-[75svh] items-center overflow-hidden bg-[var(--color-deep-sea)] pt-32 pb-24 md:pb-32">
          <div className="absolute inset-0">
             <Image
                src="/millan/private-tours-hero.webp"
                alt="Private Tours in Colombia"
                fill
                priority
                className="object-cover opacity-50"
             />
             <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-deep-sea)]/90 via-[var(--color-deep-sea)]/50 to-transparent" />
          </div>
          <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 md:px-10 text-[var(--color-warm-white)]">
             <div className="max-w-2xl">
               <h2 className="eyebrow text-[var(--color-sand)]">SERVICES</h2>
               <h1 className="display mt-6 text-[clamp(3rem,5vw,5rem)] leading-tight">Private Tours and Experiences in Colombia</h1>
               <p className="mt-8 font-sans text-lg font-light leading-relaxed text-[var(--color-warm-white)]/85">
                 Colombia seen through the eyes of someone who truly knows it. Our private tours are crafted around you — your rhythm, your curiosity, your pace.
               </p>
               <div className="mt-10">
                 <Cta href="/contact" tone="sand">Contact us</Cta>
               </div>
             </div>
          </div>
        </section>

        {/* EXPLORE CARTAGENA */}
        <section className="bg-[var(--color-warm-white)] py-24 md:py-32 text-[var(--color-text-dark)]">
          <div className="mx-auto max-w-[1440px] px-6 md:px-10">
            <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
              <h2 className="eyebrow text-[var(--color-blue-gray)]">EXPLORE CARTAGENA</h2>
              <h3 className="display mt-6 text-[clamp(2rem,4vw,3.5rem)] leading-tight">
                What we can design for you
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {exploreCards.map((card, idx) => (
                <div key={idx} className="group relative flex h-[450px] md:h-[500px] flex-col overflow-hidden rounded-[min(var(--radius-lg),16px)]">
                  <Image 
                    src={card.image} 
                    alt={card.title} 
                    fill 
                    className="object-cover transition-transform duration-[900ms] ease-[var(--ease-editorial)] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />
                  <div className="relative z-10 mt-auto flex flex-col p-8 text-white">
                    <h4 className="font-serif text-2xl">{card.title}</h4>
                    <p className="mt-3 font-sans text-sm font-light text-white/85 line-clamp-4 mb-6">
                      {card.description}
                    </p>
                    <a 
                      href={contact.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer" 
                      className="inline-block border border-white/40 rounded-full px-6 py-2.5 text-xs tracking-widest uppercase transition-colors hover:bg-white hover:text-black w-fit font-medium"
                    >
                      Book your journey
                    </a>
                  </div>
                </div>
              ))}
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

import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Preloader } from "@/components/preloader"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ContactSection } from "@/components/home/contact-section"
import { Cta } from "@/components/cta"

export const metadata: Metadata = {
  title: "Destination Weddings in Cartagena | Millan Experiences",
  description:
    "A city built for love stories. We design and orchestrate every detail of your day — so you can simply be present for every moment of it.",
}

const experienceSteps = [
  {
    title: "The Ceremony",
    subtitle: "Your Perfect Venue",
    description: "Colonial palaces, bougainvillea courtyards, private islands or rooftop terraces. We source and secure the venue that matches your vision exactly.",
    image: "/millan/cel-exp-dinner.webp"
  },
  {
    title: "The Reception",
    subtitle: "An Evening to Remember",
    description: "Custom menu, live music, décor and lighting — all designed around you. Our team coordinates every detail so the night unfolds without a single hiccup.",
    image: "/millan/cel-exp-island.webp"
  },
  {
    title: "Your Guests",
    subtitle: "A Full Guest Concierge",
    description: "Airport transfers, hotel blocks, villa accommodations and a dedicated concierge for your guests. Every person in your party is taken care of.",
    image: "/millan/cel-exp-yacht.webp"
  }
]

const addons = [
  { title: "Professional photographer", image: "/millan/wed-addon-photo.webp" },
  { title: "Bachelor/ bachelorette experience", image: "/millan/wed-addon-bachelor.webp" },
  { title: "Post-wedding party", image: "/millan/wed-addon-post.webp" },
  { title: "Pre-wedding boat day", image: "/millan/wed-addon-boat.webp" },
  { title: "Welcome dinner for guests", image: "/millan/wed-addon-welcome.webp" },
  { title: "Live music or DJ", image: "/millan/addon-music.webp" },
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

const whyMillan = [
  {
    title: "1. End-to-end Logistics",
    content: "Flights, hotels, ground transport, meals and activities — all managed through a single dedicated coordinator."
  },
  {
    title: "2. Group accommodations",
    content: "Private villas, hotel blocks and exclusive venue buyouts for groups of any size, in Cartagena's best locations."
  },
  {
    title: "3. Bilingual On-Site Team",
    content: "English-speaking coordinators accompany your group throughout the entire trip — always one step ahead."
  },
  {
    title: "4. Tailor-Made Programming",
    content: "Every agenda item is designed around your group's culture, goals and energy — no generic packages."
  }
]

export default function WeddingsPage() {
  return (
    <>
      <Preloader />
      <SiteHeader />
      
      <main id="main">
        {/* HERO SECTION */}
        <section className="relative flex min-h-[85svh] items-center overflow-hidden bg-[var(--color-deep-sea)] pt-32 pb-24 md:pb-32">
          <div className="absolute inset-0">
             <Image
                src="/millan/wed-hero.webp"
                alt="Destination Weddings in Cartagena"
                fill
                priority
                className="object-cover opacity-60"
             />
             <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-deep-sea)]/80 via-[var(--color-deep-sea)]/40 to-transparent" />
          </div>
          <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 md:px-10 text-[var(--color-warm-white)]">
             <div className="max-w-2xl">
               <h2 className="eyebrow text-[var(--color-sand)] uppercase tracking-widest text-sm mb-4">Groups & events</h2>
               <h1 className="display mt-4 text-[clamp(3rem,5vw,5rem)] leading-tight">Destination Weddings in Cartagena</h1>
               <p className="mt-8 font-sans text-lg font-light leading-relaxed text-[var(--color-warm-white)]/90">
                 A city built for love stories. We design and orchestrate every detail of your day — so you can simply be present for every moment of it.
               </p>
               <div className="mt-10">
                 <Cta href="/contact" tone="sand">Plan Your Wedding</Cta>
               </div>
             </div>
          </div>
        </section>

        {/* QUOTE SECTION */}
        <section className="bg-[var(--color-card)] py-20 md:py-28 text-center px-6">
          <div className="max-w-4xl mx-auto">
            <h3 className="font-serif text-2xl md:text-3xl leading-relaxed text-[var(--color-text-dark)]">
              "You've planned enough. On your wedding day, we carry the weight — so you can simply be present for every moment of it."
            </h3>
          </div>
        </section>

        {/* THE EXPERIENCE */}
        <section className="bg-[var(--color-warm-white)] py-24 md:py-32">
          <div className="mx-auto max-w-[1440px] px-6 md:px-10">
            <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
              <span className="eyebrow text-[var(--color-blue-gray)] uppercase tracking-widest text-sm">THE EXPERIENCE</span>
              <h2 className="mt-6 font-serif text-4xl md:text-5xl text-[var(--color-text-dark)]">Designed to inspire, connect and reward</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {experienceSteps.map((step, index) => (
                <div key={index} className="flex flex-col overflow-hidden rounded-[min(var(--radius-lg),16px)] bg-[var(--color-card)] shadow-sm">
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image 
                      src={step.image} 
                      alt={step.title} 
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col p-8 md:p-10 flex-grow">
                    <span className="font-sans text-sm font-semibold tracking-widest uppercase text-[var(--color-sand)]">{step.title}</span>
                    <h3 className="font-serif text-2xl text-[var(--color-text-dark)] mt-3 mb-4">{step.subtitle}</h3>
                    <p className="font-sans text-[var(--color-blue-gray)] font-light leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* WHY MILLAN FOR GROUPS */}
        <section className="bg-[var(--color-card)] py-24 md:py-32 border-y border-[var(--color-border)]">
           <div className="mx-auto max-w-[1440px] px-6 md:px-10">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
               {/* Left side text */}
               <div>
                  <span className="eyebrow text-[var(--color-blue-gray)] uppercase tracking-widest text-sm">WHY MILLAN FOR GROUPS</span>
                  <h2 className="mt-6 font-serif text-4xl md:text-5xl text-[var(--color-text-dark)] leading-tight">One contact, everything handled.</h2>
               </div>
               
               {/* Right side accordion */}
               <div className="flex flex-col">
                 {whyMillan.map((item, index) => (
                   <details key={index} className="group border-b border-[var(--color-border)] [&_summary::-webkit-details-marker]:hidden" open={index === 0}>
                     <summary className="flex cursor-pointer items-center justify-between py-6 font-serif text-xl md:text-2xl text-[var(--color-text-dark)] transition-colors hover:text-[var(--color-sand)]">
                       <span className="font-normal">{item.title}</span>
                       <span className="ml-6 flex-shrink-0 transition duration-300 group-open:-rotate-180">
                         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                       </span>
                     </summary>
                     <div className="pb-6">
                       <p className="font-sans text-lg font-light text-[var(--color-blue-gray)] leading-relaxed">
                         {item.content}
                       </p>
                     </div>
                   </details>
                 ))}
               </div>
             </div>
           </div>
        </section>

        {/* MAKE IT YOURS (ADD-ONS) */}
        <section className="bg-[var(--color-card)] py-24 md:py-32">
          <div className="mx-auto max-w-[1440px] px-6 md:px-10">
            <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
              <span className="eyebrow text-[var(--color-blue-gray)] uppercase tracking-widest text-sm">MAKE IT YOURS</span>
              <h2 className="mt-6 font-serif text-3xl md:text-4xl text-[var(--color-text-dark)]">Popular add-ons</h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {addons.map((addon, index) => (
                <div key={index} className="flex flex-col group">
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[min(var(--radius-md),12px)] shadow-sm transition-transform duration-500 group-hover:-translate-y-1">
                    <Image 
                      src={addon.image} 
                      alt={addon.title} 
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="font-serif text-lg text-[var(--color-text-dark)] mt-4 text-center leading-snug">
                    {addon.title}
                  </h3>
                </div>
              ))}
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
      </main>
      
      <SiteFooter />
    </>
  )
}

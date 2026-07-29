import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Preloader } from "@/components/preloader"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ContactSection } from "@/components/home/contact-section"
import { Cta } from "@/components/cta"

export const metadata: Metadata = {
  title: "Bachelor and Bachelorette Parties in Cartagena | Millan Experiences",
  description:
    "Your trip, your pace, your group. We design the whole experience — your only job is to celebrate.",
}

const experienceSteps = [
  {
    title: "Stay",
    subtitle: "Your Private Base",
    description: "A hand-picked villa exclusively for your group — welcome drinks ready on arrival, your concierge on call, and every comfort taken care of for the duration of your stay.",
    image: "/millan/exp-stay.webp"
  },
  {
    title: "Sea",
    subtitle: "The Island Experience",
    description: "Private speedboat, your own island or beach club, floating cooler, open bar and a Caribbean sunset. The kind of day nobody wants to end.",
    image: "/millan/exp-sea.webp"
  },
  {
    title: "Night",
    subtitle: "The Nights Are Yours",
    description: "Rooftop dinners, VIP club access, bottle service and the best of Cartagena's nightlife — curated and reserved so your group never waits for anything.",
    image: "/millan/exp-night.webp"
  }
]

const addons = [
  { title: "Professional photographer", image: "/millan/addon-photo.webp" },
  { title: "Gifts, decoration & custom cake", image: "/millan/addon-gifts.webp" },
  { title: "Spa & wellness experience", image: "/millan/addon-spa.webp" },
  { title: "Private Chef & bartender", image: "/millan/addon-chef.webp" },
  { title: "Live music or DJ", image: "/millan/addon-music.webp" },
  { title: "Bodyguard or host", image: "/millan/addon-bodyguard.webp" },
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

export default function BachelorPartiesPage() {
  return (
    <>
      <Preloader />
      <SiteHeader />
      
      <main id="main">
        {/* HERO SECTION */}
        <section className="relative flex min-h-[85svh] items-center overflow-hidden bg-[var(--color-deep-sea)] pt-32 pb-24 md:pb-32">
          <div className="absolute inset-0">
             <Image
                src="/millan/bachelor-hero.webp"
                alt="Bachelor and Bachelorette Parties in Cartagena"
                fill
                priority
                className="object-cover opacity-60"
             />
             <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-deep-sea)]/80 via-[var(--color-deep-sea)]/40 to-transparent" />
          </div>
          <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 md:px-10 text-[var(--color-warm-white)]">
             <div className="max-w-2xl">
               <h2 className="eyebrow text-[var(--color-sand)] uppercase tracking-widest text-sm mb-4">Groups & events</h2>
               <h1 className="display mt-4 text-[clamp(3rem,5vw,5rem)] leading-tight">Bachelor and Bachelorette Parties in Cartagena</h1>
               <h2 className="mt-4 font-serif text-2xl md:text-3xl text-[var(--color-sand)]">Bachelorette Parties</h2>
               <p className="mt-8 font-sans text-lg font-light leading-relaxed text-[var(--color-warm-white)]/90">
                 Your trip, your pace, your group. We design the whole experience — your only job is to celebrate.
               </p>
               <div className="mt-10">
                 <Cta href="/contact" tone="sand">Contact us</Cta>
               </div>
             </div>
          </div>
        </section>

        {/* QUOTE SECTION */}
        <section className="bg-[var(--color-card)] py-20 md:py-28 text-center px-6">
          <div className="max-w-4xl mx-auto">
            <h3 className="font-serif text-2xl md:text-3xl leading-relaxed text-[var(--color-text-dark)]">
              "Every celebration is different. We take the time to understand what matters to you — and then we build something around that, not around a template."
            </h3>
          </div>
        </section>

        {/* THE EXPERIENCE */}
        <section className="bg-[var(--color-warm-white)] py-24 md:py-32">
          <div className="mx-auto max-w-[1440px] px-6 md:px-10">
            <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
              <span className="eyebrow text-[var(--color-blue-gray)] uppercase tracking-widest text-sm">THE EXPERIENCE</span>
              <h2 className="mt-6 font-serif text-4xl md:text-5xl text-[var(--color-text-dark)]">Everything a great group trip needs</h2>
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

import Image from "next/image"
import Link from "next/link"
import { Preloader } from "@/components/preloader"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ContactSection } from "@/components/home/contact-section"
import { Cta } from "@/components/cta"

interface EventPageProps {
  content: any;
  locale: string;
}

export function EventPageComponent({ content, locale }: EventPageProps) {
  const { hero, quoteSection, experienceSteps, whyMillan, addons, possibilities } = content

  return (
    <>
      <Preloader />
      <SiteHeader />
      
      <main id="main">
        {/* HERO SECTION */}
        {hero && (
          <section className="relative flex min-h-[85svh] items-center overflow-hidden bg-[var(--color-deep-sea)] pt-32 pb-24 md:pb-32">
            <div className="absolute inset-0">
               <Image
                  src={hero.backgroundImageUrl || "/placeholder.svg"}
                  alt={hero.headline || ""}
                  fill
                  priority
                  className="object-cover opacity-60"
               />
               <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-deep-sea)]/80 via-[var(--color-deep-sea)]/40 to-transparent" />
            </div>
            <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 md:px-10 text-[var(--color-warm-white)]">
               <div className="max-w-2xl">
                 {hero.eyebrow && <h2 className="eyebrow text-[var(--color-sand)] uppercase tracking-widest text-sm mb-4">{hero.eyebrow}</h2>}
                 <h1 className="display mt-4 text-[clamp(3rem,5vw,5rem)] leading-tight">{hero.headline}</h1>
                 {hero.subHeadline && <h2 className="mt-4 font-serif text-2xl md:text-3xl text-[var(--color-sand)]">{hero.subHeadline}</h2>}
                 {hero.description && (
                   <p className="mt-8 font-sans text-lg font-light leading-relaxed text-[var(--color-warm-white)]/90">
                     {hero.description}
                   </p>
                 )}
                 {hero.cta && (
                   <div className="mt-10">
                     <Cta href={hero.cta.href} tone="sand">{hero.cta.label}</Cta>
                   </div>
                 )}
               </div>
            </div>
          </section>
        )}

        {/* QUOTE SECTION */}
        {quoteSection?.quote && (
          <section className="bg-[var(--color-card)] py-20 md:py-28 text-center px-6">
            <div className="max-w-4xl mx-auto">
              <h3 className="font-serif text-2xl md:text-3xl leading-relaxed text-[var(--color-text-dark)]">
                {quoteSection.quote}
              </h3>
            </div>
          </section>
        )}

        {/* THE EXPERIENCE */}
        {experienceSteps && experienceSteps.length > 0 && (
          <section className="bg-[var(--color-warm-white)] py-24 md:py-32">
            <div className="mx-auto max-w-[1440px] px-6 md:px-10">
              <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
                <span className="eyebrow text-[var(--color-blue-gray)] uppercase tracking-widest text-sm">{locale === 'es' ? 'LA EXPERIENCIA' : 'THE EXPERIENCE'}</span>
                <h2 className="mt-6 font-serif text-4xl md:text-5xl text-[var(--color-text-dark)]">{locale === 'es' ? 'Todo lo que necesitas' : 'Everything you need'}</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {experienceSteps.map((step: any, index: number) => (
                  <div key={index} className="flex flex-col overflow-hidden rounded-[min(var(--radius-lg),16px)] bg-[var(--color-card)] shadow-sm">
                    <div className="relative aspect-[4/3] w-full overflow-hidden">
                      <Image 
                        src={step.imageUrl || "/placeholder.svg"} 
                        alt={step.title || ""} 
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col p-8 md:p-10 flex-grow">
                      <span className="font-sans text-sm font-semibold tracking-widest uppercase text-[var(--color-sand)]">{step.title}</span>
                      {step.subtitle && <h3 className="font-serif text-2xl text-[var(--color-text-dark)] mt-3 mb-4">{step.subtitle}</h3>}
                      <p className="font-sans text-[var(--color-blue-gray)] font-light leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
        
        {/* WHY MILLAN FOR GROUPS */}
        {whyMillan && whyMillan.length > 0 && (
          <section className="bg-[var(--color-card)] py-24 md:py-32 border-y border-[var(--color-border)]">
             <div className="mx-auto max-w-[1440px] px-6 md:px-10">
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                 <div>
                    <span className="eyebrow text-[var(--color-blue-gray)] uppercase tracking-widest text-sm">{locale === 'es' ? 'POR QUÉ MILLAN' : 'WHY MILLAN'}</span>
                    <h2 className="mt-6 font-serif text-4xl md:text-5xl text-[var(--color-text-dark)] leading-tight">{locale === 'es' ? 'Un contacto, todo resuelto.' : 'One contact, everything handled.'}</h2>
                 </div>
                 
                 <div className="flex flex-col">
                   {whyMillan.map((item: any, index: number) => (
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
        )}

        {/* MAKE IT YOURS (ADD-ONS) */}
        {addons && addons.length > 0 && (
          <section className="bg-[var(--color-card)] py-24 md:py-32">
            <div className="mx-auto max-w-[1440px] px-6 md:px-10">
              <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
                <span className="eyebrow text-[var(--color-blue-gray)] uppercase tracking-widest text-sm">{locale === 'es' ? 'HAZLO TUYO' : 'MAKE IT YOURS'}</span>
                <h2 className="mt-6 font-serif text-3xl md:text-4xl text-[var(--color-text-dark)]">{locale === 'es' ? 'Complementos populares' : 'Popular add-ons'}</h2>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {addons.map((addon: any, index: number) => (
                  <div key={index} className="flex flex-col group">
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[min(var(--radius-md),12px)] shadow-sm transition-transform duration-500 group-hover:-translate-y-1">
                      <Image 
                        src={addon.imageUrl || "/placeholder.svg"} 
                        alt={addon.title || ""} 
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
        )}

        {/* LIMITLESS POSSIBILITIES */}
        {possibilities && possibilities.length > 0 && (
          <section className="bg-[var(--color-warm-white)] py-24 md:py-32">
            <div className="mx-auto max-w-[1440px] px-6 md:px-10">
              <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
                <span className="eyebrow text-[var(--color-blue-gray)] uppercase tracking-widest text-sm">{locale === 'es' ? 'POSIBILIDADES INFINITAS' : 'LIMITLESS POSIBILITIES'}</span>
                <h2 className="mt-6 font-serif text-3xl md:text-4xl text-[var(--color-text-dark)]">{locale === 'es' ? 'Si puedes imaginarlo, podemos orquestarlo' : 'If you can envision it, we can orchestrate it'}</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {possibilities.map((pos: any, index: number) => (
                  <div key={index} className="group relative flex flex-col justify-end overflow-hidden rounded-[min(var(--radius-lg),16px)] aspect-[4/5] p-8">
                    <Image 
                      src={pos.imageUrl || "/placeholder.svg"} 
                      alt={pos.title || ""} 
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
        )}

        {/* CONTACT SECTION */}
        <ContactSection />
      </main>
      
      <SiteFooter />
    </>
  )
}

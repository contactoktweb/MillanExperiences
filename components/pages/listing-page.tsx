import Image from "next/image"
import Link from "next/link"
import { Preloader } from "@/components/preloader"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ContactSection } from "@/components/home/contact-section"
import { Cta } from "@/components/cta"

interface ListingPageProps {
  content: any;
  locale: string;
}

export function ListingPageComponent({ content, locale }: ListingPageProps) {
  return (
    <>
      <Preloader />
      <SiteHeader />
      
      <main id="main">
        {/* HERO SECTION */}
        {content.hero && (
          <section className="relative flex min-h-[75svh] items-center overflow-hidden bg-[var(--color-deep-sea)] pt-32 pb-24 md:pb-32">
            <div className="absolute inset-0">
               {content.hero.backgroundImageUrl && (
                 <Image
                    src={content.hero.backgroundImageUrl}
                    alt={content.hero.title || ""}
                    fill
                    priority
                    className="object-cover opacity-50"
                 />
               )}
               <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-deep-sea)]/90 via-[var(--color-deep-sea)]/50 to-transparent" />
            </div>
            <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 md:px-10 text-[var(--color-warm-white)]">
               <div className="max-w-2xl">
                 {content.hero.eyebrow && (
                   <h2 className="eyebrow text-[var(--color-sand)]">{content.hero.eyebrow}</h2>
                 )}
                 <h1 className="display mt-6 text-[clamp(3rem,5vw,5rem)] leading-tight">{content.hero.title}</h1>
                 {content.hero.description && (
                   <p className="mt-8 font-sans text-lg font-light leading-relaxed text-[var(--color-warm-white)]/85">
                     {content.hero.description}
                   </p>
                 )}
                 {content.hero.cta && (
                   <div className="mt-10">
                     <Cta href={content.hero.cta.href} tone="sand">{content.hero.cta.label}</Cta>
                   </div>
                 )}
               </div>
            </div>
          </section>
        )}

        {/* PROCESS STEPS */}
        {content.processSteps && content.processSteps.length > 0 && (
          <section className="bg-[var(--color-warm-white)] py-16 md:py-24 border-b border-[var(--color-border)]">
            <div className="mx-auto max-w-[1440px] px-6 md:px-10">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-10">
                {content.processSteps.map((step: any, idx: number) => (
                  <div key={idx} className="flex flex-col items-center text-center group">
                    <div className="flex flex-col items-center w-full max-w-[200px]">
                      <span className="font-serif text-lg text-[var(--color-text-dark)]">{step.number}. {step.title}</span>
                      <div className="w-full h-[1px] bg-[var(--color-border)] my-4"></div>
                      <div className="relative w-20 h-20 md:w-24 md:h-24 my-2 opacity-80 group-hover:opacity-100 transition-opacity">
                        {step.imageUrl && (
                          <Image 
                            src={step.imageUrl} 
                            alt={step.title || ""} 
                            fill 
                            className="object-contain"
                          />
                        )}
                      </div>
                      <p className="mt-4 font-sans text-sm font-light text-[var(--color-blue-gray)] leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* GRID SECTION */}
        {content.grid && content.grid.items && content.grid.items.length > 0 && (
          <section className="bg-[var(--color-card)] py-24 md:py-32">
            <div className="mx-auto max-w-[1440px] px-6 md:px-10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {content.grid.items.map((item: any, idx: number) => (
                  <div key={idx} className="group flex flex-col overflow-hidden rounded-[min(var(--radius-lg),16px)] bg-[var(--color-warm-white)] shadow-sm transition-shadow hover:shadow-md">
                    <Link href={item.href || "#"} className="relative aspect-[4/3] w-full overflow-hidden block">
                      {item.imageUrl && (
                        <Image 
                          src={item.imageUrl} 
                          alt={item.title || ""} 
                          fill
                          className="object-cover transition-transform duration-[900ms] ease-[var(--ease-editorial)] group-hover:scale-105"
                        />
                      )}
                    </Link>
                    <div className="flex flex-col p-8">
                      <Link href={item.href || "#"} className="inline-block hover:text-[var(--color-sand)] transition-colors">
                        <h3 className="font-serif text-2xl text-[var(--color-text-dark)]">{item.title}</h3>
                      </Link>
                      <div className="mt-6 flex flex-col gap-2 font-sans text-sm font-light text-[var(--color-blue-gray)]">
                        {item.dimensions && <p>{locale === "es" ? "Dimensiones:" : "Dimensions:"} {item.dimensions}</p>}
                        {item.location && <p>{item.location}</p>}
                        {item.capacity && <p>{locale === "es" ? "Capacidad:" : "Capacity:"} {item.capacity} pax</p>}
                        {item.rooms && <p>{locale === "es" ? "Habitaciones:" : "Rooms:"} {item.rooms}</p>}
                        {item.bathrooms && <p>{locale === "es" ? "Baños:" : "Bathrooms:"} {item.bathrooms}</p>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* BENTO BANNER */}
        {content.bentoBanner && (
          <section className="relative flex min-h-[50svh] items-center overflow-hidden bg-[var(--color-deep-sea)] py-24 md:py-32">
            <div className="absolute inset-0">
               {content.bentoBanner.backgroundImageUrl && (
                 <Image
                    src={content.bentoBanner.backgroundImageUrl}
                    alt={content.bentoBanner.title || ""}
                    fill
                    className="object-cover opacity-60"
                 />
               )}
               <div className="absolute inset-0 bg-black/40" />
            </div>
            <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 md:px-10 text-[var(--color-warm-white)] flex justify-center">
               <div className="max-w-3xl text-center">
                 <h2 className="display text-[clamp(2.5rem,4vw,3.5rem)] leading-tight">{content.bentoBanner.title}</h2>
                 {content.bentoBanner.description && (
                   <p className="mt-6 font-sans text-lg font-light leading-relaxed text-[var(--color-warm-white)]/85">
                     {content.bentoBanner.description}
                   </p>
                 )}
                 {content.bentoBanner.cta && (
                   <div className="mt-10 flex justify-center">
                     <Cta href={content.bentoBanner.cta.href} tone="sand">{content.bentoBanner.cta.label}</Cta>
                   </div>
                 )}
               </div>
            </div>
          </section>
        )}

        {/* SEO FAQ SECTION (e.g. for Islands) */}
        {content.seoFaq && (
          <section className="bg-[var(--color-warm-white)] py-24 md:py-32">
            <div className="mx-auto max-w-[1440px] px-6 md:px-10">
              <div className="mx-auto max-w-4xl">
                <h2 className="font-serif text-3xl md:text-4xl text-[var(--color-text-dark)]">{content.seoFaq.title}</h2>
                {content.seoFaq.description && (
                  <p className="mt-4 text-lg font-light text-[var(--color-blue-gray)]">
                    {content.seoFaq.description}
                  </p>
                )}
                
                {content.seoFaq.questions && content.seoFaq.questions.length > 0 && (
                  <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    {content.seoFaq.questions.map((item: any, idx: number) => (
                      <div key={idx} className="border-t border-[var(--color-border)] pt-6">
                        <h3 className="font-serif text-xl text-[var(--color-text-dark)]">{item.question}</h3>
                        <p className="mt-4 font-sans text-[var(--color-blue-gray)] font-light leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
                
                {content.seoFaq.cta && (
                  <div className="mt-12">
                    <Cta href={content.seoFaq.cta.href} tone="sand" className="text-sm px-6 py-3" withArrow={false}>
                      {content.seoFaq.cta.label}
                    </Cta>
                  </div>
                )}
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

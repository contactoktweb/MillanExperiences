import Image from "next/image"
import Link from "next/link"
import { Preloader } from "@/components/preloader"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ContactSection } from "@/components/home/contact-section"
import { Cta } from "@/components/cta"
import { FaqAccordion } from "@/components/faq-accordion"

interface ListingPageProps {
  content: any;
  locale: string;
}

export function ListingPageComponent({ content, locale }: ListingPageProps) {
  if (content.isHub) {
    const left = content.contentEn?.hubLeft;
    const right = content.contentEn?.hubRight;
    
    // In Spanish locale, we'd use content.contentEs if available, but since we usually pass 'content' containing the correct locale's data (because we did contentEn or contentEs depending on locale in the page.tsx), wait!
    // The query returns both contentEn and contentEs! So we must select based on locale.
    const localizedContent = locale === 'es' ? content.contentEs : content.contentEn;
    const hubLeft = localizedContent?.hubLeft;
    const hubRight = localizedContent?.hubRight;

    return (
      <>
        <Preloader />
        <SiteHeader />
        
        <main id="main" className="flex flex-col md:flex-row min-h-screen">
          {/* LEFT HALF */}
          <Link href={hubLeft?.href || "#"} className="relative group w-full md:w-1/2 min-h-[50vh] md:min-h-screen overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 z-0 bg-[var(--color-deep-sea)]">
              {hubLeft?.imageUrl && (
                <Image
                  src={hubLeft.imageUrl}
                  alt={hubLeft?.title || ""}
                  fill
                  priority
                  className="object-cover transition-transform duration-[1.5s] group-hover:scale-110 opacity-70 group-hover:opacity-100"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-deep-sea)] via-[var(--color-deep-sea)]/40 to-[var(--color-deep-sea)]/70 transition-colors duration-700 group-hover:via-[var(--color-deep-sea)]/50" />
            </div>
            <div className="relative z-10 flex flex-col items-center text-center px-6 md:px-8 max-w-lg transition-transform duration-700 md:group-hover:-translate-y-4">
              <span className="font-sans text-[0.65rem] font-bold uppercase tracking-[0.3em] text-[var(--color-sand)] mb-3 md:mb-4 md:opacity-0 md:transform md:translate-y-4 transition-all duration-700 delay-100 md:group-hover:opacity-100 md:group-hover:translate-y-0">
                {locale === 'es' ? 'Descubrir' : 'Discover'}
              </span>
              <h2 className="display text-4xl md:text-5xl lg:text-7xl text-white mb-4 md:mb-6 drop-shadow-lg">{hubLeft?.title}</h2>
              {hubLeft?.description && (
                <p className="font-sans text-sm md:text-base text-white/95 mb-6 md:mb-8 font-light leading-relaxed md:opacity-0 md:transform md:translate-y-4 transition-all duration-700 delay-200 md:group-hover:opacity-100 md:group-hover:translate-y-0 drop-shadow-md">
                  {hubLeft.description}
                </p>
              )}
              <span className="inline-flex items-center justify-center px-8 md:px-10 py-3 md:py-4 bg-transparent border border-white/40 text-white font-sans tracking-[0.2em] text-[0.65rem] md:text-xs uppercase transition-all duration-500 hover:bg-white hover:text-black hover:border-white">
                {locale === 'es' ? 'Explorar' : 'Explore'}
              </span>
            </div>
          </Link>

          {/* RIGHT HALF */}
          <Link href={hubRight?.href || "#"} className="relative group w-full md:w-1/2 min-h-[50vh] md:min-h-screen overflow-hidden flex items-center justify-center border-t md:border-t-0 md:border-l border-white/10">
            <div className="absolute inset-0 z-0 bg-[var(--color-deep-sea)]">
              {hubRight?.imageUrl && (
                <Image
                  src={hubRight.imageUrl}
                  alt={hubRight?.title || ""}
                  fill
                  priority
                  className="object-cover transition-transform duration-[1.5s] group-hover:scale-110 opacity-70 group-hover:opacity-100"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-deep-sea)] via-[var(--color-deep-sea)]/40 to-[var(--color-deep-sea)]/70 transition-colors duration-700 group-hover:via-[var(--color-deep-sea)]/50" />
            </div>
            <div className="relative z-10 flex flex-col items-center text-center px-6 md:px-8 max-w-lg transition-transform duration-700 md:group-hover:-translate-y-4">
              <span className="font-sans text-[0.65rem] font-bold uppercase tracking-[0.3em] text-[var(--color-sand)] mb-3 md:mb-4 md:opacity-0 md:transform md:translate-y-4 transition-all duration-700 delay-100 md:group-hover:opacity-100 md:group-hover:translate-y-0">
                {locale === 'es' ? 'Descubrir' : 'Discover'}
              </span>
              <h2 className="display text-4xl md:text-5xl lg:text-7xl text-white mb-4 md:mb-6 drop-shadow-lg">{hubRight?.title}</h2>
              {hubRight?.description && (
                <p className="font-sans text-sm md:text-base text-white/95 mb-6 md:mb-8 font-light leading-relaxed md:opacity-0 md:transform md:translate-y-4 transition-all duration-700 delay-200 md:group-hover:opacity-100 md:group-hover:translate-y-0 drop-shadow-md">
                  {hubRight.description}
                </p>
              )}
              <span className="inline-flex items-center justify-center px-8 md:px-10 py-3 md:py-4 bg-transparent border border-white/40 text-white font-sans tracking-[0.2em] text-[0.65rem] md:text-xs uppercase transition-all duration-500 hover:bg-white hover:text-black hover:border-white">
                {locale === 'es' ? 'Explorar' : 'Explore'}
              </span>
            </div>
          </Link>
        </main>
      </>
    );
  }

  // --- STANDARD CATALOG LISTING PAGE ---
  // Select the correct localized content for the rest of the page
  const localizedContent = locale === 'es' ? content.contentEs : content.contentEn;

  return (
    <>
      <Preloader />
      <SiteHeader />
      
      <main id="main">
        {/* HERO SECTION */}
        {localizedContent?.hero && (
          <section className="relative flex min-h-[75svh] items-center overflow-hidden bg-[var(--color-deep-sea)] pt-32 pb-24 md:pb-32">
            <div className="absolute inset-0">
               {localizedContent.hero.backgroundImageUrl && (
                 <Image
                    src={localizedContent.hero.backgroundImageUrl}
                    alt={localizedContent.hero.title || ""}
                    fill
                    priority
                    className="object-cover opacity-50"
                 />
               )}
               <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-deep-sea)]/90 via-[var(--color-deep-sea)]/50 to-transparent" />
            </div>
            <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 md:px-10 text-[var(--color-warm-white)]">
               <div className="max-w-2xl">
                 {localizedContent.hero.eyebrow && (
                   <h2 className="eyebrow text-[var(--color-sand)]">{localizedContent.hero.eyebrow}</h2>
                 )}
                 <h1 className="display mt-6 text-[clamp(3rem,5vw,5rem)] leading-tight">{localizedContent.hero.title}</h1>
                 {localizedContent.hero.description && (
                   <p className="mt-8 font-sans text-lg font-light leading-relaxed text-[var(--color-warm-white)]/85">
                     {localizedContent.hero.description}
                   </p>
                 )}
                 {localizedContent.hero.cta && (
                   <div className="mt-10">
                     <Cta href={localizedContent.hero.cta.href} tone="sand">{localizedContent.hero.cta.label}</Cta>
                   </div>
                 )}
               </div>
            </div>
          </section>
        )}

        {/* PROCESS STEPS */}
        {localizedContent?.processSteps && localizedContent.processSteps.length > 0 && (
          <section className="bg-[var(--color-warm-white)] py-16 md:py-24 border-b border-[var(--color-border)]">
            <div className="mx-auto max-w-[1440px] px-6 md:px-10">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-10">
                {localizedContent.processSteps.map((step: any, idx: number) => (
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
        {content.properties && content.properties.length > 0 && (
          <section className="bg-[var(--color-card)] py-24 md:py-32">
            <div className="mx-auto max-w-[1440px] px-6 md:px-10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {content.properties.map((item: any, idx: number) => {
                  const itemHref = `/${content.slug}/${item.slug}`;
                  return (
                  <div key={idx} className="group flex flex-col overflow-hidden rounded-[min(var(--radius-lg),16px)] bg-[var(--color-warm-white)] shadow-sm transition-shadow hover:shadow-md">
                    <Link href={itemHref} className="relative aspect-[4/3] w-full overflow-hidden block">
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
                      <Link href={itemHref} className="inline-block hover:text-[var(--color-sand)] transition-colors">
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
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* BENTO BANNER */}
        {localizedContent?.bentoBanner && (
          <section className="relative flex flex-col items-center justify-center min-h-[500px] overflow-hidden bg-[var(--color-deep-sea)] px-6 py-24">
            <div className="absolute inset-0">
              {localizedContent.bentoBanner.backgroundImageUrl && (
                <Image
                   src={localizedContent.bentoBanner.backgroundImageUrl}
                   alt={localizedContent.bentoBanner.title || ""}
                    fill
                    className="object-cover opacity-60"
                 />
               )}
               <div className="absolute inset-0 bg-black/40" />
            </div>
            <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 md:px-10 text-[var(--color-warm-white)] flex justify-center">
               <div className="relative z-10 max-w-3xl mx-auto text-center text-[var(--color-warm-white)]">
                <h2 className="display text-[clamp(2.5rem,4vw,3.5rem)] leading-tight">{localizedContent.bentoBanner.title}</h2>
                {localizedContent.bentoBanner.description && (
                  <p className="mt-6 font-sans text-lg font-light leading-relaxed text-[var(--color-warm-white)]/90">
                    {localizedContent.bentoBanner.description}
                  </p>
                )}
                {localizedContent.bentoBanner.cta && (
                  <div className="mt-10">
                    <Cta href={localizedContent.bentoBanner.cta.href} tone="sand">{localizedContent.bentoBanner.cta.label}</Cta>
                  </div>
                 )}
               </div>
            </div>
          </section>
        )}

        {/* SEO FAQ SECTION */}
        {localizedContent?.seoFaq && (
          <FaqAccordion
            title={localizedContent.seoFaq.title}
            description={localizedContent.seoFaq.description}
            eyebrow={locale === 'es' ? 'PREGUNTAS FRECUENTES' : 'FREQUENTLY ASKED QUESTIONS'}
            questions={localizedContent.seoFaq.questions}
            cta={localizedContent.seoFaq.cta}
          />
        )}

        {/* CONTACT SECTION */}
        <ContactSection />
      </main>
      
      <SiteFooter />
    </>
  )
}

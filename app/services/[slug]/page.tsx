import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { cookies } from "next/headers"
import { client } from "@/sanity/lib/client"
import { servicePageQuery, servicePathsQuery } from "@/sanity/lib/queries"
import { Preloader } from "@/components/preloader"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ContactSection } from "@/components/home/contact-section"
import { Cta } from "@/components/cta"
import { contact } from "@/lib/site-data"

export async function generateStaticParams() {
  const paths = await client.fetch(servicePathsQuery)
  return paths.map((p: { slug: string }) => ({
    slug: p.slug,
  }))
}

export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  // Await params per Next.js 15 guidelines if needed, but standard params works in most setups. 
  // Let's ensure we await if required, though `generateMetadata` can take async params.
  const { slug } = await params;
  const data = await client.fetch(servicePageQuery, { slug })
  if (!data) return {}

  const cookieStore = await cookies()
  const locale = cookieStore.get("NEXT_LOCALE")?.value || "en"
  const content = locale === "es" ? data.contentEs : data.contentEn

  return {
    title: content?.seo?.title || data.title,
    description: content?.seo?.description,
  }
}

export default async function ServicePage({
  params,
}: {
  params: { slug: string }
}) {
  const { slug } = await params;
  const data = await client.fetch(servicePageQuery, { slug })
  
  if (!data) {
    notFound()
  }

  const cookieStore = await cookies()
  const locale = cookieStore.get("NEXT_LOCALE")?.value || "en"
  const content = locale === "es" ? data.contentEs : data.contentEn

  if (!content) {
    notFound()
  }

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

        {/* WHAT WE HANDLE SECTION */}
        {content.whatWeHandle && (
          <section className="bg-[var(--color-warm-white)] py-24 md:py-32 text-[var(--color-text-dark)]">
            <div className="mx-auto max-w-[1440px] px-6 md:px-10">
              <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
                {content.whatWeHandle.eyebrow && (
                  <h2 className="eyebrow text-[var(--color-blue-gray)]">{content.whatWeHandle.eyebrow}</h2>
                )}
                {content.whatWeHandle.title && (
                  <h3 className="display mt-6 text-[clamp(2rem,4vw,3.5rem)] leading-tight">
                    {content.whatWeHandle.title}
                  </h3>
                )}
              </div>

              <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
                <div className="relative aspect-[4/5] w-full max-w-md mx-auto lg:mx-0 overflow-hidden rounded-[min(var(--radius-lg),16px)]">
                  {content.whatWeHandle.imageUrl && (
                    <Image 
                      src={content.whatWeHandle.imageUrl} 
                      alt={content.whatWeHandle.title || ""} 
                      fill 
                      className="object-cover" 
                    />
                  )}
                </div>
                <div className="lg:pl-12">
                  <div className="space-y-6 font-sans text-base font-light leading-relaxed opacity-85 text-[var(--color-text-dark)]">
                    {content.whatWeHandle.contentBlocks?.map((block: string, i: number) => (
                      <p key={i}>{block}</p>
                    ))}
                    {content.whatWeHandle.listIntro && (
                      <p>{content.whatWeHandle.listIntro}</p>
                    )}
                    {content.whatWeHandle.bulletPoints && content.whatWeHandle.bulletPoints.length > 0 && (
                      <ul className="list-disc pl-5 space-y-2">
                        {content.whatWeHandle.bulletPoints.map((bullet: string, i: number) => (
                          <li key={i}>{bullet}</li>
                        ))}
                      </ul>
                    )}
                    {content.whatWeHandle.cta && (
                      <div className="pt-8">
                        <Cta href={content.whatWeHandle.cta.href} variant="solid" tone="dark">{content.whatWeHandle.cta.label}</Cta>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* EXPLORE GRID (FOR PRIVATE TOURS) */}
        {content.exploreGrid && content.exploreGrid.cards && content.exploreGrid.cards.length > 0 && (
          <section className="bg-[var(--color-warm-white)] py-24 md:py-32 text-[var(--color-text-dark)]">
            <div className="mx-auto max-w-[1440px] px-6 md:px-10">
              <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
                {content.exploreGrid.eyebrow && (
                  <h2 className="eyebrow text-[var(--color-blue-gray)]">{content.exploreGrid.eyebrow}</h2>
                )}
                {content.exploreGrid.title && (
                  <h3 className="display mt-6 text-[clamp(2rem,4vw,3.5rem)] leading-tight">
                    {content.exploreGrid.title}
                  </h3>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {content.exploreGrid.cards.map((card: any, idx: number) => (
                  <div key={idx} className="group relative flex h-[450px] md:h-[500px] flex-col overflow-hidden rounded-[min(var(--radius-lg),16px)]">
                    {card.imageUrl && (
                      <Image 
                        src={card.imageUrl} 
                        alt={card.title || ""} 
                        fill 
                        className="object-cover transition-transform duration-[900ms] ease-[var(--ease-editorial)] group-hover:scale-105"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />
                    <div className="relative z-10 mt-auto flex flex-col p-8 text-white">
                      <h4 className="font-serif text-2xl">{card.title}</h4>
                      <p className="mt-3 font-sans text-sm font-light text-white/85 line-clamp-4 mb-6">
                        {card.description}
                      </p>
                      {card.cta && (
                        <a 
                          href={card.cta.href}
                          target={card.cta.href.startsWith("http") ? "_blank" : undefined}
                          rel={card.cta.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="inline-block border border-white/40 rounded-full px-6 py-2.5 text-xs tracking-widest uppercase transition-colors hover:bg-white hover:text-black w-fit font-medium"
                        >
                          {card.cta.label}
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FAQ SECTION */}
        {content.faq && content.faq.questions && content.faq.questions.length > 0 && (
          <section className="bg-[var(--color-card)] py-24 md:py-32 text-[var(--color-text-dark)]">
            <div className="mx-auto max-w-[1440px] px-6 md:px-10 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-24">
              <div>
                {content.faq.eyebrow && (
                  <h2 className="eyebrow text-[var(--color-blue-gray)]">{content.faq.eyebrow}</h2>
                )}
                <h3 className="display mt-6 text-[clamp(2.5rem,4vw,3.5rem)] leading-[1.1]">
                  {content.faq.title}
                </h3>
              </div>
              <div className="lg:pt-4">
                <div className="flex flex-col border-t border-[color:var(--color-border-light)]">
                  {content.faq.questions.map((item: any, i: number) => (
                    <details key={i} className="group border-b border-[color:var(--color-border-light)] [&_summary::-webkit-details-marker]:hidden">
                      <summary className="flex w-full cursor-pointer items-center justify-between py-6 text-left hover:text-[var(--color-sand)] transition-colors">
                        <div className="flex items-center gap-6 pr-4">
                          <span className="font-sans text-sm font-medium tracking-widest text-[var(--color-blue-gray)]">0{i + 1}</span>
                          <h4 className="font-serif text-xl md:text-2xl">{item.question}</h4>
                        </div>
                        <span className="relative flex h-5 w-5 shrink-0 items-center justify-center">
                          <span className="absolute h-0.5 w-full bg-current transition-transform group-open:rotate-180" />
                          <span className="absolute h-full w-0.5 bg-current transition-transform group-open:rotate-90" />
                        </span>
                      </summary>
                      <div className="pb-8 pl-[3.5rem] pr-4 font-sans text-sm font-light leading-relaxed text-[var(--color-text-dark)]/80">
                        {item.answer?.map((ans: string, aidx: number) => (
                          <p key={aidx} className={aidx > 0 ? "mt-4" : ""}>{ans}</p>
                        ))}
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* RELATED SERVICES / LIMITLESS POSSIBILITIES */}
        {content.relatedServices && content.relatedServices.cards && content.relatedServices.cards.length > 0 && (
          <section className="bg-[var(--color-deep-sea)] py-24 md:py-32 text-[var(--color-warm-white)]">
            <div className="mx-auto max-w-[1440px] px-6 md:px-10">
              <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
                {content.relatedServices.eyebrow && (
                  <h2 className="eyebrow text-[var(--color-sand)]">{content.relatedServices.eyebrow}</h2>
                )}
                <h3 className="display mt-6 text-[clamp(2rem,4vw,3.5rem)] leading-tight">
                  {content.relatedServices.title}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                {content.relatedServices.cards.map((card: any, idx: number) => (
                  <div key={idx} className="group relative flex h-[450px] md:h-[500px] flex-col overflow-hidden rounded-[min(var(--radius-lg),16px)]">
                    {card.imageUrl && (
                      <Image 
                        src={card.imageUrl} 
                        alt={card.title || ""} 
                        fill 
                        className="object-cover transition-transform duration-[900ms] ease-[var(--ease-editorial)] group-hover:scale-105"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                    <div className="relative z-10 mt-auto flex flex-col p-8">
                      <h4 className="font-serif text-2xl">{card.title}</h4>
                      <p className="mt-3 font-sans text-sm font-light text-white/80 line-clamp-3 mb-6">
                        {card.description}
                      </p>
                      {card.cta && (
                        <Link href={card.cta.href} className="inline-block border border-white/30 rounded-full px-6 py-2.5 text-xs tracking-widest uppercase transition-colors hover:bg-white hover:text-black w-fit font-medium">
                          {card.cta.label}
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CONTACT SECTION */}
        <ContactSection />

        {/* SEO FAQ BLOCK (Bottom) */}
        {content.seoFaq && (
          <section className="bg-[var(--color-warm-white)] py-20 border-t border-[color:var(--color-border-light)] text-[var(--color-text-dark)]">
            <div className="mx-auto max-w-[1440px] px-6 md:px-10">
              <div className="max-w-3xl">
                <h2 className="display text-3xl md:text-4xl">{content.seoFaq.title}</h2>
                <p className="mt-4 font-sans text-lg font-light text-[var(--color-text-dark)]/80">
                  {content.seoFaq.description}
                </p>
              </div>
              <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                {content.seoFaq.questions?.map((item: any, i: number) => (
                  <div key={i} className="border-t border-[color:var(--color-border-light)] pt-6">
                    <h3 className="font-serif text-xl">{item.question}</h3>
                    <p className="mt-3 font-sans text-sm font-light text-[var(--color-text-dark)]/80 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
              {content.seoFaq.cta && (
                <div className="mt-12">
                  <Cta href={content.seoFaq.cta.href} variant="outline" tone="dark">{content.seoFaq.cta.label}</Cta>
                </div>
              )}
            </div>
          </section>
        )}
      </main>
      
      <SiteFooter />
    </>
  )
}

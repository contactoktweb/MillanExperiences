"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ChevronDown, Mail, ShieldCheck, PlusCircle, Calendar } from "lucide-react"
import { cn } from "@/lib/utils"

interface PropertyPageProps {
  content: any;
  locale: string;
}

export function PropertyPageComponent({ content, locale }: PropertyPageProps) {
  const { 
    title, 
    mainImageUrl, 
    gallery = [], 
    descriptionEn, 
    descriptionEs, 
    details, 
    amenities, 
    price, 
    categorySlug,
    cancellationPolicyEn,
    cancellationPolicyEs,
    faqs,
    complementaryExperiences
  } = content
  
  const description = locale === "es" ? descriptionEs : descriptionEn
  const cancellationPolicy = locale === "es" ? cancellationPolicyEs : cancellationPolicyEn
  
  const [activeTab, setActiveTab] = useState<'details' | 'policy'>('details')
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  // Combine main image and gallery for the carousel
  const allImages = []
  if (mainImageUrl) allImages.push(mainImageUrl)
  if (gallery && gallery.length > 0) {
    gallery.forEach((g: any) => {
      if (g?.asset?.url) allImages.push(g.asset.url)
    })
  }

  return (
    <>
      <main id="main" className="bg-[#fcfbf8] pt-24 pb-24 md:pb-32">
        <div className="mx-auto max-w-[1440px] px-6 md:px-10">
          
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-sm text-[var(--color-blue-gray)] mb-6 font-sans">
            <Link href={`/${categorySlug}`} className="hover:text-[var(--color-sand)] transition-colors capitalize">
              {categorySlug.replace('-', ' ')}
            </Link>
            <span>/</span>
            <span className="text-[var(--color-text-dark)]">{title}</span>
          </div>

          <div className="w-full h-px bg-[var(--color-border)] mb-8" />

          {/* Top Section: Carousel (Left) + Title/Tabs (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-16">
            
            {/* Carousel */}
            <div className="lg:col-span-7">
              {allImages.length > 0 ? (
                <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-4 pb-4">
                  {allImages.map((img, idx) => (
                    <div key={idx} className="relative flex-none w-full aspect-[4/3] md:aspect-[3/2] rounded-xl overflow-hidden snap-center">
                      <Image 
                        src={img} 
                        alt={`${title} image ${idx + 1}`} 
                        fill 
                        className="object-cover" 
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="w-full aspect-square md:aspect-[4/3] bg-gray-200 rounded-xl" />
              )}
            </div>

            {/* Title & Tabs */}
            <div className="lg:col-span-5 flex flex-col pt-4">
              <h1 className="font-serif text-4xl md:text-5xl text-[var(--color-text-dark)] mb-8">{title}</h1>
              
              {/* Tabs Nav */}
              <div className="flex border-b border-[var(--color-border)] mb-8 gap-8">
                <button 
                  onClick={() => setActiveTab('details')}
                  className={cn(
                    "pb-3 text-sm font-sans uppercase tracking-widest transition-colors relative",
                    activeTab === 'details' ? "text-[var(--color-text-dark)] font-medium" : "text-[var(--color-blue-gray)] hover:text-[var(--color-text-dark)]"
                  )}
                >
                  {locale === 'es' ? 'Detalles' : 'Details'}
                  {activeTab === 'details' && <div className="absolute bottom-[-1px] left-0 w-full h-0.5 bg-[var(--color-sand)]" />}
                </button>
                <button 
                  onClick={() => setActiveTab('policy')}
                  className={cn(
                    "pb-3 text-sm font-sans uppercase tracking-widest transition-colors relative",
                    activeTab === 'policy' ? "text-[var(--color-text-dark)] font-medium" : "text-[var(--color-blue-gray)] hover:text-[var(--color-text-dark)]"
                  )}
                >
                  {locale === 'es' ? 'Política de Cancelación' : 'Cancellation Policy'}
                  {activeTab === 'policy' && <div className="absolute bottom-[-1px] left-0 w-full h-0.5 bg-[var(--color-sand)]" />}
                </button>
              </div>

              {/* Tabs Content */}
              <div className="font-sans text-[var(--color-blue-gray)] leading-relaxed font-light min-h-[200px]">
                {activeTab === 'details' && (
                  <div className="flex flex-col gap-2">
                    {details?.location && <p>{details.location}</p>}
                    {details?.capacity && <p>Capacity: {details.capacity} pax</p>}
                    {details?.rooms && <p>Rooms: {details.rooms}</p>}
                    {details?.bathrooms && <p>Bathrooms: {details.bathrooms}</p>}
                    {amenities && amenities.length > 0 && amenities.map((amenity: string, idx: number) => (
                      <p key={idx}>{amenity}</p>
                    ))}
                    {description && <p className="mt-4">{description}</p>}
                  </div>
                )}

                {activeTab === 'policy' && (
                  <div className="whitespace-pre-wrap">
                    {cancellationPolicy || (locale === 'es' ? 'No hay política especificada.' : 'No policy specified.')}
                  </div>
                )}
              </div>

              <div className="w-full h-px bg-[var(--color-border)] my-10" />

              {/* Steps */}
              <div className="grid grid-cols-4 gap-4 mb-10">
                <div className="flex flex-col items-center text-center gap-4">
                  <span className="font-serif text-sm">01. Quote</span>
                  <div className="w-full h-px bg-[var(--color-border)]" />
                  <Mail className="w-8 h-8 text-[var(--color-deep-sea)] stroke-1" />
                </div>
                <div className="flex flex-col items-center text-center gap-4">
                  <span className="font-serif text-sm">02. Secure</span>
                  <div className="w-full h-px bg-[var(--color-border)]" />
                  <ShieldCheck className="w-8 h-8 text-[var(--color-deep-sea)] stroke-1" />
                </div>
                <div className="flex flex-col items-center text-center gap-4">
                  <span className="font-serif text-sm">03. Add-ons</span>
                  <div className="w-full h-px bg-[var(--color-border)]" />
                  <PlusCircle className="w-8 h-8 text-[var(--color-deep-sea)] stroke-1" />
                </div>
                <div className="flex flex-col items-center text-center gap-4">
                  <span className="font-serif text-sm">04. Itinerary</span>
                  <div className="w-full h-px bg-[var(--color-border)]" />
                  <Calendar className="w-8 h-8 text-[var(--color-deep-sea)] stroke-1" />
                </div>
              </div>

              <Link 
                href="/contact" 
                className="inline-flex items-center justify-center w-fit px-10 py-4 bg-[var(--color-deep-sea)] text-white rounded-full font-sans tracking-[0.2em] text-xs uppercase hover:bg-opacity-90 transition-all"
              >
                {locale === 'es' ? 'Reservar Ahora' : 'Book Now'}
              </Link>
            </div>
          </div>

          {/* Complementary Experiences */}
          {complementaryExperiences && complementaryExperiences.length > 0 && (
            <div className="py-24">
              <div className="text-center mb-16">
                <h6 className="font-sans text-[0.65rem] font-bold uppercase tracking-[0.3em] text-[var(--color-sand)] mb-6">A SEAMLESS PAIRING</h6>
                <div className="w-16 h-px bg-[var(--color-border)] mx-auto mb-6" />
                <h2 className="display text-4xl md:text-5xl text-[var(--color-text-dark)]">
                  {locale === 'es' ? 'Experiencias diseñadas para complementar.' : 'Experiences curated to perfectly complement.'}
                </h2>
                <div className="w-full h-px bg-[var(--color-border)] mt-16" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {complementaryExperiences.map((exp: any, idx: number) => {
                  const expTitle = locale === 'es' ? exp.titleEs : exp.titleEn;
                  const expDesc = locale === 'es' ? exp.descriptionEs : exp.descriptionEn;
                  return (
                    <div key={idx} className="flex flex-col rounded-xl overflow-hidden bg-white shadow-sm border border-[var(--color-border)]">
                      <div className="relative aspect-square w-full">
                        {exp?.image?.asset?.url && (
                          <Image src={exp.image.asset.url} alt={expTitle || ""} fill className="object-cover" />
                        )}
                      </div>
                      <div className="p-8 flex flex-col flex-grow">
                        <div className="w-full h-px bg-[var(--color-border)] mb-6" />
                        <h5 className="font-serif text-2xl text-[var(--color-text-dark)] mb-6">{expTitle}</h5>
                        <div className="w-full h-px bg-[var(--color-border)] mb-6" />
                        <p className="font-sans font-light text-[var(--color-blue-gray)] mb-8 flex-grow">
                          {expDesc}
                        </p>
                        <a 
                          href={exp.href || "#"} 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex px-6 py-3 bg-[var(--color-deep-sea)] text-white font-sans text-xs uppercase tracking-widest rounded text-center justify-center hover:bg-opacity-90 transition-all"
                        >
                          {locale === 'es' ? 'Añadir a mi experiencia' : 'Add to My Experience'}
                        </a>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* FAQs */}
          {faqs && faqs.length > 0 && (
            <div className="py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 border-t border-[var(--color-border)]">
              <div className="lg:col-span-4">
                <div className="w-full h-px bg-[var(--color-border)] mb-8" />
                <div className="w-full h-px bg-[var(--color-border)] mb-8" />
                <h6 className="font-sans text-sm tracking-widest text-[var(--color-blue-gray)] uppercase mb-4">FAQ</h6>
                <div className="w-16 h-px bg-[var(--color-border)] mb-8" />
                <h2 className="display text-4xl text-[var(--color-text-dark)]">{title}</h2>
              </div>
              <div className="lg:col-span-8 pt-8 lg:pt-0">
                <div className="flex flex-col">
                  {faqs.map((faq: any, idx: number) => {
                    const q = locale === 'es' ? faq.questionEs : faq.questionEn;
                    const a = locale === 'es' ? faq.answerEs : faq.answerEn;
                    const isOpen = openFaq === idx;
                    
                    return (
                      <div key={idx} className="border-b border-[var(--color-border)]">
                        <button 
                          onClick={() => setOpenFaq(isOpen ? null : idx)}
                          className="w-full py-6 flex items-center justify-between text-left group"
                        >
                          <span className="font-sans text-lg font-medium text-[var(--color-text-dark)] group-hover:text-[var(--color-sand)] transition-colors">
                            {idx + 1}. {q}
                          </span>
                          <ChevronDown className={cn("w-5 h-5 text-[var(--color-blue-gray)] transition-transform duration-300", isOpen && "rotate-180")} />
                        </button>
                        <div className={cn("overflow-hidden transition-all duration-300", isOpen ? "max-h-96 pb-6" : "max-h-0")}>
                          <p className="font-sans font-light text-[var(--color-blue-gray)] leading-relaxed">
                            {a}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
                
                <div className="w-full h-px bg-[var(--color-border)] my-12" />
                <Link 
                  href="/contact" 
                  className="inline-flex px-8 py-4 bg-[var(--color-deep-sea)] text-white font-sans text-xs uppercase tracking-widest rounded hover:bg-opacity-90 transition-all"
                >
                  {locale === 'es' ? 'Planificar viaje' : 'Plan your trip'}
                </Link>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* Hide scrollbar for carousel */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </>
  )
}

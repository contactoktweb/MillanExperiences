"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ChevronDown, ChevronLeft, ChevronRight, Mail, ShieldCheck, PlusCircle, Calendar, Star, MessageSquarePlus } from "lucide-react"
import { cn } from "@/lib/utils"
import { ReviewModal } from "@/components/review-modal"

const translateLocation = (loc: string | undefined, locale: string) => {
  if (!loc) return ""
  if (locale !== "es") return loc
  const lower = loc.toLowerCase().trim()
  const map: Record<string, string> = {
    "historic center": "Centro Histórico",
    "getsemani": "Getsemaní",
    "getsemaní": "Getsemaní",
    "rosario islands": "Islas del Rosario",
    "baru": "Barú",
    "barú": "Barú",
    "tierra bomba": "Tierra Bomba",
    "manga": "Manga",
    "bocagrande": "Bocagrande",
    "north zone": "Zona Norte",
  }
  return map[lower] || loc
}

const translateAmenity = (amenity: string, locale: string) => {
  if (locale !== "es") return amenity
  const lower = amenity.toLowerCase().trim()
  const map: Record<string, string> = {
    "rooftop pool": "Piscina en la terraza (Rooftop)",
    "24/7 staff": "Personal 24/7",
    "staff": "Personal de atención",
    "bbq area": "Zona de BBQ",
    "rooftop bar": "Bar en el Rooftop",
    "mini spa area": "Área de Mini Spa",
    "spa": "Área de Spa",
    "sound system": "Sistema de Sonido",
    "air conditioning": "Aire Acondicionado",
    "private chef included": "Chef privado incluido",
    "private chef": "Chef privado",
    "jacuzzi": "Jacuzzi",
    "wi-fi": "Wi-Fi",
    "wifi": "Wi-Fi",
    "ocean view": "Vista al mar",
    "dock access": "Acceso a muelle",
    "gym": "Gimnasio",
    "security 24/7": "Seguridad 24/7",
    "butler service": "Servicio de mayordomo",
    "housekeeping": "Limpieza diaria",
    "daily housekeeping": "Limpieza diaria",
    "snorkel gear": "Equipo de snorkel",
    "snorkeling equipment": "Equipo de snorkel",
    "paddle boards": "Tablas de paddle",
    "paddleboard": "Tabla de paddle",
    "towels included": "Toallas incluidas",
    "ice and cooler": "Hielo y nevera portátil",
    "tennis court": "Cancha de tenis",
    "covered kiosk with a bar": "Kiosco cubierto con bar",
    "dining tables in different areas": "Comedores en distintas áreas",
    "island gym": "Gimnasio de la isla",
    "day beds": "Camas balinesas / Asoleadoras",
    "pool": "Piscina",
    "kayak": "Kayaks",
    "tv": "Smart TV",
    "television": "Smart TV",
    "crew": "Tripulación profesional (Capitán y Marinero)",
    "gasoline": "Combustible incluido",
    "fuel": "Combustible incluido",
    "ice": "Hielo y nevera",
    "towels": "Toallas de cortesía",
    "cups": "Vasos e implementos",
    "snorkels": "Equipo de snorkel",
    "bluetooth": "Sonido Bluetooth",
    "bluetooth sound system": "Sonido Bluetooth de alta fidelidad",
    "terrace": "Terraza panorámica",
  }
  return map[lower] || amenity
}

interface PropertyPageProps {
  content: any;
  locale: string;
  initialReviews?: any[];
}

export function PropertyPageComponent({ content, locale, initialReviews = [] }: PropertyPageProps) {
  const { 
    title, 
    slug,
    mainImageUrl, 
    gallery = [], 
    descriptionEn, 
    descriptionEs, 
    details, 
    amenities, 
    price, 
    categorySlug = "luxury-villas",
    cancellationPolicyEn,
    cancellationPolicyEs,
    faqs,
    complementaryExperiences
  } = content
  
  const description = locale === "es" ? descriptionEs : descriptionEn
  const cancellationPolicy = locale === "es" 
    ? (cancellationPolicyEs || "Se requiere un depósito del 50% para confirmar su reserva. Este depósito no es reembolsable.\n\nSi cancela después de hacer la reserva, perderá el depósito pero no tendrá que pagar el 50% restante.\n\nEl check-in es habitualmente a las 3:00 PM y el check-out a las 11:00 AM, coordinable directamente con su concierge privado.") 
    : (cancellationPolicyEn || "A 50% deposit is required to confirm your reservation. This deposit is non-refundable.\n\nIf you cancel after making the reservation, you will forfeit the deposit but will not be required to pay the remaining 50%.\n\nCheck-in is typically at 3:00 PM and check-out at 11:00 AM, customizable upon request with your dedicated concierge.")
  
  const [activeTab, setActiveTab] = useState<'details' | 'policy'>('details')
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [activeSlide, setActiveSlide] = useState(0)
  const [reviews, setReviews] = useState<any[]>(initialReviews)
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)

  // Combine main image and gallery for the carousel
  const allImages: string[] = []
  if (mainImageUrl) allImages.push(mainImageUrl)
  if (gallery && gallery.length > 0) {
    gallery.forEach((g: any) => {
      if (g?.asset?.url && !allImages.includes(g.asset.url)) {
        allImages.push(g.asset.url)
      }
    })
  }

  const handleScroll = () => {
    if (!carouselRef.current) return
    const { scrollLeft, clientWidth } = carouselRef.current
    if (clientWidth > 0) {
      const index = Math.round(scrollLeft / clientWidth)
      setActiveSlide(Math.min(Math.max(index, 0), allImages.length - 1))
    }
  }

  const scrollToSlide = (index: number) => {
    if (!carouselRef.current || allImages.length === 0) return
    const targetIndex = (index + allImages.length) % allImages.length
    const clientWidth = carouselRef.current.clientWidth
    carouselRef.current.scrollTo({
      left: targetIndex * clientWidth,
      behavior: "smooth"
    })
    setActiveSlide(targetIndex)
  }

  // Fallback FAQs if none in Sanity
  const displayFaqs = faqs && faqs.length > 0 ? faqs : [
    {
      questionEn: "When should I request reservations for restaurants or activities?",
      questionEs: "¿Cuándo debo solicitar reservas para restaurantes o actividades?",
      answerEn: "We recommend sharing your preferences as soon as your travel dates are confirmed. Exclusive restaurants, private yachts, and high-demand experiences often book up weeks or months in advance.",
      answerEs: "Recomendamos compartir sus preferencias tan pronto como se confirmen sus fechas de viaje. Restaurantes exclusivos y experiencias de alta demanda a menudo se reservan con semanas de anticipación.",
    },
    {
      questionEn: "Can your private chefs accommodate specific dietary restrictions?",
      questionEs: "¿Pueden sus chefs privados adaptarse a restricciones dietéticas específicas?",
      answerEn: "Absolutely. Our curated network of private chefs is highly experienced in designing bespoke menus tailored to any dietary requirement, allergy, or personal preference.",
      answerEs: "Absolutamente. Nuestra red de chefs privados está altamente experimentada en diseñar menús a medida adaptados a cualquier requerimiento dietético o preferencia.",
    },
    {
      questionEn: "Will I have concierge support available during the stay?",
      questionEs: "¿Tendré apoyo de concierge disponible durante la estadía?",
      answerEn: "Yes. Your dedicated concierge team is available throughout your stay to manage last-minute adjustments, coordinate transportation, and provide complete peace of mind.",
      answerEs: "Sí. Su equipo de concierge dedicado está disponible durante toda su estancia para gestionar traslados, reservas y darle total tranquilidad.",
    },
    {
      questionEn: "What staff and services are included in the villa?",
      questionEs: "¿Qué personal y servicios están incluidos en la villa?",
      answerEn: "All our luxury private villas include dedicated on-site daily staff (housekeeping and maintenance) plus your personal concierge on-call 24/7.",
      answerEs: "Todas nuestras villas privadas de lujo incluyen personal dedicado en sitio (limpieza y atención) además de su concierge personal disponible 24/7.",
    }
  ]

  const handleReviewSuccess = (newReview: any) => {
    if (newReview) {
      setReviews(prev => [newReview, ...prev])
    }
  }

  return (
    <>
      <main id="main" className="bg-[#fcfbf8] pt-24 pb-24 md:pb-32">
        <div className="mx-auto max-w-[1440px] px-6 md:px-10">
          
          {/* Breadcrumbs */}
          {(() => {
            const categoryNames: Record<string, { es: string; en: string }> = {
              "luxury-villas": { es: "Villas de Lujo", en: "Luxury Villas" },
              "private-islands": { es: "Islas Privadas", en: "Private Islands" },
              "yachts-catamarans": { es: "Yates y Catamaranes", en: "Yachts & Catamarans" },
              "speedboats": { es: "Lanchas Deportivas", en: "Speedboats" },
            };
            const catLabel = categoryNames[categorySlug]?.[locale === "es" ? "es" : "en"] || categorySlug.replace('-', ' ');
            return (
              <div className="flex items-center gap-2 text-sm text-[var(--color-blue-gray)] mb-6 font-sans">
                <Link href={`/${categorySlug}`} className="hover:text-[var(--color-sand)] transition-colors capitalize">
                  {catLabel}
                </Link>
                <span>/</span>
                <span className="text-[var(--color-text-dark)]">{title}</span>
              </div>
            );
          })()}

          <div className="w-full h-px bg-[var(--color-border)] mb-8" />

          {/* Top Section: Carousel (Left) + Title/Tabs (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-16">
            
            {/* Carousel Container */}
            <div className="lg:col-span-7">
              {allImages.length > 0 ? (
                <div className="relative">
                  {/* Image viewport */}
                  <div className="relative group rounded-2xl overflow-hidden shadow-sm border border-[var(--color-border)] bg-black/5">
                    <div 
                      ref={carouselRef}
                      onScroll={handleScroll}
                      className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar touch-pan-y overscroll-x-contain scroll-smooth"
                    >
                      {allImages.map((img, idx) => (
                        <div key={idx} className="relative flex-none w-full aspect-[4/3] md:aspect-[3/2] overflow-hidden snap-center select-none">
                          <Image 
                            src={img || "/placeholder.jpg"} 
                            alt={`${title} image ${idx + 1}`} 
                            fill 
                            priority={idx === 0}
                            sizes="(max-width: 1024px) 100vw, 60vw"
                            className="object-cover" 
                          />
                        </div>
                      ))}
                    </div>

                    {/* Slide Counter Badge */}
                    {allImages.length > 1 && (
                      <div className="absolute top-4 right-4 z-20 px-3.5 py-1.5 bg-black/60 backdrop-blur-md rounded-full text-white font-sans text-xs font-medium tracking-widest border border-white/20 shadow-md select-none">
                        {(activeSlide + 1).toString().padStart(2, '0')} / {allImages.length.toString().padStart(2, '0')}
                      </div>
                    )}

                    {/* Prominent PC & Mobile Arrow Buttons positioned directly over the image */}
                    {allImages.length > 1 && (
                      <>
                        <button
                          type="button"
                          onClick={() => scrollToSlide(activeSlide - 1)}
                          aria-label={locale === "es" ? "Imagen anterior" : "Previous image"}
                          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-black/60 hover:bg-[var(--color-sand)] text-white hover:text-[var(--color-deep-sea)] backdrop-blur-md border border-white/25 shadow-lg transition-all duration-300 transform hover:scale-110 active:scale-95 cursor-pointer"
                        >
                          <ChevronLeft className="h-6 w-6" strokeWidth={2} />
                        </button>
                        <button
                          type="button"
                          onClick={() => scrollToSlide(activeSlide + 1)}
                          aria-label={locale === "es" ? "Siguiente imagen" : "Next image"}
                          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-black/60 hover:bg-[var(--color-sand)] text-white hover:text-[var(--color-deep-sea)] backdrop-blur-md border border-white/25 shadow-lg transition-all duration-300 transform hover:scale-110 active:scale-95 cursor-pointer"
                        >
                          <ChevronRight className="h-6 w-6" strokeWidth={2} />
                        </button>
                      </>
                    )}
                  </div>

                  {/* Bottom Navigation Controls & Dots */}
                  {allImages.length > 1 && (
                    <div className="flex items-center justify-between mt-4 px-2">
                      <div className="flex items-center gap-2 overflow-x-auto max-w-[65%] py-1 hide-scrollbar">
                        {allImages.map((_, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => scrollToSlide(idx)}
                            aria-label={locale === "es" ? `Ir a foto ${idx + 1}` : `Go to slide ${idx + 1}`}
                            className={cn(
                              "h-2 rounded-full transition-all duration-300 cursor-pointer",
                              idx === activeSlide ? "w-6 bg-[var(--color-sand)]" : "w-2 bg-[var(--color-blue-gray)]/30 hover:bg-[var(--color-blue-gray)]/60"
                            )}
                          />
                        ))}
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => scrollToSlide(activeSlide - 1)}
                          className="flex items-center justify-center w-8 h-8 rounded-full border border-[var(--color-border)] text-[var(--color-blue-gray)] hover:text-[var(--color-text-dark)] hover:border-[var(--color-sand)] hover:bg-[var(--color-sand)]/10 transition-colors cursor-pointer"
                          aria-label={locale === "es" ? "Anterior" : "Previous"}
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <span className="font-sans text-xs font-medium tracking-wider text-[var(--color-blue-gray)] select-none">
                          {activeSlide + 1} / {allImages.length}
                        </span>
                        <button
                          type="button"
                          onClick={() => scrollToSlide(activeSlide + 1)}
                          className="flex items-center justify-center w-8 h-8 rounded-full border border-[var(--color-border)] text-[var(--color-blue-gray)] hover:text-[var(--color-text-dark)] hover:border-[var(--color-sand)] hover:bg-[var(--color-sand)]/10 transition-colors cursor-pointer"
                          aria-label={locale === "es" ? "Siguiente" : "Next"}
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="w-full aspect-square md:aspect-[4/3] bg-gray-200 rounded-xl" />
              )}
            </div>

            {/* Title & Tabs */}
            <div className="lg:col-span-5 flex flex-col pt-2">
              <h1 className="font-serif text-4xl md:text-5xl text-[var(--color-text-dark)] mb-8">{title}</h1>
              
              {/* Tabs Nav */}
              <div className="flex border-b border-[var(--color-border)] mb-8 gap-8">
                <button 
                  onClick={() => setActiveTab('details')}
                  className={cn(
                    "pb-3 text-sm font-sans uppercase tracking-widest transition-colors relative cursor-pointer",
                    activeTab === 'details' ? "text-[var(--color-text-dark)] font-medium" : "text-[var(--color-blue-gray)] hover:text-[var(--color-text-dark)]"
                  )}
                >
                  {locale === 'es' ? 'Detalles' : 'Details'}
                  {activeTab === 'details' && <div className="absolute bottom-[-1px] left-0 w-full h-0.5 bg-[var(--color-sand)]" />}
                </button>
                <button 
                  onClick={() => setActiveTab('policy')}
                  className={cn(
                    "pb-3 text-sm font-sans uppercase tracking-widest transition-colors relative cursor-pointer",
                    activeTab === 'policy' ? "text-[var(--color-text-dark)] font-medium" : "text-[var(--color-blue-gray)] hover:text-[var(--color-text-dark)]"
                  )}
                >
                  {locale === 'es' ? 'Política de Cancelación' : 'Cancellation Policy'}
                  {activeTab === 'policy' && <div className="absolute bottom-[-1px] left-0 w-full h-0.5 bg-[var(--color-sand)]" />}
                </button>
              </div>

              {/* Tabs Content */}
              <div className="font-sans text-[var(--color-blue-gray)] leading-relaxed font-light min-h-[180px]">
                {activeTab === 'details' && (
                  <div className="flex flex-col gap-2.5">
                    {details?.dimensions && (
                      <p><span className="font-medium text-[var(--color-text-dark)]">{locale === 'es' ? 'Eslora:' : 'Length / Dimensions:'}</span> {details.dimensions}</p>
                    )}
                    {details?.location && (
                      <p><span className="font-medium text-[var(--color-text-dark)]">{locale === 'es' ? 'Ubicación:' : 'Location:'}</span> {translateLocation(details.location, locale)}</p>
                    )}
                    {details?.capacity && (
                      <p><span className="font-medium text-[var(--color-text-dark)]">{locale === 'es' ? 'Capacidad:' : 'Capacity:'}</span> {details.capacity} {locale === 'es' ? 'personas' : 'guests'}</p>
                    )}
                    {details?.rooms && (
                      <p><span className="font-medium text-[var(--color-text-dark)]">{locale === 'es' ? 'Habitaciones:' : 'Bedrooms:'}</span> {details.rooms}</p>
                    )}
                    {details?.bathrooms && (
                      <p><span className="font-medium text-[var(--color-text-dark)]">{locale === 'es' ? 'Baños:' : 'Bathrooms:'}</span> {details.bathrooms}</p>
                    )}
                    {amenities && amenities.length > 0 && amenities.map((amenity: string, idx: number) => (
                      <p key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-sand)]" />
                        <span>{translateAmenity(amenity, locale)}</span>
                      </p>
                    ))}
                    {description && <p className="mt-4 pt-4 border-t border-[var(--color-border)] text-sm">{description}</p>}
                  </div>
                )}

                {activeTab === 'policy' && (
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">
                    {cancellationPolicy}
                  </div>
                )}
              </div>

              <div className="w-full h-px bg-[var(--color-border)] my-8" />

              {/* Steps */}
              <div className="grid grid-cols-4 gap-4 mb-8">
                <div className="flex flex-col items-center text-center gap-3">
                  <span className="font-serif text-xs">{locale === 'es' ? '01. Cotizar' : '01. Quote'}</span>
                  <div className="w-full h-px bg-[var(--color-border)]" />
                  <Mail className="w-6 h-6 text-[var(--color-deep-sea)] stroke-1" />
                </div>
                <div className="flex flex-col items-center text-center gap-3">
                  <span className="font-serif text-xs">{locale === 'es' ? '02. Reservar' : '02. Secure'}</span>
                  <div className="w-full h-px bg-[var(--color-border)]" />
                  <ShieldCheck className="w-6 h-6 text-[var(--color-deep-sea)] stroke-1" />
                </div>
                <div className="flex flex-col items-center text-center gap-3">
                  <span className="font-serif text-xs">{locale === 'es' ? '03. Adicionales' : '03. Add-ons'}</span>
                  <div className="w-full h-px bg-[var(--color-border)]" />
                  <PlusCircle className="w-6 h-6 text-[var(--color-deep-sea)] stroke-1" />
                </div>
                <div className="flex flex-col items-center text-center gap-3">
                  <span className="font-serif text-xs">{locale === 'es' ? '04. Itinerario' : '04. Itinerary'}</span>
                  <div className="w-full h-px bg-[var(--color-border)]" />
                  <Calendar className="w-6 h-6 text-[var(--color-deep-sea)] stroke-1" />
                </div>
              </div>

              <Link 
                href="/contact" 
                className="inline-flex items-center justify-center w-fit px-10 py-4 bg-[var(--color-deep-sea)] text-white rounded-full font-sans tracking-[0.2em] text-xs uppercase hover:bg-opacity-90 transition-all shadow-sm"
              >
                {locale === 'es' ? 'Reservar Ahora' : 'Book Now'}
              </Link>
            </div>
          </div>

          {/* Complementary Experiences */}
          {complementaryExperiences && complementaryExperiences.length > 0 && (
            <div className="py-20 border-t border-[var(--color-border)]">
              <div className="text-center mb-14">
                <h6 className="font-sans text-[0.65rem] font-bold uppercase tracking-[0.3em] text-[var(--color-sand)] mb-4">
                  {locale === 'es' ? 'UNA COMBINACIÓN PERFECTA' : 'A SEAMLESS PAIRING'}
                </h6>
                <div className="w-16 h-px bg-[var(--color-border)] mx-auto mb-6" />
                <h2 className="display text-3xl md:text-4xl text-[var(--color-text-dark)]">
                  {locale === 'es' ? 'Experiencias diseñadas para complementar.' : 'Experiences curated to perfectly complement.'}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {complementaryExperiences.map((exp: any, idx: number) => {
                  const expTitle = locale === 'es' ? (exp.titleEs || exp.titleEn) : (exp.titleEn || exp.titleEs);
                  const expDesc = locale === 'es' ? (exp.descriptionEs || exp.descriptionEn) : (exp.descriptionEn || exp.descriptionEs);
                  return (
                    <div key={idx} className="flex flex-col rounded-xl overflow-hidden bg-white shadow-sm border border-[var(--color-border)] group hover:shadow-md transition-shadow">
                      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
                        {exp?.image?.asset?.url && (
                          <Image 
                            src={exp.image.asset.url} 
                            alt={expTitle || ""} 
                            fill 
                            className="object-cover transition-transform duration-700 group-hover:scale-105" 
                          />
                        )}
                      </div>
                      <div className="p-8 flex flex-col flex-grow">
                        <h5 className="font-serif text-2xl text-[var(--color-text-dark)] mb-4">{expTitle}</h5>
                        <div className="w-full h-px bg-[var(--color-border)] mb-4" />
                        <p className="font-sans font-light text-[var(--color-blue-gray)] mb-8 flex-grow text-sm leading-relaxed">
                          {expDesc}
                        </p>
                        <Link 
                          href={exp.href || "/contact"} 
                          className="inline-flex px-6 py-3 bg-[var(--color-deep-sea)] text-white font-sans text-xs uppercase tracking-widest rounded text-center justify-center hover:bg-opacity-90 transition-all"
                        >
                          {locale === 'es' ? 'Añadir a mi experiencia' : 'Add to My Experience'}
                        </Link>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* FAQs Section with dynamic villa title */}
          <div className="py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 border-t border-[var(--color-border)]">
            <div className="lg:col-span-4">
              <h6 className="font-sans text-sm tracking-widest text-[var(--color-blue-gray)] uppercase mb-3">FAQ</h6>
              <div className="w-12 h-px bg-[var(--color-border)] mb-6" />
              <h2 className="display text-3xl md:text-4xl text-[var(--color-text-dark)] mb-4">{title}</h2>
              <p className="font-sans text-sm font-light text-[var(--color-blue-gray)] leading-relaxed">
                {locale === 'es' 
                  ? 'Respuestas a las preguntas más frecuentes sobre esta villa y nuestros servicios.'
                  : 'Answers to the most common questions regarding this villa and our private services.'}
              </p>
            </div>
            
            <div className="lg:col-span-8 pt-4 lg:pt-0">
              <div className="flex flex-col">
                {displayFaqs.map((faq: any, idx: number) => {
                  const q = locale === 'es' ? (faq.questionEs || faq.questionEn) : (faq.questionEn || faq.questionEs);
                  const a = locale === 'es' ? (faq.answerEs || faq.answerEn) : (faq.answerEn || faq.answerEs);
                  const isOpen = openFaq === idx;
                  
                  return (
                    <div key={idx} className="border-b border-[var(--color-border)]">
                      <button 
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        className="w-full py-6 flex items-center justify-between text-left group cursor-pointer"
                      >
                        <span className="font-sans text-base md:text-lg font-medium text-[var(--color-text-dark)] group-hover:text-[var(--color-sand)] transition-colors pr-4">
                          {idx + 1}. {q}
                        </span>
                        <ChevronDown className={cn("w-5 h-5 text-[var(--color-blue-gray)] flex-shrink-0 transition-transform duration-300", isOpen && "rotate-180")} />
                      </button>
                      <div className={cn("overflow-hidden transition-all duration-300", isOpen ? "max-h-96 pb-6" : "max-h-0")}>
                        <p className="font-sans font-light text-[var(--color-blue-gray)] leading-relaxed text-sm md:text-base">
                          {a}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
              
              <div className="w-full h-px bg-[var(--color-border)] my-10" />
              <Link 
                href="/contact" 
                className="inline-flex px-8 py-4 bg-[var(--color-deep-sea)] text-white font-sans text-xs uppercase tracking-widest rounded hover:bg-opacity-90 transition-all"
              >
                {locale === 'es' ? 'Planificar viaje' : 'Plan your trip'}
              </Link>
            </div>
          </div>

          {/* REVIEWS SECTION */}
          <div className="py-20 border-t border-[var(--color-border)]">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6">
              <div>
                <h6 className="font-sans text-xs font-bold uppercase tracking-[0.25em] text-[var(--color-sand)] mb-3">
                  {locale === 'es' ? 'RESEÑAS' : 'REVIEWS'}
                </h6>
                <h2 className="display text-3xl md:text-4xl text-[var(--color-text-dark)]">
                  {locale === 'es' ? `Reseñas de ${title}` : `Reviews for ${title}`}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setIsReviewModalOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[var(--color-sand)] text-[var(--color-deep-sea)] hover:bg-[var(--color-dark-sand)] hover:text-white rounded-full font-sans text-xs uppercase tracking-widest font-semibold transition-all shadow-sm w-fit cursor-pointer"
              >
                <MessageSquarePlus size={16} />
                {locale === 'es' ? 'Dejar una reseña' : 'Leave a review'}
              </button>
            </div>

            {reviews.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {reviews.map((rev, idx) => (
                  <div 
                    key={rev._id || idx} 
                    className="flex flex-col justify-between p-8 rounded-xl bg-white border border-[var(--color-border)] shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div>
                      {/* Stars */}
                      <div className="flex items-center gap-1 text-[#FBBC05] mb-4">
                        {[...Array(rev.rating || 5)].map((_, i) => (
                          <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
                        ))}
                      </div>

                      {/* Quote */}
                      <p className="font-serif text-lg text-[var(--color-text-dark)] leading-snug mb-6 italic">
                        "{rev.quote}"
                      </p>

                      {/* Review Images if any */}
                      {rev.images && rev.images.length > 0 && (
                        <div className="flex gap-2 mb-6 overflow-x-auto py-1 hide-scrollbar">
                          {rev.images.map((imgObj: any, imgIdx: number) => {
                            const imgUrl = imgObj?.asset?.url
                            if (!imgUrl) return null
                            return (
                              <div key={imgIdx} className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0 border border-[var(--color-border)]">
                                <Image src={imgUrl} alt={`Foto reseña ${imgIdx + 1}`} fill className="object-cover" />
                              </div>
                            )
                          })}
                        </div>
                      )}
                    </div>

                    <div className="border-t border-[var(--color-border)] pt-4 flex items-center justify-between text-xs">
                      <div>
                        <p className="font-sans font-medium text-[var(--color-text-dark)]">{rev.name}</p>
                        {rev.date && <p className="font-sans text-[var(--color-blue-gray)] font-light mt-0.5">{rev.date}</p>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-12 rounded-xl bg-white border border-dashed border-[var(--color-border)] text-center">
                <div className="w-12 h-12 rounded-full bg-[var(--color-sand)]/20 flex items-center justify-center text-[var(--color-dark-sand)] mb-4">
                  <Star size={24} fill="currentColor" strokeWidth={0} />
                </div>
                <h4 className="font-serif text-xl text-[var(--color-text-dark)] mb-2">
                  {locale === 'es' ? 'Sé el primero en compartir tu experiencia' : 'Be the first to share your experience'}
                </h4>
                <p className="font-sans text-sm font-light text-[var(--color-blue-gray)] max-w-md mb-6">
                  {locale === 'es' 
                    ? `¿Disfrutaste de tu experiencia en ${title}? Cuéntanos sobre tu recorrido o estadía y comparte tus fotos.`
                    : `Did you enjoy your experience at ${title}? Tell us about your journey and share your moments.`}
                </p>
                <button
                  type="button"
                  onClick={() => setIsReviewModalOpen(true)}
                  className="px-6 py-3 bg-[var(--color-deep-sea)] text-white hover:bg-[var(--color-deep-sea)]/90 rounded-full font-sans text-xs uppercase tracking-widest transition-all cursor-pointer"
                >
                  {locale === 'es' ? 'Escribir reseña' : 'Write a review'}
                </button>
              </div>
            )}
          </div>

        </div>
      </main>

      {/* Review Modal */}
      <ReviewModal 
        isOpen={isReviewModalOpen} 
        onClose={() => setIsReviewModalOpen(false)}
        propertySlug={slug}
        propertyName={title}
        locale={locale}
        onSuccess={handleReviewSuccess}
      />

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


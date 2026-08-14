import type { Metadata } from "next"
import Image from "next/image"
import { cookies } from "next/headers"
import { Preloader } from "@/components/preloader"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ContactSection } from "@/components/home/contact-section"
import { AccordionCustom, type AccordionItem } from "@/components/ui/accordion-custom"

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies()
  const locale = cookieStore.get("NEXT_LOCALE")?.value || "en"

  return {
    title: locale === "es" ? "Sobre Nosotros | Millan Experiences" : "About Us | Millan Experiences",
    description:
      locale === "es"
        ? "Conoce Millan Experiences, nuestra historia, filosofía y el equipo dedicado a diseñar experiencias impecables en Colombia."
        : "Learn about Millan Experiences, our story, philosophy, and the dedicated team that crafts your seamless, elevated experiences in Colombia.",
  }
}

export default async function AboutPage() {
  const cookieStore = await cookies()
  const locale = cookieStore.get("NEXT_LOCALE")?.value || "en"
  const isEs = locale === "es"

  const standardItems: AccordionItem[] = isEs
    ? [
        {
          id: "philosophy",
          title: "Nuestra Filosofía",
          content: (
            <div className="space-y-4">
              <p>• Personalización por encima de paquetes estándar</p>
              <p>• Calidad por encima de cantidad</p>
              <p>• Experiencias memorables por encima de simples itinerarios</p>
            </div>
          ),
        },
        {
          id: "mission",
          title: "Nuestra Misión",
          content: (
            <p>
              Nuestro objetivo es adaptar cada experiencia a tus necesidades únicas, asegurando que cada detalle sea perfecto para ti.
            </p>
          ),
        },
        {
          id: "values",
          title: "Nuestros Valores",
          content: (
            <div className="space-y-6">
              <div>
                <strong className="block text-[var(--color-warm-white)] font-medium mb-1">
                  1. Soluciones, no excusas.
                </strong>
                <p>
                  Cuando algo no sale según lo planeado, nuestros clientes nunca se enteran del problema, solo de la solución. Nos anticipamos, pensamos rápido y resolvemos cualquier situación para que la experiencia nunca se detenga.
                </p>
              </div>
              <div>
                <strong className="block text-[var(--color-warm-white)] font-medium mb-1">
                  2. Selección rigurosa y sin compromisos.
                </strong>
                <p>
                  Cada propiedad, cada aliado y cada experiencia que ofrecemos se ha ganado su lugar. Solo trabajamos con profesionales que comparten nuestros estándares de excelencia.
                </p>
              </div>
              <div>
                <strong className="block text-[var(--color-warm-white)] font-medium mb-1">
                  3. No eres un cliente, eres un invitado.
                </strong>
                <p>
                  Tratamos a cada persona que viaja con nosotros como a un amigo cercano: con calidez, honestidad y un cuidado genuino por su bienestar. Compartimos lo mejor de Colombia para que te enamores de ella tanto como nosotros.
                </p>
              </div>
            </div>
          ),
        },
      ]
    : [
        {
          id: "philosophy",
          title: "Our Philosophy",
          content: (
            <div className="space-y-4">
              <p>• Personalization over packages</p>
              <p>• Quality over quantity</p>
              <p>• Experiences over itineraries</p>
            </div>
          ),
        },
        {
          id: "mission",
          title: "Our Mission",
          content: (
            <p>
              Our goal is to tailor every experience to meet your unique needs, ensuring that every detail is just perfect for you.
            </p>
          ),
        },
        {
          id: "values",
          title: "Our Values",
          content: (
            <div className="space-y-6">
              <div>
                <strong className="block text-[var(--color-warm-white)] font-medium mb-1">
                  1. Solutions, not excuses.
                </strong>
                <p>
                  When something doesn&apos;t go as planned, our clients never hear about the problem — only the solution. We work ahead, think fast and handle whatever comes so the experience never skips a beat.
                </p>
              </div>
              <div>
                <strong className="block text-[var(--color-warm-white)] font-medium mb-1">
                  2. Uncompromising selection.
                </strong>
                <p>
                  Every property, every partner, every experience we offer has earned its place. We only work with people who share our standards and professionalism.
                </p>
              </div>
              <div>
                <strong className="block text-[var(--color-warm-white)] font-medium mb-1">
                  3. You&apos;re not a client, you&apos;re a guest.
                </strong>
                <p>
                  We treat every person who travels with us the way we&apos;d treat a close friend — with warmth, honesty and genuine care for their wellbeing. We share the best of Colombia because we want you to love it the way we do.
                </p>
              </div>
            </div>
          ),
        },
      ]

  return (
    <>
      <Preloader />
      <SiteHeader />
      
      <main id="main">
        {/* HERO SECTION */}
        <section className="relative flex min-h-[75svh] items-end overflow-hidden bg-[var(--color-deep-sea)] pt-32 pb-24 md:pb-32">
          <div className="absolute inset-0">
             <Image
                src="/millan/about-hero.webp"
                alt={isEs ? "Aguas caribeñas de Colombia" : "Turquoise Caribbean waters"}
                fill
                priority
                className="object-cover opacity-50"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-deep-sea)] via-[var(--color-deep-sea)]/40 to-transparent" />
          </div>
          <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 md:px-10 text-[var(--color-warm-white)]">
             <h2 className="eyebrow text-[var(--color-sand)]">{isEs ? "SOBRE NOSOTROS" : "ABOUT US"}</h2>
             <h1 className="display mt-6 text-[clamp(3rem,6vw,6rem)]">{isEs ? "Nuestra historia" : "Our story"}</h1>
             <p className="mt-8 max-w-2xl font-sans text-lg font-light leading-relaxed text-[var(--color-warm-white)]/85">
               {isEs 
                 ? "Millan Experiences nació de una creencia simple: el lujo no se trata de excesos. Se trata de acceso exclusivo, comodidad y los detalles que hacen que todo se sienta fluido y sin esfuerzo."
                 : "Millan Experiences was born from a simple belief — luxury is not about excess. It's about access, comfort and the details that make everything feel effortless."}
             </p>
          </div>
        </section>

        {/* OUR PROMISE */}
        <section className="bg-[var(--color-warm-white)] py-24 md:py-32 text-center text-[var(--color-text-dark)]">
          <div className="mx-auto max-w-[900px] px-6 md:px-10">
            <h2 className="eyebrow text-[var(--color-blue-gray)]">{isEs ? "NUESTRA PROMESA" : "OUR PROMISE"}</h2>
            <h3 className="display mt-8 text-[clamp(1.5rem,3vw,2.5rem)] leading-snug">
              {isEs 
                ? "En Millan Experiences, diseñamos experiencias impecables y exclusivas para viajeros que valoran la privacidad, la belleza y un servicio inigualable. Desde villas y yates de lujo hasta itinerarios personalizados y eventos privados, cada detalle está orquestado con total dedicación."
                : "At Millan Experiences, we design seamless, elevated experiences for travelers who value privacy, beauty and impeccable service. From luxury villas and yachts to personalized itineraries and exclusive events, every detail is curated with intention."}
            </h3>
          </div>
        </section>

        {/* OUR STANDARD */}
        <section className="bg-[var(--color-deep-sea)] py-24 md:py-32 text-[var(--color-warm-white)]">
          <div className="mx-auto max-w-[1440px] px-6 md:px-10 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-24">
            <div>
              <h2 className="eyebrow text-[var(--color-sand)]">{isEs ? "NUESTRO ESTÁNDAR" : "OUR STANDARD"}</h2>
              <h3 className="display mt-6 text-[clamp(2.5rem,4vw,3.5rem)] leading-[1.1]">
                {isEs ? "La verdadera tranquilidad es saber que todo está resuelto." : "True ease is knowing everything is taken care of."}
              </h3>
            </div>
            <div className="lg:pt-4">
              <AccordionCustom items={standardItems} />
            </div>
          </div>
        </section>

        {/* WHO WE ARE */}
        <section className="bg-[var(--color-card)] py-24 md:py-32 text-[var(--color-text-dark)]">
          <div className="mx-auto max-w-[1440px] px-6 md:px-10 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <div className="relative aspect-[5/4] w-full overflow-hidden rounded-[min(var(--radius-lg),16px)]">
              <Image 
                src="/millan/about-who.webp" 
                alt={isEs ? "Calles de Cartagena representando Quiénes Somos" : "Cartagena street view representing Who We Are"} 
                fill 
                className="object-cover" 
              />
            </div>
            <div className="lg:pl-12">
              <h2 className="eyebrow text-[var(--color-blue-gray)]">{isEs ? "QUIÉNES SOMOS" : "WHO WE ARE"}</h2>
              <h3 className="display mt-6 text-[clamp(2.5rem,4vw,3.5rem)] leading-tight">{isEs ? "Tan único como tú" : "As unique as you"}</h3>
              <div className="mt-8 space-y-6 font-sans text-base font-light leading-relaxed opacity-85 text-[var(--color-text-dark)]">
                {isEs ? (
                  <>
                    <p>
                      Millan Experiences es una empresa de gestión de destinos en rápido crecimiento especializada en viajes vivenciales de lujo en Colombia. Creemos que cada viaje debe ser tan único como tú, por lo que nuestro enfoque se basa en un servicio verdaderamente personalizado que supera las expectativas. Anticipamos necesidades, cuidamos cada detalle y diseñamos experiencias perfectas que se sienten extraordinarias.
                    </p>
                    <p>
                      Para nosotros, no eres un cliente, eres un invitado. Tratamos a cada persona que viaja con nosotros como a un amigo cercano: con calidez, honestidad y cuidado genuino. Compartimos lo mejor de Colombia porque queremos que la disfrutes tanto como nosotros.
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      Millan Experiences, is a fast-growing Destination Management Company specialized in experiential luxury travel across Colombia. We believe every journey should be as unique as you, which is why our approach is rooted in a truly personalized service that goes beyond expectations. We anticipate needs, curate every detail, and design seamless experiences that feel effortless yet extraordinary. From sophisticated escapes and cultural immersion, to insider-only adventures, we craft unforgettable moments that reflect the individuality of each client.
                    </p>
                    <p>
                      For us, you&apos;re not a client, you&apos;re a guest. We treat every person who travels with us the way we&apos;d treat a close friend — with warmth, honesty and genuine care for their wellbeing. We share the best of Colombia because we want you to love it the way we do.
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* WHAT WE DO */}
        <section className="bg-[var(--color-warm-white)] py-24 md:py-32 text-[var(--color-text-dark)]">
          <div className="mx-auto max-w-[1440px] px-6 md:px-10 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <div className="order-2 lg:order-1 lg:pr-12">
              <h2 className="eyebrow text-[var(--color-blue-gray)]">{isEs ? "QUÉ HACEMOS" : "WHAT WE DO"}</h2>
              <h3 className="display mt-6 text-[clamp(2.5rem,4vw,3.5rem)] leading-tight">
                {isEs ? "La verdadera tranquilidad es saber que todo está en buenas manos" : "True ease is knowing everything is taken care of"}
              </h3>
              <div className="mt-8 space-y-6 font-sans text-base font-light leading-relaxed opacity-85 text-[var(--color-text-dark)]">
                {isEs ? (
                  <>
                    <p>
                      Nuestro equipo combina creatividad, experiencia y un profundo conocimiento local con un dominio absoluto de los estándares internacionales de lujo. Trabajamos estrechamente contigo para diseñar itinerarios a medida, logrando el equilibrio perfecto entre confort, aventura, cultura y relajación.
                    </p>
                    <p>
                      Desde hoteles y restaurantes exclusivos hasta transporte privado y experiencias únicas, cada elemento está cuidadosamente planificado. A través de nuestra red de aliados de confianza, creamos viajes memorables ejecutados con precisión de principio a fin.
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      Our team combines creativity, expertise, and deep local knowledge with a strong understanding of international luxury standards. We work closely with you to design tailor-made itineraries, achieving the perfect balance of luxury, adventure, culture, and relaxation.
                    </p>
                    <p>
                      From handpicked hotels and restaurants to private transportation and exclusive experiences, every detail is carefully curated. Through our network of trusted partners—including local experts and private providers—we create truly unique journeys, executed with precision from start to finish.
                    </p>
                  </>
                )}
              </div>
            </div>
            <div className="order-1 lg:order-2 relative aspect-[4/5] w-full overflow-hidden rounded-[min(var(--radius-lg),16px)]">
              <Image 
                src="/millan/about-what.webp" 
                alt={isEs ? "Vista de las Islas del Rosario representando Qué Hacemos" : "Rosario Islands view representing What We Do"} 
                fill 
                className="object-cover" 
              />
            </div>
          </div>
        </section>

        {/* TEAM */}
        <section className="bg-[var(--color-deep-sea)] py-24 md:py-40 text-[var(--color-warm-white)]">
          <div className="mx-auto max-w-[1440px] px-6 md:px-10">
            <div className="text-center">
              <h2 className="eyebrow text-[var(--color-sand)]">{isEs ? "EQUIPO" : "TEAM"}</h2>
              <h3 className="display mt-6 text-[clamp(2.5rem,4vw,3.5rem)]">{isEs ? "Conoce a nuestros fundadores" : "Meet our founders"}</h3>
            </div>
            <div className="mt-16 grid grid-cols-1 gap-16 sm:grid-cols-2 lg:mx-auto lg:max-w-4xl lg:gap-24">
              <div className="text-center">
                <div className="relative mx-auto aspect-square w-full max-w-[320px] overflow-hidden rounded-[min(var(--radius-lg),16px)] bg-[var(--color-blue-gray)]/30">
                   <Image 
                      src="/millan/about-sofia.webp" 
                      alt="Sofia Millan, Co-Founder" 
                      fill 
                      className="object-cover" 
                   />
                </div>
                <h4 className="mt-8 font-serif text-2xl">Sofia Millan</h4>
                <p className="mt-2 font-sans text-[0.66rem] font-medium tracking-[0.2em] text-[var(--color-sand)] uppercase">
                  {isEs ? "Cofundadora" : "Co-Founder"}
                </p>
              </div>
              <div className="text-center">
                <div className="relative mx-auto aspect-square w-full max-w-[320px] overflow-hidden rounded-[min(var(--radius-lg),16px)] bg-[var(--color-blue-gray)]/30">
                   <Image 
                      src="/millan/about-francisco.webp" 
                      alt="Francisco Millan, Co-Founder" 
                      fill 
                      className="object-cover" 
                   />
                </div>
                <h4 className="mt-8 font-serif text-2xl">Francisco Millan</h4>
                <p className="mt-2 font-sans text-[0.66rem] font-medium tracking-[0.2em] text-[var(--color-sand)] uppercase">
                  {isEs ? "Cofundador" : "Co-Founder"}
                </p>
              </div>
            </div>
            <div className="mx-auto mt-20 max-w-3xl font-sans text-[15px] font-light leading-relaxed text-[var(--color-warm-white)]/80 text-center space-y-6">
              {isEs ? (
                <>
                  <p>
                    Millan Experiences es una empresa de origen familiar creada por los hermanos Sofía y Francisco: nativos colombianos, bilingües y con mentalidad global. Habiendo vivido y estudiado en el extranjero, aportan una perspectiva internacional y un profundo conocimiento de la hospitalidad de clase mundial.
                  </p>
                  <p>
                    Con años de experiencia combinada en turismo, hospitalidad y gastronomía, han construido Millan Experiences con un firme compromiso con la excelencia, la autenticidad y los viajes significativos.
                  </p>
                  <p>
                    En esencia, la empresa se dedica a apoyar el turismo sostenible y fomentar el desarrollo comunitario, contribuyendo positivamente a la preservación cultural y al crecimiento a largo plazo de Colombia.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    Millan Experiences is a family-founded company created by siblings Sofia and Francisco—Colombian natives, bilingual, and globally minded. Having lived and studied abroad, they bring an international perspective and a deep understanding of world-class hospitality.
                  </p>
                  <p>
                    With years of combined experience across tourism, hospitality, and the restaurant industry, they have built Millan Experiences with a strong commitment to excellence, authenticity, and meaningful travel.
                  </p>
                  <p>
                    At its core, the company is dedicated to supporting sustainable tourism and fostering community engagement, contributing positively to Colombia&apos;s cultural preservation and long-term development.
                  </p>
                </>
              )}
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

import type { Metadata } from "next"
import Image from "next/image"
import { Preloader } from "@/components/preloader"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Cta } from "@/components/cta"
import { JsonLd } from "@/components/json-ld"
import { PostCard } from "@/components/blog/post-card"
import { getAllPosts } from "@/lib/blog"
import { SITE_NAME, SITE_URL, absoluteUrl, breadcrumbJsonLd, buildMetadata, getLocale } from "@/lib/seo"

const copy = {
  en: {
    title: "Luxury Travel Guides to Cartagena & the Colombian Caribbean",
    description:
      "Local guides to Cartagena, the Rosario Islands, yacht charters, destination weddings and celebrations from the Millan Experiences concierge team.",
    eyebrow: "The Journal",
    heading: "Stories and guides from the Colombian Caribbean",
    intro:
      "Insider knowledge from our concierge team in Cartagena — where to go, when to travel and how to experience Colombia's coast with privacy and ease.",
    latest: "Latest guides",
    heroAlt: "Colonial street in Cartagena, Colombia",
    ctaTitle: "Ready to turn inspiration into a plan?",
    ctaText: "Tell us how you imagine your trip and our concierge will design every detail around you.",
    ctaLabel: "Start planning",
    home: "Home",
  },
  es: {
    title: "Guías de viaje de lujo a Cartagena y el Caribe colombiano",
    description:
      "Guías locales sobre Cartagena, las Islas del Rosario, alquiler de yates, bodas de destino y celebraciones, por el concierge de Millan Experiences.",
    eyebrow: "El Blog",
    heading: "Historias y guías del Caribe colombiano",
    intro:
      "Conocimiento local de nuestro equipo de concierge en Cartagena: a dónde ir, cuándo viajar y cómo vivir la costa colombiana con privacidad y tranquilidad.",
    latest: "Últimas guías",
    heroAlt: "Calle colonial en Cartagena, Colombia",
    ctaTitle: "¿Listo para convertir la inspiración en un plan?",
    ctaText: "Cuéntanos cómo imaginas tu viaje y nuestro concierge diseñará cada detalle a tu medida.",
    ctaLabel: "Comenzar a planear",
    home: "Inicio",
  },
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const t = copy[locale]
  return buildMetadata({
    title: t.title,
    description: t.description,
    path: "/blog",
    locale,
    image: "/millan/cartagena-street.png",
    imageAlt: t.heroAlt,
  })
}

export default async function BlogIndexPage() {
  const locale = await getLocale()
  const t = copy[locale]
  const posts = await getAllPosts()
  const [featured, ...rest] = posts

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${SITE_URL}/blog#blog`,
    url: absoluteUrl("/blog"),
    name: `${SITE_NAME} — ${t.eyebrow}`,
    description: t.description,
    inLanguage: locale,
    publisher: { "@id": `${SITE_URL}/#organization` },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.content[locale].title,
      url: absoluteUrl(`/blog/${post.slug}`),
      datePublished: post.publishedAt,
      dateModified: post.updatedAt,
      image: absoluteUrl(post.image),
    })),
  }

  return (
    <>
      <Preloader />
      <SiteHeader />

      <main id="main">
        <section className="relative flex min-h-[70svh] items-end overflow-hidden bg-[var(--color-deep-sea)] pt-32 pb-20 md:pb-28">
          <div className="absolute inset-0">
            <Image
              src="/millan/cartagena-street.png"
              alt={t.heroAlt}
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-50"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-deep-sea)] via-[var(--color-deep-sea)]/40 to-transparent" />
          </div>
          <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 md:px-10 text-[var(--color-warm-white)]">
            <p className="eyebrow text-[var(--color-sand)]">{t.eyebrow}</p>
            <h1 className="display mt-6 max-w-4xl text-[clamp(2.75rem,6vw,5.5rem)]">{t.heading}</h1>
            <p className="mt-8 max-w-2xl font-sans text-lg font-light leading-relaxed text-[var(--color-warm-white)]/85">
              {t.intro}
            </p>
          </div>
        </section>

        <section className="bg-[var(--color-card)] py-20 md:py-28">
          <div className="mx-auto max-w-[1440px] px-6 md:px-10">
            {featured && <PostCard post={featured} locale={locale} featured />}

            {rest.length > 0 && (
              <>
                <h2 className="eyebrow mt-20 mb-10 text-[var(--color-blue-gray)] md:mt-28">{t.latest}</h2>
                <div
                  className={`grid grid-cols-1 gap-8 md:grid-cols-2 ${rest.length % 3 === 0 ? "lg:grid-cols-3" : "lg:grid-cols-2"}`}
                >
                  {rest.map((post) => (
                    <PostCard key={post.slug} post={post} locale={locale} />
                  ))}
                </div>
              </>
            )}
          </div>
        </section>

        <section className="bg-[var(--color-deep-sea)] py-24 md:py-32 text-center text-[var(--color-warm-white)]">
          <div className="mx-auto max-w-3xl px-6 md:px-10">
            <h2 className="display text-[clamp(2.25rem,4vw,3.5rem)] leading-tight">{t.ctaTitle}</h2>
            <p className="mx-auto mt-6 max-w-xl font-sans text-lg font-light leading-relaxed text-[var(--color-warm-white)]/80">
              {t.ctaText}
            </p>
            <div className="mt-10">
              <Cta href="/contact" tone="sand">{t.ctaLabel}</Cta>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
      <JsonLd
        data={[
          blogJsonLd,
          breadcrumbJsonLd([
            { name: t.home, path: "/" },
            { name: t.eyebrow, path: "/blog" },
          ]),
        ]}
      />
    </>
  )
}

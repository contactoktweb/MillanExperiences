/*
  SEO / GEO helpers shared by every public route.
  - buildMetadata(): canonical URL, Open Graph and Twitter cards with a
    consistent brand suffix (applied once by the root title template).
  - JSON-LD builders: Organization (TravelAgency), WebSite, BreadcrumbList
    and FAQPage, so search engines and AI answer engines can cite the
    business and its content unambiguously.
*/
import type { Metadata } from "next"
import { cookies } from "next/headers"
import { contact } from "@/lib/site-data"

export const SITE_URL = "https://www.millan-experiences.com"
export const SITE_NAME = "Millan Experiences"
export const DEFAULT_OG_IMAGE = "/millan/private-islands-hero.webp"

export type Locale = "en" | "es"

export async function getLocale(): Promise<Locale> {
  const cookieStore = await cookies()
  return cookieStore.get("NEXT_LOCALE")?.value === "es" ? "es" : "en"
}

export function absoluteUrl(path = "/") {
  if (/^https?:\/\//.test(path)) return path
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`
}

// Titles coming from Sanity often already carry the brand; the root layout
// template appends it, so strip it here to avoid "X | Millan — Millan".
export function cleanTitle(title?: string | null) {
  return (title || "").replace(/\s*[|—–-]\s*Millan Experiences\s*$/i, "").trim()
}

type BuildMetadataInput = {
  title?: string | null
  description?: string | null
  path: string
  locale?: Locale
  image?: string | null
  imageAlt?: string
  type?: "website" | "article"
  publishedTime?: string
  modifiedTime?: string
  keywords?: string[]
  noIndex?: boolean
}

export function buildMetadata({
  title,
  description,
  path,
  locale = "en",
  image,
  imageAlt,
  type = "website",
  publishedTime,
  modifiedTime,
  keywords,
  noIndex,
}: BuildMetadataInput): Metadata {
  const clean = cleanTitle(title)
  // Keep SERP titles short: drop the brand suffix when it would push past ~65 chars.
  const withBrand = `${clean} — ${SITE_NAME}`
  const fullTitle = !clean ? SITE_NAME : withBrand.length > 65 ? clean : withBrand
  const ogImage = image || DEFAULT_OG_IMAGE
  const desc = description || undefined

  return {
    title: { absolute: fullTitle },
    description: desc,
    keywords,
    alternates: { canonical: path },
    openGraph: {
      type,
      url: path,
      siteName: SITE_NAME,
      title: fullTitle,
      description: desc,
      locale: locale === "es" ? "es_CO" : "en_US",
      alternateLocale: locale === "es" ? ["en_US"] : ["es_CO"],
      images: [{ url: ogImage, alt: imageAlt || clean || SITE_NAME }],
      ...(type === "article" ? { publishedTime, modifiedTime, authors: [SITE_NAME] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: desc,
      images: [ogImage],
    },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
  }
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: absoluteUrl("/logo/logo-large.png"),
  image: absoluteUrl(DEFAULT_OG_IMAGE),
  slogan: "Colombia, Designed for you.",
  description:
    "Luxury destination management company and private concierge in Cartagena, Colombia: private villas, private islands in the Rosario Islands, yacht and speedboat charters, private chefs, private aviation, weddings, bachelor parties and corporate groups.",
  telephone: contact.phone,
  email: contact.email,
  priceRange: "$$$$",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Cartagena de Indias",
    addressRegion: "Bolívar",
    addressCountry: "CO",
  },
  geo: { "@type": "GeoCoordinates", latitude: 10.391, longitude: -75.4794 },
  areaServed: [
    { "@type": "City", name: "Cartagena de Indias" },
    { "@type": "Place", name: "Rosario Islands (Islas del Rosario)" },
    { "@type": "Place", name: "Barú" },
    { "@type": "Country", name: "Colombia" },
  ],
  knowsLanguage: ["en", "es"],
  founder: [
    { "@type": "Person", name: "Sofia Millan" },
    { "@type": "Person", name: "Francisco Millan" },
  ],
  sameAs: [contact.instagram, contact.facebook, contact.linkedin, contact.tiktok],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: contact.phone,
    email: contact.email,
    contactType: "reservations",
    availableLanguage: ["English", "Spanish"],
  },
}

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  inLanguage: ["en", "es"],
  publisher: { "@id": `${SITE_URL}/#organization` },
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export function faqJsonLd(questions?: { question?: string; answer?: string }[] | null) {
  const valid = (questions || []).filter((q) => q?.question?.trim() && q?.answer?.trim())
  if (valid.length === 0) return null
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: valid.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: { "@type": "Answer", text: q.answer },
    })),
  }
}

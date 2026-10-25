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
import { cache } from "react"
import { contact } from "@/lib/site-data"
import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"
import { globalConfigQuery } from "@/sanity/lib/queries"

export const SITE_URL = "https://www.millan-experiences.com"
export const SITE_NAME = "Millan Experiences"
// Social previews (WhatsApp, Facebook, LinkedIn, X) need a light JPG/PNG:
// WhatsApp drops images over ~300–600 KB and does not reliably read WebP.
// Local hero images have pre-rendered 1200×630 JPG versions in /public/og.
export const DEFAULT_OG_IMAGE = "/og/private-islands-hero.jpg"
const OG_WIDTH = 1200
const OG_HEIGHT = 630
const LOCAL_OG_IMAGES = new Set([
  "private-islands-hero",
  "cartagena-street",
  "about-hero",
  "yachts-hero",
  "wed-hero",
  "bachelor-hero",
])

export type Locale = "en" | "es"

export async function getLocale(): Promise<Locale> {
  const cookieStore = await cookies()
  return cookieStore.get("NEXT_LOCALE")?.value === "es" ? "es" : "en"
}

export function absoluteUrl(path = "/") {
  if (/^https?:\/\//.test(path)) return path
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`
}

export function ogImageUrl(src?: string | null): string {
  if (!src) return DEFAULT_OG_IMAGE
  // Sanity CDN crops (centered) and re-encodes to a light JPG on the fly.
  if (src.includes("cdn.sanity.io/images/")) {
    if (src.includes("fm=jpg")) return src // already sized (see getSiteShareImage)
    return `${src.split("?")[0]}?w=${OG_WIDTH}&h=${OG_HEIGHT}&fit=crop&fm=jpg&q=80`
  }
  if (src.startsWith("/og/")) return src
  const name = src.match(/^\/millan\/([^/]+)\.(?:webp|png|jpe?g)$/)?.[1]
  if (name && LOCAL_OG_IMAGES.has(name)) return `/og/${name}.jpg`
  return src.startsWith("/") ? DEFAULT_OG_IMAGE : src
}

// Site-wide share image set in Sanity → Configuración Global. Cropped to
// 1200×630 around the editor's hotspot; falls back to DEFAULT_OG_IMAGE.
export const getSiteShareImage = cache(async (): Promise<{ url: string; alt?: string }> => {
  try {
    const config = await client.fetch(globalConfigQuery)
    const image = config?.shareImage
    if (image?.asset?._ref) {
      const url = urlFor(image).width(OG_WIDTH).height(OG_HEIGHT).fit("crop").format("jpg").quality(80).url()
      return { url, alt: image.alt || undefined }
    }
  } catch (error) {
    console.error("[seo] Could not load share image", error)
  }
  return { url: DEFAULT_OG_IMAGE }
})

// The site picks its language from a cookie; `?lang=es` (handled in
// proxy.ts) gives the Spanish version its own shareable, indexable URL.
export function localizedPath(path: string, locale: Locale) {
  return locale === "es" ? `${path}${path.includes("?") ? "&" : "?"}lang=es` : path
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

// Search results show ~120–160 characters: pad descriptions that are too
// short (often one-liners from Sanity) and trim long ones on a word boundary.
const DESCRIPTION_SUFFIX: Record<Locale, string> = {
  en: "Tailor-made by Millan Experiences, your private concierge in Cartagena, Colombia.",
  es: "A tu medida con Millan Experiences, tu concierge privado en Cartagena, Colombia.",
}

export function fitDescription(description: string | null | undefined, locale: Locale): string | undefined {
  let text = (description || "").replace(/\s+/g, " ").trim()
  if (!text) return undefined
  if (text.length < 110) text = `${text.replace(/[.\s]*$/, ".")} ${DESCRIPTION_SUFFIX[locale]}`
  if (text.length <= 160) return text
  const cut = text.slice(0, 157)
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:—–-]$/, "")}…`
}

// Pages without their own image use the share image from Configuración Global.
export async function buildMetadata({
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
}: BuildMetadataInput): Promise<Metadata> {
  const clean = cleanTitle(title)
  // Keep SERP titles short: drop the brand suffix when it would push past ~65 chars.
  const withBrand = `${clean} — ${SITE_NAME}`
  const fullTitle = !clean ? SITE_NAME : withBrand.length > 65 ? clean : withBrand
  const siteImage = image ? null : await getSiteShareImage()
  const ogImage = absoluteUrl(ogImageUrl(image || siteImage?.url))
  const desc = fitDescription(description, locale)
  const url = localizedPath(path, locale)
  const alt = imageAlt || siteImage?.alt || clean || SITE_NAME

  return {
    title: { absolute: fullTitle },
    description: desc,
    keywords,
    alternates: {
      canonical: url,
      languages: { en: path, es: localizedPath(path, "es"), "x-default": path },
    },
    openGraph: {
      type,
      url,
      siteName: SITE_NAME,
      title: fullTitle,
      description: desc,
      locale: locale === "es" ? "es_CO" : "en_US",
      alternateLocale: locale === "es" ? ["en_US"] : ["es_CO"],
      images: [{ url: ogImage, secureUrl: ogImage, width: OG_WIDTH, height: OG_HEIGHT, type: "image/jpeg", alt }],
      ...(type === "article" ? { publishedTime, modifiedTime, authors: [SITE_NAME] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: desc,
      images: [{ url: ogImage, alt }],
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
  knowsAbout: [
    "Luxury travel in Colombia",
    "Private villa rentals in Cartagena",
    "Private islands in the Rosario Islands",
    "Yacht, catamaran and speedboat charters in Cartagena",
    "Private chefs",
    "Destination weddings in Cartagena",
    "Bachelor and bachelorette parties in Cartagena",
    "Corporate group travel in Colombia",
  ],
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
      item: absoluteUrl(encodePath(item.path)),
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

// Sanity listing pages that next.config.mjs redirects elsewhere: they must
// stay out of the sitemap (a redirecting URL is a duplicate for Google).
export const REDIRECTED_SLUGS = new Set(["villas-and-islands", "boats-and-yachts", "groups-and-events"])

// Encodes non-ASCII characters (e.g. "cuña") so URLs in sitemaps and
// structured data are valid.
export function encodePath(path: string) {
  return encodeURI(decodeURI(path))
}

const STAY_CATEGORIES = new Set(["luxury-villas", "private-islands"])
const BOAT_SERVICE: Record<string, Record<Locale, string>> = {
  "yachts-catamarans": { en: "Private yacht and catamaran charter", es: "Alquiler privado de yate y catamarán" },
  speedboats: { en: "Private speedboat charter", es: "Alquiler privado de lancha" },
}

// Villas and islands → VacationRental; boats → Service. Gives search and AI
// engines the facts travellers ask about (capacity, bedrooms, amenities).
export function propertyJsonLd(category: string, data: any, locale: Locale, path: string, description?: string) {
  const url = absoluteUrl(encodePath(localizedPath(path, locale)))
  const images = [data.mainImageUrl, ...(data.gallery || []).map((g: any) => g?.asset?.url)].filter(Boolean).slice(0, 8)
  const details = data.details || {}
  const amenities = (data.amenities || []).filter((a: unknown) => typeof a === "string")
  if (STAY_CATEGORIES.has(category)) {
    const isIsland = category === "private-islands"
    return {
      "@context": "https://schema.org",
      "@type": "VacationRental",
      name: data.title,
      url,
      description,
      image: images,
      brand: { "@id": `${SITE_URL}/#organization` },
      address: {
        "@type": "PostalAddress",
        addressLocality: isIsland ? "Islas del Rosario, Cartagena de Indias" : "Cartagena de Indias",
        addressRegion: "Bolívar",
        addressCountry: "CO",
        ...(details.location && !isIsland ? { streetAddress: details.location } : {}),
      },
      containsPlace: {
        "@type": "Accommodation",
        additionalType: isIsland ? "Private island" : "Villa",
        ...(details.capacity ? { occupancy: { "@type": "QuantitativeValue", maxValue: details.capacity } } : {}),
        ...(details.rooms ? { numberOfBedrooms: details.rooms } : {}),
        ...(details.bathrooms ? { numberOfBathroomsTotal: details.bathrooms } : {}),
        amenityFeature: amenities.map((name: string) => ({ "@type": "LocationFeatureSpecification", name, value: true })),
      },
    }
  }
  const service = BOAT_SERVICE[category]
  if (!service) return null
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: data.title,
    serviceType: service[locale],
    url,
    description,
    image: images,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: [
      { "@type": "City", name: "Cartagena de Indias" },
      { "@type": "Place", name: "Rosario Islands (Islas del Rosario)" },
    ],
    additionalProperty: [
      details.capacity && { "@type": "PropertyValue", name: locale === "es" ? "Capacidad (personas)" : "Capacity (guests)", value: details.capacity },
      details.dimensions && { "@type": "PropertyValue", name: locale === "es" ? "Eslora" : "Length", value: details.dimensions },
      details.rooms && { "@type": "PropertyValue", name: locale === "es" ? "Cabinas" : "Cabins", value: details.rooms },
      details.bathrooms && { "@type": "PropertyValue", name: locale === "es" ? "Baños" : "Bathrooms", value: details.bathrooms },
      ...amenities.map((a: string) => ({ "@type": "PropertyValue", name: locale === "es" ? "Incluye" : "Includes", value: a })),
    ].filter(Boolean),
  }
}

export function itemListJsonLd(name: string, items: { name: string; path: string; image?: string }[]) {
  if (items.length === 0) return null
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    numberOfItems: items.length,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: absoluteUrl(encodePath(item.path)),
      ...(item.image ? { image: item.image } : {}),
    })),
  }
}

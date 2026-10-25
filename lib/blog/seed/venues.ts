import type { Locale, SeedBlock } from "../types"

// Recommended venues (restaurants, rooftops, bars and clubs) rendered as
// one H3 card per venue, grouped under H2 sections.
export type Venue = {
  name: string
  instagram: string
  text: Record<Locale, string>
  dress: "standard" | "none" | Record<Locale, string>
}

export type VenueGroup = { id: Record<Locale, string>; title: Record<Locale, string>; intro: Record<Locale, string>; venues: Venue[] }

const DRESS = {
  standard: {
    en: "No hats, flip-flops, tank tops or sportswear.",
    es: "Sin gorras, chanclas, camisetas sin mangas ni ropa deportiva.",
  },
  none: { en: "No dress code.", es: "Sin código de vestimenta." },
}

const LABELS = {
  en: { dress: "Dress code", ig: "Instagram" },
  es: { dress: "Código de vestimenta", ig: "Instagram" },
}

export function venueBlocks(groups: VenueGroup[], locale: Locale): SeedBlock[] {
  const t = LABELS[locale]
  return groups.flatMap((group) => [
    { type: "h2" as const, id: group.id[locale], text: group.title[locale] },
    { type: "p" as const, text: group.intro[locale] },
    ...group.venues.flatMap((v) => {
      const dress = typeof v.dress === "string" ? DRESS[v.dress][locale] : v.dress[locale]
      return [
        { type: "h3" as const, text: v.name },
        { type: "p" as const, text: v.text[locale] },
        {
          type: "p" as const,
          text: `**${t.dress}:** ${dress} · **${t.ig}:** [@${v.instagram}](https://www.instagram.com/${v.instagram}/)`,
        },
      ]
    }),
  ])
}

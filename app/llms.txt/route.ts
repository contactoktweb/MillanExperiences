import { getAllPosts } from "@/lib/blog"
import { contact } from "@/lib/site-data"
import { SITE_URL } from "@/lib/seo"

// llms.txt (https://llmstxt.org): a plain-text map of the site for AI
// answer engines, so they can describe and cite Millan Experiences accurately.
export const revalidate = 3600

export async function GET() {
  const posts = await getAllPosts()
  const u = (path: string) => `${SITE_URL}${path}`

  const body = `# Millan Experiences

> Millan Experiences is a family-founded luxury destination management company and private concierge based in Cartagena de Indias, Colombia. It designs bespoke travel across Cartagena and the Colombian Caribbean: private villas, private islands in the Rosario Islands, yacht, catamaran and speedboat charters, private chefs, private tours, private aviation, weddings, bachelor and bachelorette parties, celebrations and corporate groups. Founded by siblings Sofia and Francisco Millan. Service is bilingual (English and Spanish) and every proposal is tailor-made rather than a fixed package.

Contact: ${contact.phone} (phone and WhatsApp) · ${contact.email} · ${u("/contact")}
Location: Cartagena de Indias, Bolívar, Colombia

## Services
- [Concierge](${u("/services/concierge")}): reservations, transfers, access and on-trip support handled by one dedicated team
- [Private Tours](${u("/services/private-tours")}): cultural, historic, gastronomic, island and adventure tours in and around Cartagena
- [Private Chef](${u("/services/private-chef")}): chefs for villas, islands and yachts
- [Private Aviation](${u("/services/private-aviation")}): private flights within Colombia and internationally

## Stays and boats
- [Private Villas](${u("/luxury-villas")}): staffed luxury villas in Cartagena and on the coast
- [Private Islands](${u("/private-islands")}): private island stays and day experiences in the Rosario Islands
- [Speedboats](${u("/speedboats")}): private speedboat charters to the Rosario Islands, Barú and Tierra Bomba
- [Yachts & Catamarans](${u("/yachts-catamarans")}): crewed yacht and catamaran charters

## Groups and events
- [Weddings](${u("/weddings")}): destination weddings in Cartagena and on private islands
- [Bachelor & Bachelorette Parties](${u("/bachelor-bachelorette-parties")})
- [Corporate Groups](${u("/corporate-groups")}): retreats, incentives and team experiences
- [Birthdays & Celebrations](${u("/birthdays-and-celebrations")})

## Guides (blog)
${posts.map((p) => `- [${p.content.en.title}](${u(`/blog/${p.slug}`)}): ${p.content.en.metaDescription || p.content.en.description}`).join("\n")}

## About
- [About Millan Experiences](${u("/about")})
`

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  })
}

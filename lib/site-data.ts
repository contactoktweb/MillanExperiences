/*
  Central content configuration for Millan Experiences.
  Contact details, navigation and collections live here rather than inside
  components, so they can later be swapped for a CMS/global-settings source
  without touching the UI. Do not hardcode contact data in components.
*/

export const contact = {
  // NOTE: placeholder contact values — replace with the client-approved
  // single phone/email before publishing (do not publish contradictory ones).
  phone: "+57 300 000 0000",
  phoneHref: "tel:+573000000000",
  email: "concierge@millan-experiences.com",
  whatsapp: "https://wa.me/573000000000",
  instagram: "https://instagram.com/millanexperiences",
  facebook: "https://facebook.com/millanexperiences",
  linkedin: "https://linkedin.com/company/millanexperiences",
  tiktok: "https://tiktok.com/@millanexperiences",
} as const

export type NavChild = { label: string; href: string }

export type NavItem = {
  label: string
  href: string
  description?: string
  image?: string
  imageAlt?: string
  children?: NavChild[]
  cta?: { label: string; href: string }
}

export const navItems: NavItem[] = [
  { label: "About", href: "/about" },
  {
    label: "Services",
    href: "/services",
    description:
      "A private concierge for Colombia — every reservation, transfer and detail, quietly handled.",
    image: "/millan/concierge.png",
    imageAlt: "A private chef plating gourmet seafood aboard a luxury yacht.",
    children: [
      { label: "Concierge", href: "/services/concierge" },
      { label: "Private Tours", href: "/services/private-tours" },
      { label: "Private Chef", href: "/services/private-chef" },
      { label: "Private Aviation", href: "/services/private-aviation" },
    ],
    cta: { label: "Speak with our concierge", href: "/contact" },
  },
  {
    label: "Villas & Islands",
    href: "/villas-and-islands",
    description:
      "Hand-picked private villas and islands across the Colombian Caribbean.",
    image: "/millan/villa-island.png",
    imageAlt: "A private villa with an infinity pool over the turquoise Caribbean.",
    children: [
      { label: "Private Villas", href: "/villas-and-islands/private-villas" },
      { label: "Private Islands", href: "/villas-and-islands/private-islands" },
    ],
    cta: { label: "Explore our villas", href: "/villas-and-islands" },
  },
  {
    label: "Boats & Yachts",
    href: "/boats-and-yachts",
    description:
      "A curated fleet of speedboats, yachts and catamarans, crew included.",
    image: "/millan/boat-turquoise.jpg",
    imageAlt: "A luxury speedboat moored on clear turquoise Caribbean water.",
    children: [
      { label: "Speedboats", href: "/boats-and-yachts/speedboats" },
      { label: "Yachts & Catamarans", href: "/boats-and-yachts/yachts-catamarans" },
    ],
    cta: { label: "Discover our fleet", href: "/boats-and-yachts" },
  },
  {
    label: "Groups & Events",
    href: "/groups-and-events",
    description:
      "Weddings, celebrations and corporate journeys — orchestrated end to end.",
    image: "/millan/events.png",
    imageAlt: "An elegant celebration table set on a Caribbean beach at sunset.",
    children: [
      { label: "Bachelor & Bachelorette", href: "/groups-and-events/bachelor-bachelorette" },
      { label: "Corporate Groups", href: "/groups-and-events/corporate-groups" },
      { label: "Celebrations", href: "/groups-and-events/celebrations" },
      { label: "Weddings", href: "/groups-and-events/weddings" },
    ],
    cta: { label: "Plan your event", href: "/contact" },
  },
  { label: "Contact", href: "/contact" },
]

export const coreServices = [
  {
    number: "01",
    title: "Luxury Villas & Private Islands",
    description:
      "Fully staffed, architecturally striking properties across the Colombian coast, vetted for total privacy.",
    href: "/villas-and-islands",
    cta: "Explore our villas",
    image: "/fotos/Playa.webp",
    imageAlt: "Infinity pool of a private villa overlooking the Caribbean near Cartagena.",
  },
  {
    number: "02",
    title: "Boats & Yachts",
    description:
      "A hand-picked fleet of speedboats, yachts and catamarans, with crew, itinerary and every detail arranged.",
    href: "/boats-and-yachts",
    cta: "Discover our fleet",
    image: "/fotos/whatsapp-image.webp",
    imageAlt: "A guest relaxing on the bow of a Millan Experiences yacht by the mangroves.",
  },
  {
    number: "03",
    title: "Private Concierge",
    description:
      "Reservations, transfers, chefs and access — the quiet work that lets a journey feel effortless.",
    href: "/services/concierge",
    cta: "Speak with our concierge",
    image: "/fotos/concierge-ai.webp",
    imageAlt: "A private chef preparing a refined meal aboard a yacht.",
  },
  {
    number: "04",
    title: "Events & Celebrations",
    description:
      "Weddings, milestones and corporate gatherings, produced with precision and a distinctly Colombian warmth.",
    href: "/groups-and-events",
    cta: "Plan your event",
    image: "/fotos/events-people.webp",
    imageAlt: "An elegant celebration on a Caribbean beach at golden hour.",
  },
] as const

export const brandAttributes = [
  {
    title: "Refined local knowledge",
    body: "We know Colombia from within — the people, the tides, the tables worth keeping quiet about.",
  },
  {
    title: "Personally curated",
    body: "Nothing is off a shelf. Every itinerary is composed by hand, for you.",
  },
  {
    title: "Seamless execution",
    body: "Logistics, timing and access are arranged so the day simply unfolds.",
  },
  {
    title: "Dedicated support",
    body: "One point of contact, present from the first conversation to the last sunset.",
  },
] as const

/*
  Testimonials — PLACEHOLDER content pending client-approved, real reviews.
  Do not invent names, nationalities or ratings for production. Replace the
  entries below with verified testimonials from the current site / CMS.
*/
export const testimonials = [
  {
    quote:
      "Every detail was anticipated before we thought to ask. We simply arrived and were carried through the days.",
    name: "Private client",
    context: "Family voyage · Islas del Rosario",
  },
  {
    quote:
      "The kind of trip you stop trying to document and start letting yourself feel. Faultless from the first call.",
    name: "Private client",
    context: "Anniversary · Cartagena",
  },
  {
    quote:
      "A corporate week for thirty, handled by one team who never missed a beat. Bilingual, precise, calm.",
    name: "Private client",
    context: "Corporate retreat · Colombian Caribbean",
  },
  {
    quote:
      "They understood a coastline we thought we already knew, and opened doors we did not know existed.",
    name: "Private client",
    context: "Celebration · Barú",
  },
] as const

export const homeFaqs = [
  {
    q: "How does planning with Millan Experiences begin?",
    a: "It begins with a conversation. You tell us how you imagine the journey, and we return a tailored proposal — villas, boats, chefs and logistics, considered as one.",
  },
  {
    q: "Do you only operate in Cartagena?",
    a: "Cartagena and the Colombian Caribbean are our home, and where our knowledge runs deepest. We also arrange journeys elsewhere in Colombia on request.",
  },
  {
    q: "Are prices published on the site?",
    a: "Most experiences are composed to order, so we prepare a proposal rather than a fixed price. Everything is quoted clearly before anything is confirmed.",
  },
] as const

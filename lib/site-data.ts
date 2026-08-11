/*
  Central content configuration for Millan Experiences.
  Contact details, navigation and collections live here rather than inside
  components, so they can later be swapped for a CMS/global-settings source
  without touching the UI. Do not hardcode contact data in components.
*/

export const contact = {
  phone: "+57 310 710 2651",
  phoneHref: "tel:+573107102651",
  email: "millanexperiences@gmail.com",
  whatsapp: "https://wa.me/573107102651",
  instagram: "https://www.instagram.com/millan.experiences/",
  facebook: "https://www.facebook.com/people/Millan-Experiences/pfbid0wdvdm5ZjBxc5ndju2qKW9PvkGpx1c9AwMdBNoLxyneVQrmVA75QX8CmrCfoW2JrGl/",
  linkedin: "https://www.linkedin.com/company/millan-experiences/",
  tiktok: "https://www.tiktok.com/@millanexperiences?_r=1&_t=ZS-94dBXwgCca4",
} as const

export type LocalizedString = { en: string; es: string }

export type NavChild = { label: LocalizedString; href: string }

export type NavItem = {
  label: LocalizedString
  href: string
  description?: LocalizedString
  image?: string
  imageAlt?: string
  children?: NavChild[]
  cta?: { label: LocalizedString; href: string }
}

export const navItems: NavItem[] = [
  { label: { en: "About", es: "Nosotros" }, href: "/about" },
  {
    label: { en: "Services", es: "Servicios" },
    href: "/services/concierge",
    description: {
      en: "A private concierge for Colombia — every reservation, transfer and detail, quietly handled.",
      es: "Un concierge privado para Colombia — cada reserva, traslado y detalle, manejado silenciosamente."
    },
    image: "/millan/concierge.png",
    imageAlt: "A private chef plating gourmet seafood aboard a luxury yacht.",
    children: [
      { label: { en: "Concierge", es: "Concierge" }, href: "/services/concierge" },
      { label: { en: "Private Tours", es: "Tours Privados" }, href: "/services/private-tours" },
      { label: { en: "Private Chef", es: "Chef Privado" }, href: "/services/private-chef" },
      { label: { en: "Private Aviation", es: "Aviación Privada" }, href: "/services/private-aviation" },
    ],
    cta: { label: { en: "Speak with our concierge", es: "Habla con nuestro concierge" }, href: "/contact" },
  },
  {
    label: { en: "Villas & Islands", es: "Villas e Islas" },
    href: "/luxury-villas",
    description: {
      en: "Hand-picked private villas and islands across the Colombian Caribbean.",
      es: "Villas e islas privadas seleccionadas a mano en el Caribe Colombiano."
    },
    image: "/millan/villa-island.png",
    imageAlt: "A private villa with an infinity pool over the turquoise Caribbean.",
    children: [
      { label: { en: "Private Villas", es: "Villas Privadas" }, href: "/luxury-villas" },
      { label: { en: "Private Islands", es: "Islas Privadas" }, href: "/private-islands" },
    ],
    cta: { label: { en: "Explore our villas", es: "Explorar nuestras villas" }, href: "/luxury-villas" },
  },
  {
    label: { en: "Boats & Yachts", es: "Yates y Lanchas" },
    href: "/speedboats",
    description: {
      en: "A curated fleet of speedboats, yachts and catamarans, crew included.",
      es: "Una flota cuidadosamente seleccionada de lanchas, yates y catamaranes, con tripulación incluida."
    },
    image: "/millan/boat-turquoise.jpg",
    imageAlt: "A luxury speedboat moored on clear turquoise Caribbean water.",
    children: [
      { label: { en: "Speedboats", es: "Lanchas" }, href: "/speedboats" },
      { label: { en: "Yachts & Catamarans", es: "Yates y Catamaranes" }, href: "/yachts-catamarans" },
    ],
    cta: { label: { en: "Discover our fleet", es: "Descubre nuestra flota" }, href: "/speedboats" },
  },
  {
    label: { en: "Groups & Events", es: "Grupos y Eventos" },
    href: "/bachelor-bachelorette-parties",
    description: {
      en: "Weddings, celebrations and corporate journeys — orchestrated end to end.",
      es: "Bodas, celebraciones y viajes corporativos — orquestados de principio a fin."
    },
    image: "/millan/events.png",
    imageAlt: "An elegant celebration table set on a Caribbean beach at sunset.",
    children: [
      { label: { en: "Bachelor & Bachelorette Parties", es: "Despedidas de Soltero(a)" }, href: "/bachelor-bachelorette-parties" },
      { label: { en: "Corporate Groups", es: "Grupos Corporativos" }, href: "/corporate-groups" },
      { label: { en: "Celebrations", es: "Celebraciones" }, href: "/birthdays-and-celebrations" },
      { label: { en: "Weddings", es: "Bodas" }, href: "/weddings" },
    ],
    cta: { label: { en: "Plan your event", es: "Planea tu evento" }, href: "/contact" },
  },
  { label: { en: "Contact", es: "Contacto" }, href: "/contact" },
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
    image: "/fotos/events-people.webp",
    imageAlt: "A private chef preparing a refined meal aboard a yacht.",
  },
  {
    number: "04",
    title: "Events & Celebrations",
    description:
      "Weddings, milestones and corporate gatherings, produced with precision and a distinctly Colombian warmth.",
    href: "/groups-and-events",
    cta: "Plan your event",
    image: "/fotos/concierge-ai.webp",
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

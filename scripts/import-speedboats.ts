import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'a94tk6u3'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_WRITE_TOKEN

if (!token) {
  console.error("❌ SANITY_API_WRITE_TOKEN no está definido.")
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  useCdn: false,
  apiVersion: '2024-01-01',
  token,
})

const cancellationPolicyEn = `If the Coast Guard deems marine conditions unsafe before departure, you will receive a 100% full refund or the option to reschedule.

If the boat becomes unavailable for any reason and a comparable vessel cannot be provided, a full refund will also be issued.

A 50% deposit is required to secure your reservation. This deposit is non-refundable.

If you cancel after making the reservation, you forfeit the deposit but will not be required to pay the remaining 50%.`

const cancellationPolicyEs = `Si la Capitanía de Puerto / Guardacostas determina que las condiciones marítimas son inseguras antes del zarpe, recibirá un reembolso del 100% o la opción de reprogramar.

Si la embarcación deja de estar disponible y no podemos proporcionar una de características similares, se emitirá un reembolso completo.

Se requiere un depósito del 50% para confirmar su reserva. Este depósito no es reembolsable.

Si cancela después de hacer la reserva, perderá el depósito pero no tendrá que pagar el 50% restante.`

const standardFaqs = [
  {
    _key: "faq1",
    questionEn: "Where can a private speedboat go from Cartagena?",
    questionEs: "¿A dónde puede ir una lancha privada desde Cartagena?",
    answerEn: "Popular routes include the Rosario Islands, Cholón party cove, Barú (Playa Blanca & quiet bays), exclusive beach clubs, and scenic Cartagena bay cruises.",
    answerEs: "Las rutas populares incluyen las Islas del Rosario, la ensenada de Cholón, Barú (Playa Blanca y bahías tranquilas), clubes de playa y recorridos por la bahía de Cartagena.",
  },
  {
    _key: "faq2",
    questionEn: "What is included with the speedboat charter?",
    questionEs: "¿Qué incluye el alquiler de la lancha deportiva?",
    answerEn: "All charters include an experienced licensed captain, sailor, fuel for the agreed itinerary, cooler with ice, and high-fidelity Bluetooth sound system.",
    answerEs: "Todos los alquileres incluyen capitán certificado, marinero, combustible para la ruta acordada, nevera con hielo y sistema de sonido Bluetooth.",
  },
  {
    _key: "faq3",
    questionEn: "Can food, drinks or a private chef be arranged for the boat day?",
    questionEs: "¿Se pueden coordinar comidas, bebidas o chef privado para el día en lancha?",
    answerEn: "Yes. Catering, drinks, restaurant stops, chef coordination and other add-ons can be planned before the day so the experience feels seamless.",
    answerEs: "Sí. El catering, bebidas, reservas en restaurantes de playa, chef a bordo y otros adicionales se planifican con anticipación para una experiencia perfecta.",
  },
  {
    _key: "faq4",
    questionEn: "What are the departure times and boarding location?",
    questionEs: "¿Cuáles son los horarios de salida y el punto de embarque?",
    answerEn: "Full-day charters depart between 8:30 AM and 9:00 AM and return around 4:30 PM - 5:00 PM. Boarding takes place at Cartagena's premier marinas (Manga or Pegasos dock).",
    answerEs: "Los recorridos de día completo zarpan entre 8:30 AM y 9:00 AM con regreso a las 4:30 PM - 5:00 PM. El embarque se realiza en los muelles principales de Cartagena (Manga o Muelle de los Pegasos).",
  }
]

const standardComplementary = [
  {
    _key: "exp1",
    titleEn: "Private Transportation & Marina Transfers",
    titleEs: "Transporte Privado al Muelle",
    descriptionEn: "Seamless roundtrip transportation from your hotel or villa directly to the marina dock.",
    descriptionEs: "Transporte privado puerta a puerta desde su hotel o villa directamente hasta el muelle de embarque.",
    href: "/contact",
    image: {
      _type: "image",
      asset: {
        _ref: "image-25d4712004dfa3a9b0745ad5ed2211c9b7c39741-800x534-jpg",
        _type: "reference"
      }
    }
  },
  {
    _key: "exp2",
    titleEn: "Concierge & Beach Club Reservations",
    titleEs: "Servicio de Concierge y Clubes de Playa",
    descriptionEn: "VIP reservations and day pass access at exclusive Rosario Islands and Barú beach clubs.",
    descriptionEs: "Reservas VIP y acceso exclusivo a los mejores beach clubs de las Islas del Rosario y Barú.",
    href: "/contact",
    image: {
      _type: "image",
      asset: {
        _ref: "image-a5f72d65878d195bcdc84e2e97c96191c2a53cba-800x533-jpg",
        _type: "reference"
      }
    }
  },
  {
    _key: "exp3",
    titleEn: "Private Chef & Onboard Catering",
    titleEs: "Chef Privado y Catering a Bordo",
    descriptionEn: "Elevate your nautical day with premium seafood, sushi, beverages, or champagne service on board.",
    descriptionEs: "Disfrute de mariscos frescos, sushi, bebidas o servicio de champaña a bordo de su lancha.",
    href: "/contact",
    image: {
      _type: "image",
      asset: {
        _ref: "image-df71b14c821fdf1bab5cb38d4e73d35919f4570e-800x533-jpg",
        _type: "reference"
      }
    }
  }
]

const speedboatsData = [
  {
    name: "Cohiba",
    slug: "cohiba",
    dimensions: "32 feet",
    capacity: 14,
    bathrooms: 1,
    amenities: [
      "Crew",
      "Gasoline",
      "Ice",
      "Bluetooth"
    ],
    images: [
      { url: "https://www.millan-experiences.com/web/image/1735-5ea7a5d4/WhatsApp%2520Image%25202026-04-16%2520at%252010.svg", original_url: "https://www.millan-experiences.com/web/image/1657-5c30ac0a/WhatsApp%20Image%202026-04-16%20at%2010.39.42%20PM.jpeg" },
      { url: "https://www.millan-experiences.com/web/image/1655-2c093423/WhatsApp%20Image%202025-11-25%20at%2011.29.49%20AM%20%282%29.webp", original_url: "https://www.millan-experiences.com/web/image/1653-532a45d1/WhatsApp%20Image%202025-11-25%20at%2011.29.49%20AM%20%282%29.jpeg" },
      { url: "https://www.millan-experiences.com/web/image/1662-d5763269/WhatsApp%20Image%202025-11-25%20at%2011.29.50%20AM%20%286%29.webp", original_url: "https://www.millan-experiences.com/web/image/1661-82d5ee4e/WhatsApp%20Image%202025-11-25%20at%2011.29.50%20AM%20%286%29.jpeg" },
      { url: "https://www.millan-experiences.com/web/image/1659-099e1b2f/WhatsApp%20Image%202025-11-25%20at%2011.29.49%20AM.webp", original_url: "https://www.millan-experiences.com/web/image/1658-13363291/WhatsApp%20Image%202025-11-25%20at%2011.29.49%20AM.jpeg" }
    ]
  },
  {
    name: "Galea",
    slug: "galea",
    dimensions: "38 feet",
    capacity: 12,
    bathrooms: 1,
    amenities: [
      "Crew",
      "Gasoline",
      "Ice",
      "Cups",
      "Towels",
      "Snorkels",
      "Bluetooth"
    ],
    images: [
      { url: "https://www.millan-experiences.com/web/image/1973-8098af27/Screenshot%202026-04-26%20at%203.43.36%E2%80%AFPM.webp", original_url: "https://www.millan-experiences.com/web/image/1962-29f2acdb/Screenshot%202026-04-26%20at%203.43.36%E2%80%AFPM.png" },
      { url: "https://www.millan-experiences.com/web/image/1992-203fab39/WhatsApp%20Image%202026-04-26%20at%203.46.14%20PM%20%281%29.jpeg", original_url: "https://www.millan-experiences.com/web/image/1966-b7cda95c/WhatsApp%20Image%202026-04-26%20at%203.46.14%20PM%20%281%29.jpeg" },
      { url: "https://www.millan-experiences.com/web/image/1975-a3659da4/WhatsApp%20Image%202026-04-26%20at%203.46.13%20PM%20%283%29.webp", original_url: "https://www.millan-experiences.com/web/image/1967-9ef05e7e/WhatsApp%20Image%202026-04-26%20at%203.46.13%20PM%20%283%29.jpeg" },
      { url: "https://www.millan-experiences.com/web/image/1976-7740bcc4/WhatsApp%20Image%202026-04-26%20at%203.46.14%20PM%20%282%29.webp", original_url: "https://www.millan-experiences.com/web/image/1971-74e57c36/WhatsApp%20Image%202026-04-26%20at%203.46.14%20PM%20%282%29.jpeg" }
    ]
  },
  {
    name: "Azahar",
    slug: "azahar",
    dimensions: "38 feet",
    capacity: 16,
    bathrooms: 1,
    amenities: [
      "Crew",
      "Gasoline",
      "Snorkels",
      "Ice",
      "Bluetooth"
    ],
    images: [
      { url: "https://www.millan-experiences.com/web/image/1949-bb9b0cc5/Azahar.webp", original_url: "https://www.millan-experiences.com/web/image/1945-fd0416d8/Azahar.jpeg" },
      { url: "https://www.millan-experiences.com/web/image/1952-0ded3709/Azahar2.webp", original_url: "https://www.millan-experiences.com/web/image/1946-cad84f7c/Azahar2.jpeg" },
      { url: "https://www.millan-experiences.com/web/image/1950-07dc27ed/Azahar6.webp", original_url: "https://www.millan-experiences.com/web/image/1947-61e370d4/Azahar6.jpeg" },
      { url: "https://www.millan-experiences.com/web/image/1951-72fce2c7/Azahar8.webp", original_url: "https://www.millan-experiences.com/web/image/1948-45176ff0/Azahar8.jpeg" }
    ]
  },
  {
    name: "Blue Horizon",
    slug: "blue-horizon",
    dimensions: "38 feet",
    capacity: 15,
    bathrooms: 1,
    amenities: [
      "Crew",
      "Gasoline",
      "Ice",
      "Bluetooth"
    ],
    images: [
      { url: "https://www.millan-experiences.com/web/image/2002-aa737b00/blueh.webp", original_url: "https://www.millan-experiences.com/web/image/1993-42aa9081/blueh.jpeg" },
      { url: "https://www.millan-experiences.com/web/image/1999-f7a4b2d8/blueeh.webp", original_url: "https://www.millan-experiences.com/web/image/1996-93c4666e/blueeh.jpeg" },
      { url: "https://www.millan-experiences.com/web/image/2000-f8b4cb5b/bluehh.webp", original_url: "https://www.millan-experiences.com/web/image/1995-a5325ec3/bluehh.jpeg" },
      { url: "https://www.millan-experiences.com/web/image/2001-b29c0b1f/bluehhh.webp", original_url: "https://www.millan-experiences.com/web/image/1994-e06231b1/bluehhh.jpeg" },
      { url: "https://www.millan-experiences.com/web/image/1998-2951a39f/bluehhhh.webp", original_url: "https://www.millan-experiences.com/web/image/1997-b31f73ed/bluehhhh.jpeg" }
    ]
  },
  {
    name: "Angel",
    slug: "angel",
    dimensions: "41 feet",
    capacity: 18,
    bathrooms: 1,
    amenities: [
      "Crew",
      "Gasoline",
      "Ice",
      "Bluetooth"
    ],
    images: [
      { url: "https://www.millan-experiences.com/web/image/1991-018594dd/Copy%20of%20WhatsApp%20Image%202024-08-30%20at%2011.08.07%20AM%20%282%29.webp", original_url: "https://www.millan-experiences.com/web/image/1978-762b82cc/Copy%20of%20WhatsApp%20Image%202024-08-30%20at%2011.08.07%20AM%20%282%29.jpeg" },
      { url: "https://www.millan-experiences.com/web/image/1986-4ea7bf41/Copy%20of%20WhatsApp%20Image%202024-08-30%20at%2011.08.06%20AM%20%282%29.webp", original_url: "https://www.millan-experiences.com/web/image/1983-1dfbe0e1/Copy%20of%20WhatsApp%20Image%202024-08-30%20at%2011.08.06%20AM%20%282%29.jpeg" },
      { url: "https://www.millan-experiences.com/web/image/1985-1f6249fa/Gemini_Generated_Image_jq79fijq79fijq79.webp", original_url: "https://www.millan-experiences.com/web/image/1982-eae3656d/Gemini_Generated_Image_jq79fijq79fijq79.png" },
      { url: "https://www.millan-experiences.com/web/image/1990-8777bbc7/Gemini_Generated_Image_l4kqlpl4kqlpl4kq.webp", original_url: "https://www.millan-experiences.com/web/image/1989-6d75ca01/Gemini_Generated_Image_l4kqlpl4kqlpl4kq.png" }
    ]
  },
  {
    name: "Serenity",
    slug: "serenity",
    dimensions: "37 feet",
    capacity: 10,
    bathrooms: 1,
    rooms: 1,
    amenities: [
      "Crew",
      "Gasoline",
      "Snorkels",
      "Ice",
      "Bluetooth"
    ],
    images: [
      { url: "https://www.millan-experiences.com/web/image/2198-c519791c/ChatGPT%20Image%2027%20abr%202026%2C%2005_21_48%20p.m..webp", original_url: "https://www.millan-experiences.com/web/image/2192-34e3ddf7/ChatGPT%20Image%2027%20abr%202026%2C%2005_21_48%20p.m..png" },
      { url: "https://www.millan-experiences.com/web/image/2195-5360a7a3/ChatGPT%20Image%2027%20abr%202026%2C%2005_07_09%20p.m..webp", original_url: "https://www.millan-experiences.com/web/image/2185-ddae8dfe/ChatGPT%20Image%2027%20abr%202026%2C%2005_07_09%20p.m..png" },
      { url: "https://www.millan-experiences.com/web/image/2197-986b6a6c/WhatsApp%20Image%202025-02-25%20at%2017.00.05.webp", original_url: "https://www.millan-experiences.com/web/image/2187-74d00deb/WhatsApp%20Image%202025-02-25%20at%2017.00.05.jpeg" },
      { url: "https://www.millan-experiences.com/web/image/2194-1445b233/ChatGPT%20Image%2027%20abr%202026%2C%2005_17_46%20p.m..webp", original_url: "https://www.millan-experiences.com/web/image/2189-e737f611/ChatGPT%20Image%2027%20abr%202026%2C%2005_17_46%20p.m..png" },
      { url: "https://www.millan-experiences.com/web/image/2196-599717d3/WhatsApp%20Image%202025-02-25%20at%2017.00.19.webp", original_url: "https://www.millan-experiences.com/web/image/2193-0a27848d/WhatsApp%20Image%202025-02-25%20at%2017.00.19.jpeg" }
    ]
  },
  {
    name: "Vicky",
    slug: "vicky",
    dimensions: "42 feet",
    capacity: 28,
    bathrooms: 1,
    amenities: [
      "Crew",
      "Gasoline",
      "Ice",
      "Bluetooth"
    ],
    images: [
      { url: "https://www.millan-experiences.com/web/image/2213-eab71463/WhatsApp%20Image%202023-05-04%20at%204.41.42%20PM.webp", original_url: "https://www.millan-experiences.com/web/image/2208-eeccc77d/WhatsApp%20Image%202023-05-04%20at%204.41.42%20PM.jpeg" },
      { url: "https://www.millan-experiences.com/web/image/2212-564b9a27/WhatsApp%20Image%202023-05-04%20at%204.41.40%20PM.webp", original_url: "https://www.millan-experiences.com/web/image/2209-c0d26e13/WhatsApp%20Image%202023-05-04%20at%204.41.40%20PM.jpeg" },
      { url: "https://www.millan-experiences.com/web/image/2215-bb4c4fad/WhatsApp%20Image%202023-05-04%20at%204.41.43%20PM.webp", original_url: "https://www.millan-experiences.com/web/image/2210-6ca4db7e/WhatsApp%20Image%202023-05-04%20at%204.41.43%20PM.jpeg" },
      { url: "https://www.millan-experiences.com/web/image/2214-039fa343/WhatsApp%20Image%202023-05-04%20at%204.41.41%20PM%20%283%29.webp", original_url: "https://www.millan-experiences.com/web/image/2211-e84af661/WhatsApp%20Image%202023-05-04%20at%204.41.41%20PM%20%283%29.jpeg" }
    ]
  },
  {
    name: "Iconique",
    slug: "iconique",
    dimensions: "42 feet",
    capacity: 18,
    bathrooms: 1,
    amenities: [
      "Crew",
      "Gasoline",
      "Ice",
      "Bluetooth"
    ],
    images: [
      { url: "https://www.millan-experiences.com/web/image/2231-f283db28/IMG-20240220-WA0062.webp", original_url: "https://www.millan-experiences.com/web/image/2224-76246be0/IMG-20240220-WA0062.jpg" },
      { url: "https://www.millan-experiences.com/web/image/2232-5b0ed721/IMG-20240220-WA0067.webp", original_url: "https://www.millan-experiences.com/web/image/2225-74ac26d5/IMG-20240220-WA0067.jpg" },
      { url: "https://www.millan-experiences.com/web/image/2235-dcbf206f/ChatGPT%20Image%2027%20abr%202026%2C%2005_57_20%20p.m..webp", original_url: "https://www.millan-experiences.com/web/image/2230-0a20faf4/ChatGPT%20Image%2027%20abr%202026%2C%2005_57_20%20p.m..png" },
      { url: "https://www.millan-experiences.com/web/image/2233-3d77f2dd/IMG-20240220-WA0075.webp", original_url: "https://www.millan-experiences.com/web/image/2227-c826f48d/IMG-20240220-WA0075.jpg" },
      { url: "https://www.millan-experiences.com/web/image/2234-a5781d53/IMG-20240220-WA0074.webp", original_url: "https://www.millan-experiences.com/web/image/2229-5b50a4d8/IMG-20240220-WA0074.jpg" }
    ]
  },
  {
    name: "Fantastika",
    slug: "fantastika",
    dimensions: "45 feet",
    capacity: 22,
    bathrooms: 1,
    amenities: [
      "Crew",
      "Gasoline",
      "Ice",
      "Bluetooth"
    ],
    images: [
      { url: "https://www.millan-experiences.com/web/image/2240-904017a8/ChatGPT%20Image%2027%20abr%202026%2C%2006_03_59%20p.m..webp", original_url: "https://www.millan-experiences.com/web/image/2239-c5b8392c/ChatGPT%20Image%2027%20abr%202026%2C%2006_03_59%20p.m..png" },
      { url: "https://www.millan-experiences.com/web/image/2244-c6bfc82b/WhatsApp%20Image%202026-02-02%20at%207.38.45%20PM%20%282%29.webp", original_url: "https://www.millan-experiences.com/web/image/2241-7cae7187/WhatsApp%20Image%202026-02-02%20at%207.38.45%20PM%20%282%29.jpeg" },
      { url: "https://www.millan-experiences.com/web/image/2246-3ea6ef4b/WhatsApp%20Image%202026-02-02%20at%207.38.46%20PM%20%282%29.webp", original_url: "https://www.millan-experiences.com/web/image/2242-07da1df0/WhatsApp%20Image%202026-02-02%20at%207.38.46%20PM%20%282%29.jpeg" },
      { url: "https://www.millan-experiences.com/web/image/2245-cdac1132/WhatsApp%20Image%202026-02-02%20at%207.38.49%20PM%20%281%29.webp", original_url: "https://www.millan-experiences.com/web/image/2243-646a1f8a/WhatsApp%20Image%202026-02-02%20at%207.38.49%20PM%20%281%29.jpeg" }
    ]
  },
  {
    name: "Catalunya",
    slug: "catalunya",
    dimensions: "32 feet",
    capacity: 14,
    bathrooms: 1,
    amenities: [
      "Crew",
      "Gasoline",
      "Ice",
      "Bluetooth"
    ],
    images: [
      { url: "https://www.millan-experiences.com/web/image/3612-62f2ea7e/ChatGPT%20Image%2023%20jul%202026%2C%2001_45_08%20p.m.%20%287%29.webp", original_url: "https://www.millan-experiences.com/web/image/3602-ce92c531/ChatGPT%20Image%2023%20jul%202026%2C%2001_45_08%20p.m.%20%287%29.png" },
      { url: "https://www.millan-experiences.com/web/image/3613-c8d7c7cc/ChatGPT%20Image%2023%20jul%202026%2C%2001_45_08%20p.m.%20%285%29.webp", original_url: "https://www.millan-experiences.com/web/image/3603-6bc98237/ChatGPT%20Image%2023%20jul%202026%2C%2001_45_08%20p.m.%20%285%29.png" },
      { url: "https://www.millan-experiences.com/web/image/3619-978238d8/ChatGPT%20Image%2023%20jul%202026%2C%2001_45_08%20p.m.%20%288%29.webp", original_url: "https://www.millan-experiences.com/web/image/3604-eadc8a31/ChatGPT%20Image%2023%20jul%202026%2C%2001_45_08%20p.m.%20%288%29.png" },
      { url: "https://www.millan-experiences.com/web/image/3614-50e43919/ChatGPT%20Image%2023%20jul%202026%2C%2001_45_08%20p.m.%20%284%29.webp", original_url: "https://www.millan-experiences.com/web/image/3605-4ed62628/ChatGPT%20Image%2023%20jul%202026%2C%2001_45_08%20p.m.%20%284%29.png" },
      { url: "https://www.millan-experiences.com/web/image/3616-12926e62/ChatGPT%20Image%2023%20jul%202026%2C%2001_45_09%20p.m.%20%2810%29.webp", original_url: "https://www.millan-experiences.com/web/image/3599-1837d235/ChatGPT%20Image%2023%20jul%202026%2C%2001_45_09%20p.m.%20%2810%29.png" },
      { url: "https://www.millan-experiences.com/web/image/3615-055391a2/ChatGPT%20Image%2023%20jul%202026%2C%2001_45_09%20p.m.%20%289%29.webp", original_url: "https://www.millan-experiences.com/web/image/3606-f6b80a98/ChatGPT%20Image%2023%20jul%202026%2C%2001_45_09%20p.m.%20%289%29.png" },
      { url: "https://www.millan-experiences.com/web/image/3620-a53aedc8/ChatGPT%20Image%2023%20jul%202026%2C%2001_40_24%20p.m.%20%281%29.webp", original_url: "https://www.millan-experiences.com/web/image/3607-54ca07fe/ChatGPT%20Image%2023%20jul%202026%2C%2001_40_24%20p.m.%20%281%29.png" },
      { url: "https://www.millan-experiences.com/web/image/3617-1d109c38/ChatGPT%20Image%2023%20jul%202026%2C%2001_45_08%20p.m.%20%286%29.webp", original_url: "https://www.millan-experiences.com/web/image/3609-e362639c/ChatGPT%20Image%2023%20jul%202026%2C%2001_45_08%20p.m.%20%286%29.png" },
      { url: "https://www.millan-experiences.com/web/image/3618-0cb2548c/ChatGPT%20Image%2023%20jul%202026%2C%2001_45_08%20p.m.%20%282%29.webp", original_url: "https://www.millan-experiences.com/web/image/3611-cf03ff25/ChatGPT%20Image%2023%20jul%202026%2C%2001_45_08%20p.m.%20%282%29.png" }
    ]
  },
  {
    "name": "Marianas IV",
    "slug": "marianas-iv",
    dimensions: "42 feet",
    capacity: 28,
    bathrooms: 1,
    amenities: [
      "Crew",
      "Gasoline",
      "Ice",
      "Bluetooth"
    ],
    images: [
      { url: "https://www.millan-experiences.com/web/image/3634-58a5f6b5/WhatsApp%20Image%202025-11-27%20at%201.41.43%20PM.webp", original_url: "https://www.millan-experiences.com/web/image/3624-a6ce842e/WhatsApp%20Image%202025-11-27%20at%201.41.43%20PM.jpeg" },
      { url: "https://www.millan-experiences.com/web/image/3635-f6543817/WhatsApp%20Image%202025-11-27%20at%201.41.41%20PM%20%281%29.webp", original_url: "https://www.millan-experiences.com/web/image/3625-ae207656/WhatsApp%20Image%202025-11-27%20at%201.41.41%20PM%20%281%29.jpeg" },
      { url: "https://www.millan-experiences.com/web/image/3636-db915820/WhatsApp%20Image%202025-11-27%20at%201.41.39%20PM.webp", original_url: "https://www.millan-experiences.com/web/image/3626-dfdfeeef/WhatsApp%20Image%202025-11-27%20at%201.41.39%20PM.jpeg" },
      { url: "https://www.millan-experiences.com/web/image/3633-4c3943b5/WhatsApp%20Image%202025-11-27%20at%201.41.42%20PM.webp", original_url: "https://www.millan-experiences.com/web/image/3627-bb0b0ede/WhatsApp%20Image%202025-11-27%20at%201.41.42%20PM.jpeg" },
      { url: "https://www.millan-experiences.com/web/image/3632-627392ae/WhatsApp%20Image%202025-11-27%20at%201.41.41%20PM.webp", original_url: "https://www.millan-experiences.com/web/image/3628-707f9614/WhatsApp%20Image%202025-11-27%20at%201.41.41%20PM.jpeg" },
      { url: "https://www.millan-experiences.com/web/image/3639-78a3db5e/WhatsApp%20Image%202025-11-27%20at%201.41.40%20PM%20%281%29.webp", original_url: "https://www.millan-experiences.com/web/image/3629-b2d38f3f/WhatsApp%20Image%202025-11-27%20at%201.41.40%20PM%20%281%29.jpeg" },
      { url: "https://www.millan-experiences.com/web/image/3638-5e96394c/WhatsApp%20Image%202025-11-27%20at%201.41.40%20PM.webp", original_url: "https://www.millan-experiences.com/web/image/3630-e56fafab/WhatsApp%20Image%202025-11-27%20at%201.41.40%20PM.jpeg" },
      { url: "https://www.millan-experiences.com/web/image/3640-c29fdb0b/WhatsApp%20Image%202025-11-27%20at%201.41.44%20PM%20%281%29.webp", original_url: "https://www.millan-experiences.com/web/image/3631-af189a8d/WhatsApp%20Image%202025-11-27%20at%201.41.44%20PM%20%281%29.jpeg" },
      { url: "https://www.millan-experiences.com/web/image/3637-25b7d882/WhatsApp%20Image%202025-11-27%20at%201.41.46%20PM.webp", original_url: "https://www.millan-experiences.com/web/image/3621-683afe11/WhatsApp%20Image%202025-11-27%20at%201.41.46%20PM.jpeg" },
      { url: "https://www.millan-experiences.com/web/image/3641-32a3ed8e/WhatsApp%20Image%202025-11-27%20at%201.41.44%20PM.webp", original_url: "https://www.millan-experiences.com/web/image/3622-13903392/WhatsApp%20Image%202025-11-27%20at%201.41.44%20PM.jpeg" }
    ]
  },
  {
    "name": "Don Bruno",
    "slug": "don-bruno",
    dimensions: "42 feet",
    capacity: 20,
    bathrooms: 1,
    amenities: [
      "Crew",
      "Gasoline",
      "Ice",
      "Bluetooth"
    ],
    images: [
      { url: "https://www.millan-experiences.com/web/image/3662-bf55e598/WhatsApp%20Image%202025-01-22%20at%201.24.07%20PM%20%281%29.webp", original_url: "https://www.millan-experiences.com/web/image/3650-5b7435fc/WhatsApp%20Image%202025-01-22%20at%201.24.07%20PM%20%281%29.jpeg" },
      { url: "https://www.millan-experiences.com/web/image/3664-d92093f7/WhatsApp%20Image%202025-01-22%20at%201.24.01%20PM.webp", original_url: "https://www.millan-experiences.com/web/image/3651-72abfb1f/WhatsApp%20Image%202025-01-22%20at%201.24.01%20PM.jpeg" },
      { url: "https://www.millan-experiences.com/web/image/3663-ec1d82cd/WhatsApp%20Image%202025-01-22%20at%201.24.03%20PM.webp", original_url: "https://www.millan-experiences.com/web/image/3652-8c3197a8/WhatsApp%20Image%202025-01-22%20at%201.24.03%20PM.jpeg" },
      { url: "https://www.millan-experiences.com/web/image/3665-eea0f2c5/WhatsApp%20Image%202025-01-22%20at%201.24.01%20PM%20%281%29.webp", original_url: "https://www.millan-experiences.com/web/image/3654-4fc66aa9/WhatsApp%20Image%202025-01-22%20at%201.24.01%20PM%20%281%29.jpeg" },
      { url: "https://www.millan-experiences.com/web/image/3666-c3edf4e9/WhatsApp%20Image%202025-01-22%20at%201.24.06%20PM.webp", original_url: "https://www.millan-experiences.com/web/image/3655-7e4388df/WhatsApp%20Image%202025-01-22%20at%201.24.06%20PM.jpeg" },
      { url: "https://www.millan-experiences.com/web/image/3667-e6e9ec25/WhatsApp%20Image%202025-01-22%20at%201.24.05%20PM.webp", original_url: "https://www.millan-experiences.com/web/image/3656-2d605e23/WhatsApp%20Image%202025-01-22%20at%201.24.05%20PM.jpeg" },
      { url: "https://www.millan-experiences.com/web/image/3668-d88872fa/WhatsApp%20Image%202025-01-22%20at%201.23.58%20PM.webp", original_url: "https://www.millan-experiences.com/web/image/3657-92fcd655/WhatsApp%20Image%202025-01-22%20at%201.23.58%20PM.jpeg" },
      { url: "https://www.millan-experiences.com/web/image/3669-8130314c/WhatsApp%20Image%202025-01-22%20at%201.24.00%20PM.webp", original_url: "https://www.millan-experiences.com/web/image/3658-72bfa9be/WhatsApp%20Image%202025-01-22%20at%201.24.00%20PM.jpeg" },
      { url: "https://www.millan-experiences.com/web/image/3670-8222c2f1/WhatsApp%20Image%202025-01-22%20at%201.24.07%20PM.webp", original_url: "https://www.millan-experiences.com/web/image/3659-60a0e4a8/WhatsApp%20Image%202025-01-22%20at%201.24.07%20PM.jpeg" },
      { url: "https://www.millan-experiences.com/web/image/3671-996327e4/WhatsApp%20Image%202025-01-22%20at%201.23.57%20PM.webp", original_url: "https://www.millan-experiences.com/web/image/3660-c1c60645/WhatsApp%20Image%202025-01-22%20at%201.23.57%20PM.jpeg" },
      { url: "https://www.millan-experiences.com/web/image/3672-170a46c0/WhatsApp%20Image%202025-01-22%20at%201.23.59%20PM.webp", original_url: "https://www.millan-experiences.com/web/image/3649-3b9660ad/WhatsApp%20Image%202025-01-22%20at%201.23.59%20PM.jpeg" }
    ]
  }
]

async function downloadAndUploadImage(url: string, originalUrl?: string, filename?: string) {
  const urlsToTry = [url]
  if (originalUrl) urlsToTry.push(originalUrl)

  for (const currentUrl of urlsToTry) {
    try {
      const res = await fetch(currentUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
      })
      if (!res.ok) continue

      const arrayBuffer = await res.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)
      const cleanName = filename || currentUrl.split('/').pop() || 'speedboat-image.jpg'
      const contentType = res.headers.get('content-type') || (cleanName.endsWith('.png') ? 'image/png' : 'image/jpeg')

      const asset = await client.assets.upload('image', buffer, {
        filename: cleanName,
        contentType: contentType.includes('image') ? contentType : 'image/jpeg'
      })

      return asset
    } catch (e) {
      console.warn(`Error al descargar de ${currentUrl}:`, (e as any).message)
    }
  }

  return null
}

async function run() {
  console.log(`🚤 Iniciando carga de ${speedboatsData.length} lanchas deportivas en Sanity...`)

  for (const boat of speedboatsData) {
    console.log(`\n========================================`)
    console.log(`🛥️ Procesando ${boat.name} (${boat.slug})...`)
    console.log(`   Descargando y subiendo ${boat.images.length} imágenes...`)

    const uploadedAssets: any[] = []
    for (let i = 0; i < boat.images.length; i++) {
      const img = boat.images[i]
      const asset = await downloadAndUploadImage(img.url, img.original_url, `${boat.slug}-${i + 1}.jpg`)
      if (asset) {
        uploadedAssets.push(asset)
        process.stdout.write(`   [${i + 1}/${boat.images.length}] ✓ `)
      } else {
        process.stdout.write(`   [${i + 1}/${boat.images.length}] ✗ `)
      }
    }
    console.log(`\n   Subidas exitosamente: ${uploadedAssets.length}/${boat.images.length}`)

    if (uploadedAssets.length === 0) {
      console.error(`❌ No se pudieron cargar imágenes para ${boat.name}`)
      continue
    }

    const mainImageAsset = uploadedAssets[0]
    const galleryAssets = uploadedAssets.slice(1)

    // Buscar si ya existe el documento
    const existing = await client.fetch('*[_type == "speedboats" && slug.current == $slug][0]', { slug: boat.slug })

    const docData: any = {
      _type: 'speedboats',
      title: boat.name,
      slug: {
        _type: 'slug',
        current: boat.slug
      },
      details: {
        dimensions: boat.dimensions,
        capacity: boat.capacity,
        bathrooms: boat.bathrooms,
        ...(boat.rooms ? { rooms: boat.rooms } : {})
      },
      amenities: boat.amenities,
      cancellationPolicyEn,
      cancellationPolicyEs,
      faqs: standardFaqs,
      complementaryExperiences: standardComplementary,
      mainImage: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: mainImageAsset._id
        }
      },
      gallery: galleryAssets.map(asset => ({
        _key: asset._id,
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: asset._id
        }
      }))
    }

    if (existing) {
      console.log(`   Actualizando documento existente ${existing._id}...`)
      await client
        .patch(existing._id)
        .set(docData)
        .commit()
      console.log(`   ✅ ${boat.name} actualizado.`)
    } else {
      console.log(`   Creando nuevo documento en Sanity...`)
      const created = await client.create(docData)
      console.log(`   ✅ ${boat.name} creado con ID: ${created._id}`)
    }
  }

  console.log(`\n🎉 ¡Todas las lanchas deportivas han sido subidas y sincronizadas con éxito en Sanity!`)
}

run()

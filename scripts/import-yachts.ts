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

If the yacht becomes unavailable for any reason and a comparable vessel cannot be provided, a full refund will also be issued.

A 50% deposit is required to secure your charter reservation. This deposit is non-refundable.

If you cancel after making the reservation, you forfeit the deposit but will not be required to pay the remaining 50%.`

const cancellationPolicyEs = `Si la Capitanía de Puerto / Guardacostas determina que las condiciones marítimas son inseguras antes del zarpe, recibirá un reembolso del 100% o la opción de reprogramar.

Si la embarcación deja de estar disponible y no podemos proporcionar una de características similares, se emitirá un reembolso completo.

Se requiere un depósito del 50% para confirmar su reserva. Este depósito no es reembolsable.

Si cancela después de hacer la reserva, perderá el depósito pero no tendrá que pagar el 50% restante.`

const standardFaqs = [
  {
    _key: "faq1",
    questionEn: "What destinations can we visit during our charter?",
    questionEs: "¿Qué destinos podemos visitar durante el recorrido?",
    answerEn: "Our private yacht charters typically explore the stunning Rosario Islands, Cholón party bay, Playa Blanca (Barú), and scenic sunset bay cruises around Cartagena.",
    answerEs: "Nuestros alquileres de yates privados suelen recorrer las Islas del Rosario, la ensenada de Cholón, Playa Blanca (Barú) y paseos al atardecer por la bahía de Cartagena.",
  },
  {
    _key: "faq2",
    questionEn: "What is included in the yacht charter?",
    questionEs: "¿Qué incluye el alquiler del yate?",
    answerEn: "All charters include an experienced licensed captain, professional crew/sailor, fuel for the agreed route, cooler with ice, and high-fidelity Bluetooth sound system.",
    answerEs: "Todos los alquileres incluyen capitán certificado, tripulación profesional, combustible para la ruta acordada, nevera con hielo y sistema de sonido Bluetooth.",
  },
  {
    _key: "faq3",
    questionEn: "Can we bring our own food and beverages?",
    questionEs: "¿Podemos llevar nuestra propia comida y bebidas?",
    answerEn: "Yes, you are welcome to bring your favorite drinks, snacks, and catering onboard. We can also coordinate on-board private chefs, catering packages, or reservations at exclusive island beach clubs.",
    answerEs: "Sí, puede traer sus bebidas, aperitivos y alimentos favoritos. También podemos coordinar servicio de chef a bordo, catering o reservas en los mejores clubes de playa de las islas.",
  },
  {
    _key: "faq4",
    questionEn: "What are the departure times and boarding location?",
    questionEs: "¿Cuáles son los horarios de salida y el punto de embarque?",
    answerEn: "Full-day charters typically depart between 8:30 AM and 9:00 AM and return around 4:30 PM - 5:00 PM. Sunset tours depart around 5:00 PM. Boarding takes place at Cartagena's premier marinas (Manga or Pegasos dock).",
    answerEs: "Los recorridos de día completo suelen zarpar entre 8:30 AM y 9:00 AM con regreso a las 4:30 PM - 5:00 PM. Los tours de atardecer zarpan hacia las 5:00 PM. El embarque se realiza en los muelles principales de Cartagena (Manga o Muelle de los Pegasos).",
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
    descriptionEn: "Elevate your nautical day with premium seafood, barbecue, sushi, or champagne service on board.",
    descriptionEs: "Disfrute de mariscos frescos, sushi, parrillada o servicio de champaña a bordo de su yate.",
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

const yachtsData = [
  {
    name: "Alisio",
    slug: "alisio",
    dimensions: "45 feet",
    capacity: 40,
    bathrooms: 2,
    rooms: 1,
    amenities: [
      "Crew",
      "Gasoline",
      "Ice",
      "Bluetooth"
    ],
    images: [
      { url: "https://www.millan-experiences.com/web/image/2012-56550b18/ALISIO1.jpg%20%281%29.webp", original_url: "https://www.millan-experiences.com/web/image/1790-a22f2075/ALISIO1.jpg%20%281%29.jpeg" },
      { url: "https://www.millan-experiences.com/web/image/2075-3425e42a/ChatGPT%20Image%2027%20abr%202026%2C%2002_33_54%20p.m..webp", original_url: "https://www.millan-experiences.com/web/image/2074-c8129093/ChatGPT%20Image%2027%20abr%202026%2C%2002_33_54%20p.m..png" },
      { url: "https://www.millan-experiences.com/web/image/2076-c81ec96e/ALISIO%205.webp", original_url: "https://www.millan-experiences.com/web/image/2071-88f0cf05/ALISIO%205.png" },
      { url: "https://www.millan-experiences.com/web/image/2077-b9412cbb/ALISIO%20%286%29.webp", original_url: "https://www.millan-experiences.com/web/image/2073-d0ef71cb/ALISIO%20%286%29.jpg" }
    ]
  },
  {
    name: "Ferretti",
    slug: "ferretti",
    dimensions: "96 feet",
    capacity: 16,
    bathrooms: 5,
    rooms: 4,
    amenities: [
      "Crew",
      "Gasoline",
      "Ice",
      "Bluetooth",
      "Air conditioning"
    ],
    images: [
      { url: "https://www.millan-experiences.com/web/image/2088-504c5cbd/lotano4.webp", original_url: "https://www.millan-experiences.com/web/image/2083-f3332514/lotano4.jpeg" },
      { url: "https://www.millan-experiences.com/web/image/2091-3f253dc0/ChatGPT%20Image%2027%20abr%202026%2C%2002_48_11%20p.m..webp", original_url: "https://www.millan-experiences.com/web/image/2085-e133b016/ChatGPT%20Image%2027%20abr%202026%2C%2002_48_11%20p.m..png" },
      { url: "https://www.millan-experiences.com/web/image/2090-38f40249/lotano1.webp", original_url: "https://www.millan-experiences.com/web/image/2080-66aaf1f6/lotano1.jpeg" },
      { url: "https://www.millan-experiences.com/web/image/2089-40fa1922/lotano11.webp", original_url: "https://www.millan-experiences.com/web/image/2082-58e87a07/lotano11.jpeg" },
      { url: "https://www.millan-experiences.com/web/image/2092-734836d8/lotano6.webp", original_url: "https://www.millan-experiences.com/web/image/2013-6cd09d3d/lotano6.jpeg" },
      { url: "https://www.millan-experiences.com/web/image/2093-35ad6463/lotano5.webp", original_url: "https://www.millan-experiences.com/web/image/2087-abd44005/lotano5.jpeg" }
    ]
  },
  {
    name: "Cuna",
    slug: "cuna",
    dimensions: "60 feet",
    capacity: 15,
    bathrooms: 1,
    rooms: 1,
    amenities: [
      "Crew",
      "Gasoline",
      "Ice",
      "Bluetooth"
    ],
    images: [
      { url: "https://www.millan-experiences.com/web/image/2056-54c8c82b/ChatGPT%20Image%2027%20abr%202026%2C%2012_48_34%20p.m..webp", original_url: "https://www.millan-experiences.com/web/image/2055-11298973/ChatGPT%20Image%2027%20abr%202026%2C%2012_48_34%20p.m..png" },
      { url: "https://www.millan-experiences.com/web/image/2051-c1839009/ChatGPT%20Image%2027%20abr%202026%2C%2012_28_55%20p.m..webp", original_url: "https://www.millan-experiences.com/web/image/2048-54c0c74f/ChatGPT%20Image%2027%20abr%202026%2C%2012_28_55%20p.m..png" },
      { url: "https://www.millan-experiences.com/web/image/2052-abd62bd0/ChatGPT%20Image%2027%20abr%202026%2C%2012_34_19%20p.m..webp", original_url: "https://www.millan-experiences.com/web/image/2049-8610ada6/ChatGPT%20Image%2027%20abr%202026%2C%2012_34_19%20p.m..png" },
      { url: "https://www.millan-experiences.com/web/image/2054-f61c9772/ChatGPT%20Image%2027%20abr%202026%2C%2012_40_46%20p.m..webp", original_url: "https://www.millan-experiences.com/web/image/2050-ba1afbf4/ChatGPT%20Image%2027%20abr%202026%2C%2012_40_46%20p.m..png" }
    ]
  },
  {
    name: "Valhalla",
    slug: "valhalla",
    dimensions: "51 feet",
    capacity: 35,
    bathrooms: 2,
    rooms: 3,
    amenities: [
      "Crew",
      "Gasoline",
      "Ice",
      "Bluetooth"
    ],
    images: [
      { url: "https://www.millan-experiences.com/web/image/2068-dc96341d/ChatGPT%20Image%2027%20abr%202026%2C%2002_04_08%20p.m..webp", original_url: "https://www.millan-experiences.com/web/image/2063-9bb4280c/ChatGPT%20Image%2027%20abr%202026%2C%2002_04_08%20p.m..png" },
      { url: "https://www.millan-experiences.com/web/image/2067-10385405/ChatGPT%20Image%2027%20abr%202026%2C%2002_18_48%20p.m..webp", original_url: "https://www.millan-experiences.com/web/image/2065-adeb1bc4/ChatGPT%20Image%2027%20abr%202026%2C%2002_18_48%20p.m..png" },
      { url: "https://www.millan-experiences.com/web/image/2066-95f4ed0d/ChatGPT%20Image%2027%20abr%202026%2C%2001_52_43%20p.m..webp", original_url: "https://www.millan-experiences.com/web/image/2061-90e7ed75/ChatGPT%20Image%2027%20abr%202026%2C%2001_52_43%20p.m..png" },
      { url: "https://www.millan-experiences.com/web/image/2069-108200fc/yacht_square.jpg", original_url: "https://www.millan-experiences.com/web/image/2062-108200fc/yacht_square.jpg" }
    ]
  },
  {
    name: "Skyfall",
    slug: "skyfall",
    dimensions: "72 feet",
    capacity: 15,
    bathrooms: 3,
    rooms: 3,
    amenities: [
      "Crew",
      "Gasoline",
      "Ice",
      "Towels",
      "Bluetooth",
      "Air conditioning"
    ],
    images: [
      { url: "https://www.millan-experiences.com/web/image/2148-63d46202/WhatsApp%20Image%202026-04-27%20at%203.48.23%20PM%20%281%29.webp", original_url: "https://www.millan-experiences.com/web/image/2136-6b6e0564/WhatsApp%20Image%202026-04-27%20at%203.48.23%20PM%20%281%29.jpeg" },
      { url: "https://www.millan-experiences.com/web/image/2152-07f6bf0d/WhatsApp%20Image%202026-04-27%20at%203.48.23%20PM.webp", original_url: "https://www.millan-experiences.com/web/image/2140-1ce2dfeb/WhatsApp%20Image%202026-04-27%20at%203.48.23%20PM.jpeg" },
      { url: "https://www.millan-experiences.com/web/image/2149-b44d7ce0/WhatsApp%20Image%202026-04-27%20at%203.48.24%20PM%20%283%29.webp", original_url: "https://www.millan-experiences.com/web/image/2141-6c204d93/WhatsApp%20Image%202026-04-27%20at%203.48.24%20PM%20%283%29.jpeg" },
      { url: "https://www.millan-experiences.com/web/image/2138-c430261c/WhatsApp%20Image%202026-04-27%20at%203.48.23%20PM%20%282%29.webp", original_url: "https://www.millan-experiences.com/web/image/2137-69c524d0/WhatsApp%20Image%202026-04-27%20at%203.48.23%20PM%20%282%29.jpeg" },
      { url: "https://www.millan-experiences.com/web/image/2151-a0b86111/WhatsApp%20Image%202026-04-27%20at%203.48.26%20PM%20%284%29.webp", original_url: "https://www.millan-experiences.com/web/image/2142-42e0c944/WhatsApp%20Image%202026-04-27%20at%203.48.26%20PM%20%284%29.jpeg" },
      { url: "https://www.millan-experiences.com/web/image/2150-e5eb7d59/WhatsApp%20Image%202026-04-27%20at%203.48.27%20PM%20%283%29.webp", original_url: "https://www.millan-experiences.com/web/image/2143-4c1dc3a5/WhatsApp%20Image%202026-04-27%20at%203.48.27%20PM%20%283%29.jpeg" },
      { url: "https://www.millan-experiences.com/web/image/2153-e6b9d531/WhatsApp%20Image%202026-04-27%20at%203.48.24%20PM.webp", original_url: "https://www.millan-experiences.com/web/image/2145-5e1c3553/WhatsApp%20Image%202026-04-27%20at%203.48.24%20PM.jpeg" }
    ]
  },
  {
    name: "Nosso",
    slug: "nosso",
    dimensions: "64 feet",
    capacity: 18,
    bathrooms: 3,
    rooms: 3,
    amenities: [
      "Crew",
      "Gasoline",
      "Ice",
      "Bluetooth"
    ],
    images: [
      { url: "https://www.millan-experiences.com/web/image/2130-91caba08/WhatsApp%20Image%202022-12-27%20at%2011.29.32%20AM%20%283%29.webp", original_url: "https://www.millan-experiences.com/web/image/2126-f8bd80eb/WhatsApp%20Image%202022-12-27%20at%2011.29.32%20AM%20%283%29.jpeg" },
      { url: "https://www.millan-experiences.com/web/image/2156-3965fe85/Nosso%20cover.webp", original_url: "https://www.millan-experiences.com/web/image/2123-a1226e78/Nosso%20cover.jpg" },
      { url: "https://www.millan-experiences.com/web/image/2128-a5a09155/WhatsApp%20Image%202022-12-27%20at%2011.29.31%20AM%20%282%29.webp", original_url: "https://www.millan-experiences.com/web/image/2124-76db9bdf/WhatsApp%20Image%202022-12-27%20at%2011.29.31%20AM%20%282%29.jpeg" },
      { url: "https://www.millan-experiences.com/web/image/2129-908a280d/WhatsApp%20Image%202022-12-27%20at%2011.29.32%20AM%20%281%29.webp", original_url: "https://www.millan-experiences.com/web/image/2125-f04b1e17/WhatsApp%20Image%202022-12-27%20at%2011.29.32%20AM%20%281%29.jpeg" }
    ]
  },
  {
    name: "Oddysea",
    slug: "oddysea",
    dimensions: "64 feet",
    capacity: 18,
    bathrooms: 3,
    rooms: 3,
    amenities: [
      "Crew",
      "Gasoline",
      "Ice",
      "Bluetooth"
    ],
    images: [
      { url: "https://www.millan-experiences.com/web/image/2161-5f349285/ODYSEA-8.webp", original_url: "https://www.millan-experiences.com/web/image/2157-41b8d16f/ODYSEA-8.jpg" },
      { url: "https://www.millan-experiences.com/web/image/2162-63d24374/ODYSEA-3.webp", original_url: "https://www.millan-experiences.com/web/image/2146-2dc99c46/ODYSEA-3.jpg" },
      { url: "https://www.millan-experiences.com/web/image/2160-befd363d/ODYSEA-4.webp", original_url: "https://www.millan-experiences.com/web/image/2154-45e93fd1/ODYSEA-4.jpg" },
      { url: "https://www.millan-experiences.com/web/image/2163-973c0143/ODYSEA-7.webp", original_url: "https://www.millan-experiences.com/web/image/2155-cad6111b/ODYSEA-7.jpg" },
      { url: "https://www.millan-experiences.com/web/image/2164-ef809083/ODYSEA-6.webp", original_url: "https://www.millan-experiences.com/web/image/2159-33b4a361/ODYSEA-6.jpg" }
    ]
  },
  {
    name: "Star Land",
    slug: "star-land",
    dimensions: "70 feet",
    capacity: 30,
    bathrooms: 4,
    rooms: 4,
    amenities: [
      "Crew",
      "Gasoline",
      "Ice",
      "Bluetooth"
    ],
    images: [
      { url: "https://www.millan-experiences.com/web/image/2178-e34d490a/starland.webp", original_url: "https://www.millan-experiences.com/web/image/2172-36f2598c/starland.jpg" },
      { url: "https://www.millan-experiences.com/web/image/2176-af36ebce/WhatsApp%20Image%202024-11-06%20at%209.19.39%20PM%20%282%29.webp", original_url: "https://www.millan-experiences.com/web/image/2173-2840384e/WhatsApp%20Image%202024-11-06%20at%209.19.39%20PM%20%282%29.jpeg" },
      { url: "https://www.millan-experiences.com/web/image/2179-ae3b7a6c/WhatsApp%20Image%202024-11-06%20at%209.19.39%20PM%20%283%29.webp", original_url: "https://www.millan-experiences.com/web/image/2174-e64e3344/WhatsApp%20Image%202024-11-06%20at%209.19.39%20PM%20%283%29.jpeg" },
      { url: "https://www.millan-experiences.com/web/image/2177-a093f4f3/WhatsApp%20Image%202024-11-06%20at%209.19.38%20PM%20%282%29.webp", original_url: "https://www.millan-experiences.com/web/image/2175-6f723b88/WhatsApp%20Image%202024-11-06%20at%209.19.38%20PM%20%282%29.jpeg" },
      { url: "https://www.millan-experiences.com/web/image/2182-24ca0941/WhatsApp%20Image%202026-04-27%20at%204.38.16%20PM.webp", original_url: "https://www.millan-experiences.com/web/image/2181-ba153290/WhatsApp%20Image%202026-04-27%20at%204.38.16%20PM.jpeg" }
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
      const cleanName = filename || currentUrl.split('/').pop() || 'yacht-image.jpg'
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
  console.log(`⛵ Iniciando carga de ${yachtsData.length} yates y catamaranes en Sanity...`)

  for (const yacht of yachtsData) {
    console.log(`\n========================================`)
    console.log(`🛥️ Procesando ${yacht.name} (${yacht.slug})...`)
    console.log(`   Descargando y subiendo ${yacht.images.length} imágenes...`)

    const uploadedAssets: any[] = []
    for (let i = 0; i < yacht.images.length; i++) {
      const img = yacht.images[i]
      const asset = await downloadAndUploadImage(img.url, img.original_url, `${yacht.slug}-${i + 1}.jpg`)
      if (asset) {
        uploadedAssets.push(asset)
        process.stdout.write(`   [${i + 1}/${yacht.images.length}] ✓ `)
      } else {
        process.stdout.write(`   [${i + 1}/${yacht.images.length}] ✗ `)
      }
    }
    console.log(`\n   Subidas exitosamente: ${uploadedAssets.length}/${yacht.images.length}`)

    if (uploadedAssets.length === 0) {
      console.error(`❌ No se pudieron cargar imágenes para ${yacht.name}`)
      continue
    }

    const mainImageAsset = uploadedAssets[0]
    const galleryAssets = uploadedAssets.slice(1)

    // Buscar si ya existe el documento
    const existing = await client.fetch('*[_type == "yachts-catamarans" && slug.current == $slug][0]', { slug: yacht.slug })

    const docData: any = {
      _type: 'yachts-catamarans',
      title: yacht.name,
      slug: {
        _type: 'slug',
        current: yacht.slug
      },
      details: {
        dimensions: yacht.dimensions,
        capacity: yacht.capacity,
        rooms: yacht.rooms,
        bathrooms: yacht.bathrooms,
      },
      amenities: yacht.amenities,
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
      console.log(`   ✅ ${yacht.name} actualizado.`)
    } else {
      console.log(`   Creando nuevo documento en Sanity...`)
      const created = await client.create(docData)
      console.log(`   ✅ ${yacht.name} creado con ID: ${created._id}`)
    }
  }

  console.log(`\n🎉 ¡Todos los yates y catamaranes han sido subidos y sincronizados con éxito en Sanity!`)
}

run()

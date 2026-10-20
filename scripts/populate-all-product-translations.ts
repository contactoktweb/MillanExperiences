import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_WRITE_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
})

interface ProductTranslationData {
  descriptionEs: string
  descriptionEn: string
  amenities?: string[]
}

const translations: Record<string, ProductTranslationData> = {
  // --- VILLAS ---
  'casa-carlo': {
    descriptionEs: 'Exclusiva residencia colonial en el corazón del Centro Histórico de Cartagena. Cuenta con 7 elegantes habitaciones para hasta 15 huéspedes, piscina panorámica en el rooftop, zona de barbacoa, área de mini spa y personal dedicado 24/7 para una estancia de máximo confort y total privacidad.',
    descriptionEn: "Exclusive colonial residence in the heart of Cartagena's Historic Center. Features 7 elegant bedrooms hosting up to 15 guests, a rooftop plunge pool with historic views, BBQ lounge, mini spa area, and 24/7 dedicated staff for an immaculate luxury stay.",
  },
  'casa-clinton': {
    descriptionEs: 'Magnífica joya arquitectónica colonial en el Centro Histórico. Dispone de 4 sofisticadas habitaciones para 8 personas, ascensor privado, cava de vinos climatizada, piscina y bar en la terraza panorámica con vistas incomparables a la ciudad amurallada.',
    descriptionEn: "Magnificent colonial architectural gem in Cartagena's Historic Center. Features 4 sophisticated bedrooms for up to 8 guests, private elevator, temperature-controlled wine cellar, rooftop pool, BBQ, and rooftop bar with breathtaking walled city views.",
  },
  'casa-kaki': {
    descriptionEs: 'Villa contemporánea de diseño en Getsemaní con capacidad para 12 huéspedes en 6 amplias habitaciones. Destaca por sus 2 piscinas privadas, proyector de cine al aire libre, zona BBQ y equipo de atención y seguridad disponible las 24 horas.',
    descriptionEn: 'Contemporary designer villa in vibrant Getsemaní accommodating up to 12 guests across 6 spacious bedrooms. Boasts 2 private pools, an outdoor cinema projector, BBQ area, and dedicated 24/7 on-site hospitality staff.',
  },
  'casa-eliza': {
    descriptionEs: 'Impresionante casona colonial restaurada en el Centro Histórico para 16 personas en 6 habitaciones en suite con 8 baños. Ofrece una piscina de diseño único en el patio central, jacuzzi en el rooftop y amplios salones coloniales de techos altos.',
    descriptionEn: 'Stunning restored colonial mansion in the Historic Center accommodating up to 16 guests across 6 en-suite bedrooms and 8 bathrooms. Features a signature courtyard pool, rooftop jacuzzi, and grand high-ceiling colonial living spaces.',
  },
  'casa-jade': {
    descriptionEs: 'Gran propiedad de lujo en Getsemaní con 10 habitaciones privadas y 10.5 baños para grupos de hasta 20 personas. Equipada con piscina privada, jacuzzi en terraza, parrilla BBQ y personal completo 24/7 para eventos privados o vacaciones exclusivas.',
    descriptionEn: 'Grand luxury estate in Getsemaní with 10 private en-suite bedrooms and 10.5 bathrooms for groups of up to 20 guests. Complete with private swimming pool, rooftop jacuzzi, BBQ grill, and dedicated 24/7 staff for family gatherings or celebrations.',
  },
  'casa-hilda': {
    descriptionEs: 'Residencia colonial de ensueño en el Centro Histórico de Cartagena con 8 amplias habitaciones y 8.5 baños para alojar hasta 16 huéspedes. Amplios patios interiores, piscina privada y terrazas coloniales para disfrutar la brisa caribeña.',
    descriptionEn: "Dream colonial residence in Cartagena's Historic Center featuring 8 spacious bedrooms and 8.5 bathrooms for up to 16 guests. Highlights include verdant interior courtyards, private swimming pool, and colonial breezes on private balconies.",
  },
  'casa-alas': {
    descriptionEs: 'Elegante casona privada con 6 habitaciones de lujo y 6.5 baños para 14 huéspedes. Combina historia colonial y comodidades modernas en el Centro Histórico, con piscina privada, terraza soleada y servicio de concierge personalizado.',
    descriptionEn: 'Elegant private colonial manor with 6 luxury bedrooms and 6.5 bathrooms accommodating up to 14 guests. Blends historic charm with modern amenities, featuring private swimming pool, sun deck, and personalized concierge service.',
  },
  'casa-lea': {
    descriptionEs: 'Íntima y sofisticada villa en el Centro Histórico con 5 habitaciones y 5.5 baños para 12 personas. Cuenta con piscina privada, ambientes climatizados de alto diseño y atención personalizada para una experiencia inolvidable en Cartagena.',
    descriptionEn: 'Intimate and sophisticated villa in the Historic Center with 5 bedrooms and 5.5 bathrooms hosting up to 12 guests. Offers private pool, designer air-conditioned living areas, and bespoke butler service for an unforgettable Cartagena stay.',
  },
  'casa-macondo': {
    descriptionEs: 'Encantadora villa privada inspirada en el realismo mágico, ubicada en Getsemaní. Cuenta con 7 habitaciones y 8 baños para albergar hasta 16 huéspedes, piscina tropical, patios abiertos y espacios sociales ideales para grupos grandes.',
    descriptionEn: 'Enchanting private villa inspired by magical realism in lively Getsemaní. Features 7 en-suite bedrooms and 8 bathrooms for up to 16 guests, tropical courtyard pool, and open-air social spaces ideal for large gatherings.',
  },

  // --- PRIVATE ISLANDS ---
  'isla-boni': {
    descriptionEs: 'Paraíso caribeño privado en las Islas del Rosario con 6 habitaciones y 6.5 baños para 17 huéspedes. Rodeada de aguas turquesas cristalinas, cuenta con muelle privado para yates, piscina frente al mar, climatización total y personal 24/7.',
    descriptionEn: 'Private Caribbean paradise in the Rosario Islands featuring 6 bedrooms and 6.5 bathrooms for up to 17 guests. Surrounded by turquoise waters, offering private boat dock, oceanfront pool, full air conditioning, and 24/7 staff.',
  },
  'isla-tamba': {
    descriptionEs: 'Exclusiva isla privada de gran capacidad para 20 huéspedes en 7 suites con 9 baños. Incluye piscina, jacuzzi frente al mar, kayaks, gimnasio privado, muelle de atraque y servicio completo de mayordomo y tripulación en tierra.',
    descriptionEn: 'Ultra-exclusive private island estate hosting up to 20 guests across 7 suites with 9 bathrooms. Features swimming pool, oceanfront jacuzzi, kayaks, private gym, yacht dock, and full butler and hospitality staff.',
  },
  'isla-mambo': {
    descriptionEs: 'Refugio insular privado de serenidad tropical en las Islas del Rosario. Dispone de 7 habitaciones y 7 baños para 14 huéspedes, piscina de agua dulce, acceso directo al mar, muelle privado y personal de servicio permanente.',
    descriptionEn: 'Serene private island retreat in the Rosario Islands with 7 bedrooms and 7 bathrooms hosting up to 14 guests. Features freshwater swimming pool, direct Caribbean sea access, deep-water dock, and dedicated on-site team.',
  },
  'isla-coco': {
    descriptionEs: 'Extraordinaria isla privada con cancha de tenis reglamentaria, piscina infinity, 7 habitaciones y baños privados para 18 huéspedes. El destino supremo para desconectar con total lujo, privacidad y vistas al Parque Nacional Corales del Rosario.',
    descriptionEn: 'Extraordinary private island featuring a regulation tennis court, infinity pool, and 7 en-suite bedrooms for up to 18 guests. The ultimate sanctuary for seclusion, barefoot luxury, and panoramic Caribbean coral reef vistas.',
  },
  'isla-del-mar': {
    descriptionEs: 'Isla privada de lujo rodeada de arrecifes coralinos y aguas cristalinas, con 7 habitaciones para 16 personas. Cuenta con muelle privado, piscina, terrazas para atardeceres y atención de primer nivel durante toda la estancia.',
    descriptionEn: 'Luxury private island surrounded by coral reefs and crystalline waters, featuring 7 bedrooms for up to 16 guests. Boasts private yacht dock, swimming pool, sunset lounging decks, and five-star hospitality throughout.',
  },
  'isla-amores': {
    descriptionEs: 'Isla idílica para grupos de hasta 14 personas en 5 habitaciones y 6 baños. Equipada con piscina, quiosco bar sobre el mar, gimnasio isleño, spa, camas balinesas y servicio de concierge y chef privado.',
    descriptionEn: 'Idyllic private island for up to 14 guests across 5 bedrooms and 6 bathrooms. Complete with oceanfront swimming pool, covered over-water cocktail bar, island gym, spa pavilion, day beds, and private chef service.',
  },

  // --- YACHTS & CATAMARANS ---
  'ferretti': {
    descriptionEs: 'Yate italiano de lujo de 96 pies con capacidad de hasta 16 pasajeros de día y 4 camarotes con 5 baños. Cuenta con amplios salones, flybridge panorámico, tripulación completa certificada, combustible y amenidades premium.',
    descriptionEn: 'Italian luxury 96-foot motor yacht accommodating up to 16 day guests, featuring 4 staterooms and 5 bathrooms. Boasts expansive salons, panoramic flybridge, professional certified crew, fuel, and top-tier amenities.',
  },
  'skyfall': {
    descriptionEs: 'Imponente yate deportivo de 72 pies diseñado para navegar las Islas del Rosario con el máximo confort para 15 personas. 3 camarotes, 3 baños, acabados de alta gama, tripulación experta, toallas, hielo y sonido Bluetooth de alta fidelidad.',
    descriptionEn: 'Striking 72-foot luxury yacht engineered for effortless cruising across the Rosario Islands for up to 15 guests. Features 3 staterooms, 3 bathrooms, high-end finishes, expert crew, towels, ice, and premium Bluetooth sound.',
  },
  'oddysea': {
    descriptionEs: 'Yate de 64 pies con capacidad para 18 pasajeros. Combina velocidad, estabilidad y elegancia caribeña con 3 camarotes, 3 baños, asoleadoras en proa y popa, tripulación dedicada y equipo de navegación de vanguardia.',
    descriptionEn: '64-foot luxury yacht accommodating up to 18 guests. Blends speed, seaworthiness, and Caribbean elegance with 3 staterooms, 3 bathrooms, bow sun pads, dedicated crew, and cutting-edge navigation.',
  },
  'valhalla': {
    descriptionEs: 'Espacioso catamarán a motor de 51 pies ideal para celebraciones y grupos de hasta 35 personas. Estabilidad insuperable en navegación, amplias cubiertas para socializar, 3 cabinas, 2 baños y tripulación profesional.',
    descriptionEn: 'Spacious 51-foot motor catamaran designed for celebrations and groups of up to 35 guests. Outstanding stability, generous social decks, 3 cabins, 2 bathrooms, and full professional crew.',
  },
  'marlet': {
    descriptionEs: 'Magnífico yate de 82 pies con capacidad para 22 pasajeros de día y 4 camarotes con 3 baños. Líneas modernas, flybridge con zona de descanso, salón climatizado y atención náutica de clase mundial.',
    descriptionEn: 'Magnificent 82-foot motor yacht hosting up to 22 day guests with 4 staterooms and 3 bathrooms. Features sleek modern lines, panoramic flybridge, air-conditioned salon, and world-class nautical service.',
    amenities: ['Crew', 'Gasoline', 'Ice', 'Towels', 'Bluetooth', 'Air conditioning'],
  },
  'alisio': {
    descriptionEs: 'Catamarán a vela y motor de 45 pies para grupos de hasta 40 personas. Gran cubierta exterior, sombra confortable, 2 baños y navegación suave ideal para fiestas en Cholón, atardeceres en la bahía o paseos en familia.',
    descriptionEn: '45-foot sailing and motor catamaran for groups up to 40 guests. Features huge exterior lounging decks, comfortable shade, 2 bathrooms, and smooth sailing ideal for Cholon, family gatherings, or sunset bay cruises.',
  },
  'cuña': {
    descriptionEs: 'Yate de 60 pies con capacidad para 15 personas. Perfil estilizado, amplia plataforma de baño, cómodas zonas de descanso exterior y tripulación capacitada para un día inolvidable en las islas.',
    descriptionEn: '60-foot luxury yacht hosting up to 15 guests. Sleek profile, hydraulic swim platform, comfortable exterior lounges, and experienced crew for an unforgettable day in the Caribbean islands.',
  },
  'nosso': {
    descriptionEs: 'Elegante yate de 64 pies para 18 pasajeros con 3 camarotes y 3 baños. Salón interior de lujo, asoleadoras acolchadas, tripulación profesional y servicio a bordo de primera categoría.',
    descriptionEn: 'Elegant 64-foot yacht for up to 18 guests featuring 3 cabins and 3 bathrooms. Luxurious interior salon, padded bow sun beds, professional crew, and first-rate hospitality.',
  },
  'star-land': {
    descriptionEs: 'Yate de 70 pies con capacidad para 30 pasajeros, 4 camarotes y 4 baños. Perfecto para eventos corporativos y celebraciones privadas con gran amplitud de cubiertas, sonido potente y confort superior.',
    descriptionEn: 'Spacious 70-foot yacht accommodating up to 30 guests with 4 cabins and 4 bathrooms. Perfect for private celebrations and corporate outings with generous deck space, sound system, and superior comfort.',
  },

  // --- SPEEDBOATS ---
  'galea': {
    descriptionEs: 'Lancha deportiva de 38 pies con capacidad para 12 pasajeros. Diseño aerodinámico, potente motorización, baño, equipo de snorkel, hielo, toallas y sonido Bluetooth para recorrer las Islas del Rosario con agilidad y estilo.',
    descriptionEn: 'High-performance 38-foot speedboat accommodating up to 12 passengers. Aerodynamic design, powerful engines, onboard bathroom, snorkel gear, ice, towels, and Bluetooth sound for cruising the Rosario Islands in agility and style.',
  },
  'serenity': {
    descriptionEs: 'Lancha deportiva de 37 pies para 10 personas con camarote y baño. Cómodos sillones tapizados, equipo de snorkel, tripulación atenta y navegación ágil para explorar las calas más secretas de Barú e Islas del Rosario.',
    descriptionEn: '37-foot luxury day boat for up to 10 guests with cabin and bathroom. Plush upholstered seating, snorkeling equipment, attentive crew, and nimble cruising to explore the most secluded coves of Barú and the Rosario Islands.',
  },
  'marianas-iv': {
    descriptionEs: 'Lancha de gran eslora de 42 pies para grupos de hasta 28 pasajeros. Espacio amplio, asientos confortables, baño a bordo, potente sistema de sonido y tripulación certificada para días de fiesta y playa en el Caribe.',
    descriptionEn: 'Spacious 42-foot speedboat for groups of up to 28 guests. Generous seating, onboard bathroom, powerful audio system, and certified crew for vibrant day celebrations in the Caribbean.',
  },
  'cohiba': {
    descriptionEs: 'Lancha deportiva de 32 pies ágil y moderna para 14 personas. Excelente distribución de asientos, asoleadora en proa, baño, sonido de alta definición y tripulación experta para un día inolvidable en las islas.',
    descriptionEn: 'Nimble and modern 32-foot speedboat for up to 14 guests. Excellent seating layout, bow sun pad, onboard head, high-definition sound, and expert crew for an unforgettable day on the water.',
  },
  'azahar': {
    descriptionEs: 'Lancha deportiva de 38 pies con capacidad para 16 personas. Equipada con baño, caretas de snorkel, nevera con hielo, sistema de sonido y motores de última generación para navegar a Barú y Cholón.',
    descriptionEn: '38-foot sport boat accommodating up to 16 guests. Equipped with bathroom, snorkel masks, ice cooler, sound system, and modern engines for effortless island hopping to Barú and Cholón.',
  },
  'angel': {
    descriptionEs: 'Lancha deportiva premium de 41 pies para 18 pasajeros. Confort insuperable en navegación, asoleadoras ergonómicas, baño privado, tripulación profesional y equipo de sonido de alta fidelidad.',
    descriptionEn: 'Premium 41-foot sport cruiser hosting up to 18 guests. Superior ride comfort, ergonomic sun pads, private bathroom, professional crew, and high-fidelity sound.',
  },
  'vicky': {
    descriptionEs: 'Embarcación deportiva de 42 pies con capacidad para 28 pasajeros. Ideal para grupos grandes, despedidas y eventos náuticos en Cholón e Islas del Rosario con amplio espacio, baño y sonido envolvente.',
    descriptionEn: '42-foot sport boat hosting up to 28 passengers. Ideal for large groups, celebrations, and beach club hopping with ample deck space, bathroom, and surround sound.',
  },
  'catalunya': {
    descriptionEs: 'Lancha deportiva clásica de 32 pies para 14 personas. Rápida, segura y confortable, con baño, hielo, tripulación y sonido para disfrutar los mejores rincones del mar de Cartagena.',
    descriptionEn: "Classic 32-foot sport boat for up to 14 guests. Fast, seaworthy, and comfortable with onboard head, ice, dedicated crew, and sound to experience the best spots around Cartagena's coastline.",
  },
  'don-bruno': {
    descriptionEs: 'Lancha de 42 pies con capacidad para 20 pasajeros. Gran manga y estabilidad, asoleadoras acolchadas, baño, hieleras y sonido potente para pasar el día en las aguas cristalinas de las islas.',
    descriptionEn: '42-foot day boat accommodating up to 20 guests. Wide beam, excellent stability, padded sun pads, bathroom, ice coolers, and powerful sound for a premier day on crystal-clear island waters.',
  },
  'blue-horizon': {
    descriptionEs: 'Lancha moderna de 38 pies para 15 pasajeros. Elegante casco azul, tapicería náutica de lujo, baño, asoleadoras y tripulación capacitada para coordinar el mejor itinerario por las islas.',
    descriptionEn: 'Modern 38-foot speedboat for up to 15 passengers. Striking blue hull, luxury marine upholstery, bathroom, sun lounging areas, and experienced crew to curate the best island itinerary.',
  },
  'iconique': {
    descriptionEs: 'Lancha deportiva de 42 pies para 18 personas. Diseño de vanguardia, confort superior en el oleaje, baño, sistema de sonido y atención personalizada de capitán y marinero.',
    descriptionEn: 'Cutting-edge 42-foot sport boat for up to 18 guests. Contemporary styling, superior sea-keeping, bathroom, sound system, and personalized service from captain and mate.',
  },
  'fantastika': {
    descriptionEs: 'Lancha deportiva de 45 pies para 22 pasajeros. Máxima amplitud en su categoría, asoleadoras dobles, baño, tripulación experimentada y potencia para una jornada náutica inolvidable.',
    descriptionEn: '45-foot luxury sport boat for up to 22 passengers. Maximum deck space in its class, dual sun pads, bathroom, experienced crew, and high performance for an unforgettable Caribbean day.',
  },
}

async function run() {
  console.log('Iniciando actualización de traducciones para todos los productos de lujo...')

  // 1. Delete draft document without slug if exists
  try {
    await client.delete('drafts.15e79a71-74af-4722-9d1f-1f1eeeae9271')
    console.log('Eliminado borrador de prueba corrupto.')
  } catch (e) {
    // Ignore if not present
  }

  const types = ['luxury-villas', 'private-islands', 'yachts-catamarans', 'speedboats']
  let updatedCount = 0

  for (const type of types) {
    const docs = await client.fetch(`*[_type == "${type}"]{ _id, title, "slug": slug.current }`)
    console.log(`\nProcesando ${type} (${docs.length} documentos)...`)

    for (const doc of docs) {
      const slug = doc.slug
      const data = translations[slug]

      if (!data) {
        console.warn(`⚠️ Sin traducción definida para slug: ${slug} (${doc.title})`)
        continue
      }

      const patchData: any = {
        descriptionEs: data.descriptionEs,
        descriptionEn: data.descriptionEn,
      }

      if (data.amenities) {
        patchData.amenities = data.amenities
      }

      await client.patch(doc._id).set(patchData).commit()
      console.log(`✅ [${doc.title}] (${slug}) actualizado con descripción completa en ES y EN.`)
      updatedCount++
    }
  }

  console.log(`\n🎉 ¡Finalizado! Se actualizaron ${updatedCount} productos con descripciones bilingües completas en Sanity.`)
}

run().catch(console.error)

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

const cancellationPolicyEn = `A 50% deposit is required to confirm your reservation. This deposit is non-refundable.

If you cancel after making the reservation, you will forfeit the deposit but will not be required to pay the remaining 50%.

Check-in is typically at 3:00 PM and check-out at 11:00 AM, customizable upon request with your dedicated concierge.`

const cancellationPolicyEs = `Se requiere un depósito del 50% para confirmar su reserva. Este depósito no es reembolsable.

Si cancela después de hacer la reserva, perderá el depósito pero no tendrá que pagar el 50% restante.

El check-in es habitualmente a las 3:00 PM y el check-out a las 11:00 AM, coordinable directamente con su concierge privado.`

const standardFaqs = [
  {
    _key: "faq1",
    questionEn: "When should I request reservations for restaurants or activities?",
    questionEs: "¿Cuándo debo solicitar reservas para restaurantes o actividades?",
    answerEn: "We recommend sharing your preferences as soon as your travel dates are confirmed. Exclusive restaurants, private yachts, and high-demand experiences often book up weeks or months in advance. Once you give us your wishlist, our team will proactively handle the outreach and secure your spots.",
    answerEs: "Recomendamos compartir sus preferencias tan pronto como se confirmen sus fechas de viaje. Restaurantes exclusivos, yates privados y experiencias de alta demanda a menudo se reservan con semanas de anticipación.",
  },
  {
    _key: "faq2",
    questionEn: "Can your private chefs accommodate specific dietary restrictions?",
    questionEs: "¿Pueden sus chefs privados adaptarse a restricciones dietéticas específicas?",
    answerEn: "Absolutely. Our curated network of private chefs is highly experienced in designing bespoke menus tailored to any dietary requirement, allergy, or personal preference. We gather all this information well before your arrival to ensure every in-home dining experience is flawless and safe.",
    answerEs: "Absolutamente. Nuestra red de chefs privados está altamente experimentada en diseñar menús a medida adaptados a cualquier requerimiento dietético, alergia o preferencia personal.",
  },
  {
    _key: "faq3",
    questionEn: "Will I have support available during the actual trip?",
    questionEs: "¿Tendré apoyo disponible durante el viaje real?",
    answerEn: "Yes. While we meticulously orchestrate your itinerary in advance, we know that true luxury requires flexibility. Your dedicated concierge team is available throughout your stay to manage last-minute adjustments, coordinate additional transportation, or secure new reservations, giving you absolute peace of mind.",
    answerEs: "Sí. Su equipo de concierge dedicado está disponible durante toda su estancia para gestionar ajustes de último momento, coordinar transporte y darle absoluta tranquilidad.",
  },
  {
    _key: "faq4",
    questionEn: "What staff and services are included in the villa?",
    questionEs: "¿Qué personal y servicios están incluidos en la villa?",
    answerEn: "All our luxury private villas include dedicated on-site daily staff (housekeeping and maintenance) to ensure immaculate comfort throughout your stay, plus your personal concierge on-call 24/7.",
    answerEs: "Todas nuestras villas privadas de lujo incluyen personal dedicado en sitio (limpieza y atención) para asegurar un confort impecable durante toda su estadía, además de su concierge personal disponible 24/7.",
  }
]

const standardComplementary = [
  {
    _key: "exp1",
    titleEn: "Private Transportation",
    titleEs: "Transporte Privado",
    descriptionEn: "Enhance your experience with our Private Transportation service. We’ll handle seamless airport pick-ups and door-to-door transfers, ensuring every transition throughout your day feels smooth, effortless, and perfectly timed.",
    descriptionEs: "Mejore su experiencia con nuestro servicio de Transporte Privado. Nos encargaremos de recogidas en el aeropuerto y traslados puerta a puerta para que disfrute de cada momento con total comodidad.",
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
    titleEn: "Concierge Service",
    titleEs: "Servicio de Concierge",
    descriptionEn: "Elevate your stay with our full-service concierge. We’ll handle every detail—from reservations and grocery shopping to tours and activity planning—while crafting a fully customized itinerary.",
    descriptionEs: "Eleve su estancia con nuestro servicio de concierge completo. Manejaremos cada detalle, desde reservas y compras hasta tours y planificación de actividades a su medida.",
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
    titleEn: "Private Chef",
    titleEs: "Chef Privado",
    descriptionEn: "Indulge in a private chef experience with personalized menus tailored to you and your friends. From fresh, locally sourced ingredients to seamless in-villa service, every meal is carefully prepared.",
    descriptionEs: "Disfrute de una experiencia gastronómica con chef privado y menús personalizados. Con ingredientes frescos y servicio de primer nivel en su villa.",
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

async function run() {
  const villas = await client.fetch('*[_type == "luxury-villas"]')
  console.log(`Encontradas ${villas.length} villas para actualizar información complementaria, FAQs y políticas.`)

  for (const villa of villas) {
    console.log(`Actualizando ${villa.title} (${villa.slug?.current})...`)
    
    await client
      .patch(villa._id)
      .set({
        cancellationPolicyEn,
        cancellationPolicyEs,
        faqs: standardFaqs,
        complementaryExperiences: standardComplementary,
      })
      .commit()
      
    console.log(`✅ ${villa.title} actualizado.`)
  }

  console.log("\n🎉 ¡Todas las villas han sido actualizadas con éxito en Sanity!")
}

run()

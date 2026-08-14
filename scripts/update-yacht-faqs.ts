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

const yachtFaqsForIndividualYachts = [
  {
    _key: "faq1",
    questionEn: "What is the difference between a yacht, catamaran and speedboat?",
    questionEs: "¿Cuál es la diferencia entre un yate, un catamarán y una lancha deportiva?",
    answerEn: "Yachts and catamarans usually offer more lounge space and a more elevated onboard experience, while speedboats are faster and more flexible for island hopping.",
    answerEs: "Los yates y catamaranes suelen ofrecer más espacio de descanso y una experiencia a bordo más elevada, mientras que las lanchas son más rápidas y flexibles para recorrer varias islas.",
  },
  {
    _key: "faq2",
    questionEn: "Can Millan Experiences plan a full yacht day itinerary?",
    questionEs: "¿Puede Millan Experiences planificar un itinerario completo de día en yate?",
    answerEn: "Yes. The team can coordinate route planning, timing, onboard service, catering, transfers, celebrations and concierge details around your group.",
    answerEs: "Sí. Nuestro equipo puede coordinar la planificación de la ruta, tiempos, servicio a bordo, catering, traslados, celebraciones y detalles de concierge a la medida de su grupo.",
  },
  {
    _key: "faq3",
    questionEn: "Are yachts suitable for private events in Cartagena?",
    questionEs: "¿Son los yates adecuados para eventos privados en Cartagena?",
    answerEn: "Yes. Yachts and catamarans can work well for birthdays, corporate groups, wedding weekends, bachelor and bachelorette trips and private sunset plans.",
    answerEs: "Sí. Los yates y catamaranes son ideales para cumpleaños, grupos corporativos, fines de semana de bodas, despedidas de soltero/a y planes privados al atardecer.",
  },
  {
    _key: "faq4",
    questionEn: "How far in advance should I reserve a yacht or catamaran?",
    questionEs: "¿Con cuánta anticipación debo reservar un yate o catamarán?",
    answerEn: "For high-demand dates, holidays and large groups, reserving early gives you better access to the strongest vessel options and service teams.",
    answerEs: "Para fechas de alta demanda, temporadas festivas y grupos grandes, reservar con anticipación le brinda mejor acceso a las mejores embarcaciones y tripulaciones.",
  }
]

const seoFaqEn = {
  title: "Yachts and Catamarans in Cartagena FAQ",
  description: "Yachts and catamarans are ideal for groups that want more space, comfort and a premium day on the water.",
  questions: [
    {
      _key: "q1",
      question: "What is the difference between a yacht, catamaran and speedboat?",
      answer: "Yachts and catamarans usually offer more lounge space and a more elevated onboard experience, while speedboats are faster and more flexible for island hopping."
    },
    {
      _key: "q2",
      question: "Can Millan Experiences plan a full yacht day itinerary?",
      answer: "Yes. The team can coordinate route planning, timing, onboard service, catering, transfers, celebrations and concierge details around your group."
    },
    {
      _key: "q3",
      question: "Are yachts suitable for private events in Cartagena?",
      answer: "Yes. Yachts and catamarans can work well for birthdays, corporate groups, wedding weekends, bachelor and bachelorette trips and private sunset plans."
    },
    {
      _key: "q4",
      question: "How far in advance should I reserve a yacht or catamaran?",
      answer: "For high-demand dates, holidays and large groups, reserving early gives you better access to the strongest vessel options and service teams."
    }
  ],
  cta: {
    label: "Start planning",
    href: "/contact"
  }
}

const seoFaqEs = {
  title: "Preguntas Frecuentes sobre Yates y Catamaranes en Cartagena",
  description: "Los yates y catamaranes son ideales para grupos que desean más espacio, confort y un día de lujo en el mar.",
  questions: [
    {
      _key: "q1",
      question: "¿Cuál es la diferencia entre un yate, un catamarán y una lancha deportiva?",
      answer: "Los yates y catamaranes suelen ofrecer más espacio de descanso y una experiencia a bordo más elevada, mientras que las lanchas son más rápidas y flexibles para recorrer varias islas."
    },
    {
      _key: "q2",
      question: "¿Puede Millan Experiences planificar un itinerario completo de día en yate?",
      answer: "Sí. Nuestro equipo puede coordinar la planificación de la ruta, tiempos, servicio a bordo, catering, traslados, celebraciones y detalles de concierge a la medida de su grupo."
    },
    {
      _key: "q3",
      question: "¿Son los yates adecuados para eventos privados en Cartagena?",
      answer: "Sí. Los yates y catamaranes son ideales para cumpleaños, grupos corporativos, fines de semana de bodas, despedidas de soltero/a y planes privados al atardecer."
    },
    {
      _key: "q4",
      question: "¿Con cuánta anticipación debo reservar un yate o catamarán?",
      answer: "Para fechas de alta demanda, temporadas festivas y grupos grandes, reservar con anticipación le brinda mejor acceso a las mejores embarcaciones y tripulaciones."
    }
  ],
  cta: {
    label: "Comenzar planificación",
    href: "/contact"
  }
}

async function run() {
  console.log("⚓ Actualizando FAQs de Yates y Catamaranes en Sanity...")

  // 1. Actualizar el catálogo general (listingPage)
  const listingPage = await client.fetch('*[_type == "listingPage" && slug.current == "yachts-catamarans"][0]')
  if (listingPage) {
    console.log(`Actualizando listingPage 'yachts-catamarans' (${listingPage._id})...`)
    await client
      .patch(listingPage._id)
      .set({
        "contentEn.seoFaq": seoFaqEn,
        "contentEs.seoFaq": seoFaqEs,
      })
      .commit()
    console.log("✅ listingPage actualizado con seoFaq.")
  } else {
    console.warn("⚠️ No se encontró listingPage con slug 'yachts-catamarans'")
  }

  // 2. Actualizar todas las embarcaciones individuales
  const yachts = await client.fetch('*[_type == "yachts-catamarans"]')
  console.log(`Actualizando ${yachts.length} yates individuales con las nuevas FAQs...`)

  for (const yacht of yachts) {
    await client
      .patch(yacht._id)
      .set({
        faqs: yachtFaqsForIndividualYachts
      })
      .commit()
    console.log(`✅ FAQs actualizadas para ${yacht.title}`)
  }

  console.log("\n🎉 ¡Todas las FAQs de Yates y Catamaranes fueron agregadas exitosamente!")
}

run()

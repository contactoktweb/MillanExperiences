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

const listingFaqs = {
  "luxury-villas": {
    en: {
      title: "Luxury Villas in Cartagena FAQ",
      description: "Planning a private villa stay in Cartagena is easier when the essentials are clear before you arrive.",
      questions: [
        {
          _key: "q1",
          question: "What is included with a luxury villa booking in Cartagena?",
          answer: "Each villa can be paired with concierge planning, house staff coordination, private chefs, transportation, boat days, reservations and event support depending on the property and guest needs."
        },
        {
          _key: "q2",
          question: "Can Millan Experiences help choose the right villa for a group?",
          answer: "Yes. The team recommends villas based on group size, occasion, preferred location, privacy needs, service level and the type of Cartagena experience you want to build."
        },
        {
          _key: "q3",
          question: "Are villas available for bachelor parties, weddings or corporate groups?",
          answer: "Many villas are suitable for private celebrations and group travel. Millan Experiences helps match the property with the event, guest flow and local logistics."
        },
        {
          _key: "q4",
          question: "Can services like chefs, boats and transfers be added?",
          answer: "Yes. Villa stays can be connected with private chefs, yacht or speedboat days, airport transfers, security, VIP reservations and personalized concierge support."
        }
      ],
      cta: {
        label: "Start planning",
        href: "/contact"
      }
    },
    es: {
      title: "Preguntas Frecuentes sobre Villas de Lujo en Cartagena",
      description: "Planificar una estadía en una villa privada en Cartagena es más fácil cuando los detalles esenciales están claros antes de su llegada.",
      questions: [
        {
          _key: "q1",
          question: "¿Qué incluye la reserva de una villa de lujo en Cartagena?",
          answer: "Cada villa puede complementarse con planificación de concierge, coordinación de personal de servicio, chefs privados, transporte, salidas en barco, reservas y apoyo para eventos según la propiedad y sus necesidades."
        },
        {
          _key: "q2",
          question: "¿Puede Millan Experiences ayudar a elegir la villa adecuada para un grupo?",
          answer: "Sí. Nuestro equipo recomienda villas en función del tamaño del grupo, la ocasión, ubicación preferida, nivel de privacidad y el tipo de experiencia que desea vivir en Cartagena."
        },
        {
          _key: "q3",
          question: "¿Están las villas disponibles para despedidas de soltero/a, bodas o grupos corporativos?",
          answer: "Muchas villas son ideales para celebraciones privadas y viajes en grupo. Millan Experiences se encarga de adaptar la propiedad al evento, la logística y la comodidad de los huéspedes."
        },
        {
          _key: "q4",
          question: "¿Se pueden añadir servicios como chefs, botes y traslados?",
          answer: "Sí. Las estadías en villas pueden complementarse con chefs privados, días en yate o lancha rápida, traslados al aeropuerto, seguridad, reservas VIP y asistencia personalizada de concierge."
        }
      ],
      cta: {
        label: "Comenzar planificación",
        href: "/contact"
      }
    }
  },
  "private-islands": {
    en: {
      title: "Private Islands in Colombia FAQ",
      description: "Private island experiences give groups a more secluded way to enjoy the Caribbean coast near Cartagena.",
      questions: [
        {
          _key: "q1",
          question: "Can I book a private island near Cartagena for the day?",
          answer: "Yes. Millan Experiences curates private island options for day trips, celebrations and tailored escapes with boat transfers and service coordination."
        },
        {
          _key: "q2",
          question: "What services can be added to a private island experience?",
          answer: "Private chefs, drinks, boat transfers, music, decor, event support, staff coordination and concierge services can be arranged depending on the island."
        },
        {
          _key: "q3",
          question: "Are private islands good for weddings or celebrations?",
          answer: "Yes. Private islands can be a strong fit for intimate weddings, birthdays, bachelor and bachelorette plans, corporate retreats and premium group escapes."
        },
        {
          _key: "q4",
          question: "How does transportation to a private island work?",
          answer: "Millan Experiences coordinates boat transfers, timing, departure points and return logistics so the day stays comfortable and organized."
        }
      ],
      cta: {
        label: "Start planning",
        href: "/contact"
      }
    },
    es: {
      title: "Preguntas Frecuentes sobre Islas Privadas en Colombia",
      description: "Las experiencias en islas privadas brindan a los grupos una forma más exclusiva y privada de disfrutar la costa caribeña cerca de Cartagena.",
      questions: [
        {
          _key: "q1",
          question: "¿Puedo reservar una isla privada cerca de Cartagena para pasar el día?",
          answer: "Sí. Millan Experiences selecciona opciones de islas privadas para pasadías, celebraciones y escapadas a medida con traslados en bote y coordinación de servicios."
        },
        {
          _key: "q2",
          question: "¿Qué servicios se pueden añadir a una experiencia en isla privada?",
          answer: "Se pueden coordinar chefs privados, bebidas, traslados náuticos, música, decoración, apoyo para eventos, personal en sitio y servicio de concierge según la isla."
        },
        {
          _key: "q3",
          question: "¿Son las islas privadas ideales para bodas o celebraciones?",
          answer: "Sí. Las islas privadas son perfectas para bodas íntimas, cumpleaños, despedidas de soltero/a, retiros corporativos y escapadas exclusivas en grupo."
        },
        {
          _key: "q4",
          question: "¿Cómo funciona el transporte a una isla privada?",
          answer: "Millan Experiences coordina los traslados en barco, los horarios, los puntos de salida y la logística de regreso para que su día sea cómodo y sin complicaciones."
        }
      ],
      cta: {
        label: "Comenzar planificación",
        href: "/contact"
      }
    }
  },
  "speedboats": {
    en: {
      title: "Speedboats in Cartagena FAQ",
      description: "Private speedboat days are a flexible way to explore the Rosario Islands, Cholon, Baru and Cartagena Bay.",
      questions: [
        {
          _key: "q1",
          question: "Where can a private speedboat go from Cartagena?",
          answer: "Popular routes include the Rosario Islands, Cholon, Baru, beach clubs and calm swimming stops selected around timing, weather and the group style."
        },
        {
          _key: "q2",
          question: "How do I choose the right speedboat?",
          answer: "Millan Experiences recommends boats based on guest count, comfort expectations, itinerary, celebration type and whether you prefer a relaxed island day or a more social route."
        },
        {
          _key: "q3",
          question: "Can food, drinks or a private chef be arranged for the boat day?",
          answer: "Yes. Catering, drinks, restaurant stops, chef coordination and other add-ons can be planned before the day so the experience feels seamless."
        },
        {
          _key: "q4",
          question: "Are speedboats good for groups and celebrations?",
          answer: "Yes. Speedboats work well for birthdays, bachelor and bachelorette groups, family trips, corporate outings and private island days."
        }
      ],
      cta: {
        label: "Start planning",
        href: "/contact"
      }
    },
    es: {
      title: "Preguntas Frecuentes sobre Lanchas Deportivas en Cartagena",
      description: "Los días en lancha deportiva privada son una forma ágil y flexible de explorar las Islas del Rosario, Cholón, Barú y la Bahía de Cartagena.",
      questions: [
        {
          _key: "q1",
          question: "¿A dónde puede ir una lancha privada desde Cartagena?",
          answer: "Las rutas populares incluyen las Islas del Rosario, Cholón, Barú, clubes de playa y bahías de aguas cristalinas adaptadas al clima y al estilo de su grupo."
        },
        {
          _key: "q2",
          question: "¿Cómo elijo la lancha deportiva adecuada?",
          answer: "Millan Experiences recomienda embarcaciones según el número de personas, nivel de confort, itinerario, tipo de celebración y si prefiere un plan relajado o más festivo."
        },
        {
          _key: "q3",
          question: "¿Se pueden coordinar comidas, bebidas o chef privado para el día en lancha?",
          answer: "Sí. El catering, bebidas, reservas en restaurantes de playa, chef a bordo y otros adicionales se planifican con anticipación para una experiencia perfecta."
        },
        {
          _key: "q4",
          question: "¿Son las lanchas ideales para grupos y celebraciones?",
          answer: "Sí. Las lanchas son ideales para cumpleaños, despedidas de soltero/a, viajes familiares, salidas empresariales y paseos privados por las islas."
        }
      ],
      cta: {
        label: "Comenzar planificación",
        href: "/contact"
      }
    }
  },
  "yachts-catamarans": {
    en: {
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
    },
    es: {
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
  }
}

async function run() {
  console.log("🚀 Sincronizando FAQs bilingües en todas las páginas de catálogo (listingPages)...")

  for (const [slug, data] of Object.entries(listingFaqs)) {
    const doc = await client.fetch('*[_type == "listingPage" && slug.current == $slug][0]', { slug })
    if (doc) {
      console.log(`\n📄 Actualizando FAQs para '${slug}' (${doc._id})...`)
      await client
        .patch(doc._id)
        .set({
          "contentEn.seoFaq": data.en,
          "contentEs.seoFaq": data.es,
        })
        .commit()
      console.log(`✅ ${slug} actualizado con éxito.`)
    } else {
      console.warn(`⚠️ No se encontró listingPage con slug: ${slug}`)
    }
  }

  console.log("\n🎉 ¡Todas las páginas de catálogo tienen sus FAQs bilingües configuradas!")
}

run()

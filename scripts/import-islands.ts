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

Boat transfers to and from the private island are scheduled directly with your private concierge.`

const cancellationPolicyEs = `Se requiere un depósito del 50% para confirmar su reserva. Este depósito no es reembolsable.

Si cancela después de hacer la reserva, perderá el depósito pero no tendrá que pagar el 50% restante.

Los traslados en lancha o yate hacia y desde la isla privada se coordinarán directamente con su concierge.`

const standardFaqs = [
  {
    _key: "faq1",
    questionEn: "How do we get to the private island?",
    questionEs: "¿Cómo llegamos a la isla privada?",
    answerEn: "Transportation is arranged via private luxury boat or speedboat from Cartagena's marina directly to the island's dock. Your concierge will coordinate seamless door-to-dock transfers.",
    answerEs: "El transporte se realiza en lancha o yate privado desde el muelle de Cartagena directamente hasta el muelle de la isla. Su concierge coordinará todos los traslados.",
  },
  {
    _key: "faq2",
    questionEn: "Can our meals and private chefs be arranged in advance?",
    questionEs: "¿Se pueden coordinar las comidas y el chef privado con anticipación?",
    answerEn: "Yes! Our private chef services and full grocery provisioning are coordinated prior to your arrival, customized to your exact culinary preferences.",
    answerEs: "¡Sí! Nuestro servicio de chef privado y aprovisionamiento se coordinan antes de su llegada según sus preferencias culinarias.",
  },
  {
    _key: "faq3",
    questionEn: "What staff and amenities are available on the island?",
    questionEs: "¿Qué personal y servicios están disponibles en la isla?",
    answerEn: "Our private islands include dedicated daily on-site staff (butler, housekeeping, maintenance) and water sports equipment, ensuring total comfort and privacy.",
    answerEs: "Nuestras islas privadas cuentan con personal diario en sitio (mayordomo, limpieza y mantenimiento) y equipamiento acuático para una estadía con total privacidad.",
  },
  {
    _key: "faq4",
    questionEn: "Will I have concierge support available during the stay?",
    questionEs: "¿Tendré apoyo de concierge disponible durante la estadía?",
    answerEn: "Yes, your dedicated concierge is available 24/7 to manage additional boat charters, day trips, island hopping, and any special requests.",
    answerEs: "Sí, su concierge dedicado está disponible 24/7 para gestionar salidas en barco, paseos por las islas y cualquier solicitud especial.",
  }
]

const standardComplementary = [
  {
    _key: "exp1",
    titleEn: "Private Transportation & Boat Transfers",
    titleEs: "Transporte Privado y Traslados Náuticos",
    descriptionEn: "Seamless airport pick-ups and luxury boat transfers to and from your private island retreat.",
    descriptionEs: "Recogidas en el aeropuerto y traslados privados en bote hacia y desde su isla privada.",
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
    descriptionEn: "Elevate your stay with our full-service concierge. We handle island provisioning, custom itineraries, and water excursions.",
    descriptionEs: "Eleve su estadía con nuestro concierge completo. Gestionamos compras, itinerarios personalizados y excursiones acuáticas.",
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
    descriptionEn: "Indulge in fresh island seafood and bespoke menus prepared by your dedicated private chef.",
    descriptionEs: "Disfrute de mariscos frescos y menús a medida preparados por su chef privado en la isla.",
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

const islandsData = [
  {
    name: "Isla Del Mar",
    slug: "isla-del-mar",
    location: "Rosario Islands",
    capacity: 16,
    rooms: 7,
    bathrooms: 9,
    amenities: [
      "Wi-Fi",
      "Air conditioning",
      "TV",
      "Pool",
      "Dock access",
      "24/7 Staff"
    ],
    images: [
      { url: "https://www.millan-experiences.com/web/image/2630-f338563d/db137a1e-b284-44ee-bda3-77b3ac98e16e.webp", original_url: "https://www.millan-experiences.com/web/image/2610-aa4a1044/db137a1e-b284-44ee-bda3-77b3ac98e16e.jpg" },
      { url: "https://www.millan-experiences.com/web/image/2653-c0885c4c/42c37c5a-7ee7-4779-85cf-acdd93d61b29.webp", original_url: "https://www.millan-experiences.com/web/image/2611-3e54c420/42c37c5a-7ee7-4779-85cf-acdd93d61b29.jpg" },
      { url: "https://www.millan-experiences.com/web/image/2655-71785675/IMG_1689.webp", original_url: "https://www.millan-experiences.com/web/image/2612-338d83d1/IMG_1689.jpg" },
      { url: "https://www.millan-experiences.com/web/image/2652-71151e4f/IMG_1723.webp", original_url: "https://www.millan-experiences.com/web/image/2613-0ef341ec/IMG_1723.jpg" },
      { url: "https://www.millan-experiences.com/web/image/2656-aead097e/IMG_1633.webp", original_url: "https://www.millan-experiences.com/web/image/2614-8ece9740/IMG_1633.jpg" },
      { url: "https://www.millan-experiences.com/web/image/2658-d2f68778/IMG_1657.webp", original_url: "https://www.millan-experiences.com/web/image/2616-5818ca09/IMG_1657.jpg" },
      { url: "https://www.millan-experiences.com/web/image/2657-6f75c635/IMG_1682.webp", original_url: "https://www.millan-experiences.com/web/image/2617-a50f1aa2/IMG_1682.jpg" },
      { url: "https://www.millan-experiences.com/web/image/2654-2e19fb42/IMG_1536.webp", original_url: "https://www.millan-experiences.com/web/image/2618-025965c6/IMG_1536.jpg" },
      { url: "https://www.millan-experiences.com/web/image/2660-b5761fcf/IMG_1706.webp", original_url: "https://www.millan-experiences.com/web/image/2619-361d97a6/IMG_1706.jpg" },
      { url: "https://www.millan-experiences.com/web/image/2667-58d6c563/IMG_1671.webp", original_url: "https://www.millan-experiences.com/web/image/2620-3480335e/IMG_1671.jpg" },
      { url: "https://www.millan-experiences.com/web/image/2661-f75790f5/IMG_1608.webp", original_url: "https://www.millan-experiences.com/web/image/2621-a1ec6251/IMG_1608.jpg" },
      { url: "https://www.millan-experiences.com/web/image/2666-b76ccea5/IMG_1563.webp", original_url: "https://www.millan-experiences.com/web/image/2622-d6519d40/IMG_1563.jpg" },
      { url: "https://www.millan-experiences.com/web/image/2663-af77e4f4/IMG_1724.webp", original_url: "https://www.millan-experiences.com/web/image/2623-16bc9221/IMG_1724.jpg" },
      { url: "https://www.millan-experiences.com/web/image/2659-dfed3dd6/IMG_1564.webp", original_url: "https://www.millan-experiences.com/web/image/2624-2028d8fc/IMG_1564.jpg" },
      { url: "https://www.millan-experiences.com/web/image/2665-efb78b00/IMG_1695.webp", original_url: "https://www.millan-experiences.com/web/image/2625-6f58f0ca/IMG_1695.jpg" },
      { url: "https://www.millan-experiences.com/web/image/2664-8fa6d39e/IMG_1713.webp", original_url: "https://www.millan-experiences.com/web/image/2626-d50ce81b/IMG_1713.jpg" },
      { url: "https://www.millan-experiences.com/web/image/2668-b30a65ff/IMG_1610.webp", original_url: "https://www.millan-experiences.com/web/image/2627-d6823827/IMG_1610.jpg" },
      { url: "https://www.millan-experiences.com/web/image/2662-d74d4eeb/IMG_1524.webp", original_url: "https://www.millan-experiences.com/web/image/2628-569e5395/IMG_1524.jpg" },
      { url: "https://www.millan-experiences.com/web/image/2669-90574e00/IMG_1645.webp", original_url: "https://www.millan-experiences.com/web/image/2629-d1b72bca/IMG_1645.jpg" }
    ]
  },
  {
    name: "Isla Coco",
    slug: "isla-coco",
    location: "Rosario Islands",
    capacity: 18,
    rooms: 7,
    bathrooms: 18.5,
    amenities: [
      "Tennis Court",
      "Pool",
      "Wi-Fi",
      "Air conditioning",
      "Dock access",
      "24/7 Staff"
    ],
    images: [
      { url: "https://www.millan-experiences.com/web/image/2606-394106a1/Captura%20de%20pantalla%202026-05-06%20133537.webp", original_url: "https://www.millan-experiences.com/web/image/2584-f5046810/Captura%20de%20pantalla%202026-05-06%20133537.png" },
      { url: "https://www.millan-experiences.com/web/image/2609-77fe65cc/ChatGPT%20Image%206%20may%202026%2C%2001_46_44%20p.m..webp", original_url: "https://www.millan-experiences.com/web/image/2608-7a6469e3/ChatGPT%20Image%206%20may%202026%2C%2001_46_44%20p.m..png" },
      { url: "https://www.millan-experiences.com/web/image/2599-260e118f/Captura%20de%20pantalla%202026-05-06%20133305.webp", original_url: "https://www.millan-experiences.com/web/image/2586-e31113a8/Captura%20de%20pantalla%202026-05-06%20133305.png" },
      { url: "https://www.millan-experiences.com/web/image/2597-b8221044/Captura%20de%20pantalla%202026-05-06%20124056.webp", original_url: "https://www.millan-experiences.com/web/image/2587-176609d5/Captura%20de%20pantalla%202026-05-06%20124056.png" },
      { url: "https://www.millan-experiences.com/web/image/2598-cd18b4db/Captura%20de%20pantalla%202026-05-06%20133352.webp", original_url: "https://www.millan-experiences.com/web/image/2588-cbcfcad2/Captura%20de%20pantalla%202026-05-06%20133352.png" },
      { url: "https://www.millan-experiences.com/web/image/2600-2c5aa1f4/Captura%20de%20pantalla%202026-05-06%20124146.webp", original_url: "https://www.millan-experiences.com/web/image/2589-1c2fd507/Captura%20de%20pantalla%202026-05-06%20124146.png" },
      { url: "https://www.millan-experiences.com/web/image/2601-3f0372ff/Captura%20de%20pantalla%202026-05-06%20124225.webp", original_url: "https://www.millan-experiences.com/web/image/2590-f105436e/Captura%20de%20pantalla%202026-05-06%20124225.png" },
      { url: "https://www.millan-experiences.com/web/image/2602-c1036083/Captura%20de%20pantalla%202026-05-06%20132516.webp", original_url: "https://www.millan-experiences.com/web/image/2591-743e00eb/Captura%20de%20pantalla%202026-05-06%20132516.png" },
      { url: "https://www.millan-experiences.com/web/image/2603-f3ee623c/Captura%20de%20pantalla%202026-05-06%20123443.webp", original_url: "https://www.millan-experiences.com/web/image/2592-315d5cfe/Captura%20de%20pantalla%202026-05-06%20123443.png" },
      { url: "https://www.millan-experiences.com/web/image/2604-13207f97/Captura%20de%20pantalla%202026-05-06%20133137.webp", original_url: "https://www.millan-experiences.com/web/image/2593-8e93506d/Captura%20de%20pantalla%202026-05-06%20133137.png" },
      { url: "https://www.millan-experiences.com/web/image/2605-6ce28bdd/Captura%20de%20pantalla%202026-05-06%20132844.webp", original_url: "https://www.millan-experiences.com/web/image/2594-28a95cd4/Captura%20de%20pantalla%202026-05-06%20132844.png" }
    ]
  },
  {
    name: "Isla Amores",
    slug: "isla-amores",
    location: "Rosario Islands",
    capacity: 14,
    rooms: 5,
    bathrooms: 6,
    amenities: [
      "Pool",
      "Dining tables in different areas",
      "Covered kiosk with a bar",
      "Island gym",
      "Spa",
      "Day beds",
      "Wi-Fi",
      "Air conditioning",
      "Dock access",
      "24/7 Staff"
    ],
    images: [
      { url: "https://www.millan-experiences.com/web/image/2536-d48088dd/Captura%20de%20pantalla%202026-05-05%20191404.webp", original_url: "https://www.millan-experiences.com/web/image/2528-24190140/Captura%20de%20pantalla%202026-05-05%20191404.png" },
      { url: "https://www.millan-experiences.com/web/image/2537-95a03b54/Captura%20de%20pantalla%202026-05-05%20191118.webp", original_url: "https://www.millan-experiences.com/web/image/2529-fc9b0d7f/Captura%20de%20pantalla%202026-05-05%20191118.png" },
      { url: "https://www.millan-experiences.com/web/image/2543-e8ba5f89/Captura%20de%20pantalla%202026-05-05%20190512.webp", original_url: "https://www.millan-experiences.com/web/image/2530-98eaf08e/Captura%20de%20pantalla%202026-05-05%20190512.png" },
      { url: "https://www.millan-experiences.com/web/image/2539-0dd9e20f/Captura%20de%20pantalla%202026-05-05%20190333.webp", original_url: "https://www.millan-experiences.com/web/image/2531-3c76a492/Captura%20de%20pantalla%202026-05-05%20190333.png" },
      { url: "https://www.millan-experiences.com/web/image/2542-36386de0/Captura%20de%20pantalla%202026-05-05%20190427.webp", original_url: "https://www.millan-experiences.com/web/image/2532-546f6f1b/Captura%20de%20pantalla%202026-05-05%20190427.png" },
      { url: "https://www.millan-experiences.com/web/image/2538-af16305c/Captura%20de%20pantalla%202026-05-05%20191205.webp", original_url: "https://www.millan-experiences.com/web/image/2533-2746aa2c/Captura%20de%20pantalla%202026-05-05%20191205.png" },
      { url: "https://www.millan-experiences.com/web/image/2540-2d57553d/Captura%20de%20pantalla%202026-05-05%20190239.webp", original_url: "https://www.millan-experiences.com/web/image/2534-0b8d1d86/Captura%20de%20pantalla%202026-05-05%20190239.png" },
      { url: "https://www.millan-experiences.com/web/image/2541-b479b65a/Captura%20de%20pantalla%202026-05-05%20191259.webp", original_url: "https://www.millan-experiences.com/web/image/2535-a4fa125b/Captura%20de%20pantalla%202026-05-05%20191259.png" },
      { url: "https://www.millan-experiences.com/web/image/2546-1582fb1e/Captura%20de%20pantalla%202026-05-06%20112757.webp", original_url: "https://www.millan-experiences.com/web/image/2544-d04f1c69/Captura%20de%20pantalla%202026-05-06%20112757.png" },
      { url: "https://www.millan-experiences.com/web/image/2547-61697424/Captura%20de%20pantalla%202026-05-06%20112833.webp", original_url: "https://www.millan-experiences.com/web/image/2545-7596121c/Captura%20de%20pantalla%202026-05-06%20112833.png" }
    ]
  },
  {
    name: "Isla Boni",
    slug: "isla-boni",
    location: "Rosario Islands",
    capacity: 17,
    rooms: 6,
    bathrooms: 6.5,
    amenities: [
      "Wi-Fi",
      "Air conditioning",
      "Pool",
      "Dock access",
      "24/7 Staff",
      "Ocean view"
    ],
    images: [
      { url: "https://www.millan-experiences.com/web/image/2579-e10b6c57/DSC04733-HDR.webp", original_url: "https://www.millan-experiences.com/web/image/2564-bea0ef13/DSC04733-HDR.jpg" },
      { url: "https://www.millan-experiences.com/web/image/2577-e5f49ab2/DSC05145-HDR.webp", original_url: "https://www.millan-experiences.com/web/image/2563-f97627ea/DSC05145-HDR.jpg" },
      { url: "https://www.millan-experiences.com/web/image/2581-1369205a/DSC04645.webp", original_url: "https://www.millan-experiences.com/web/image/2566-a5d3a14e/DSC04645.jpg" },
      { url: "https://www.millan-experiences.com/web/image/2576-c06a1ed0/DSC04790-HDR.webp", original_url: "https://www.millan-experiences.com/web/image/2555-3a9b2636/DSC04790-HDR.jpg" },
      { url: "https://www.millan-experiences.com/web/image/2572-e6dfb255/DSC04744-HDR.webp", original_url: "https://www.millan-experiences.com/web/image/2556-e4d490f7/DSC04744-HDR.jpg" },
      { url: "https://www.millan-experiences.com/web/image/2571-b9104401/DSC04924-HDR.webp", original_url: "https://www.millan-experiences.com/web/image/2558-b5dd7d36/DSC04924-HDR.jpg" },
      { url: "https://www.millan-experiences.com/web/image/2569-97e43c0a/DSC04993-HDR.webp", original_url: "https://www.millan-experiences.com/web/image/2560-94b0500f/DSC04993-HDR.jpg" },
      { url: "https://www.millan-experiences.com/web/image/2578-a071a921/DSC04677-HDR.webp", original_url: "https://www.millan-experiences.com/web/image/2561-2d32ead3/DSC04677-HDR.jpg" },
      { url: "https://www.millan-experiences.com/web/image/2580-56dad3c0/DSC05101-HDR.webp", original_url: "https://www.millan-experiences.com/web/image/2567-e0aa8f18/DSC05101-HDR.jpg" },
      { url: "https://www.millan-experiences.com/web/image/2582-90129ae6/DSC04654-HDR.webp", original_url: "https://www.millan-experiences.com/web/image/2568-f8af1fd1/DSC04654-HDR.jpg" }
    ]
  },
  {
    name: "Isla Tamba",
    slug: "isla-tamba",
    location: "Rosario Islands",
    capacity: 20,
    rooms: 7,
    bathrooms: 9,
    amenities: [
      "Pool",
      "Jacuzzi",
      "Kayak",
      "Gym",
      "Wi-Fi",
      "Air conditioning",
      "Dock access",
      "24/7 Staff"
    ],
    images: [
      { url: "https://www.millan-experiences.com/web/image/2694-d5d5dfe5/Matamba.webp", original_url: "https://www.millan-experiences.com/web/image/2680-1e91e909/Matamba.jpg" },
      { url: "https://www.millan-experiences.com/web/image/2693-b772f724/Caban%CC%83a.webp", original_url: "https://www.millan-experiences.com/web/image/2681-dee48deb/Caban%CC%83a.jpg" },
      { url: "https://www.millan-experiences.com/web/image/2695-0053a3ad/muelle4.webp", original_url: "https://www.millan-experiences.com/web/image/2682-fc76633b/muelle4.jpg" },
      { url: "https://www.millan-experiences.com/web/image/2696-cf507eca/panoramica3.webp", original_url: "https://www.millan-experiences.com/web/image/2683-9190221d/panoramica3.jpg" },
      { url: "https://www.millan-experiences.com/web/image/2700-fc0d1fa3/panoramica.webp", original_url: "https://www.millan-experiences.com/web/image/2684-ea5fc9e4/panoramica.jpg" },
      { url: "https://www.millan-experiences.com/web/image/2699-5aa5a531/jacuzzi.webp", original_url: "https://www.millan-experiences.com/web/image/2685-7bb48436/jacuzzi.jpg" },
      { url: "https://www.millan-experiences.com/web/image/2697-40d853ba/salon.webp", original_url: "https://www.millan-experiences.com/web/image/2686-de712ad1/salon.jpg" },
      { url: "https://www.millan-experiences.com/web/image/2698-ccb3e1fc/comedor.webp", original_url: "https://www.millan-experiences.com/web/image/2687-77905efc/comedor.jpg" },
      { url: "https://www.millan-experiences.com/web/image/2701-d307ce90/piscina%284%29.webp", original_url: "https://www.millan-experiences.com/web/image/2688-3150ae9b/piscina%284%29.jpg" },
      { url: "https://www.millan-experiences.com/web/image/2703-bc2d91ed/gym.webp", original_url: "https://www.millan-experiences.com/web/image/2689-578659b7/gym.jpg" },
      { url: "https://www.millan-experiences.com/web/image/2702-66938c9f/deck.webp", original_url: "https://www.millan-experiences.com/web/image/2690-192ac490/deck.jpg" },
      { url: "https://www.millan-experiences.com/web/image/2704-e6c56796/cancha.webp", original_url: "https://www.millan-experiences.com/web/image/2691-8c91c93c/cancha.jpg" },
      { url: "https://www.millan-experiences.com/web/image/2705-16c93c1f/piscina2.webp", original_url: "https://www.millan-experiences.com/web/image/2692-2d64ce1d/piscina2.jpg" }
    ]
  },
  {
    name: "Isla Mambo",
    slug: "isla-mambo",
    location: "Rosario Islands",
    capacity: 14,
    rooms: 7,
    bathrooms: 7,
    amenities: [
      "Wi-Fi",
      "Air conditioning",
      "TV",
      "Pool",
      "Dock access",
      "24/7 Staff"
    ],
    images: [
      { url: "https://www.millan-experiences.com/web/image/2673-3f36e59a/ChatGPT%20Image%205%20may%202026%2C%2003_10_31%20p.m..webp", original_url: "https://www.millan-experiences.com/web/image/2489-78789d57/ChatGPT%20Image%205%20may%202026%2C%2003_10_31%20p.m..png" },
      { url: "https://www.millan-experiences.com/web/image/2507-1346967a/CALA%20MAMBO4.webp", original_url: "https://www.millan-experiences.com/web/image/2491-e42ad998/CALA%20MAMBO4.png" },
      { url: "https://www.millan-experiences.com/web/image/2515-400f80b3/CALA%20MAMBO5.webp", original_url: "https://www.millan-experiences.com/web/image/2492-a9ecd964/CALA%20MAMBO5.png" },
      { url: "https://www.millan-experiences.com/web/image/2506-1ed452d3/CALA%20MAMBO6.webp", original_url: "https://www.millan-experiences.com/web/image/2493-ccb0dfd0/CALA%20MAMBO6.png" },
      { url: "https://www.millan-experiences.com/web/image/2514-fa13fb97/CALA%20MAMBO7.webp", original_url: "https://www.millan-experiences.com/web/image/2494-29655885/CALA%20MAMBO7.png" },
      { url: "https://www.millan-experiences.com/web/image/2511-b70e0e55/CALA%20MAMBO10.webp", original_url: "https://www.millan-experiences.com/web/image/2497-9a67ea6b/CALA%20MAMBO10.png" },
      { url: "https://www.millan-experiences.com/web/image/2510-6cf7be6a/CALA%20MAMBO11.webp", original_url: "https://www.millan-experiences.com/web/image/2498-8242188d/CALA%20MAMBO11.png" },
      { url: "https://www.millan-experiences.com/web/image/2513-5ab90142/CALA%20MAMBO9.webp", original_url: "https://www.millan-experiences.com/web/image/2499-fdb06b3b/CALA%20MAMBO9.png" },
      { url: "https://www.millan-experiences.com/web/image/2512-23ad3d15/CALA%20MAMBO13.webp", original_url: "https://www.millan-experiences.com/web/image/2500-a981f077/CALA%20MAMBO13.png" },
      { url: "https://www.millan-experiences.com/web/image/2516-267abe45/CALA%20MAMBO15.webp", original_url: "https://www.millan-experiences.com/web/image/2501-2faf867b/CALA%20MAMBO15.png" },
      { url: "https://www.millan-experiences.com/web/image/2518-3b42a117/CALA%20MAMBO14.webp", original_url: "https://www.millan-experiences.com/web/image/2502-d997b445/CALA%20MAMBO14.png" },
      { url: "https://www.millan-experiences.com/web/image/2519-e6e7c289/CALA%20MAMBO17.webp", original_url: "https://www.millan-experiences.com/web/image/2503-c5731b7c/CALA%20MAMBO17.png" },
      { url: "https://www.millan-experiences.com/web/image/2520-dffa1501/CALA%20MAMBO16.webp", original_url: "https://www.millan-experiences.com/web/image/2504-76802f35/CALA%20MAMBO16.png" }
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
      const cleanName = filename || currentUrl.split('/').pop() || 'island-image.jpg'
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
  console.log(`🌴 Iniciando carga de ${islandsData.length} islas privadas en Sanity...`)

  for (const island of islandsData) {
    console.log(`\n========================================`)
    console.log(`🏝️ Procesando ${island.name} (${island.slug})...`)
    console.log(`   Descargando y subiendo ${island.images.length} imágenes...`)

    const uploadedAssets: any[] = []
    for (let i = 0; i < island.images.length; i++) {
      const img = island.images[i]
      const asset = await downloadAndUploadImage(img.url, img.original_url, `${island.slug}-${i + 1}.jpg`)
      if (asset) {
        uploadedAssets.push(asset)
        process.stdout.write(`   [${i + 1}/${island.images.length}] ✓ `)
      } else {
        process.stdout.write(`   [${i + 1}/${island.images.length}] ✗ `)
      }
    }
    console.log(`\n   Subidas exitosamente: ${uploadedAssets.length}/${island.images.length}`)

    if (uploadedAssets.length === 0) {
      console.error(`❌ No se pudieron cargar imágenes para ${island.name}`)
      continue
    }

    const mainImageAsset = uploadedAssets[0]
    const galleryAssets = uploadedAssets.slice(1)

    // Buscar si ya existe el documento
    const existing = await client.fetch('*[_type == "private-islands" && slug.current == $slug][0]', { slug: island.slug })

    const docData: any = {
      _type: 'private-islands',
      title: island.name,
      slug: {
        _type: 'slug',
        current: island.slug
      },
      details: {
        location: island.location,
        capacity: island.capacity,
        rooms: island.rooms,
        bathrooms: island.bathrooms,
      },
      amenities: island.amenities,
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
      console.log(`   ✅ ${island.name} actualizado.`)
    } else {
      console.log(`   Creando nuevo documento en Sanity...`)
      const created = await client.create(docData)
      console.log(`   ✅ ${island.name} creado con ID: ${created._id}`)
    }
  }

  console.log(`\n🎉 ¡Todas las islas privadas han sido subidas y sincronizadas con éxito en Sanity!`)
}

run()

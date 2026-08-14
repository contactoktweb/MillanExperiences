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

const villasData = [
  {
    "name": "Casa Carlo",
    "type": "Luxury Villa",
    "category": "Private Villas",
    "location": "Historic Center",
    "capacity": {
      "guests": 15,
      "original": "15 pax"
    },
    "rooms": 7,
    "bathrooms": 7.5,
    "amenities": [
      "Rooftop pool",
      "24/7 Staff",
      "BBQ area",
      "Mini Spa Area"
    ],
    "images": [
      {
        "url": "https://www.millan-experiences.com/web/image/2262-5b89090b/WhatsApp%20Image%202026-04-27%20at%207.32.56%20PM.webp",
        "original_url": "https://www.millan-experiences.com/web/image/2258-a1195ce5/WhatsApp%20Image%202026-04-27%20at%207.32.56%20PM.jpeg"
      },
      {
        "url": "https://www.millan-experiences.com/web/image/2260-321659d4/WhatsApp%20Image%202026-04-27%20at%207.32.55%20PM%20%281%29.webp",
        "original_url": "https://www.millan-experiences.com/web/image/2252-9d1ef815/WhatsApp%20Image%202026-04-27%20at%207.32.55%20PM%20%281%29.jpeg"
      },
      {
        "url": "https://www.millan-experiences.com/web/image/2259-6b59722d/WhatsApp%20Image%202026-04-27%20at%207.32.56%20PM%20%284%29.webp",
        "original_url": "https://www.millan-experiences.com/web/image/2251-d4df4749/WhatsApp%20Image%202026-04-27%20at%207.32.56%20PM%20%284%29.jpeg"
      },
      {
        "url": "https://www.millan-experiences.com/web/image/2261-28369680/WhatsApp%20Image%202026-04-27%20at%207.32.56%20PM%20%2811%29.webp",
        "original_url": "https://www.millan-experiences.com/web/image/2253-b8244a67/WhatsApp%20Image%202026-04-27%20at%207.32.56%20PM%20%2811%29.jpeg"
      },
      {
        "url": "https://www.millan-experiences.com/web/image/2263-6b94b97b/WhatsApp%20Image%202026-04-27%20at%207.36.31%20PM.webp",
        "original_url": "https://www.millan-experiences.com/web/image/2254-2f1232ed/WhatsApp%20Image%202026-04-27%20at%207.36.31%20PM.jpeg"
      },
      {
        "url": "https://www.millan-experiences.com/web/image/2266-fbda947e/WhatsApp%20Image%202026-04-27%20at%207.32.56%20PM%20%289%29.webp",
        "original_url": "https://www.millan-experiences.com/web/image/2255-8db1b793/WhatsApp%20Image%202026-04-27%20at%207.32.56%20PM%20%289%29.jpeg"
      },
      {
        "url": "https://www.millan-experiences.com/web/image/2265-957c5d89/WhatsApp%20Image%202026-04-27%20at%207.32.56%20PM%20%283%29.webp",
        "original_url": "https://www.millan-experiences.com/web/image/2256-6467105b/WhatsApp%20Image%202026-04-27%20at%207.32.56%20PM%20%283%29.jpeg"
      },
      {
        "url": "https://www.millan-experiences.com/web/image/2264-20719bcd/WhatsApp%20Image%202026-04-27%20at%207.32.56%20PM%20%2812%29.webp",
        "original_url": "https://www.millan-experiences.com/web/image/2257-f87ec4de/WhatsApp%20Image%202026-04-27%20at%207.32.56%20PM%20%2812%29.jpeg"
      }
    ]
  },
  {
    "name": "Casa Clinton",
    "type": "Luxury Villa",
    "category": "Private Villas",
    "location": "Historic Center",
    "capacity": {
      "guests": 8,
      "original": "8 pax"
    },
    "rooms": 4,
    "bathrooms": 6,
    "amenities": [
      "Elevator",
      "Wine cellar",
      "Rooftop pool",
      "BBQ area",
      "Rooftop bar"
    ],
    "images": [
      {
        "url": "https://www.millan-experiences.com/web/image/2305-8f71d815/Comedor-exterior-en-terraza-superior-con-vistas-a-los-tejados-coloniales-y-arquitectura-de-ciudad-historica.webp",
        "original_url": "https://www.millan-experiences.com/web/image/2285-cf721055/Comedor-exterior-en-terraza-superior-con-vistas-a-los-tejados-coloniales-y-arquitectura-de-ciudad-historica.webp"
      },
      {
        "url": "https://www.millan-experiences.com/web/image/2306-25b80daf/Comedor-formal-elegante-para-grupos-grandes-con-mesa-de-madera-maciza-sillas-tapizadas-y-decoracion-de-alta-gama.webp",
        "original_url": "https://www.millan-experiences.com/web/image/2287-0bea6f8b/Comedor-formal-elegante-para-grupos-grandes-con-mesa-de-madera-maciza-sillas-tapizadas-y-decoracion-de-alta-gama.webp"
      },
      {
        "url": "https://www.millan-experiences.com/web/image/2308-385c2964/Fachada-historica-de-Casa-Estrada-con-balcones-coloniales-de-madera-paredes-blancas-y-puertas-de-epoca.webp",
        "original_url": "https://www.millan-experiences.com/web/image/2289-e4df1edd/Fachada-historica-de-Casa-Estrada-con-balcones-coloniales-de-madera-paredes-blancas-y-puertas-de-epoca.webp"
      },
      {
        "url": "https://www.millan-experiences.com/web/image/2310-e5e7d7c0/Patio-central-de-estilo-espanol-con-fuente-moderna-columnas-de-piedra-tallada-y-balcones-de-madera-tradicionales.webp",
        "original_url": "https://www.millan-experiences.com/web/image/2291-0a3cc5e3/Patio-central-de-estilo-espanol-con-fuente-moderna-columnas-de-piedra-tallada-y-balcones-de-madera-tradicionales.webp"
      },
      {
        "url": "https://www.millan-experiences.com/web/image/2307-1def5021/Piscina-tipo-carril-en-azotea-con-muro-de-piedra-natural-fuentes-de-agua-integradas-y-zona-de-relax.webp",
        "original_url": "https://www.millan-experiences.com/web/image/2293-08af2ae4/Piscina-tipo-carril-en-azotea-con-muro-de-piedra-natural-fuentes-de-agua-integradas-y-zona-de-relax.webp"
      },
      {
        "url": "https://www.millan-experiences.com/web/image/2309-4bb0706e/Primer-plano-de-mesa-de-banquete-de-lujo-con-arreglos-florales-de-hortensias-cristaleria-fina-y-candelabros-elegantes.webp",
        "original_url": "https://www.millan-experiences.com/web/image/2295-94346445/Primer-plano-de-mesa-de-banquete-de-lujo-con-arreglos-florales-de-hortensias-cristaleria-fina-y-candelabros-elegantes.webp"
      },
      {
        "url": "https://www.millan-experiences.com/web/image/2311-a4431e22/Salon-de-estar-colonial-con-mobiliario-de-epoca-lamparas-de-arana-de-cristal-y-techos-de-madera-oscura-tallada.webp",
        "original_url": "https://www.millan-experiences.com/web/image/2297-cef1e232/Salon-de-estar-colonial-con-mobiliario-de-epoca-lamparas-de-arana-de-cristal-y-techos-de-madera-oscura-tallada.webp"
      },
      {
        "url": "https://www.millan-experiences.com/web/image/2312-eeefb890/Solarium-de-lujo-en-azotea-con-tumbonas-blancas-sombrilla-y-plantas-ornamentales-bajo-un-cielo-despejado.webp",
        "original_url": "https://www.millan-experiences.com/web/image/2299-a7df55ba/Solarium-de-lujo-en-azotea-con-tumbonas-blancas-sombrilla-y-plantas-ornamentales-bajo-un-cielo-despejado.webp"
      },
      {
        "url": "https://www.millan-experiences.com/web/image/2313-084e26d8/Vista-de-calle-de-la-propiedad-colonial-resaltando-los-grandes-portones-de-madera-noble.webp",
        "original_url": "https://www.millan-experiences.com/web/image/2301-c254f696/Vista-de-calle-de-la-propiedad-colonial-resaltando-los-grandes-portones-de-madera-noble.webp"
      }
    ]
  },
  {
    "name": "Casa Eliza",
    "type": "Luxury Villa",
    "category": "Private Villas",
    "location": "Historic Center",
    "capacity": {
      "guests": 16,
      "original": "16 pax"
    },
    "rooms": 6,
    "bathrooms": 8,
    "amenities": [
      "Unique pool",
      "Rooftop jacuzzi"
    ],
    "images": [
      {
        "url": "https://www.millan-experiences.com/web/image/2331-203dfb8a/0ae1a680-34b8-4897-8d1c-ce858ade0d55.webp",
        "original_url": "https://www.millan-experiences.com/web/image/2318-0fef05e7/0ae1a680-34b8-4897-8d1c-ce858ade0d55.jpeg"
      },
      {
        "url": "https://www.millan-experiences.com/web/image/3087-368d582f/Screenshot%202026-06-05%20at%2012.20.55%E2%80%AFAM.webp",
        "original_url": "https://www.millan-experiences.com/web/image/3085-715bafdf/Screenshot%202026-06-05%20at%2012.20.55%E2%80%AFAM.png"
      },
      {
        "url": "https://www.millan-experiences.com/web/image/2328-23925a63/9eed7c95-3ebd-44a0-8cca-1c71860655cd.webp",
        "original_url": "https://www.millan-experiences.com/web/image/2319-20dd9e7f/9eed7c95-3ebd-44a0-8cca-1c71860655cd.jpeg"
      },
      {
        "url": "https://www.millan-experiences.com/web/image/2327-755d8318/2716c140-7959-4a03-9e42-09d92bc6badf.webp",
        "original_url": "https://www.millan-experiences.com/web/image/2320-7b262da5/2716c140-7959-4a03-9e42-09d92bc6badf.jpeg"
      },
      {
        "url": "https://www.millan-experiences.com/web/image/2329-2305d785/5154db41-ac93-47ae-a108-804580a940ae.webp",
        "original_url": "https://www.millan-experiences.com/web/image/2321-8e51e275/5154db41-ac93-47ae-a108-804580a940ae.jpeg"
      },
      {
        "url": "https://www.millan-experiences.com/web/image/2332-e816e0d7/626460556.webp",
        "original_url": "https://www.millan-experiences.com/web/image/2323-c10e2767/626460556.jpg"
      },
      {
        "url": "https://www.millan-experiences.com/web/image/2333-e4896d75/de8e63bc-058e-4f75-a456-bd3ac9eddec1.webp",
        "original_url": "https://www.millan-experiences.com/web/image/2324-a698f14a/de8e63bc-058e-4f75-a456-bd3ac9eddec1.jpeg"
      },
      {
        "url": "https://www.millan-experiences.com/web/image/3086-368d582f/Screenshot%202026-06-05%20at%2012.20.55%E2%80%AFAM.webp",
        "original_url": "https://www.millan-experiences.com/web/image/3085-715bafdf/Screenshot%202026-06-05%20at%2012.20.55%E2%80%AFAM.png"
      }
    ]
  },
  {
    "name": "Casa Kaki",
    "type": "Luxury Villa",
    "category": "Private Villas",
    "location": "Getsemaní",
    "capacity": {
      "guests": 12,
      "original": "12 pax"
    },
    "rooms": 6,
    "bathrooms": 7,
    "amenities": [
      "2 pools",
      "Outdoor Projector",
      "24/7 Staff",
      "BBQ area"
    ],
    "images": [
      {
        "url": "https://www.millan-experiences.com/web/image/2346-905c3327/eb72e9ec-517f-42b1-a84a-b3a0395d3182.webp",
        "original_url": "https://www.millan-experiences.com/web/image/2344-fbce55d2/eb72e9ec-517f-42b1-a84a-b3a0395d3182.jpeg"
      },
      {
        "url": "https://www.millan-experiences.com/web/image/2347-d14adf3c/ad5e4902-38cf-456a-bfd3-896b2eebc218.webp",
        "original_url": "https://www.millan-experiences.com/web/image/2335-307d53dd/ad5e4902-38cf-456a-bfd3-896b2eebc218.jpeg"
      },
      {
        "url": "https://www.millan-experiences.com/web/image/2350-66ecbdb1/36ee0b7e-d082-43f6-8a3f-541e473113ac.webp",
        "original_url": "https://www.millan-experiences.com/web/image/2336-3ecbf980/36ee0b7e-d082-43f6-8a3f-541e473113ac.webp"
      },
      {
        "url": "https://www.millan-experiences.com/web/image/2351-38c5a4d1/4ad52dc8-bd3d-4e5e-a6b3-e27db25a95db.webp",
        "original_url": "https://www.millan-experiences.com/web/image/2340-4ba116be/4ad52dc8-bd3d-4e5e-a6b3-e27db25a95db.jpeg"
      },
      {
        "url": "https://www.millan-experiences.com/web/image/2352-d7900c0c/3cd953b5-f18b-4239-aaa2-a8bde6cbaf38.webp",
        "original_url": "https://www.millan-experiences.com/web/image/2341-2faa13c9/3cd953b5-f18b-4239-aaa2-a8bde6cbaf38.jpeg"
      },
      {
        "url": "https://www.millan-experiences.com/web/image/2353-48b600aa/321f2352-3c17-4a3a-b736-bc0dc9c86a6f.webp",
        "original_url": "https://www.millan-experiences.com/web/image/2342-637c2f6d/321f2352-3c17-4a3a-b736-bc0dc9c86a6f.jpeg"
      },
      {
        "url": "https://www.millan-experiences.com/web/image/2349-9d7f2045/d738e32c-4790-47be-af73-7ba033835a56.webp",
        "original_url": "https://www.millan-experiences.com/web/image/2343-a377ac4b/d738e32c-4790-47be-af73-7ba033835a56.jpeg"
      },
      {
        "url": "https://www.millan-experiences.com/web/image/2354-055322e5/d900d6a4-ee4f-4690-82bf-417f524702e6.webp",
        "original_url": "https://www.millan-experiences.com/web/image/2345-46a5b333/d900d6a4-ee4f-4690-82bf-417f524702e6.jpeg"
      }
    ]
  },
  {
    "name": "Casa Alas",
    "type": "Luxury Villa",
    "category": "Private Villas",
    "location": "Getsemani",
    "capacity": {
      "guests": 10,
      "original": "10 pax"
    },
    "rooms": 4,
    "bathrooms": 5,
    "amenities": [
      "Rooftop pool",
      "24/7 Staff",
      "BBQ area",
      "Rooftop bar"
    ],
    "images": [
      {
        "url": "https://www.millan-experiences.com/web/image/2402-182c0565/WhatsApp%20Image%202026-04-28%20at%202.22.37%20PM%20%282%29.webp",
        "original_url": "https://www.millan-experiences.com/web/image/2393-b28e3d60/WhatsApp%20Image%202026-04-28%20at%202.22.37%20PM%20%282%29.jpeg"
      },
      {
        "url": "https://www.millan-experiences.com/web/image/2404-9b36c6b1/WhatsApp%20Image%202026-04-28%20at%202.22.37%20PM%20%281%29.webp",
        "original_url": "https://www.millan-experiences.com/web/image/2395-b7a5c897/WhatsApp%20Image%202026-04-28%20at%202.22.37%20PM%20%281%29.jpeg"
      },
      {
        "url": "https://www.millan-experiences.com/web/image/2409-60cfe7b2/WhatsApp%20Image%202026-04-28%20at%202.04.15%20PM.webp",
        "original_url": "https://www.millan-experiences.com/web/image/2401-35c9c4e5/WhatsApp%20Image%202026-04-28%20at%202.04.15%20PM.jpeg"
      },
      {
        "url": "https://www.millan-experiences.com/web/image/2407-ff753cc3/WhatsApp%20Image%202026-04-28%20at%202.22.38%20PM%20%283%29.webp",
        "original_url": "https://www.millan-experiences.com/web/image/2396-2e9d6469/WhatsApp%20Image%202026-04-28%20at%202.22.38%20PM%20%283%29.jpeg"
      },
      {
        "url": "https://www.millan-experiences.com/web/image/2403-41c7b2a2/WhatsApp%20Image%202026-04-28%20at%202.04.16%20PM%20%283%29.webp",
        "original_url": "https://www.millan-experiences.com/web/image/2394-61046e6d/WhatsApp%20Image%202026-04-28%20at%202.04.16%20PM%20%283%29.jpeg"
      },
      {
        "url": "https://www.millan-experiences.com/web/image/2406-5b7fe6a3/WhatsApp%20Image%202026-04-28%20at%202.22.39%20PM%20%282%29.webp",
        "original_url": "https://www.millan-experiences.com/web/image/2397-9f0b5464/WhatsApp%20Image%202026-04-28%20at%202.22.39%20PM%20%282%29.jpeg"
      },
      {
        "url": "https://www.millan-experiences.com/web/image/2405-d18f7b4c/WhatsApp%20Image%202026-04-28%20at%202.22.40%20PM%20%281%29.webp",
        "original_url": "https://www.millan-experiences.com/web/image/2399-b2c532a0/WhatsApp%20Image%202026-04-28%20at%202.22.40%20PM%20%281%29.jpeg"
      },
      {
        "url": "https://www.millan-experiences.com/web/image/2408-f9d885ff/WhatsApp%20Image%202026-04-28%20at%202.32.38%20PM%20%283%29.webp",
        "original_url": "https://www.millan-experiences.com/web/image/2400-3680cda1/WhatsApp%20Image%202026-04-28%20at%202.32.38%20PM%20%283%29.jpeg"
      }
    ]
  },
  {
    "name": "Casa Macondo",
    "type": "Luxury Villa",
    "category": "Private Villas",
    "location": "Historic Center",
    "capacity": {
      "guests": 6,
      "original": "6 pax"
    },
    "rooms": 3,
    "bathrooms": 5,
    "amenities": [
      "Rooftop pool",
      "24/7 Staff"
    ],
    "virrey_eslava_amenities": [
      "Four Jacuzzis",
      "Adult pool and kids pool",
      "Sauna and steam room",
      "Massage room",
      "BBQ area",
      "Private security"
    ],
    "images": [
      {
        "url": "https://www.millan-experiences.com/web/image/2482-ccb4ba6e/Captura%20de%20pantalla%202026-05-05%20132636.webp",
        "original_url": "https://www.millan-experiences.com/web/image/2463-a522be11/Captura%20de%20pantalla%202026-05-05%20132636.png"
      },
      {
        "url": "https://www.millan-experiences.com/web/image/2483-807f7675/Captura%20de%20pantalla%202026-05-05%20132748.webp",
        "original_url": "https://www.millan-experiences.com/web/image/2464-28f3620c/Captura%20de%20pantalla%202026-05-05%20132748.png"
      },
      {
        "url": "https://www.millan-experiences.com/web/image/2479-769abf84/Captura%20de%20pantalla%202026-05-05%20132925.webp",
        "original_url": "https://www.millan-experiences.com/web/image/2465-31274633/Captura%20de%20pantalla%202026-05-05%20132925.png"
      },
      {
        "url": "https://www.millan-experiences.com/web/image/2478-d9267c2a/Captura%20de%20pantalla%202026-05-05%20133019.webp",
        "original_url": "https://www.millan-experiences.com/web/image/2466-f1dabab3/Captura%20de%20pantalla%202026-05-05%20133019.png"
      },
      {
        "url": "https://www.millan-experiences.com/web/image/2476-ab3cfea6/Captura%20de%20pantalla%202026-05-05%20133116.webp",
        "original_url": "https://www.millan-experiences.com/web/image/2467-3671e3d1/Captura%20de%20pantalla%202026-05-05%20133116.png"
      },
      {
        "url": "https://www.millan-experiences.com/web/image/2475-766aeaeb/Captura%20de%20pantalla%202026-05-05%20133322.webp",
        "original_url": "https://www.millan-experiences.com/web/image/2468-98fd3cc5/Captura%20de%20pantalla%202026-05-05%20133322.png"
      },
      {
        "url": "https://www.millan-experiences.com/web/image/2480-f6381406/Captura%20de%20pantalla%202026-05-05%20133457.webp",
        "original_url": "https://www.millan-experiences.com/web/image/2469-fd3eb175/Captura%20de%20pantalla%202026-05-05%20133457.png"
      },
      {
        "url": "https://www.millan-experiences.com/web/image/2474-ecedf42c/Captura%20de%20pantalla%202026-05-05%20133719.webp",
        "original_url": "https://www.millan-experiences.com/web/image/2470-a1341850/Captura%20de%20pantalla%202026-05-05%20133719.png"
      },
      {
        "url": "https://www.millan-experiences.com/web/image/2481-9a859424/Captura%20de%20pantalla%202026-05-05%20134110.webp",
        "original_url": "https://www.millan-experiences.com/web/image/2471-a6daae77/Captura%20de%20pantalla%202026-05-05%20134110.png"
      },
      {
        "url": "https://www.millan-experiences.com/web/image/2477-02bbc7cd/Captura%20de%20pantalla%202026-05-05%20134222.webp",
        "original_url": "https://www.millan-experiences.com/web/image/2473-28bb928d/Captura%20de%20pantalla%202026-05-05%20134222.png"
      }
    ]
  },
  {
    "name": "Casa Jade",
    "type": "Luxury Villa",
    "category": "Private Villas",
    "location": "Getsemani",
    "capacity": {
      "guests": 20,
      "original": "20 pax"
    },
    "rooms": 10,
    "bathrooms": 10.5,
    "amenities": [
      "Pool",
      "Rooftop Jacuzzi",
      "BBQ Grill",
      "24/7 Staff"
    ],
    "images": [
      {
        "url": "https://www.millan-experiences.com/web/image/2371-d647a5f6/Screenshot%202025-12-03%20at%209.18.33%E2%80%AFPM.webp",
        "original_url": "https://www.millan-experiences.com/web/image/2356-46a96bda/Screenshot%202025-12-03%20at%209.18.33%E2%80%AFPM.png"
      },
      {
        "url": "https://www.millan-experiences.com/web/image/2370-641efdde/Screenshot%202025-12-03%20at%209.18.45%E2%80%AFPM.webp",
        "original_url": "https://www.millan-experiences.com/web/image/2357-615c4741/Screenshot%202025-12-03%20at%209.18.45%E2%80%AFPM.png"
      },
      {
        "url": "https://www.millan-experiences.com/web/image/2373-6baaf0af/Screenshot%202025-12-03%20at%209.07.59%E2%80%AFPM.webp",
        "original_url": "https://www.millan-experiences.com/web/image/2358-ea92102e/Screenshot%202025-12-03%20at%209.07.59%E2%80%AFPM.png"
      },
      {
        "url": "https://www.millan-experiences.com/web/image/2372-ddf9195f/Screenshot%202025-12-03%20at%209.08.17%E2%80%AFPM.webp",
        "original_url": "https://www.millan-experiences.com/web/image/2359-b1cada5d/Screenshot%202025-12-03%20at%209.08.17%E2%80%AFPM.png"
      },
      {
        "url": "https://www.millan-experiences.com/web/image/2366-5b0da753/Screenshot%202025-12-03%20at%209.09.28%E2%80%AFPM.webp",
        "original_url": "https://www.millan-experiences.com/web/image/2361-383a25ea/Screenshot%202025-12-03%20at%209.09.28%E2%80%AFPM.png"
      },
      {
        "url": "https://www.millan-experiences.com/web/image/2369-af374966/Screenshot%202025-12-03%20at%209.16.07%E2%80%AFPM.webp",
        "original_url": "https://www.millan-experiences.com/web/image/2362-21dc8b32/Screenshot%202025-12-03%20at%209.16.07%E2%80%AFPM.png"
      },
      {
        "url": "https://www.millan-experiences.com/web/image/2368-04f58172/Screenshot%202025-12-03%20at%209.11.30%E2%80%AFPM.webp",
        "original_url": "https://www.millan-experiences.com/web/image/2364-709f031b/Screenshot%202025-12-03%20at%209.11.30%E2%80%AFPM.png"
      },
      {
        "url": "https://www.millan-experiences.com/web/image/2367-2260c9bc/Screenshot%202025-12-03%20at%209.17.41%E2%80%AFPM.webp",
        "original_url": "https://www.millan-experiences.com/web/image/2365-dd1d0a4c/Screenshot%202025-12-03%20at%209.17.41%E2%80%AFPM.png"
      }
    ]
  },
  {
    "name": "Casa Lea",
    "type": "Luxury Villa",
    "category": "Private Villas",
    "location": "Historic Center",
    "capacity": {
      "guests": 10,
      "original": "10 pax"
    },
    "rooms": 4,
    "bathrooms": 4.5,
    "amenities": [
      "Rooftop pool",
      "24/7 Staff",
      "Colonial courtyard"
    ],
    "images": [
      {
        "url": "https://www.millan-experiences.com/web/image/2428-a0c6dd6b/Captura%20de%20pantalla%202026-05-04%20113330.webp",
        "original_url": "https://www.millan-experiences.com/web/image/2416-14b36d55/Captura%20de%20pantalla%202026-05-04%20113330.png"
      },
      {
        "url": "https://www.millan-experiences.com/web/image/2429-c25d90c9/Captura%20de%20pantalla%202026-05-04%20113137.webp",
        "original_url": "https://www.millan-experiences.com/web/image/2417-0a38c9dd/Captura%20de%20pantalla%202026-05-04%20113137.png"
      },
      {
        "url": "https://www.millan-experiences.com/web/image/2431-7015fd2b/Captura%20de%20pantalla%202026-05-04%20113547.webp",
        "original_url": "https://www.millan-experiences.com/web/image/2418-71c558e8/Captura%20de%20pantalla%202026-05-04%20113547.png"
      },
      {
        "url": "https://www.millan-experiences.com/web/image/2434-778d5c3a/Captura%20de%20pantalla%202026-05-04%20113806.webp",
        "original_url": "https://www.millan-experiences.com/web/image/2419-db265c2d/Captura%20de%20pantalla%202026-05-04%20113806.png"
      },
      {
        "url": "https://www.millan-experiences.com/web/image/2430-023b9b3c/Captura%20de%20pantalla%202026-05-04%20113939.webp",
        "original_url": "https://www.millan-experiences.com/web/image/2420-019e3b93/Captura%20de%20pantalla%202026-05-04%20113939.png"
      },
      {
        "url": "https://www.millan-experiences.com/web/image/2432-d5dd00b6/Captura%20de%20pantalla%202026-05-04%20114047.webp",
        "original_url": "https://www.millan-experiences.com/web/image/2421-120db876/Captura%20de%20pantalla%202026-05-04%20114047.png"
      },
      {
        "url": "https://www.millan-experiences.com/web/image/2426-d6334f6c/Captura%20de%20pantalla%202026-05-04%20114139.webp",
        "original_url": "https://www.millan-experiences.com/web/image/2422-c45ab812/Captura%20de%20pantalla%202026-05-04%20114139.png"
      },
      {
        "url": "https://www.millan-experiences.com/web/image/2433-673ba8c8/Captura%20de%20pantalla%202026-05-04%20114224.webp",
        "original_url": "https://www.millan-experiences.com/web/image/2423-05876fd8/Captura%20de%20pantalla%202026-05-04%20114224.png"
      },
      {
        "url": "https://www.millan-experiences.com/web/image/2427-785e5eb1/Captura%20de%20pantalla%202026-05-04%20114317.webp",
        "original_url": "https://www.millan-experiences.com/web/image/2424-3d612ad4/Captura%20de%20pantalla%202026-05-04%20114317.png"
      },
      {
        "url": "https://www.millan-experiences.com/web/image/2435-e3c5b8f8/Captura%20de%20pantalla%202026-05-04%20114611.webp",
        "original_url": "https://www.millan-experiences.com/web/image/2425-66486f80/Captura%20de%20pantalla%202026-05-04%20114611.png"
      }
    ]
  }
]

function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
}

async function uploadImageFromUrl(url: string, fallbackUrl: string | undefined, filename: string) {
  const tryFetch = async (targetUrl: string) => {
    const res = await fetch(targetUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const arrayBuffer = await res.arrayBuffer()
    const contentType = res.headers.get('content-type') || 'image/jpeg'
    return { buffer: Buffer.from(arrayBuffer), contentType }
  }

  let fileData: { buffer: Buffer; contentType: string } | null = null

  try {
    fileData = await tryFetch(url)
  } catch (err) {
    if (fallbackUrl) {
      try {
        fileData = await tryFetch(fallbackUrl)
      } catch (err2) {
        console.error(`❌ Falló la descarga de ${url} y ${fallbackUrl}`)
        return null
      }
    } else {
      console.error(`❌ Falló la descarga de ${url}`)
      return null
    }
  }

  if (!fileData) return null

  try {
    console.log(`   Subiendo imagen ${filename} (${Math.round(fileData.buffer.byteLength / 1024)} KB)...`)
    const asset = await client.assets.upload('image', fileData.buffer, {
      filename,
      contentType: fileData.contentType,
    })

    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: asset._id,
      },
    }
  } catch (error) {
    console.error(`❌ Error al subir asset a Sanity para ${filename}:`, error)
    return null
  }
}

async function run() {
  console.log(`🚀 Iniciando importación de ${villasData.length} villas en Sanity...\n`)

  for (const villa of villasData) {
    const slug = slugify(villa.name)
    console.log(`\n========================================`)
    console.log(`🏡 Procesando: ${villa.name} (Slug: ${slug})`)
    console.log(`========================================`)

    // 1. Descargar y subir imágenes
    const uploadedImages = []
    for (let i = 0; i < villa.images.length; i++) {
      const img = villa.images[i]
      const ext = img.original_url.endsWith('.png') ? 'png' : img.original_url.endsWith('.webp') ? 'webp' : 'jpg'
      const filename = `${slug}-${i + 1}.${ext}`
      
      const uploaded = await uploadImageFromUrl(img.original_url, img.url, filename)
      if (uploaded) {
        uploadedImages.push(uploaded)
      }
    }

    console.log(`✅ ${uploadedImages.length} de ${villa.images.length} imágenes subidas con éxito.`)

    if (uploadedImages.length === 0) {
      console.error(`⚠️ No se subieron imágenes para ${villa.name}. Saltando actualización.`)
      continue
    }

    const mainImage = uploadedImages[0]
    const gallery = uploadedImages.slice(1)

    // Unir comodidades
    const allAmenities = [
      ...(villa.amenities || []),
      ...((villa as any).virrey_eslava_amenities || [])
    ]

    // 2. Buscar documento existente
    const existing = await client.fetch('*[_type == "luxury-villas" && slug.current == $slug][0]', { slug })

    const updateFields = {
      title: villa.name,
      slug: { _type: 'slug', current: slug },
      mainImage,
      gallery: gallery.length > 0 ? gallery : undefined,
      details: {
        location: villa.location || (existing?.details?.location ?? "Historic Center"),
        capacity: villa.capacity?.guests || (existing?.details?.capacity ?? null),
        rooms: villa.rooms || (existing?.details?.rooms ?? null),
        bathrooms: villa.bathrooms || (existing?.details?.bathrooms ?? null),
        dimensions: existing?.details?.dimensions || "",
      },
      amenities: allAmenities.length > 0 ? allAmenities : (existing?.amenities ?? []),
    }

    if (existing) {
      console.log(`🔄 Actualizando documento existente (ID: ${existing._id})...`)
      await client
        .patch(existing._id)
        .set(updateFields)
        .commit()
      console.log(`✨ Documento ${villa.name} actualizado exitosamente.`)
    } else {
      console.log(`➕ Creando nuevo documento para ${villa.name}...`)
      const newDoc = {
        _type: 'luxury-villas',
        ...updateFields,
      }
      const res = await client.create(newDoc)
      console.log(`✨ Documento creado con ID: ${res._id}`)
    }
  }

  console.log(`\n🎉 ¡Importación de todas las villas finalizada con éxito!`)
}

run()

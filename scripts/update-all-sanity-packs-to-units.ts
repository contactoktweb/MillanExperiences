/**
 * Script para actualizar en Sanity todos los productos que se vendían por packs
 * transformándolos en venta 100% por unidad con sus precios, presentaciones y slugs normalizados.
 */
import { createClient } from "@sanity/client"
import dotenv from "dotenv"

dotenv.config({ path: ".env.local" })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_WRITE_TOKEN,
  apiVersion: "2024-01-01",
  useCdn: false,
})

interface ProductUpdate {
  externalId: string
  title?: string
  presentation: string
  price: number
  slug: string
}

const updates: ProductUpdate[] = [
  // Hidratación y aguas
  {
    externalId: "MILLAN-0002",
    title: "Agua Brisa sin gas",
    presentation: "Botella 600 ml",
    price: 2500,
    slug: "agua-brisa-sin-gas-botella-600-ml",
  },
  {
    externalId: "MILLAN-0003",
    title: "Agua Cristal con gas",
    presentation: "Botella 600 ml",
    price: 3500,
    slug: "agua-cristal-con-gas-botella-600-ml",
  },
  {
    externalId: "MILLAN-0005",
    title: "Cocos frescos",
    presentation: "Coco frío (unidad)",
    price: 6000,
    slug: "cocos-frescos-unidad",
  },
  // Gaseosas y mezcladores
  {
    externalId: "MILLAN-0006",
    title: "Coca-Cola Original",
    presentation: "Botella 400 ml",
    price: 5000,
    slug: "coca-cola-original-botella-400-ml",
  },
  {
    externalId: "MILLAN-0007",
    title: "Coca-Cola Zero",
    presentation: "Botella 400 ml",
    price: 5000,
    slug: "coca-cola-zero-botella-400-ml",
  },
  {
    externalId: "MILLAN-0008",
    title: "Sprite",
    presentation: "Lata / botella personal 400 ml",
    price: 3000,
    slug: "sprite-botella-personal-400-ml",
  },
  {
    externalId: "MILLAN-0009",
    title: "Ginger Ale Canada Dry",
    presentation: "Lata / botella vidrio 300 ml",
    price: 4500,
    slug: "ginger-ale-canada-dry-300-ml",
  },
  {
    externalId: "MILLAN-0010",
    title: "Agua tónica Schweppes",
    presentation: "Lata / botella vidrio 300 ml",
    price: 5000,
    slug: "agua-tonica-schweppes-300-ml",
  },
  {
    externalId: "MILLAN-0011",
    title: "Soda Bretaña",
    presentation: "Botella personal 310 ml",
    price: 3000,
    slug: "soda-bretana-botella-personal-310-ml",
  },
  {
    externalId: "MILLAN-0012",
    title: "Colombiana",
    presentation: "Lata 310 ml",
    price: 4000,
    slug: "colombiana-lata-310-ml",
  },
  {
    externalId: "MILLAN-0013",
    title: "Postobón Manzana",
    presentation: "Lata 310 ml",
    price: 4500,
    slug: "postobon-manzana-lata-310-ml",
  },
  {
    externalId: "MILLAN-0014",
    title: "Red Bull Energy Drink",
    presentation: "Lata 250 ml",
    price: 11500,
    slug: "red-bull-energy-drink-lata-250-ml",
  },
  {
    externalId: "MILLAN-0015",
    title: "Gatorade",
    presentation: "Botella 500 ml",
    price: 5500,
    slug: "gatorade-botella-500-ml",
  },
  {
    externalId: "MILLAN-0016",
    title: "Electrolit",
    presentation: "Botella 625 ml",
    price: 10500,
    slug: "electrolit-botella-625-ml",
  },
  {
    externalId: "MILLAN-0018",
    title: "Jugo Hit",
    presentation: "Caja 1 L",
    price: 12500,
    slug: "jugo-hit-caja-1-l",
  },
  // Cervezas nacionales e internacionales
  {
    externalId: "MILLAN-0019",
    title: "Cerveza Águila",
    presentation: "Lata 330 ml",
    price: 5000,
    slug: "cerveza-aguila-lata-330-ml",
  },
  {
    externalId: "MILLAN-0020",
    title: "Cerveza Águila Light",
    presentation: "Lata 330 ml",
    price: 5500,
    slug: "cerveza-aguila-light-lata-330-ml",
  },
  {
    externalId: "MILLAN-0021",
    title: "Cerveza Poker",
    presentation: "Lata 330 ml",
    price: 5000,
    slug: "cerveza-poker-lata-330-ml",
  },
  {
    externalId: "MILLAN-0022",
    title: "Cerveza Club Colombia Dorada",
    presentation: "Lata 330 ml",
    price: 5000,
    slug: "cerveza-club-colombia-dorada-lata-330-ml",
  },
  {
    externalId: "MILLAN-0023",
    title: "Cerveza Corona Extra",
    presentation: "Botella 355 ml",
    price: 6500,
    slug: "cerveza-corona-extra-botella-355-ml",
  },
  // Limones y perecederos
  {
    externalId: "MILLAN-0035",
    title: "Limones Tahití",
    presentation: "Limón Tahití (unidad)",
    price: 1000,
    slug: "limon-tahiti-unidad",
  },
  {
    externalId: "MILLAN-0037",
    title: "Vasos reutilizables irrompibles",
    presentation: "Vaso reutilizable irrompible (unidad)",
    price: 4500,
    slug: "vaso-reutilizable-irrompible-unidad",
  },
  // Kits con texto descriptivo claro
  {
    externalId: "MILLAN-0039",
    title: "Kit Gin Tonic Millan",
    presentation: "Kit para cócteles (tónica, limones, pepino, romero)",
    price: 45500,
    slug: "kit-gin-tonic-millan",
  },
  {
    externalId: "MILLAN-0040",
    title: "Kit Mojito Millan",
    presentation: "Kit para mojitos (hierbabuena, limones, azúcar, soda)",
    price: 39000,
    slug: "kit-mojito-millan",
  },
  {
    externalId: "MILLAN-0041",
    title: "Kit Michelada Millan",
    presentation: "Kit michelada (sal, limones, salsas, vasos escarchados)",
    price: 26000,
    slug: "kit-michelada-millan",
  },
  // Abarrotes y desayunos
  {
    externalId: "MILLAN-0348",
    title: "Té Hindú surtido",
    presentation: "Caja 20 bolsitas",
    price: 18500,
    slug: "te-hindu-surtido-caja-20-bolsitas",
  },
  {
    externalId: "MILLAN-0349",
    title: "Leche entera Alquería",
    presentation: "Caja 1 L",
    price: 7000,
    slug: "leche-entera-alqueria-caja-1-l",
  },
  {
    externalId: "MILLAN-0351",
    title: "Huevos AA",
    presentation: "Huevo fresco AA (unidad)",
    price: 1000,
    slug: "huevo-fresco-aa-unidad",
  },
  {
    externalId: "MILLAN-0353",
    title: "Pandebonos",
    presentation: "Pandebono artesanal (unidad)",
    price: 6000,
    slug: "pandebono-artesanal-unidad",
  },
  {
    externalId: "MILLAN-0367",
    title: "Aguacate Hass",
    presentation: "Aguacate Hass (unidad)",
    price: 2500,
    slug: "aguacate-hass-unidad",
  },
  {
    externalId: "MILLAN-0368",
    title: "Papas Margarita",
    presentation: "Bolsa familiar 300 g",
    price: 33500,
    slug: "papas-margarita-bolsa-familiar-300-g",
  },
  {
    externalId: "MILLAN-0370",
    title: "Platanitos",
    presentation: "Bolsa 128 g",
    price: 9500,
    slug: "platanitos-bolsa-128-g",
  },
  {
    externalId: "MILLAN-0372",
    title: "Galletas Oreo",
    presentation: "Paquete personal 108 g",
    price: 2500,
    slug: "galletas-oreo-paquete-personal",
  },
  {
    externalId: "MILLAN-0373",
    title: "Chocolatinas Jet",
    presentation: "Chocolatina Jet tradicional (unidad)",
    price: 1500,
    slug: "chocolatina-jet-unidad",
  },
  {
    externalId: "MILLAN-0378",
    title: "Mango biche con sal y limón",
    presentation: "Porción individual con sal y limón",
    price: 3500,
    slug: "mango-biche-porcion-individual",
  },
  // Farmacia, higiene y conveniencia
  {
    externalId: "MILLAN-0398",
    title: "Pastillas para el mareo (Mareol / Dramamine)",
    presentation: "Caja 10 tabletas",
    price: 18500,
    slug: "pastillas-mareol-dramamine-caja-10-tabletas",
  },
  {
    externalId: "MILLAN-0406",
    title: "Pañuelos Kleenex",
    presentation: "Paquete de bolsillo",
    price: 3500,
    slug: "panuelos-kleenex-paquete-bolsillo",
  },
  {
    externalId: "MILLAN-0407",
    title: "Preservativos Today",
    presentation: "Caja 3 unidades",
    price: 29500,
    slug: "preservativos-today-caja-3-unidades",
  },
  {
    externalId: "MILLAN-0417",
    title: "Máquinas de afeitar Gillette",
    presentation: "Máquina de afeitar desechable (unidad)",
    price: 6500,
    slug: "maquina-de-afeitar-gillette-unidad",
  },
  {
    externalId: "MILLAN-0424",
    title: "Pañitos húmedos Huggies",
    presentation: "Paquete 100 unidades",
    price: 14000,
    slug: "panitos-humedos-huggies-paquete-100-und",
  },
  {
    externalId: "MILLAN-0426",
    title: "Compotas Gerber",
    presentation: "Compota Gerber (unidad 105 ml)",
    price: 6500,
    slug: "compota-gerber-unidad-105-ml",
  },
  {
    externalId: "MILLAN-0427",
    title: "Jugos en caja Hit",
    presentation: "Cajita personal 200 ml",
    price: 2500,
    slug: "jugo-en-caja-hit-cajita-200-ml",
  },
  {
    externalId: "MILLAN-0438",
    title: "Pasta spaghetti",
    presentation: "Paquete 500 g",
    price: 3500,
    slug: "pasta-spaghetti-paquete-500-g",
  },
  {
    externalId: "MILLAN-0443",
    title: "Atún Van Camp's en aceite",
    presentation: "Lata 320 g",
    price: 28500,
    slug: "atun-van-camps-aceite-lata-320-g",
  },
  {
    externalId: "MILLAN-0459",
    title: "Cigarrillos Marlboro Rojo / Gold",
    presentation: "Cajetilla 20 cigarrillos",
    price: 16000,
    slug: "cigarrillos-marlboro-cajetilla-20",
  },
  {
    externalId: "MILLAN-0464",
    title: "Bengalas para botellas",
    presentation: "Bengala para botella (unidad)",
    price: 7000,
    slug: "bengala-para-botella-unidad",
  },
]

async function run() {
  console.log(`Iniciando actualización de ${updates.length} productos en Sanity...`)

  let tx = client.transaction()
  let count = 0

  for (const item of updates) {
    const docId = `store-product-${item.externalId}`

    console.log(`Actualizando [${item.externalId}] ${item.title || ""}:`)
    console.log(`   -> Presentación: "${item.presentation}"`)
    console.log(`   -> Precio: $${item.price.toLocaleString("es-CO")}`)
    console.log(`   -> Slug: "${item.slug}"`)

    tx = tx.patch(docId, (patch) => {
      const setPayload: Record<string, any> = {
        presentation: item.presentation,
        price: item.price,
        slug: { _type: "slug", current: item.slug },
      }
      if (item.title) {
        setPayload.title = item.title
      }
      return patch.set(setPayload)
    })
    count++
  }

  console.log(`\nComprometiendo transacción de ${count} productos en Sanity...`)
  const result = await tx.commit()
  console.log(`✓ Éxito! ${count} productos actualizados a venta por unidad en Sanity.`)
}

run().catch((err) => {
  console.error("Error actualizando productos en Sanity:", err)
  process.exit(1)
})

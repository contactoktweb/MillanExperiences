/**
 * Script para migrar los precios de la tienda en Sanity a precios unitarios
 * y normalizar presentaciones de packs (ej. "Pack x6 botellas 400 ml" -> "Botella 400 ml").
 */
import fs from "fs"
import path from "path"
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

const CENTS = 100
const BASIS_POINTS = 10_000

function calcMillanPrice(
  quantity: number,
  unitPrice: number,
  margin = 0.30,
  rounding = 500
): number {
  const marginBp = Math.round(margin * BASIS_POINTS)
  const costInCents = Math.round(quantity * unitPrice * CENTS)
  const numerator = costInCents * (BASIS_POINTS + marginBp)
  const divisor = rounding * CENTS * BASIS_POINTS
  return Math.ceil(numerator / divisor) * rounding
}

const presentationsMap: Record<string, string> = {
  "MILLAN-0002": "Botella 600 ml",
  "MILLAN-0003": "Botella 600 ml",
  "MILLAN-0005": "Coco frío (unidad)",
  "MILLAN-0006": "Botella 400 ml",
  "MILLAN-0007": "Botella 400 ml",
  "MILLAN-0008": "Lata / botella personal",
  "MILLAN-0009": "Lata 300 ml",
  "MILLAN-0010": "Lata 300 ml",
  "MILLAN-0011": "Botella personal 310 ml",
  "MILLAN-0012": "Lata 310 ml",
  "MILLAN-0013": "Lata 310 ml",
  "MILLAN-0014": "Lata 250 ml",
  "MILLAN-0015": "Botella 500 ml",
  "MILLAN-0016": "Botella 625 ml",
  "MILLAN-0018": "Caja 1 L",
  "MILLAN-0019": "Lata 330 ml",
  "MILLAN-0020": "Lata 330 ml",
  "MILLAN-0021": "Lata 330 ml",
  "MILLAN-0022": "Lata 330 ml",
  "MILLAN-0023": "Botella 355 ml",
  "MILLAN-0349": "Caja 1 L",
  "MILLAN-0353": "Unidad artesanal",
  "MILLAN-0367": "Unidad fresca",
  "MILLAN-0368": "Bolsa familiar 300 g",
  "MILLAN-0370": "Bolsa 128 g",
  "MILLAN-0424": "Paquete 100 und",
  "MILLAN-0426": "Unidad 105 ml",
  "MILLAN-0438": "Paquete 500 g",
  "MILLAN-0443": "Lata 320 g",
}

interface SupplierRow {
  externalId: string
  quantity: number
  unitPrice: number
  costBase: number
  millanPrice: number
}

async function run() {
  const supplierPath = path.join(process.cwd(), "scripts/store-import/output/supplier-data.json")
  if (!fs.existsSync(supplierPath)) {
    throw new Error(`No se encontró ${supplierPath}`)
  }
  const supplierData: SupplierRow[] = JSON.parse(fs.readFileSync(supplierPath, "utf8"))
  const supplierMap = new Map(supplierData.map((s) => [s.externalId, s]))

  const products = await client.fetch<Array<{
    _id: string
    externalId: string
    title: string
    presentation: string
    price: number
  }>>(`*[_type == "storeProduct"]{ _id, externalId, title, presentation, price }`)

  console.log(`Verificando ${products.length} productos en Sanity...`)

  let tx = client.transaction()
  let updateCount = 0

  for (const p of products) {
    const s = supplierMap.get(p.externalId)
    if (!s) continue

    // Actualizar los productos que venían con quantity > 1 (packs) o mapeo específico
    if (s.quantity > 1 || presentationsMap[p.externalId]) {
      const newUnitPrice = calcMillanPrice(1, s.unitPrice, 0.30, 500)
      const newPresentation = presentationsMap[p.externalId] || p.presentation

      console.log(`- ${p.externalId} | ${p.title}:`)
      console.log(`   Precio: $${p.price.toLocaleString("es-CO")} -> $${newUnitPrice.toLocaleString("es-CO")}`)
      console.log(`   Presentación: "${p.presentation}" -> "${newPresentation}"`)

      tx = tx.patch(p._id, (patch) =>
        patch.set({
          price: newUnitPrice,
          presentation: newPresentation,
        })
      )
      updateCount++
    }
  }

  if (updateCount > 0) {
    console.log(`\nComprometiendo transacción de ${updateCount} productos en Sanity...`)
    await tx.commit()
    console.log(`✓ ${updateCount} productos actualizados exitosamente en Sanity a precio unitario.`)
  } else {
    console.log("No se encontraron productos para actualizar.")
  }
}

run().catch((err) => {
  console.error("Error ejecutando migración a precios unitarios:", err)
  process.exit(1)
})

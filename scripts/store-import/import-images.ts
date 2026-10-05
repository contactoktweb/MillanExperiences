/**
 * Descarga la imagen original de cada producto desde su ficha de Carulla y la sube a Sanity (mainImage).
 *
 *   pnpm store:images              # simulación: solo reporta qué imagen encontraría
 *   pnpm store:images --apply      # descarga, sube a Sanity y asigna mainImage
 *
 * Opciones: --force (reemplaza imágenes ya cargadas), --limit N, --only MILLAN-0001
 * Lee los links de scripts/store-import/output/supplier-data.json (generado por store:import).
 */
import fs from "node:fs"
import path from "node:path"
import dotenv from "dotenv"
import { createSanityClient } from "./sanity-writer"
import type { SupplierRecord } from "./types"

dotenv.config({ path: ".env.local" })

const OUTPUT_DIR = path.join(process.cwd(), "scripts", "store-import", "output")
const SUPPLIER_FILE = path.join(OUTPUT_DIR, "supplier-data.json")
const CARULLA_HOST = "www.carulla.com"
const REQUEST_DELAY_MS = 800 // pausa cortés entre productos para no saturar el sitio
const REQUEST_TIMEOUT_MS = 20_000
const MAX_ATTEMPTS = 2
const MIN_IMAGE_BYTES = 5_000
const USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36"
const OG_IMAGE_PATTERN = /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i

interface ImageResult {
  externalId: string
  status: "uploaded" | "found" | "skipped-has-image" | "failed"
  imageUrl?: string
  bytes?: number
  reason?: string
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

async function fetchWithRetry(url: string): Promise<Response> {
  let lastError: unknown
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      const response = await fetch(url, {
        headers: { "User-Agent": USER_AGENT, Accept: "text/html,image/*,*/*" },
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      })
      if (response.ok) return response
      lastError = new Error(`HTTP ${response.status}`)
    } catch (error) {
      lastError = error
    }
    await sleep(REQUEST_DELAY_MS * attempt)
  }
  throw lastError instanceof Error ? lastError : new Error(String(lastError))
}

/** En VTEX la URL sin sufijo de tamaño (-WxH) ni query devuelve el archivo original. */
async function findOriginalImageUrl(productUrl: string): Promise<string> {
  const html = await (await fetchWithRetry(productUrl)).text()
  const match = html.match(OG_IMAGE_PATTERN)
  if (!match) throw new Error("la ficha no expone og:image")
  const url = new URL(match[1].replace(/&amp;/g, "&"))
  url.search = ""
  url.pathname = url.pathname.replace(/-\d+-\d+(?=\/|$)/, "")
  return url.toString()
}

async function downloadImage(imageUrl: string): Promise<{ buffer: Buffer; contentType: string }> {
  const response = await fetchWithRetry(imageUrl)
  const contentType = response.headers.get("content-type") ?? ""
  if (!contentType.startsWith("image/")) throw new Error(`tipo de contenido inesperado: ${contentType}`)
  const buffer = Buffer.from(await response.arrayBuffer())
  if (buffer.length < MIN_IMAGE_BYTES) throw new Error(`imagen sospechosamente pequeña (${buffer.length} bytes)`)
  return { buffer, contentType }
}

function readFlag(args: string[], name: string): string | undefined {
  const index = args.indexOf(name)
  return index >= 0 ? args[index + 1] : undefined
}

async function run(): Promise<void> {
  const args = process.argv.slice(2)
  const apply = args.includes("--apply")
  const force = args.includes("--force")
  const limit = Number(readFlag(args, "--limit")) || Infinity
  const only = readFlag(args, "--only")

  if (!fs.existsSync(SUPPLIER_FILE)) {
    throw new Error("No existe supplier-data.json. Corre primero `pnpm store:import`.")
  }
  const supplier: SupplierRecord[] = JSON.parse(fs.readFileSync(SUPPLIER_FILE, "utf8"))
  const candidates = supplier
    .filter((record) => record.supplierLink && new URL(record.supplierLink).hostname === CARULLA_HOST)
    .filter((record) => !only || record.externalId === only)

  const client = createSanityClient(apply)
  const existing = await client.fetch<{ externalId: string; _id: string; hasImage: boolean }[]>(
    `*[_type == "storeProduct" && externalId in $ids]{externalId, _id, "hasImage": defined(mainImage.asset)}`,
    { ids: candidates.map((c) => c.externalId) }
  )
  const productByExternalId = new Map(existing.map((doc) => [doc.externalId, doc]))

  console.log(`Productos con link de Carulla: ${candidates.length} · modo ${apply ? "APPLY" : "SIMULACIÓN"}\n`)

  const results: ImageResult[] = []
  let processed = 0

  for (const record of candidates) {
    if (processed >= limit) break
    const product = productByExternalId.get(record.externalId)
    if (!product) {
      results.push({ externalId: record.externalId, status: "failed", reason: "no existe en Sanity (corre store:import --apply)" })
      continue
    }
    if (product.hasImage && !force) {
      results.push({ externalId: record.externalId, status: "skipped-has-image" })
      continue
    }

    processed++
    try {
      const imageUrl = await findOriginalImageUrl(record.supplierLink as string)
      const { buffer, contentType } = await downloadImage(imageUrl)

      if (apply) {
        const asset = await client.assets.upload("image", buffer, {
          filename: `${record.externalId}${path.extname(new URL(imageUrl).pathname) || ".jpg"}`,
          contentType,
        })
        await client
          .patch(product._id)
          .set({ mainImage: { _type: "image", asset: { _type: "reference", _ref: asset._id } } })
          .commit()
      }
      results.push({ externalId: record.externalId, status: apply ? "uploaded" : "found", imageUrl, bytes: buffer.length })
      console.log(`✅ ${record.externalId} · ${(buffer.length / 1024).toFixed(0)} KB · ${imageUrl}`)
    } catch (error) {
      const reason = error instanceof Error ? error.message : String(error)
      results.push({ externalId: record.externalId, status: "failed", reason })
      console.log(`❌ ${record.externalId} · ${reason} · ${record.supplierLink}`)
    }
    await sleep(REQUEST_DELAY_MS)
  }

  const count = (status: ImageResult["status"]) => results.filter((r) => r.status === status).length
  const reportPath = path.join(OUTPUT_DIR, `images-report-${apply ? "apply" : "dry-run"}.json`)
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2))

  console.log(
    `\nSubidas: ${count("uploaded")} · Encontradas (simulación): ${count("found")} · ` +
      `Ya tenían imagen: ${count("skipped-has-image")} · Fallidas: ${count("failed")}`
  )
  console.log(`Reporte: ${reportPath}`)
}

run().catch((error) => {
  console.error("❌ Falló la carga de imágenes.\n", error)
  process.exit(1)
})

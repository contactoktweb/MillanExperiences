/**
 * Importador de la TIENDA desde Excel → Sanity.
 *
 * Uso (desde la raíz del repo):
 *   pnpm store:import                      # dry-run (no escribe nada)
 *   pnpm store:import --apply              # escribe en Sanity (transacción única)
 *
 * Opciones: --file, --margin, --rounding, --review-as=draft|active,
 *           --deactivate-missing, --expected-products, --expected-categories
 */
import path from "node:path"
import dotenv from "dotenv"
import { loadWorkbook, readParameters, readProductRows, readSummary } from "./excel-reader"
import { buildReport, checkTotals, printReport, writeOutputFiles } from "./report"
import { applyPlan, buildPlan, createSanityClient } from "./sanity-writer"
import { transformRows } from "./transform"
import type { ImportOptions, ReviewMode } from "./types"

dotenv.config({ path: ".env.local" })

const DEFAULT_FILE = "guia.xlsx"
const DEFAULT_EXPECTED_PRODUCTS = 389
const DEFAULT_EXPECTED_CATEGORIES = 21

function readFlagValue(args: string[], name: string): string | undefined {
  const inline = args.find((arg) => arg.startsWith(`${name}=`))
  if (inline) return inline.slice(name.length + 1)
  const index = args.indexOf(name)
  return index >= 0 ? args[index + 1] : undefined
}

function readNumberFlag(args: string[], name: string): number | undefined {
  const raw = readFlagValue(args, name)
  if (raw === undefined) return undefined
  const value = Number(raw)
  if (!Number.isFinite(value) || value <= 0) throw new Error(`Valor inválido para ${name}: ${raw}`)
  return value
}

function parseOptions(args: string[]): ImportOptions {
  const reviewAs = (readFlagValue(args, "--review-as") ?? "draft") as ReviewMode
  if (reviewAs !== "draft" && reviewAs !== "active") {
    throw new Error(`--review-as debe ser "draft" o "active" (recibido: ${reviewAs})`)
  }
  const apply = args.includes("--apply")
  if (apply && args.includes("--dry-run")) throw new Error("No se puede usar --apply junto con --dry-run.")

  const marginOverride = readNumberFlag(args, "--margin")
  if (marginOverride !== undefined && marginOverride >= 1) {
    throw new Error("--margin debe ser una fracción entre 0 y 1 (ej. 0.30).")
  }

  return {
    filePath: path.resolve(process.cwd(), readFlagValue(args, "--file") ?? DEFAULT_FILE),
    apply,
    deactivateMissing: args.includes("--deactivate-missing"),
    marginOverride,
    roundingOverride: readNumberFlag(args, "--rounding"),
    reviewAs,
    expectedProducts: readNumberFlag(args, "--expected-products") ?? DEFAULT_EXPECTED_PRODUCTS,
    expectedCategories: readNumberFlag(args, "--expected-categories") ?? DEFAULT_EXPECTED_CATEGORIES,
  }
}

async function run(): Promise<void> {
  const options = parseOptions(process.argv.slice(2))
  const overridesActive = options.marginOverride !== undefined || options.roundingOverride !== undefined

  const workbook = await loadWorkbook(options.filePath)
  const params = readParameters(workbook)
  const rows = readProductRows(workbook)
  const summary = readSummary(workbook)

  const result = transformRows(rows, params, options)
  const totals = checkTotals(result, summary.rows, summary.total, options, overridesActive)

  const client = createSanityClient(options.apply)
  const plan = await buildPlan(client, result.products, result.categories, options.deactivateMissing)
  const report = buildReport({ options, params, result, plan, totals })

  if (options.apply) {
    await applyPlan(client, plan) // si falla, Sanity no aplica ningún cambio (rollback)
  }

  printReport(report)
  const files = writeOutputFiles(report, result.supplier)
  console.log(`\nReporte: ${files.reportPath}`)
  console.log(`Datos internos de proveedor (NO se suben a Sanity): ${files.supplierPath}`)
  if (!options.apply) console.log("\nDRY-RUN: no se escribió nada en Sanity. Usa --apply para aplicar.")
}

run().catch((error) => {
  console.error("❌ La importación falló. No se aplicó ningún cambio.\n", error)
  process.exit(1)
})

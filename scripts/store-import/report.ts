/** Control de totales, construcción del reporte y escritura de archivos de salida. */
import fs from "node:fs"
import path from "node:path"
import type { MissingProduct, WritePlan } from "./sanity-writer"
import type {
  ImportOptions,
  PricingParams,
  SummaryRow,
  TransformResult,
} from "./types"

const OUTPUT_DIR = path.join(process.cwd(), "scripts", "store-import", "output")
const SUPPLIER_FILE = "supplier-data.json"

export interface TotalsCheck {
  label: string
  expected: number
  actual: number
  ok: boolean
  note?: string
}

export function checkTotals(
  result: TransformResult,
  summaryRows: SummaryRow[],
  summaryTotal: SummaryRow | null,
  options: ImportOptions,
  overridesActive: boolean
): { checks: TotalsCheck[]; categoryMismatches: string[] } {
  const checks: TotalsCheck[] = [
    {
      label: "Productos",
      expected: options.expectedProducts,
      actual: result.products.length,
      ok: result.products.length === options.expectedProducts,
    },
    {
      label: "Categorías (Excel)",
      expected: options.expectedCategories,
      actual: result.excelCategoryCount,
      ok: result.excelCategoryCount === options.expectedCategories,
    },
  ]

  if (summaryTotal) {
    checks.push({
      label: "Suma MILLAN PRICE vs hoja Resumen (COP)",
      expected: summaryTotal.millanPriceSum,
      actual: result.priceSum,
      ok: result.priceSum === summaryTotal.millanPriceSum,
      note: overridesActive
        ? "Se usó --margin/--rounding: la hoja Resumen está calculada con los Parámetros, es esperable que no coincida."
        : undefined,
    })
  }

  const categoryMismatches: string[] = []
  for (const row of summaryRows) {
    const actual = result.perCategory[row.category] ?? { count: 0, sum: 0 }
    if (actual.count !== row.products || actual.sum !== row.millanPriceSum) {
      categoryMismatches.push(
        `${row.category}: Resumen ${row.products} prod / ${row.millanPriceSum} COP · Calculado ${actual.count} prod / ${actual.sum} COP`
      )
    }
  }

  return { checks, categoryMismatches }
}

export interface ImportReport {
  mode: "dry-run" | "apply"
  generatedAt: string
  file: string
  parameters: PricingParams & { marginOverride?: number; roundingOverride?: number; reviewAs: string }
  totals: { checks: TotalsCheck[]; categoryMismatches: string[] }
  counts: {
    productsValid: number
    productsCreated: number
    productsUpdated: number
    productsUnchanged: number
    categoriesCreated: number
    categoriesUpdated: number
    categoriesUnchanged: number
    draft: number
    draftEstimated: number
    draftReview: number
    skipped: number
  }
  skipped: TransformResult["skipped"]
  priceDifferences: TransformResult["differences"]
  warnings: string[]
  missingFromExcel: MissingProduct[]
  deactivated: string[]
}

export function buildReport(args: {
  options: ImportOptions
  params: PricingParams
  result: TransformResult
  plan: WritePlan
  totals: ImportReport["totals"]
}): ImportReport {
  const { options, params, result, plan, totals } = args
  return {
    mode: options.apply ? "apply" : "dry-run",
    generatedAt: new Date().toISOString(),
    file: options.filePath,
    parameters: {
      ...params,
      marginOverride: options.marginOverride,
      roundingOverride: options.roundingOverride,
      reviewAs: options.reviewAs,
    },
    totals,
    counts: {
      productsValid: result.products.length,
      productsCreated: plan.products.create.length,
      productsUpdated: plan.products.update.length,
      productsUnchanged: plan.products.unchanged.length,
      categoriesCreated: plan.categories.create.length,
      categoriesUpdated: plan.categories.update.length,
      categoriesUnchanged: plan.categories.unchanged.length,
      draft: result.draftCount,
      draftEstimated: result.estimatedDraftCount,
      draftReview: result.reviewDraftCount,
      skipped: result.skipped.length,
    },
    skipped: result.skipped,
    priceDifferences: result.differences,
    warnings: result.warnings,
    missingFromExcel: plan.missing,
    deactivated: plan.deactivated,
  }
}

export function printReport(report: ImportReport): void {
  const c = report.counts
  const line = "─".repeat(64)
  const log = console.log

  log(`\n${line}\nIMPORTACIÓN DE TIENDA — modo ${report.mode.toUpperCase()}\n${line}`)
  log(`Archivo: ${report.file}`)
  log(
    `Margen: ${report.parameters.marginOverride ?? report.parameters.margin}` +
      ` · Redondeo: ${report.parameters.roundingOverride ?? report.parameters.rounding} COP` +
      ` · Fecha de precios: ${report.parameters.queryDate}`
  )
  log(`Productos "verificar" como: ${report.parameters.reviewAs}\n`)

  log("Control de totales:")
  for (const check of report.totals.checks) {
    const mark = check.ok ? "OK " : "⚠️ "
    log(`  ${mark} ${check.label}: esperado ${check.expected.toLocaleString("es-CO")} · calculado ${check.actual.toLocaleString("es-CO")}`)
    if (!check.ok && check.note) log(`       ${check.note}`)
  }
  if (report.totals.categoryMismatches.length > 0) {
    log("  ⚠️  Categorías que no cuadran con la hoja Resumen:")
    report.totals.categoryMismatches.forEach((m) => log(`       - ${m}`))
  }

  const verb = report.mode === "apply" ? "" : " (simulado)"
  log(`\nProductos válidos: ${c.productsValid}`)
  log(`  Creados${verb}: ${c.productsCreated} · Actualizados${verb}: ${c.productsUpdated} · Sin cambios: ${c.productsUnchanged}`)
  log(`  En borrador (ocultos): ${c.draft}  [estimados: ${c.draftEstimated}, a verificar: ${c.draftReview}]`)
  log(`Categorías: creadas${verb} ${c.categoriesCreated} · actualizadas${verb} ${c.categoriesUpdated} · sin cambios ${c.categoriesUnchanged}`)
  log(`Filas omitidas: ${c.skipped}`)
  report.skipped.forEach((s) => log(`  - fila ${s.excelRow} (# ${s.num ?? "?"}) ${s.title}: ${s.reasons.join("; ")}`))

  log(`\nDiferencias entre valor cacheado del Excel y recalculado: ${report.priceDifferences.length}`)
  report.priceDifferences.slice(0, 20).forEach((d) =>
    log(`  - ${d.externalId} (fila ${d.excelRow}) ${d.field}: cacheado ${d.cached} · recalculado ${d.recalculated}`)
  )
  if (report.priceDifferences.length > 20) log("  … (lista completa en el archivo de reporte)")

  if (report.warnings.length > 0) {
    log(`\nAdvertencias: ${report.warnings.length}`)
    report.warnings.forEach((w) => log(`  - ${w}`))
  }

  log(`\nProductos en Sanity que NO están en el Excel (no se borran): ${report.missingFromExcel.length}`)
  report.missingFromExcel.forEach((m) => log(`  - ${m.externalId ?? m.id} · ${m.title} · ${m.status}`))
  if (report.deactivated.length > 0) log(`Desactivados (--deactivate-missing): ${report.deactivated.length}`)
}

/** Guarda el reporte y los datos internos de proveedor (fuera de Sanity, ignorados por git). */
export function writeOutputFiles(
  report: ImportReport,
  supplier: TransformResult["supplier"]
): { reportPath: string; supplierPath: string } {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true })
  const stamp = report.generatedAt.replace(/[:.]/g, "-")
  const reportPath = path.join(OUTPUT_DIR, `import-report-${report.mode}-${stamp}.json`)
  const supplierPath = path.join(OUTPUT_DIR, SUPPLIER_FILE)
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2))
  fs.writeFileSync(supplierPath, JSON.stringify(supplier, null, 2))
  return { reportPath, supplierPath }
}

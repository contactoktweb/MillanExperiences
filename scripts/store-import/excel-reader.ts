/** Lectura del Excel con exceljs: hoja principal, parámetros, resumen e hipervínculos. */
import ExcelJS from "exceljs"
import type { PricingParams, RawProductRow, SummaryRow } from "./types"

const SHEET_PRODUCTS = "Lista Millan por categoría"
const SHEET_PARAMS = "Parámetros"
const SHEET_SUMMARY = "Resumen por categoría"

/** Posición de columnas en la hoja principal (A=1). */
const COL = {
  num: 1,
  category: 2,
  title: 3,
  presentation: 4,
  quantity: 5,
  source: 6,
  foundProduct: 7,
  unitPrice: 8,
  listPrice: 9,
  cost: 10,
  margin: 11,
  price: 12,
  destination: 13,
  priority: 14,
  priceState: 15,
  link: 16,
  note: 17,
} as const

/** Normaliza cualquier valor de celda de exceljs (fórmula, rich text, hipervínculo) a su valor plano. */
function plainValue(value: ExcelJS.CellValue): unknown {
  if (value === null || value === undefined) return null
  if (typeof value !== "object" || value instanceof Date) return value
  if ("result" in value) return value.result ?? null
  if ("richText" in value) return value.richText.map((part) => part.text).join("")
  if ("text" in value) return value.text
  return null
}

function text(value: ExcelJS.CellValue): string {
  const plain = plainValue(value)
  return plain === null || plain === undefined ? "" : String(plain).trim()
}

/** La URL real vive en el hipervínculo de la celda; "Ver" es solo el texto visible. */
function hyperlinkOf(cell: ExcelJS.Cell): string {
  const value = cell.value
  if (value && typeof value === "object" && "hyperlink" in value && value.hyperlink) {
    return String(value.hyperlink).trim()
  }
  return cell.hyperlink ? String(cell.hyperlink).trim() : ""
}

function requireSheet(workbook: ExcelJS.Workbook, name: string): ExcelJS.Worksheet {
  const sheet = workbook.getWorksheet(name)
  if (!sheet) throw new Error(`No se encontró la hoja "${name}" en el Excel.`)
  return sheet
}

export async function loadWorkbook(filePath: string): Promise<ExcelJS.Workbook> {
  const workbook = new ExcelJS.Workbook()
  await workbook.xlsx.readFile(filePath)
  return workbook
}

export function readParameters(workbook: ExcelJS.Workbook): PricingParams {
  const sheet = requireSheet(workbook, SHEET_PARAMS)
  const margin = plainValue(sheet.getCell("B2").value)
  const rounding = plainValue(sheet.getCell("B3").value)
  const queryDate = plainValue(sheet.getCell("B4").value)

  if (typeof margin !== "number" || margin <= 0 || margin >= 1) {
    throw new Error(`Margen inválido en Parámetros!B2: ${String(margin)}`)
  }
  if (typeof rounding !== "number" || rounding <= 0) {
    throw new Error(`Redondeo inválido en Parámetros!B3: ${String(rounding)}`)
  }
  const dateText =
    queryDate instanceof Date ? queryDate.toISOString().slice(0, 10) : String(queryDate ?? "")
  return { margin, rounding, queryDate: dateText }
}

/** Solo son productos las filas cuya columna "#" es un entero; ignora encabezados de categoría y vacías. */
export function readProductRows(workbook: ExcelJS.Workbook): RawProductRow[] {
  const sheet = requireSheet(workbook, SHEET_PRODUCTS)
  const rows: RawProductRow[] = []

  sheet.eachRow({ includeEmpty: false }, (row, excelRow) => {
    if (excelRow === 1) return
    const num = plainValue(row.getCell(COL.num).value)
    if (typeof num !== "number" || !Number.isInteger(num)) return

    rows.push({
      excelRow,
      num,
      category: text(row.getCell(COL.category).value),
      title: text(row.getCell(COL.title).value),
      presentation: text(row.getCell(COL.presentation).value),
      quantity: plainValue(row.getCell(COL.quantity).value),
      source: text(row.getCell(COL.source).value),
      foundProduct: text(row.getCell(COL.foundProduct).value),
      unitPrice: plainValue(row.getCell(COL.unitPrice).value),
      listPrice: plainValue(row.getCell(COL.listPrice).value),
      cachedCost: plainValue(row.getCell(COL.cost).value),
      cachedMargin: plainValue(row.getCell(COL.margin).value),
      cachedPrice: plainValue(row.getCell(COL.price).value),
      destination: text(row.getCell(COL.destination).value),
      priority: text(row.getCell(COL.priority).value),
      priceState: text(row.getCell(COL.priceState).value),
      link: hyperlinkOf(row.getCell(COL.link)),
      note: text(row.getCell(COL.note).value),
    })
  })

  return rows
}

/** Hoja de resumen: solo para validar totales. Devuelve filas por categoría y la fila TOTAL aparte. */
export function readSummary(workbook: ExcelJS.Workbook): {
  rows: SummaryRow[]
  total: SummaryRow | null
} {
  const sheet = requireSheet(workbook, SHEET_SUMMARY)
  const rows: SummaryRow[] = []
  let total: SummaryRow | null = null

  sheet.eachRow({ includeEmpty: false }, (row, excelRow) => {
    if (excelRow === 1) return
    const category = text(row.getCell(1).value)
    const products = plainValue(row.getCell(2).value)
    const sum = plainValue(row.getCell(7).value)
    if (!category || typeof products !== "number" || typeof sum !== "number") return

    const entry = { category, products, millanPriceSum: sum }
    if (category.toUpperCase() === "TOTAL") total = entry
    else rows.push(entry)
  })

  return { rows, total }
}

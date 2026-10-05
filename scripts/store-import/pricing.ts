/**
 * Cálculo de precios con aritmética entera para evitar ruido de punto flotante
 * (ej. 10000 * 1.3 = 13000.000000000002 provocaría saltar al siguiente múltiplo).
 *
 *   precio = ceil(costo * (1 + margen) / redondeo) * redondeo
 */

const CENTS = 100
const BASIS_POINTS = 10_000

/** Costo base en centavos de COP (entero exacto). */
function costInCents(quantity: number, unitPrice: number): number {
  return Math.round(quantity * unitPrice * CENTS)
}

/** Costo base (COP enteros) = cantidad × precio unitario de la tienda. */
export function calcCostBase(quantity: number, unitPrice: number): number {
  return Math.round(costInCents(quantity, unitPrice) / CENTS)
}

/** Margen Millan (COP enteros) sobre el costo base. */
export function calcMarginAmount(costBase: number, margin: number): number {
  return Math.round(costBase * margin)
}

/** MILLAN PRICE (COP enteros), redondeado hacia arriba al múltiplo indicado. */
export function calcMillanPrice(
  quantity: number,
  unitPrice: number,
  margin: number,
  rounding: number
): number {
  const marginBp = Math.round(margin * BASIS_POINTS)
  const numerator = costInCents(quantity, unitPrice) * (BASIS_POINTS + marginBp)
  const divisor = rounding * CENTS * BASIS_POINTS
  return Math.ceil(numerator / divisor) * rounding
}

/** Convierte un valor de celda a número entero COP, o null si no es numérico. */
export function toCop(value: unknown): number | null {
  if (typeof value !== "number" || !Number.isFinite(value)) return null
  return Math.round(value)
}

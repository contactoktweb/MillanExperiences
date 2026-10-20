import crypto from "crypto"

export interface WompiCustomerData {
  email: string
  fullName: string
  phoneNumber?: string
  phoneNumberPrefix?: string
  legalId?: string
  legalIdType?: "CC" | "CE" | "NIT" | "PP" | "TI" | "DNI"
}

export interface WompiCheckoutOptions {
  currency: "COP"
  amountInCents: number
  reference: string
  publicKey: string
  signature?: {
    integrity: string
  }
  redirectUrl?: string
  customerData?: WompiCustomerData
  expirationTime?: string
  taxInCents?: {
    vat?: number
    consumption?: number
  }
}

export type WompiTransactionStatus =
  | "APPROVED"
  | "DECLINED"
  | "VOIDED"
  | "ERROR"
  | "PENDING"

export interface WompiTransactionData {
  id: string
  created_at: string
  finalized_at?: string
  amount_in_cents: number
  reference: string
  customer_email?: string
  currency: string
  payment_method_type?: string
  payment_method?: {
    type: string
    extra?: Record<string, any>
    installments?: number
  }
  status: WompiTransactionStatus
  status_message?: string
  billing_data?: Record<string, any>
  shipping_address?: Record<string, any>
  redirect_url?: string
  payment_link_id?: string
  customer_data?: {
    full_name?: string
    phone_number?: string
  }
}

export interface WompiWebhookEvent {
  event: string
  data: {
    transaction: WompiTransactionData
    [key: string]: any
  }
  environment?: "prod" | "test"
  signature: {
    properties: string[]
    checksum: string
  }
  timestamp: number
  sent_at: string
}

/**
 * Retorna la URL base de la API de Wompi según la llave o entorno configurado
 */
export function getWompiApiBaseUrl(): string {
  const env = process.env.NEXT_PUBLIC_WOMPI_ENV || ""
  const pubKey = process.env.NEXT_PUBLIC_WOMPI_PUBLIC_KEY || ""
  const prvKey = process.env.WOMPI_PRIVATE_KEY || ""

  // Si alguna llave es de producción o el entorno está marcado como production
  if (
    env.toLowerCase() === "production" ||
    pubKey.startsWith("pub_prod_") ||
    prvKey.startsWith("prv_prod_")
  ) {
    return "https://production.wompi.co/v1"
  }

  return "https://sandbox.wompi.co/v1"
}

/**
 * Calcula la firma de integridad SHA-256 para el Checkout de Wompi.
 * Fórmula oficial: SHA256(reference + amountInCents + currency + [expirationTime] + integritySecret)
 */
export function calculateIntegritySignature({
  reference,
  amountInCents,
  currency = "COP",
  expirationTime,
  integritySecret,
}: {
  reference: string
  amountInCents: number
  currency?: string
  expirationTime?: string
  integritySecret?: string
}): string {
  const secret = integritySecret || process.env.WOMPI_INTEGRITY_SECRET || ""

  if (!secret) {
    throw new Error(
      "WOMPI_INTEGRITY_SECRET no está configurado en las variables de entorno."
    )
  }

  // Concatenación en orden estricto de Wompi
  const concatenated = expirationTime
    ? `${reference}${amountInCents}${currency}${expirationTime}${secret}`
    : `${reference}${amountInCents}${currency}${secret}`

  return crypto.createHash("sha256").update(concatenated, "utf8").digest("hex")
}

/**
 * Obtiene el valor anidado de un objeto a partir de una notación por puntos (ej. "transaction.id")
 */
function getNestedValue(obj: Record<string, any>, path: string): any {
  return path.split(".").reduce((acc, part) => {
    return acc && acc[part] !== undefined ? acc[part] : undefined
  }, obj)
}

/**
 * Valida el Checksum de un webhook de Wompi (evento transaction.updated)
 * Reconstruye el hash concatenando los valores de signature.properties + timestamp + WOMPI_EVENTS_SECRET
 */
export function verifyWompiEventChecksum(
  event: WompiWebhookEvent,
  headerChecksum?: string | null
): { isValid: boolean; expectedChecksum: string; receivedChecksum: string } {
  const eventSecret = process.env.WOMPI_EVENTS_SECRET || ""
  const receivedChecksum =
    headerChecksum || event?.signature?.checksum || ""

  if (!eventSecret) {
    console.warn(
      "[WOMPI WEBHOOK] WOMPI_EVENTS_SECRET no está configurado en .env.local"
    )
    return {
      isValid: false,
      expectedChecksum: "",
      receivedChecksum,
    }
  }

  const properties = event?.signature?.properties || []
  let concatenatedValues = ""

  for (const prop of properties) {
    const val = getNestedValue(event.data, prop)
    if (val !== undefined && val !== null) {
      concatenatedValues += String(val)
    }
  }

  // Concatenar timestamp del evento
  const timestamp = event.timestamp
  const stringToSign = `${concatenatedValues}${timestamp}${eventSecret}`

  const expectedChecksum = crypto
    .createHash("sha256")
    .update(stringToSign, "utf8")
    .digest("hex")

  const isValid =
    expectedChecksum.toLowerCase() === receivedChecksum.toLowerCase()

  return {
    isValid,
    expectedChecksum,
    receivedChecksum,
  }
}

/**
 * Consulta los detalles de una transacción por su ID en Wompi
 */
export async function fetchWompiTransaction(
  transactionId: string
): Promise<{ success: boolean; data?: WompiTransactionData; error?: string }> {
  try {
    const baseUrl = getWompiApiBaseUrl()
    const apiKey =
      process.env.WOMPI_PRIVATE_KEY ||
      process.env.NEXT_PUBLIC_WOMPI_PUBLIC_KEY ||
      ""

    if (!apiKey) {
      return {
        success: false,
        error: "No hay llaves de Wompi configuradas en las variables de entorno.",
      }
    }

    const response = await fetch(`${baseUrl}/transactions/${transactionId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      // Desactivamos caché para transacciones en tiempo real
      cache: "no-store",
    })

    if (!response.ok) {
      const errorText = await response.text()
      return {
        success: false,
        error: `Wompi API error (${response.status}): ${errorText}`,
      }
    }

    const json = await response.json()
    return {
      success: true,
      data: json.data as WompiTransactionData,
    }
  } catch (err: any) {
    return {
      success: false,
      error: err.message || "Error al conectar con la API de Wompi",
    }
  }
}

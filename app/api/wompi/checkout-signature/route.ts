import { NextResponse } from "next/server"
import { calculateIntegritySignature } from "@/lib/wompi"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { reference, amountInCents, currency = "COP", expirationTime } = body

    if (!reference || typeof amountInCents !== "number" || amountInCents <= 0) {
      return NextResponse.json(
        {
          error:
            "Parámetros inválidos. Se requiere 'reference' y 'amountInCents' numérico mayor a 0.",
        },
        { status: 400 }
      )
    }

    const publicKey = process.env.NEXT_PUBLIC_WOMPI_PUBLIC_KEY || ""
    const integritySecret = process.env.WOMPI_INTEGRITY_SECRET || ""

    // Validar si las credenciales de Wompi están configuradas en .env.local
    const isPlaceholder =
      !publicKey ||
      !integritySecret ||
      publicKey.includes("...") ||
      integritySecret.includes("...")

    if (isPlaceholder) {
      return NextResponse.json({
        isConfigured: false,
        warning:
          "Las credenciales de Wompi aún no están configuradas en .env.local (NEXT_PUBLIC_WOMPI_PUBLIC_KEY y WOMPI_INTEGRITY_SECRET).",
        reference,
        amountInCents,
        currency,
        publicKey: publicKey || "pub_test_placeholder",
        signature: "simulated_integrity_signature",
      })
    }

    const signature = calculateIntegritySignature({
      reference,
      amountInCents,
      currency,
      expirationTime,
      integritySecret,
    })

    return NextResponse.json({
      isConfigured: true,
      reference,
      amountInCents,
      currency,
      publicKey,
      signature,
    })
  } catch (error: any) {
    console.error("Error generando firma de integridad Wompi:", error)
    return NextResponse.json(
      { error: error.message || "Error interno calculando la firma de Wompi" },
      { status: 500 }
    )
  }
}

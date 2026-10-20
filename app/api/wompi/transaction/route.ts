import { NextResponse } from "next/server"
import { fetchWompiTransaction } from "@/lib/wompi"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const transactionId = searchParams.get("id")

    if (!transactionId) {
      return NextResponse.json(
        { error: "El parámetro 'id' de transacción es requerido." },
        { status: 400 }
      )
    }

    const apiKey =
      process.env.WOMPI_PRIVATE_KEY ||
      process.env.NEXT_PUBLIC_WOMPI_PUBLIC_KEY ||
      ""

    const isPlaceholder =
      !apiKey || apiKey.includes("...") || apiKey.includes("placeholder")

    // Si las llaves aún no se han pegado en el .env.local o es una simulación
    if (isPlaceholder || transactionId.startsWith("sim-")) {
      return NextResponse.json({
        success: true,
        isSimulated: true,
        transaction: {
          id: transactionId,
          created_at: new Date().toISOString(),
          amount_in_cents: 0,
          reference: "SIMULATED-REF",
          currency: "COP",
          payment_method_type: "SIMULATED",
          status: "APPROVED",
          status_message: "Transacción en modo de prueba / simulación local.",
        },
      })
    }

    const result = await fetchWompiTransaction(transactionId)

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: result.error,
        },
        { status: 502 }
      )
    }

    return NextResponse.json({
      success: true,
      transaction: result.data,
    })
  } catch (error: any) {
    console.error("Error al consultar transacción Wompi:", error)
    return NextResponse.json(
      { error: error.message || "Error consultando transacción Wompi" },
      { status: 500 }
    )
  }
}

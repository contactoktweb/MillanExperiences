import { NextResponse } from "next/server"
import { verifyWompiEventChecksum, WompiWebhookEvent } from "@/lib/wompi"
import { sendStoreOrderPaidEmail } from "@/lib/email"
import { createClient } from "next-sanity"
import { apiVersion, dataset, projectId } from "@/sanity/env"

const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
})

export async function POST(req: Request) {
  try {
    const rawBody = await req.json()
    const headerChecksum = req.headers.get("x-event-checksum")

    const event = rawBody as WompiWebhookEvent

    // 1. Validar integridad criptográfica del evento con Wompi
    const checksumResult = verifyWompiEventChecksum(event, headerChecksum)

    // Si el secreto de eventos está configurado y el checksum no coincide, rechazamos
    if (process.env.WOMPI_EVENTS_SECRET && !checksumResult.isValid) {
      console.warn(
        `[WOMPI WEBHOOK REJECTED] Checksum inválido. Recibido: ${checksumResult.receivedChecksum}, Esperado: ${checksumResult.expectedChecksum}`
      )
      return NextResponse.json(
        { error: "Checksum de firma inválido." },
        { status: 401 }
      )
    }

    const { event: eventName, data } = event
    const transaction = data?.transaction

    console.log(
      `[WOMPI WEBHOOK] Evento recibido: ${eventName} | Transacción: ${transaction?.id} | Estado: ${transaction?.status} | Ref: ${transaction?.reference}`
    )

    // 2. Procesar evento de actualización de transacción
    if (eventName === "transaction.updated" && transaction) {
      const docId = `store-order-${String(transaction.reference).toLowerCase().replace(/[^a-z0-9_-]/g, "-")}`
      const now = new Date().toISOString()
      const newStatus =
        transaction.status === "APPROVED"
          ? "paid"
          : transaction.status === "DECLINED"
          ? "declined"
          : "pending_payment"

      // Actualizar pedido en Sanity CMS
      try {
        await writeClient
          .patch(docId)
          .set({
            status: newStatus,
            transactionId: transaction.id,
            paymentMethod: transaction.payment_method_type || "Tarjeta / PSE",
            updatedAt: now,
          })
          .commit()
      } catch (sanityErr) {
        console.warn("[WOMPI WEBHOOK] Aviso al actualizar estado de orden en Sanity:", sanityErr)
      }

      if (transaction.status === "APPROVED") {
        console.log(
          `[WOMPI WEBHOOK] Pago APROBADO para orden ${transaction.reference} por ${transaction.amount_in_cents / 100} COP.`
        )

        // Enviar correo de notificación del pago
        try {
          await sendStoreOrderPaidEmail({
            orderId: transaction.reference,
            customerName:
              transaction.customer_data?.full_name || "Cliente Millan Experiences",
            customerEmail:
              transaction.customer_email || "cliente@millan-experiences.com",
            customerPhone:
              transaction.customer_data?.phone_number || "No registrado",
            destination: "Coordinar con concierge",
            deliveryDate: "Programada con concierge",
            totalAmount: Math.round(transaction.amount_in_cents / 100),
            wompiTransactionId: transaction.id,
            paymentMethod: transaction.payment_method_type || "Tarjeta / PSE",
            items: [
              {
                name: `Orden de Tienda (${transaction.reference})`,
                quantity: 1,
                priceCOP: Math.round(transaction.amount_in_cents / 100),
              },
            ],
          })
        } catch (emailErr) {
          console.error(
            "[WOMPI WEBHOOK] Error enviando correo de confirmación:",
            emailErr
          )
        }
      }
    }

    return NextResponse.json({
      received: true,
      status: "processed",
      transactionId: transaction?.id,
    })
  } catch (error: any) {
    console.error("[WOMPI WEBHOOK ERROR]:", error)
    return NextResponse.json(
      { error: error.message || "Error procesando webhook de Wompi" },
      { status: 500 }
    )
  }
}

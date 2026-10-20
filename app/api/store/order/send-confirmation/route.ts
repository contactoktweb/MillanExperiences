import { NextResponse } from "next/server"
import { sendStoreOrderPaidEmails, StoreOrderEmailData } from "@/lib/email"
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
    const data = (await req.json()) as StoreOrderEmailData

    if (!data.orderId || !data.customerEmail || !data.customerName) {
      return NextResponse.json(
        { error: "Faltan datos obligatorios para el envío de confirmación." },
        { status: 400 }
      )
    }

    // 1. Sincronizar y asegurar registro en Sanity CMS (con estado 'paid')
    try {
      const docId = `store-order-${String(data.orderId).toLowerCase().replace(/[^a-z0-9_-]/g, "-")}`
      const now = new Date().toISOString()
      const formattedItems = (data.items || []).map((it, idx) => ({
        _key: `item-${idx}-${Date.now().toString(36)}`,
        name: it.name,
        quantity: it.quantity,
        priceCOP: it.priceCOP,
      }))

      await writeClient
        .transaction()
        .createIfNotExists({
          _id: docId,
          _type: "storeOrder",
          orderId: data.orderId,
          customerName: data.customerName,
          customerEmail: data.customerEmail.toLowerCase(),
          customerPhone: data.customerPhone || "",
          destination: data.destination || "",
          deliveryDate: data.deliveryDate || "",
          notes: data.notes || "",
          totalAmount: data.totalAmount || 0,
          status: "paid",
          transactionId: data.wompiTransactionId || undefined,
          paymentMethod: data.paymentMethod || undefined,
          items: formattedItems,
          createdAt: now,
          updatedAt: now,
        })
        .patch(docId, (patch) => {
          let p = patch.set({
            status: "paid",
            updatedAt: now,
          })
          if (data.wompiTransactionId) p = p.set({ transactionId: data.wompiTransactionId })
          if (data.paymentMethod) p = p.set({ paymentMethod: data.paymentMethod })
          return p
        })
        .commit()
    } catch (sanityErr) {
      console.warn("[API STORE ORDER SEND CONFIRMATION] Aviso al actualizar pedido en Sanity:", sanityErr)
    }

    // 2. Disparar el envío de correos tanto al comprador como a administración
    const result = await sendStoreOrderPaidEmails(data)

    return NextResponse.json({
      success: true,
      result,
    })
  } catch (error: any) {
    console.error("[API STORE ORDER SEND CONFIRMATION ERROR]:", error)
    return NextResponse.json(
      { error: error.message || "Error al procesar el envío de correos." },
      { status: 500 }
    )
  }
}

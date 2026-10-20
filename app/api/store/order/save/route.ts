import { NextResponse } from "next/server"
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
    const body = await req.json()
    const {
      orderId,
      customerName,
      customerEmail,
      customerPhone,
      destination,
      deliveryDate,
      notes,
      totalAmount,
      status = "pending_payment",
      paymentMethod,
      transactionId,
      items = [],
    } = body

    if (!orderId || !customerName || !customerEmail) {
      return NextResponse.json(
        { error: "orderId, customerName y customerEmail son requeridos." },
        { status: 400 }
      )
    }

    const docId = `store-order-${String(orderId).toLowerCase().replace(/[^a-z0-9_-]/g, "-")}`
    const now = new Date().toISOString()

    const formattedItems = Array.isArray(items)
      ? items.map((it: any, idx: number) => ({
          _key: `item-${idx}-${Date.now().toString(36)}`,
          name: it.name || "Producto",
          quantity: Number(it.quantity) || 1,
          priceCOP: Number(it.priceCOP) || 0,
          presentation: it.presentation || "",
        }))
      : []

    const baseDoc = {
      _id: docId,
      _type: "storeOrder",
      orderId,
      customerName: String(customerName).trim(),
      customerEmail: String(customerEmail).trim().toLowerCase(),
      customerPhone: String(customerPhone || "").trim(),
      destination: String(destination || "").trim(),
      deliveryDate: String(deliveryDate || "").trim(),
      notes: notes ? String(notes).trim() : "",
      totalAmount: Number(totalAmount) || 0,
      status: String(status || "pending_payment"),
      paymentMethod: paymentMethod ? String(paymentMethod) : undefined,
      transactionId: transactionId ? String(transactionId) : undefined,
      items: formattedItems,
      createdAt: now,
      updatedAt: now,
    }

    // Usar transacción atómica: si no existe lo crea; si ya existe, actualiza estado y detalles
    await writeClient
      .transaction()
      .createIfNotExists(baseDoc)
      .patch(docId, (patch) => {
        let p = patch.set({ updatedAt: now })
        if (status) p = p.set({ status: String(status) })
        if (paymentMethod) p = p.set({ paymentMethod: String(paymentMethod) })
        if (transactionId) p = p.set({ transactionId: String(transactionId) })
        return p
      })
      .commit()

    return NextResponse.json({
      success: true,
      orderId,
      docId,
      status,
    })
  } catch (error: any) {
    console.error("[API STORE ORDER SAVE SANITY ERROR]:", error)
    return NextResponse.json(
      { error: error?.message || "Error al registrar el pedido en el sistema." },
      { status: 500 }
    )
  }
}

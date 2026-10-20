"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import {
  CheckCircle2,
  MessageCircle,
  Clock,
  MapPin,
  Calendar,
  User,
  ShoppingBag,
  ArrowLeft,
  Phone,
  CreditCard,
  ShieldCheck,
  AlertCircle,
  Loader2,
} from "lucide-react"
import { useStore, StoreOrder, StoreProvider } from "@/lib/store-context"
import { formatCOP } from "@/lib/store-data"
import { contact } from "@/lib/site-data"
import { translateProductName } from "@/lib/store-i18n"

function ThankYouContent() {
  const searchParams = useSearchParams()
  const orderIdParam = searchParams.get("orderId")
  const transactionId = searchParams.get("id")
  const isSimulated = searchParams.get("simulated") === "true"

  const { currentOrder, updateOrderPayment, locale } = useStore()
  const [order, setOrder] = useState<StoreOrder | null>(null)
  const [wompiStatus, setWompiStatus] = useState<
    "loading" | "APPROVED" | "PENDING" | "DECLINED" | "ERROR" | "SIMULATED" | null
  >(null)
  const [transactionDetails, setTransactionDetails] = useState<any>(null)

  useEffect(() => {
    if (currentOrder) {
      setOrder(currentOrder)
    } else {
      try {
        const saved = localStorage.getItem("millan_store_last_order_v1")
        if (saved) {
          setOrder(JSON.parse(saved))
        }
      } catch (e) {
        console.error(e)
      }
    }
  }, [currentOrder])

  // Consultar estado de la transacción en Wompi si viene el ID en la URL
  useEffect(() => {
    if (isSimulated) {
      setWompiStatus("SIMULATED")
      return
    }

    if (!transactionId) {
      if (order?.paymentStatus) {
        setWompiStatus(order.paymentStatus)
      }
      return
    }

    let isMounted = true
    setWompiStatus("loading")

    fetch(`/api/wompi/transaction?id=${encodeURIComponent(transactionId)}`)
      .then((res) => res.json())
      .then((data) => {
        if (!isMounted) return
        if (data.success && data.transaction) {
          const status = data.transaction.status
          setWompiStatus(status)
          setTransactionDetails(data.transaction)

          const targetId = orderIdParam || order?.id
          if (targetId) {
            updateOrderPayment(targetId, {
              status: status === "APPROVED" ? "paid" : "pending_payment",
              paymentStatus: status,
              paymentMethod: data.transaction.payment_method_type,
              wompiTransactionId: transactionId,
            })
          }
        } else {
          setWompiStatus("PENDING")
        }
      })
      .catch((err) => {
        console.error("Error consultando estado de transacción:", err)
        if (isMounted) setWompiStatus("PENDING")
      })

    return () => {
      isMounted = false
    }
  }, [transactionId, isSimulated, orderIdParam, order?.id, order?.paymentStatus, updateOrderPayment])

  const orderId = order?.id || orderIdParam || "MIL-RES-8421"
  const customerName = order?.customer.fullName || (locale === "en" ? "Valued Client" : "Estimado(a) Cliente")
  const isApproved = wompiStatus === "APPROVED" || order?.paymentStatus === "APPROVED"

  // Sincronizar estado en Sanity en segundo plano según el resultado final de la pasarela
  useEffect(() => {
    if (!order || !wompiStatus || wompiStatus === "loading") return
    const statusMap: Record<string, string> = {
      APPROVED: "paid",
      SIMULATED: "paid",
      DECLINED: "declined",
      ERROR: "declined",
      PENDING: "pending_payment",
    }
    const finalStatus = statusMap[wompiStatus] || "pending_payment"
    fetch("/api/store/order/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        orderId: order.id,
        customerName: order.customer.fullName,
        customerEmail: order.customer.email,
        customerPhone: order.customer.phone,
        destination: order.customer.destination,
        deliveryDate: order.customer.deliveryDate,
        notes: order.customer.notes,
        totalAmount: order.totalAmount,
        status: finalStatus,
        transactionId: transactionId || order.wompiTransactionId,
        paymentMethod: transactionDetails?.payment_method_type || order.paymentMethod,
        items: order.items.map((i) => ({
          name: i.product.name,
          quantity: i.quantity,
          priceCOP: i.product.priceCOP,
          presentation: i.product.presentation,
        })),
      }),
    }).catch((e) => console.error("Error sincronizando estado de orden en Sanity:", e))
  }, [order, wompiStatus, transactionId, transactionDetails])

  // Enviar correos de confirmación tanto al comprador como a administración si la orden está aprobada o lista
  useEffect(() => {
    if (!order || !order.customer?.email) return
    if (isApproved || isSimulated) {
      fetch("/api/store/order/send-confirmation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: order.id,
          customerName: order.customer.fullName,
          customerEmail: order.customer.email,
          customerPhone: order.customer.phone,
          destination: order.customer.destination,
          deliveryDate: order.customer.deliveryDate,
          notes: order.customer.notes,
          totalAmount: order.totalAmount,
          wompiTransactionId: transactionId || order.wompiTransactionId,
          paymentMethod: transactionDetails?.payment_method_type || order.paymentMethod || "Tarjeta / PSE",
          items: order.items.map((i) => ({
            name: translateProductName(i.product.name, locale),
            quantity: i.quantity,
            priceCOP: i.product.priceCOP,
          })),
        }),
      }).catch((e) => console.error("Error al enviar correos de confirmación:", e))
    }
  }, [order, isApproved, isSimulated, transactionId, transactionDetails, locale])

  // Pre-filled WhatsApp link
  const waPaymentDetail = isApproved
    ? locale === "en"
      ? ` The payment was APPROVED successfully! (Transaction: ${transactionId || order?.wompiTransactionId || "Approved"})`
      : ` ¡El pago fue APROBADO exitosamente! (Transacción: ${transactionId || order?.wompiTransactionId || "Exitosa"})`
    : wompiStatus === "PENDING"
    ? locale === "en"
      ? ` (Payment is currently being validated by the bank)`
      : ` (El pago está en proceso de validación bancaria)`
    : ""

  const waText = encodeURIComponent(
    locale === "en"
      ? `Hello Millan Experiences, I just completed my order with code ${orderId} for ${customerName}.${waPaymentDetail} I would like to coordinate delivery details.`
      : `Hola Millan Experiences, acabo de registrar mi orden en la tienda con código ${orderId} a nombre de ${customerName}.${waPaymentDetail} Deseo coordinar los detalles de entrega náutica.`
  )
  const whatsappUrl = `https://wa.me/573107102651?text=${waText}`

  return (
    <div className="bg-[var(--color-warm-white)] min-h-screen pt-32 pb-12 sm:pt-36 sm:pb-20 md:pt-40 md:pb-24 text-[var(--color-deep-sea)]">
      <div className="mx-auto max-w-2xl px-3.5 sm:px-6 md:px-8">
        {/* Success Card */}
        <div className="bg-white border border-[color:var(--color-border-light)] p-5 sm:p-8 md:p-10 shadow-xl rounded-sm">
          <div className="text-center">
            <div
              className={`mx-auto flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full border ${
                wompiStatus === "DECLINED" || wompiStatus === "ERROR"
                  ? "bg-rose-50 text-rose-600 border-rose-200"
                  : "bg-emerald-50 text-emerald-600 border border-emerald-200"
              }`}
            >
              {wompiStatus === "DECLINED" || wompiStatus === "ERROR" ? (
                <AlertCircle className="w-7 h-7 sm:w-8 sm:h-8" />
              ) : (
                <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8" />
              )}
            </div>

            <span className="mt-4 sm:mt-5 inline-block font-sans text-[0.62rem] sm:text-[0.66rem] uppercase tracking-[0.2em] text-[var(--color-sand)] font-semibold">
              {isApproved
                ? (locale === "en" ? "Payment Confirmed" : "Pago Confirmado")
                : wompiStatus === "PENDING"
                ? (locale === "en" ? "Bank Validation in Progress" : "Validación Bancaria en Curso")
                : wompiStatus === "DECLINED"
                ? (locale === "en" ? "Payment Pending Review" : "Pago Pendiente de Regularizar")
                : (locale === "en" ? "Order Received" : "Compra Registrada")}
            </span>

            <h1 className="mt-1.5 font-serif text-2xl sm:text-3xl md:text-4xl text-[var(--color-deep-sea)] font-normal leading-tight">
              {wompiStatus === "DECLINED"
                ? (locale === "en" ? "Order Registered · Payment Pending" : "Compra Registrada · Pago Pendiente")
                : (locale === "en" ? "Thank You for Your Order!" : "¡Gracias por tu Compra!")}
            </h1>

            <p className="mt-2 font-sans text-xs sm:text-sm text-[var(--color-blue-gray)] max-w-md mx-auto leading-relaxed">
              {isApproved
                ? (locale === "en"
                    ? "Your payment has been approved successfully. Our nautical concierge is already preparing your provision."
                    : "Tu pago ha sido aprobado exitosamente. Nuestro concierge náutico ya se encuentra coordinando tu servicio.")
                : (locale === "en"
                    ? "We have received your order of private cellar selections and gourmet delicacies for your voyage."
                    : "Hemos recibido tu compra de cava y alimentos gourmet para tu experiencia náutica.")}
            </p>

            {/* Order Code Badge */}
            <div className="mt-4 sm:mt-5 inline-flex items-center gap-2 bg-[var(--color-deep-sea)] text-[var(--color-warm-white)] px-4 py-2 sm:px-5 sm:py-2.5 rounded-sm border border-[var(--color-sand)]">
              <span className="font-sans text-[0.68rem] sm:text-xs uppercase tracking-wider text-[var(--color-warm-white)]/70">
                {locale === "en" ? "Order Code:" : "Código de Pedido:"}
              </span>
              <span className="font-mono text-xs sm:text-sm font-bold text-[var(--color-sand)]">
                {orderId}
              </span>
            </div>

            {/* Transaction Status Section */}
            {wompiStatus === "loading" && (
              <div className="mt-5 p-4 bg-gray-50 border border-gray-200 rounded text-center flex items-center justify-center gap-2 text-xs font-sans text-[var(--color-blue-gray)]">
                <Loader2 className="w-4 h-4 animate-spin text-[var(--color-sand)]" />
                <span>{locale === "en" ? "Verifying payment confirmation in real-time..." : "Verificando confirmación del pago en tiempo real..."}</span>
              </div>
            )}

            {isApproved && (
              <div className="mt-5 border border-emerald-300 bg-emerald-50/80 p-4 rounded-sm text-left">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-600" />
                    <span className="font-sans text-xs uppercase tracking-wider font-bold text-emerald-900">
                      {locale === "en" ? "Payment Successfully Approved" : "Pago Aprobado Exitosamente"}
                    </span>
                  </div>
                  <span className="font-mono text-[0.65rem] bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                    {locale === "en" ? "APPROVED" : "APROBADO"}
                  </span>
                </div>
                <div className="mt-2.5 text-xs font-sans text-emerald-900 grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-emerald-200/60">
                  <div>
                    <span className="text-[0.65rem] text-emerald-700 uppercase tracking-wider block font-medium">
                      {locale === "en" ? "Transaction ID:" : "ID de Transacción:"}
                    </span>
                    <span className="font-mono font-semibold break-all">
                      {transactionId || transactionDetails?.id || order?.wompiTransactionId || (locale === "en" ? "Confirmed" : "Confirmada")}
                    </span>
                  </div>
                  {transactionDetails?.payment_method_type && (
                    <div>
                      <span className="text-[0.65rem] text-emerald-700 uppercase tracking-wider block font-medium">
                        {locale === "en" ? "Payment Method:" : "Método Utilizado:"}
                      </span>
                      <span className="font-semibold uppercase">
                        {transactionDetails.payment_method_type}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {wompiStatus === "PENDING" && (
              <div className="mt-5 border border-amber-300 bg-amber-50/90 p-4 rounded-sm text-left">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-amber-600" />
                    <span className="font-sans text-xs uppercase tracking-wider font-bold text-amber-950">
                      {locale === "en" ? "Payment Under Banking Validation" : "Pago en Proceso Bancario"}
                    </span>
                  </div>
                  <span className="font-mono text-[0.65rem] bg-amber-200 text-amber-950 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                    {locale === "en" ? "PENDING" : "PENDIENTE"}
                  </span>
                </div>
                <p className="mt-2 text-xs font-sans text-amber-900 leading-relaxed">
                  {locale === "en"
                    ? "Your financial institution is processing the transaction. Your items are reserved; you will receive an automatic notification as soon as it clears."
                    : "Tu entidad bancaria está validando la operación. Tu reserva se mantendrá apartada; en cuanto se reciba la confirmación bancaria te notificaremos automáticamente."}
                </p>
                {transactionId && (
                  <p className="mt-1 font-mono text-[0.68rem] text-amber-800">
                    ID Transacción: {transactionId}
                  </p>
                )}
              </div>
            )}

            {wompiStatus === "DECLINED" && (
              <div className="mt-5 border border-rose-300 bg-rose-50/90 p-4 rounded-sm text-left">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-rose-600" />
                    <span className="font-sans text-xs uppercase tracking-wider font-bold text-rose-950">
                      {locale === "en" ? "Payment Declined by Bank" : "Pago No Aprobado por el Banco"}
                    </span>
                  </div>
                  <span className="font-mono text-[0.65rem] bg-rose-200 text-rose-950 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                    {locale === "en" ? "DECLINED" : "RECHAZADO"}
                  </span>
                </div>
                <p className="mt-2 text-xs font-sans text-rose-900 leading-relaxed">
                  {locale === "en"
                    ? "The transaction could not be authorized by your issuer. Please contact our concierge to complete with another payment option."
                    : "La transacción no fue autorizada por el emisor. Puedes comunicarte directamente con nuestro Concierge para asistirte con otro método de pago."}
                </p>
              </div>
            )}

            {wompiStatus === "SIMULATED" && (
              <div className="mt-5 border border-[var(--color-sand)] bg-[var(--color-sand)]/10 p-4 rounded-sm text-left">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-[var(--color-dark-sand)]" />
                    <span className="font-sans text-xs uppercase tracking-wider font-bold text-[var(--color-deep-sea)]">
                      {locale === "en" ? "Order Registration Confirmed" : "Registro de Compra Confirmado"}
                    </span>
                  </div>
                  <span className="font-mono text-[0.65rem] bg-[var(--color-sand)]/30 text-[var(--color-deep-sea)] px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                    {locale === "en" ? "CONFIRMED" : "CONFIRMADO"}
                  </span>
                </div>
                <p className="mt-2 text-xs font-sans text-[var(--color-deep-sea)]/85 leading-relaxed">
                  {locale === "en"
                    ? "We have recorded your order successfully. Our Concierge team will reach out promptly to coordinate dispatch and finalize details."
                    : "Hemos registrado tu orden satisfactoriamente. Nuestro equipo de Concierge se pondrá en contacto para coordinar la entrega y finalizar los detalles."}
                </p>
              </div>
            )}
          </div>

          {/* 8-Hour Notice & Concierge Alert Box */}
          <div className="mt-6 sm:mt-8 bg-[var(--color-sand)]/15 border border-[var(--color-sand)]/60 p-3.5 sm:p-4 md:p-5 rounded-sm">
            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--color-dark-sand)] shrink-0 mt-0.5" />
              <div>
                <h2 className="font-serif text-sm sm:text-base md:text-lg text-[var(--color-deep-sea)]">
                  {locale === "en" ? "Nautical Preparation & 8-Hour Policy" : "Preparación Náutica & Regla de 8 Horas"}
                </h2>
                <p className="mt-1 font-sans text-xs sm:text-sm text-[var(--color-deep-sea)]/85 leading-relaxed">
                  {locale === "en" ? (
                    <>Please keep in mind that all orders require at least <strong className="font-semibold">8 hours advance notice</strong> for optimal cellar chilling and pier staging. Our concierge team is already attending to your booking.</>
                  ) : (
                    <>Recordamos que todos los pedidos requieren al menos <strong className="font-semibold">8 horas de anticipación</strong> para enfriamiento óptimo en cavas y logística de despacho. Nuestro equipo de concierge ya está procesando tu solicitud.</>
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Customer & Delivery Summary */}
          {order && (
            <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 border-t border-b border-[color:var(--color-border-light)] py-5 sm:py-6 text-xs font-sans">
              <div className="flex items-start gap-2.5">
                <User className="w-4 h-4 text-[var(--color-blue-gray)] mt-0.5 shrink-0" />
                <div className="min-w-0">
                  <span className="text-[var(--color-blue-gray)] uppercase tracking-wider block text-[0.62rem]">
                    {locale === "en" ? "Customer" : "Titular"}
                  </span>
                  <span className="font-semibold text-[var(--color-deep-sea)] text-xs sm:text-sm block truncate">
                    {order.customer.fullName}
                  </span>
                  <span className="block text-gray-500 mt-0.5 break-words">
                    {order.customer.phone} · {order.customer.email}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[var(--color-blue-gray)] mt-0.5 shrink-0" />
                <div className="min-w-0">
                  <span className="text-[var(--color-blue-gray)] uppercase tracking-wider block text-[0.62rem]">
                    {locale === "en" ? "Delivery Destination" : "Destino de Entrega"}
                  </span>
                  <span className="font-semibold text-[var(--color-deep-sea)] text-xs sm:text-sm block">
                    {order.customer.destination}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Calendar className="w-4 h-4 text-[var(--color-blue-gray)] mt-0.5 shrink-0" />
                <div className="min-w-0">
                  <span className="text-[var(--color-blue-gray)] uppercase tracking-wider block text-[0.62rem]">
                    {locale === "en" ? "Scheduled Date" : "Fecha Programada"}
                  </span>
                  <span className="font-semibold text-[var(--color-deep-sea)] text-xs sm:text-sm block">
                    {order.customer.deliveryDate}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Items Summary Table */}
          {order && order.items.length > 0 && (
            <div className="mt-6">
              <h3 className="font-serif text-base text-[var(--color-deep-sea)] flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-[var(--color-sand)]" />
                {locale === "en" ? "Order Summary" : "Resumen de Productos Solicitados"}
              </h3>
              <div className="mt-3 divide-y divide-[color:var(--color-border-light)] border border-[color:var(--color-border-light)] rounded-sm bg-[var(--color-warm-white)]/40 p-4">
                {order.items.map((it) => (
                  <div key={it.product.id} className="py-2.5 flex justify-between items-center text-xs font-sans">
                    <div>
                      <span className="font-semibold text-[var(--color-deep-sea)]">
                        {translateProductName(it.product.name, locale)}
                      </span>
                      <span className="text-[var(--color-blue-gray)] ml-2">
                        x{it.quantity}
                      </span>
                    </div>
                    <span className="font-medium text-[var(--color-deep-sea)]">
                      {formatCOP(it.product.priceCOP * it.quantity)}
                    </span>
                  </div>
                ))}
                <div className="pt-3 flex justify-between items-center text-sm font-sans font-bold text-[var(--color-deep-sea)]">
                  <span>{locale === "en" ? "Total Amount:" : "Total de la Compra:"}</span>
                  <span>{formatCOP(order.totalAmount)}</span>
                </div>
              </div>
            </div>
          )}

          {/* WhatsApp Support Callout */}
          <div className="mt-8 sm:mt-10 rounded-sm bg-[var(--color-deep-sea)] text-[var(--color-warm-white)] p-5 sm:p-7 md:p-8 text-center border border-[var(--color-sand)] shadow-lg">
            <div className="mx-auto flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-[#25D366] text-white">
              <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>

            <h3 className="mt-3.5 sm:mt-4 font-serif text-lg sm:text-xl md:text-2xl text-[var(--color-warm-white)]">
              {locale === "en" ? "Any questions or updates to your booking?" : "¿Cualquier inquietud o cambio en tu pedido?"}
            </h3>

            <p className="mt-2 font-sans text-xs sm:text-sm text-[var(--color-warm-white)]/80 max-w-lg mx-auto leading-relaxed">
              {locale === "en"
                ? "For special requests, itinerary changes, or questions regarding departure, contact our Concierge team directly on the official Millan Experiences WhatsApp."
                : "Ante cualquier eventualidad, requerimiento especial o consulta sobre el zarpe, comunícate directamente con nuestro Concierge por el WhatsApp oficial de Millan Experiences."}
            </p>

            <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-sans text-xs uppercase tracking-wider font-semibold px-5 py-3 sm:px-6 sm:py-3.5 rounded-sm shadow-md transition-all hover:scale-105"
              >
                <MessageCircle className="w-4 h-4" />
                {locale === "en" ? "Contact Concierge via WhatsApp" : "Contactar al Concierge por WhatsApp"}
              </a>
              <a
                href={`tel:${contact.phone.replace(/[^0-9+]/g, "")}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-white/30 hover:border-white text-[var(--color-warm-white)] font-sans text-xs uppercase tracking-wider px-4 py-3 sm:px-5 sm:py-3.5 rounded-sm transition-colors"
              >
                <Phone className="w-4 h-4 text-[var(--color-sand)]" />
                {locale === "en" ? `Call: ${contact.phone}` : `Llamar: ${contact.phone}`}
              </a>
            </div>
          </div>

          {/* Footer Back Links */}
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 pt-5 sm:pt-6 border-t border-[color:var(--color-border-light)]">
            <Link
              href="/tienda"
              className="inline-flex items-center gap-2 font-sans text-xs text-[var(--color-deep-sea)] hover:text-[var(--color-sand)] uppercase tracking-wider transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {locale === "en" ? "Return to Store" : "Volver a la Tienda"}
            </Link>

            <Link
              href="/"
              className="font-sans text-xs text-[var(--color-blue-gray)] hover:text-[var(--color-deep-sea)] transition-colors"
            >
              {locale === "en" ? "Visit Millan Experiences homepage" : "Ir a la página principal de Millan Experiences"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export function ThankYouClient() {
  return (
    <StoreProvider>
      <ThankYouContent />
    </StoreProvider>
  )
}

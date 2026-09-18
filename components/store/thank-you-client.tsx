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
  FileText,
  Phone,
  HelpCircle,
} from "lucide-react"
import { useStore, StoreOrder, StoreProvider } from "@/lib/store-context"
import { formatCOP } from "@/lib/store-data"
import { contact } from "@/lib/site-data"

function ThankYouContent() {
  const searchParams = useSearchParams()
  const orderIdParam = searchParams.get("orderId")
  const { currentOrder } = useStore()
  const [order, setOrder] = useState<StoreOrder | null>(null)

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

  const orderId = order?.id || orderIdParam || "MIL-RES-8421"
  const customerName = order?.customer.fullName || "Estimado(a) Cliente"

  // Pre-filled WhatsApp link
  const waText = encodeURIComponent(
    `Hola Millan Experiences, acabo de confirmar mi reserva en la tienda con código ${orderId} a nombre de ${customerName}. Me gustaría coordinar los detalles de entrega.`
  )
  const whatsappUrl = `https://wa.me/573107102651?text=${waText}`

  return (
    <div className="bg-[var(--color-warm-white)] min-h-screen pt-32 pb-12 sm:pt-36 sm:pb-20 md:pt-40 md:pb-24 text-[var(--color-deep-sea)]">
      <div className="mx-auto max-w-2xl px-3.5 sm:px-6 md:px-8">
        {/* Success Card */}
        <div className="bg-white border border-[color:var(--color-border-light)] p-5 sm:p-8 md:p-10 shadow-xl rounded-sm">
          <div className="text-center">
            <div className="mx-auto flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
              <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>

            <span className="mt-4 sm:mt-5 inline-block font-sans text-[0.62rem] sm:text-[0.66rem] uppercase tracking-[0.2em] text-[var(--color-sand)] font-semibold">
              Reserva Registrada
            </span>

            <h1 className="mt-1.5 font-serif text-2xl sm:text-3xl md:text-4xl text-[var(--color-deep-sea)] font-normal leading-tight">
              ¡Gracias por tu Reserva!
            </h1>

            <p className="mt-2 font-sans text-xs sm:text-sm text-[var(--color-blue-gray)] max-w-md mx-auto leading-relaxed">
              Hemos recibido tu solicitud de cava y alimentos gourmet para tu experiencia.
            </p>

            {/* Order Code Badge */}
            <div className="mt-4 sm:mt-5 inline-flex items-center gap-2 bg-[var(--color-deep-sea)] text-[var(--color-warm-white)] px-4 py-2 sm:px-5 sm:py-2.5 rounded-sm border border-[var(--color-sand)]">
              <span className="font-sans text-[0.68rem] sm:text-xs uppercase tracking-wider text-[var(--color-warm-white)]/70">
                Código de Reserva:
              </span>
              <span className="font-mono text-xs sm:text-sm font-bold text-[var(--color-sand)]">
                {orderId}
              </span>
            </div>
          </div>

          {/* 8-Hour Notice & Concierge WhatsApp Alert Box */}
          <div className="mt-6 sm:mt-8 bg-[var(--color-sand)]/15 border border-[var(--color-sand)]/60 p-3.5 sm:p-4 md:p-5 rounded-sm">
            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--color-dark-sand)] shrink-0 mt-0.5" />
              <div>
                <h2 className="font-serif text-sm sm:text-base md:text-lg text-[var(--color-deep-sea)]">
                  Preparación Náutica & Regla de 8 Horas
                </h2>
                <p className="mt-1 font-sans text-xs sm:text-sm text-[var(--color-deep-sea)]/85 leading-relaxed">
                  Recordamos que todos los pedidos requieren al menos <strong>8 horas de anticipación</strong> para enfriamiento óptimo en cavas y logística de despacho. Nuestro equipo de concierge ya está procesando tu solicitud.
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
                    Titular
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
                    Destino de Entrega
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
                    Fecha y Hora Programada
                  </span>
                  <span className="font-semibold text-[var(--color-deep-sea)] text-xs sm:text-sm block">
                    {order.customer.deliveryDate} a las {order.customer.deliveryTime}
                  </span>
                </div>
              </div>

              {order.customer.reservationNumber && (
                <div className="flex items-start gap-2.5">
                  <FileText className="w-4 h-4 text-[var(--color-blue-gray)] mt-0.5" />
                  <div>
                    <span className="text-[var(--color-blue-gray)] uppercase tracking-wider block text-[0.62rem]">
                      Reserva Previa Asociada
                    </span>
                    <span className="font-semibold text-[var(--color-deep-sea)] text-sm">
                      {order.customer.reservationNumber}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Items Summary Table */}
          {order && order.items.length > 0 && (
            <div className="mt-6">
              <h3 className="font-serif text-base text-[var(--color-deep-sea)] flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-[var(--color-sand)]" />
                Resumen de Productos Solicitados
              </h3>
              <div className="mt-3 divide-y divide-[color:var(--color-border-light)] border border-[color:var(--color-border-light)] rounded-sm bg-[var(--color-warm-white)]/40 p-4">
                {order.items.map((it) => (
                  <div key={it.product.id} className="py-2.5 flex justify-between items-center text-xs font-sans">
                    <div>
                      <span className="font-semibold text-[var(--color-deep-sea)]">
                        {it.product.name}
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
                  <span>Total de la Reserva:</span>
                  <span>{formatCOP(order.totalAmount)}</span>
                </div>
              </div>
            </div>
          )}

          {/* WhatsApp Support Callout (USER REQUIREMENT) */}
          <div className="mt-8 sm:mt-10 rounded-sm bg-[var(--color-deep-sea)] text-[var(--color-warm-white)] p-5 sm:p-7 md:p-8 text-center border border-[var(--color-sand)] shadow-lg">
            <div className="mx-auto flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-[#25D366] text-white">
              <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>

            <h3 className="mt-3.5 sm:mt-4 font-serif text-lg sm:text-xl md:text-2xl text-[var(--color-warm-white)]">
              ¿Cualquier inquietud o cambio en tu pedido?
            </h3>

            <p className="mt-2 font-sans text-xs sm:text-sm text-[var(--color-warm-white)]/80 max-w-lg mx-auto leading-relaxed">
              Ante cualquier eventualidad, requerimiento especial o consulta sobre el zarpe, comunícate directamente con nuestro Concierge por el WhatsApp oficial de Millan Experiences.
            </p>

            <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-sans text-xs uppercase tracking-wider font-semibold px-5 py-3 sm:px-6 sm:py-3.5 rounded-sm shadow-md transition-all hover:scale-105"
              >
                <MessageCircle className="w-4 h-4" />
                Contactar al Concierge por WhatsApp
              </a>
              <a
                href={`tel:${contact.phone.replace(/[^0-9+]/g, "")}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-white/30 hover:border-white text-[var(--color-warm-white)] font-sans text-xs uppercase tracking-wider px-4 py-3 sm:px-5 sm:py-3.5 rounded-sm transition-colors"
              >
                <Phone className="w-4 h-4 text-[var(--color-sand)]" />
                Llamar: {contact.phone}
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
              Volver a la Tienda
            </Link>

            <Link
              href="/"
              className="font-sans text-xs text-[var(--color-blue-gray)] hover:text-[var(--color-deep-sea)] transition-colors"
            >
              Ir a la página principal de Millan Experiences
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

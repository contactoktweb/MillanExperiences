"use client"

import { useState, useMemo, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import {
  X,
  Trash2,
  Plus,
  Minus,
  Clock,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  ShoppingBag,
  CreditCard,
} from "lucide-react"
import { useStore } from "@/lib/store-context"
import { formatCOP } from "@/lib/store-data"
import { cn } from "@/lib/utils"

export function CartDrawer() {
  const router = useRouter()
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    totalItems,
    totalAmount,
    placeOrder,
  } = useStore()

  const [shouldRender, setShouldRender] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const [fullName, setFullName] = useState("")
  const [phone, setPhone] = useState("+57 ")
  const [email, setEmail] = useState("")
  const [deliveryDate, setDeliveryDate] = useState("")
  const [deliveryTime, setDeliveryTime] = useState("10:00")
  const [destination, setDestination] = useState("")
  const [reservationNumber, setReservationNumber] = useState("")
  const [notes, setNotes] = useState("")

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isProcessing, setIsProcessing] = useState(false)

  // Smooth entry and exit animations
  useEffect(() => {
    let timeout: NodeJS.Timeout
    if (isCartOpen) {
      setShouldRender(true)
      timeout = setTimeout(() => {
        setIsVisible(true)
      }, 20)
      document.body.style.overflow = "hidden"
    } else {
      setIsVisible(false)
      timeout = setTimeout(() => {
        setShouldRender(false)
      }, 450)
      document.body.style.overflow = ""
    }
    return () => clearTimeout(timeout)
  }, [isCartOpen])

  // ESC key support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isCartOpen) {
        setIsCartOpen(false)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isCartOpen, setIsCartOpen])

  // Calculate if chosen date & time is at least 8 hours in advance
  const hoursDifference = useMemo(() => {
    if (!deliveryDate || !deliveryTime) return null
    const target = new Date(`${deliveryDate}T${deliveryTime}:00`)
    const now = new Date()
    const diffMs = target.getTime() - now.getTime()
    return diffMs / (1000 * 60 * 60)
  }, [deliveryDate, deliveryTime])

  const isLessThan8Hours = hoursDifference !== null && hoursDifference < 8

  // Helper minimum date string (today)
  const todayStr = useMemo(() => {
    const d = new Date()
    const y = d.getFullYear()
    const m = String(d.getMonth() + 1).padStart(2, "0")
    const day = String(d.getDate()).padStart(2, "0")
    return `${y}-${m}-${day}`
  }, [])

  if (!shouldRender) return null

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault()
    const errs: Record<string, string> = {}

    if (!fullName.trim()) errs.fullName = "Ingresa tu nombre completo."
    if (!phone.trim() || phone.trim() === "+57") errs.phone = "Ingresa un teléfono o WhatsApp de contacto."
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) errs.email = "Ingresa un correo electrónico válido."
    if (!deliveryDate) errs.deliveryDate = "Selecciona la fecha de entrega."
    if (!destination.trim()) errs.destination = "Indica el yate, muelle o villa de entrega."

    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }

    setIsProcessing(true)

    // Execute placeOrder
    const order = placeOrder({
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: email.trim(),
      deliveryDate,
      deliveryTime,
      destination: destination.trim(),
      reservationNumber: reservationNumber.trim() || undefined,
      notes: notes.trim() || undefined,
    })

    setIsCartOpen(false)
    setIsProcessing(false)

    // Redirect to thank you page
    router.push(`/tienda/gracias?orderId=${order.id}`)
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Carrito de compras y checkout de reserva"
      className="fixed inset-0 z-[110] flex justify-end overflow-hidden"
    >
      {/* Animated Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className={cn(
          "fixed inset-0 bg-[var(--color-deep-sea)]/75 backdrop-blur-sm transition-opacity duration-400 ease-out",
          isVisible ? "opacity-100" : "opacity-0"
        )}
      />

      {/* Animated Drawer panel */}
      <aside
        className={cn(
          "relative flex h-full w-full max-w-xl flex-col bg-[var(--color-warm-white)] text-[var(--color-deep-sea)] z-10 overflow-y-auto transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] shadow-2xl",
          isVisible ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Drawer Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-[color:var(--color-border-light)] bg-[var(--color-warm-white)]/95 backdrop-blur-md px-6 py-5">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[var(--color-sand)]" />
            <div>
              <h2 className="font-serif text-xl tracking-tight text-[var(--color-deep-sea)]">
                Tu Reserva
              </h2>
              <p className="font-sans text-[0.66rem] uppercase tracking-widest text-[var(--color-blue-gray)]">
                {totalItems} {totalItems === 1 ? "artículo" : "artículos"} seleccionados
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            aria-label="Cerrar carrito"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-deep-sea)]/5 text-[var(--color-deep-sea)] hover:bg-[var(--color-deep-sea)] hover:text-[var(--color-warm-white)] transition-all duration-300 hover:rotate-90"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in zoom-in-95 duration-300">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-sand)]/20 text-[var(--color-dark-sand)]">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="mt-4 font-serif text-2xl text-[var(--color-deep-sea)]">
                Tu carrito está vacío
              </h3>
              <p className="mt-2 max-w-xs font-sans text-sm text-[var(--color-blue-gray)]">
                Explora nuestra cava de licores, vinos, cervezas y comida gourmet para armar tu experiencia a bordo.
              </p>
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="mt-6 border border-[var(--color-deep-sea)] px-6 py-2.5 font-sans text-xs uppercase tracking-[0.16em] text-[var(--color-deep-sea)] hover:bg-[var(--color-deep-sea)] hover:text-[var(--color-warm-white)] transition-colors"
              >
                Ver Catálogo
              </button>
            </div>
          ) : (
            <>
              {/* 8-Hour Notice Alert */}
              <div className="bg-[var(--color-sand)]/15 border-l-4 border-[var(--color-sand)] p-4 rounded-r-sm">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[var(--color-dark-sand)] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-sans text-xs uppercase tracking-wider font-semibold text-[var(--color-deep-sea)]">
                      Regla de Anticipación: Mínimo 8 Horas
                    </h3>
                    <p className="mt-1 font-sans text-xs text-[var(--color-deep-sea)]/80 leading-relaxed">
                      Para garantizar el alistamiento, frío idóneo y entrega en muelle o villa, tu reserva debe programarse con al menos <strong>8 horas de antelación</strong>.
                    </p>
                  </div>
                </div>
              </div>

              {/* Items List */}
              <div className="divide-y divide-[color:var(--color-border-light)] border-t border-b border-[color:var(--color-border-light)]">
                {cart.map((item) => (
                  <div key={item.product.id} className="py-4 flex gap-4 items-center">
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-sm bg-black/5">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif text-base text-[var(--color-deep-sea)] truncate">
                        {item.product.name}
                      </h4>
                      <p className="font-sans text-xs text-[var(--color-blue-gray)]">
                        {formatCOP(item.product.priceCOP)} c/u
                      </p>
                      <div className="mt-2 flex items-center gap-3">
                        <div className="flex items-center border border-[color:var(--color-border-light)] rounded-sm bg-white">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="px-2 py-0.5 text-xs text-[var(--color-deep-sea)] hover:text-[var(--color-sand)]"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 font-sans text-xs font-semibold text-[var(--color-deep-sea)]">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="px-2 py-0.5 text-xs text-[var(--color-deep-sea)] hover:text-[var(--color-sand)]"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="font-sans text-xs font-semibold text-[var(--color-deep-sea)]">
                          {formatCOP(item.product.priceCOP * item.quantity)}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.product.id)}
                      aria-label={`Eliminar ${item.product.name}`}
                      className="p-1.5 text-[var(--color-blue-gray)] hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Total Breakdown */}
              <div className="bg-white/80 p-4 rounded-sm border border-[color:var(--color-border-light)] space-y-2">
                <div className="flex justify-between font-sans text-xs text-[var(--color-blue-gray)]">
                  <span>Subtotal productos:</span>
                  <span>{formatCOP(totalAmount)}</span>
                </div>
                <div className="flex justify-between font-sans text-xs text-[var(--color-blue-gray)]">
                  <span>Alistamiento & Servicio náutico:</span>
                  <span className="text-[var(--color-dark-sand)] font-medium">Incluido</span>
                </div>
                <div className="pt-2 border-t border-[color:var(--color-border-light)] flex justify-between font-sans">
                  <span className="text-sm font-semibold text-[var(--color-deep-sea)]">
                    Total a Confirmar:
                  </span>
                  <span className="text-lg font-bold text-[var(--color-deep-sea)]">
                    {formatCOP(totalAmount)}
                  </span>
                </div>
              </div>

              {/* Checkout Form */}
              <form onSubmit={handleCheckout} className="space-y-4 pt-2">
                <h3 className="font-serif text-lg text-[var(--color-deep-sea)] border-b border-[color:var(--color-border-light)] pb-2">
                  Datos de Entrega & Reserva
                </h3>

                {/* Full Name */}
                <div>
                  <label className="block font-sans text-[0.66rem] font-medium uppercase tracking-[0.2em] text-[var(--color-blue-gray)]">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value)
                      setErrors((err) => ({ ...err, fullName: "" }))
                    }}
                    placeholder="Ej. Sofia Vergara / John Smith"
                    className="mt-1 w-full border border-[color:var(--color-border-light)] bg-white px-3 py-2.5 font-sans text-sm text-[var(--color-deep-sea)] placeholder:text-gray-400 focus:border-[var(--color-sand)] focus:outline-none"
                  />
                  {errors.fullName && (
                    <p className="mt-1 font-sans text-xs text-red-600">{errors.fullName}</p>
                  )}
                </div>

                {/* Phone & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-sans text-[0.66rem] font-medium uppercase tracking-[0.2em] text-[var(--color-blue-gray)]">
                      Teléfono / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value)
                        setErrors((err) => ({ ...err, phone: "" }))
                      }}
                      placeholder="+57 300 000 0000"
                      className="mt-1 w-full border border-[color:var(--color-border-light)] bg-white px-3 py-2.5 font-sans text-sm text-[var(--color-deep-sea)] placeholder:text-gray-400 focus:border-[var(--color-sand)] focus:outline-none"
                    />
                    {errors.phone && (
                      <p className="mt-1 font-sans text-xs text-red-600">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label className="block font-sans text-[0.66rem] font-medium uppercase tracking-[0.2em] text-[var(--color-blue-gray)]">
                      Correo Electrónico *
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value)
                        setErrors((err) => ({ ...err, email: "" }))
                      }}
                      placeholder="nombre@ejemplo.com"
                      className="mt-1 w-full border border-[color:var(--color-border-light)] bg-white px-3 py-2.5 font-sans text-sm text-[var(--color-deep-sea)] placeholder:text-gray-400 focus:border-[var(--color-sand)] focus:outline-none"
                    />
                    {errors.email && (
                      <p className="mt-1 font-sans text-xs text-red-600">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* Delivery Date & Time (8 Hours Rule) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-sans text-[0.66rem] font-medium uppercase tracking-[0.2em] text-[var(--color-blue-gray)]">
                      Fecha de Entrega *
                    </label>
                    <input
                      type="date"
                      min={todayStr}
                      value={deliveryDate}
                      onChange={(e) => {
                        setDeliveryDate(e.target.value)
                        setErrors((err) => ({ ...err, deliveryDate: "" }))
                      }}
                      className="mt-1 w-full border border-[color:var(--color-border-light)] bg-white px-3 py-2.5 font-sans text-sm text-[var(--color-deep-sea)] focus:border-[var(--color-sand)] focus:outline-none"
                    />
                    {errors.deliveryDate && (
                      <p className="mt-1 font-sans text-xs text-red-600">{errors.deliveryDate}</p>
                    )}
                  </div>

                  <div>
                    <label className="block font-sans text-[0.66rem] font-medium uppercase tracking-[0.2em] text-[var(--color-blue-gray)]">
                      Hora estimada *
                    </label>
                    <input
                      type="time"
                      value={deliveryTime}
                      onChange={(e) => setDeliveryTime(e.target.value)}
                      className="mt-1 w-full border border-[color:var(--color-border-light)] bg-white px-3 py-2.5 font-sans text-sm text-[var(--color-deep-sea)] focus:border-[var(--color-sand)] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Warning if less than 8 hours */}
                {isLessThan8Hours && (
                  <div className="flex items-start gap-2 bg-amber-50 border border-amber-300 p-3 rounded-sm text-amber-900">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <p className="font-sans text-xs leading-tight">
                      <strong>Aviso de Entrega Rápida:</strong> El horario seleccionado tiene menos de 8 horas de anticipación. Haremos todo lo posible por alistarlo; un concierge se contactará de inmediato por WhatsApp para coordinar la viabilidad.
                    </p>
                  </div>
                )}

                {/* Delivery Location */}
                <div>
                  <label className="block font-sans text-[0.66rem] font-medium uppercase tracking-[0.2em] text-[var(--color-blue-gray)]">
                    Lugar / Yate / Villa de Entrega *
                  </label>
                  <input
                    type="text"
                    value={destination}
                    onChange={(e) => {
                      setDestination(e.target.value)
                      setErrors((err) => ({ ...err, destination: "" }))
                    }}
                    placeholder="Ej. Yate Cohiba en Muelle Los Pegasos, o Casa Hilda"
                    className="mt-1 w-full border border-[color:var(--color-border-light)] bg-white px-3 py-2.5 font-sans text-sm text-[var(--color-deep-sea)] placeholder:text-gray-400 focus:border-[var(--color-sand)] focus:outline-none"
                  />
                  {errors.destination && (
                    <p className="mt-1 font-sans text-xs text-red-600">{errors.destination}</p>
                  )}
                </div>

                {/* Optional Reservation Number */}
                <div>
                  <div className="flex items-center justify-between">
                    <label className="block font-sans text-[0.66rem] font-medium uppercase tracking-[0.2em] text-[var(--color-blue-gray)]">
                      Número de Reserva Millan
                    </label>
                    <span className="font-sans text-[0.62rem] text-[var(--color-dark-sand)] uppercase tracking-wider">
                      (Opcional)
                    </span>
                  </div>
                  <input
                    type="text"
                    value={reservationNumber}
                    onChange={(e) => setReservationNumber(e.target.value)}
                    placeholder="Ej. #MIL-2026-XXXX (si ya tienes yate o villa reservada)"
                    className="mt-1 w-full border border-[color:var(--color-border-light)] bg-white px-3 py-2.5 font-sans text-sm text-[var(--color-deep-sea)] placeholder:text-gray-400 focus:border-[var(--color-sand)] focus:outline-none"
                  />
                </div>

                {/* Special Instructions */}
                <div>
                  <label className="block font-sans text-[0.66rem] font-medium uppercase tracking-[0.2em] text-[var(--color-blue-gray)]">
                    Instrucciones Especiales / Hielo / Copas
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Ej. Llevar abundante hielo, copas de champagne y rodajas de lima..."
                    className="mt-1 w-full border border-[color:var(--color-border-light)] bg-white px-3 py-2 font-sans text-sm text-[var(--color-deep-sea)] placeholder:text-gray-400 focus:border-[var(--color-sand)] focus:outline-none"
                  />
                </div>

                {/* Wompi Payment Banner */}
                <div className="border border-[color:var(--color-border-light)] bg-white p-4 rounded-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-[var(--color-sand)]" />
                      <span className="font-sans text-xs font-semibold text-[var(--color-deep-sea)]">
                        Pasarela de Pago Wompi
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-1 font-sans text-[0.62rem] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      <ShieldCheck className="w-3 h-3" />
                      Pago Seguro
                    </span>
                  </div>
                  <p className="mt-2 font-sans text-[0.7rem] text-[var(--color-blue-gray)] leading-relaxed">
                    Acepta Tarjetas de Crédito/Débito, PSE, Nequi y Bancolombia. Al hacer clic en <em>Confirmar y Pagar</em>, tu solicitud será registrada y te redirigiremos a la confirmación inmediata.
                  </p>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full flex items-center justify-center gap-2 bg-[var(--color-deep-sea)] text-[var(--color-warm-white)] hover:bg-[var(--color-deep-sea)]/90 px-6 py-3.5 font-sans text-xs uppercase tracking-[0.18em] font-medium border border-[var(--color-sand)] transition-all duration-300 disabled:opacity-50"
                >
                  {isProcessing ? (
                    "Procesando tu Reserva..."
                  ) : (
                    <>
                      Confirmar y Proceder al Pago
                      <ArrowRight className="w-4 h-4 text-[var(--color-sand)]" />
                    </>
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </aside>
    </div>
  )
}

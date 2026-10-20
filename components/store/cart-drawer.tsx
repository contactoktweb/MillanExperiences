"use client"

import { useState, useMemo, useEffect } from "react"
import { ProductImage } from "./product-image"
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
  Lock,
} from "lucide-react"
import { useStore } from "@/lib/store-context"
import { formatCOP } from "@/lib/store-data"
import { translateProductName, STORE_I18N } from "@/lib/store-i18n"
import { cn } from "@/lib/utils"
import { startWompiCheckout, loadWompiWidgetScript } from "@/lib/wompi-client"

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
    updateOrderPayment,
    locale,
  } = useStore()

  const dict = STORE_I18N[locale]

  const [shouldRender, setShouldRender] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const [fullName, setFullName] = useState("")
  const [phone, setPhone] = useState("+57 ")
  const [email, setEmail] = useState("")
  const [deliveryDate, setDeliveryDate] = useState("")
  const [destination, setDestination] = useState("")
  const [notes, setNotes] = useState("")

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isProcessing, setIsProcessing] = useState(false)
  const [wompiNotice, setWompiNotice] = useState<string | null>(null)
  const [wompiPendingUrl, setWompiPendingUrl] = useState<string | null>(null)

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

  // ESC key support & payment script preloading
  useEffect(() => {
    if (isCartOpen) {
      loadWompiWidgetScript().catch(() => {})
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isCartOpen) {
        setIsCartOpen(false)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isCartOpen, setIsCartOpen])

  // Helper minimum date string (today)
  const todayStr = useMemo(() => {
    const d = new Date()
    const y = d.getFullYear()
    const m = String(d.getMonth() + 1).padStart(2, "0")
    const day = String(d.getDate()).padStart(2, "0")
    return `${y}-${m}-${day}`
  }, [])

  // Check if delivery is requested for today (same-day quick delivery)
  const isSameDayDelivery = useMemo(() => {
    if (!deliveryDate) return false
    return deliveryDate === todayStr
  }, [deliveryDate, todayStr])

  if (!shouldRender) return null

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs: Record<string, string> = {}

    if (!fullName.trim()) errs.fullName = dict.cartErrors.fullName
    if (!phone.trim() || phone.trim() === "+57") errs.phone = dict.cartErrors.phone
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) errs.email = dict.cartErrors.email
    if (!deliveryDate) errs.deliveryDate = dict.cartErrors.deliveryDate
    if (!destination.trim()) errs.destination = dict.cartErrors.destination

    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }

    setErrors({})
    setWompiNotice(null)
    setIsProcessing(true)

    try {
      // 1. Registrar la orden preliminar en el estado
      const order = placeOrder(
        {
          fullName: fullName.trim(),
          phone: phone.trim(),
          email: email.trim(),
          deliveryDate,
          destination: destination.trim(),
          notes: notes.trim() || undefined,
        },
        "pending_payment"
      )

      // Guardar de inmediato la solicitud de pago en el backend (Sanity CMS) de forma transparente
      fetch("/api/store/order/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: order.id,
          customerName: fullName.trim(),
          customerEmail: email.trim(),
          customerPhone: phone.trim(),
          destination: destination.trim(),
          deliveryDate,
          notes: notes.trim() || undefined,
          totalAmount,
          status: "pending_payment",
          items: cart.map((i) => ({
            name: i.product.name,
            quantity: i.quantity,
            priceCOP: i.product.priceCOP,
            presentation: i.product.presentation,
          })),
        }),
      }).catch((err) => console.error("Error al registrar solicitud en Sanity:", err))

      // Cerrar el drawer para dar foco completo al modal de pago
      setIsCartOpen(false)

      // 2. Invocar la pasarela de pagos
      const checkoutResult = await startWompiCheckout({
        orderId: order.id,
        amountCOP: totalAmount,
        locale,
        customer: {
          fullName: fullName.trim(),
          email: email.trim(),
          phone: phone.trim(),
        },
        onSuccess: (transaction) => {
          updateOrderPayment(order.id, {
            status: "paid",
            paymentStatus: transaction.status,
            paymentMethod: transaction.payment_method_type,
            wompiTransactionId: transaction.id,
          })

          // Actualizar de inmediato el pedido a pagado en Sanity
          fetch("/api/store/order/save", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              orderId: order.id,
              customerName: fullName.trim(),
              customerEmail: email.trim(),
              customerPhone: phone.trim(),
              destination: destination.trim(),
              deliveryDate,
              notes: notes.trim() || undefined,
              totalAmount,
              status: "paid",
              transactionId: transaction.id,
              paymentMethod: transaction.payment_method_type || "Tarjeta / PSE",
              items: cart.map((i) => ({
                name: i.product.name,
                quantity: i.quantity,
                priceCOP: i.product.priceCOP,
                presentation: i.product.presentation,
              })),
            }),
          }).catch((err) => console.error("Error al actualizar orden en Sanity:", err))

          // Disparar envío de correos de confirmación con Resend tanto al comprador como a administración
          fetch("/api/store/order/send-confirmation", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              orderId: order.id,
              customerName: fullName.trim(),
              customerEmail: email.trim(),
              customerPhone: phone.trim(),
              destination: destination.trim(),
              deliveryDate,
              notes: notes.trim() || undefined,
              totalAmount,
              wompiTransactionId: transaction.id,
              paymentMethod: transaction.payment_method_type || "Tarjeta / PSE",
              items: cart.map((i) => ({
                name: translateProductName(i.product.name, locale),
                quantity: i.quantity,
                priceCOP: i.product.priceCOP,
              })),
            }),
          }).catch((err) => console.error("Error al enviar correos de confirmación:", err))

          router.push(`/tienda/gracias?orderId=${order.id}&id=${transaction.id}`)
        },
        onDismiss: () => {
          setIsProcessing(false)
          setIsCartOpen(true)
        },
        onError: (err) => {
          console.error("Error en checkout:", err)
          setIsCartOpen(true)
          setErrors({ submit: err.message || (locale === "en" ? "Error connecting to the payment gateway." : "Error al conectar con la pasarela de pagos.") })
          setIsProcessing(false)
        },
      })

      // 3. Si las claves de la pasarela no están configuradas
      if (!checkoutResult.isConfigured) {
        setIsProcessing(false)
        setIsCartOpen(true)
        setWompiNotice(
          checkoutResult.warning ||
            (locale === "en"
              ? "The payment service is temporarily unavailable. Please contact our Concierge team."
              : "El servicio de pago no está disponible temporalmente. Por favor contacta a nuestro Concierge.")
        )
        setWompiPendingUrl(
          checkoutResult.simulatedUrl || `/tienda/gracias?orderId=${order.id}&simulated=true`
        )
        return
      }

      setIsProcessing(false)
    } catch (err: any) {
      console.error("Error en proceso de checkout:", err)
      setErrors({
        submit:
          err.message ||
          (locale === "en"
            ? "Could not start the secure payment process."
            : "No se pudo iniciar el proceso de pago."),
      })
      setIsProcessing(false)
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={dict.cartTitle}
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
                {dict.cartTitle}
              </h2>
              <p className="font-sans text-[0.66rem] uppercase tracking-widest text-[var(--color-blue-gray)]">
                {dict.cartItemsCount(totalItems)}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            aria-label={locale === "en" ? "Close cart" : "Cerrar carrito"}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-deep-sea)]/5 text-[var(--color-deep-sea)] hover:bg-[var(--color-deep-sea)] hover:text-[var(--color-warm-white)] transition-all duration-300 hover:rotate-90 cursor-pointer"
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
                {dict.cartEmpty}
              </h3>
              <p className="mt-2 max-w-xs font-sans text-sm text-[var(--color-blue-gray)]">
                {dict.cartEmptySubtitle}
              </p>
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="mt-6 border border-[var(--color-deep-sea)] px-6 py-2.5 font-sans text-xs uppercase tracking-[0.16em] text-[var(--color-deep-sea)] hover:bg-[var(--color-deep-sea)] hover:text-[var(--color-warm-white)] transition-colors cursor-pointer"
              >
                {dict.cartExplore}
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
                      {dict.cartNotice8HoursTitle}
                    </h3>
                    <p className="mt-1 font-sans text-xs text-[var(--color-deep-sea)]/80 leading-relaxed">
                      {dict.cartNotice8HoursBody}
                    </p>
                  </div>
                </div>
              </div>

              {/* Items List */}
              <div className="divide-y divide-[color:var(--color-border-light)] border-t border-b border-[color:var(--color-border-light)]">
                {cart.map((item) => {
                  const displayName = translateProductName(item.product.name, locale)
                  return (
                    <div key={item.product.id} className="py-4 flex gap-4 items-center">
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-sm bg-white border border-[color:var(--color-border-light)] p-1 flex items-center justify-center">
                        <ProductImage
                          src={item.product.image}
                          alt={displayName}
                          sizes="64px"
                          className="p-1"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif text-base text-[var(--color-deep-sea)] truncate">
                          {displayName}
                        </h4>
                        <p className="font-sans text-xs text-[var(--color-blue-gray)]">
                          {formatCOP(item.product.priceCOP)} {locale === "en" ? "each" : "c/u"}
                        </p>
                        <div className="mt-2 flex items-center gap-3">
                          <div className="flex items-center border border-[color:var(--color-border-light)] rounded-sm bg-white">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              aria-label={locale === "en" ? "Decrease quantity" : "Disminuir cantidad"}
                              className="px-2 py-0.5 text-xs text-[var(--color-deep-sea)] hover:text-[var(--color-sand)] cursor-pointer"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 font-sans text-xs font-semibold text-[var(--color-deep-sea)]">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              aria-label={locale === "en" ? "Increase quantity" : "Aumentar cantidad"}
                              className="px-2 py-0.5 text-xs text-[var(--color-deep-sea)] hover:text-[var(--color-sand)] cursor-pointer"
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
                        aria-label={dict.cartRemoveItem(displayName)}
                        className="p-1.5 text-[var(--color-blue-gray)] hover:text-red-600 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )
                })}
              </div>

              {/* Total Breakdown */}
              <div className="bg-white/80 p-4 rounded-sm border border-[color:var(--color-border-light)] space-y-2">
                <div className="flex justify-between font-sans text-xs text-[var(--color-blue-gray)]">
                  <span>{dict.cartSubtotalProducts}</span>
                  <span>{formatCOP(totalAmount)}</span>
                </div>
                <div className="flex justify-between font-sans text-xs text-[var(--color-blue-gray)]">
                  <span>{dict.cartNauticalService}</span>
                  <span className="text-[var(--color-dark-sand)] font-medium">{dict.cartIncluded}</span>
                </div>
                <div className="pt-2 border-t border-[color:var(--color-border-light)] flex justify-between font-sans">
                  <span className="text-sm font-semibold text-[var(--color-deep-sea)]">
                    {dict.cartTotalToConfirm}
                  </span>
                  <span className="text-lg font-bold text-[var(--color-deep-sea)]">
                    {formatCOP(totalAmount)}
                  </span>
                </div>
              </div>

              {/* Checkout Form */}
              <form onSubmit={handleCheckout} className="space-y-4 pt-2">
                <h3 className="font-serif text-lg text-[var(--color-deep-sea)] border-b border-[color:var(--color-border-light)] pb-2">
                  {dict.cartDeliverySectionTitle}
                </h3>

                {/* Full Name */}
                <div>
                  <label className="block font-sans text-[0.66rem] font-medium uppercase tracking-[0.2em] text-[var(--color-blue-gray)]">
                    {dict.cartFullName}
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value)
                      setErrors((err) => ({ ...err, fullName: "" }))
                    }}
                    placeholder={dict.cartFullNamePlaceholder}
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
                      {dict.cartPhone}
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value)
                        setErrors((err) => ({ ...err, phone: "" }))
                      }}
                      placeholder={dict.cartPhonePlaceholder}
                      className="mt-1 w-full border border-[color:var(--color-border-light)] bg-white px-3 py-2.5 font-sans text-sm text-[var(--color-deep-sea)] placeholder:text-gray-400 focus:border-[var(--color-sand)] focus:outline-none"
                    />
                    {errors.phone && (
                      <p className="mt-1 font-sans text-xs text-red-600">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label className="block font-sans text-[0.66rem] font-medium uppercase tracking-[0.2em] text-[var(--color-blue-gray)]">
                      {dict.cartEmail}
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value)
                        setErrors((err) => ({ ...err, email: "" }))
                      }}
                      placeholder={dict.cartEmailPlaceholder}
                      className="mt-1 w-full border border-[color:var(--color-border-light)] bg-white px-3 py-2.5 font-sans text-sm text-[var(--color-deep-sea)] placeholder:text-gray-400 focus:border-[var(--color-sand)] focus:outline-none"
                    />
                    {errors.email && (
                      <p className="mt-1 font-sans text-xs text-red-600">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* Delivery Date */}
                <div>
                  <label className="block font-sans text-[0.66rem] font-medium uppercase tracking-[0.2em] text-[var(--color-blue-gray)]">
                    {dict.cartDeliveryDate}
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

                {/* Warning if same-day delivery */}
                {isSameDayDelivery && (
                  <div className="flex items-start gap-2 bg-amber-50 border border-amber-300 p-3 rounded-sm text-amber-900">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <p className="font-sans text-xs leading-tight">
                      <strong>{dict.cartSameDayWarningTitle}</strong> {dict.cartSameDayWarningBody}
                    </p>
                  </div>
                )}

                {/* Delivery Location */}
                <div>
                  <label className="block font-sans text-[0.66rem] font-medium uppercase tracking-[0.2em] text-[var(--color-blue-gray)]">
                    {dict.cartDestination}
                  </label>
                  <input
                    type="text"
                    value={destination}
                    onChange={(e) => {
                      setDestination(e.target.value)
                      setErrors((err) => ({ ...err, destination: "" }))
                    }}
                    placeholder={dict.cartDestinationPlaceholder}
                    className="mt-1 w-full border border-[color:var(--color-border-light)] bg-white px-3 py-2.5 font-sans text-sm text-[var(--color-deep-sea)] placeholder:text-gray-400 focus:border-[var(--color-sand)] focus:outline-none"
                  />
                  {errors.destination && (
                    <p className="mt-1 font-sans text-xs text-red-600">{errors.destination}</p>
                  )}
                </div>

                {/* Special Instructions */}
                <div>
                  <label className="block font-sans text-[0.66rem] font-medium uppercase tracking-[0.2em] text-[var(--color-blue-gray)]">
                    {dict.cartNotes}
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder={dict.cartNotesPlaceholder}
                    className="mt-1 w-full border border-[color:var(--color-border-light)] bg-white px-3 py-2 font-sans text-sm text-[var(--color-deep-sea)] placeholder:text-gray-400 focus:border-[var(--color-sand)] focus:outline-none"
                  />
                </div>

                {/* Formas de Pago Disponibles Banner */}
                <div className="border border-[color:var(--color-border-light)] bg-white p-4 rounded-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-[var(--color-sand)]" />
                      <span className="font-sans text-xs font-semibold text-[var(--color-deep-sea)]">
                        {dict.cartPaymentMethods}
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-1 font-sans text-[0.62rem] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      <ShieldCheck className="w-3 h-3" />
                      {dict.cartSsl}
                    </span>
                  </div>

                  {/* Payment Methods Badges */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-[0.62rem] font-semibold tracking-wide rounded">
                      {dict.cartCardsBadge}
                    </span>
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-800 text-[0.62rem] font-semibold tracking-wide rounded border border-blue-200">
                      PSE
                    </span>
                    <span className="px-2 py-0.5 bg-purple-50 text-purple-800 text-[0.62rem] font-semibold tracking-wide rounded border border-purple-200">
                      Nequi
                    </span>
                    <span className="px-2 py-0.5 bg-yellow-50 text-yellow-900 text-[0.62rem] font-semibold tracking-wide rounded border border-yellow-200">
                      Botón Bancolombia
                    </span>
                  </div>

                  <p className="font-sans text-[0.7rem] text-[var(--color-blue-gray)] leading-relaxed">
                    {dict.cartSecurityNote}
                  </p>
                </div>

                {/* Error message */}
                {errors.submit && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700 text-xs font-sans">
                    {errors.submit}
                  </div>
                )}

                {/* Notice when payment service is unavailable */}
                {wompiNotice && (
                  <div className="p-3.5 bg-amber-50/90 border border-amber-300 rounded text-amber-900 text-xs font-sans space-y-2">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <p className="text-[0.72rem] text-amber-900 leading-relaxed">
                        {wompiNotice}
                      </p>
                    </div>

                    <div className="pt-2 flex flex-wrap items-center gap-2 border-t border-amber-200/80">
                      {wompiPendingUrl && (
                        <button
                          type="button"
                          onClick={() => {
                            setIsCartOpen(false)
                            router.push(wompiPendingUrl)
                          }}
                          className="bg-[var(--color-deep-sea)] hover:bg-[var(--color-deep-sea)]/90 text-[var(--color-warm-white)] text-[0.66rem] uppercase tracking-wider font-semibold px-3 py-1.5 rounded transition-colors cursor-pointer"
                        >
                          {locale === "en" ? "Continue" : "Continuar"}
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => setWompiNotice(null)}
                        className="text-[0.66rem] text-amber-800 underline px-2 py-1 hover:text-amber-950 cursor-pointer"
                      >
                        {locale === "en" ? "Dismiss" : "Cerrar aviso"}
                      </button>
                    </div>
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full flex items-center justify-center gap-2 bg-[var(--color-deep-sea)] text-[var(--color-warm-white)] hover:bg-[var(--color-deep-sea)]/90 px-6 py-3.5 font-sans text-xs uppercase tracking-[0.18em] font-medium border border-[var(--color-sand)] transition-all duration-300 disabled:opacity-50 shadow-md cursor-pointer"
                >
                  {isProcessing ? (
                    dict.cartProcessing
                  ) : (
                    <>
                      <Lock className="w-3.5 h-3.5 text-[var(--color-sand)]" />
                      {dict.cartPayNow} · {formatCOP(totalAmount)}
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

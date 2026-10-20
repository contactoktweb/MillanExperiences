"use client"

export interface OpenWompiCheckoutParams {
  orderId: string
  amountCOP: number
  customer: {
    fullName: string
    email: string
    phone: string
  }
  locale?: "es" | "en"
  onSuccess?: (transaction: any) => void
  onDismiss?: () => void
  onError?: (error: Error) => void
}

declare global {
  interface Window {
    WidgetCheckout?: any
  }
}

/**
 * Espera a que el script oficial de Wompi esté cargado en window.WidgetCheckout
 */
export function loadWompiWidgetScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      resolve()
      return
    }

    // 1. Si ya está cargado y listo
    if (typeof window.WidgetCheckout === "function") {
      resolve()
      return
    }

    let attempts = 0
    const maxAttempts = 60 // 3 segundos (60 * 50ms)
    const checkInterval = setInterval(() => {
      attempts++
      if (typeof window.WidgetCheckout === "function") {
        clearInterval(checkInterval)
        resolve()
      } else if (attempts >= maxAttempts) {
        clearInterval(checkInterval)
        // Si no cargó el widget en ventana, resolvemos para que el fallback redirija al Hosted Checkout
        resolve()
      }
    }, 50)

    // 2. Si no existe la etiqueta script en el DOM, la insertamos
    const existing = document.querySelector('script[src*="checkout.wompi.co/widget.js"]')
    if (!existing) {
      const script = document.createElement("script")
      script.id = "wompi-widget-script"
      script.src = "https://checkout.wompi.co/widget.js"
      script.async = true
      script.onload = () => {
        if (typeof window.WidgetCheckout === "function") {
          clearInterval(checkInterval)
          resolve()
        }
      }
      script.onerror = () => {
        clearInterval(checkInterval)
        reject(new Error("No se pudo cargar el script de pagos."))
      }
      document.head.appendChild(script)
    }
  })
}

/**
 * Solicita la firma de integridad e inicia la pasarela de pagos
 * Si el modal interactivo no se puede renderizar, utiliza el Web Checkout oficial como fallback
 */
export async function startWompiCheckout({
  orderId,
  amountCOP,
  customer,
  locale = "es",
  onSuccess,
  onDismiss,
  onError,
}: OpenWompiCheckoutParams): Promise<{
  isConfigured: boolean
  warning?: string
  simulatedUrl?: string
  webCheckoutUrl?: string
}> {
  try {
    const amountInCents = Math.round(amountCOP * 100)
    const selectedLanguage = locale === "en" ? "en" : "es"

    // 1. Obtener firma de integridad desde el servidor seguro
    const res = await fetch("/api/wompi/checkout-signature", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        reference: orderId,
        amountInCents,
        currency: "COP",
      }),
    })

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}))
      throw new Error(
        errData.error || "No se pudo obtener la firma de seguridad desde el servidor."
      )
    }

    const {
      isConfigured,
      publicKey,
      signature,
      warning,
    } = await res.json()

    // Si las llaves no están configuradas
    if (!isConfigured) {
      return {
        isConfigured: false,
        warning:
          warning ||
          "El servicio de pagos no se encuentra disponible temporalmente. Por favor contacta a nuestro Concierge.",
        simulatedUrl: `/tienda/gracias?orderId=${orderId}&simulated=true`,
      }
    }

    // URL de confirmación
    const origin =
      typeof window !== "undefined" && window.location.origin
        ? window.location.origin
        : ""
    const redirectUrl = `${origin}/tienda/gracias?orderId=${orderId}`

    // Construir URL oficial de Hosted Web Checkout de Wompi como fallback garantizado
    const webCheckoutParams = new URLSearchParams({
      "public-key": publicKey,
      currency: "COP",
      "amount-in-cents": String(amountInCents),
      reference: orderId,
      "signature:integrity": signature,
      "redirect-url": redirectUrl,
      "default-language": selectedLanguage,
    })

    if (customer.email) {
      webCheckoutParams.set("customer-data:email", customer.email.trim())
    }
    if (customer.fullName) {
      webCheckoutParams.set("customer-data:full-name", customer.fullName.trim())
    }
    const rawDigits = customer.phone.replace(/[^0-9]/g, "")
    if (rawDigits.length >= 10) {
      webCheckoutParams.set("customer-data:phone-number", rawDigits.slice(-10))
      webCheckoutParams.set("customer-data:phone-number-prefix", "+57")
    }

    const webCheckoutUrl = `https://checkout.wompi.co/p/?${webCheckoutParams.toString()}`

    // 2. Intentar cargar el Widget interactivo (Modal)
    await loadWompiWidgetScript()

    // Si el widget JS está disponible, abrir modal
    if (typeof window !== "undefined" && typeof window.WidgetCheckout === "function") {
      try {
        const checkoutConfig: any = {
          currency: "COP",
          amountInCents,
          reference: orderId,
          publicKey,
          defaultLanguage: selectedLanguage,
          signature: {
            integrity: signature,
          },
        }

        // Solo incluir redirectUrl si estamos en HTTPS (Wompi producción exige HTTPS en redirectUrl)
        if (origin.startsWith("https://")) {
          checkoutConfig.redirectUrl = redirectUrl
        }

        const customerData: Record<string, string> = {
          fullName: customer.fullName.trim() || "Cliente Millan",
          email: customer.email.trim() || "cliente@millan-experiences.com",
        }
        if (rawDigits.length >= 10) {
          customerData.phoneNumber = rawDigits.slice(-10)
          customerData.phoneNumberPrefix = "+57"
        }
        checkoutConfig.customerData = customerData

        const checkout = new window.WidgetCheckout(checkoutConfig)

        let modalClosedOrFinished = false

        checkout.open((result: any) => {
          modalClosedOrFinished = true
          const transaction = result?.transaction
          if (transaction) {
            if (onSuccess) onSuccess(transaction)
            window.location.href = `${redirectUrl}&id=${transaction.id}`
          } else {
            if (onDismiss) onDismiss()
          }
        })

        return { isConfigured: true, webCheckoutUrl }
      } catch (widgetError) {
        console.warn(
          "[WOMPI WIDGET WARNING] Error al abrir WidgetCheckout interactivo, redirigiendo a Web Checkout:",
          widgetError
        )
        // Si el widget falla o es bloqueado por extensiones, redirigir al Web Checkout oficial
        window.location.href = webCheckoutUrl
        return { isConfigured: true, webCheckoutUrl }
      }
    } else {
      // Si el script de Wompi fue bloqueado (ej. AdBlock / Brave Shield), redirigir directamente
      console.log("[WOMPI NOTICE] Redirigiendo a Web Checkout oficial...")
      window.location.href = webCheckoutUrl
      return { isConfigured: true, webCheckoutUrl }
    }
  } catch (error: any) {
    console.error("[WOMPI CLIENT ERROR]:", error)
    if (onError) onError(error)
    throw error
  }
}

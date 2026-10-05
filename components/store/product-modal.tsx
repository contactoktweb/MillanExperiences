"use client"

import { useEffect, useState } from "react"
import { X, Plus, Minus, Check, ShoppingBag, Clock } from "lucide-react"
import { useStore } from "@/lib/store-context"
import { PRIORITY_LABELS, formatCOP } from "@/lib/store-data"
import { cn } from "@/lib/utils"
import { ProductImage } from "./product-image"

interface QuantityPreset {
  qty: number
  label: string
  detail?: string
}

const QUANTITY_PRESETS: QuantityPreset[] = [
  { qty: 1, label: "1 Unidad" },
  { qty: 2, label: "2 Unidades" },
  { qty: 4, label: "4 Unidades", detail: "Para Compartir" },
]

export function ProductModal() {
  const { selectedProductForModal, setSelectedProductForModal, addToCart } = useStore()
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  // Reset quantity when opened product changes
  useEffect(() => {
    if (selectedProductForModal) {
      setQuantity(1)
      setAdded(false)
    }
  }, [selectedProductForModal])

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedProductForModal(null)
      }
    }
    if (selectedProductForModal) {
      window.addEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "hidden"
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = ""
    }
  }, [selectedProductForModal, setSelectedProductForModal])

  if (!selectedProductForModal) return null

  const product = selectedProductForModal
  const lineTotal = product.priceCOP * quantity

  const handleAddToCart = () => {
    addToCart(product, quantity)
    setAdded(true)
    setTimeout(() => {
      setSelectedProductForModal(null)
    }, 600)
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-product-title"
      className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <div
        onClick={() => setSelectedProductForModal(null)}
        className="modal-backdrop-enter fixed inset-0 bg-[var(--color-deep-sea)]/75 backdrop-blur-sm"
      />

      {/* Modal Container */}
      <div className="modal-panel-enter relative w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-[var(--color-warm-white)] text-[var(--color-deep-sea)] shadow-2xl rounded-sm border border-[color:var(--color-border-light)] z-10">
        {/* Close button */}
        <button
          onClick={() => setSelectedProductForModal(null)}
          aria-label="Cerrar modal de producto"
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-[var(--color-deep-sea)]/85 text-[var(--color-warm-white)] hover:bg-[var(--color-deep-sea)] transition-colors"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image Container: Proporción 1:1 original, sin recortes */}
          <div className="relative aspect-square w-full md:aspect-auto md:min-h-[440px] bg-white border-b md:border-b-0 md:border-r border-[color:var(--color-border-light)] overflow-hidden flex items-center justify-center p-6 sm:p-8">
            <ProductImage
              src={product.image}
              alt={`Imagen de ${product.name}`}
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              className="p-3 sm:p-5 md:p-6"
            />
            {product.priority && (
              <span className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-[var(--color-deep-sea)] text-[var(--color-warm-white)] border border-[var(--color-sand)]/40 font-sans text-[0.6rem] sm:text-[0.66rem] font-medium tracking-[0.18em] uppercase px-2.5 py-1 z-10">
                {PRIORITY_LABELS[product.priority]}
              </span>
            )}
          </div>

          {/* Details & Selection */}
          <div className="modal-content-enter flex flex-col justify-between p-5 sm:p-7 md:p-8">
            <div>
              <span className="font-sans text-[0.62rem] sm:text-[0.66rem] uppercase tracking-[0.2em] text-[var(--color-blue-gray)] font-medium">
                {product.categoryLabel}
              </span>
              <h2 id="modal-product-title" className="mt-1 font-serif text-xl sm:text-2xl md:text-3xl text-[var(--color-deep-sea)] font-normal leading-tight">
                {product.name}
              </h2>
              <p className="mt-1 font-sans text-xs text-[var(--color-blue-gray)]">
                {product.presentation}
              </p>
              {product.destinations.length > 0 && (
                <p className="mt-2 font-sans text-[0.7rem] text-[var(--color-dark-sand)] font-medium">
                  Ideal para: {product.destinations.join(" · ")}
                </p>
              )}
              {product.description && (
                <p className="mt-3 font-sans text-xs sm:text-sm text-[var(--color-deep-sea)]/80 leading-relaxed">
                  {product.description}
                </p>
              )}

              {/* Notice */}
              <div className="mt-4 flex items-start gap-2 bg-[var(--color-sand)]/15 border border-[var(--color-sand)]/40 p-2 sm:p-2.5 rounded-sm">
                <Clock className="w-3.5 h-3.5 text-[var(--color-dark-sand)] shrink-0 mt-0.5" />
                <p className="font-sans text-[0.68rem] sm:text-[0.72rem] text-[var(--color-deep-sea)]/90 leading-tight">
                  Servicio a bordo o villa. Mínimo <strong>8 horas de anticipación</strong> para alistamiento en frío.
                </p>
              </div>
            </div>

            {/* Quantity & Price Controls */}
            <div className="mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-[color:var(--color-border-light)] space-y-3 sm:space-y-4">
              {/* Quick Quantity Presets */}
              <div className="space-y-1.5">
                <span className="block font-sans text-[0.62rem] uppercase tracking-wider text-[var(--color-blue-gray)] font-medium">
                Opciones rápidas de cantidad:
              </span>
              <div className="grid grid-cols-3 gap-2">
                {QUANTITY_PRESETS.map((preset) => {
                  const isSelected = quantity === preset.qty
                  return (
                    <button
                      key={preset.qty}
                      type="button"
                      onClick={() => setQuantity(preset.qty)}
                      className={cn(
                        "flex flex-col items-center justify-center py-2 px-1.5 rounded-sm border text-center transition-all duration-200",
                        isSelected
                          ? "bg-[var(--color-deep-sea)] text-[var(--color-warm-white)] border-[var(--color-sand)] shadow-sm font-medium ring-1 ring-[var(--color-sand)]"
                          : "bg-white text-[var(--color-deep-sea)] border-[color:var(--color-border-light)] hover:border-[var(--color-sand)] hover:bg-[var(--color-warm-white)]"
                      )}
                    >
                      <span className="font-sans text-xs font-semibold leading-tight">
                        {preset.label}
                      </span>
                      {preset.detail && (
                        <span
                          className={cn(
                            "font-sans text-[0.6rem] leading-tight mt-0.5",
                            isSelected
                              ? "text-[var(--color-sand)]"
                              : "text-[var(--color-blue-gray)]"
                          )}
                        >
                          {preset.detail}
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Custom Quantity & Unit Price */}
            <div className="flex items-center justify-between pt-1">
              <div>
                <span className="block font-sans text-[0.66rem] uppercase tracking-wider text-[var(--color-blue-gray)]">
                  Precio unitario
                </span>
                <span className="font-sans text-base sm:text-lg font-semibold text-[var(--color-deep-sea)]">
                  {formatCOP(product.priceCOP)}
                </span>
              </div>

              {/* Quantity selector */}
              <div className="flex items-center gap-2.5 bg-white border border-[color:var(--color-border-light)] px-3 py-1.5 rounded-sm">
                <span className="font-sans text-xs uppercase tracking-wider text-[var(--color-blue-gray)] mr-0.5">
                  Unidades:
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Disminuir cantidad"
                  className="p-1 text-[var(--color-deep-sea)] hover:text-[var(--color-sand)] disabled:opacity-30 transition-colors"
                  disabled={quantity <= 1}
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="font-sans text-sm font-semibold min-w-[20px] text-center text-[var(--color-deep-sea)]">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Aumentar cantidad"
                  className="p-1 text-[var(--color-deep-sea)] hover:text-[var(--color-sand)] transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>


            {/* Subtotal line */}
            <div className="flex items-center justify-between font-sans text-sm border-t border-[color:var(--color-border-light)] pt-3">
              <span className="text-[var(--color-blue-gray)]">Subtotal a reservar:</span>
              <span className="font-semibold text-lg text-[var(--color-deep-sea)]">
                {formatCOP(lineTotal)}
              </span>
            </div>

              {/* Add Button */}
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={added}
                className={cn(
                  "w-full flex items-center justify-center gap-2 px-6 py-3 font-sans text-xs uppercase tracking-[0.16em] font-medium border transition-all duration-300",
                  added
                    ? "bg-emerald-700 text-white border-emerald-600"
                    : "bg-[var(--color-deep-sea)] text-[var(--color-warm-white)] hover:bg-[var(--color-deep-sea)]/90 border-[var(--color-sand)] active:scale-[0.99]"
                )}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4 text-white" />
                    ¡Agregado a tu Reserva!
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-[var(--color-sand)]" />
                    Agregar a mi Reserva ({quantity})
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

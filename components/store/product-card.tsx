"use client"

import { useState } from "react"
import { Plus, Eye, Check } from "lucide-react"
import { StoreProduct, formatCOP } from "@/lib/store-data"
import { useStore } from "@/lib/store-context"
import {
  translateCategory,
  translatePresentation,
  translatePriority,
  translateProductName,
  STORE_I18N,
} from "@/lib/store-i18n"
import { cn } from "@/lib/utils"
import { ProductImage } from "./product-image"

export function ProductCard({ product }: { product: StoreProduct }) {
  const { setSelectedProductForModal, addToCart, locale } = useStore()
  const [quickAdded, setQuickAdded] = useState(false)
  const dict = STORE_I18N[locale]

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation()
    addToCart(product, 1)
    setQuickAdded(true)
    setTimeout(() => setQuickAdded(false), 900)
  }

  const displayName = translateProductName(product.name, locale)
  const displayCategory = translateCategory(product.categoryLabel, locale)
  const displayPresentation = translatePresentation(product.presentation, locale)
  const displayPriority = translatePriority(product.priority, locale)

  return (
    <article
      onClick={() => setSelectedProductForModal(product)}
      className="group relative flex flex-col cursor-pointer bg-[var(--color-warm-white)]/70 hover:bg-white transition-all duration-500 border border-[color:var(--color-border-light)] hover:border-[var(--color-sand)] hover:shadow-xl rounded-sm overflow-hidden"
    >
      {/* Image Container: 1:1 Aspect ratio matching original 1000x1000 packshots */}
      <div className="relative aspect-square w-full overflow-hidden bg-white border-b border-[color:var(--color-border-light)]/70 flex items-center justify-center p-3 sm:p-4">
        <ProductImage
          src={product.image}
          alt={locale === "en" ? `Photograph of ${displayName}` : `Fotografía de ${displayName}`}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="p-2 transition-transform duration-500 ease-[var(--ease-editorial)] group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-deep-sea)]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Badge */}
        {product.priority && (
          <span className="absolute top-3 left-3 bg-[var(--color-deep-sea)] text-[var(--color-warm-white)] border border-[var(--color-sand)]/40 font-sans text-[0.62rem] font-medium tracking-[0.18em] uppercase px-2.5 py-1 backdrop-blur-sm z-10">
            {displayPriority}
          </span>
        )}

        {/* Quick View Hover Indicator */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
          <span className="inline-flex items-center gap-1.5 bg-[var(--color-deep-sea)]/95 text-[var(--color-warm-white)] px-4 py-2 text-xs font-sans tracking-wider uppercase border border-[var(--color-sand)] shadow-md">
            <Eye className="w-3.5 h-3.5 text-[var(--color-sand)]" />
            {dict.viewSelect}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
        <div>
          <span className="font-sans text-[0.62rem] uppercase tracking-[0.2em] text-[var(--color-blue-gray)] font-medium">
            {displayCategory}
          </span>
          <h3 className="mt-1 font-serif text-base sm:text-lg font-normal text-[var(--color-deep-sea)] leading-snug line-clamp-2">
            {displayName}
          </h3>
          <p className="mt-1 font-sans text-xs text-[var(--color-blue-gray)]">
            {displayPresentation}
          </p>
        </div>

        {/* Footer info & action */}
        <div className="mt-4 pt-3.5 border-t border-[color:var(--color-border-light)] flex items-center justify-between gap-2">
          <div>
            <span className="block font-sans text-[0.6rem] uppercase tracking-wider text-[var(--color-blue-gray)]">
              {dict.unitPrice}
            </span>
            <span className="font-sans text-base font-semibold text-[var(--color-deep-sea)]">
              {formatCOP(product.priceCOP)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleQuickAdd}
              aria-label={dict.addToCartQuick(displayName)}
              title={dict.quickAddTooltip}
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-full transition-all duration-200 cursor-pointer",
                quickAdded
                  ? "bg-emerald-600 text-white scale-105"
                  : "bg-[var(--color-sand)]/20 text-[var(--color-deep-sea)] hover:bg-[var(--color-sand)] hover:text-white"
              )}
            >
              {quickAdded ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            </button>
            <button
              type="button"
              onClick={() => setSelectedProductForModal(product)}
              className="px-3 py-1.5 border border-[var(--color-deep-sea)] text-[var(--color-deep-sea)] text-xs font-sans tracking-wider uppercase hover:bg-[var(--color-deep-sea)] hover:text-[var(--color-warm-white)] transition-colors cursor-pointer"
            >
              {dict.select}
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}

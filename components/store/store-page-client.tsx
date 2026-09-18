"use client"

import { useState, useMemo } from "react"
import {
  Clock,
  Search,
  ShoppingBag,
  Sparkles,
  Wine,
  Beer,
  GlassWater,
  Utensils,
  Cookie,
  Layers,
  ChevronRight,
} from "lucide-react"
import {
  STORE_CATEGORIES,
  STORE_PRODUCTS,
  StoreCategory,
  formatCOP,
} from "@/lib/store-data"
import { useStore, StoreProvider } from "@/lib/store-context"
import { ProductCard } from "./product-card"
import { ProductModal } from "./product-modal"
import { CartDrawer } from "./cart-drawer"
import { cn } from "@/lib/utils"

function StoreContent() {
  const [selectedCategory, setSelectedCategory] = useState<StoreCategory>("todos")
  const [searchQuery, setSearchQuery] = useState("")
  const { setIsCartOpen, totalItems, totalAmount } = useStore()

  // Filter products by category and search query
  const filteredProducts = useMemo(() => {
    return STORE_PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === "todos" || product.category === selectedCategory
      const matchesSearch =
        !searchQuery.trim() ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, searchQuery])

  // Category Icon helper
  const getCategoryIcon = (catId: StoreCategory) => {
    switch (catId) {
      case "cervezas":
        return <Beer className="w-4 h-4" />
      case "vinos":
        return <Wine className="w-4 h-4" />
      case "licores":
        return <GlassWater className="w-4 h-4" />
      case "comida":
        return <Utensils className="w-4 h-4" />
      case "snacks":
        return <Cookie className="w-4 h-4" />
      default:
        return <Layers className="w-4 h-4" />
    }
  }

  return (
    <>
      {/* Hero Header */}
      <header className="relative bg-[var(--color-deep-sea)] text-[var(--color-warm-white)] pt-28 pb-7 sm:pt-32 sm:pb-10 md:pt-36 md:pb-14 overflow-hidden border-b border-[color:var(--color-border-dark)]">
        {/* Subtle background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(200,180,135,0.12),transparent_60%)] pointer-events-none" />

        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-10 relative z-10">
          <div className="max-w-2xl">
            <span className="eyebrow text-[var(--color-sand)] flex items-center gap-1.5 text-[0.62rem] sm:text-[0.66rem]">
              <Sparkles className="w-3 h-3 text-[var(--color-sand)] shrink-0" />
              Boutique Privada
            </span>
            <h1 className="mt-2 font-serif text-2xl sm:text-3xl md:text-5xl font-normal leading-tight text-[var(--color-warm-white)]">
              Cava & Selección a Bordo
            </h1>
            <p className="mt-2 font-sans text-xs sm:text-sm md:text-base font-light text-[var(--color-warm-white)]/80 leading-relaxed max-w-xl">
              Licores ultra-premium, vinos y bocados selectos coordinados directamente a tu embarcación o villa.
            </p>
          </div>

          {/* 8-Hour Notice Compact Badge */}
          <div className="mt-3.5 sm:mt-5 inline-flex items-center gap-2 rounded-full border border-[var(--color-sand)]/50 bg-[var(--color-sand)]/10 px-3 py-1 sm:px-4 sm:py-1.5 backdrop-blur-sm">
            <Clock className="w-3.5 h-3.5 text-[var(--color-sand)] shrink-0" />
            <span className="font-sans text-[0.7rem] sm:text-xs text-[var(--color-warm-white)] font-light leading-none">
              Reserva con <strong className="font-medium text-[var(--color-sand)]">mínimo 8 horas</strong> de anticipación
            </span>
          </div>
        </div>
      </header>

      {/* Main Section */}
      <main className="bg-[var(--color-warm-white)] min-h-screen pt-4 pb-12 sm:pt-6 sm:pb-16">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-10">
          {/* Controls Bar: Category Pills + Search in a tight, elegant layout */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 pb-4 border-b border-[color:var(--color-border-light)]">
            {/* Category pills */}
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto py-1 scrollbar-none snap-x snap-mandatory">
              {STORE_CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat.id
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={cn(
                      "snap-start shrink-0 flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full font-sans text-xs uppercase tracking-wider transition-all duration-200 border",
                      isActive
                        ? "bg-[var(--color-deep-sea)] text-[var(--color-warm-white)] border-[var(--color-deep-sea)] shadow-sm font-medium"
                        : "bg-white/80 text-[var(--color-text-dark)] border-[color:var(--color-border-light)] hover:border-[var(--color-sand)] hover:bg-white"
                    )}
                  >
                    <span className={cn(isActive ? "text-[var(--color-sand)]" : "text-[var(--color-blue-gray)]")}>
                      {getCategoryIcon(cat.id)}
                    </span>
                    <span className="whitespace-nowrap">{cat.label}</span>
                  </button>
                )
              })}
            </div>

            {/* Search Input & Cart Quick Counter */}
            <div className="flex items-center gap-2.5">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[var(--color-blue-gray)]" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar..."
                  className="w-full bg-white border border-[color:var(--color-border-light)] pl-8 pr-3 py-1.5 font-sans text-xs text-[var(--color-deep-sea)] placeholder:text-gray-400 focus:border-[var(--color-sand)] focus:outline-none rounded-full"
                />
              </div>

              {totalItems > 0 && (
                <button
                  type="button"
                  onClick={() => setIsCartOpen(true)}
                  className="hidden sm:inline-flex items-center gap-1.5 border border-[var(--color-deep-sea)] px-3.5 py-1.5 rounded-full text-xs font-sans uppercase tracking-wider text-[var(--color-deep-sea)] hover:bg-[var(--color-deep-sea)] hover:text-[var(--color-warm-white)] transition-colors whitespace-nowrap"
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-[var(--color-sand)]" />
                  <span>Reserva ({totalItems})</span>
                </button>
              )}
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="mt-10 text-center py-14 bg-white border border-[color:var(--color-border-light)] rounded-sm">
              <p className="font-serif text-xl sm:text-2xl text-[var(--color-deep-sea)]">
                No encontramos productos en esta búsqueda
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("todos")
                  setSearchQuery("")
                }}
                className="mt-4 border border-[var(--color-deep-sea)] px-4 py-1.5 font-sans text-xs uppercase tracking-wider text-[var(--color-deep-sea)] hover:bg-[var(--color-deep-sea)] hover:text-[var(--color-warm-white)] transition-colors"
              >
                Restablecer Filtros
              </button>
            </div>
          ) : (
            <div className="mt-5 sm:mt-6 grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {/* Bottom Call to Action for Custom Orders */}
          <section className="mt-12 sm:mt-20 border border-[color:var(--color-border-light)] bg-white p-5 sm:p-8 md:p-12 rounded-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-5 sm:gap-8">
            <div className="max-w-xl">
              <span className="font-sans text-[0.62rem] uppercase tracking-[0.2em] text-[var(--color-crystal-water)] font-semibold">
                Servicio Bespoke
              </span>
              <h2 className="mt-1.5 font-serif text-xl sm:text-2xl md:text-3xl text-[var(--color-deep-sea)] font-normal">
                ¿Buscas una etiqueta o pedido exclusivo?
              </h2>
              <p className="mt-2 font-sans text-xs sm:text-sm text-[var(--color-blue-gray)] leading-relaxed">
                Añadas especiales, puros habanos o maridajes de autor para tu yate o villa coordinados con el concierge.
              </p>
            </div>

            <a
              href="https://wa.me/573107102651?text=Hola%20Millan%20Experiences,%20quisiera%20consultar%20por%20un%20pedido%20especial%20para%20la%20tienda/cava."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2.5 bg-[var(--color-deep-sea)] text-[var(--color-warm-white)] px-5 py-3 sm:px-6 sm:py-3.5 font-sans text-xs uppercase tracking-[0.16em] font-medium border border-[var(--color-sand)] hover:bg-[var(--color-deep-sea)]/90 transition-colors text-center"
            >
              Consultar con el Concierge
              <ChevronRight className="w-4 h-4 text-[var(--color-sand)]" />
            </a>
          </section>
        </div>
      </main>

      {/* Floating Cart Button */}
      {totalItems > 0 && (
        <aside aria-label="Acceso rápido a tu reserva" className="fixed bottom-5 left-4 sm:bottom-6 sm:left-6 z-[80]">
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2.5 sm:gap-3 bg-[var(--color-deep-sea)] text-[var(--color-warm-white)] px-4 py-3 sm:px-5 sm:py-3.5 rounded-full shadow-2xl border border-[var(--color-sand)] hover:scale-105 transition-all duration-300"
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--color-sand)]" />
              <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--color-sand)] text-[var(--color-deep-sea)] text-[0.6rem] font-bold">
                {totalItems}
              </span>
            </div>
            <div className="text-left font-sans">
              <span className="block text-[0.6rem] uppercase tracking-wider text-[var(--color-warm-white)]/70">
                Tu Reserva
              </span>
              <span className="block text-xs font-semibold text-[var(--color-warm-white)]">
                {formatCOP(totalAmount)}
              </span>
            </div>
          </button>
        </aside>
      )}

      {/* Embedded Modals */}
      <ProductModal />
      <CartDrawer />
    </>
  )
}

export function StorePageClient() {
  return (
    <StoreProvider>
      <StoreContent />
    </StoreProvider>
  )
}

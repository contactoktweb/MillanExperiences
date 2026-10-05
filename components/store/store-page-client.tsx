"use client"

import { useState, useMemo } from "react"
import {
  Clock,
  Search,
  ShoppingBag,
  Sparkles,
  Layers,
  ChevronRight,
  AlertTriangle,
} from "lucide-react"
import { StoreCatalog, formatCOP } from "@/lib/store-data"
import { STORE_DESTINATIONS, type StoreDestination } from "@/lib/store-constants"
import { useStore, StoreProvider } from "@/lib/store-context"
import { ProductCard } from "./product-card"
import { ProductModal } from "./product-modal"
import { CartDrawer } from "./cart-drawer"
import { cn } from "@/lib/utils"

const ALL = "todos"
const PAGE_SIZE = 24

interface FilterPillProps {
  label: string
  isActive: boolean
  onClick: () => void
  icon?: React.ReactNode
  size?: "md" | "sm"
}

function FilterPill({ label, isActive, onClick, icon, size = "md" }: FilterPillProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isActive}
      className={cn(
        "snap-start shrink-0 flex items-center gap-1.5 rounded-full font-sans uppercase tracking-wider transition-all duration-200 border active:scale-[0.97]",
        size === "md" ? "px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs" : "px-2.5 py-1 text-[0.66rem]",
        isActive
          ? "bg-[var(--color-deep-sea)] text-[var(--color-warm-white)] border-[var(--color-deep-sea)] shadow-sm font-medium"
          : "bg-white/80 text-[var(--color-text-dark)] border-[color:var(--color-border-light)] hover:border-[var(--color-sand)] hover:bg-white"
      )}
    >
      {icon && (
        <span className={cn(isActive ? "text-[var(--color-sand)]" : "text-[var(--color-blue-gray)]")}>
          {icon}
        </span>
      )}
      <span className="whitespace-nowrap">{label}</span>
    </button>
  )
}

interface StoreContentProps {
  catalog: StoreCatalog
  loadFailed: boolean
}

function StoreContent({ catalog, loadFailed }: StoreContentProps) {
  const [selectedGroup, setSelectedGroup] = useState<string>(ALL)
  const [selectedSub, setSelectedSub] = useState<string>(ALL)
  const [selectedDestination, setSelectedDestination] = useState<StoreDestination | typeof ALL>(ALL)
  const [searchQuery, setSearchQuery] = useState("")
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const { setIsCartOpen, totalItems, totalAmount } = useStore()

  const activeGroup = catalog.groups.find((group) => group.id === selectedGroup)

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    return catalog.products.filter((product) => {
      if (selectedGroup !== ALL && product.groupId !== selectedGroup) return false
      if (selectedSub !== ALL && product.categoryId !== selectedSub) return false
      if (selectedDestination !== ALL && !product.destinations.includes(selectedDestination)) return false
      if (!query) return true
      return (
        product.name.toLowerCase().includes(query) ||
        product.presentation.toLowerCase().includes(query) ||
        product.categoryLabel.toLowerCase().includes(query) ||
        (product.description?.toLowerCase().includes(query) ?? false)
      )
    })
  }, [catalog.products, selectedGroup, selectedSub, selectedDestination, searchQuery])

  const visibleProducts = filteredProducts.slice(0, visibleCount)
  const hasMore = filteredProducts.length > visibleCount

  /** Cualquier cambio de filtro reinicia la paginación. */
  const withPagingReset = <T,>(setter: (value: T) => void) => (value: T) => {
    setter(value)
    setVisibleCount(PAGE_SIZE)
  }
  const changeGroup = (groupId: string) => {
    setSelectedGroup(groupId)
    setSelectedSub(ALL)
    setVisibleCount(PAGE_SIZE)
  }
  const changeSub = withPagingReset(setSelectedSub)
  const changeDestination = withPagingReset(setSelectedDestination)
  const changeSearch = withPagingReset(setSearchQuery)

  const resetFilters = () => {
    changeGroup(ALL)
    setSelectedDestination(ALL)
    setSearchQuery("")
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
              Cava &amp; Selección a Bordo
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
          {/* Controls: categorías, subcategorías, destino y búsqueda */}
          <div className="flex flex-col gap-3 pb-4 border-b border-[color:var(--color-border-light)]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
              {/* Category pills (desplazables con el dedo en móvil) */}
              <div
                role="group"
                aria-label="Filtrar por categoría"
                className="min-w-0 flex items-center gap-1.5 sm:gap-2 overflow-x-auto py-1 scrollbar-none snap-x snap-mandatory"
              >
                <FilterPill
                  label="Todo el Catálogo"
                  icon={<Layers className="w-4 h-4" />}
                  isActive={selectedGroup === ALL}
                  onClick={() => changeGroup(ALL)}
                />
                {catalog.groups.map((group) => (
                  <FilterPill
                    key={group.id}
                    label={group.label}
                    isActive={selectedGroup === group.id}
                    onClick={() => changeGroup(group.id)}
                  />
                ))}
              </div>

              {/* Search Input & Cart Quick Counter */}
              <div className="flex items-center gap-2.5">
                <div className="relative flex-1 md:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[var(--color-blue-gray)]" />
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => changeSearch(e.target.value)}
                    placeholder="Buscar..."
                    aria-label="Buscar productos"
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

            {/* Subcategorías (solo cuando la categoría principal las tiene, ej. Cava premium) */}
            {activeGroup && activeGroup.children.length > 0 && (
              <div
                role="group"
                aria-label={`Subcategorías de ${activeGroup.label}`}
                className="flex items-center gap-1.5 overflow-x-auto py-0.5 scrollbar-none snap-x snap-mandatory animate-in fade-in duration-200"
              >
                <FilterPill size="sm" label="Todas" isActive={selectedSub === ALL} onClick={() => changeSub(ALL)} />
                {activeGroup.children.map((child) => (
                  <FilterPill
                    key={child.id}
                    size="sm"
                    label={child.label}
                    isActive={selectedSub === child.id}
                    onClick={() => changeSub(child.id)}
                  />
                ))}
              </div>
            )}

            {/* Destino */}
            <div
              role="group"
              aria-label="Filtrar por destino"
              className="flex items-center gap-1.5 overflow-x-auto py-0.5 scrollbar-none snap-x"
            >
              <span className="shrink-0 font-sans text-[0.62rem] uppercase tracking-[0.18em] text-[var(--color-blue-gray)] pr-1">
                Destino
              </span>
              <FilterPill
                size="sm"
                label="Todos"
                isActive={selectedDestination === ALL}
                onClick={() => changeDestination(ALL)}
              />
              {STORE_DESTINATIONS.map((destination) => (
                <FilterPill
                  key={destination}
                  size="sm"
                  label={destination}
                  isActive={selectedDestination === destination}
                  onClick={() => changeDestination(destination)}
                />
              ))}
            </div>
          </div>

          {/* Product Grid */}
          {loadFailed ? (
            <div role="alert" className="mt-10 text-center py-14 bg-white border border-[color:var(--color-border-light)] rounded-sm">
              <AlertTriangle className="mx-auto w-6 h-6 text-[var(--color-dark-sand)]" aria-hidden="true" />
              <p className="mt-3 font-serif text-xl sm:text-2xl text-[var(--color-deep-sea)]">
                No pudimos cargar el catálogo en este momento
              </p>
              <p className="mt-2 font-sans text-xs sm:text-sm text-[var(--color-blue-gray)]">
                Intenta recargar la página o consulta con el concierge.
              </p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="mt-10 text-center py-14 bg-white border border-[color:var(--color-border-light)] rounded-sm">
              <p className="font-serif text-xl sm:text-2xl text-[var(--color-deep-sea)]">
                {catalog.products.length === 0
                  ? "Nuestro catálogo se está actualizando"
                  : "No encontramos productos en esta búsqueda"}
              </p>
              {catalog.products.length > 0 && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="mt-4 border border-[var(--color-deep-sea)] px-4 py-1.5 font-sans text-xs uppercase tracking-wider text-[var(--color-deep-sea)] hover:bg-[var(--color-deep-sea)] hover:text-[var(--color-warm-white)] transition-colors"
                >
                  Restablecer Filtros
                </button>
              )}
            </div>
          ) : (
            <>
              <p className="mt-4 font-sans text-xs text-[var(--color-blue-gray)]" aria-live="polite">
                {filteredProducts.length} {filteredProducts.length === 1 ? "producto" : "productos"}
              </p>
              <div className="mt-3 sm:mt-4 grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {visibleProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              {hasMore && (
                <div className="mt-8 flex justify-center">
                  <button
                    type="button"
                    onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
                    className="border border-[var(--color-deep-sea)] px-6 py-2.5 font-sans text-xs uppercase tracking-[0.16em] text-[var(--color-deep-sea)] hover:bg-[var(--color-deep-sea)] hover:text-[var(--color-warm-white)] transition-colors active:scale-[0.98]"
                  >
                    Ver más productos
                  </button>
                </div>
              )}
            </>
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

export function StorePageClient(props: StoreContentProps) {
  return (
    <StoreProvider>
      <StoreContent {...props} />
    </StoreProvider>
  )
}

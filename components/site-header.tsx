"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { navItems } from "@/lib/site-data"
import { Wordmark, Monogram } from "@/components/brand"
import { Cta } from "@/components/cta"
import { cn } from "@/lib/utils"

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [lang, setLang] = useState<"EN" | "ES">("EN")

  useEffect(() => {
    let lastY = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 40)
      if (y > 200 && y > lastY) setHidden(true)
      else setHidden(false)
      lastY = y
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileOpen])

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[120] focus:bg-[var(--color-deep-sea)] focus:px-4 focus:py-2 focus:text-[var(--color-warm-white)]"
      >
        Skip to content
      </a>

      <header
        onMouseLeave={() => setOpenMenu(null)}
        className={cn(
          "fixed inset-x-0 top-0 z-[100] transition-[transform,background-color,backdrop-filter,height] duration-[450ms] ease-[var(--ease-editorial)]",
          scrolled
            ? "bg-[color:rgba(19,39,47,0.82)] py-4 backdrop-blur-md"
            : "bg-transparent py-7",
          hidden && !openMenu ? "-translate-y-full" : "translate-y-0",
        )}
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-8 px-6 md:px-10">
          <Link
            href="/"
            aria-label="Millan Experiences home"
            className="text-[var(--color-warm-white)]"
            onClick={() => setOpenMenu(null)}
          >
            <Wordmark />
          </Link>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
            {navItems.map((item) => (
              <div key={item.label} onMouseEnter={() => setOpenMenu(item.children ? item.label : null)}>
                <Link
                  href={item.href}
                  className={cn(
                    "link-underline font-sans text-[0.74rem] font-medium uppercase tracking-[0.16em] text-[var(--color-warm-white)]/90 transition-colors hover:text-[var(--color-sand)]",
                    openMenu === item.label && "text-[var(--color-sand)]",
                  )}
                >
                  {item.label}
                </Link>
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <div className="hidden items-center gap-2 font-sans text-[0.68rem] font-medium tracking-[0.14em] text-[var(--color-warm-white)]/80 sm:flex">
              {(["EN", "ES"] as const).map((l, i) => (
                <span key={l} className="flex items-center gap-2">
                  {i === 1 && <span aria-hidden className="text-[var(--color-warm-white)]/30">/</span>}
                  <button
                    type="button"
                    onClick={() => setLang(l)}
                    aria-pressed={lang === l}
                    className={cn(
                      "transition-colors hover:text-[var(--color-sand)]",
                      lang === l ? "text-[var(--color-sand)]" : "text-[var(--color-warm-white)]/60",
                    )}
                  >
                    {l}
                  </button>
                </span>
              ))}
            </div>

            <div className="hidden lg:block">
              <Cta href="/contact" tone="sand" className="px-5 py-3 text-[0.66rem]" withArrow={false}>
                Start Planning
              </Cta>
            </div>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className="flex items-center gap-2 text-[var(--color-warm-white)] lg:hidden"
            >
              <Menu className="h-6 w-6" strokeWidth={1.4} />
            </button>
          </div>
        </div>

        {/* Mega menu */}
        {navItems.map((item) =>
          item.children ? (
            <div
              key={item.label}
              className={cn(
                "absolute inset-x-0 top-full hidden overflow-hidden lg:block",
                openMenu === item.label ? "pointer-events-auto" : "pointer-events-none",
              )}
            >
              <div
                className={cn(
                  "border-t border-[color:var(--color-border-dark)] bg-[color:rgba(19,39,47,0.96)] backdrop-blur-md transition-all duration-500 ease-[var(--ease-editorial)]",
                  openMenu === item.label
                    ? "translate-y-0 opacity-100"
                    : "-translate-y-3 opacity-0",
                )}
              >
                <div className="mx-auto grid max-w-[1440px] grid-cols-[1.1fr_1fr] gap-16 px-10 py-14">
                  <div className="flex flex-col">
                    <p className="eyebrow text-[var(--color-sand)]">{item.label}</p>
                    <p className="mt-5 max-w-sm font-serif text-2xl leading-snug text-[var(--color-warm-white)]">
                      {item.description}
                    </p>
                    <ul className="mt-10 flex flex-col gap-1">
                      {item.children.map((child, idx) => (
                        <li
                          key={child.href}
                          style={{ transitionDelay: `${idx * 60}ms` }}
                          className={cn(
                            "transition-all duration-500 ease-[var(--ease-editorial)]",
                            openMenu === item.label
                              ? "translate-y-0 opacity-100"
                              : "translate-y-2 opacity-0",
                          )}
                        >
                          <Link
                            href={child.href}
                            onClick={() => setOpenMenu(null)}
                            className="link-underline inline-block py-2 font-serif text-xl text-[var(--color-warm-white)]/85 transition-colors hover:text-[var(--color-sand)]"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    {item.cta && (
                      <div className="mt-10">
                        <Cta href={item.cta.href} variant="ghost" tone="sand" className="px-0">
                          {item.cta.label}
                        </Cta>
                      </div>
                    )}
                  </div>

                  {item.image && (
                    <Link
                      href={item.href}
                      onClick={() => setOpenMenu(null)}
                      className="group relative aspect-[16/10] overflow-hidden"
                    >
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.imageAlt ?? ""}
                        fill
                        sizes="40vw"
                        className="object-cover transition-transform duration-[900ms] ease-[var(--ease-editorial)] group-hover:scale-105"
                      />
                      <span className="absolute inset-0 bg-[var(--color-deep-sea)]/20" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ) : null,
        )}
      </header>

      {/* Mobile fullscreen menu */}
      <div
        className={cn(
          "fixed inset-0 z-[110] flex flex-col bg-[var(--color-deep-sea)] transition-[opacity,visibility] duration-500 ease-[var(--ease-editorial)] lg:hidden",
          mobileOpen ? "visible opacity-100" : "invisible opacity-0",
        )}
      >
        <div className="flex items-center justify-between px-6 py-7 text-[var(--color-warm-white)]">
          <Link href="/" onClick={() => setMobileOpen(false)} aria-label="Millan Experiences home">
            <Monogram className="h-8 w-8 text-[var(--color-sand)]" />
          </Link>
          <button type="button" onClick={() => setMobileOpen(false)} aria-label="Close menu">
            <X className="h-7 w-7" strokeWidth={1.4} />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-6 pt-4" aria-label="Mobile">
          {navItems.map((item, idx) => (
            <div
              key={item.label}
              style={{ transitionDelay: `${idx * 50}ms` }}
              className={cn(
                "border-b border-[color:var(--color-border-dark)] py-3 transition-all duration-500 ease-[var(--ease-editorial)]",
                mobileOpen ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
              )}
            >
              <Link
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="font-serif text-3xl text-[var(--color-warm-white)]"
              >
                {item.label}
              </Link>
              {item.children && (
                <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1">
                  {item.children.map((child) => (
                    <li key={child.href}>
                      <Link
                        href={child.href}
                        onClick={() => setMobileOpen(false)}
                        className="font-sans text-xs uppercase tracking-[0.14em] text-[var(--color-crystal-water)]"
                      >
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </nav>

        <div className="flex items-center justify-between gap-4 px-6 py-7">
          <div className="flex items-center gap-2 font-sans text-xs tracking-[0.14em] text-[var(--color-warm-white)]/70">
            {(["EN", "ES"] as const).map((l, i) => (
              <span key={l} className="flex items-center gap-2">
                {i === 1 && <span className="opacity-40">/</span>}
                <button
                  type="button"
                  onClick={() => setLang(l)}
                  className={cn(lang === l ? "text-[var(--color-sand)]" : "opacity-60")}
                >
                  {l}
                </button>
              </span>
            ))}
          </div>
          <Cta href="/contact" tone="sand" className="flex-1 justify-center" withArrow={false}>
            Start Planning
          </Cta>
        </div>
      </div>
    </>
  )
}

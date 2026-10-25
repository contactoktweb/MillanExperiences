"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Wordmark, Monogram } from "@/components/brand"
import { Cta } from "@/components/cta"
import { cn } from "@/lib/utils"

export function SiteHeaderClient({ forceSolid = false, logoUrl, initialLang = "EN", navItems = [] }: { forceSolid?: boolean, logoUrl?: string, initialLang?: "EN" | "ES", navItems?: any[] }) {
  const router = useRouter()
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [lang, setLangState] = useState<"EN" | "ES">(initialLang)

  const setLang = (newLang: "EN" | "ES") => {
    setLangState(newLang)
    document.cookie = `NEXT_LOCALE=${newLang.toLowerCase()}; path=/; max-age=31536000`
    // A shared "?lang=" link would override the cookie: keep the URL in sync.
    const url = new URL(window.location.href)
    if (url.searchParams.has("lang")) {
      if (newLang === "ES") url.searchParams.set("lang", "es")
      else url.searchParams.delete("lang")
      router.replace(`${url.pathname}${url.search}${url.hash}`)
    } else {
      router.refresh()
    }
  }

  const loc = lang.toLowerCase() as "en" | "es"

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


      <header
        onMouseLeave={() => setOpenMenu(null)}
        className={cn(
          "fixed inset-x-0 top-0 z-[100] transition-[transform,background-color,backdrop-filter,height] duration-[450ms] ease-[var(--ease-editorial)]",
          openMenu !== null
            ? "bg-[color:rgba(19,39,47,0.96)] backdrop-blur-md"
            : (scrolled || forceSolid)
              ? "bg-[color:rgba(19,39,47,0.82)] backdrop-blur-md"
              : "bg-transparent",
          scrolled ? "py-3 sm:py-3.5" : "py-4 sm:py-5 md:py-6",
        )}
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-5 sm:px-6 md:px-10">
          <Link
            href="/"
            aria-label="Millan Experiences home"
            className="text-[var(--color-warm-white)] flex items-center"
            onClick={() => setOpenMenu(null)}
          >
            <Wordmark
              logoUrl={logoUrl}
              monogramClassName={cn(
                "w-auto object-contain transition-all duration-300",
                scrolled ? "h-6 sm:h-7 md:h-8" : "h-7 sm:h-8 md:h-9"
              )}
            />
          </Link>

          <nav className="hidden items-center gap-4 lg:flex xl:gap-6 2xl:gap-8" aria-label="Primary">
            {navItems.map((item) => (
              <div key={item.labelEn} onMouseEnter={() => setOpenMenu(item.children ? item.labelEn : null)}>
                <Link
                  href={item.href}
                  className={cn(
                    "link-underline whitespace-nowrap font-sans text-[0.68rem] font-medium uppercase tracking-[0.12em] xl:text-[0.74rem] xl:tracking-[0.16em] text-[var(--color-warm-white)]/90 transition-colors hover:text-[var(--color-sand)]",
                    openMenu === item.labelEn && "text-[var(--color-sand)]",
                  )}
                >
                  {loc === 'es' ? item.labelEs : item.labelEn}
                </Link>
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-2.5 sm:gap-4 md:gap-5">
            {/* Minimalist Language Switcher: ES / EN */}
            <div
              role="group"
              aria-label={loc === 'es' ? "Selector de idioma" : "Language selector"}
              className="flex items-center font-sans text-xs tracking-[0.18em]"
            >
              <button
                type="button"
                onClick={() => setLang("ES")}
                aria-pressed={lang === "ES"}
                aria-label="Cambiar a Español"
                className={cn(
                  "px-1.5 py-1 uppercase transition-colors cursor-pointer",
                  lang === "ES"
                    ? "font-bold text-[var(--color-sand)]"
                    : "font-medium text-[var(--color-warm-white)]/60 hover:text-[var(--color-warm-white)]"
                )}
              >
                ES
              </button>
              <span className="text-[var(--color-warm-white)]/30 text-[0.72rem] select-none" aria-hidden="true">
                /
              </span>
              <button
                type="button"
                onClick={() => setLang("EN")}
                aria-pressed={lang === "EN"}
                aria-label="Switch to English"
                className={cn(
                  "px-1.5 py-1 uppercase transition-colors cursor-pointer",
                  lang === "EN"
                    ? "font-bold text-[var(--color-sand)]"
                    : "font-medium text-[var(--color-warm-white)]/60 hover:text-[var(--color-warm-white)]"
                )}
              >
                EN
              </button>
            </div>

            <div className="hidden xl:block">
              <Cta href="/contact" tone="sand" className="whitespace-nowrap px-5 py-3 text-[0.66rem]" withArrow={false}>
                {loc === 'es' ? 'Comenzar a Planear' : 'Start Planning'}
              </Cta>
            </div>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className="flex items-center justify-center rounded-full p-2 text-[var(--color-warm-white)] transition-colors hover:text-[var(--color-sand)] active:bg-[var(--color-warm-white)]/10 lg:hidden"
            >
              <Menu className="h-6 w-6" strokeWidth={1.4} />
            </button>
          </div>
        </div>

        {/* Mega menu */}
        {navItems.map((item) =>
          item.children ? (
            <div
              key={item.labelEn}
              className={cn(
                "absolute inset-x-0 top-full hidden overflow-hidden lg:block",
                openMenu === item.labelEn ? "pointer-events-auto" : "pointer-events-none",
              )}
            >
              <div
                className={cn(
                  "border-t border-[color:var(--color-border-dark)] bg-[color:rgba(19,39,47,0.96)] backdrop-blur-md transition-all duration-500 ease-[var(--ease-editorial)]",
                  openMenu === item.labelEn
                    ? "translate-y-0 opacity-100"
                    : "-translate-y-3 opacity-0",
                )}
              >
                <div className="mx-auto grid max-w-[1440px] grid-cols-[1.1fr_1fr] gap-16 px-10 py-14">
                  <div className="flex flex-col">
                    <p className="eyebrow text-[var(--color-sand)]">{loc === 'es' ? item.labelEs : item.labelEn}</p>
                    <p className="mt-5 max-w-sm font-sans text-lg font-light leading-relaxed text-[var(--color-warm-white)]/85">
                      {loc === 'es' ? item.descEs : item.descEn}
                    </p>
                    <ul className="mt-10 flex flex-col gap-1">
                      {item.children.map((child: any, idx: number) => (
                        <li
                          key={child.href}
                          style={{ transitionDelay: `${idx * 60}ms` }}
                          className={cn(
                            "transition-all duration-500 ease-[var(--ease-editorial)]",
                            openMenu === item.labelEn
                              ? "translate-y-0 opacity-100"
                              : "translate-y-2 opacity-0",
                          )}
                        >
                          <Link
                            href={child.href}
                            onClick={() => setOpenMenu(null)}
                            className="link-underline inline-block py-2 font-sans text-base font-medium tracking-wide text-[var(--color-warm-white)] transition-colors hover:text-[var(--color-sand)]"
                          >
                            {loc === 'es' ? child.labelEs : child.labelEn}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    {item.cta && (
                      <div className="mt-10">
                        <Cta href={item.cta.href} variant="ghost" tone="sand" className="px-0">
                          {loc === 'es' ? item.cta.labelEs : item.cta.labelEn}
                        </Cta>
                      </div>
                    )}
                  </div>

                  {item.imageUrl && (
                    <Link
                      href={item.href}
                      onClick={() => setOpenMenu(null)}
                      className="group relative aspect-[16/10] overflow-hidden"
                    >
                      <Image
                        src={item.imageUrl}
                        alt=""
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
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 sm:py-5 text-[var(--color-warm-white)]">
          <Link href="/" onClick={() => setMobileOpen(false)} aria-label="Millan Experiences home" className="flex items-center">
            <Wordmark logoUrl={logoUrl} monogramClassName="h-7 sm:h-8 w-auto object-contain" />
          </Link>
          <button type="button" onClick={() => setMobileOpen(false)} aria-label="Close menu">
            <X className="h-7 w-7" strokeWidth={1.4} />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-6 pt-4" aria-label="Mobile">
          {navItems.map((item, idx) => (
            <div
              key={item.labelEn}
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
                {loc === 'es' ? item.labelEs : item.labelEn}
              </Link>
              {item.children && (
                <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1">
                  {item.children.map((child: any) => (
                    <li key={child.href}>
                      <Link
                        href={child.href}
                        onClick={() => setMobileOpen(false)}
                        className="font-sans text-xs uppercase tracking-[0.14em] text-[var(--color-crystal-water)]"
                      >
                        {loc === 'es' ? child.labelEs : child.labelEn}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </nav>

        <div className="flex items-center justify-between gap-4 px-6 py-7">
          <div
            role="group"
            aria-label={loc === 'es' ? "Selector de idioma" : "Language selector"}
            className="flex items-center font-sans text-xs tracking-[0.18em]"
          >
            <button
              type="button"
              onClick={() => setLang("ES")}
              aria-pressed={lang === "ES"}
              aria-label="Cambiar a Español"
              className={cn(
                "px-2 py-1 uppercase transition-colors cursor-pointer",
                lang === "ES"
                  ? "font-bold text-[var(--color-sand)]"
                  : "font-medium text-[var(--color-warm-white)]/60 hover:text-[var(--color-warm-white)]"
              )}
            >
              ES
            </button>
            <span className="text-[var(--color-warm-white)]/30 text-[0.72rem] select-none" aria-hidden="true">
              /
            </span>
            <button
              type="button"
              onClick={() => setLang("EN")}
              aria-pressed={lang === "EN"}
              aria-label="Switch to English"
              className={cn(
                "px-2 py-1 uppercase transition-colors cursor-pointer",
                lang === "EN"
                  ? "font-bold text-[var(--color-sand)]"
                  : "font-medium text-[var(--color-warm-white)]/60 hover:text-[var(--color-warm-white)]"
              )}
            >
              EN
            </button>
          </div>
          <Cta href="/contact" tone="sand" className="flex-1 justify-center" withArrow={false}>
            {loc === 'es' ? 'Comenzar a Planear' : 'Start Planning'}
          </Cta>
        </div>
      </div>
    </>
  )
}

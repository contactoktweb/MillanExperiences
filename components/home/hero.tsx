"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Cta } from "@/components/cta"
import { cn } from "@/lib/utils"

const slides = [
  {
    src: "/millan/boat-turquoise.jpg",
    alt: "A luxury speedboat moored on the clear turquoise water of the Colombian Caribbean.",
  },
  {
    src: "/millan/villa-island.png",
    alt: "A private villa with an infinity pool overlooking the sea near Cartagena.",
  },
  {
    src: "/millan/cartagena-night.png",
    alt: "A private dinner set on a colonial balcony in old town Cartagena at dusk.",
  },
]

const DURATION = 7000

export function Hero() {
  const [active, setActive] = useState(0)
  const [entered, setEntered] = useState(false)
  const timer = useRef<number | null>(null)

  useEffect(() => {
    const t = window.setTimeout(() => setEntered(true), 350)
    return () => window.clearTimeout(t)
  }, [])

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce) return

    const advance = () => setActive((i) => (i + 1) % slides.length)
    const run = () => {
      timer.current = window.setTimeout(advance, DURATION)
    }
    const onVisibility = () => {
      if (document.hidden && timer.current) {
        window.clearTimeout(timer.current)
      } else if (!document.hidden) {
        run()
      }
    }
    run()
    document.addEventListener("visibilitychange", onVisibility)
    return () => {
      if (timer.current) window.clearTimeout(timer.current)
      document.removeEventListener("visibilitychange", onVisibility)
    }
  }, [active])

  const go = (i: number) => setActive((i + slides.length) % slides.length)

  return (
    <section
      className="relative flex min-h-[100svh] items-end overflow-hidden bg-[var(--color-deep-sea)]"
      aria-label="Introduction"
    >
      {/* Slides */}
      {slides.map((slide, i) => (
        <div
          key={slide.src}
          aria-hidden={i !== active}
          className={cn(
            "absolute inset-0 transition-opacity duration-[1400ms] ease-[var(--ease-editorial)]",
            i === active ? "opacity-100" : "opacity-0",
          )}
        >
          <Image
            src={slide.src || "/placeholder.svg"}
            alt={slide.alt}
            fill
            priority={i === 0}
            sizes="100vw"
            className={cn(
              "object-cover transition-transform ease-linear",
              i === active ? "scale-100 duration-[7500ms]" : "scale-[1.08] duration-0",
            )}
          />
        </div>
      ))}

      {/* Overlay — only over photography, stronger at bottom for legibility */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-[var(--color-deep-sea)]/85 via-[var(--color-deep-sea)]/25 to-[var(--color-deep-sea)]/40"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 pb-24 pt-40 md:px-10 md:pb-28">
        <div className={cn("max-w-[720px]", "text-[var(--color-warm-white)]")}>
          

          <h1 className="display mt-6 text-[clamp(3rem,8vw,8rem)]">
            <span className="block overflow-hidden">
              <span
                className={cn(
                  "block transition-transform duration-[1100ms] ease-[var(--ease-editorial)]",
                  entered ? "translate-y-0" : "translate-y-full",
                )}
              >
                Colombia,
              </span>
            </span>
            <span className="block overflow-hidden">
              <span
                className={cn(
                  "block italic transition-transform delay-100 duration-[1100ms] ease-[var(--ease-editorial)]",
                  entered ? "translate-y-0" : "translate-y-full",
                )}
              >
                Designed for you.
              </span>
            </span>
          </h1>

          <p
            className={cn(
              "mt-8 max-w-xl font-sans text-base font-light leading-relaxed text-[var(--color-warm-white)]/85 transition-all delay-300 duration-1000 ease-[var(--ease-editorial)] md:text-lg",
              entered ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
            )}
          >
            Private stays, hand-picked boats and customized travel — guided by refined
            local knowledge and personal attention from the first call to the last sunset.
          </p>

          <div
            className={cn(
              "mt-10 flex flex-wrap items-center gap-4 transition-all delay-500 duration-1000 ease-[var(--ease-editorial)]",
              entered ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
            )}
          >
            <Cta href="/contact" tone="sand">
              Start Planning
            </Cta>
            <Cta href="/services" variant="outline" tone="light">
              Explore Experiences
            </Cta>
          </div>
        </div>

        {/* Slider controls */}
        <div className="mt-16 flex items-center justify-between border-t border-[color:var(--color-border-dark)] pt-6 text-[var(--color-warm-white)]">
          <div className="flex items-center gap-6">
            <span className="font-sans text-xs tracking-[0.2em]">
              <span className="text-[var(--color-sand)]">
                0{active + 1}
              </span>
              <span className="text-[var(--color-warm-white)]/50"> / 0{slides.length}</span>
            </span>
            <div className="h-px w-28 overflow-hidden bg-[color:var(--color-border-dark)] md:w-44">
              <div
                key={active}
                className="h-full origin-left bg-[var(--color-sand)] motion-safe:animate-[hero-progress_7s_linear]"
                style={{ animationFillMode: "forwards" }}
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => go(active - 1)}
              aria-label="Previous slide"
              className="flex h-10 w-10 items-center justify-center border border-[color:var(--color-border-dark)] transition-colors hover:border-[var(--color-sand)] hover:text-[var(--color-sand)]"
            >
              <ArrowRight className="h-4 w-4 rotate-180" strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={() => go(active + 1)}
              aria-label="Next slide"
              className="flex h-10 w-10 items-center justify-center border border-[color:var(--color-border-dark)] transition-colors hover:border-[var(--color-sand)] hover:text-[var(--color-sand)]"
            >
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="pointer-events-none absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-[var(--color-warm-white)]/70 md:flex">
        <span className="font-sans text-[0.6rem] uppercase tracking-[0.3em]">Scroll to discover</span>
        <span className="h-10 w-px bg-[var(--color-warm-white)]/40" />
      </div>

      <style jsx>{`
        @keyframes hero-progress {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }
      `}</style>
    </section>
  )
}

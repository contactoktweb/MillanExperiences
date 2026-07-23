"use client"

import { useState } from "react"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { testimonials } from "@/lib/site-data"
import { cn } from "@/lib/utils"

export function Testimonials() {
  const [active, setActive] = useState(0)
  const go = (i: number) => setActive((i + testimonials.length) % testimonials.length)
  const current = testimonials[active]

  return (
    <section className="bg-[var(--color-deep-sea)] py-24 text-[var(--color-warm-white)] md:py-40">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-12 px-6 md:px-10 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-7">
          <p className="eyebrow text-[var(--color-sand)]">Guest Stories</p>
          <h2 className="mt-5 font-serif text-[clamp(2.25rem,4.5vw,4.5rem)] leading-[1.05]">
            Felt, not just experienced.
          </h2>

          <div className="mt-12 min-h-[220px]">
            <blockquote key={active} className="motion-safe:animate-[fade-up_0.9s_var(--ease-editorial)]">
              <p className="max-w-2xl font-serif text-2xl leading-snug text-[var(--color-warm-white)] md:text-4xl">
                <span className="text-[var(--color-sand)]">“</span>
                {current.quote}
                <span className="text-[var(--color-sand)]">”</span>
              </p>
              <footer className="mt-8">
                <p className="font-sans text-sm font-medium tracking-[0.08em] text-[var(--color-warm-white)]">
                  {current.name}
                </p>
                <p className="font-sans text-xs font-light tracking-[0.08em] text-[var(--color-crystal-water)]">
                  {current.context}
                </p>
              </footer>
            </blockquote>
          </div>

          <div className="mt-10 flex items-center gap-6 border-t border-[color:var(--color-border-dark)] pt-6">
            <span className="font-sans text-xs tracking-[0.2em]">
              <span className="text-[var(--color-sand)]">0{active + 1}</span>
              <span className="text-[var(--color-warm-white)]/50"> / 0{testimonials.length}</span>
            </span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => go(active - 1)}
                aria-label="Previous testimonial"
                className="flex h-10 w-10 items-center justify-center border border-[color:var(--color-border-dark)] transition-colors hover:border-[var(--color-sand)] hover:text-[var(--color-sand)]"
              >
                <ArrowRight className="h-4 w-4 rotate-180" strokeWidth={1.5} />
              </button>
              <button
                type="button"
                onClick={() => go(active + 1)}
                aria-label="Next testimonial"
                className="flex h-10 w-10 items-center justify-center border border-[color:var(--color-border-dark)] transition-colors hover:border-[var(--color-sand)] hover:text-[var(--color-sand)]"
              >
                <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="relative aspect-[4/5] w-full overflow-hidden">
            <Image
              src="/millan/rosario-islands.png"
              alt="A private island surrounded by turquoise water near Cartagena."
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
            <span aria-hidden className="absolute inset-0 bg-[var(--color-deep-sea)]/15" />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-up {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  )
}

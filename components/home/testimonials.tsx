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
          <div className="flex items-center justify-between flex-wrap gap-6">
            <div>
              <p className="eyebrow text-[var(--color-sand)]">Guest Stories</p>
              <h2 className="mt-5 font-serif text-[clamp(2.25rem,4.5vw,4.5rem)] leading-[1.05]">
                Felt, not just experienced.
              </h2>
            </div>
            
            {/* Google Reviews Badge */}
            <div className="flex flex-col gap-2 rounded-lg border border-[color:var(--color-border-dark)] p-4 bg-[var(--color-deep-sea)]/50">
              <div className="flex items-center gap-2">
                <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span className="font-sans text-sm font-semibold tracking-wide text-white">Google</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-sans text-sm font-medium text-[var(--color-warm-white)]">5.0</span>
                <div className="flex text-[#FBBC05]">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                    </svg>
                  ))}
                </div>
              </div>
              <span className="font-sans text-xs font-light text-[var(--color-warm-white)]/60">Customer Reviews</span>
            </div>
          </div>

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

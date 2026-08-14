"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Cta } from "@/components/cta"

interface FaqItem {
  question: string
  answer: string
}

interface FaqAccordionProps {
  title: string
  description?: string
  eyebrow?: string
  questions: FaqItem[]
  cta?: {
    label: string
    href: string
  }
}

export function FaqAccordion({
  title,
  description,
  eyebrow,
  questions,
  cta,
}: FaqAccordionProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  return (
    <section className="bg-[var(--color-sand)]/20 py-24 md:py-32 border-t border-[var(--color-border)]">
      <div className="mx-auto max-w-[900px] px-6 md:px-10">
        <div className="text-center mb-16">
          {eyebrow && (
            <span className="font-sans text-[0.7rem] font-bold uppercase tracking-[0.25em] text-[var(--color-sand)] mb-3 block">
              {eyebrow}
            </span>
          )}
          <h2 className="font-serif text-3xl md:text-5xl text-[var(--color-text-dark)] leading-tight">
            {title}
          </h2>
          {description && (
            <p className="mt-5 font-sans text-[var(--color-blue-gray)] text-base md:text-lg font-light max-w-2xl mx-auto leading-relaxed">
              {description}
            </p>
          )}
        </div>

        <div className="space-y-4">
          {questions && questions.length > 0 && (
            <div className="space-y-3">
              {questions.map((item, idx) => {
                const isOpen = openFaq === idx
                return (
                  <div
                    key={idx}
                    className="rounded-xl border border-[var(--color-border)] bg-[var(--color-warm-white)]/90 backdrop-blur-sm transition-all duration-300 hover:border-[var(--color-sand)]/60 shadow-sm overflow-hidden"
                  >
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full py-5 px-6 md:px-8 text-left flex items-center justify-between gap-4 cursor-pointer group"
                      aria-expanded={isOpen}
                    >
                      <h3 className="font-serif text-lg md:text-xl text-[var(--color-text-dark)] font-normal group-hover:text-[var(--color-sand)] transition-colors pr-2">
                        {item.question}
                      </h3>
                      <div
                        className={`flex-shrink-0 w-8 h-8 rounded-full border border-[var(--color-border)] flex items-center justify-center transition-transform duration-300 ${
                          isOpen
                            ? "rotate-180 bg-[var(--color-sand)] text-white border-[var(--color-sand)]"
                            : "text-[var(--color-blue-gray)] group-hover:border-[var(--color-sand)]"
                        }`}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </button>
                    {isOpen && (
                      <div className="px-6 md:px-8 pb-6 pt-1 text-[var(--color-blue-gray)] font-sans text-sm md:text-base font-light leading-relaxed border-t border-[var(--color-border)]/40 animate-fadeIn">
                        <p>{item.answer}</p>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}

          {cta && (
            <div className="mt-14 text-center flex justify-center">
              <Cta
                href={cta.href}
                tone="sand"
                className="text-sm px-8 py-4 tracking-widest font-sans uppercase"
              >
                {cta.label}
              </Cta>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

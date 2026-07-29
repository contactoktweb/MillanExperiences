"use client"

import { useState } from "react"
import { Plus, Minus } from "lucide-react"
import { cn } from "@/lib/utils"

export type AccordionItem = {
  id: string
  title: string
  content: React.ReactNode
}

export function AccordionCustom({ items }: { items: AccordionItem[] }) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id || null)
  
  return (
    <div className="flex flex-col border-t border-[color:var(--color-border-dark)]">
      {items.map((item, i) => (
        <div key={item.id} className="border-b border-[color:var(--color-border-dark)]">
          <button
            onClick={() => setOpenId(openId === item.id ? null : item.id)}
            className="flex w-full items-center justify-between py-6 text-left hover:text-[var(--color-sand)] transition-colors"
            aria-expanded={openId === item.id}
          >
            <div className="flex items-center gap-6">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-current font-sans text-xs">
                {i + 1}
              </span>
              <h3 className="font-serif text-2xl">{item.title}</h3>
            </div>
            {openId === item.id ? <Minus className="h-5 w-5 shrink-0" /> : <Plus className="h-5 w-5 shrink-0" />}
          </button>
          <div
            className={cn(
              "grid transition-all duration-300 ease-[var(--ease-editorial)]",
              openId === item.id ? "grid-rows-[1fr] opacity-100 pb-6" : "grid-rows-[0fr] opacity-0"
            )}
          >
            <div className="overflow-hidden">
              <div className="pl-[3.5rem] pr-8 font-sans text-sm font-light leading-relaxed text-[var(--color-warm-white)]/80">
                {item.content}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

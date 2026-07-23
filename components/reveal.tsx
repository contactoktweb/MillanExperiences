"use client"

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react"
import { cn } from "@/lib/utils"

type RevealVariant = "up" | "clip" | "text"

const variantClass: Record<RevealVariant, string> = {
  up: "reveal-up",
  clip: "reveal-clip",
  text: "reveal-text",
}

type RevealProps = {
  children: ReactNode
  as?: ElementType
  variant?: RevealVariant
  delay?: number
  className?: string
  once?: boolean
}

export function Reveal({
  children,
  as: Tag = "div",
  variant = "up",
  delay = 0,
  className,
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true)
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            if (once) observer.unobserve(entry.target)
          } else if (!once) {
            setVisible(false)
          }
        })
      },
      { threshold: 0.01, rootMargin: "0px 0px -10% 0px" },
    )
    observer.observe(el)

    // Fallback: if the element is already within the viewport on mount
    // (or the observer never fires), reveal it so content is never stuck hidden.
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
      setVisible(true)
      if (once) observer.unobserve(el)
    }

    return () => observer.disconnect()
  }, [once])

  return (
    <Tag
      ref={ref}
      className={cn(variantClass[variant], visible && "is-visible", className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {variant === "text" ? <span>{children}</span> : children}
    </Tag>
  )
}

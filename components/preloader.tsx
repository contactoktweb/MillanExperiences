"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

export function Preloader() {
  const [mounted, setMounted] = useState(false)
  const [show, setShow] = useState(true)
  const [progress, setProgress] = useState(0)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    setMounted(true)
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
      
    // Temporarily disabled so you can always see the loading animation
    // const seen =
    //   typeof sessionStorage !== "undefined" && sessionStorage.getItem("millan-preloaded")

    if (reduce) {
      setShow(false)
      return
    }

    document.body.style.overflow = "hidden"

    const start = performance.now()
    const duration = 1600
    let raf = 0
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration)
      setProgress(p)
      if (p < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        setLeaving(true)
        // sessionStorage.setItem("millan-preloaded", "1")
        window.setTimeout(() => {
          setShow(false)
          document.body.style.overflow = ""
        }, 900)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      document.body.style.overflow = ""
    }
  }, [])

  if (!mounted || !show) return null

  return (
    <div className="fixed inset-0 z-[200] flex" aria-hidden>
      {/* Two panels reveal the hero */}
      <div
        className={cn(
          "absolute inset-0 flex items-center justify-center bg-[var(--color-deep-sea)] transition-transform duration-[900ms] ease-[var(--ease-editorial)]",
          leaving && "-translate-y-full",
        )}
      >
        <div className="flex flex-col items-center">
          <div className="overflow-hidden">
            <Image
              src="/logo/logo-large.png"
              alt="Millan Experiences"
              width={260}
              height={130}
              className={cn(
                "object-contain transition-transform duration-[1100ms] ease-[var(--ease-editorial)]",
                progress > 0.05 ? "translate-y-0" : "translate-y-full",
              )}
            />
          </div>
          <div className="mt-8 h-px w-40 overflow-hidden bg-[color:var(--color-border-dark)]">
            <div
              className="h-full bg-[var(--color-sand)]"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

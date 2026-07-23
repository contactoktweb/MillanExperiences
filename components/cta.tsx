import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

type Variant = "solid" | "outline" | "ghost"
type Tone = "sand" | "sea" | "light"

const base =
  "group/cta relative inline-flex items-center gap-2.5 overflow-hidden px-7 py-3.5 font-sans text-[0.72rem] font-medium uppercase tracking-[0.22em] transition-colors duration-500 ease-[var(--ease-editorial)]"

const styles: Record<`${Variant}-${Tone}`, string> = {
  "solid-sand":
    "bg-[var(--color-sand)] text-[var(--color-deep-sea)] hover:text-[var(--color-warm-white)]",
  "solid-sea":
    "bg-[var(--color-deep-sea)] text-[var(--color-warm-white)] hover:text-[var(--color-deep-sea)]",
  "solid-light":
    "bg-[var(--color-warm-white)] text-[var(--color-deep-sea)] hover:text-[var(--color-warm-white)]",
  "outline-sand":
    "border border-[var(--color-sand)] text-[var(--color-sand)] hover:text-[var(--color-deep-sea)]",
  "outline-sea":
    "border border-[color:var(--color-border-light)] text-[var(--color-deep-sea)] hover:text-[var(--color-warm-white)]",
  "outline-light":
    "border border-[color:var(--color-border-dark)] text-[var(--color-warm-white)] hover:text-[var(--color-deep-sea)]",
  "ghost-sand": "text-[var(--color-sand)]",
  "ghost-sea": "text-[var(--color-deep-sea)]",
  "ghost-light": "text-[var(--color-warm-white)]",
}

const fillColor: Record<Tone, string> = {
  sand: "bg-[var(--color-deep-sea)]",
  sea: "bg-[var(--color-sand)]",
  light: "bg-[var(--color-deep-sea)]",
}

export function Cta({
  href,
  children,
  variant = "solid",
  tone = "sand",
  className,
  withArrow = true,
}: {
  href: string
  children: React.ReactNode
  variant?: Variant
  tone?: Tone
  className?: string
  withArrow?: boolean
}) {
  const isGhost = variant === "ghost"
  return (
    <Link href={href} className={cn(base, styles[`${variant}-${tone}`], className)}>
      {!isGhost && (
        <span
          aria-hidden
          className={cn(
            "absolute inset-0 -z-0 origin-left scale-x-0 transition-transform duration-500 ease-[var(--ease-editorial)] group-hover/cta:scale-x-100",
            fillColor[tone],
          )}
        />
      )}
      <span className="relative z-10">{children}</span>
      {withArrow && (
        <ArrowRight
          className="relative z-10 h-3.5 w-3.5 transition-transform duration-500 ease-[var(--ease-editorial)] group-hover/cta:translate-x-1"
          strokeWidth={1.5}
        />
      )}
    </Link>
  )
}

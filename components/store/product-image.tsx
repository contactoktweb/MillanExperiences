import Image from "next/image"
import { Wine } from "lucide-react"
import { cn } from "@/lib/utils"

interface ProductImageProps {
  src?: string
  alt: string
  sizes?: string
  priority?: boolean
  className?: string
  fit?: "contain" | "cover"
}

/** Imagen de producto con placeholder elegante cuando aún no hay fotografía cargada en el CMS. */
export function ProductImage({
  src,
  alt,
  sizes,
  priority,
  className,
  fit = "contain",
}: ProductImageProps) {
  if (!src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-[var(--color-sand)]/10 via-[var(--color-warm-white)] to-[var(--color-sand)]/5 p-4 text-center select-none"
      >
        <Wine className="h-9 w-9 text-[var(--color-sand)] stroke-[1.25]" aria-hidden="true" />
        <span className="font-sans text-[0.62rem] uppercase tracking-[0.18em] text-[var(--color-blue-gray)]/80">
          Cava Privada
        </span>
      </div>
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className={cn(
        fit === "contain" ? "object-contain" : "object-cover",
        className
      )}
    />
  )
}

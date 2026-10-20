import { cn } from "@/lib/utils"
import Image from "next/image"

export function Monogram({ className, logoUrl }: { className?: string, logoUrl?: string }) {
  return (
    <Image 
      src={logoUrl || "/logo/logo-header.png"} 
      alt="Millan Experiences"
      width={120}
      height={50}
      style={{ width: "auto", height: "auto" }}
      className={cn("h-7 sm:h-8 w-auto object-contain", className)}
    />
  )
}

export function Wordmark({
  className,
  monogramClassName,
  stacked = false,
  logoUrl,
}: {
  className?: string
  monogramClassName?: string
  stacked?: boolean
  logoUrl?: string
}) {
  return (
    <div className={cn("inline-flex items-center", className)}>
      <Image 
        src={logoUrl || "/logo/logo-header.png"} 
        alt="Millan Experiences"
        width={140}
        height={50}
        style={{ width: "auto", height: "auto" }}
        className={cn("h-7 sm:h-8 md:h-9 w-auto object-contain transition-all duration-300", monogramClassName)}
      />
    </div>
  )
}

import { cn } from "@/lib/utils"
import Image from "next/image"

export function Monogram({ className, logoUrl }: { className?: string, logoUrl?: string }) {
  return (
    <Image 
      src={logoUrl || "/logo/logo-header.png"} 
      alt="Millan Experiences"
      width={40}
      height={40}
      style={{ height: "auto" }}
      className={cn("object-contain", className)}
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
        width={160}
        height={60}
        style={{ height: "auto" }}
        className={cn("object-contain", monogramClassName)}
      />
    </div>
  )
}

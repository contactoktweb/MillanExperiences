import { cn } from "@/lib/utils"
import Image from "next/image"

export function Monogram({ className }: { className?: string }) {
  return (
    <Image 
      src="/logo/logo-header.png" 
      alt="Millan Experiences"
      width={40}
      height={40}
      className={cn("object-contain", className)}
    />
  )
}

export function Wordmark({
  className,
  monogramClassName,
  stacked = false,
}: {
  className?: string
  monogramClassName?: string
  stacked?: boolean
}) {
  return (
    <div className={cn("inline-flex items-center", className)}>
      <Image 
        src="/logo/logo-header.png" 
        alt="Millan Experiences"
        width={160}
        height={60}
        className={cn("object-contain", monogramClassName)}
      />
    </div>
  )
}

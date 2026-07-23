import { cn } from "@/lib/utils"

/*
  MILLAN EXPERIENCES — monogram + wordmark.
  Recreated as clean vector marks (the "M" monogram with a fine seriffed stem)
  in the brand's serif voice. Swap for the official logo files before launch.
*/

export function Monogram({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      role="img"
      aria-label="Millan Experiences monogram"
      fill="none"
    >
      <path
        d="M14 100 V26 h9 l37 52 37-52 h9 v74 h-11 V44 L63 92 h-6 L26 44 v56 z"
        fill="currentColor"
      />
      <rect x="55.5" y="18" width="9" height="88" fill="currentColor" />
    </svg>
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
    <span
      className={cn(
        "inline-flex items-center gap-3 leading-none",
        stacked && "flex-col items-start gap-1",
        className,
      )}
    >
      <Monogram className={cn("h-7 w-7 shrink-0", monogramClassName)} />
      <span className="flex flex-col leading-none">
        <span
          className="font-serif text-lg tracking-[0.02em]"
          style={{ fontVariantCaps: "small-caps" }}
        >
          Millan
        </span>
        <span className="font-sans text-[0.6rem] font-medium uppercase tracking-[0.42em]">
          Experiences
        </span>
      </span>
    </span>
  )
}

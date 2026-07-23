import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { coreServices } from "@/lib/site-data"
import { Reveal } from "@/components/reveal"
import { cn } from "@/lib/utils"

function ServiceCard({
  service,
  large = false,
  tone = "sand",
}: {
  service: (typeof coreServices)[number]
  large?: boolean
  tone?: "sand" | "sea" | "water"
}) {
  const surface =
    tone === "sea"
      ? "bg-[var(--color-deep-sea)] text-[var(--color-warm-white)]"
      : tone === "water"
        ? "bg-[var(--color-crystal-water)]/20 text-[var(--color-deep-sea)]"
        : "bg-[var(--color-warm-white)] text-[var(--color-deep-sea)]"

  return (
    <Link
      href={service.href}
      className={cn("group flex h-full flex-col", surface)}
    >
      <div
        className={cn(
          "relative w-full overflow-hidden",
          large ? "aspect-[4/5] md:aspect-[16/13]" : "aspect-[4/3]",
        )}
      >
        <Reveal variant="clip" className="absolute inset-0">
          <Image
            src={service.image || "/placeholder.svg"}
            alt={service.imageAlt}
            fill
            sizes={large ? "60vw" : "40vw"}
            className="object-cover transition-transform duration-[900ms] ease-[var(--ease-editorial)] group-hover:scale-105"
          />
        </Reveal>
        <span
          aria-hidden
          className="absolute inset-0 bg-[var(--color-deep-sea)]/10 transition-colors duration-500 group-hover:bg-[var(--color-deep-sea)]/25"
        />
        <span className="absolute left-5 top-4 font-serif text-lg text-[var(--color-warm-white)]/80 transition-opacity duration-500 group-hover:opacity-100">
          {service.number}
        </span>
      </div>

      <div className={cn("flex flex-1 flex-col p-6 md:p-8", large && "md:p-10")}>
        <h3 className={cn("font-serif", large ? "text-3xl md:text-4xl" : "text-2xl")}>
          {service.title}
        </h3>
        <p className="mt-3 max-w-md font-sans text-sm font-light leading-relaxed opacity-80">
          {service.description}
        </p>
        <span className="mt-6 inline-flex items-center gap-2 font-sans text-[0.68rem] font-medium uppercase tracking-[0.2em] text-[var(--color-dark-sand)]">
          {service.cta}
          <ArrowRight
            className="h-3.5 w-3.5 transition-transform duration-500 ease-[var(--ease-editorial)] group-hover:translate-x-1"
            strokeWidth={1.5}
          />
        </span>
        <span
          aria-hidden
          className="mt-4 h-px w-full origin-left scale-x-0 bg-current opacity-30 transition-transform duration-500 ease-[var(--ease-editorial)] group-hover:scale-x-100"
        />
      </div>
    </Link>
  )
}

export function CoreServices() {
  const [first, second, third, fourth] = coreServices
  return (
    <section id="services" className="bg-[var(--color-muted)] py-24 md:py-40">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <p className="eyebrow text-[var(--color-dark-sand)]">Core Services</p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-5 font-serif text-[clamp(2.5rem,5vw,5rem)] leading-[1.02]">
                Choose a voyage
              </h2>
            </Reveal>
          </div>
          <Reveal delay={160}>
            <p className="max-w-sm font-sans text-sm font-light leading-relaxed text-[var(--color-muted-foreground)]">
              Four ways into Colombia — each one composed by hand, each one handled
              from the first plan to the final detail.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:mt-20 md:grid-cols-12">
          <div className="md:col-span-7">
            <ServiceCard service={first} large />
          </div>
          <div className="flex flex-col gap-6 md:col-span-5">
            <ServiceCard service={second} tone="sea" />
            <ServiceCard service={third} tone="water" />
          </div>
          <div className="md:col-span-12">
            <div className="grid grid-cols-1 md:grid-cols-12">
              <div className="md:col-span-12">
                <ServiceCard service={fourth} large />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

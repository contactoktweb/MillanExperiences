import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

import { Reveal } from "@/components/reveal"
import { cn } from "@/lib/utils"

function ServiceCard({
  service,
  variant = "standard",
  tone = "sand",
}: {
  service: any
  variant?: "standard" | "featured" | "wide"
  tone?: "sand" | "sea" | "water"
}) {
  const surface =
    tone === "sea"
      ? "bg-[var(--color-deep-sea)] text-[var(--color-warm-white)]"
      : tone === "water"
        ? "bg-[var(--color-crystal-water)]/20 text-[var(--color-deep-sea)]"
        : "bg-[var(--color-warm-white)] text-[var(--color-deep-sea)]"

  const imageClasses = cn(
    "relative w-full overflow-hidden",
    variant === "featured" ? "flex-1 min-h-[300px] md:min-h-0" : "",
    variant === "wide" ? "aspect-[4/5] md:aspect-[21/9]" : "",
    variant === "standard" ? "aspect-[4/3]" : ""
  )

  const isLargeText = variant === "featured" || variant === "wide"

  return (
    <Link
      href={service.href}
      className={cn("group flex h-full flex-col", surface)}
    >
      <div className={imageClasses}>
        <Reveal variant="clip" className="absolute inset-0">
          <Image
            src={service?.imageUrl || service?.image || "/placeholder.svg"}
            alt={service?.imageAlt || service?.title || "Service image"}
            fill
            sizes={variant === "wide" ? "100vw" : variant === "featured" ? "60vw" : "40vw"}
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

      <div className={cn("flex flex-col p-6 md:p-8", isLargeText && "md:p-10")}>
        <h3 className={cn("font-serif", isLargeText ? "text-3xl md:text-4xl" : "text-2xl")}>
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

interface CoreServicesData {
  eyebrow?: string;
  headline?: string;
  description?: string;
  services?: any[];
}

export function CoreServices({ data }: { data?: CoreServicesData }) {
  const services = data?.services || []
  
  if (!services.length) return null;

  return (
    <section id="services" className="bg-[var(--color-muted)] py-24 md:py-40">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <p className="eyebrow text-[var(--color-dark-sand)]">{data?.eyebrow || "Core Services"}</p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-5 font-serif text-[clamp(2.5rem,5vw,5rem)] leading-[1.02]">
                {data?.headline || "Choose a voyage"}
              </h2>
            </Reveal>
          </div>
          <Reveal delay={160}>
            <p className="max-w-sm font-sans text-sm font-light leading-relaxed text-[var(--color-muted-foreground)]">
              {data?.description || "Four ways into Colombia — each one composed by hand, each one handled from the first plan to the final detail."}
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:mt-20 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              service={service}
              tone={index % 4 === 1 ? "sea" : index % 4 === 2 ? "water" : "sand"}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

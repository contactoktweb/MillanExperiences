import Image from "next/image"
import { brandAttributes } from "@/lib/site-data"
import { Reveal } from "@/components/reveal"
import { Cta } from "@/components/cta"

export function WhyMillan() {
  return (
    <section className="bg-[var(--color-warm-white)] py-24 md:py-40">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Imagery */}
          <div className="relative lg:col-span-5">
            <Reveal variant="clip" className="relative aspect-[3/4] w-full overflow-hidden">
              <Image
                src="/fotos/concierge-ai.webp"
                alt="Cobblestone streets of Cartagena."
                fill
                sizes="(max-width: 768px) 100vw, 35vw"
                className="object-cover"
              />
            </Reveal>
            <Reveal
              variant="up"
              delay={200}
              className="absolute -bottom-10 -right-4 hidden aspect-[4/3] w-2/3 overflow-hidden border-8 border-[var(--color-warm-white)] shadow-sm sm:block"
            >
              <div className="relative h-full w-full">
                <Image
                  src="/fotos/Playa.webp"
                  alt="A tranquil scene in the Rosario Islands."
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>

          {/* Copy */}
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal>
              <p className="eyebrow text-[var(--color-dark-sand)]">Why Millan Experiences</p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-5 max-w-xl font-serif text-[clamp(2.25rem,4.5vw,4.5rem)] leading-[1.05]">
                Every detail, already considered.
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-8 max-w-lg font-sans text-base font-light leading-relaxed text-[var(--color-muted-foreground)]">
                At Millan Experiences, true luxury is not simply where you stay or how you
                travel. It is the ease of knowing that every detail has been anticipated,
                curated and handled by someone who understands the destination from within.
              </p>
            </Reveal>
            <Reveal delay={220}>
              <p className="mt-6 font-serif text-2xl italic text-[var(--color-deep-sea)]">
                Nothing left to chance.
              </p>
            </Reveal>

            <ul className="mt-12 grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2">
              {brandAttributes.map((attr, i) => (
                <Reveal as="li" key={attr.title} delay={i * 90}>
                  <span className="block h-px w-10 bg-[var(--color-sand)]" />
                  <h3 className="mt-4 font-serif text-xl">{attr.title}</h3>
                  <p className="mt-2 font-sans text-sm font-light leading-relaxed text-[var(--color-muted-foreground)]">
                    {attr.body}
                  </p>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={120} className="mt-12">
              <Cta href="/about" variant="ghost" tone="sea" className="px-0">
                Discover our story
              </Cta>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

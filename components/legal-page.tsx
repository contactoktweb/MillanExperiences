import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { InlineText } from "@/components/blog/rich-text"

export type LegalSection = { title: string; paragraphs?: string[]; items?: string[] }

// Shared layout for the privacy policy and terms pages.
export function LegalPage({
  eyebrow,
  title,
  updated,
  intro,
  sections,
}: {
  eyebrow: string
  title: string
  updated: string
  intro: string
  sections: LegalSection[]
}) {
  return (
    <>
      <SiteHeader forceSolid />
      <main id="main" className="bg-[var(--color-warm-white)] pt-36 pb-24 md:pt-44 md:pb-32">
        <article className="mx-auto max-w-[760px] px-6 md:px-10">
          <p className="eyebrow text-[var(--color-dark-sand)]">{eyebrow}</p>
          <h1 className="display mt-6 text-[clamp(2.4rem,5vw,3.75rem)] text-[var(--color-text-dark)]">{title}</h1>
          <p className="mt-6 font-sans text-sm font-light text-[var(--color-blue-gray)]">{updated}</p>
          <p className="mt-10 font-sans text-[1.0625rem] font-light leading-[1.85] text-[var(--color-text-dark)]/85">
            <InlineText text={intro} />
          </p>
          {sections.map((section, i) => (
            <section key={i} className="mt-12">
              <h2 className="font-serif text-2xl text-[var(--color-text-dark)] md:text-3xl">{section.title}</h2>
              <div className="mt-5 space-y-4 font-sans text-[1.0625rem] font-light leading-[1.85] text-[var(--color-text-dark)]/85">
                {section.paragraphs?.map((text, j) => (
                  <p key={j}>
                    <InlineText text={text} />
                  </p>
                ))}
                {section.items && (
                  <ul className="space-y-3">
                    {section.items.map((item, j) => (
                      <li key={j} className="relative pl-6">
                        <span aria-hidden className="absolute left-0 top-[0.85em] h-px w-3 bg-[var(--color-sand)]" />
                        <InlineText text={item} />
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          ))}
        </article>
      </main>
      <SiteFooter />
    </>
  )
}

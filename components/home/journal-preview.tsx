import { Reveal } from "@/components/reveal"
import { Cta } from "@/components/cta"
import { PostCard } from "@/components/blog/post-card"
import { getAllPosts, type Locale } from "@/lib/blog"

const copy = {
  en: {
    eyebrow: "The Journal",
    title: "Guides from the Colombian Caribbean",
    text: "Local knowledge from our concierge team — islands, seasons, yachts and celebrations in Cartagena.",
    cta: "Read the journal",
  },
  es: {
    eyebrow: "El Blog",
    title: "Guías del Caribe colombiano",
    text: "Conocimiento local de nuestro equipo de concierge: islas, temporadas, yates y celebraciones en Cartagena.",
    cta: "Leer el blog",
  },
}

export function JournalPreview({ locale }: { locale: Locale }) {
  const t = copy[locale]
  const posts = getAllPosts().slice(0, 3)
  if (posts.length === 0) return null

  return (
    <section className="bg-[var(--color-card)] py-24 md:py-32" aria-labelledby="journal-preview-title">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <div className="mb-14 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-[var(--color-blue-gray)]">{t.eyebrow}</p>
            <h2
              id="journal-preview-title"
              className="mt-5 font-serif text-[clamp(2.25rem,4.5vw,4rem)] leading-[1.05] text-[var(--color-text-dark)]"
            >
              {t.title}
            </h2>
            <p className="mt-6 font-sans text-base font-light leading-relaxed text-[var(--color-blue-gray)] md:text-lg">
              {t.text}
            </p>
          </Reveal>
          <Cta href="/blog" variant="outline" tone="sea" className="w-fit">
            {t.cta}
          </Cta>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  )
}

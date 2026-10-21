import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight } from "lucide-react"
import { Preloader } from "@/components/preloader"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Cta } from "@/components/cta"
import { FaqAccordion } from "@/components/faq-accordion"
import { JsonLd } from "@/components/json-ld"
import { BlogBody, InlineText } from "@/components/blog/rich-text"
import { PostCard, PostMeta } from "@/components/blog/post-card"
import { getAllPosts, getRelatedPosts, headingId, readingMinutes } from "@/lib/blog"
import { blockPlainText } from "@/lib/blog/portable-text"
import {
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
  breadcrumbJsonLd,
  buildMetadata,
  faqJsonLd,
  getLocale,
} from "@/lib/seo"

const ui = {
  en: {
    home: "Home",
    blog: "Blog",
    by: "By the Millan Experiences concierge team",
    inShort: "In short",
    toc: "In this article",
    planIt: "Plan it with us",
    faqEyebrow: "FAQ",
    faqTitle: "Frequently asked questions",
    related: "Keep reading",
    allPosts: "All guides",
  },
  es: {
    home: "Inicio",
    blog: "Blog",
    by: "Por el equipo de concierge de Millan Experiences",
    inShort: "En resumen",
    toc: "En este artículo",
    planIt: "Planéalo con nosotros",
    faqEyebrow: "Preguntas frecuentes",
    faqTitle: "Preguntas frecuentes",
    related: "Sigue leyendo",
    allPosts: "Todas las guías",
  },
}

export async function generateStaticParams() {
  return (await getAllPosts()).map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = (await getAllPosts()).find((p) => p.slug === slug)
  if (!post) return {}
  const locale = await getLocale()
  const c = post.content[locale]
  return buildMetadata({
    title: c.metaTitle || c.title,
    description: c.metaDescription || c.description,
    path: `/blog/${post.slug}`,
    locale,
    image: post.image,
    imageAlt: c.imageAlt,
    type: "article",
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt,
    keywords: post.keywords,
  })
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const allPosts = await getAllPosts()
  const post = allPosts.find((p) => p.slug === slug)
  if (!post) notFound()

  const locale = await getLocale()
  const t = ui[locale]
  const c = post.content[locale]
  const url = absoluteUrl(`/blog/${post.slug}`)
  const toc = c.body
    .filter((b) => b._type === "block" && b.style === "h2" && !b.listItem)
    .map((b) => ({ id: headingId(blockPlainText(b)), text: blockPlainText(b) }))
  const related = getRelatedPosts(allPosts, post.slug)

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    headline: c.title,
    description: c.description,
    image: [absoluteUrl(post.image)],
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    inLanguage: locale,
    articleSection: c.category,
    keywords: post.keywords.join(", "),
    wordCount: readingMinutes(post, locale) * 220,
    abstract: c.takeaways.join(" "),
    author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    publisher: { "@id": `${SITE_URL}/#organization` },
    isPartOf: { "@id": `${SITE_URL}/blog#blog` },
    about: { "@type": "Place", name: "Cartagena de Indias, Colombia" },
  }

  return (
    <>
      <Preloader />
      <SiteHeader />

      <main id="main">
        <article>
          {/* HERO */}
          <header className="relative flex min-h-[80svh] items-end overflow-hidden bg-[var(--color-deep-sea)] pt-32 pb-16 md:pb-24">
            <div className="absolute inset-0">
              <Image src={post.image} alt={c.imageAlt} fill priority sizes="100vw" className="object-cover opacity-55" />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-deep-sea)] via-[var(--color-deep-sea)]/45 to-[var(--color-deep-sea)]/10" />
            </div>
            <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 md:px-10 text-[var(--color-warm-white)]">
              <nav aria-label="Breadcrumb" className="font-sans text-[0.7rem] uppercase tracking-[0.18em] text-[var(--color-warm-white)]/70">
                <ol className="flex flex-wrap items-center gap-2">
                  <li><Link href="/" className="hover:text-[var(--color-sand)] transition-colors">{t.home}</Link></li>
                  <li aria-hidden>/</li>
                  <li><Link href="/blog" className="hover:text-[var(--color-sand)] transition-colors">{t.blog}</Link></li>
                  <li aria-hidden>/</li>
                  <li className="text-[var(--color-sand)]">{c.category}</li>
                </ol>
              </nav>
              <h1 className="display mt-8 max-w-4xl text-[clamp(2.4rem,5vw,4.5rem)] leading-[1.05]">{c.title}</h1>
              <p className="mt-6 max-w-2xl font-sans text-lg font-light leading-relaxed text-[var(--color-warm-white)]/85">
                {c.description}
              </p>
              <div className="mt-8 flex flex-col gap-2 text-[var(--color-warm-white)]/75 sm:flex-row sm:items-center sm:gap-6">
                <PostMeta post={post} locale={locale} />
                <p className="font-sans text-sm font-light">{t.by}</p>
              </div>
            </div>
          </header>

          {/* BODY */}
          <div className="bg-[var(--color-warm-white)] py-16 md:py-24">
            <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-12 px-6 md:px-10 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-20">
              <aside className="hidden lg:block">
                <div className="sticky top-32 space-y-12">
                  <nav aria-label={t.toc}>
                    <p className="eyebrow text-[var(--color-blue-gray)]">{t.toc}</p>
                    <ol className="mt-5 space-y-3 border-l border-[var(--color-border)]">
                      {toc.map((h) => (
                        <li key={h.id}>
                          <a
                            href={`#${h.id}`}
                            className="-ml-px block border-l border-transparent pl-4 font-sans text-sm font-light leading-snug text-[var(--color-blue-gray)] transition-colors hover:border-[var(--color-sand)] hover:text-[var(--color-text-dark)]"
                          >
                            {h.text}
                          </a>
                        </li>
                      ))}
                    </ol>
                  </nav>
                  <div>
                    <p className="eyebrow text-[var(--color-blue-gray)]">{t.planIt}</p>
                    <ul className="mt-5 space-y-3">
                      {post.related.map((r) => (
                        <li key={r.href}>
                          <Link
                            href={r.href}
                            className="group inline-flex items-center gap-2 font-sans text-sm text-[var(--color-deep-sea)] transition-colors hover:text-[var(--color-dark-sand)]"
                          >
                            <span className="link-underline">{r.label[locale]}</span>
                            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </aside>

              <div className="max-w-[720px]">
                <section aria-labelledby="in-short" className="mb-14 rounded-[min(var(--radius-lg),16px)] border border-[var(--color-border)] bg-[var(--color-card)] p-7 md:p-10">
                  <h2 id="in-short" className="eyebrow text-[var(--color-dark-sand)]">{t.inShort}</h2>
                  <ul className="mt-6 space-y-4 font-sans text-base font-light leading-relaxed text-[var(--color-text-dark)]/85">
                    {c.takeaways.map((item, i) => (
                      <li key={i} className="relative pl-6">
                        <span aria-hidden className="absolute left-0 top-[0.7em] h-1.5 w-1.5 rounded-full bg-[var(--color-sand)]" />
                        <InlineText text={item} />
                      </li>
                    ))}
                  </ul>
                </section>

                <BlogBody value={c.body} />

                <div className="mt-14 flex flex-wrap gap-3 border-t border-[var(--color-border)] pt-10 lg:hidden">
                  {post.related.map((r) => (
                    <Link
                      key={r.href}
                      href={r.href}
                      className="rounded-full border border-[var(--color-border)] px-5 py-2.5 font-sans text-[0.7rem] font-medium uppercase tracking-[0.16em] text-[var(--color-deep-sea)] transition-colors hover:border-[var(--color-sand)] hover:text-[var(--color-dark-sand)]"
                    >
                      {r.label[locale]}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* FAQ */}
          {c.faqs.length > 0 && (
            <FaqAccordion eyebrow={t.faqEyebrow} title={t.faqTitle} questions={c.faqs} />
          )}
        </article>

        {/* CTA */}
        <section className="bg-[var(--color-deep-sea)] py-24 md:py-32 text-center text-[var(--color-warm-white)]">
          <div className="mx-auto max-w-3xl px-6 md:px-10">
            <h2 className="display text-[clamp(2.25rem,4vw,3.5rem)] leading-tight">{c.cta.title}</h2>
            <p className="mx-auto mt-6 max-w-xl font-sans text-lg font-light leading-relaxed text-[var(--color-warm-white)]/80">
              {c.cta.text}
            </p>
            <div className="mt-10">
              <Cta href={c.cta.href} tone="sand">{c.cta.label}</Cta>
            </div>
          </div>
        </section>

        {/* RELATED */}
        {related.length > 0 && (
          <section className="bg-[var(--color-card)] py-20 md:py-28">
            <div className="mx-auto max-w-[1440px] px-6 md:px-10">
              <div className="mb-12 flex items-end justify-between gap-6">
                <h2 className="display text-[clamp(2rem,3.5vw,3rem)] text-[var(--color-text-dark)]">{t.related}</h2>
                <Cta href="/blog" variant="ghost" tone="sea" className="px-0">{t.allPosts}</Cta>
              </div>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {related.map((p) => (
                  <PostCard key={p.slug} post={p} locale={locale} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <SiteFooter />
      <JsonLd
        data={[
          articleJsonLd,
          breadcrumbJsonLd([
            { name: t.home, path: "/" },
            { name: t.blog, path: "/blog" },
            { name: c.title, path: `/blog/${post.slug}` },
          ]),
          faqJsonLd(c.faqs),
        ]}
      />
    </>
  )
}

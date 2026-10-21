import type { Locale } from "@/lib/blog"

// Plain share links (no client JS). `url` must be absolute and already
// localized, so the shared preview opens in the reader's language.
export function ShareLinks({ url, title, locale }: { url: string; title: string; locale: Locale }) {
  const u = encodeURIComponent(url)
  const links = [
    { label: "WhatsApp", href: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}` },
    { label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${u}` },
    { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}` },
    { label: "X", href: `https://x.com/intent/post?url=${u}&text=${encodeURIComponent(title)}` },
  ]
  return (
    <div className="mt-14 flex flex-col gap-4 border-t border-[var(--color-border)] pt-10 sm:flex-row sm:items-center">
      <p className="eyebrow text-[var(--color-blue-gray)]">{locale === "es" ? "Compartir" : "Share"}</p>
      <ul className="flex flex-wrap gap-3">
        {links.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full border border-[var(--color-border)] px-5 py-2.5 font-sans text-[0.7rem] font-medium uppercase tracking-[0.16em] text-[var(--color-deep-sea)] transition-colors hover:border-[var(--color-sand)] hover:text-[var(--color-dark-sand)]"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

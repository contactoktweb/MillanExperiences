import Link from "next/link"
import Image from "next/image"
import { navItems, contact } from "@/lib/site-data"
import { Monogram } from "@/components/brand"

const groups = navItems.filter((n) => n.children)

export function SiteFooter() {
  return (
    <footer className="bg-[var(--color-deep-sea)] text-[var(--color-warm-white)]">
      <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-10 md:py-28">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link href="/" aria-label="Millan Experiences home" className="inline-block text-[var(--color-sand)]">
              <Image
                src="/logo/logo-large.png"
                alt="Millan Experiences"
                width={300}
                height={150}
                className="object-contain"
              />
            </Link>
            <p className="mt-8 max-w-sm font-serif text-2xl italic leading-snug text-[var(--color-warm-white)]/90">
              Seamless. From the first plan to the final detail.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <FooterSocial href={contact.instagram} label="Instagram">
                <InstagramIcon className="h-4 w-4" />
              </FooterSocial>
              <FooterSocial href={contact.facebook} label="Facebook">
                <FacebookIcon className="h-4 w-4" />
              </FooterSocial>
              <FooterSocial href={contact.linkedin} label="LinkedIn">
                <LinkedinIcon className="h-4 w-4" />
              </FooterSocial>
              <FooterSocial href={contact.tiktok} label="TikTok">
                <TikTokIcon className="h-4 w-4" />
              </FooterSocial>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-7">
            {groups.map((group) => (
              <div key={group.label}>
                <h3 className="font-sans text-[0.66rem] font-medium uppercase tracking-[0.2em] text-[var(--color-crystal-water)]">
                  {group.label}
                </h3>
                <ul className="mt-5 flex flex-col gap-3">
                  {group.children!.map((child) => (
                    <li key={child.href}>
                      <Link
                        href={child.href}
                        className="link-underline font-sans text-sm font-light text-[var(--color-warm-white)]/80 hover:text-[var(--color-sand)]"
                      >
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 border-t border-[color:var(--color-border-dark)] pt-10 sm:grid-cols-3">
          <div>
            <p className="font-sans text-[0.62rem] uppercase tracking-[0.2em] text-[var(--color-warm-white)]/50">
              Concierge
            </p>
            <a href={contact.phoneHref} className="link-underline mt-2 block font-sans text-sm">
              {contact.phone}
            </a>
            <a href={`mailto:${contact.email}`} className="link-underline mt-1 block font-sans text-sm">
              {contact.email}
            </a>
          </div>
          <div className="sm:text-center">
            <p className="font-sans text-[0.62rem] uppercase tracking-[0.2em] text-[var(--color-warm-white)]/50">
              Based in
            </p>
            <p className="mt-2 font-sans text-sm">Cartagena de Indias, Colombia</p>
          </div>
          <div className="flex items-start gap-2 sm:justify-end">
            <span className="font-sans text-xs tracking-[0.14em] text-[var(--color-sand)]">EN</span>
            <span className="text-[var(--color-warm-white)]/30">/</span>
            <span className="font-sans text-xs tracking-[0.14em] text-[var(--color-warm-white)]/50">ES</span>
          </div>
        </div>
      </div>

      <div className="border-t border-[color:var(--color-border-dark)]">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-6 px-6 py-8 md:flex-row md:justify-between md:px-10">
          <div className="flex flex-wrap items-center gap-6 font-sans text-xs font-light text-[var(--color-warm-white)]/60">
            <Link href="/privacy-policy" className="hover:text-[var(--color-sand)]">
              Privacy Policy
            </Link>
            <Link href="/terms-and-conditions" className="hover:text-[var(--color-sand)]">
              Terms &amp; Conditions
            </Link>
            <span>© {new Date().getFullYear()} Millan Experiences</span>
            <a
              href="https://www.kytcode.lat"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-[var(--color-sand)] transition-colors"
            >
              <span>Desarrollado por K&amp;T</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-3.5 w-3.5 fill-white text-white shrink-0"
              >
                <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001Z" />
              </svg>
            </a>
          </div>
          <Monogram className="h-7 w-7 text-[var(--color-sand)]" />
        </div>
      </div>
    </footer>
  )
}

function FooterSocial({
  href,
  label,
  children,
}: {
  href: string
  label: string
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center border border-[color:var(--color-border-dark)] font-sans text-xs font-medium tracking-wide text-[var(--color-warm-white)]/80 transition-colors hover:border-[var(--color-sand)] hover:text-[var(--color-sand)]"
    >
      {children}
    </a>
  )
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M9 12a4 4 0 1 0 4 4V2.05h3a2.5 2.5 0 0 0 2.5 2.5v3a5.5 5.5 0 0 1-5.5-5.5H9v11z" />
    </svg>
  )
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

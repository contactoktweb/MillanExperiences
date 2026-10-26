import { SiteHeaderClient } from "./site-header-client"
import { client } from "@/sanity/lib/client"
import { globalConfigQuery } from "@/sanity/lib/queries"
import { cookies } from "next/headers"
import { resolveHref } from "@/lib/redirects.mjs"

export async function SiteHeader({ forceSolid = false }: { forceSolid?: boolean }) {
  const globalConfig = await client.fetch(globalConfigQuery)
  const cookieStore = await cookies()
  const locale = cookieStore.get("NEXT_LOCALE")?.value === "es" ? "ES" : "EN"

  // The blog is not managed in the Sanity navigation yet: add it before "Contact".
  // Nav links come from Sanity: point legacy URLs straight at their destination.
  const navItems = (globalConfig?.mainNavigation || []).map((item: any) => ({
    ...item,
    href: resolveHref(item.href),
    cta: item.cta ? { ...item.cta, href: resolveHref(item.cta.href) } : item.cta,
    children: item.children?.map((child: any) => ({ ...child, href: resolveHref(child.href) })),
  }))
  if (!navItems.some((item: any) => item?.href === "/blog")) {
    const blogItem = { _key: "blog", labelEn: "Blog", labelEs: "Blog", href: "/blog" }
    const contactIndex = navItems.findIndex((item: any) => item?.href === "/contact")
    navItems.splice(contactIndex === -1 ? navItems.length : contactIndex, 0, blogItem)
  }

  return <SiteHeaderClient forceSolid={forceSolid} logoUrl={globalConfig?.logoUrl} initialLang={locale} navItems={navItems} />
}

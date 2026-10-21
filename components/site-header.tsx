import { SiteHeaderClient } from "./site-header-client"
import { client } from "@/sanity/lib/client"
import { globalConfigQuery } from "@/sanity/lib/queries"
import { cookies } from "next/headers"

export async function SiteHeader({ forceSolid = false }: { forceSolid?: boolean }) {
  const globalConfig = await client.fetch(globalConfigQuery)
  const cookieStore = await cookies()
  const locale = cookieStore.get("NEXT_LOCALE")?.value === "es" ? "ES" : "EN"

  // The blog is not managed in the Sanity navigation yet: add it before "Contact".
  const navItems = [...(globalConfig?.mainNavigation || [])]
  if (!navItems.some((item: any) => item?.href === "/blog")) {
    const blogItem = { _key: "blog", labelEn: "Blog", labelEs: "Blog", href: "/blog" }
    const contactIndex = navItems.findIndex((item: any) => item?.href === "/contact")
    navItems.splice(contactIndex === -1 ? navItems.length : contactIndex, 0, blogItem)
  }

  return <SiteHeaderClient forceSolid={forceSolid} logoUrl={globalConfig?.logoUrl} initialLang={locale} navItems={navItems} />
}

import { SiteHeaderClient } from "./site-header-client"
import { client } from "@/sanity/lib/client"
import { globalConfigQuery } from "@/sanity/lib/queries"
import { cookies } from "next/headers"

export async function SiteHeader({ forceSolid = false }: { forceSolid?: boolean }) {
  const globalConfig = await client.fetch(globalConfigQuery)
  const cookieStore = await cookies()
  const locale = cookieStore.get("NEXT_LOCALE")?.value === "es" ? "ES" : "EN"

  return <SiteHeaderClient forceSolid={forceSolid} logoUrl={globalConfig?.logoUrl} initialLang={locale} navItems={globalConfig?.mainNavigation || []} />
}

import { ContactSectionClient } from "./contact-section-client"
import { client } from "@/sanity/lib/client"
import { globalConfigQuery } from "@/sanity/lib/queries"
import { cookies } from "next/headers"

export async function ContactSection() {
  const globalConfig = await client.fetch(globalConfigQuery)
  const cookieStore = await cookies()
  const loc = cookieStore.get("NEXT_LOCALE")?.value === "es" ? "es" : "en"
  
  return <ContactSectionClient whatsappUrl={globalConfig?.whatsapp} locale={loc} />
}

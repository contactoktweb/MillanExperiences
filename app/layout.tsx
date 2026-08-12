import type { Metadata, Viewport } from "next"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import localFont from "next/font/local"
import { Jost } from "next/font/google"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { client } from "@/sanity/lib/client"
import { globalConfigQuery } from "@/sanity/lib/queries"

// Didot — primary serif typeface
const didot = localFont({
  src: [
    {
      path: "../public/fonts/didot-2/Didot.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/didot-2/Didot Italic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/didot-2/Didot Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-serif",
  display: "swap",
})

// Jost — secondary sans-serif typeface (Futura alternative with full Latin support)
const jost = Jost({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
})

export async function generateMetadata(): Promise<Metadata> {
  const globalConfig = await client.fetch(globalConfigQuery)
  
  return {
    metadataBase: new URL("https://www.millan-experiences.com"),
    title: {
      default: "Millan Experiences",
      template: "%s — Millan Experiences",
    },
    description:
      "Private stays, hand-picked boats and customized travel across Colombia — guided by refined local knowledge and personal attention from the first call to the last sunset.",
    keywords: [
      "luxury travel Colombia",
      "luxury concierge Cartagena",
      "private villas Cartagena",
      "private islands near Cartagena",
      "yachts Cartagena",
      "destination weddings Cartagena",
    ],
    openGraph: {
      type: "website",
      title: "Millan Experiences — Colombia, Designed for you",
      description:
        "A private concierge and privileged gateway to Colombia. Villas, islands, yachts and bespoke travel, handled end to end.",
      siteName: "Millan Experiences",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: "Millan Experiences — Colombia, Designed for you",
      description:
        "A private concierge and privileged gateway to Colombia. Handled, end to end.",
    },
    generator: "v0.app",
    icons: globalConfig?.faviconUrl ? {
      icon: globalConfig.faviconUrl,
      shortcut: globalConfig.faviconUrl,
      apple: globalConfig.faviconUrl,
    } : undefined,
  }
}

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#13272F",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const globalConfig = await client.fetch(globalConfigQuery)
  
  return (
    <html lang="en" className={`${didot.variable} ${jost.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        <WhatsAppButton whatsappUrl={globalConfig?.whatsapp} />
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}

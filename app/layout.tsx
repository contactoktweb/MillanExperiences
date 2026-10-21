import type { Metadata, Viewport } from "next"
import Script from "next/script"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import localFont from "next/font/local"
import { Jost } from "next/font/google"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { client } from "@/sanity/lib/client"
import { globalConfigQuery } from "@/sanity/lib/queries"
import { JsonLd } from "@/components/json-ld"
import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL, getLocale, organizationJsonLd, websiteJsonLd } from "@/lib/seo"

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
    metadataBase: new URL(SITE_URL),
    title: {
      default: SITE_NAME,
      template: "%s — Millan Experiences",
    },
    description:
      "Luxury concierge and destination management in Cartagena, Colombia: private villas, Rosario Islands escapes, yacht charters, private chefs, weddings and events — handled end to end.",
    applicationName: SITE_NAME,
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    category: "travel",
    keywords: [
      "luxury travel Colombia",
      "luxury concierge Cartagena",
      "private villas Cartagena",
      "Rosario Islands private island",
      "yacht charter Cartagena",
      "destination wedding Cartagena",
      "bachelor party Cartagena",
      "private chef Cartagena",
    ],
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      type: "website",
      title: "Millan Experiences — Colombia, Designed for you",
      description:
        "A private concierge and privileged gateway to Colombia. Villas, islands, yachts and bespoke travel, handled end to end.",
      siteName: SITE_NAME,
      locale: "en_US",
      images: [{ url: DEFAULT_OG_IMAGE, alt: "Private island in the Colombian Caribbean near Cartagena" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Millan Experiences — Colombia, Designed for you",
      description:
        "A private concierge and privileged gateway to Colombia. Handled, end to end.",
      images: [DEFAULT_OG_IMAGE],
    },
    formatDetection: { telephone: false },
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
  const locale = await getLocale()
  
  return (
    <html lang={locale} suppressHydrationWarning className={`${didot.variable} ${jost.variable} bg-background scroll-smooth`}>
      <body className="font-sans antialiased">
        {children}
        <JsonLd data={[organizationJsonLd, websiteJsonLd]} />
        <WhatsAppButton whatsappUrl={globalConfig?.whatsapp} />
        {process.env.NODE_ENV === "production" && <Analytics />}
        <Script
          id="wompi-checkout-sdk"
          src="https://checkout.wompi.co/widget.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}

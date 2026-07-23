import type { Metadata, Viewport } from "next"
import { Playfair_Display, Jost } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

// Playfair Display — a high-contrast Didone serif used as the web-licensed
// stand-in for the brand's primary typeface (Didot).
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
})

// Jost — a geometric sans used as the web-licensed stand-in for the brand's
// secondary typeface (Futura PT).
const jost = Jost({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600"],
})

export const metadata: Metadata = {
  metadataBase: new URL("https://www.millan-experiences.com"),
  title: {
    default: "Millan Experiences — Colombia, Designed for you",
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
}

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#13272F",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${jost.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}

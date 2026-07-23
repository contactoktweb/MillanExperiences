import type { Metadata, Viewport } from "next"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import localFont from "next/font/local"

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

// Futura PT — secondary sans-serif typeface
const futura = localFont({
  src: [
    {
      path: "../public/fonts/futura-pt/FuturaCyrillicLight.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/futura-pt/FuturaCyrillicBook.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/futura-pt/FuturaCyrillicMedium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/futura-pt/FuturaCyrillicDemi.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/futura-pt/FuturaCyrillicBold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-sans",
  display: "swap",
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
    <html lang="en" className={`${didot.variable} ${futura.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}

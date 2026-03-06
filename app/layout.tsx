import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "@/components/ui/sonner"
import { SiteProvider } from "@/contexts/site-context"
import { BookingProvider } from "@/contexts/booking-context"
import { AuthProvider } from "@/contexts/auth-context"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })
const _playfair = Playfair_Display({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "The Kerawi | Luxury 3-Star Hotel in Hawassa Ethiopia",
    template: "%s | The Kerawi",
  },
  description:
    "Experience unparalleled luxury at The Kerawi, a 3-star hotel in the heart of Hawassa Ethiopia. Exquisite rooms, world-class dining, and bespoke services await.",
  keywords: [
    "luxury hotel",
    "Hawassa Ethiopia hotel",
    "3-star hotel",
    "The Kerawi",
    "boutique hotel ",
    "luxury accommodation",
  ],
  icons: {
    icon: [
      { url: "/icon-light-32x32.png", media: "(prefers-color-scheme: light)" },
      { url: "/icon-dark-32x32.png", media: "(prefers-color-scheme: dark)" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
}

export const viewport: Viewport = {
  themeColor: "#b8860b",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <SiteProvider>
          <AuthProvider>
            <BookingProvider>
              <div className="flex min-h-screen flex-col">
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
              <Toaster />
            </BookingProvider>
          </AuthProvider>
        </SiteProvider>
        <Analytics />
      </body>
    </html>
  )
}

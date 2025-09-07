import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Source_Sans_3 as Source_Sans_Pro } from "next/font/google"
import { GeistMono } from "geist/font/mono"
import { Navigation } from "@/components/Navigation"
import { WalletProvider } from "@/components/WalletProvider"
import "./globals.css"

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
  display: "swap",
})

const sourceSansPro = Source_Sans_Pro({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-source-sans-pro",
  display: "swap",
})

export const metadata: Metadata = {
  title: "RealEstate Pro - Blockchain Real Estate Marketplace",
  description:
    "Revolutionary blockchain-based real estate marketplace with immersive property models and Aptos wallet integration",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`font-sans ${sourceSansPro.variable} ${playfairDisplay.variable} ${GeistMono.variable} antialiased`}
      >
        <WalletProvider>
          <Navigation />
          <main>{children}</main>
        </WalletProvider>
      </body>
    </html>
  )
}

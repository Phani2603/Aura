import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { RoomsProvider } from "@/lib/use-rooms"
import { DevicesProvider } from "@/lib/use-devices"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AURA - Smart Home Management",
  description: "Manage all your smart home devices in one place",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} dark bg-app-dark text-gray-100`}>
        <RoomsProvider>
          <DevicesProvider>
            {children}
            <Toaster />
          </DevicesProvider>
        </RoomsProvider>
      </body>
    </html>
  )
}



import './globals.css'
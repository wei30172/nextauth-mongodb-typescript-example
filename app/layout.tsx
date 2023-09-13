import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

import { AuthProvider } from "@/providers/auth-provider"
import { ThemeProvider } from "@/providers/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import Navbar from "@/components/shared/navbar"
import Footer from "@/components/shared/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Nextjs fullstack Authentication",
  description: "Sign-Up and Sign-In with Nextjs",
}

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({
  children,
}: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Navbar />
            <main className="min-h-screen flex flex-col justify-center items-center">
              {children}
            </main>
            <Footer />
            <Toaster />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

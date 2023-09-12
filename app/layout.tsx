import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { AuthProvider } from '@/providers/AuthProvider'
import { Toaster } from '@/components/ui/toaster'

import Navbar from '@/components/shared/Navbar'
import Footer from '@/components/shared/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Nextjs fullstack Authentication',
  description: 'Sign-Up and Sign-In with Nextjs',
}

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({
  children,
}: RootLayoutProps) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <AuthProvider>
          <Navbar />
          <main className='min-h-screen flex flex-col justify-center items-center'>
            {children}
          </main>
          <Footer />
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  )
}

import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import NextAuthProvider from '@/context/NextAuthProvider'
import Navbar from '@/components/shared/Navbar'
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Admin Auth',
  description: 'Admin Auth',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <main className='h-screen flex flex-col justify-center items-center'>
            <Navbar />
            {children}
          </main>
          <Toaster />
        </NextAuthProvider>
      </body>
    </html>
  )
}

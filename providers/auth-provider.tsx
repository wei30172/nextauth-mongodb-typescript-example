"use client";

import { SessionProvider } from "next-auth/react"

interface ProviderProps {
  children: React.ReactNode
}

export function AuthProvider({ children }: ProviderProps) {
  return <SessionProvider>{children}</SessionProvider>
}
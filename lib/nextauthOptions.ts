import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google'

export const nextauthOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    }),
  ],
  pages: {
    signIn: '/signin', // app/signin
  }
}
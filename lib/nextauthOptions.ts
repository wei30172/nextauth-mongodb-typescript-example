import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google'
import { signInWithOauth, getUserByEmail } from '@/lib/actions/auth.actions'

export const nextauthOptions: NextAuthOptions = {
  pages: {
    signIn: '/signin', // app/signin
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      // console.log({account, profile})
      if (account?.type === 'oauth' && profile) {
        return await signInWithOauth({account, profile})
      }
      return true
    },
    async jwt({ token, trigger, session }) {
      // console.log({token, trigger, session})
      if (trigger === 'update') {
        token.name = session.name
      } else {
        if (token.email) {
          const user = await getUserByEmail({email: token.email})
          // console.log({user})
          token._id = user._id
          token.role = user.role
          token.provider = user.provider
        }
      }
      return token
    },
    async session({ session, token }) {
      // console.log({session, token})
      return {
        ...session,
        user: {
          ...session.user,
          _id: token._id,
          role: token.role,
          provider: token.provider
        }
      }
    }
  }
}
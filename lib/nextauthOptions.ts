import { NextAuthOptions } from 'next-auth';

export const nextauthOptions: NextAuthOptions = {
  providers: [],
  pages: {
    signIn: '/signin', // app/signin
  }
}
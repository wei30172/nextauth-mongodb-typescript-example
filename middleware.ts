// export { default } from 'next-auth/middleware'
import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    // console.log(req.nextauth.token)
    console.log(req.nextUrl)
    const { token } = req.nextauth
    const { pathname } = req.nextUrl

    if (pathname.startsWith('/dashboard') && token?.role !== 'admin') {
      return new NextResponse('You Are Not Authorized!')
    }
  },
  {
    callbacks: {
      // If `authorized` returns `true`, the middleware function will execute.
      authorized: ({ token }) => !!token
    },
  }
)

export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*']
}
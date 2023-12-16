// export { default } from "next-auth/middleware"

// export const config = { matcher: ["/profile"] }

import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    // console.log(req.nextauth.token)
    // console.log(req.nextUrl)
    const { token } = req.nextauth
    const { pathname, origin } = req.nextUrl

    if (pathname.startsWith("/dashboard") && token?.role !== "admin") {
      return NextResponse.redirect(`${origin}/unauthorized`)
    }
  },
  {
    callbacks: {
      // If `authorized` returns `true`, the middleware function will execute.
      authorized: ({ token }) => !!token
    },
  }
)

export const config = { matcher: ["/profile", "/dashboard/:path*"] }
import { verifyAuth } from "@/lib/auth"
import { NextRequest, NextResponse } from "next/server"
import { withAuth } from "next-auth/middleware"

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    console.log(req.nextauth.token)
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    },
  }
)

// export async function middleware(req: NextRequest) {
//     const token = req.cookies.get('user-token')?.value

//     const verifiedToken = token && (
//         await verifyAuth(token).catch((err) => {
//             console.log(err)
//         })
//     )

//     if(req.nextUrl.pathname.startsWith('/login') && !verifiedToken) {
//         return
//     }

//     if(req.url.includes("/login") && verifiedToken) {
//         return NextResponse.redirect(new URL('/admin', req.url))
//     }

//     if(!verifiedToken) {
//         return NextResponse.redirect(new URL('/login', req.url))
//     }
// }

export const config = { matcher: ["/admin"] }
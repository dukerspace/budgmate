import { NextRequest, NextResponse } from 'next/server'
import { auth } from './auth'

export async function middleware(req: NextRequest) {
  const token = await auth()

  const { pathname } = req.nextUrl

  if (pathname.includes('/api/auth') || token) {
    return NextResponse.next()
  }

  if (!token && pathname !== '/auth/signin') {
    return NextResponse.redirect(new URL('/auth/signin', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/o/:path*',
    '/admin/:path*',
    '/settings/:path*',
    '/wallets/:path*'
  ]
}

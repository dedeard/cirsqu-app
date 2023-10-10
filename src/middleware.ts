import { NextResponse } from 'next/server'

export function middleware(request: Request) {
  const url = new URL(request.url)
  const origin = url.origin
  const pathname = url.pathname
  const requestHeaders = new Headers(request.headers)

  requestHeaders.set('x-url', request.url)
  requestHeaders.set('x-origin', origin)
  requestHeaders.set('x-pathname', pathname)

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}

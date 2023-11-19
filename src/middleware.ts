import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  const isPublicPath = path === '/login' || path === '/signup'

  const token = request.cookies.get('token')?.value || ''
  let isVerified = false;
  const value = JSON.parse(atob(request.cookies.get('token').value.split('.')[1]));
  if (token) {
    isVerified = value.isVerified || '';
  }

  if(token && !isVerified) {
    return NextResponse.redirect(new URL('/verify', request.nextUrl))
  }

  if(isPublicPath && token) {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl))
  }
    
}

 
export const config = {
  matcher: [
    '/',
    '/profile',
    '/login',
    '/signup',
    '/dashboard',
  ]
}
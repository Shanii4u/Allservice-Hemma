import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { locales, defaultLocale } from './i18n';

// List of public pages that don't require authentication
const publicPages = [
  '/auth/signin',
  '/auth/signup',
  '/',
  '/tjanster',
  '/om-oss',
  '/kontakt'
];

function isPublicPage(pathname: string): boolean {
  return publicPages.some(page => 
    pathname.endsWith(page) || 
    pathname === '/' || 
    pathname === '/sv' || 
    pathname === '/en'
  );
}

// Create and export the middleware
const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always'
});

export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Handle internationalization first
  const response = await intlMiddleware(request);

  // Skip auth check for public pages and API routes
  if (isPublicPage(pathname) || pathname.startsWith('/api/')) {
    return response;
  }

  // For protected pages, check authentication
  const token = request.cookies.get('next-auth.session-token');
  
  if (!token) {
    // Redirect to sign in page with callback URL
    const signInUrl = new URL(`/${defaultLocale}/auth/signin`, request.url);
    signInUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(signInUrl);
  }

  return response;
}

// Specify which paths should be handled by middleware
export const config = {
  matcher: [
    '/',
    '/(sv|en)/:path*',
    '/((?!_next|api|static|.*\\..*).*)' 
  ]
}; 
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { i18n } from './i18n';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // If the request is for the root, redirect to the default locale's website homepage.
  if (pathname === '/') {
    return NextResponse.redirect(new URL(`/${i18n.defaultLocale}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match only the root path. All other paths, including static files and API routes,
     * will be ignored by this middleware.
     */
    '/',
  ],
};

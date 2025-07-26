import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  
  // Redirect root to default locale with website prefix
  if (url.pathname === '/website/' || url.pathname === '/') {
    url.pathname = '/website/en';
    return NextResponse.redirect(url);
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

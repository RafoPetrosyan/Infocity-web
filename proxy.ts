import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import createMiddleware from 'next-intl/middleware';
import { LOCALES } from '@/constants';

// 1. Define your Route Arrays
const PROTECTED_ROUTES = ['/profile'];
const GUEST_ONLY_ROUTES = ['/login', '/register', '/forgot-password', '/verify-email'];

const intlMiddleware = createMiddleware({
  locales: LOCALES,
  defaultLocale: 'hy',
  localeDetection: true,
});

export default async function proxy(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // Helper to check if the current path matches any route in our arrays (with locale support)
  const isMatch = (routes: string[]) => {
    const localePrefix = `(/(${LOCALES.join('|')}))?`;
    // Creates a regex like: ^(/(en|hy|ru))?(/profile|/settings)(/.*)?$
    const regex = new RegExp(`^${localePrefix}(${routes.join('|')})(/.*)?$`, 'i');
    return regex.test(pathname);
  };

  // 2. Protect Private Routes
  if (isMatch(PROTECTED_ROUTES)) {
    if (!token) {
      // Redirect to login if no session exists
      const loginUrl = new URL('/login', req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 3. Redirect Logged-in Users away from Guest Routes
  if (isMatch(GUEST_ONLY_ROUTES)) {
    // @ts-ignore
    if (token && token.userData?.emotion_ids.length > 0 && token.userData.city_id) {
      // Redirect to home if they are already logged in
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  // 4. Internationalization
  return intlMiddleware(req);
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};

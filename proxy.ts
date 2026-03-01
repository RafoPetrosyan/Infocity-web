import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware';
import createMiddleware from 'next-intl/middleware';
import {Locales, LOCALES} from "@/app/constants";

const secret = process.env.NEXTAUTH_SECRET as string;

const handleLocaleMiddleware = async (req: NextRequest) => {
  const cookieLocale: Locales = (req.cookies.get('NEXT_LOCALE')?.value as Locales | undefined) || 'hy';

  // Extract locale from the URL (e.g., "/en/some-route" -> "en")
  const urlLocaleMatch = req.nextUrl.pathname.match(/^\/(en|hy|ru)/);
  const urlLocale: Locales | undefined = urlLocaleMatch ? (urlLocaleMatch[1] as Locales) : undefined;

  // If the locale in the cookie doesn't match the URL locale, redirect
  if (urlLocale && urlLocale !== cookieLocale) {
    const newUrl = new URL(req.nextUrl.origin);
    newUrl.pathname = `/${cookieLocale}${req.nextUrl.pathname.substring(3)}`;
    newUrl.search = req.nextUrl.search;
    return NextResponse.redirect(newUrl);
  }

  const token = await getToken({ req, secret });
  const pathname = req.nextUrl.pathname;

  if (/^\/(en|hy|ru)?\/?admin(\/|$)/.test(pathname)) {
    // @ts-ignore
    if (!token || token.userData?.role !== 'admin') {
      return NextResponse.redirect(new URL('/auth-admin/sign-in', req.url));
    }
  }

  if (/^\/(en|hy|ru)?\/?profile(\/|$)/.test(pathname)) {
    // @ts-ignore
    if (!token || token.userData?.role !== 'user') {
      return NextResponse.redirect(new URL('/auth/sign-in', req.url));
    }
  }

  // Check if the user is authenticated
  // const session = req.cookies.get('next-auth.session-token') || req.cookies.get('__Secure-next-auth.session-token');
  // Redirect authenticated users away from public pages to the profile
  // const excludePattern = `^(/(${LOCALES.join('|')}))?/profile/?.*?$`;
  // const isPublicPage = !new RegExp(excludePattern, 'i').test(req.nextUrl.pathname);

  // if (session && isPublicPage) {
  //   return NextResponse.redirect(new URL('/profile', req.url));
  // }

  // Middleware to handle internationalization
  const intlMiddleware = createMiddleware({
    locales: LOCALES,
    defaultLocale: cookieLocale,
    localeDetection: false,
  });

  return intlMiddleware(req);
};

const authMiddleware = withAuth(
  async function onSuccess(req: NextRequest) {
    return handleLocaleMiddleware(req);
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        return token != null;
      },
    },
    pages: {
      signIn: '/auth/sign-in',
    },
  }
);

export default function proxy(req: NextRequest) {
  const excludePattern = `^(/(${LOCALES.join('|')}))?/profile/?.*?$`;
  const isPublicPage = !new RegExp(excludePattern, 'i').test(req.nextUrl.pathname);

  if (isPublicPage) {
    return handleLocaleMiddleware(req);
  } else {
    return (authMiddleware as any)(req);
  }
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};

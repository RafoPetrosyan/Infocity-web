import { useEffect, useRef } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { useSession } from 'next-auth/react';
import { setCurrentUser } from '@/store/auth/reducer';
import httpClient from '@/lib/httpClient';
import type { User } from '@/store/auth/types';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { LANGUAGE_STORAGE_KEY } from '@/constants';

function needsCityOrEmotion(user: User, pathname: string): '/select-city' | '/select-emotion' | null {
  const onSelectCity = pathname.includes('select-city');
  const onSelectEmotion = pathname.includes('select-emotion');
  if (!user.city_id && !onSelectCity) return '/select-city';
  if ((!user.emotion_ids?.length) && !onSelectEmotion) return '/select-emotion';
  return null;
}

/**
 * Fetches current user from API once on first load, updates NextAuth session
 * and Redux. Runs only when user is authenticated.
 * Redirects to select-city or select-emotion if user has not completed onboarding.
 */
export function useFetchCurrentUser() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status, update } = useSession();
  const dispatch = useAppDispatch();
  const hasFetched = useRef(false);

  useEffect(() => {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, locale);
  }, [locale]);

  useEffect(() => {
    if (status !== 'authenticated' || !session?.user) return;
    if (hasFetched.current) return;

    (async () => {
      hasFetched.current = true;

      // @ts-ignore
      localStorage.setItem('accessToken', session.user.accessToken);
      // @ts-ignore
      localStorage.setItem('refreshToken', session.user.refreshToken);

      let user: User | null = null;

      try {
        const { data } = await httpClient.get<User>('/users/current-user');
        user = data;
        dispatch(setCurrentUser(data));
        await update({ userData: data });
      } catch {
        // Fallback to session data if API fails
        const fallback = (session.user as any).userData;
        if (fallback) {
          user = fallback;
          dispatch(setCurrentUser(fallback));
        }
      }

      if (user) {
        const redirectTo = needsCityOrEmotion(user, pathname);
        if (redirectTo) router.replace(redirectTo);
      }
    })();
  }, [status, session, update, dispatch, pathname, router]);
}

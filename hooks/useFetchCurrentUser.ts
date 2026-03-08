import { useEffect, useRef } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { useSession } from 'next-auth/react';
import { setCurrentUser } from '@/store/auth/reducer';
import httpClient from '@/lib/httpClient';
import type { User } from '@/store/auth/types';
import { useLocale } from 'next-intl';
import { LANGUAGE_STORAGE_KEY } from '@/constants';

/**
 * Fetches current user from API once on first load, updates NextAuth session
 * and Redux. Runs only when user is authenticated.
 */
export function useFetchCurrentUser() {
  const locale = useLocale();
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

      try {
        const { data } = await httpClient.get<User>('/users/current-user');
        dispatch(setCurrentUser(data));
        await update({ userData: data });
      } catch {
        // Fallback to session data if API fails
        const user = (session.user as any).userData;
        if (user) dispatch(setCurrentUser(user));
      }
    })();
  }, [status, session, update, dispatch]);
}

import { useEffect } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { useSession } from 'next-auth/react';
import { setCurrentUser } from '@/store/auth/reducer';

export function useFetchCurrentUser() {
  const { data: session } = useSession();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!session) return;

    (async () => {
      console.log(session, 'session');
      // @ts-ignore
      localStorage.setItem('accessToken', session.user.accessToken);
      // @ts-ignore
      localStorage.setItem('refreshToken', session.user.refreshToken);

      const user = {
        // @ts-ignore
        ...session.user.userData,
      };
      await dispatch(setCurrentUser(user));
    })();
  }, [session]);
}

'use client';

import React, { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
import { useFetchCurrentUser } from '@/hooks/useFetchCurrentUser';

interface SessionWrapperProps {
  children: ReactNode;
}

function CurrentUserSync() {
  useFetchCurrentUser();
  return null;
}

export const SessionWrapper: React.FC<SessionWrapperProps> = ({ children }) => {
  return (
    <SessionProvider>
      <CurrentUserSync />
      {children}
    </SessionProvider>
  );
};

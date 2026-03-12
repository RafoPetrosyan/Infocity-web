'use client';

import React, { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
import { ToastContainer } from 'react-toastify';
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
      <ToastContainer position="top-right" autoClose={4000} />
    </SessionProvider>
  );
};

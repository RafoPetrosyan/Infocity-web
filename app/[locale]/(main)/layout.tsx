'use client';

import React from 'react';
import { useFetchCurrentUser } from '@/hooks/useFetchCurrentUser';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps): React.JSX.Element {
  useFetchCurrentUser();
  return <>{children}</>;
}

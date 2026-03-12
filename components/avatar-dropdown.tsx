'use client';

import { useRef, useState, useEffect } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { isEmpty } from 'lodash';
import { Link } from '@/i18n/routing';
import { useAppSelector } from '@/store/hooks';
import type { User } from '@/store/auth/types';

const AvatarSvg = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path
      fillRule="evenodd"
      d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
      clipRule="evenodd"
    />
  </svg>
);

export function AvatarDropdown() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const { data: session } = useSession();

  // Fallback to session userData when Redux hasn't loaded yet
  const user = currentUser ?? (session?.user as { userData?: User })?.userData ?? null;
  const isUserEmpty = isEmpty(user);

  const displayName =
    !isUserEmpty && user ? `${user.first_name || ''} ${user.last_name || ''}`.trim() || user.email : '';

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  if (isUserEmpty) {
    return (
      <Link
        href="/login"
        className="rounded-full bg-[var(--color-primary)] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
      >
        Sign in
      </Link>
    );
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center cursor-pointer gap-2 rounded-full transition hover:ring-2 hover:ring-[var(--color-primary-soft)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-soft)]"
        aria-expanded={open}
        aria-haspopup="menu"
      >
        {user?.avatar ? (
          <img src={user.avatar} alt={displayName} className="h-11 w-11 rounded-full object-cover" />
        ) : (
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-pill)] text-[var(--color-muted)]">
            <AvatarSvg />
          </div>
        )}
      </button>

      {open && (
        <div
          className="absolute right-0 top-full z-30 mt-2 w-56 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] py-2 shadow-xl"
          role="menu"
        >
          <div className="border-b border-[var(--color-border)] px-4 py-3">
            <p className="truncate text-sm font-semibold text-[var(--color-ink)]">{displayName}</p>
            {user?.email && <p className="truncate text-xs text-[var(--color-muted)]">{user.email}</p>}
          </div>
          <div className="py-1">
            <Link
              href="/profile"
              onClick={() => setOpen(false)}
              className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-[var(--color-ink)] transition hover:bg-[var(--color-pill)]"
              role="menuitem"
            >
              <span>👤</span>
              Profile
            </Link>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                signOut({ callbackUrl: '/' });
              }}
              className="flex w-full cursor-pointer items-center gap-2 px-4 py-2 text-left text-sm text-red-600 transition hover:bg-red-50"
              role="menuitem"
            >
              <span>🚪</span>
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

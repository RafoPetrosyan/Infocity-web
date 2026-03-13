'use client';

import Image from 'next/image';
import { useLocale } from 'next-intl';
import { useCallback, useEffect, useRef, useState } from 'react';

import { routing, usePathname, useRouter } from '@/i18n/routing';

import amFlag from '@/assets/images/am.png';
import ruFlag from '@/assets/images/ru.png';
import usFlag from '@/assets/images/us.png';
import ChevronDownIcon from '@/assets/svg/ChevronDown.svg';

const LOCALE_FLAGS: Record<string, typeof amFlag> = {
  hy: amFlag,
  en: usFlag,
  ru: ruFlag,
};

const LOCALE_LABELS: Record<string, string> = {
  en: 'English',
  hy: 'Հայերեն',
  ru: 'Русский',
};

const LOCALE_ABBREV: Record<string, string> = {
  en: 'EN',
  hy: 'HY',
  ru: 'RU',
};

export default function LanguageSwitcher(): React.JSX.Element {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentFlag = LOCALE_FLAGS[locale] ?? amFlag;

  const handleSelect = useCallback(
    (entry: string) => {
      router.replace(pathname, { locale: entry });
      setIsOpen(false);
    },
    [router, pathname]
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex min-h-[44px] min-w-[44px] touch-manipulation cursor-pointer items-center gap-2 rounded-full border-2 border-white/30 bg-white/10 px-2 py-1.5 shadow-md ring-2 ring-white/20 transition hover:border-white/50 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2 focus:ring-offset-[var(--color-primary)]"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="flex h-8 w-8 shrink-0 overflow-hidden rounded-full">
          <Image
            src={currentFlag}
            alt={LOCALE_LABELS[locale] ?? locale}
            width={32}
            height={32}
            className="h-full w-full object-cover"
          />
        </span>
        <span className="text-sm font-semibold text-white">{LOCALE_ABBREV[locale] ?? locale.toUpperCase()}</span>
        <span
          className={`shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          style={{ filter: 'brightness(0) invert(1)' }}
        >
          <Image src={ChevronDownIcon} alt="" width={16} height={16} />
        </span>
      </button>

      {isOpen && (
        <ul
          role="listbox"
          className="absolute right-0 top-full z-50 mt-2 flex flex-col gap-1 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-1.5 shadow-xl"
        >
          {routing.locales.map((entry) => {
            const isActive = locale === entry;

            return (
              <li key={entry} role="option">
                <button
                  type="button"
                  onClick={() => handleSelect(entry)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 transition cursor-pointer ${
                    isActive ? 'bg-[var(--color-primary-soft)]' : 'hover:bg-[var(--color-page)]'
                  }`}
                  aria-selected={isActive}
                >
                  <span className="flex h-8 w-8 shrink-0 overflow-hidden rounded-full ring-1 ring-[var(--color-border)]">
                    <Image
                      src={LOCALE_FLAGS[entry]}
                      alt={LOCALE_LABELS[entry] ?? entry}
                      width={32}
                      height={32}
                      className="h-full w-full object-cover"
                    />
                  </span>
                  <span
                    className={`text-sm font-medium ${
                      isActive ? 'text-[var(--color-primary)]' : 'text-[var(--color-ink)]'
                    }`}
                  >
                    {LOCALE_LABELS[entry] ?? entry.toUpperCase()}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

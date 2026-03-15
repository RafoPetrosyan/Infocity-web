'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AvatarDropdown } from '@/components/avatar-dropdown';
import { EmotionIcon } from '@/components/emotion-icon';
import LanguageSwitcher from '@/components/language-switcher';
import type { Category, Emotion } from '@/store/global/types';

interface MainLayoutClientProps {
  categories: Category[];
  emotions: Emotion[];
  children: React.ReactNode;
}

export function MainLayoutClient({ categories, emotions, children }: MainLayoutClientProps): React.JSX.Element {
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [selectedEmotionIds, setSelectedEmotionIds] = useState<number[]>(
    () => (emotions[0]?.id != null ? [emotions[0].id] : []),
  );
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const emotionsScrollRef = useRef<HTMLDivElement>(null);

  const updateScrollArrows = useCallback(() => {
    const el = emotionsScrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 2);
  }, []);

  useEffect(() => {
    const el = emotionsScrollRef.current;
    if (!el) return;
    updateScrollArrows();
    const ro = new ResizeObserver(updateScrollArrows);
    ro.observe(el);
    el.addEventListener('scroll', updateScrollArrows);
    return () => {
      ro.disconnect();
      el.removeEventListener('scroll', updateScrollArrows);
    };
  }, [emotions.length, updateScrollArrows]);

  const clearCloseTimeout = () => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
      closeTimeout.current = null;
    }
  };

  const navItems = [
    { label: 'Home', slug: null, count: undefined, active: true, icon: '🏠', subCategories: [] as Category['sub_categories'] },
    ...categories.map((c) => ({
      label: c.name,
      slug: c.slug,
      count: c.places_count ? parseInt(c.places_count, 10) : undefined,
      active: false,
      icon: c.icon,
      subCategories: c.sub_categories ?? [],
    })),
  ];

  return (
    <div className="min-h-screen bg-[var(--color-page)] text-[var(--color-ink)]">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="flex flex-col gap-4 py-6 md:py-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm">
              <img src="/favicon.ico" alt="IMCITY logo" width={32} height={32} />
            </div>
            <div>
              <p className="text-sm text-[var(--color-muted)]">Location</p>
              <button type="button" className="cursor-pointer flex items-center gap-2 text-lg font-semibold">
                Yerevan
                <span className="text-[var(--color-muted)]">▼</span>
              </button>
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-3 md:flex-row md:items-center md:justify-end">
            <div className="relative w-full md:max-w-lg">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-muted)]">
                🔍
              </span>
              <input
                className="w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] py-3 pl-11 pr-4 text-sm shadow-sm outline-none transition focus:border-[var(--color-primary)]"
                placeholder="Search events, places, services..."
              />
            </div>
            <div className="flex items-center justify-between gap-2 md:justify-end">
              <div className="flex items-center gap-2">
                <LanguageSwitcher variant="header" />
                {['🤍', '🔔'].map((icon) => (
                  <button
                    key={icon}
                    type="button"
                    className="cursor-pointer flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-lg shadow-sm transition hover:-translate-y-0.5"
                  >
                    {icon}
                  </button>
                ))}
              </div>
              <AvatarDropdown />
            </div>
          </div>
        </header>

        <div className="flex gap-6 pb-12">
          {/* Sidebar Menu - Categories */}
          <aside className="w-full max-w-[260px] shrink-0 rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-lg">
            <div className="rounded-t-3xl bg-gradient-to-br from-[var(--color-primary-soft)]/60 to-[var(--color-surface)] px-6 py-5">
              <h2 className="text-lg font-semibold text-[var(--color-ink)]">Menu</h2>
              <p className="mt-0.5 text-sm text-[var(--color-muted)]">Explore categories</p>
            </div>
            <nav className="space-y-1 p-4 pt-2">
              {navItems.map((item) => {
                const hasSubmenu = Boolean(item.subCategories?.length);
                const isOpen = openSubmenu === item.label;
                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => {
                      if (!hasSubmenu) return;
                      clearCloseTimeout();
                      setOpenSubmenu(item.label);
                    }}
                    onMouseLeave={() => {
                      if (!hasSubmenu) return;
                      clearCloseTimeout();
                      closeTimeout.current = setTimeout(() => {
                        setOpenSubmenu(null);
                      }, 120);
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        if (!hasSubmenu) return;
                        setOpenSubmenu(isOpen ? null : item.label);
                      }}
                      className={`cursor-pointer flex w-full items-center justify-between rounded-2xl px-4 py-2.5 text-left text-sm transition ${
                        item.active
                          ? 'bg-[var(--color-primary-soft)] text-[var(--color-primary)]'
                          : 'text-[var(--color-ink)] hover:bg-[var(--color-pill)]'
                      }`}
                      aria-haspopup={hasSubmenu ? 'menu' : undefined}
                      aria-expanded={hasSubmenu ? isOpen : undefined}
                    >
                      <span className="flex items-center gap-2">
                        <span
                          className={`flex h-7 w-7 items-center justify-center rounded-xl text-sm ${
                            item.active
                              ? 'bg-[var(--color-primary-soft)] text-[var(--color-primary)]'
                              : 'bg-[var(--color-pill)] text-[var(--color-muted)]'
                          }`}
                        >
                          {item.icon}
                        </span>
                        {item.label}
                      </span>
                      <span className="flex items-center gap-2 text-xs text-[var(--color-muted)]">
                        {item.count !== undefined && !Number.isNaN(item.count) && <span>{item.count}</span>}
                        {hasSubmenu && <span>›</span>}
                      </span>
                    </button>

                    {hasSubmenu && isOpen && (
                      <div
                        className="absolute left-full top-0 z-20 ml-3 w-[260px] rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-3 shadow-xl"
                        onMouseEnter={clearCloseTimeout}
                        onMouseLeave={() => {
                          clearCloseTimeout();
                          closeTimeout.current = setTimeout(() => {
                            setOpenSubmenu(null);
                          }, 120);
                        }}
                      >
                        <ul className="space-y-1 text-sm">
                          {item.subCategories.map((subItem) => (
                            <li key={subItem.id}>
                              <button
                                type="button"
                                className="cursor-pointer flex w-full items-center justify-between rounded-2xl px-4 py-2 text-left text-[var(--color-ink)] hover:bg-[var(--color-pill)]"
                              >
                                <span className="flex items-center gap-2">
                                  <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-[var(--color-pill)] text-[var(--color-muted)]">
                                    {subItem.icon ?? '•'}
                                  </span>
                                  {subItem.name}
                                </span>
                                <span className="text-[var(--color-muted)]">›</span>
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
            <div className="space-y-1 border-t border-[var(--color-border)] p-4">
              <button
                type="button"
                className="cursor-pointer flex w-full items-center justify-between rounded-2xl px-4 py-2.5 text-left text-sm text-[var(--color-ink)] hover:bg-[var(--color-pill)]"
              >
                My business
                <span className="text-[var(--color-muted)]">›</span>
              </button>
              <button
                type="button"
                className="cursor-pointer flex w-full items-center justify-between rounded-2xl px-4 py-2.5 text-left text-sm text-[var(--color-ink)] hover:bg-[var(--color-pill)]"
              >
                Create page
                <span className="text-[var(--color-muted)]">›</span>
              </button>
            </div>
          </aside>

          {/* Main content */}
          <main className="w-full min-w-0 flex-1 space-y-6">
            {/* Emotions section */}
            <section className="flex items-center gap-2 rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-3 shadow-sm">
              <button
                type="button"
                onClick={() => {
                  emotionsScrollRef.current?.scrollBy({ left: -120, behavior: 'smooth' });
                }}
                disabled={!canScrollLeft}
                className="cursor-pointer flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-muted)] shadow-sm transition hover:bg-[var(--color-pill)] hover:text-[var(--color-ink)] disabled:opacity-40 disabled:pointer-events-none"
                aria-label="Scroll left"
              >
                ‹
              </button>
              <div
                ref={emotionsScrollRef}
                className="scrollbar-hidden flex flex-1 gap-2 overflow-x-auto overflow-y-hidden py-1 min-w-0"
              >
                {emotions.map((emotion) => {
                  const isSelected = selectedEmotionIds.includes(emotion.id);
                  return (
                    <button
                      key={emotion.id}
                      type="button"
                      onClick={() => {
                        setSelectedEmotionIds((prev) => {
                          const idx = prev.indexOf(emotion.id);
                          if (idx !== -1) {
                            return prev.filter((id) => id !== emotion.id);
                          }
                          if (prev.length < 3) {
                            return [...prev, emotion.id];
                          }
                          return [...prev.slice(0, -1), emotion.id];
                        });
                      }}
                      className={`cursor-pointer flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium transition ${
                        isSelected ? 'text-white' : 'bg-[var(--color-pill)] text-[var(--color-muted)] hover:text-[var(--color-ink)]'
                      }`}
                      style={isSelected ? { backgroundColor: emotion.color } : undefined}
                    >
                      <EmotionIcon emotion={emotion} selected={isSelected} size="sm" />
                      {emotion.name}
                    </button>
                  );
                })}
              </div>
              <button
                type="button"
                onClick={() => {
                  emotionsScrollRef.current?.scrollBy({ left: 120, behavior: 'smooth' });
                }}
                disabled={!canScrollRight}
                className="cursor-pointer flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-muted)] shadow-sm transition hover:bg-[var(--color-pill)] hover:text-[var(--color-ink)] disabled:opacity-40 disabled:pointer-events-none"
                aria-label="Scroll right"
              >
                ›
              </button>
            </section>

            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

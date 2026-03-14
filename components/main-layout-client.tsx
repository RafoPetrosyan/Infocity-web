'use client';

import React, { useRef, useState } from 'react';
import { AvatarDropdown } from '@/components/avatar-dropdown';
import { EmotionIcon } from '@/components/emotion-icon';
import type { Category, Emotion } from '@/store/global/types';

interface MainLayoutClientProps {
  categories: Category[];
  emotions: Emotion[];
  children: React.ReactNode;
}

export function MainLayoutClient({ categories, emotions, children }: MainLayoutClientProps): React.JSX.Element {
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [selectedEmotionId, setSelectedEmotionId] = useState<number | null>(emotions[0]?.id ?? null);
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

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
              <button className="flex items-center gap-2 text-lg font-semibold">
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
                {['📅', '🤍', '🔔'].map((icon) => (
                  <button
                    key={icon}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-lg shadow-sm transition hover:-translate-y-0.5"
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
          {/* Sidebar Menu */}
          <aside className="w-full max-w-[260px] shrink-0 rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-sm">
            <div className="mb-6">
              <h2 className="text-lg font-semibold">Menu</h2>
              <p className="text-sm text-[var(--color-muted)]">Explore categories</p>
            </div>
            <nav className="space-y-1">
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
                      className={`flex w-full items-center justify-between rounded-2xl px-4 py-2 text-left text-sm transition ${
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
                                className="flex w-full items-center justify-between rounded-2xl px-4 py-2 text-left text-[var(--color-ink)] hover:bg-[var(--color-pill)]"
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
            <div className="mt-6 space-y-2 border-t border-[var(--color-border)] pt-4">
              <button className="flex w-full items-center justify-between rounded-2xl px-4 py-2 text-left text-sm text-[var(--color-ink)] hover:bg-[var(--color-pill)]">
                My business
                <span className="text-[var(--color-muted)]">›</span>
              </button>
              <button className="flex w-full items-center justify-between rounded-2xl px-4 py-2 text-left text-sm text-[var(--color-ink)] hover:bg-[var(--color-pill)]">
                Create page
                <span className="text-[var(--color-muted)]">›</span>
              </button>
            </div>
          </aside>

          {/* Main content */}
          <main className="w-full min-w-0 flex-1 space-y-6">
            {/* Emotions section */}
            <section className="flex flex-wrap items-center gap-3 rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-sm">
              {emotions.map((emotion) => {
                const isSelected = selectedEmotionId === emotion.id;
                return (
                  <button
                    key={emotion.id}
                    type="button"
                    onClick={() => setSelectedEmotionId(emotion.id)}
                    className={`flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition ${
                      isSelected ? 'text-white' : 'bg-[var(--color-pill)] text-[var(--color-muted)] hover:text-[var(--color-ink)]'
                    }`}
                    style={isSelected ? { backgroundColor: emotion.color } : undefined}
                  >
                    <EmotionIcon emotion={emotion} selected={isSelected} />
                    {emotion.name}
                  </button>
                );
              })}
            </section>

            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

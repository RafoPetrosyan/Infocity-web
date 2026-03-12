'use client';

import React, { useRef, useState } from 'react';
import { AvatarDropdown } from '@/components/avatar-dropdown';

const navItems = [
  { label: 'Home', count: undefined, active: true, icon: '🏠' },
  { label: 'Attractions', count: 76, icon: '🎡' },
  { label: 'Hotels', count: 84, icon: '🏨' },
  { label: 'Eat', count: 112, icon: '🍽️' },
  { label: 'Tourism', count: 38, icon: '🧭' },
  { label: 'Vacation spots', count: 40, icon: '🌴' },
  { label: 'Entertainment', count: 50, icon: '🎭' },
  { label: 'Transport', count: 17, icon: '🚌' },
  { label: 'Refills', count: 22, icon: '⛽' },
  {
    label: 'Store',
    count: 171,
    icon: '🛍️',
    subItems: ['Supermarkets', 'Grocery', 'Coffee', 'Beer', 'Sweets', 'Shop', 'Hardware', 'Furniture', 'Electronics'],
  },
  {
    label: 'Services',
    count: 221,
    icon: '🧰',
    subItems: ['Cosmetics and perfumes', 'For baby', 'Jewelry and accessories', 'Flowers'],
  },
  { label: 'Production', count: 63, icon: '🏭' },
  { label: 'Medicine', count: 112, icon: '🩺' },
];

const chips = ['Calm', 'Drive', 'Romance', 'Work', 'Discovery', 'Fun', 'Respect'];

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps): React.JSX.Element {
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCloseTimeout = () => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
      closeTimeout.current = null;
    }
  };

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
                const hasSubmenu = Boolean(item.subItems?.length);
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
                        {item.count !== undefined && <span>{item.count}</span>}
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
                          {item.subItems?.map((subItem) => (
                            <li key={subItem}>
                              <button
                                type="button"
                                className="flex w-full items-center justify-between rounded-2xl px-4 py-2 text-left text-[var(--color-ink)] hover:bg-[var(--color-pill)]"
                              >
                                <span className="flex items-center gap-2">
                                  <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-[var(--color-pill)] text-[var(--color-muted)]">
                                    •
                                  </span>
                                  {subItem}
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
              {chips.map((chip, index) => (
                <button
                  key={chip}
                  className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition ${
                    index === 1
                      ? 'bg-[var(--color-pill-active)] text-[var(--color-accent)]'
                      : 'bg-[var(--color-pill)] text-[var(--color-muted)] hover:text-[var(--color-ink)]'
                  }`}
                >
                  {chip}
                </button>
              ))}
            </section>

            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';

export default function Home() {
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

  const compactCards = [
    { title: 'Scorpions / event fub', tag: "I'm going", attendees: 288 },
    { title: 'Open air brunch', tag: "I'm going", attendees: 96 },
    { title: 'City food market', tag: "I'm going", attendees: 154 },
  ];

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
        {/* Top Bar */}
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
              <div className="flex items-center gap-2">
                <div className="h-11 w-11 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)]" />
                <span className="hidden text-sm font-medium md:block">Sofia</span>
              </div>
            </div>
          </div>
        </header>

        <div className="flex gap-6 pb-12">
          {/* Sidebar */}
          <aside className="w-full max-w-[260px] rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-sm">
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
          <main className="w-full flex-1 space-y-6">
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

            <section className="grid gap-6 xl:grid-cols-[minmax(0,1.6fr),minmax(0,1fr)]">
              <article className="relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm">
                <div className="absolute left-6 top-6 z-10 flex gap-2 text-xs font-semibold text-white">
                  <span className="rounded-full bg-black/50 px-3 py-1">May 25 | 19:00</span>
                  <span className="rounded-full bg-black/50 px-3 py-1">2 day</span>
                </div>
                <button className="absolute right-6 top-6 z-10 rounded-full bg-black/40 px-2 py-1 text-xs text-white">
                  ♡
                </button>
                <div className="h-80 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500" />
                <div className="space-y-3 p-6">
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-[var(--color-primary)] px-3 py-1 text-xs font-semibold text-white">
                      I'm going
                    </span>
                    <span className="text-xs text-[var(--color-muted)]">288</span>
                  </div>
                  <h3 className="text-xl font-semibold">Scorpions / event fub</h3>
                  <p className="text-sm text-[var(--color-muted)]">
                    The band will be performing at the theater, seating is limited.
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {[...Array(4)].map((_, idx) => (
                        <div
                          key={idx}
                          className="h-7 w-7 rounded-full border-2 border-white bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)]"
                        />
                      ))}
                    </div>
                    <span className="text-xs text-[var(--color-muted)]">+24 friends</span>
                  </div>
                </div>
              </article>

              <div className="space-y-6">
                {compactCards.slice(0, 2).map((card, index) => (
                  <article
                    key={card.title}
                    className="overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm"
                  >
                    <div className="relative">
                      <div
                        className={`h-40 ${
                          index === 0
                            ? 'bg-gradient-to-br from-amber-400 via-orange-500 to-red-500'
                            : 'bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-500'
                        }`}
                      />
                      <div className="absolute left-4 top-4 flex gap-2 text-xs font-semibold text-white">
                        <span className="rounded-full bg-black/45 px-3 py-1">May 25 | 19:00</span>
                        <span className="rounded-full bg-black/45 px-3 py-1">2 day</span>
                      </div>
                      <button className="absolute right-4 top-4 rounded-full bg-black/40 px-2 py-1 text-xs text-white">
                        ♡
                      </button>
                    </div>
                    <div className="space-y-2 p-5">
                      <div className="flex items-center gap-2">
                        <span className="rounded-full bg-[var(--color-primary)] px-3 py-1 text-xs font-semibold text-white">
                          {card.tag}
                        </span>
                        <span className="text-xs text-[var(--color-muted)]">{card.attendees}</span>
                      </div>
                      <h3 className="text-lg font-semibold">{card.title}</h3>
                      <p className="text-sm text-[var(--color-muted)]">Discover the best local experiences.</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="grid gap-6 md:grid-cols-2">
              {compactCards.slice(0, 2).map((card, index) => (
                <article
                  key={`${card.title}-wide`}
                  className="overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm"
                >
                  <div className="relative">
                    <div
                      className={`h-44 ${
                        index === 0
                          ? 'bg-gradient-to-br from-fuchsia-400 via-pink-500 to-rose-500'
                          : 'bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-500'
                      }`}
                    />
                    <div className="absolute left-4 top-4 flex gap-2 text-xs font-semibold text-white">
                      <span className="rounded-full bg-black/45 px-3 py-1">May 25 | 19:00</span>
                      <span className="rounded-full bg-black/45 px-3 py-1">2 day</span>
                    </div>
                    <button className="absolute right-4 top-4 rounded-full bg-black/40 px-2 py-1 text-xs text-white">
                      ♡
                    </button>
                  </div>
                  <div className="space-y-2 p-5">
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-[var(--color-primary)] px-3 py-1 text-xs font-semibold text-white">
                        {card.tag}
                      </span>
                      <span className="text-xs text-[var(--color-muted)]">{card.attendees}</span>
                    </div>
                    <h4 className="text-base font-semibold">{card.title}</h4>
                    <p className="text-sm text-[var(--color-muted)]">Lorem ipsum dolor sit amet, consectetur.</p>
                  </div>
                </article>
              ))}
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}

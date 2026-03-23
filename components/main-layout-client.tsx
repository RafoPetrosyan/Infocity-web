'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from '@/i18n/routing';
import { AvatarDropdown } from '@/components/avatar-dropdown';
import { EmotionIcon } from '@/components/emotion-icon';
import LanguageSwitcher from '@/components/language-switcher';
import type { Category, Emotion } from '@/store/global/types';

interface MainLayoutClientProps {
  categories: Category[];
  emotions: Emotion[];
  children: React.ReactNode;
}

const BurgerIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <line x1="4" y1="6" x2="20" y2="6" />
    <line x1="4" y1="12" x2="20" y2="12" />
    <line x1="4" y1="18" x2="20" y2="18" />
  </svg>
);

const FilterIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const LocationIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export function MainLayoutClient({ categories, emotions, children }: MainLayoutClientProps): React.JSX.Element {
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [filtersExpanded, setFiltersExpanded] = useState(false);
  const [selectedEmotionIds, setSelectedEmotionIds] = useState<number[]>(
    () => (emotions[0]?.id != null ? [emotions[0].id] : []),
  );
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const emotionsScrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

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

  useEffect(() => {
    document.body.classList.toggle('menu-open', mobileMenuOpen);
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [mobileMenuOpen]);

  const clearCloseTimeout = () => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
      closeTimeout.current = null;
    }
  };

  const scheduleSubmenuClose = () => {
    clearCloseTimeout();
    closeTimeout.current = setTimeout(() => setOpenSubmenu(null), 120);
  };

  const handleNavItemEnter = (label: string, hasSubmenu: boolean) => {
    if (!hasSubmenu) return;
    clearCloseTimeout();
    setOpenSubmenu(label);
  };

  const handleNavItemLeave = (hasSubmenu: boolean) => {
    if (!hasSubmenu) return;
    scheduleSubmenuClose();
  };

  const handleNavItemClick = (label: string, hasSubmenu: boolean, isOpen: boolean) => {
    if (!hasSubmenu) return;
    setOpenSubmenu(isOpen ? null : label);
  };

  const scrollEmotionsLeft = () => {
    emotionsScrollRef.current?.scrollBy({ left: -120, behavior: 'smooth' });
  };

  const scrollEmotionsRight = () => {
    emotionsScrollRef.current?.scrollBy({ left: 120, behavior: 'smooth' });
  };

  const handleEmotionToggle = (emotionId: number) => {
    setSelectedEmotionIds((prev) => {
      const idx = prev.indexOf(emotionId);
      if (idx !== -1) {
        return prev.filter((id) => id !== emotionId);
      }
      if (prev.length < 3) {
        return [...prev, emotionId];
      }
      return [...prev.slice(0, -1), emotionId];
    });
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

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <div className="min-h-screen bg-[var(--color-page)] text-[var(--color-ink)]">
      {/* Mobile menu drawer - backdrop */}
      <div
        className="mobile-drawer-backdrop"
        data-state={mobileMenuOpen ? 'open' : 'closed'}
        onClick={closeMobileMenu}
        onKeyDown={(e) => e.key === 'Escape' && closeMobileMenu()}
        role="button"
        tabIndex={-1}
        aria-hidden
      />

      {/* Mobile menu drawer - panel */}
      <aside
        className="mobile-drawer-panel"
        data-state={mobileMenuOpen ? 'open' : 'closed'}
        aria-modal
        aria-label="Categories menu"
      >
        <div className="flex items-center justify-between border-b border-[var(--color-border)] px-4 py-4">
          <div>
            <h2 className="text-lg font-semibold text-[var(--color-ink)]">Menu</h2>
            <p className="text-xs text-[var(--color-muted)] mt-0.5">Explore categories</p>
          </div>
          <button
            type="button"
            onClick={closeMobileMenu}
            className="cursor-pointer flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-[var(--color-muted)] transition-colors hover:bg-[var(--color-pill)] hover:text-[var(--color-ink)] active:scale-95"
            aria-label="Close menu"
          >
            <CloseIcon />
          </button>
        </div>
        <div className="overflow-y-auto p-4">
          <nav className="space-y-1">
            {navItems.map((item) => {
              const hasSubmenu = Boolean(item.subCategories?.length);
              const isOpen = openSubmenu === item.label;
              return (
                <div key={item.label} className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      if (hasSubmenu) {
                        setOpenSubmenu(isOpen ? null : item.label);
                      } else {
                        closeMobileMenu();
                      }
                    }}
                    className={`cursor-pointer flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm transition ${
                      item.active
                        ? 'bg-[var(--color-primary-soft)] text-[var(--color-primary)]'
                        : 'text-[var(--color-ink)] hover:bg-[var(--color-pill)]'
                    }`}
                    aria-expanded={hasSubmenu ? isOpen : undefined}
                  >
                    <span className="flex items-center gap-3">
                      <span
                        className={`flex h-9 w-9 items-center justify-center rounded-xl text-base ${
                          item.active ? 'bg-[var(--color-primary-soft)]' : 'bg-[var(--color-pill)] text-[var(--color-muted)]'
                        }`}
                      >
                        {item.icon}
                      </span>
                      {item.label}
                    </span>
                    <span className="flex items-center gap-2 text-xs text-[var(--color-muted)]">
                      {item.count !== undefined && !Number.isNaN(item.count) && <span>{item.count}</span>}
                      {hasSubmenu && <span className={`transition-transform ${isOpen ? 'rotate-90' : ''}`}>›</span>}
                    </span>
                  </button>
                  {hasSubmenu && isOpen && (
                    <div className="ml-4 mt-2 space-y-1 border-l-2 border-[var(--color-pill)] pl-4">
                      {item.subCategories.map((subItem) => (
                        <button
                          key={subItem.id}
                          type="button"
                          onClick={closeMobileMenu}
                          className="cursor-pointer block w-full rounded-xl px-3 py-2 text-left text-sm text-[var(--color-ink)] hover:bg-[var(--color-pill)]"
                        >
                          {subItem.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
          <div className="mt-6 space-y-1 border-t border-[var(--color-border)] pt-4">
            <button
              type="button"
              onClick={closeMobileMenu}
              className="cursor-pointer flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm text-[var(--color-ink)] hover:bg-[var(--color-pill)]"
            >
              My business
              <span className="text-[var(--color-muted)]">›</span>
            </button>
            <button
              type="button"
              onClick={closeMobileMenu}
              className="cursor-pointer flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm text-[var(--color-ink)] hover:bg-[var(--color-pill)]"
            >
              Create page
              <span className="text-[var(--color-muted)]">›</span>
            </button>
          </div>
        </div>
      </aside>

      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="sticky top-0 z-30 flex flex-col gap-4 border-b border-transparent bg-[var(--color-page)] py-3 sm:py-6 md:py-8 max-lg:-mx-4 max-lg:border-[var(--color-border)] max-lg:px-4 max-lg:sm:-mx-6 max-lg:sm:px-6 lg:static lg:border-0 lg:bg-transparent lg:flex-row lg:items-center lg:justify-between">
          {/* Desktop: Logo + Location (left) | Search (center, wide) | actions (right) */}
          <div className="hidden lg:flex min-w-0 flex-1 items-center gap-6">
            <div className="flex shrink-0 items-center gap-3">
              <Link href="/" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
                <img src="/favicon.ico" alt="IMCITY logo" width={32} height={32} />
              </Link>
              <div>
                <p className="text-sm text-[var(--color-muted)]">Location</p>
                <button type="button" className="cursor-pointer flex items-center gap-2 text-lg font-semibold hover:opacity-80 transition-opacity">
                  Yerevan
                  <span className="text-[var(--color-muted)] text-sm">▼</span>
                </button>
              </div>
            </div>
            <div className="relative flex-1 max-w-3xl min-w-0 mx-auto">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-muted)]">
                🔍
              </span>
              <input
                className="w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] py-3 pl-11 pr-4 text-sm shadow-sm outline-none transition focus:border-[var(--color-primary)]"
                placeholder="Search events, places, services..."
              />
            </div>
            <div className="flex shrink-0 items-center gap-2">
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
                <AvatarDropdown />
            </div>
          </div>

          {/* Mobile: Logo (left) | Sign in + Menu (right) */}
          <div className="flex min-w-0 items-center justify-between gap-4 lg:hidden">
            <Link href="/" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
              <img src="/favicon.ico" alt="IMCITY logo" width={32} height={32} />
            </Link>
            <div className="flex min-w-0 shrink items-center gap-2">
              <LanguageSwitcher variant="header" />
              {['🤍', '🔔'].map((icon) => (
                <button
                  key={icon}
                  type="button"
                  className="cursor-pointer hidden sm:flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-lg shadow-sm transition hover:bg-[var(--color-pill)]"
                >
                  {icon}
                </button>
              ))}
              <AvatarDropdown />
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="cursor-pointer flex h-10 w-10 items-center justify-center rounded-xl text-[var(--color-ink)] transition-colors hover:bg-[var(--color-pill)] active:scale-95"
                aria-label="Open menu"
              >
                <BurgerIcon />
              </button>
            </div>
          </div>

          {/* Mobile: Search bar - below top row */}
          <div className="relative w-full lg:hidden">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-muted)]">
              🔍
            </span>
            <input
              className="w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] py-3 pl-11 pr-4 text-sm shadow-sm outline-none transition focus:border-[var(--color-primary)]"
              placeholder="Search events, places, services..."
            />
          </div>
        </header>

        <div className="flex flex-col gap-4 pb-12 lg:flex-row lg:gap-6">
          {/* Sidebar Menu - Categories (desktop only; mobile uses drawer) */}
          <aside className="hidden w-full shrink-0 lg:block lg:max-w-[260px] rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-lg">
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
                    onMouseEnter={() => handleNavItemEnter(item.label, hasSubmenu)}
                    onMouseLeave={() => handleNavItemLeave(hasSubmenu)}
                  >
                    <button
                      type="button"
                      onClick={() => handleNavItemClick(item.label, hasSubmenu, isOpen)}
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
                        className="relative z-20 mt-2 w-full rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-3 shadow-xl lg:absolute lg:left-full lg:top-0 lg:mt-0 lg:ml-3 lg:w-[260px]"
                        onMouseEnter={clearCloseTimeout}
                        onMouseLeave={scheduleSubmenuClose}
                      >
                        <ul className="space-y-1 text-sm">
                          {item.subCategories.map((subItem) => (
                            <li key={subItem.id}>
                              <button
                                type="button"
                                className="cursor-pointer flex w-full items-center rounded-2xl px-4 py-2 text-left text-sm text-[var(--color-ink)] hover:bg-[var(--color-pill)]"
                              >
                                {subItem.name}
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
          <main className="min-w-0 flex-1 space-y-4 lg:space-y-6">
            {/* Desktop: Original emotions section - horizontal scroll with arrows */}
            <section className="hidden lg:flex items-center gap-2 rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-3 shadow-sm">
              <button
                type="button"
                onClick={scrollEmotionsLeft}
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
                      onClick={() => handleEmotionToggle(emotion.id)}
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
                onClick={scrollEmotionsRight}
                disabled={!canScrollRight}
                className="cursor-pointer flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-muted)] shadow-sm transition hover:bg-[var(--color-pill)] hover:text-[var(--color-ink)] disabled:opacity-40 disabled:pointer-events-none"
                aria-label="Scroll right"
              >
                ›
              </button>
            </section>

            {/* Mobile: Filter button - expands to show location + emotions */}
            <section className="space-y-3 lg:hidden">
              <button
                type="button"
                onClick={() => setFiltersExpanded((v) => !v)}
                className={`cursor-pointer flex w-fit items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all ${
                  filtersExpanded
                    ? 'border-[var(--color-primary)] bg-[var(--color-primary-soft)] text-[var(--color-primary)]'
                    : 'border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-ink)] hover:border-[var(--color-primary)]/50 shadow-sm'
                }`}
                aria-expanded={filtersExpanded}
                aria-label={filtersExpanded ? 'Close filters' : 'Open filters'}
              >
                <FilterIcon />
                <span>Filters</span>
                <span className={`ml-1 text-xs transition-transform ${filtersExpanded ? 'rotate-180' : ''}`}>▼</span>
              </button>

              {filtersExpanded && (
                <div className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm">
                  <div className="border-b border-[var(--color-border)] px-4 py-3">
                    <p className="text-xs font-medium text-[var(--color-muted)] mb-2">Location</p>
                    <button
                      type="button"
                      className="cursor-pointer flex items-center gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-pill)] px-3 py-2 text-sm font-medium text-[var(--color-ink)] transition hover:border-[var(--color-primary)]/50"
                    >
                      <LocationIcon />
                      <span>Yerevan</span>
                      <span className="text-[var(--color-muted)] text-xs">▼</span>
                    </button>
                  </div>
                  <div className="p-4">
                    <p className="text-xs font-medium text-[var(--color-muted)] mb-3">Mood / Emotion</p>
                    <div className="flex flex-wrap gap-2">
                      {emotions.map((emotion) => {
                        const isSelected = selectedEmotionIds.includes(emotion.id);
                        return (
                          <button
                            key={emotion.id}
                            type="button"
                            onClick={() => handleEmotionToggle(emotion.id)}
                            className={`cursor-pointer flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
                              isSelected
                                ? 'text-white shadow-md'
                                : 'bg-[var(--color-pill)] text-[var(--color-muted)] hover:bg-[var(--color-pill)]/80 hover:text-[var(--color-ink)]'
                            }`}
                            style={isSelected ? { backgroundColor: emotion.color } : undefined}
                          >
                            <EmotionIcon emotion={emotion} selected={isSelected} size="sm" />
                            {emotion.name}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </section>

            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

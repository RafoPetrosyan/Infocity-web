"use client";

import { useLocale } from "next-intl";

import { routing, usePathname, useRouter } from "@/i18n/routing";

const LOCALE_LABELS: Record<string, string> = {
  en: "EN",
  hy: "HY",
};

export default function LanguageSwitcher(): React.JSX.Element {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-2">
      {routing.locales.map((entry) => {
        const label = LOCALE_LABELS[entry] ?? entry.toUpperCase();
        const isActive = locale === entry;

        return (
          <button
            key={entry}
            type="button"
            onClick={() => router.replace(pathname, { locale: entry })}
            className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
              isActive
                ? "border-[var(--color-primary)] bg-[var(--color-primary-soft)] text-[var(--color-primary)]"
                : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-muted)] hover:text-[var(--color-ink)]"
            }`}
            aria-pressed={isActive}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

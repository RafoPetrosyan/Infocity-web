'use client';

import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { useCallback, useMemo, useState } from 'react';
import { useRouter } from '@/i18n/routing';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CITIES, type City } from '@/lib/cities';

type LocaleKey = 'en' | 'hy' | 'ru';

export default function SelectCityPage() {
  const t = useTranslations('Auth');
  const router = useRouter();
  const locale = useLocale() as LocaleKey;
  const [search, setSearch] = useState('');
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [loading, setLoading] = useState(false);

  const filteredCities = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return CITIES;
    return CITIES.filter(
      (city) =>
        city.name.en.toLowerCase().includes(q) ||
        city.name.hy.toLowerCase().includes(q) ||
        city.name.ru.toLowerCase().includes(q)
    );
  }, [search]);

  const handleSelect = useCallback((city: City) => {
    setSelectedCity((prev) => (prev?.id === city.id ? null : city));
  }, []);

  const onSubmit = async () => {
    if (!selectedCity) return;
    setLoading(true);
    try {
      // TODO: persist city_id to user profile / session
      // For now, redirect to main
      router.replace('/');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-muted)]">{t('brand')}</p>
        <h1 className="mt-3 text-2xl font-semibold">{t('selectCityTitle')}</h1>
        <p className="mt-2 text-sm text-[var(--color-muted)]">{t('selectCitySubtitle')}</p>
      </div>

      <div className="mt-8 space-y-4">
        <Input
          id="city-search"
          label={t('searchCityLabel')}
          type="text"
          placeholder={t('searchCityPlaceholder')}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          autoComplete="off"
        />

        <div className="relative">
          <span className="text-sm font-medium">{t('selectCityLabel')}</span>
          <div className="mt-2 max-h-[240px] overflow-y-auto rounded-2xl border border-[var(--color-border)] bg-white">
            {filteredCities.length === 0 ? (
              <p className="py-8 text-center text-sm text-[var(--color-muted)]">{t('noCitiesFound')}</p>
            ) : (
              <ul role="listbox" aria-label={t('selectCityLabel')} className="divide-y divide-[var(--color-border)]">
                {filteredCities.map((city) => {
                  const isSelected = selectedCity?.id === city.id;
                  return (
                    <li key={city.id} role="option" aria-selected={isSelected}>
                      <button
                        type="button"
                        onClick={() => handleSelect(city)}
                        className={`flex w-full items-center gap-3 px-4 py-3 text-left text-sm transition hover:bg-[var(--color-page)] cursor-pointer ${
                          isSelected ? 'bg-[var(--color-primary-soft)] font-medium text-[var(--color-primary)]' : ''
                        }`}
                      >
                        <span
                          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition ${
                            isSelected
                              ? 'border-[var(--color-primary)] bg-[var(--color-primary)]'
                              : 'border-[var(--color-border)]'
                          }`}
                        >
                          {isSelected && (
                            <svg className="h-2.5 w-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </span>
                        <span>{city.name[locale] ?? city.name.en}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>

        <Button type="button" className="w-full" disabled={!selectedCity} loading={loading} onClick={onSubmit}>
          {t('continueButton')}
        </Button>
      </div>
    </>
  );
}

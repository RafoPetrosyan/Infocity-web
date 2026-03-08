'use client';

import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { useCallback, useState } from 'react';
import { useRouter } from '@/i18n/routing';

import { Button } from '@/components/ui/button';
import { EMOTIONS, EmotionIcon, type Emotion } from '@/lib/emotions';

type LocaleKey = 'en' | 'hy' | 'ru';

export default function SelectEmotionPage() {
  const t = useTranslations('Auth');
  const router = useRouter();
  const locale = useLocale() as LocaleKey;
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(false);

  const handleToggle = useCallback((emotion: Emotion) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(emotion.id)) {
        next.delete(emotion.id);
      } else {
        next.add(emotion.id);
      }
      return next;
    });
  }, []);

  const onSubmit = async () => {
    if (selectedIds.size === 0) return;
    setLoading(true);
    try {
      // TODO: persist emotion_ids to user profile / session
      router.replace('/');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-muted)]">{t('brand')}</p>
        <h1 className="mt-3 text-2xl font-semibold">{t('selectEmotionTitle')}</h1>
        <p className="mt-2 text-sm text-[var(--color-muted)]">{t('selectEmotionSubtitle')}</p>
      </div>

      <div className="mt-8 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          {EMOTIONS.map((emotion) => {
            const isSelected = selectedIds.has(emotion.id);
            return (
              <button
                key={emotion.id}
                type="button"
                onClick={() => handleToggle(emotion)}
                className={`flex min-h-[56px] w-full items-center gap-3 rounded-2xl border-2 px-4 py-3 text-left transition cursor-pointer ${
                  isSelected
                    ? 'border-transparent'
                    : 'border-[var(--color-border)] bg-white hover:border-[var(--color-border)]/80'
                }`}
                style={isSelected ? { backgroundColor: emotion.color } : undefined}
              >
                <EmotionIcon emotion={emotion} selected={isSelected} />
                <span className={`text-sm font-medium ${isSelected ? 'text-white' : 'text-[var(--color-muted)]'}`}>
                  {emotion.label[locale] ?? emotion.label.en}
                </span>
              </button>
            );
          })}
        </div>

        <Button type="button" className="w-full" disabled={selectedIds.size === 0} loading={loading} onClick={onSubmit}>
          {t('continueButton')}
        </Button>
      </div>
    </>
  );
}

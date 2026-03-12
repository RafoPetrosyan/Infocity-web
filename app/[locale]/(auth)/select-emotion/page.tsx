'use client';

import { useTranslations } from 'next-intl';
import { useCallback, useState } from 'react';
import { useRouter } from '@/i18n/routing';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';

import { EmotionIcon } from '@/components/emotion-icon';
import { Button } from '@/components/ui/button';
import { useGetEmotionsQuery } from '@/store/global';
import { useUpdateProfileMutation } from '@/store/auth';
import type { Emotion } from '@/store/global/types';

export default function SelectEmotionPage() {
  const t = useTranslations('Auth');
  const router = useRouter();
  const { update } = useSession();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  const { data: emotions = [], isLoading: isLoadingEmotions } = useGetEmotionsQuery();
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  const handleToggle = useCallback(
    (emotion: Emotion) => {
      setSelectedIds((prev) => {
        const next = new Set(prev);
        if (next.has(emotion.id)) {
          next.delete(emotion.id);
        } else if (next.size < 3) {
          next.add(emotion.id);
        }
        return next;
      });
    },
    []
  );

  const onSubmit = useCallback(async () => {
    if (selectedIds.size === 0) return;
    try {
      const emotionIds = Array.from(selectedIds);
      const result = await updateProfile({ emotion_ids: String(emotionIds) }).unwrap();
      if (result.user) {
        await update({ userData: result.user });
      }
      router.replace('/');
    } catch (e: unknown) {
      const err = e as { data?: { message?: string } };
      toast.error(err.data?.message || t('updateProfileError') || 'Failed to save. Please try again.');
    }
  }, [selectedIds, updateProfile, update, router, t]);

  return (
    <>
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-muted)]">{t('brand')}</p>
        <h1 className="mt-3 text-2xl font-semibold">{t('selectEmotionTitle')}</h1>
        <p className="mt-2 text-sm text-[var(--color-muted)]">{t('selectEmotionSubtitle')}</p>
      </div>

      <div className="mt-8 space-y-4">
        <p className="text-center text-xs text-[var(--color-muted)]">
          {selectedIds.size}/3 {t('selectEmotionSelected')}
        </p>
        <div className="grid grid-cols-2 gap-3">
          {isLoadingEmotions ? (
            <p className="col-span-2 py-8 text-center text-sm text-[var(--color-muted)]">{t('loading')}</p>
          ) : (
            emotions.map((emotion) => {
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
                    {emotion.name}
                  </span>
                </button>
              );
            })
          )}
        </div>

        <Button
          type="button"
          className="w-full"
          disabled={selectedIds.size === 0 || isLoadingEmotions}
          loading={isUpdating}
          onClick={onSubmit}
        >
          {t('continueButton')}
        </Button>
      </div>
    </>
  );
}

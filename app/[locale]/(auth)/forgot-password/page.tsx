'use client';

import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from '@/i18n/routing';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ForgotPasswordValues = {
  email: string;
};

export default function ForgotPasswordPage() {
  const t = useTranslations('Auth');
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordValues>({
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = (data: ForgotPasswordValues) => {
    void data;
  };

  return (
    <>
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-muted)]">{t('brand')}</p>
        <h1 className="mt-3 text-2xl font-semibold">{t('forgotTitle')}</h1>
        <p className="mt-2 text-sm text-[var(--color-muted)]">{t('forgotSubtitle')}</p>
      </div>

      <form className="mt-8 space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <Input
          id="forgot-email"
          label={t('emailLabel')}
          type="email"
          placeholder={t('emailPlaceholder')}
          error={errors.email?.message}
          {...register('email', {
            required: t('validationRequired'),
            pattern: {
              value: emailPattern,
              message: t('validationEmail'),
            },
          })}
        />
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {t('sendResetLink')}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-[var(--color-muted)]">
        {t('rememberedPassword')}{' '}
        <Link href="/login" className="font-semibold text-[var(--color-primary)] transition hover:opacity-80">
          {t('backToSignIn')}
        </Link>
      </p>
    </>
  );
}

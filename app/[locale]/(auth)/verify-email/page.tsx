'use client';

import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { toast } from 'react-toastify';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from '@/i18n/routing';
import { useResendEmailCodeMutation, useVerifyEmailMutation } from '@/store/auth';
import { EMAIL_VERIFICATION_RESEND_COOLDOWN_KEY } from '@/constants';

const RESEND_COOLDOWN_SECONDS = 60;

function getRemainingCooldownSeconds(): number {
  if (typeof window === 'undefined') return 0;
  try {
    const stored = sessionStorage.getItem(EMAIL_VERIFICATION_RESEND_COOLDOWN_KEY);
    if (!stored) return 0;
    const endTime = parseInt(stored, 10);
    const remaining = Math.ceil((endTime - Date.now()) / 1000);
    return Math.max(0, remaining);
  } catch {
    return 0;
  }
}

function setCooldownInStorage(): void {
  if (typeof window === 'undefined') return;
  try {
    const endTime = Date.now() + RESEND_COOLDOWN_SECONDS * 1000;
    sessionStorage.setItem(EMAIL_VERIFICATION_RESEND_COOLDOWN_KEY, String(endTime));
  } catch {
    // ignore
  }
}

type VerifyEmailValues = {
  code: string;
};

export default function VerifyEmailPage() {
  const t = useTranslations('Auth');
  const router = useRouter();
  const searchParams = useSearchParams();
  const verificationToken = searchParams.get('token');

  const { update } = useSession();
  const [verifyEmail, { isLoading: isVerifying }] = useVerifyEmailMutation();
  const [resendEmailCode, { isLoading: isResending }] = useResendEmailCodeMutation();
  const [cooldownSeconds, setCooldownSeconds] = useState(() => getRemainingCooldownSeconds());

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<VerifyEmailValues>({
    defaultValues: {
      code: '',
    },
  });

  useEffect(() => {
    if (cooldownSeconds <= 0) return;
    const timer = setInterval(() => {
      const remaining = getRemainingCooldownSeconds();
      setCooldownSeconds(remaining);
      if (remaining <= 0) clearInterval(timer);
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldownSeconds]);

  const onSubmit = useCallback(
    async (data: VerifyEmailValues) => {
      if (!verificationToken) {
        toast.error(t('verifyTokenMissing') || 'Verification token is missing. Please restart the verification process.');
        return;
      }
      try {
        const result = await verifyEmail({ token: verificationToken, code: data.code }).unwrap();
        toast.success(t('verifySuccess') || 'Email verified successfully!');

        const signInResult = await signIn('credentials', {
          mode: 'verify',
          redirect: false,
          accessToken: result.access_token,
          refreshToken: result.refresh_token,
        });

        if (signInResult?.ok) {
          await update({ userData: result.user });
          router.push('/');
        } else {
          toast.error(signInResult?.error || t('verifyError'));
          router.push('/login');
        }
      } catch (e: unknown) {
        const err = e as { data?: { message?: string } };
        const message = err.data?.message;
        toast.error(message || t('verifyError') || 'Verification failed. Please try again.');
      }
    },
    [verificationToken, verifyEmail, update, router, t]
  );

  const handleResend = useCallback(async () => {
    if (!verificationToken) return;
    if (cooldownSeconds > 0) return;
    try {
      await resendEmailCode({ token: verificationToken }).unwrap();
      setCooldownInStorage();
      setCooldownSeconds(RESEND_COOLDOWN_SECONDS);
      toast.success(t('resendSuccess') || 'Verification code sent. Please check your email.');
    } catch (e: unknown) {
      const err = e as { data?: { message?: string } };
      const message = err.data?.message;
      toast.error(message || t('resendError') || 'Failed to resend code. Please try again.');
    }
  }, [verificationToken, resendEmailCode, cooldownSeconds, t]);

  const isResendDisabled = !verificationToken || cooldownSeconds > 0 || isResending;

  return (
    <>
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-muted)] sm:tracking-[0.3em]">{t('brand')}</p>
        <h1 className="mt-3 text-xl font-semibold sm:text-2xl">{t('verifyTitle')}</h1>
        <p className="mt-2 text-sm text-[var(--color-muted)]">{t('verifySubtitle')}</p>
      </div>

      <form className="mt-6 space-y-4 sm:mt-8" onSubmit={handleSubmit(onSubmit)}>
        <Input
          id="verify-code"
          label={t('verificationCodeLabel')}
          type="text"
          inputMode="numeric"
          placeholder={t('verificationCodePlaceholder')}
          error={errors.code?.message}
          inputClassName="text-center text-lg tracking-[0.4em]"
          maxLength={6}
          {...register('code', {
            required: t('validationRequired'),
            pattern: {
              value: /^\d{6}$/,
              message: t('validationCodeLength'),
            },
          })}
        />
        <Button type="submit" className="w-full" disabled={isSubmitting || !verificationToken} loading={isVerifying}>
          {t('verifyEmailButton')}
        </Button>
      </form>

      <div className="mt-6 text-center text-sm text-[var(--color-muted)] sm:text-base">
        {t('didntReceiveCode')}{' '}
        <button
          type="button"
          onClick={handleResend}
          disabled={isResendDisabled}
          className="font-semibold text-[var(--color-primary)] transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isResending ? t('resending') || 'Sending...' : cooldownSeconds > 0 ? `${t('resend')} (${cooldownSeconds}s)` : t('resend')}
        </button>
      </div>
    </>
  );
}

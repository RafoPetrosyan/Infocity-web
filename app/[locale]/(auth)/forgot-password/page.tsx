'use client';

import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from '@/i18n/routing';
import { useRouter } from '@/i18n/routing';
import { useForgotPasswordMutation, useVerifyForgotPasswordCodeMutation, useResetPasswordMutation } from '@/store/auth';
import { FORGOT_PASSWORD_RESEND_COOLDOWN_KEY } from '@/constants';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RESEND_COOLDOWN_SECONDS = 60;

function getRemainingCooldownSeconds(): number {
  if (typeof window === 'undefined') return 0;
  try {
    const stored = sessionStorage.getItem(FORGOT_PASSWORD_RESEND_COOLDOWN_KEY);
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
    sessionStorage.setItem(FORGOT_PASSWORD_RESEND_COOLDOWN_KEY, String(endTime));
  } catch {
    // ignore
  }
}

type ForgotPasswordValues = {
  email: string;
};

type VerifyCodeValues = {
  code: string;
};

type NewPasswordValues = {
  password: string;
  confirmPassword: string;
};

export default function ForgotPasswordPage() {
  const t = useTranslations('Auth');
  const router = useRouter();
  const [step, setStep] = useState<'email' | 'code' | 'password'>('email');
  const [verificationToken, setVerificationToken] = useState<string | null>(null);
  const [email, setEmail] = useState<string>('');

  const [forgotPassword, { isLoading: isSendingCode }] = useForgotPasswordMutation();
  const [verifyForgotPasswordCode, { isLoading: isVerifying }] = useVerifyForgotPasswordCodeMutation();
  const [resetPassword, { isLoading: isResetting }] = useResetPasswordMutation();
  const [cooldownSeconds, setCooldownSeconds] = useState(() => getRemainingCooldownSeconds());

  const emailForm = useForm<ForgotPasswordValues>({
    defaultValues: { email: '' },
  });

  const codeForm = useForm<VerifyCodeValues>({
    defaultValues: { code: '' },
  });

  const passwordForm = useForm<NewPasswordValues>({
    defaultValues: { password: '', confirmPassword: '' },
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

  const onEmailSubmit = useCallback(
    async (data: ForgotPasswordValues) => {
      try {
        const result = await forgotPassword({ email: data.email }).unwrap();
        setVerificationToken(result.verification_token);
        setEmail(data.email);
        setStep('code');
        setCooldownInStorage();
        setCooldownSeconds(RESEND_COOLDOWN_SECONDS);
        toast.success(t('forgotCodeSuccess'));
      } catch (e: unknown) {
        const err = e as { data?: { message?: string } };
        const message = err.data?.message;
        toast.error(message || t('forgotVerifyError'));
      }
    },
    [forgotPassword, t]
  );

  const onCodeSubmit = useCallback(
    async (data: VerifyCodeValues) => {
      if (!verificationToken) {
        toast.error(t('verifyTokenMissing'));
        return;
      }
      try {
        await verifyForgotPasswordCode({ code: data.code, token: verificationToken }).unwrap();
        toast.success(t('forgotVerifySuccess'));
        setStep('password');
      } catch (e: unknown) {
        const err = e as { data?: { message?: string } };
        const message = err.data?.message;
        toast.error(message || t('forgotVerifyError'));
      }
    },
    [verificationToken, verifyForgotPasswordCode, t]
  );

  const onPasswordSubmit = useCallback(
    async (data: NewPasswordValues) => {
      if (!verificationToken) {
        toast.error(t('verifyTokenMissing'));
        return;
      }
      try {
        await resetPassword({ token: verificationToken, password: data.password }).unwrap();
        toast.success(t('resetPasswordSuccess'));
        router.push('/login');
      } catch (e: unknown) {
        const err = e as { data?: { message?: string } };
        const message = err.data?.message;
        toast.error(message || t('resetPasswordError'));
      }
    },
    [verificationToken, resetPassword, router, t]
  );

  const handleResend = useCallback(async () => {
    if (!email) return;
    if (cooldownSeconds > 0) return;
    try {
      const result = await forgotPassword({ email }).unwrap();
      setVerificationToken(result.verification_token);
      setCooldownInStorage();
      setCooldownSeconds(RESEND_COOLDOWN_SECONDS);
      toast.success(t('forgotCodeSuccess'));
    } catch (e: unknown) {
      const err = e as { data?: { message?: string } };
      const message = err.data?.message;
      toast.error(message || t('resendError'));
    }
  }, [email, forgotPassword, cooldownSeconds, t]);

  const handleBackToEmail = useCallback(() => {
    setStep('email');
    setVerificationToken(null);
    setEmail('');
    codeForm.reset();
  }, [codeForm]);

  const isResendDisabled = !email || cooldownSeconds > 0 || isSendingCode;

  return (
    <>
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-muted)]">{t('brand')}</p>
        <h1 className="mt-3 text-2xl font-semibold">{t('forgotTitle')}</h1>
        <p className="mt-2 text-sm text-[var(--color-muted)]">
          {step === 'email' && t('forgotSubtitle')}
          {step === 'code' && t('forgotCodeSubtitle')}
          {step === 'password' && t('setNewPasswordSubtitle')}
        </p>
      </div>

      {step === 'email' ? (
        <>
          <form className="mt-8 space-y-4" onSubmit={emailForm.handleSubmit(onEmailSubmit)}>
            <Input
              id="forgot-email"
              label={t('emailLabel')}
              type="email"
              placeholder={t('emailPlaceholder')}
              error={emailForm.formState.errors.email?.message}
              {...emailForm.register('email', {
                required: t('validationRequired'),
                pattern: {
                  value: emailPattern,
                  message: t('validationEmail'),
                },
              })}
            />
            <Button
              type="submit"
              className="w-full"
              disabled={emailForm.formState.isSubmitting}
              loading={isSendingCode}
            >
              {t('sendResetLink')}
            </Button>
          </form>
        </>
      ) : step === 'code' ? (
        <>
          <form className="mt-8 space-y-4" onSubmit={codeForm.handleSubmit(onCodeSubmit)}>
            <Input
              id="verify-code"
              label={t('verificationCodeLabel')}
              type="text"
              inputMode="numeric"
              placeholder={t('verificationCodePlaceholder')}
              error={codeForm.formState.errors.code?.message}
              inputClassName="text-center text-lg tracking-[0.4em]"
              maxLength={6}
              {...codeForm.register('code', {
                required: t('validationRequired'),
                pattern: {
                  value: /^\d{6}$/,
                  message: t('validationCodeLength'),
                },
              })}
            />
            <Button
              type="submit"
              className="w-full"
              disabled={codeForm.formState.isSubmitting || !verificationToken}
              loading={isVerifying}
            >
              {t('verifyCodeButton')}
            </Button>
          </form>

          <div className="mt-6 space-y-4 text-center text-sm text-[var(--color-muted)]">
            <p>
              {t('didntReceiveCode')}{' '}
              <button
                type="button"
                onClick={handleResend}
                disabled={isResendDisabled}
                className="font-semibold text-[var(--color-primary)] transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSendingCode
                  ? t('resending')
                  : cooldownSeconds > 0
                    ? `${t('resend')} (${cooldownSeconds}s)`
                    : t('resend')}
              </button>
            </p>
            <p>
              <button
                type="button"
                onClick={handleBackToEmail}
                className="font-semibold text-[var(--color-primary)] transition hover:opacity-80"
              >
                {t('changeEmail')}
              </button>
            </p>
          </div>
        </>
      ) : (
        <>
          <form className="mt-8 space-y-4" onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}>
            <Input
              id="new-password"
              label={t('passwordLabel')}
              type="password"
              placeholder={t('createPasswordPlaceholder')}
              error={passwordForm.formState.errors.password?.message}
              {...passwordForm.register('password', {
                required: t('validationRequired'),
                minLength: {
                  value: 6,
                  message: t('validationPasswordMin'),
                },
              })}
            />
            <Input
              id="confirm-password"
              label={t('confirmPasswordLabel')}
              type="password"
              placeholder={t('confirmPasswordPlaceholder')}
              error={passwordForm.formState.errors.confirmPassword?.message}
              {...passwordForm.register('confirmPassword', {
                required: t('validationRequired'),
                validate: (value) =>
                  value === passwordForm.getValues('password') || t('validationPasswordMatch'),
              })}
            />
            <Button
              type="submit"
              className="w-full"
              disabled={passwordForm.formState.isSubmitting || !verificationToken}
              loading={isResetting}
            >
              {t('setNewPasswordButton')}
            </Button>
          </form>
        </>
      )}

      <p className="mt-6 text-center text-sm text-[var(--color-muted)]">
        {t('rememberedPassword')}{' '}
        <Link href="/login" className="font-semibold text-[var(--color-primary)] transition hover:opacity-80">
          {t('backToSignIn')}
        </Link>
      </p>
    </>
  );
}

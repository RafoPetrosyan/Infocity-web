'use client';

import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link, useRouter } from '@/i18n/routing';
import { useSignUpMutation } from '@/store/auth';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type RegisterFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function RegisterPage() {
  const t = useTranslations('Auth');
  const router = useRouter();
  const [signUp, { isLoading }] = useSignUpMutation();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      const result = await signUp({
        email: data.email,
        password: data.password,
        first_name: data.firstName,
        last_name: data.lastName,
      }).unwrap();

      if (result.verification_token) {
        router.push(`/verify-email?token=${encodeURIComponent(result.verification_token)}`);
      } else {
        toast.error('Registration failed. Please try again.');
      }
    } catch (e: unknown) {
      const err = e as { data?: { message?: string } };
      const message = err.data?.message;
      toast.error(message || 'Unable to create account. Please try again.');
    }
  };

  const passwordValue = watch('password');

  return (
    <>
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-muted)] sm:tracking-[0.3em]">{t('brand')}</p>
        <h1 className="mt-3 text-xl font-semibold sm:text-2xl">{t('registerTitle')}</h1>
        <p className="mt-2 text-sm text-[var(--color-muted)]">{t('registerSubtitle')}</p>
      </div>

      <form className="mt-6 space-y-4 sm:mt-8" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Input
            id="register-first-name"
            label={t('firstNameLabel')}
            type="text"
            placeholder={t('firstNamePlaceholder')}
            error={errors.firstName?.message}
            {...register('firstName', {
              required: t('validationRequired'),
              minLength: {
                value: 2,
                message: t('validationFirstNameMin'),
              },
            })}
          />
          <Input
            id="register-last-name"
            label={t('lastNameLabel')}
            type="text"
            placeholder={t('lastNamePlaceholder')}
            error={errors.lastName?.message}
            {...register('lastName', {
              required: t('validationRequired'),
              minLength: {
                value: 2,
                message: t('validationLastNameMin'),
              },
            })}
          />
        </div>
        <Input
          id="register-email"
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
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Input
            id="register-password"
            label={t('passwordLabel')}
            type="password"
            placeholder={t('createPasswordPlaceholder')}
            error={errors.password?.message}
            {...register('password', {
              required: t('validationRequired'),
              minLength: {
                value: 6,
                message: t('validationPasswordMin'),
              },
            })}
          />
          <Input
            id="register-confirm-password"
            label={t('confirmPasswordLabel')}
            type="password"
            placeholder={t('confirmPasswordPlaceholder')}
            error={errors.confirmPassword?.message}
            {...register('confirmPassword', {
              required: t('validationRequired'),
              validate: (value) => value === passwordValue || t('validationPasswordMatch'),
            })}
          />
        </div>
        <Button type="submit" className="w-full" disabled={isSubmitting} loading={isLoading}>
          {t('createAccountButton')}
        </Button>
      </form>

      <div className="mt-6 flex items-center gap-3 text-xs text-[var(--color-muted)]">
        <span className="h-px flex-1 bg-[var(--color-border)]" />
        {t('signUpWith')}
        <span className="h-px flex-1 bg-[var(--color-border)]" />
      </div>

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Button variant="outline" type="button" className="flex items-center justify-center gap-2 font-medium">
          <span className="text-lg">G</span>
          {t('google')}
        </Button>
        <Button variant="outline" type="button" className="flex items-center justify-center gap-2 font-medium">
          <span className="text-lg">f</span>
          {t('facebook')}
        </Button>
      </div>

      <p className="mt-6 text-center text-sm text-[var(--color-muted)]">
        {t('alreadyHaveAccount')}{' '}
        <Link href="/login" className="font-semibold text-[var(--color-primary)] transition hover:opacity-80">
          {t('signInLink')}
        </Link>
      </p>
    </>
  );
}

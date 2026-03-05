'use client';

import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { toast, ToastContainer } from 'react-toastify';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Link, useRouter } from '@/i18n/routing';

import 'react-toastify/dist/ReactToastify.css';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type LoginFormValues = {
  email: string;
  password: string;
  remember: boolean;
};

export default function LoginPage() {
  const t = useTranslations('Auth');
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: '',
      password: '',
      remember: false,
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setLoading(true);
    try {
      const result: any = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      console.log(result);

      if (result?.ok && result?.url) {
        if (result?.url.includes('verify-email')) {
          router.replace(result.url);
          return;
        }
        router.replace('/');
        return;
      }

      toast.error(result?.error || 'Invalid email or password.');
    } catch (e: any) {
      console.log(e);
      toast.error('Unable to sign in. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    await signIn('google', { redirect: true, callbackUrl: '/' });
  };

  const faceBookLogin = async () => {
    await signIn('facebook', { redirect: true, callbackUrl: '/' });
  };

  return (
    <>
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-muted)]">{t('brand')}</p>
        <h1 className="mt-3 text-2xl font-semibold">{t('loginTitle')}</h1>
        <p className="mt-2 text-sm text-[var(--color-muted)]">{t('loginSubtitle')}</p>
      </div>

      <form className="mt-8 space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <Input
          id="login-email"
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
        <Input
          id="login-password"
          label={t('passwordLabel')}
          type="password"
          placeholder={t('passwordPlaceholder')}
          error={errors.password?.message}
          {...register('password', {
            required: t('validationRequired'),
            // minLength: {
            //   value: 6,
            //   message: t("validationPasswordMin"),
            // },
          })}
        />
        <div className="flex items-center justify-between text-sm">
          {/*<label className="flex items-center gap-2 text-[var(--color-muted)]">*/}
          {/*  <input*/}
          {/*    type="checkbox"*/}
          {/*    className="h-4 w-4 rounded border-[var(--color-border)]"*/}
          {/*    {...register("remember")}*/}
          {/*  />*/}
          {/*  {t("rememberMe")}*/}
          {/*</label>*/}
          <span></span>
          <a href="/forgot-password" className="font-medium text-[var(--color-primary)] transition hover:opacity-80">
            {t('forgotPasswordLink')}
          </a>
        </div>
        <Button type="submit" className="w-full" disabled={isSubmitting} loading={loading}>
          {t('signInButton')}
        </Button>
      </form>

      <div className="mt-6 flex items-center gap-3 text-xs text-[var(--color-muted)]">
        <span className="h-px flex-1 bg-[var(--color-border)]" />
        {t('continueWith')}
        <span className="h-px flex-1 bg-[var(--color-border)]" />
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <Button
          variant="outline"
          type="button"
          className="flex items-center justify-center gap-2 font-medium"
          onClick={googleLogin}
        >
          <span className="text-lg">G</span>
          {t('google')}
        </Button>
        <Button
          variant="outline"
          type="button"
          className="flex items-center justify-center gap-2 font-medium"
          onClick={faceBookLogin}
        >
          <span className="text-lg">f</span>
          {t('facebook')}
        </Button>
      </div>

      <p className="mt-6 text-center text-sm text-[var(--color-muted)]">
        {t('noAccount')}
        <Link href="/register" className="font-semibold text-[var(--color-primary)] transition hover:opacity-80 ml-2">
          {t('createOne')}
        </Link>
      </p>
      <ToastContainer position="top-right" autoClose={4000} />
    </>
  );
}

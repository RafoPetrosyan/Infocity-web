"use client";

import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type RegisterFormValues = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function RegisterPage() {
  const t = useTranslations("Auth");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: RegisterFormValues) => {
    void data;
  };

  const passwordValue = watch("password");

  return (
    <>
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-muted)]">
          {t("brand")}
        </p>
        <h1 className="mt-3 text-2xl font-semibold">{t("registerTitle")}</h1>
        <p className="mt-2 text-sm text-[var(--color-muted)]">
          {t("registerSubtitle")}
        </p>
      </div>

      <form className="mt-8 space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <Input
          id="register-full-name"
          label={t("fullNameLabel")}
          type="text"
          placeholder={t("fullNamePlaceholder")}
          error={errors.fullName?.message}
          {...register("fullName", {
            required: t("validationRequired"),
            minLength: {
              value: 2,
              message: t("validationFullNameMin"),
            },
          })}
        />
        <Input
          id="register-email"
          label={t("emailLabel")}
          type="email"
          placeholder={t("emailPlaceholder")}
          error={errors.email?.message}
          {...register("email", {
            required: t("validationRequired"),
            pattern: {
              value: emailPattern,
              message: t("validationEmail"),
            },
          })}
        />
        <Input
          id="register-password"
          label={t("passwordLabel")}
          type="password"
          placeholder={t("createPasswordPlaceholder")}
          error={errors.password?.message}
          {...register("password", {
            required: t("validationRequired"),
            minLength: {
              value: 8,
              message: t("validationPasswordMin"),
            },
          })}
        />
        <Input
          id="register-confirm-password"
          label={t("confirmPasswordLabel")}
          type="password"
          placeholder={t("confirmPasswordPlaceholder")}
          error={errors.confirmPassword?.message}
          {...register("confirmPassword", {
            required: t("validationRequired"),
            validate: (value) =>
              value === passwordValue || t("validationPasswordMatch"),
          })}
        />
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {t("createAccountButton")}
        </Button>
      </form>

      <div className="mt-6 flex items-center gap-3 text-xs text-[var(--color-muted)]">
        <span className="h-px flex-1 bg-[var(--color-border)]" />
        {t("signUpWith")}
        <span className="h-px flex-1 bg-[var(--color-border)]" />
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <Button
          variant="outline"
          type="button"
          className="flex items-center justify-center gap-2 font-medium"
        >
          <span className="text-lg">G</span>
          {t("google")}
        </Button>
        <Button
          variant="outline"
          type="button"
          className="flex items-center justify-center gap-2 font-medium"
        >
          <span className="text-lg">f</span>
          {t("facebook")}
        </Button>
      </div>

      <p className="mt-6 text-center text-sm text-[var(--color-muted)]">
        {t("alreadyHaveAccount")}{" "}
        <a
          href="/login"
          className="font-semibold text-[var(--color-primary)] transition hover:opacity-80"
        >
          {t("signInLink")}
        </a>
      </p>
    </>
  );
}

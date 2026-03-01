"use client";

import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type VerifyEmailValues = {
  code: string;
};

export default function VerifyEmailPage() {
  const t = useTranslations("Auth");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<VerifyEmailValues>({
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = (data: VerifyEmailValues) => {
    void data;
  };

  return (
    <>
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-muted)]">
          {t("brand")}
        </p>
        <h1 className="mt-3 text-2xl font-semibold">{t("verifyTitle")}</h1>
        <p className="mt-2 text-sm text-[var(--color-muted)]">
          {t("verifySubtitle")}
        </p>
      </div>

      <form className="mt-8 space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <Input
          id="verify-code"
          label={t("verificationCodeLabel")}
          type="text"
          inputMode="numeric"
          placeholder={t("verificationCodePlaceholder")}
          error={errors.code?.message}
          inputClassName="text-center text-lg tracking-[0.4em]"
          maxLength={6}
          {...register("code", {
            required: t("validationRequired"),
            pattern: {
              value: /^\d{6}$/,
              message: t("validationCodeLength"),
            },
          })}
        />
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {t("verifyEmailButton")}
        </Button>
      </form>

      <div className="mt-6 text-center text-sm text-[var(--color-muted)]">
        {t("didntReceiveCode")}{" "}
        <button
          type="button"
          className="font-semibold text-[var(--color-primary)] transition hover:opacity-80"
        >
          {t("resend")}
        </button>
      </div>
    </>
  );
}

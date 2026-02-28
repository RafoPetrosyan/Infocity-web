export default function VerifyEmailPage() {
  return (
    <>
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-muted)]">
          IMCITY
        </p>
        <h1 className="mt-3 text-2xl font-semibold">Confirm your email</h1>
        <p className="mt-2 text-sm text-[var(--color-muted)]">
          We sent a 6-digit code to your email. Enter it below to verify your
          account.
        </p>
      </div>

      <form className="mt-8 space-y-4">
        <label className="block text-sm font-medium">
          Verification code
          <input
            type="text"
            inputMode="numeric"
            placeholder="••••••"
            className="mt-2 w-full rounded-2xl border border-[var(--color-border)] bg-white px-4 py-3 text-center text-lg tracking-[0.4em] outline-none transition focus:border-[var(--color-primary)]"
          />
        </label>
        <button
          type="submit"
          className="w-full rounded-2xl bg-[var(--color-primary)] py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:opacity-90"
        >
          Verify email
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-[var(--color-muted)]">
        Didn&apos;t receive the code?{" "}
        <button
          type="button"
          className="font-semibold text-[var(--color-primary)] transition hover:opacity-80"
        >
          Resend
        </button>
      </div>
    </>
  );
}

export default function ForgotPasswordPage() {
  return (
    <>
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-muted)]">
          IMCITY
        </p>
        <h1 className="mt-3 text-2xl font-semibold">Forgot password</h1>
        <p className="mt-2 text-sm text-[var(--color-muted)]">
          Enter your email and we&apos;ll send a reset link.
        </p>
      </div>

      <form className="mt-8 space-y-4">
        <label className="block text-sm font-medium">
          Email
          <input
            type="email"
            placeholder="name@email.com"
            className="mt-2 w-full rounded-2xl border border-[var(--color-border)] bg-white px-4 py-3 text-sm outline-none transition focus:border-[var(--color-primary)]"
          />
        </label>
        <button
          type="submit"
          className="w-full rounded-2xl bg-[var(--color-primary)] py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:opacity-90"
        >
          Send reset link
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-[var(--color-muted)]">
        Remembered your password?{" "}
        <a
          href="/login"
          className="font-semibold text-[var(--color-primary)] transition hover:opacity-80"
        >
          Back to sign in
        </a>
      </p>
    </>
  );
}

export default function LoginPage() {
  return (
    <>
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-muted)]">
          IMCITY
        </p>
        <h1 className="mt-3 text-2xl font-semibold">Welcome back</h1>
        <p className="mt-2 text-sm text-[var(--color-muted)]">
          Sign in to discover events, places, and services.
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
        <label className="block text-sm font-medium">
          Password
          <input
            type="password"
            placeholder="••••••••"
            className="mt-2 w-full rounded-2xl border border-[var(--color-border)] bg-white px-4 py-3 text-sm outline-none transition focus:border-[var(--color-primary)]"
          />
        </label>
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-[var(--color-muted)]">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-[var(--color-border)]"
            />
            Remember me
          </label>
          <a
            href="/forgot-password"
            className="font-medium text-[var(--color-primary)] transition hover:opacity-80"
          >
            Forgot password?
          </a>
        </div>
        <button
          type="submit"
          className="w-full rounded-2xl bg-[var(--color-primary)] py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:opacity-90"
        >
          Sign in
        </button>
      </form>

      <div className="mt-6 flex items-center gap-3 text-xs text-[var(--color-muted)]">
        <span className="h-px flex-1 bg-[var(--color-border)]" />
        or continue with
        <span className="h-px flex-1 bg-[var(--color-border)]" />
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          className="flex items-center justify-center gap-2 rounded-2xl border border-[var(--color-border)] bg-white px-4 py-3 text-sm font-medium transition hover:-translate-y-0.5"
        >
          <span className="text-lg">G</span>
          Google
        </button>
        <button
          type="button"
          className="flex items-center justify-center gap-2 rounded-2xl border border-[var(--color-border)] bg-white px-4 py-3 text-sm font-medium transition hover:-translate-y-0.5"
        >
          <span className="text-lg">f</span>
          Facebook
        </button>
      </div>

      <p className="mt-6 text-center text-sm text-[var(--color-muted)]">
        Don&apos;t have an account?{" "}
        <a
          href="/register"
          className="font-semibold text-[var(--color-primary)] transition hover:opacity-80"
        >
          Create one
        </a>
      </p>
    </>
  );
}

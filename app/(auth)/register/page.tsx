export default function RegisterPage() {
  return (
    <>
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-muted)]">
          IMCITY
        </p>
        <h1 className="mt-3 text-2xl font-semibold">Create your account</h1>
        <p className="mt-2 text-sm text-[var(--color-muted)]">
          Start exploring the city with your personal profile.
        </p>
      </div>

      <form className="mt-8 space-y-4">
        <label className="block text-sm font-medium">
          Full name
          <input
            type="text"
            placeholder="Your name"
            className="mt-2 w-full rounded-2xl border border-[var(--color-border)] bg-white px-4 py-3 text-sm outline-none transition focus:border-[var(--color-primary)]"
          />
        </label>
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
            placeholder="Create a password"
            className="mt-2 w-full rounded-2xl border border-[var(--color-border)] bg-white px-4 py-3 text-sm outline-none transition focus:border-[var(--color-primary)]"
          />
        </label>
        <label className="block text-sm font-medium">
          Confirm password
          <input
            type="password"
            placeholder="Repeat password"
            className="mt-2 w-full rounded-2xl border border-[var(--color-border)] bg-white px-4 py-3 text-sm outline-none transition focus:border-[var(--color-primary)]"
          />
        </label>
        <button
          type="submit"
          className="w-full rounded-2xl bg-[var(--color-primary)] py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:opacity-90"
        >
          Create account
        </button>
      </form>

      <div className="mt-6 flex items-center gap-3 text-xs text-[var(--color-muted)]">
        <span className="h-px flex-1 bg-[var(--color-border)]" />
        or sign up with
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
        Already have an account?{" "}
        <a
          href="/login"
          className="font-semibold text-[var(--color-primary)] transition hover:opacity-80"
        >
          Sign in
        </a>
      </p>
    </>
  );
}

import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "outline";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  loading?: boolean;
};

export function Button({
  variant = "primary",
  className,
  loading = false,
  children,
  ...props
}: ButtonProps): any {
  const baseClasses =
    "inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer";
  const variantClasses =
    variant === "outline"
      ? "border border-[var(--color-border)] bg-white text-[var(--color-ink)] hover:-translate-y-0.5"
      : "bg-[var(--color-primary)] text-white shadow-sm hover:-translate-y-0.5 hover:opacity-90";

  const combinedClasses = [baseClasses, variantClasses, className]
    .filter(Boolean)
    .join(" ");

  const isDisabled = props.disabled || loading;

  return (
    <button
      className={combinedClasses}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading ? (
        <span className="inline-flex h-4 w-4 animate-spin items-center justify-center">
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <circle
              className="opacity-30"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="3"
            />
            <path
              className="opacity-80"
              d="M22 12a10 10 0 0 0-10-10"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </span>
      ) : null}
      {children}
    </button>
  );
}

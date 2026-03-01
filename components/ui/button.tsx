import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "outline";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

export function Button({
  variant = "primary",
  className,
  ...props
}: ButtonProps): any {
  const baseClasses =
    "rounded-2xl px-4 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-70";
  const variantClasses =
    variant === "outline"
      ? "border border-[var(--color-border)] bg-white text-[var(--color-ink)] hover:-translate-y-0.5"
      : "bg-[var(--color-primary)] text-white shadow-sm hover:-translate-y-0.5 hover:opacity-90";

  const combinedClasses = [baseClasses, variantClasses, className]
    .filter(Boolean)
    .join(" ");

  return <button className={combinedClasses} {...props} />;
}

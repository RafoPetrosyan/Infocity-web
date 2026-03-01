import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  containerClassName?: string;
  inputClassName?: string;
};

export function Input({
  label,
  error,
  containerClassName,
  inputClassName,
  id,
  ...props
}: InputProps): any {
  const inputId = id;
  const errorId = inputId && error ? `${inputId}-error` : undefined;

  const inputClasses = [
    "mt-2 w-full rounded-2xl border bg-white px-4 py-3 text-sm outline-none transition focus:border-[var(--color-primary)]",
    error ? "border-red-500" : "border-[var(--color-border)]",
    inputClassName,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <label className={["block text-sm font-medium", containerClassName].filter(Boolean).join(" ")}>
      {label ? <span>{label}</span> : null}
      <input
        id={inputId}
        className={inputClasses}
        aria-invalid={Boolean(error)}
        aria-describedby={errorId}
        {...props}
      />
      {error ? (
        <span id={errorId} className="mt-2 block text-xs text-red-500">
          {error}
        </span>
      ) : null}
    </label>
  );
}

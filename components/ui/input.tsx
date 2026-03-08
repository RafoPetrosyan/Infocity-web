'use client';

import { useState } from 'react';
import type { InputHTMLAttributes } from 'react';

import Image from 'next/image';

import EyeIcon from '@/assets/svg/Eye.svg';
import EyeOffIcon from '@/assets/svg/EyeOff.svg';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  containerClassName?: string;
  inputClassName?: string;
};

export function Input({ label, error, containerClassName, inputClassName, id, type, ...props }: InputProps): any {
  const inputId = id;
  const errorId = inputId && error ? `${inputId}-error` : undefined;
  const isPassword = type === 'password';
  const [showPassword, setShowPassword] = useState(false);
  const inputType = isPassword && showPassword ? 'text' : type;

  const inputClasses = [
    'w-full rounded-2xl border bg-white px-4 py-3 text-sm outline-none transition focus:border-[var(--color-primary)]',
    error ? 'border-red-500' : 'border-[var(--color-border)]',
    isPassword ? 'pr-12' : '',
    inputClassName,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <label className={['block text-sm font-medium', containerClassName].filter(Boolean).join(' ')}>
      {label ? <span>{label}</span> : null}
      <div className="relative mt-2">
        <input
          id={inputId}
          type={inputType}
          className={inputClasses}
          aria-invalid={Boolean(error)}
          aria-describedby={errorId}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-[var(--color-muted)] transition hover:text-[var(--color-foreground)] cursor-pointer"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            <Image src={showPassword ? EyeOffIcon : EyeIcon} alt="" width={20} height={20} className="opacity-70" />
          </button>
        )}
      </div>
      {error ? (
        <span id={errorId} className="mt-2 block text-xs text-red-500">
          {error}
        </span>
      ) : null}
    </label>
  );
}

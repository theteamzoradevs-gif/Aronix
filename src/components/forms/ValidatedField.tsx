"use client";

import { cn } from "@/lib/utils";

function FieldCheck() {
  return (
    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-green-600">
      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
      </svg>
    </span>
  );
}

interface ValidatedFieldProps {
  id: string;
  label: string;
  error?: string;
  touched?: boolean;
  valid?: boolean;
  required?: boolean;
  compact?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function ValidatedField({
  id,
  label,
  error,
  touched,
  valid,
  required = false,
  compact = false,
  className,
  children,
}: ValidatedFieldProps) {
  const showError = Boolean(touched && error);
  const showValid = Boolean(touched && valid && !error);

  return (
    <div className={cn(compact ? "space-y-1" : "space-y-1.5", className)}>
      <label htmlFor={id} className={cn("block font-medium text-text", compact ? "text-xs" : "text-sm")}>
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      <div className="relative">
        {children}
        {showValid && <FieldCheck />}
      </div>
      {showError && (
        <p id={`${id}-error`} className="text-xs text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export function fieldInputClass(
  base: string,
  touched?: boolean,
  error?: string,
  valid?: boolean,
  withIconPad?: boolean
) {
  return cn(
    base,
    withIconPad && "pr-10",
    touched && error && "form-input-error",
    touched && valid && !error && "form-input-valid"
  );
}

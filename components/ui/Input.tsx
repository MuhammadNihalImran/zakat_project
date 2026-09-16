import React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  unit?: string | React.ReactNode;
  prefixSymbol?: string | React.ReactNode;
  containerClassName?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      unit,
      prefixSymbol,
      id,
      className = "",
      containerClassName = "",
      disabled,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    const describedBy = [error ? errorId : null, helperText ? helperId : null]
      .filter(Boolean)
      .join(" ");

    return (
      <div className={`w-full flex flex-col gap-1.5 ${containerClassName}`}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-slate-700 select-none flex justify-between items-center"
          >
            <span>{label}</span>
          </label>
        )}

        <div className="relative flex items-center rounded-lg shadow-sm">
          {prefixSymbol && (
            <span className="absolute left-3 rtl:left-auto rtl:right-3 text-slate-500 text-sm pointer-events-none select-none">
              {prefixSymbol}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            aria-invalid={Boolean(error)}
            aria-describedby={describedBy || undefined}
            className={`w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus-ring disabled:bg-slate-100 disabled:text-slate-500 disabled:cursor-not-allowed ${
              error
                ? "border-rose-500 focus:border-rose-600 focus-visible:ring-rose-500"
                : "border-slate-300 hover:border-slate-400 focus:border-emerald-600"
            } ${prefixSymbol ? "pl-9 rtl:pl-3.5 rtl:pr-9" : ""} ${
              unit ? "pr-12 rtl:pr-3.5 rtl:pl-12" : ""
            } ${className}`}
            {...props}
          />

          {unit && (
            <span className="absolute right-3 rtl:right-auto rtl:left-3 text-slate-500 text-sm font-medium pointer-events-none select-none">
              {unit}
            </span>
          )}
        </div>

        {error && (
          <p id={errorId} role="alert" className="text-xs text-rose-600 font-medium flex items-center gap-1">
            <svg
              className="h-3.5 w-3.5 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span>{error}</span>
          </p>
        )}

        {!error && helperText && (
          <p id={helperId} className="text-xs text-slate-500">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

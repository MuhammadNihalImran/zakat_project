import React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "inverted";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      isLoading = false,
      fullWidth = false,
      icon,
      className = "",
      disabled,
      type = "button",
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded-lg transition-colors duration-150 ease-in-out focus-ring cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed disabled:pointer-events-none select-none";

    const variantStyles = {
      primary:
        "bg-emerald-600 text-white hover:bg-emerald-700 active:bg-emerald-800 shadow-sm",
      secondary:
        "bg-slate-800 text-white hover:bg-slate-900 active:bg-slate-950 shadow-sm",
      outline:
        "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 active:bg-slate-100 shadow-sm",
      ghost:
        "bg-transparent text-slate-700 hover:bg-slate-100 active:bg-slate-200",
      danger:
        "bg-rose-600 text-white hover:bg-rose-700 active:bg-rose-800 shadow-sm",
      inverted:
        "bg-white text-emerald-700 border border-emerald-200 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 active:bg-emerald-700 shadow-md hover:shadow-xl",
    };

    const sizeStyles = {
      sm: "px-3 py-1.5 text-sm gap-1.5",
      md: "px-4 py-2.5 text-sm gap-2",
      lg: "px-6 py-3.5 text-base gap-2.5",
    };

    const widthStyle = fullWidth ? "w-full" : "";

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${className}`}
        {...props}
      >
        {isLoading ? (
          <svg
            className="animate-spin h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : icon ? (
          <span className="shrink-0">{icon}</span>
        ) : null}
        <span>{children}</span>
      </button>
    );
  }
);

Button.displayName = "Button";

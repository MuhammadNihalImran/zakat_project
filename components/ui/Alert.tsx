import React from "react";

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "info" | "success" | "warning" | "error";
  title?: string;
  icon?: React.ReactNode;
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      children,
      variant = "info",
      title,
      icon,
      className = "",
      role,
      ...props
    },
    ref
  ) => {
    const alertRole = role || (variant === "error" || variant === "warning" ? "alert" : "status");

    const variantStyles = {
      info: "bg-sky-50 border-sky-200 text-sky-900 border",
      success: "bg-emerald-50 border-emerald-200 text-emerald-900 border",
      warning: "bg-amber-50 border-amber-200 text-amber-900 border",
      error: "bg-rose-50 border-rose-200 text-rose-900 border",
    };

    const defaultIcons = {
      info: (
        <svg className="h-5 w-5 text-sky-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      success: (
        <svg className="h-5 w-5 text-emerald-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      warning: (
        <svg className="h-5 w-5 text-amber-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
      error: (
        <svg className="h-5 w-5 text-rose-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    };

    return (
      <div
        ref={ref}
        role={alertRole}
        className={`p-4 rounded-xl flex gap-3 ${variantStyles[variant]} ${className}`}
        {...props}
      >
        <span className="pt-0.5">{icon || defaultIcons[variant]}</span>
        <div className="flex-1 flex flex-col gap-0.5 text-sm">
          {title && <span className="font-semibold tracking-tight">{title}</span>}
          <div className="leading-relaxed opacity-95">{children}</div>
        </div>
      </div>
    );
  }
);

Alert.displayName = "Alert";

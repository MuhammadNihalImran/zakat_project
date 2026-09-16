import React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "bordered" | "flat";
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = "", variant = "default", children, ...props }, ref) => {
    const variantStyles = {
      default: "bg-white border border-slate-200 shadow-sm rounded-xl",
      bordered: "bg-white border-2 border-slate-200 rounded-xl",
      flat: "bg-slate-50 border border-slate-100 rounded-xl",
    };

    return (
      <div
        ref={ref}
        className={`overflow-hidden transition-all duration-150 ${variantStyles[variant]} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = "Card";

export const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className = "", children, ...props }, ref) => (
  <div ref={ref} className={`p-5 sm:p-6 flex flex-col gap-1.5 ${className}`} {...props}>
    {children}
  </div>
));
CardHeader.displayName = "CardHeader";

export const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className = "", children, ...props }, ref) => (
  <h3
    ref={ref}
    className={`text-lg sm:text-xl font-semibold text-slate-900 tracking-tight ${className}`}
    {...props}
  >
    {children}
  </h3>
));
CardTitle.displayName = "CardTitle";

export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className = "", children, ...props }, ref) => (
  <p ref={ref} className={`text-sm text-slate-600 ${className}`} {...props}>
    {children}
  </p>
));
CardDescription.displayName = "CardDescription";

export const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className = "", children, ...props }, ref) => (
  <div ref={ref} className={`px-5 pb-5 sm:px-6 sm:pb-6 ${className}`} {...props}>
    {children}
  </div>
));
CardContent.displayName = "CardContent";

export const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className = "", children, ...props }, ref) => (
  <div
    ref={ref}
    className={`px-5 py-4 sm:px-6 bg-slate-50/50 border-t border-slate-100 flex items-center gap-3 ${className}`}
    {...props}
  >
    {children}
  </div>
));
CardFooter.displayName = "CardFooter";

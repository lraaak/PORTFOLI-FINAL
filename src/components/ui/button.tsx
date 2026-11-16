import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center whitespace-nowrap rounded-lg font-mono text-xs uppercase tracking-wider font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 active:scale-95";

    const variants = {
      default:
        "bg-[#BFAC95] text-[#0e0c0b] hover:bg-[#D9C6B0] shadow-md shadow-[#BFAC95]/15 font-bold",
      destructive:
        "bg-red-700 text-white hover:bg-red-800",
      outline:
        "border border-[#BFAC95]/45 bg-transparent text-[#f5efe8] hover:bg-[#BFAC95]/15 hover:border-[#D9C6B0]",
      secondary:
        "bg-[#1c1815] text-[#f5efe8] hover:bg-[#26211d] border border-[#8C7764]/30",
      ghost:
        "hover:bg-[#BFAC95]/15 hover:text-[#D9C6B0] text-[#f5efe8]",
      link:
        "text-[#D9C6B0] underline-offset-4 hover:underline",
    };

    const sizes = {
      default: "h-10 px-4 py-2",
      sm: "h-8 rounded-md px-3 text-[11px]",
      lg: "h-12 rounded-lg px-8 text-sm",
      icon: "h-9 w-9",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };

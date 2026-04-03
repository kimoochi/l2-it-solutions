"use client"

import * as React from "react"
import { cn } from "../../lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "secondary" | "link"
  size?: "default" | "sm" | "lg" | "icon"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const variants = {
      default: "bg-primary text-white hover:bg-secondary",
      outline: "border border-primary text-primary hover:bg-primary/5",
      secondary: "bg-secondary text-white hover:bg-primary",
      ghost: "hover:bg-primary/10 text-text-main",
      link: "text-primary underline-offset-4 hover:underline",
    }
    const sizes = {
      default: "h-12 px-6 py-3 rounded-xl",
      sm: "h-10 px-4 py-2 rounded-lg text-sm",
      lg: "h-14 px-10 py-4 rounded-2xl text-lg",
      icon: "h-12 w-12 rounded-xl flex items-center justify-center",
    }

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-bold transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }

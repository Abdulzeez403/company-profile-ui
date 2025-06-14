import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost"
  size?: "sm" | "md" | "lg"
  loading?: boolean
  children: ReactNode
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", size = "md", loading, children, disabled, ...props }, ref) => {
    const baseClasses =
      "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"

    const variantClasses = {
      primary: "text-white bg-gray-900 hover:bg-gray-800 focus:ring-gray-900 shadow-sm",
      secondary:
        "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 hover:border-gray-400 focus:ring-blue-500 shadow-sm",
      ghost: "text-gray-600 hover:text-gray-800 hover:bg-gray-50 focus:ring-blue-500",
    }

    const sizeClasses = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2.5 text-sm",
      lg: "px-6 py-3 text-base",
    }

    return (
      <button
        ref={ref}
        className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
        )}
        {children}
      </button>
    )
  },
)

Button.displayName = "Button"

import { forwardRef, type TextareaHTMLAttributes } from "react"

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean
  isValid?: boolean
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = "", error, isValid, ...props }, ref) => {
    const baseClasses =
      "w-full px-3 py-2.5 border rounded-lg shadow-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 resize-none"

    const stateClasses = error
      ? "border-red-300 focus:ring-red-500 focus:ring-opacity-50"
      : isValid
        ? "border-green-300 focus:ring-green-500 focus:ring-opacity-50"
        : "border-gray-300 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400"

    return <textarea ref={ref} className={`${baseClasses} ${stateClasses} ${className}`} {...props} />
  },
)

Textarea.displayName = "Textarea"

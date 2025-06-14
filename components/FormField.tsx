import type { ReactNode } from "react"
import { AlertCircle, CheckCircle2 } from "lucide-react"

interface FormFieldProps {
  label: string
  required?: boolean
  error?: string
  isValid?: boolean
  children: ReactNode
  description?: string
}

export const FormField = ({ label, required, error, isValid, children, description }: FormFieldProps) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-900">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {description && <p className="text-sm text-gray-600">{description}</p>}
      <div className="relative">
        {children}
        {isValid && <CheckCircle2 className="absolute right-3 top-3 h-5 w-5 text-green-500" />}
        {error && <AlertCircle className="absolute right-3 top-3 h-5 w-5 text-red-500" />}
      </div>
      {error && (
        <p className="text-sm text-red-600 flex items-center gap-1">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          {error}
        </p>
      )}
    </div>
  )
}

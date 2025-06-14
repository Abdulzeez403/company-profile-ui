"use client"

import { Input } from "./Input"

interface SocialInputProps {
  label: string
  prefix: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export const SocialInput = ({ label, prefix, value, onChange, placeholder }: SocialInputProps) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-900">{label}</label>
      <div className="flex rounded-lg shadow-sm">
        <span className="inline-flex items-center px-4 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-600 text-sm font-medium whitespace-nowrap">
          {prefix}
        </span>
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value.replace(/^@/, ""))}
          className="rounded-l-none border-l-0 focus:ring-offset-0"
          placeholder={placeholder}
        />
      </div>
    </div>
  )
}

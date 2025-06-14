"use client"

import { useState, useCallback } from "react"
import type { CompanyProfile, ValidationErrors, TouchedFields } from "../types/profile"

export const useFormValidation = () => {
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [touched, setTouched] = useState<TouchedFields>({})

  const validateField = useCallback((field: string, value: string): string => {
    switch (field) {
      case "company_name":
        if (!value.trim()) return "Company name is required"
        if (value.length < 2) return "Company name must be at least 2 characters"
        if (value.length > 100) return "Company name must be less than 100 characters"
        break
      case "email":
        if (!value.trim()) return "Email is required"
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Please enter a valid email address"
        break
      case "website":
        if (value && !/^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]*\.[a-zA-Z]{2,}$/.test(value)) {
          return "Please enter a valid website (e.g., example.com)"
        }
        break
      case "description":
        if (value.length > 500) return "Description must be less than 500 characters"
        break
    }
    return ""
  }, [])

  const validateForm = useCallback(
    (profile: CompanyProfile): boolean => {
      const newErrors: ValidationErrors = {}
      const fields = ["company_name", "email", "website", "description"]

      fields.forEach((field) => {
        const error = validateField(field, profile[field as keyof CompanyProfile] as string)
        if (error) newErrors[field] = error
      })

      setErrors(newErrors)
      return Object.keys(newErrors).length === 0
    },
    [validateField],
  )

  const updateFieldError = useCallback(
    (field: string, value: string) => {
      const error = validateField(field, value)
      setErrors((prev) => ({ ...prev, [field]: error }))
    },
    [validateField],
  )

  const markFieldTouched = useCallback((field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
  }, [])

  const getFieldError = useCallback(
    (field: string): string => {
      return touched[field] && errors[field] ? errors[field] : ""
    },
    [touched, errors],
  )

  const isFieldValid = useCallback(
    (field: string, value: any): boolean => {
      return touched[field] && !errors[field] && value
    },
    [touched, errors],
  )

  return {
    errors,
    touched,
    validateForm,
    updateFieldError,
    markFieldTouched,
    getFieldError,
    isFieldValid,
    setErrors,
  }
}

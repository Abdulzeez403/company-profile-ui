"use client"

import type React from "react"

import { useRef, useState } from "react"
import { Upload, X, AlertCircle } from "lucide-react"
import { Button } from "./Button"

interface LogoUploadProps {
  logo: string | null
  companyName: string
  onUpload: (file: File) => void
  onRemove: () => void
  isUploading: boolean
  error?: string
}

export const LogoUpload = ({ logo, companyName, onUpload, onRemove, isUploading, error }: LogoUploadProps) => {
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    const files = e.dataTransfer.files
    if (files.length > 0) {
      onUpload(files[0])
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onUpload(file)
    }
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-6">
      {/* Avatar */}
      <div className="flex-shrink-0 mx-auto sm:mx-0">
        <div className="h-20 w-20 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
          {logo ? (
            <img src={logo || "/placeholder.svg"} alt="Company logo" className="h-full w-full object-cover" />
          ) : (
            <span className="text-2xl font-bold text-white">{companyName.charAt(0)}</span>
          )}
        </div>
      </div>

      {/* Upload Area */}
      <div className="flex-1">
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-all duration-200 ${
            isDragOver
              ? "border-blue-400 bg-blue-50"
              : error
                ? "border-red-300 bg-red-50"
                : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {isUploading ? (
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent mb-3"></div>
              <p className="text-sm text-gray-600">Uploading...</p>
            </div>
          ) : (
            <>
              <Upload className="mx-auto h-8 w-8 text-gray-400 mb-3" />
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
                <label htmlFor="logo-upload">
                  <Button variant="secondary" size="sm" className="cursor-pointer">
                    Click to upload
                  </Button>
                  <input
                    ref={fileInputRef}
                    id="logo-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </label>
                <span className="text-sm text-gray-500">or drag and drop</span>
              </div>
              <p className="text-xs text-gray-500 mt-2">SVG, PNG, JPG or GIF (max. 5MB)</p>
            </>
          )}
        </div>

        {/* Actions */}
        {logo && (
          <div className="mt-3 flex justify-center">
            <Button variant="ghost" size="sm" onClick={onRemove}>
              <X className="h-4 w-4 mr-1" />
              Remove logo
            </Button>
          </div>
        )}

        {/* Error */}
        {error && (
          <p className="text-sm text-red-600 flex items-center gap-1 mt-2">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            {error}
          </p>
        )}
      </div>
    </div>
  )
}

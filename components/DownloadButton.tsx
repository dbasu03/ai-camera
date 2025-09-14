'use client'

import { useState } from 'react'
import { Download, ChevronDown } from 'lucide-react'
import type { ImageFormat } from '@/types'

interface DownloadButtonProps {
  onDownload: (format: ImageFormat) => void
}

export default function DownloadButton({ onDownload }: DownloadButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  const formats: Array<{ value: ImageFormat; label: string; description: string }> = [
    { value: 'png', label: 'PNG (High Quality)', description: 'Best for photos with transparency' },
    { value: 'jpg', label: 'JPG (Standard)', description: 'Good balance of quality and file size' },
    { value: 'jpeg', label: 'JPEG (Compatible)', description: 'Maximum compatibility' },
  ]

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full btn-primary flex items-center justify-center space-x-2 text-sm sm:text-base"
      >
        <Download className="h-4 w-4 sm:h-5 sm:w-5" />
        <span>Download Enhanced Image</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
          <div className="p-1 sm:p-2">
            {formats.map((format) => (
              <button
                key={format.value}
                onClick={() => {
                  onDownload(format.value)
                  setIsOpen(false)
                }}
                className="w-full text-left px-3 sm:px-4 py-2 sm:py-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="font-medium text-gray-900 text-sm sm:text-base">{format.label}</div>
                <div className="text-xs sm:text-sm text-gray-600">{format.description}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Backdrop to close dropdown */}
      {isOpen && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}

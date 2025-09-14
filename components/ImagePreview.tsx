'use client'

import { useState } from 'react'
import { Eye, EyeOff, Loader2 } from 'lucide-react'

interface ImagePreviewProps {
  originalImage: string | null
  processedImage: string | null
  isProcessing: boolean
}

export default function ImagePreview({ 
  originalImage, 
  processedImage, 
  isProcessing 
}: ImagePreviewProps) {
  const [showOriginal, setShowOriginal] = useState(true)

  if (!originalImage && !processedImage) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
        <div className="text-center">
          <div className="p-3 bg-gray-100 rounded-full w-fit mx-auto mb-4">
            <Eye className="h-6 w-6 text-gray-400" />
          </div>
          <p className="text-gray-500">Upload an image to see the preview</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Toggle Button */}
      {originalImage && processedImage && (
        <div className="flex justify-center">
          <button
            onClick={() => setShowOriginal(!showOriginal)}
            className="btn-secondary flex items-center space-x-2"
          >
            {showOriginal ? (
              <>
                <EyeOff className="h-4 w-4" />
                <span>Show Enhanced</span>
              </>
            ) : (
              <>
                <Eye className="h-4 w-4" />
                <span>Show Original</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Image Display */}
      <div className="relative">
        {isProcessing ? (
          <div className="flex items-center justify-center h-64 bg-gray-50 rounded-xl">
            <div className="text-center">
              <Loader2 className="h-8 w-8 text-primary-600 animate-spin mx-auto mb-4" />
              <p className="text-gray-600">Processing your image...</p>
            </div>
          </div>
        ) : (
          <div className="relative">
            <img
              src={showOriginal ? originalImage : processedImage}
              alt={showOriginal ? 'Original image' : 'Enhanced image'}
              className="w-full h-64 object-cover rounded-xl shadow-lg"
            />
            
            {/* Overlay Labels */}
            <div className="absolute top-4 left-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                showOriginal 
                  ? 'bg-gray-800 text-white' 
                  : 'bg-primary-600 text-white'
              }`}>
                {showOriginal ? 'Original' : 'Enhanced'}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Side-by-side comparison when both images are available */}
      {originalImage && processedImage && !isProcessing && (
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="relative">
            <img
              src={originalImage}
              alt="Original"
              className="w-full h-32 object-cover rounded-lg shadow-md"
            />
            <div className="absolute top-2 left-2">
              <span className="px-2 py-1 bg-gray-800 text-white text-xs rounded-full">
                Original
              </span>
            </div>
          </div>
          <div className="relative">
            <img
              src={processedImage}
              alt="Enhanced"
              className="w-full h-32 object-cover rounded-lg shadow-md"
            />
            <div className="absolute top-2 left-2">
              <span className="px-2 py-1 bg-primary-600 text-white text-xs rounded-full">
                Enhanced
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

'use client'

import { useCallback, useState } from 'react'
import { Upload, Image as ImageIcon } from 'lucide-react'

interface ImageUploadProps {
  onImageUpload: (file: File) => void
}

export default function ImageUpload({ onImageUpload }: ImageUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    
    const files = Array.from(e.dataTransfer.files)
    const imageFile = files.find(file => file.type.startsWith('image/'))
    
    if (imageFile) {
      onImageUpload(imageFile)
    }
  }, [onImageUpload])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith('image/')) {
      onImageUpload(file)
    }
  }, [onImageUpload])

  return (
    <div
      className={`upload-area ${isDragOver ? 'dragover' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center space-y-4">
        <div className="p-4 bg-primary-100 rounded-full">
          {isDragOver ? (
            <Upload className="h-8 w-8 text-primary-600 animate-pulse" />
          ) : (
            <ImageIcon className="h-8 w-8 text-primary-600" />
          )}
        </div>
        
        <div>
          <p className="text-lg font-medium text-gray-900 mb-2">
            {isDragOver ? 'Drop your image here' : 'Choose an image to enhance'}
          </p>
          <p className="text-sm text-gray-600 mb-4">
            Supports PNG, JPG, and JPEG formats
          </p>
        </div>
        
        <label className="btn-primary cursor-pointer inline-flex items-center space-x-2">
          <Upload className="h-4 w-4" />
          <span>Select File</span>
          <input
            type="file"
            accept="image/png,image/jpeg,image/jpg"
            onChange={handleFileSelect}
            className="hidden"
          />
        </label>
      </div>
    </div>
  )
}

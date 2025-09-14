'use client'

import { useState, useCallback } from 'react'
import { Upload, Download, Camera, Sparkles, Loader2 } from 'lucide-react'
import ImageUpload from '@/components/ImageUpload'
import ImagePreview from '@/components/ImagePreview'
import DownloadButton from '@/components/DownloadButton'

export default function Home() {
  const [originalImage, setOriginalImage] = useState<string | null>(null)
  const [processedImage, setProcessedImage] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [processingProgress, setProcessingProgress] = useState(0)

  const handleImageUpload = useCallback((file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      setOriginalImage(e.target?.result as string)
      setProcessedImage(null) // Reset processed image
    }
    reader.readAsDataURL(file)
  }, [])

  const handleProcessImage = async () => {
    if (!originalImage) return

    setIsProcessing(true)
    setProcessingProgress(0)

    try {
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setProcessingProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + Math.random() * 20
        })
      }, 500)

      const response = await fetch('/api/process-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: originalImage }),
      })

      if (!response.ok) {
        throw new Error('Failed to process image')
      }

      const data = await response.json()
      setProcessedImage(data.processedImage)
      setProcessingProgress(100)
      
      clearInterval(progressInterval)
    } catch (error) {
      console.error('Error processing image:', error)
      alert('Failed to process image. Please try again.')
    } finally {
      setIsProcessing(false)
      setTimeout(() => setProcessingProgress(0), 1000)
    }
  }

  const handleDownload = (format: 'png' | 'jpg' | 'jpeg') => {
    if (!processedImage) return

    const link = document.createElement('a')
    link.href = processedImage
    link.download = `enhanced-image.${format}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="glass-effect border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-center space-x-3">
            <div className="p-2 bg-primary-100 rounded-xl">
              <Camera className="h-8 w-8 text-primary-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">AI Camera</h1>
              <p className="text-gray-600">Transform your photos with iPhone-style enhancement</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="space-y-6">
            <div className="glass-effect rounded-2xl p-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  Upload Your Photo
                </h2>
                <p className="text-gray-600">
                  Drag and drop or click to select an image
                </p>
              </div>
              
              <ImageUpload onImageUpload={handleImageUpload} />
              
              {originalImage && (
                <div className="mt-6 animate-slide-up">
                  <button
                    onClick={handleProcessImage}
                    disabled={isProcessing}
                    className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-5 w-5" />
                        <span>Enhance with AI</span>
                      </>
                    )}
                  </button>
                  
                  {isProcessing && (
                    <div className="mt-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Processing your image...</span>
                        <span>{Math.round(processingProgress)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${processingProgress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Preview Section */}
          <div className="space-y-6">
            <div className="glass-effect rounded-2xl p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
                Preview Results
              </h2>
              
              <ImagePreview 
                originalImage={originalImage}
                processedImage={processedImage}
                isProcessing={isProcessing}
              />
              
              {processedImage && (
                <div className="mt-6 animate-slide-up">
                  <DownloadButton onDownload={handleDownload} />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16 glass-effect rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
            AI-Powered Enhancement Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="p-3 bg-primary-100 rounded-xl w-fit mx-auto mb-4">
                <Sparkles className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Enhanced Sharpness</h3>
              <p className="text-gray-600 text-sm">
                AI-powered sharpening for crystal-clear details
              </p>
            </div>
            <div className="text-center">
              <div className="p-3 bg-primary-100 rounded-xl w-fit mx-auto mb-4">
                <Camera className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">iPhone Color Science</h3>
              <p className="text-gray-600 text-sm">
                Balanced colors and natural tone mapping
              </p>
            </div>
            <div className="text-center">
              <div className="p-3 bg-primary-100 rounded-xl w-fit mx-auto mb-4">
                <Download className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">High Quality Output</h3>
              <p className="text-gray-600 text-sm">
                Download in PNG, JPG, or JPEG format
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 glass-effect border-t border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>Powered by open-source AI models • Built with Next.js and Tailwind CSS</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

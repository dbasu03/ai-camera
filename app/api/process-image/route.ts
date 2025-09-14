import { NextRequest, NextResponse } from 'next/server'
import { 
  enhanceImage, 
  validateImage, 
  getImageMetadata, 
  base64ToBuffer, 
  bufferToBase64 
} from '@/lib/imageUtils'

interface ProcessImageResponse {
  success: boolean
  processedImage: string
  originalFormat: string
  originalSize: {
    width: number
    height: number
  }
  enhancedSize: number
}

// iPhone-style enhancement using Sharp image processing
// This provides high-quality enhancement without external API dependencies

export async function POST(request: NextRequest) {
  try {
    const { image } = await request.json()
    
    if (!image) {
      return NextResponse.json(
        { error: 'No image provided' },
        { status: 400 }
      )
    }

    // Convert base64 to buffer
    const imageBuffer = base64ToBuffer(image)

    // Validate image
    const validation = validateImage(imageBuffer, 10) // 10MB limit
    if (!validation.isValid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      )
    }

    // Get original metadata
    const metadata = await getImageMetadata(imageBuffer)

    // Process image with AI enhancement
    const enhancedBuffer = await enhanceImage(imageBuffer, {
      brightness: 1.1,
      saturation: 1.2,
      sharpness: 1.5,
      contrast: 1.1,
      noiseReduction: true
    })
    
    // Convert enhanced image back to base64
    const enhancedDataUrl = bufferToBase64(enhancedBuffer, 'image/png')

    const response: ProcessImageResponse = {
      success: true,
      processedImage: enhancedDataUrl,
      originalFormat: metadata.format,
      originalSize: {
        width: metadata.width,
        height: metadata.height
      },
      enhancedSize: enhancedBuffer.length
    }

    return NextResponse.json(response)

  } catch (error) {
    console.error('Error processing image:', error)
    return NextResponse.json(
      { error: 'Failed to process image' },
      { status: 500 }
    )
  }
}

// Handle OPTIONS request for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}

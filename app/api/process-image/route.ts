import { NextRequest, NextResponse } from 'next/server'
import { HfInference } from '@huggingface/inference'
import { 
  enhanceImage, 
  validateImage, 
  getImageMetadata, 
  base64ToBuffer, 
  bufferToBase64 
} from '@/lib/imageUtils'

// Initialize Hugging Face inference
const hf = new HfInference(process.env.HUGGINGFACE_API_KEY)

// Alternative: Use Hugging Face model (uncomment and configure as needed)
async function enhanceImageWithHF(imageBuffer: Buffer): Promise<Buffer> {
  try {
    // Example using a real Hugging Face model
    // Replace with actual model ID from Hugging Face Hub
    const modelId = 'stabilityai/stable-diffusion-xl-base-1.0' // Placeholder
    
    // Convert buffer to base64 for HF API
    const base64Image = imageBuffer.toString('base64')
    const dataUrl = `data:image/png;base64,${base64Image}`
    
    // Note: This is a placeholder - you'd need to find an appropriate
    // image enhancement model on Hugging Face Hub
    const result = await hf.imageToImage({
      model: modelId,
      inputs: dataUrl,
      parameters: {
        strength: 0.8,
        guidance_scale: 7.5,
      }
    })
    
    // Convert result back to buffer
    const response = await fetch(result)
    const arrayBuffer = await response.arrayBuffer()
    return Buffer.from(arrayBuffer)
  } catch (error) {
    console.error('Error with HF model:', error)
    // Fallback to our enhancement function
    return enhanceImage(imageBuffer)
  }
}

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

    return NextResponse.json({
      success: true,
      processedImage: enhancedDataUrl,
      originalFormat: metadata.format,
      originalSize: {
        width: metadata.width,
        height: metadata.height
      },
      enhancedSize: enhancedBuffer.length
    })

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

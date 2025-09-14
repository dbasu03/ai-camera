import sharp from 'sharp'

export interface ImageMetadata {
  width: number
  height: number
  format: string
  size: number
}

export interface EnhancementOptions {
  brightness?: number
  saturation?: number
  sharpness?: number
  contrast?: number
  noiseReduction?: boolean
}

export type ImageFormat = 'png' | 'jpg' | 'jpeg'

/**
 * Get image metadata without processing
 */
export async function getImageMetadata(buffer: Buffer): Promise<ImageMetadata> {
  const metadata = await sharp(buffer).metadata()
  
  return {
    width: metadata.width || 0,
    height: metadata.height || 0,
    format: metadata.format || 'unknown',
    size: buffer.length
  }
}

/**
 * Validate image format and size
 */
export function validateImage(buffer: Buffer, maxSizeMB: number = 10): {
  isValid: boolean
  error?: string
} {
  const maxSizeBytes = maxSizeMB * 1024 * 1024
  
  if (buffer.length > maxSizeBytes) {
    return {
      isValid: false,
      error: `Image size exceeds ${maxSizeMB}MB limit`
    }
  }
  
  // Check for valid image headers
  const validHeaders = [
    Buffer.from([0xFF, 0xD8, 0xFF]), // JPEG
    Buffer.from([0x89, 0x50, 0x4E, 0x47]), // PNG
    Buffer.from([0x47, 0x49, 0x46]), // GIF
  ]
  
  const hasValidHeader = validHeaders.some(header => 
    buffer.subarray(0, header.length).equals(header)
  )
  
  if (!hasValidHeader) {
    return {
      isValid: false,
      error: 'Invalid image format'
    }
  }
  
  return { isValid: true }
}

/**
 * Apply iPhone-style enhancement to an image
 */
export async function enhanceImage(
  buffer: Buffer, 
  options: EnhancementOptions = {}
): Promise<Buffer> {
  try {
    const {
      brightness = 1.1,
      saturation = 1.2,
      sharpness = 1.5,
      contrast = 1.1,
      noiseReduction = true
    } = options

    // Create a new sharp instance to avoid any potential issues
    const image = sharp(buffer)

    // Resize if needed (maintain aspect ratio, max 2048px)
    const resized = image.resize(2048, 2048, {
      fit: 'inside',
      withoutEnlargement: false
    })

    // Apply iPhone-style enhancements
    const enhanced = resized
      .modulate({
        brightness,
        saturation,
        hue: 0
      })
      .linear(contrast, -(128 * contrast) + 128) // Adjust contrast
      .sharpen({
        sigma: sharpness,
        m1: 0.5,
        m2: 2.0,
        x1: 2.0,
        y2: 10.0
      })

    // Noise reduction (simulated with blur + sharpen)
    const final = noiseReduction 
      ? enhanced.blur(0.3).sharpen({ sigma: 1.0 }).normalize()
      : enhanced.normalize()

    // Convert to high-quality PNG
    return final.png({ quality: 95 }).toBuffer()
  } catch (error) {
    console.error('Error in enhanceImage:', error)
    // Fallback: return original buffer
    return buffer
  }
}

/**
 * Convert image to specific format
 */
export async function convertImageFormat(
  buffer: Buffer,
  format: ImageFormat,
  quality: number = 95
): Promise<Buffer> {
  try {
    const image = sharp(buffer)

    switch (format) {
      case 'png':
        return image.png({ quality }).toBuffer()
      case 'jpg':
      case 'jpeg':
        return image.jpeg({ quality, progressive: true }).toBuffer()
      default:
        throw new Error(`Unsupported format: ${format}`)
    }
  } catch (error) {
    console.error('Error in convertImageFormat:', error)
    // Fallback: return original buffer
    return buffer
  }
}

/**
 * Create a thumbnail of the image
 */
export async function createThumbnail(
  buffer: Buffer,
  size: number = 300
): Promise<Buffer> {
  try {
    return sharp(buffer)
      .resize(size, size, {
        fit: 'cover',
        position: 'center'
      })
      .jpeg({ quality: 80 })
      .toBuffer()
  } catch (error) {
    console.error('Error in createThumbnail:', error)
    // Fallback: return original buffer
    return buffer
  }
}

/**
 * Convert base64 data URL to buffer
 */
export function base64ToBuffer(dataUrl: string): Buffer {
  const base64Data = dataUrl.replace(/^data:image\/[a-z]+;base64,/, '')
  return Buffer.from(base64Data, 'base64')
}

/**
 * Convert buffer to base64 data URL
 */
export function bufferToBase64(buffer: Buffer, mimeType: string = 'image/png'): string {
  const base64 = buffer.toString('base64')
  return `data:${mimeType};base64,${base64}`
}

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
  const {
    brightness = 1.1,
    saturation = 1.2,
    sharpness = 1.5,
    contrast = 1.1,
    noiseReduction = true
  } = options

  let pipeline = sharp(buffer)

  // Resize if needed (maintain aspect ratio, max 2048px)
  pipeline = pipeline.resize(2048, 2048, {
    fit: 'inside',
    withoutEnlargement: false
  })

  // Apply iPhone-style enhancements
  pipeline = pipeline
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
  if (noiseReduction) {
    pipeline = pipeline
      .blur(0.3)
      .sharpen({ sigma: 1.0 })
  }

  // Normalize colors
  pipeline = pipeline.normalize()

  // Convert to high-quality PNG
  return pipeline.png({ quality: 95 }).toBuffer()
}

/**
 * Convert image to specific format
 */
export async function convertImageFormat(
  buffer: Buffer,
  format: 'png' | 'jpg' | 'jpeg',
  quality: number = 95
): Promise<Buffer> {
  let pipeline = sharp(buffer)

  switch (format) {
    case 'png':
      return pipeline.png({ quality }).toBuffer()
    case 'jpg':
    case 'jpeg':
      return pipeline.jpeg({ quality, progressive: true }).toBuffer()
    default:
      throw new Error(`Unsupported format: ${format}`)
  }
}

/**
 * Create a thumbnail of the image
 */
export async function createThumbnail(
  buffer: Buffer,
  size: number = 300
): Promise<Buffer> {
  return sharp(buffer)
    .resize(size, size, {
      fit: 'cover',
      position: 'center'
    })
    .jpeg({ quality: 80 })
    .toBuffer()
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

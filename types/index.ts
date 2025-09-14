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

export interface ProcessImageResponse {
  success: boolean
  processedImage: string
  originalFormat: string
  originalSize: {
    width: number
    height: number
  }
  enhancedSize: number
}

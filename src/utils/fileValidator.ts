import { VALIDATION_RULES } from './constants'

export interface ValidationResult {
  valid: boolean
  error?: string
}

export function validateFile(file: File): ValidationResult {
  if (!VALIDATION_RULES.ALLOWED_FILE_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: '不支持的文件格式，请上传图片文件（JPG/PNG/GIF/WebP）',
    }
  }

  if (file.size > VALIDATION_RULES.MAX_FILE_SIZE) {
    return {
      valid: false,
      error: '图片超过3MB，请压缩后重新上传',
    }
  }

  return { valid: true }
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB'
}

export function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = () => reject(new Error('文件读取失败'))
    reader.readAsDataURL(file)
  })
}

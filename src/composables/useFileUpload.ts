import { ref } from 'vue'
import { validateFile, readFileAsDataURL } from '@/utils/fileValidator'
import { DEFAULT_AVATAR } from '@/utils/constants'

export function useFileUpload() {
  const previewUrl = ref<string | null>(null)
  const isDragging = ref(false)
  const error = ref<string | null>(null)
  const isLoading = ref(false)

  const handleFile = async (file: File): Promise<boolean> => {
    error.value = null
    isLoading.value = true

    const validation = validateFile(file)
    if (!validation.valid) {
      error.value = validation.error || '文件验证失败'
      previewUrl.value = DEFAULT_AVATAR
      isLoading.value = false
      return false
    }

    try {
      const dataUrl = await readFileAsDataURL(file)
      previewUrl.value = dataUrl
      isLoading.value = false
      return true
    } catch {
      error.value = '头像读取失败，已显示默认剪影'
      previewUrl.value = DEFAULT_AVATAR
      isLoading.value = false
      return false
    }
  }

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    isDragging.value = true
  }

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    isDragging.value = false
  }

  const handleDrop = async (e: DragEvent): Promise<boolean> => {
    e.preventDefault()
    e.stopPropagation()
    isDragging.value = false

    const files = e.dataTransfer?.files
    if (!files || files.length === 0) return false

    return await handleFile(files[0])
  }

  const handleInputChange = async (e: Event): Promise<boolean> => {
    const target = e.target as HTMLInputElement
    const files = target.files
    if (!files || files.length === 0) return false

    const result = await handleFile(files[0])
    target.value = ''
    return result
  }

  const clearAvatar = () => {
    previewUrl.value = null
    error.value = null
  }

  return {
    previewUrl,
    isDragging,
    error,
    isLoading,
    handleFile,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleInputChange,
    clearAvatar,
  }
}

import { ref, computed } from 'vue'
import { VALIDATION_RULES, type ToastMessage, type ToastType } from '@/utils/constants'

export function useFormValidation() {
  const nickname = ref('')
  const selectedTags = ref<string[]>([])
  const toasts = ref<ToastMessage[]>([])

  const nicknameError = computed(() => {
    if (!nickname.value.trim()) return '请输入昵称'
    if (nickname.value.length > VALIDATION_RULES.MAX_NICKNAME_LENGTH) {
      return `昵称不能超过${VALIDATION_RULES.MAX_NICKNAME_LENGTH}个字符`
    }
    return null
  })

  const tagsError = computed(() => {
    if (selectedTags.value.length < VALIDATION_RULES.MIN_TAGS_COUNT) {
      return `请选择至少${VALIDATION_RULES.MIN_TAGS_COUNT}个性格标签`
    }
    return null
  })

  const isFormValid = computed(() => {
    return !nicknameError.value && !tagsError.value
  })

  const updateNickname = (value: string) => {
    if (value.length <= VALIDATION_RULES.MAX_NICKNAME_LENGTH) {
      nickname.value = value
    }
  }

  const toggleTag = (tagId: string): { success: boolean; isOverLimit: boolean } => {
    const index = selectedTags.value.indexOf(tagId)
    if (index > -1) {
      selectedTags.value.splice(index, 1)
      return { success: true, isOverLimit: false }
    }

    if (selectedTags.value.length >= VALIDATION_RULES.MAX_TAGS_COUNT) {
      return { success: false, isOverLimit: true }
    }

    selectedTags.value.push(tagId)
    return { success: true, isOverLimit: false }
  }

  const showToast = (message: string, type: ToastType = 'warning', duration = 3000) => {
    const id = Date.now().toString()
    toasts.value.push({ id, message, type, duration })

    setTimeout(() => {
      const idx = toasts.value.findIndex(t => t.id === id)
      if (idx > -1) toasts.value.splice(idx, 1)
    }, duration)
  }

  const removeToast = (id: string) => {
    const idx = toasts.value.findIndex(t => t.id === id)
    if (idx > -1) toasts.value.splice(idx, 1)
  }

  const resetForm = () => {
    nickname.value = ''
    selectedTags.value = []
    toasts.value = []
  }

  return {
    nickname,
    selectedTags,
    toasts,
    nicknameError,
    tagsError,
    isFormValid,
    updateNickname,
    toggleTag,
    showToast,
    removeToast,
    resetForm,
  }
}

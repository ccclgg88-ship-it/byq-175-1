export interface PersonalityTag {
  id: string
  label: string
  icon: string
}

export const VALIDATION_RULES = {
  MAX_NICKNAME_LENGTH: 12,
  MIN_TAGS_COUNT: 3,
  MAX_TAGS_COUNT: 3,
  MAX_FILE_SIZE: 3 * 1024 * 1024,
  ALLOWED_FILE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
} as const

export const PERSONALITY_TAGS: PersonalityTag[] = [
  { id: '1', label: '浪漫主义', icon: '🌹' },
  { id: '2', label: '理性派', icon: '📊' },
  { id: '3', label: '冒险家', icon: '🗺️' },
  { id: '4', label: '艺术家', icon: '🎨' },
  { id: '5', label: '社交达人', icon: '🎉' },
  { id: '6', label: '独居者', icon: '🏠' },
  { id: '7', label: '工作狂', icon: '💼' },
  { id: '8', label: '躺平大师', icon: '😴' },
  { id: '9', label: '美食家', icon: '🍜' },
  { id: '10', label: '运动健将', icon: '🏃' },
  { id: '11', label: '文艺青年', icon: '📚' },
  { id: '12', label: '科技极客', icon: '💻' }
]

export const DEFAULT_AVATAR = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMjAwIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImJnIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj48c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojNmI0ZWZmO3N0b3Atb3BhY2l0eTowLjMiIC8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojMGEwZTI3O3N0b3Atb3BhY2l0eTowLjggIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9InVybCgjYmcpIi8+PGNpcmNsZSBjeD0iMTAwIiBjeT0iNzUiIHI9IjM1IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMikiLz48ZWxsaXBzZSBjeD0iMTAwIiBjeT0iMTYwIiByeD0iNTAiIHJ5PSIzNSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjE1KSIvPjx0ZXh0IHg9IjEwMCIgeT0iODUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9InJnYmEoMjU1LDIxNSwwLDAuNikgZm9udC1zaXplPSIzMCIgZm9udC1mYW1pbHk9InNlcmlmIj4/PC90ZXh0Pjwvc3ZnPg=='

export type LoadingPhase = 'idle' | 'opening' | 'loading' | 'complete'

export type ToastType = 'success' | 'error' | 'warning'

export interface ToastMessage {
  id: string
  message: string
  type: ToastType
  duration?: number
}

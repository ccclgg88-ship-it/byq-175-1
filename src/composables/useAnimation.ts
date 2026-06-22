import { ref, onUnmounted } from 'vue'
import type { LoadingPhase } from '@/utils/constants'

export function useAnimation() {
  const loadingPhase = ref<LoadingPhase>('idle')
  const stars = ref<{ x: number; y: number; delay: number; size: number }[]>([])
  let animationTimer: ReturnType<typeof setTimeout> | null = null

  const generateStars = (count: number) => {
    const newStars = []
    for (let i = 0; i < count; i++) {
      newStars.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 3,
        size: Math.random() * 2 + 1,
      })
    }
    stars.value = newStars
  }

  const startTravelSequence = (onComplete?: () => void) => {
    if (loadingPhase.value !== 'idle') return

    loadingPhase.value = 'opening'

    animationTimer = setTimeout(() => {
      loadingPhase.value = 'loading'
    }, 2000)

    const totalTime = 2000 + 5000
    animationTimer = setTimeout(() => {
      loadingPhase.value = 'complete'
      onComplete?.()
    }, totalTime)
  }

  const resetPhase = () => {
    if (animationTimer) {
      clearTimeout(animationTimer)
      animationTimer = null
    }
    loadingPhase.value = 'idle'
  }

  const isInProgress = () => {
    return loadingPhase.value === 'opening' || loadingPhase.value === 'loading'
  }

  onUnmounted(() => {
    if (animationTimer) {
      clearTimeout(animationTimer)
    }
  })

  return {
    loadingPhase,
    stars,
    generateStars,
    startTravelSequence,
    resetPhase,
    isInProgress,
  }
}

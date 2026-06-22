<script setup lang="ts">
import { computed } from 'vue'
import type { LoadingPhase } from '@/utils/constants'

const props = defineProps<{
  disabled: boolean
  loadingPhase: LoadingPhase
}>()

const emit = defineEmits<{
  (e: 'click'): void
}>()

const isLoading = computed(() => {
  return props.loadingPhase === 'opening' || props.loadingPhase === 'loading'
})

const buttonText = computed(() => {
  if (props.loadingPhase === 'opening') return '门扉开启中...'
  if (props.loadingPhase === 'loading') return '穿越中...'
  if (props.loadingPhase === 'complete') return '穿越完成 ✨'
  return '一秒穿越'
})
</script>

<template>
  <button
    class="travel-button"
    :class="{ disabled: disabled || isLoading }"
    :disabled="disabled || isLoading"
    @click="emit('click')"
  >
    <span class="button-content">
      <span class="button-icon">🌙</span>
      <span class="button-text font-cinzel tracking-widest">{{ buttonText }}</span>
      <span class="button-icon">✨</span>
    </span>
    <div class="button-glow"></div>
  </button>
</template>

<style scoped>
.travel-button {
  position: relative;
  padding: 18px 56px;
  background: linear-gradient(135deg, #ffd700 0%, #ff8c00 50%, #ffd700 100%);
  background-size: 200% 100%;
  border: none;
  border-radius: 50px;
  color: #0a0e27;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow:
    0 0 30px rgba(255, 215, 0, 0.4),
    0 8px 32px rgba(255, 215, 0, 0.2);
  animation: shimmer 3s ease-in-out infinite;
}

@keyframes shimmer {
  0%, 100% { background-position: 200% 0; }
  50% { background-position: -200% 0; }
}

.travel-button:hover:not(.disabled) {
  transform: translateY(-2px);
  box-shadow:
    0 0 50px rgba(255, 215, 0, 0.6),
    0 12px 40px rgba(255, 215, 0, 0.3);
}

.travel-button:active:not(.disabled) {
  transform: translateY(0);
}

.travel-button.disabled {
  background: linear-gradient(135deg, #3a3a5a 0%, #2a2a4a 100%);
  color: rgba(255, 255, 255, 0.4);
  opacity: 0.6;
  cursor: not-allowed;
  box-shadow: none;
  animation: none;
}

.button-content {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.button-icon {
  font-size: 20px;
}

.button-text {
  font-size: 18px;
  letter-spacing: 0.15em;
}

.button-glow {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  transform: translateX(-100%);
  transition: transform 0.6s ease;
}

.travel-button:hover:not(.disabled) .button-glow {
  transform: translateX(100%);
}
</style>

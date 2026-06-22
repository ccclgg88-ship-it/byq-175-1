<script setup lang="ts">
import type { ToastMessage as ToastMsg } from '@/utils/constants'

defineProps<{
  toasts: ToastMsg[]
}>()

const emit = defineEmits<{
  (e: 'remove', id: string): void
}>()

const getToastClass = (type: string) => {
  const base = 'toast-message px-5 py-3 rounded-lg font-noto text-sm shadow-2xl backdrop-blur-sm flex items-center gap-2 min-w-[240px]'
  switch (type) {
    case 'success':
      return `${base} bg-gradient-to-r from-cosmos-cyan/20 to-orbit-purple/20 border border-cosmos-cyan/50 text-cosmos-cyan`
    case 'error':
      return `${base} bg-gradient-to-r from-nebula-pink/20 to-red-500/20 border border-nebula-pink/50 text-nebula-pink`
    case 'warning':
    default:
      return `${base} bg-gradient-to-r from-door-gold/20 to-orbit-purple/20 border border-door-gold/50 text-door-gold`
  }
}

const getIcon = (type: string) => {
  switch (type) {
    case 'success':
      return '✨'
    case 'error':
      return '⚠️'
    case 'warning':
    default:
      return '💫'
  }
}
</script>

<template>
  <div class="fixed top-8 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-3">
    <div
      v-for="toast in toasts"
      :key="toast.id"
      :class="getToastClass(toast.type)"
      @click="emit('remove', toast.id)"
    >
      <span class="text-lg">{{ getIcon(toast.type) }}</span>
      <span>{{ toast.message }}</span>
    </div>
  </div>
</template>

<style scoped>
</style>

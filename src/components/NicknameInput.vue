<script setup lang="ts">
import { computed } from 'vue'
import { VALIDATION_RULES } from '@/utils/constants'

const props = defineProps<{
  modelValue: string
  error?: string | null
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const charCount = computed(() => props.modelValue.length)
const isOverLimit = computed(() => charCount.value >= VALIDATION_RULES.MAX_NICKNAME_LENGTH)

const handleInput = (e: Event) => {
  const target = e.target as HTMLInputElement
  let value = target.value
  if (value.length > VALIDATION_RULES.MAX_NICKNAME_LENGTH) {
    value = value.slice(0, VALIDATION_RULES.MAX_NICKNAME_LENGTH)
  }
  emit('update:modelValue', value)
}
</script>

<template>
  <div class="nickname-wrapper">
    <label class="block text-door-gold/80 text-sm mb-2 font-noto tracking-wider">
      你的名字
    </label>
    <div class="relative">
      <input
        type="text"
        :value="modelValue"
        @input="handleInput"
        class="input-underline w-full text-white text-2xl py-2 font-noto placeholder-white/30"
        :placeholder="'请输入昵称...'"
        maxlength="12"
      />
      <div class="absolute right-0 bottom-2 text-xs font-noto"
           :class="isOverLimit ? 'text-nebula-pink' : 'text-white/40'">
        {{ charCount }}/{{ VALIDATION_RULES.MAX_NICKNAME_LENGTH }}
      </div>
    </div>
    <div v-if="error" class="mt-2 text-nebula-pink text-xs font-noto animate-fade-in-up">
      {{ error }}
    </div>
  </div>
</template>

<style scoped>
.nickname-wrapper {
  width: 100%;
}
</style>

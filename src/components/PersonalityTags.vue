<script setup lang="ts">
import { ref } from 'vue'
import { PERSONALITY_TAGS, VALIDATION_RULES } from '@/utils/constants'

const props = defineProps<{
  modelValue: string[]
  error?: string | null
  disabled?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string[]): void
  (e: 'overLimit'): void
}>()

const shakingTagId = ref<string | null>(null)

const isSelected = (tagId: string) => props.modelValue.includes(tagId)

const handleTagClick = (tagId: string) => {
  if (props.disabled) return

  const currentIndex = props.modelValue.indexOf(tagId)
  if (currentIndex > -1) {
    const newValue = [...props.modelValue]
    newValue.splice(currentIndex, 1)
    emit('update:modelValue', newValue)
    return
  }

  if (props.modelValue.length >= VALIDATION_RULES.MAX_TAGS_COUNT) {
    shakingTagId.value = tagId
    emit('overLimit')
    setTimeout(() => {
      shakingTagId.value = null
    }, 500)
    return
  }

  emit('update:modelValue', [...props.modelValue, tagId])
}
</script>

<template>
  <div class="tags-wrapper">
    <div class="flex items-center justify-between mb-3">
      <label class="text-door-gold/80 text-sm font-noto tracking-wider">
        性格标签
      </label>
      <span class="text-xs font-noto" :class="modelValue.length >= VALIDATION_RULES.MIN_TAGS_COUNT ? 'text-door-gold' : 'text-white/40'">
        已选 {{ modelValue.length }}/{{ VALIDATION_RULES.MAX_TAGS_COUNT }}
      </span>
    </div>
    <div class="tags-grid">
      <div
        v-for="tag in PERSONALITY_TAGS"
        :key="tag.id"
        class="tag-item"
        :class="{
          selected: isSelected(tag.id),
          shake: shakingTagId === tag.id,
          disabled: disabled
        }"
        @click="handleTagClick(tag.id)"
      >
        <span class="tag-icon">{{ tag.icon }}</span>
        <span class="tag-label font-noto text-sm">{{ tag.label }}</span>
      </div>
    </div>
    <div v-if="error" class="mt-3 text-nebula-pink text-xs font-noto animate-fade-in-up">
      {{ error }}
    </div>
  </div>
</template>

<style scoped>
.tags-wrapper {
  width: 100%;
}

.tags-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.tag-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 14px 8px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.03);
  min-height: 72px;
  user-select: none;
}

.tag-item.disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

.tag-icon {
  font-size: 22px;
}

.tag-label {
  color: rgba(255, 255, 255, 0.8);
}

.tag-item.selected {
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.25), rgba(107, 78, 255, 0.25));
  border-color: #ffd700;
  box-shadow: 0 0 25px rgba(255, 215, 0, 0.5), inset 0 0 15px rgba(255, 215, 0, 0.1);
  transform: scale(1.05);
}

.tag-item.selected .tag-label {
  color: #ffd700;
  font-weight: 500;
  text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
}

.tag-item.selected .tag-icon {
  filter: drop-shadow(0 0 8px rgba(255, 215, 0, 0.6));
}

.tag-item.shake {
  animation: tagShake 0.5s ease-in-out;
  border-color: #ff6b9d;
  box-shadow: 0 0 20px rgba(255, 107, 157, 0.5);
}

@keyframes tagShake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
  20%, 40%, 60%, 80% { transform: translateX(5px); }
}

@media (max-width: 768px) {
  .tags-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>

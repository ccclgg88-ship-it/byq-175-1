<script setup lang="ts">
import { computed, ref } from 'vue'
import { useFileUpload } from '@/composables/useFileUpload'
import { DEFAULT_AVATAR } from '@/utils/constants'

const emit = defineEmits<{
  (e: 'avatarChange', url: string | null): void
  (e: 'error', message: string): void
}>()

const {
  previewUrl,
  isDragging,
  error,
  handleDragOver,
  handleDragLeave,
  handleDrop,
  handleInputChange,
} = useFileUpload()

const fileInputRef = ref<HTMLInputElement | null>(null)

const displayUrl = computed(() => previewUrl.value || DEFAULT_AVATAR)

const triggerUpload = () => {
  fileInputRef.value?.click()
}

const onFileChange = async (e: Event) => {
  const result = await handleInputChange(e)
  if (result) {
    emit('avatarChange', previewUrl.value)
  } else if (error.value) {
    emit('error', error.value)
  }
}

const onDrop = async (e: DragEvent) => {
  const result = await handleDrop(e)
  if (result) {
    emit('avatarChange', previewUrl.value)
  } else if (error.value) {
    emit('error', error.value)
  }
}
</script>

<template>
  <div class="avatar-upload-wrapper">
    <label class="block text-door-gold/80 text-sm mb-4 font-noto tracking-wider text-center">
      锚定此刻的你
    </label>
    <div
      class="avatar-upload-area"
      :class="{ dragging: isDragging }"
      @dragover="handleDragOver"
      @dragleave="handleDragLeave"
      @drop="onDrop"
      @click="triggerUpload"
    >
      <div class="avatar-frame" :class="{ dragging: isDragging }">
        <div class="avatar-inner">
          <img
            :src="displayUrl"
            alt="avatar"
            class="avatar-image"
            @error="($event.target as HTMLImageElement).src = DEFAULT_AVATAR"
          />
          <div class="avatar-overlay">
            <span class="upload-icon">📷</span>
            <span class="upload-text font-noto text-xs">点击或拖拽上传</span>
          </div>
        </div>
      </div>
      <input
        ref="fileInputRef"
        type="file"
        accept="image/*"
        class="hidden"
        @change="onFileChange"
      />
    </div>
    <div v-if="error" class="mt-3 text-nebula-pink text-xs font-noto text-center animate-fade-in-up">
      {{ error }}
    </div>
    <div class="mt-2 text-white/40 text-xs font-noto text-center">
      支持 JPG/PNG/GIF/WebP，最大 3MB
    </div>
  </div>
</template>

<style scoped>
.avatar-upload-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.avatar-upload-area {
  cursor: pointer;
  transition: transform 0.3s ease;
}

.avatar-upload-area:hover {
  transform: scale(1.02);
}

.avatar-inner {
  position: relative;
  width: 160px;
  height: 160px;
  border-radius: 50%;
  overflow: hidden;
  background: linear-gradient(135deg, #1a1f4a, #0a0e27);
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.avatar-overlay {
  position: absolute;
  inset: 0;
  background: rgba(10, 14, 39, 0.7);
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.avatar-upload-area:hover .avatar-overlay,
.avatar-upload-area.dragging .avatar-overlay {
  opacity: 1;
}

.upload-icon {
  font-size: 32px;
}

.upload-text {
  color: #ffd700;
}

.avatar-frame {
  position: relative;
  border-radius: 50%;
  background: linear-gradient(135deg, #ffd700, #6b4eff);
  padding: 4px;
  box-shadow: 0 0 30px rgba(255, 215, 0, 0.4);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  animation: glowPulse 3s ease-in-out infinite;
}

.avatar-frame.dragging {
  animation: glowPulse 0.8s ease-in-out infinite;
  transform: scale(1.08);
  box-shadow: 0 0 50px rgba(255, 215, 0, 0.8), 0 0 80px rgba(107, 78, 255, 0.4);
}

@keyframes glowPulse {
  0%, 100% { box-shadow: 0 0 30px rgba(255, 215, 0, 0.4); }
  50% { box-shadow: 0 0 50px rgba(255, 215, 0, 0.6), 0 0 30px rgba(107, 78, 255, 0.3); }
}
</style>

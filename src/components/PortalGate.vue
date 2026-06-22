<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import AvatarUpload from '@/components/AvatarUpload.vue'
import NicknameInput from '@/components/NicknameInput.vue'
import PersonalityTags from '@/components/PersonalityTags.vue'
import ParallelDoor from '@/components/ParallelDoor.vue'
import TravelButton from '@/components/TravelButton.vue'
import ToastMessage from '@/components/ToastMessage.vue'
import { useAnimation } from '@/composables/useAnimation'
import { useFormValidation } from '@/composables/useFormValidation'

const { loadingPhase, stars, generateStars, startTravelSequence, isInProgress } = useAnimation()

const {
  nickname,
  selectedTags,
  toasts,
  nicknameError,
  tagsError,
  isFormValid,
  updateNickname,
  showToast,
  removeToast,
} = useFormValidation()

const avatarUrl = ref<string | null>(null)
const inputDisabled = computed(() => isInProgress())

onMounted(() => {
  generateStars(80)
})

const handleAvatarChange = (url: string | null) => {
  avatarUrl.value = url
}

const handleAvatarError = (message: string) => {
  showToast(message, 'error')
}

const handleTagsOverLimit = () => {
  showToast('只能选择 3 个性格标签哦', 'warning')
}

const handleTagsUpdate = (val: string[]) => {
  selectedTags.value = val
}

const handleTravel = () => {
  if (!isFormValid.value || isInProgress()) return
  startTravelSequence(() => {
    showToast('穿越完成！你的平行人生已生成 ✨', 'success')
  })
}
</script>

<template>
  <div class="portal-gate">
    <div class="starfield">
      <div
        v-for="(star, index) in stars"
        :key="index"
        class="star"
        :style="{
          left: `${star.x}%`,
          top: `${star.y}%`,
          width: `${star.size}px`,
          height: `${star.size}px`,
          animationDelay: `${star.delay}s`,
        }"
      ></div>
    </div>

    <div class="main-container">
      <header class="page-header">
        <h1 class="font-cinzel text-door-gold text-4xl md:text-5xl tracking-widest">
          平行人生
        </h1>
        <p class="font-noto text-white/60 text-sm md:text-base mt-3 tracking-wider">
          锚定此刻的你，推开另一扇门
        </p>
      </header>

      <div class="content-wrapper">
        <div class="left-panel" :class="{ blured: isInProgress() }">
          <div class="panel-content">
            <AvatarUpload
              @avatar-change="handleAvatarChange"
              @error="handleAvatarError"
            />

            <div class="section-divider"></div>

            <NicknameInput
              :model-value="nickname"
              :error="nicknameError"
              @update:model-value="updateNickname"
            />

            <div class="section-divider"></div>

            <PersonalityTags
              :model-value="selectedTags"
              :error="tagsError"
              :disabled="inputDisabled"
              @update:model-value="handleTagsUpdate"
              @over-limit="handleTagsOverLimit"
            />
          </div>
        </div>

        <div class="right-panel">
          <ParallelDoor :loading-phase="loadingPhase" />
        </div>
      </div>

      <footer class="page-footer">
        <TravelButton
          :disabled="!isFormValid"
          :loading-phase="loadingPhase"
          @click="handleTravel"
        />
        <p class="font-noto text-white/30 text-xs mt-6 tracking-wider">
          每一次选择，都是一次穿越
        </p>
      </footer>
    </div>

    <ToastMessage :toasts="toasts" @remove="removeToast" />
  </div>
</template>

<style scoped>
.portal-gate {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  background: linear-gradient(135deg, #0a0e27 0%, #121838 40%, #1a1f4a 100%);
}

.main-container {
  position: relative;
  z-index: 1;
  width: 100%;
  height: auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 32px 48px;
  max-width: 1600px;
  margin: 0 auto;
}

.page-header {
  text-align: center;
  padding: 16px 0 32px;
  animation: fadeInUp 0.8s ease-out;
}

@keyframes fadeInUp {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}

.content-wrapper {
  flex: 1;
  display: flex;
  flex-direction: row;
  gap: 48px;
  align-items: stretch;
}

.left-panel {
  flex: 0 0 420px;
  display: flex;
  flex-direction: column;
  transition: filter 0.5s ease, opacity 0.5s ease;
  min-height: 680px;
}

.left-panel.blured {
  filter: blur(4px);
  opacity: 0.6;
  pointer-events: none;
}

.panel-content {
  flex: 1;
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 24px;
  padding: 36px 32px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  animation: fadeInUp 0.8s ease-out 0.1s both;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.3);
  overflow-y: auto;
  flex-shrink: 0;
}

.section-divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.2), transparent);
  margin: 20px 0;
}

.right-panel {
  flex: 1;
  min-width: 0;
  min-height: 500px;
  background: rgba(255, 255, 255, 0.015);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 24px;
  padding: 24px;
  position: relative;
  animation: fadeInUp 0.8s ease-out 0.2s both;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.3);
  overflow: hidden;
}

.page-footer {
  text-align: center;
  padding: 32px 0 16px;
  animation: fadeInUp 0.8s ease-out 0.3s both;
}

@media (max-width: 1024px) {
  .left-panel {
    flex: 0 0 380px;
  }
}

@media (max-width: 768px) {
  .main-container {
    padding: 20px 16px;
  }

  .page-header h1 {
    font-size: 2rem;
  }

  .content-wrapper {
    flex-direction: column-reverse;
    gap: 24px;
  }

  .left-panel {
    flex: 0 0 auto;
  }

  .right-panel {
    flex: 0 0 400px;
    min-height: 380px;
  }

  .panel-content {
    padding: 24px 20px;
  }
}
</style>

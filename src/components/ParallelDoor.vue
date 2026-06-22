<script setup lang="ts">
import { computed } from 'vue'
import type { LoadingPhase } from '@/utils/constants'

const props = defineProps<{
  loadingPhase: LoadingPhase
}>()

const isOpening = computed(() => props.loadingPhase === 'opening')
const isLoading = computed(() => props.loadingPhase === 'loading')
const showOrbitActive = computed(() => isOpening.value || isLoading.value)
</script>

<template>
  <div class="door-container">
    <div class="door-left door-panel" :class="{ 'animate-door-open': isOpening }">
      <div class="door-ornament-left"></div>
      <div class="door-inner-decoration">
        <div class="door-runner ring-1"></div>
        <div class="door-runner ring-2"></div>
        <div class="door-runner ring-3"></div>
      </div>
    </div>

    <div class="door-right door-panel" :class="{ 'animate-door-open-right': isOpening }">
      <div class="door-ornament-right"></div>
      <div class="door-inner-decoration">
        <div class="door-runner ring-1"></div>
        <div class="door-runner ring-2"></div>
        <div class="door-runner ring-3"></div>
      </div>
    </div>

    <div class="crack-light" v-if="!showOrbitActive"></div>

    <div class="orbit-container" v-if="showOrbitActive">
      <div class="orbit-core">
        <div class="orbit-ring ring-1"></div>
        <div class="orbit-ring ring-2"></div>
        <div class="orbit-ring ring-3"></div>
        <div class="orbit-center"></div>
      </div>
      <div class="loading-text" v-if="isLoading">
        <p class="font-cinzel text-door-gold text-lg tracking-widest">
          正在编织你的另一种人生…
        </p>
        <div class="dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <p class="door-hint font-noto text-white/50 text-xs mt-4" v-else>
        门扉正在开启…
      </p>
    </div>

    <div class="door-phantom" v-if="!showOrbitActive">
      <p class="phantom-text font-cinzel text-door-gold/60 text-4xl mb-4 tracking-widest opacity-40">
        平行之门
      </p>
      <p class="phantom-hint font-noto text-white/40 text-sm tracking-wider">
        穿越此处，窥见另一种可能
      </p>
    </div>
  </div>
</template>

<style scoped>
.door-container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: 1500px;
}

.door-left,
.door-right {
  position: absolute;
  width: 45%;
  height: 85%;
  top: 50%;
  transform: translateY(-50%);
}

.door-left {
  left: 5%;
  transform-origin: right center;
}

.door-right {
  right: 5%;
  transform-origin: left center;
}

.door-panel {
  background: linear-gradient(145deg, #1a1f4a 0%, #0a0e27 50%, #1a1f4a 100%);
  border: 2px solid rgba(255, 215, 0, 0.5);
  border-radius: 8px;
  transform-style: preserve-3d;
  box-shadow:
    inset 0 0 60px rgba(107, 78, 255, 0.2),
    0 0 40px rgba(255, 215, 0, 0.15);
  overflow: hidden;
}

.door-panel::before {
  content: '';
  position: absolute;
  top: 8%;
  left: 8%;
  right: 8%;
  bottom: 8%;
  border: 1px solid rgba(255, 215, 0, 0.25);
  border-radius: 4px;
  pointer-events: none;
}

.door-ornament-left,
.door-ornament-right {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 100px;
  background: linear-gradient(180deg, #ffd700, #b8860b, #ffd700);
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(255, 215, 0, 0.6);
}

.door-ornament-left {
  right: 15%;
}

.door-ornament-right {
  left: 15%;
}

.door-inner-decoration {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.door-runner {
  position: absolute;
  border-radius: 50%;
  border: 1px solid rgba(107, 78, 255, 0.15);
}

.door-runner.ring-1 {
  width: 60%;
  height: 60%;
  animation: rotate-slow 20s linear infinite;
}

.door-runner.ring-2 {
  width: 40%;
  height: 40%;
  animation: rotate-slow 15s linear infinite reverse;
}

.door-runner.ring-3 {
  width: 20%;
  height: 20%;
  animation: rotate-slow 10s linear infinite;
}

@keyframes rotate-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.animate-door-open {
  animation: doorOpenLeft 2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

.animate-door-open-right {
  animation: doorOpenRight 2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@keyframes doorOpenLeft {
  0% { transform: translateY(-50%) perspective(1000px) rotateY(0deg); }
  100% { transform: translateY(-50%) perspective(1000px) rotateY(-85deg); }
}

@keyframes doorOpenRight {
  0% { transform: translateY(-50%) perspective(1000px) rotateY(0deg); }
  100% { transform: translateY(-50%) perspective(1000px) rotateY(85deg); }
}

.crack-light {
  position: absolute;
  top: 5%;
  left: 50%;
  width: 3px;
  height: 90%;
  background: linear-gradient(180deg,
    transparent 0%,
    #ffd700 20%,
    #6b4eff 50%,
    #ffd700 80%,
    transparent 100%);
  box-shadow:
    0 0 40px #ffd700,
    0 0 80px #6b4eff,
    0 0 120px rgba(255, 215, 0, 0.5);
  transform: translateX(-50%);
  animation: crackPulse 2.5s ease-in-out infinite;
  z-index: 5;
}

@keyframes crackPulse {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 1; }
}

.orbit-container {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
  z-index: 10;
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.orbit-core {
  position: relative;
  width: 200px;
  height: 200px;
}

.orbit-ring {
  position: absolute;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.orbit-ring.ring-1 {
  width: 100%;
  height: 100%;
  border: 2px solid transparent;
  border-top-color: #ffd700;
  border-right-color: rgba(255, 215, 0, 0.3);
  animation: starOrbit 2s linear infinite;
  box-shadow: 0 0 30px rgba(255, 215, 0, 0.3);
}

.orbit-ring.ring-2 {
  width: 75%;
  height: 75%;
  border: 2px solid transparent;
  border-top-color: #6b4eff;
  border-left-color: rgba(107, 78, 255, 0.3);
  animation: starOrbit 1.5s linear infinite reverse;
  box-shadow: 0 0 25px rgba(107, 78, 255, 0.4);
}

.orbit-ring.ring-3 {
  width: 50%;
  height: 50%;
  border: 2px solid transparent;
  border-top-color: #00d4ff;
  border-right-color: rgba(0, 212, 255, 0.3);
  animation: starOrbit 1s linear infinite;
  box-shadow: 0 0 20px rgba(0, 212, 255, 0.5);
}

@keyframes starOrbit {
  0% { transform: translate(-50%, -50%) rotate(0deg); }
  100% { transform: translate(-50%, -50%) rotate(360deg); }
}

.orbit-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30px;
  height: 30px;
  background: radial-gradient(circle, #ffd700 0%, #6b4eff 50%, transparent 70%);
  border-radius: 50%;
  box-shadow: 0 0 40px #ffd700, 0 0 60px #6b4eff;
  animation: centerPulse 1.5s ease-in-out infinite;
}

@keyframes centerPulse {
  0%, 100% { opacity: 0.6; transform: translate(-50%, -50%) scale(0.9); }
  50% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
}

.loading-text {
  text-align: center;
  animation: fadeInUp 0.6s ease-out 0.3s both;
}

@keyframes fadeInUp {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}

.dots {
  display: inline-flex;
  gap: 6px;
  justify-content: center;
  margin-top: 12px;
}

.dots span {
  width: 8px;
  height: 8px;
  background: #ffd700;
  border-radius: 50%;
  animation: dotBounce 1.4s ease-in-out infinite both;
  box-shadow: 0 0 10px #ffd700;
}

.dots span:nth-child(1) { animation-delay: -0.32s; }
.dots span:nth-child(2) { animation-delay: -0.16s; }

@keyframes dotBounce {
  0%, 80%, 100% {
    transform: scale(0);
    opacity: 0.3;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}

.door-phantom {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 3;
  pointer-events: none;
}

.phantom-text {
  font-size: 2.5rem;
  animation: textGlow 3s ease-in-out infinite;
  text-shadow: 0 0 30px rgba(255, 215, 0, 0.5);
}

@keyframes textGlow {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.6; }
}

.phantom-hint {
  letter-spacing: 0.2em;
}
</style>

<template>
  <div
    v-if="isVisible"
    class="fixed inset-0 flex justify-center items-center z-[1000]"
  >
    <div class="absolute inset-0 bg-black bg-opacity-70"></div>

    <LottieAnimation
      v-if="currentStage === 'closed'"
      class="relative z-10 w-64 h-auto"
      :animationData="closedBoxAnimation"
      :loop="false"
      :autoPlay="true"
    />

    <LottieAnimation
      v-if="currentStage === 'open'"
      class="relative z-10 w-64 h-auto"
      :animationData="openBoxAnimation"
      :loop="false"
      :autoPlay="true"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { LottieAnimation } from "lottie-web-vue";
import { confetti } from "@tsparticles/confetti";
import closedBoxAnimation from "../assets/delivery-box-close.json";
import openBoxAnimation from "../assets/delivery-box-open.json";

const isVisible = ref(false);
const currentStage = ref<"closed" | "open">("closed");

interface Emits {
  (event: "animationComplete"): void;
}

const emit = defineEmits<Emits>();

async function triggerConfetti() {
  await confetti({
    count: 100,
    spread: 70,
    origin: { y: 0.45 },
    zIndex: 2000,
  });
}

function startBoxAnimation() {
  isVisible.value = true;
  currentStage.value = "closed";

  setTimeout(() => {
    currentStage.value = "open";

    setTimeout(() => {
      triggerConfetti();
    }, 300);

    setTimeout(() => {
      isVisible.value = false;

      emit("animationComplete");
    }, 2000);
  }, 1000);
}

defineExpose({ startBoxAnimation });
</script>

<style scoped></style>

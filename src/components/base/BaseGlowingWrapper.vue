<template>
  <div class="relative inline-block w-full">
    <div
      class="absolute inset-0 rounded-xl blur-lg pointer-events-none transition-all"
      :class="glowClass"
    ></div>
    <div class="relative z-10">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  glowMode?: "constant" | "pulsating";
}

const props = defineProps<Props>();

const glowClass = computed(() => {
  if (props.glowMode === "pulsating") {
    return "bg-[#BBEE53] animate-pulse";
  }
  return "bg-[#BBEE53]"; // constant glow
});
</script>

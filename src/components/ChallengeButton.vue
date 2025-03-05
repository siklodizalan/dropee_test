<template>
  <div class="relative flex flex-col items-center p-4 animate-pulse-effect">
    <div
      class="relative w-16 h-16 bg-[radial-gradient(circle,_#E72E6D_0%,_#E72E6D_10%,_#588BA2_60%)] bg-cover rounded-2xl shadow-lg flex items-center justify-center border-2 border-[#7EC8E4]"
    >
      <slot name="image"> </slot>
    </div>

    <div
      class="absolute bottom-1 bg-white rounded-full px-[3px] py-[1px] text-black text-xs font-semibold shadow-md"
    >
      <slot name="timer"> </slot>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
@keyframes pulse {
  0% {
    transform: scale(1);
  }
  40% {
    transform: scale(0.95);
  }
  50% {
    transform: scale(0.95);
  }
  100% {
    transform: scale(1);
  }
}

.animate-pulse-effect {
  animation: pulse 2s ease-in-out infinite;
}
</style>

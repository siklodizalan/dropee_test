<template>
  <div
    class="fixed inset-0 flex p-4 items-center justify-center bg-black bg-opacity-50 z-50"
  >
    <div
      class="bg-black text-white p-4 w-96 relative rounded-3xl shadow-lg border border-gray-300"
    >
      <button class="absolute top-4 right-4" @click="$emit('close')">
        <slot name="close-icon">
          <CloseIcon />
        </slot>
      </button>

      <h2 class="text-lg font-bold text-center mx-auto max-w-64">
        <slot name="title"></slot>
      </h2>

      <p class="text-sm text-gray-400 text-center mt-1">
        <slot name="description"></slot>
      </p>

      <div class="mt-8">
        <slot name="middle-content"></slot>
      </div>

      <div class="flex flex-col gap-2 mt-6">
        <slot name="primary-button"> </slot>

        <slot name="secondary-button"> </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CloseIcon from "../../assets/closeIcon.svg";
defineEmits(["close"]);
</script>

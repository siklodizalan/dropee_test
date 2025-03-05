<template>
  <nav class="h-14 flex justify-between px-4 bg-black">
    <div class="flex w-1/3 items-center">
      <slot name="left">
        <ChevronLeft />
        <BaseButton variant="text" size="small" @click="goBack"
          >Back</BaseButton
        >
      </slot>
    </div>

    <div class="flex w-1/3 flex-col justify-center items-center">
      <slot name="middle">
        <h1 class="text-lg font-semibold text-white">Dropee</h1>
        <p class="text-xs text-gray-600">miniapp</p>
      </slot>
    </div>

    <div class="flex w-1/3 justify-end">
      <slot name="right">
        <BaseButton variant="text" size="small">
          <MenuIcon />
        </BaseButton>
      </slot>
    </div>
  </nav>
</template>

<script setup lang="ts">
import BaseButton from "./BaseButton.vue";
import ChevronLeft from "../../assets/left-chevron.svg";
import MenuIcon from "../../assets/MenuIcon.svg";

function goBack() {
  window.history.back();
}
</script>

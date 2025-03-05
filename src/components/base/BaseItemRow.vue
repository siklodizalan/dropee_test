<template>
  <div
    class="flex items-center bg-[#1C1C1E] rounded-xl gap-2 min-h-[40px] shadow-sm"
  >
    <div class="flex h-full items-center justify-center min-w-8">
      <slot name="left"></slot>
    </div>
    <div class="flex-1 truncate font-medium text-white">
      <slot></slot>
    </div>
    <div class="flex items-center justify-center min-w-6">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<template>
  <div
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50"
  >
    <div
      class="relative w-full h-[80%] flex flex-col items-center justify-center text-center bg-gradient-to-b from-[rgba(141,192,119,0)] via-[#8EB979] to-[rgba(0,0,0,0)]"
    >
      <h2 class="text-2xl font-semibold text-white mb-4">
        <slot name="title"></slot>
      </h2>

      <div class="relative flex items-center justify-center w-full h-48">
        <slot name="middle"></slot>
      </div>
    </div>
  </div>
</template>

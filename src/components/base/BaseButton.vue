<template>
  <button :class="buttonClasses" :disabled="disabled" @click="handleClick">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../../utils/ClassNameUtil";

interface Props {
  variant: "gold" | "primary" | "secondary" | "text" | "outlined";
  type?: "button" | "submit" | "reset";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  buttonStyle?: string;
}

const props = defineProps<Props>();

interface Emits {
  (event: "click", mouseEvent: MouseEvent): void;
}

const emit = defineEmits<Emits>();

const baseClasses =
  "rounded focus:outline-none inline-flex items-center justify-center";

const classMap = {
  gold: "bg-[#FFD700] text-black hover:bg-[#FFD700]-600",
  primary: "bg-[#BBEE53] text-black hover:bg-[#BBEE53]-600",
  secondary: "bg-white text-gray-800 hover:bg-gray-400",
  text: "text-white",
  outlined: "border border-white text-white hover:bg-white hover:text-black",
};

const sizeMap = {
  small: "px-2 py-1 text-sm",
  medium: "px-4 py-2 text-md",
  large: "px-6 py-3 text-lg",
};

const variantClasses = computed(
  () => classMap[props.variant] || classMap.primary
);

const sizeClasses = computed(() => sizeMap[props.size || "medium"]);

const buttonClasses = computed(() => {
  const disabledClass = props.disabled ? "opacity-60 cursor-not-allowed" : "";
  return cn(
    baseClasses,
    `${variantClasses.value} ${sizeClasses.value} ${disabledClass} ${props.buttonStyle}`.trim()
  );
});

function handleClick(event: MouseEvent) {
  if (!props.disabled) {
    emit("click", event);
  }
}
</script>

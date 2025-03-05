<template>
  <div>
    <slot :hour="hour" :min="min" :sec="sec">
        <div :class="timeClass">
            {{ hour }}:{{ min }}:{{ sec }}
        </div>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onBeforeUnmount } from "vue";

interface Props {
  endDate: Date;
  negative?: boolean;
  timeClass?: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (event: "endTime"): void;
}>();

const now = ref(new Date());
let timer: ReturnType<typeof setInterval> | null = null;

const hour = computed(() => {
  const h = Math.trunc(
    (props.endDate.getTime() - now.value.getTime()) / 1000 / 3600
  );
  return h > 9 ? h.toString() : "0" + h;
});

const min = computed(() => {
  const m =
    Math.trunc((props.endDate.getTime() - now.value.getTime()) / 1000 / 60) %
    60;
  return m > 9 ? m.toString() : "0" + m;
});

const sec = computed(() => {
  const s =
    Math.trunc((props.endDate.getTime() - now.value.getTime()) / 1000) % 60;
  return s > 9 ? s.toString() : "0" + s;
});

watch(
  () => props.endDate,
  (newVal) => {
    if (timer) {
      clearInterval(timer);
    }
    timer = setInterval(() => {
      now.value = new Date();
      if (!props.negative && now.value > newVal) {
        now.value = newVal;
        emit("endTime");
        clearInterval(timer!);
      }
    }, 1000);
  },
  { immediate: true }
);

onBeforeUnmount(() => {
  if (timer) {
    clearInterval(timer);
  }
});
</script>

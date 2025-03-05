<template>
  <div
    class="rounded-lg my-2 mx-3 text-white flex flex-col shadow-lg max-w-sm bg-gradient-to-b from-[#2C2C2E] to-[#1C1C1E] border border-[#4E4E50]"
  >
    <div class="flex items-center w-full">
      <img :src="userBox.image" alt="Box Image" class="w-28 h-28" />
      <div>
        <h2 class="uppercase">{{ userBox.title }}</h2>
        <p class="text-xs text-gray-300">{{ userBox.description }}</p>
      </div>
    </div>
    <div class="flex px-2 gap-2 pb-2">
      <BaseButton
        :disabled="userBox.price === 0 && boxCount === 0"
        variant="primary"
        size="small"
        class="w-full"
        @click="handlePrimaryClick"
      >
        <LoadingSpinnerIcon v-if="isLoading" class="h-5" />
        <span v-else>{{ openButtonText.toUpperCase() }}</span>
        <Timer
          v-if="userBox.price === 0 && boxCount === 0"
          :endDate="endOfDay"
          class="ml-1"
          @endTime="resetTimer"
        />
      </BaseButton>
      <BaseButton
        v-if="userBox.price > 0"
        :disabled="boxCount === 0"
        variant="secondary"
        size="small"
        class="w-full"
        @click="emitOpenEvent"
      >
        OPEN | {{ boxCount }}
      </BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBoxStore } from "../../services/boxStore";
import { BoxWithState } from "../../types/box";
import LoadingSpinnerIcon from "../LoadingSpinnerIcon.vue";
import Timer from "../Timer.vue";
import BaseButton from "./BaseButton.vue";
import { computed, ref } from "vue";

const boxStore = useBoxStore();
const isLoading = ref(false);

interface Props {
  userBox: BoxWithState;
  buttonText?: string;
}

const props = defineProps<Props>();

const boxCount = computed(() => props.userBox.count || 0);
//const endOfDay = new Date();
//endOfDay.setUTCHours(23, 59, 59, 999);
const endOfDay = computed(
  () =>
    new Date(
      new Date(boxStore.getBoxById(props.userBox.id).lastOpened!).getTime() +
        30 * 1000
    )
);

const emit = defineEmits<{
  (event: "open", boxId: number): void;
  (event: "buy", boxId: number): void;
}>();

const openButtonText = computed(() =>
  props.userBox.price === 0
    ? boxCount.value > 0
      ? "Open Free Box"
      : "Next In"
    : `Buy $${props.userBox.price}`
);

function handlePrimaryClick() {
  isLoading.value = true;

  mockLoading().then(() => {
    if (props.userBox.price === 0) {
      emitOpenEvent();
    } else {
      emit("buy", props.userBox.id);
    }
  });
}

function mockLoading() {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      isLoading.value = false;
      resolve();
    }, 500);
  });
}

function emitOpenEvent() {
  emit("open", props.userBox.id);
}

function resetTimer() {
  if (boxCount.value === 0) {
    boxStore.updateBoxCount(props.userBox.id, 1);
  }
  //endOfDay.setUTCHours(23, 59, 59, 999);
}
</script>

<style scoped></style>

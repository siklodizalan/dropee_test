<template>
  <BoxAnimation
    v-if="animationVisible"
    v-lock-scroll="animationVisible"
    ref="boxAnimationRef"
    @animation-complete="handleAnimationComplete"
  />

  <BasePopupModal
    v-if="box && !animationVisible"
    v-lock-scroll="box && !animationVisible"
    @close="closeModal"
  >
    <template #title> Yay! Box opened! </template>
    <template #description> Your box contains: </template>

    <template #middle-content>
      <BaseItemRow class="h-10">
        <template #left>
          <div class="flex h-full">
            <div
              class="flex items-center justify-center w-10 h-full bg-gray-800 rounded-l-xl border-r border-gray-400"
            >
              <img :src="Dropee" alt="Dropee" class="w-4 h-6" />
            </div>

            <div class="flex items-center text-white font-medium px-2">
              <img :src="Dropee" alt="Dropee" class="w-3 h-4 mr-1" />
              {{ randomWinning }}
            </div>
          </div>
        </template>

        <template #right>
          <CheckmarkIcon class="mr-2" />
        </template>
      </BaseItemRow>
    </template>

    <template #primary-button>
      <BaseGlowingWrapper v-if="!primaryButtonDisabled">
        <BaseButton
          variant="secondary"
          size="large"
          buttonStyle="w-full rounded-xl font-semibold"
          @click="handleModalPrimaryButtonClick"
        >
          <span class="mr-1">{{ modalPrimaryButtonText }}</span>
        </BaseButton>
      </BaseGlowingWrapper>

      <BaseButton
        v-else
        variant="secondary"
        size="large"
        :disabled="primaryButtonDisabled"
        buttonStyle="rounded-xl font-semibold"
        @click="handleModalPrimaryButtonClick"
      >
        <span class="mr-1">{{ modalPrimaryButtonText }}</span>
        <Timer v-if="timerOn" :endDate="endOfDay" @endTime="resetTimer" />
      </BaseButton>
    </template>

    <template #secondary-button>
      <BaseButton
        variant="outlined"
        size="large"
        buttonStyle="rounded-xl"
        @click="closeModal"
      >
        CLOSE
      </BaseButton>
    </template>
  </BasePopupModal>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import BasePopupModal from "./base/BasePopupModal.vue";
import BaseButton from "./base/BaseButton.vue";
import Timer from "./Timer.vue";
import { useBoxStore } from "../services/boxStore";
import { Box } from "../types/box";
import BoxAnimation from "./BoxAnimation.vue";
import BaseItemRow from "./base/BaseItemRow.vue";
import CheckmarkIcon from "../assets/checkmark.svg";
import Dropee from "../assets/dropee.png";
import BaseGlowingWrapper from "./base/BaseGlowingWrapper.vue";

const boxAnimationRef = ref<InstanceType<typeof BoxAnimation> | null>(null);
const animationVisible = ref(true);

const randomWinning = ref(
  Math.floor(Math.random() * 900000 + 100000).toLocaleString()
);

const boxStore = useBoxStore();
const box = defineModel<Box | null>();

const emit = defineEmits<{
  (event: "open", boxId: number): void;
  (event: "buy", boxId: number): void;
}>();

const primaryButtonDisabled = ref(false);
const modalPrimaryButtonText = ref("");
const timerOn = ref(false);
// const endOfDay = new Date();
// endOfDay.setUTCHours(23, 59, 59, 999);
const endOfDay = computed(
  () =>
    new Date(
      new Date(boxStore.getBoxById(userBox.value.id).lastOpened!).getTime() +
        30 * 1000 // 30 sec
    )
);

const userBox = computed(() => boxStore.getBoxById(box.value!.id));

watch(
  box,
  (newBox) => {
    if (newBox) {
      boxAnimationRef.value?.startBoxAnimation();
    }
  },
  { immediate: true }
);

function setupModal() {
  if (userBox.value?.id === 1 && userBox.value?.lastOpened) {
    primaryButtonDisabled.value = true;
    modalPrimaryButtonText.value = "NEXT IN";
    //endOfDay.setUTCHours(23, 59, 59, 999);
    timerOn.value = true;
  } else {
    primaryButtonDisabled.value = false;
    modalPrimaryButtonText.value =
      userBox.value!.count > 0
        ? `OPEN BOX (${userBox.value!.count} LEFT)`
        : "BUY BOX";
    timerOn.value = false;
  }
}

function resetTimer() {
  primaryButtonDisabled.value = false;
  modalPrimaryButtonText.value =
    userBox.value!.count > 0
      ? `OPEN BOX (${userBox.value!.count} LEFT)`
      : "BUY BOX";
  timerOn.value = false;
}

function handleAnimationComplete() {
  animationVisible.value = false;
  setupModal();
}

function closeModal() {
  box.value = null;
  animationVisible.value = true;
}

function handleModalPrimaryButtonClick() {
  if (!box.value) return;

  const boxId = box.value.id;
  const boxCount = userBox.value?.count ?? 0;

  closeModal();

  setTimeout(() => {
    if (boxCount > 0) {
      emit("open", boxId);
    } else {
      emit("buy", boxId);
    }
  }, 1000);
}
</script>

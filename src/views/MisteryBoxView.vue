<template>
  <div class="bg-black pb-64">
    <div
      class="min-h-48 text-white text-center pt-5"
      style="
        background-image: linear-gradient(
            to top right,
            transparent 40%,
            #7b7bff
          ),
          linear-gradient(to bottom, #f99817, #e72e6d, black);
      "
    >
      <h1 class="text-2xl font-semibold">MYSTERY BOXES</h1>
      <p class="opacity-80">Unlock surprises that boost your journey</p>
      <div class="flex items-center justify-center h-full">
        <BaseGlowingWrapper glowMode="pulsating" class="!w-fit">
          <ChallengeButton
            v-if="!challengeModalOpen"
            @click="openChallengeModal"
          >
            <template #image>
              <img :src="Trophy" class="w-12 h-12" />
              <img
                :src="Star"
                class="absolute bottom-1 left-1 w-4 h-4 star-1"
              />
              <img :src="Star" class="absolute top-1 right-1 w-4 h-4 star-2" />
            </template>

            <template #timer>
              <Timer :endDate="endOfDay" @endTime="resetTimer" />
            </template>
          </ChallengeButton>
        </BaseGlowingWrapper>
      </div>
    </div>

    <div class="flex flex-col items-center">
      <div v-for="box in userBoxData">
        <BaseMisteryBox
          :userBox="box"
          @open="openMisteryBox"
          @buy="buyMisteryBox"
        />
      </div>
    </div>
  </div>
  <MisteryBoxOpenedModal
    v-model="openedBox"
    @open="openMisteryBox"
    @buy="buyMisteryBox"
  />

  <BasePopupModal
    v-if="boxPurchasedModal"
    v-lock-scroll="boxPurchasedModal"
    @close="boxPurchasedModal = false"
  >
    <template #title> Yay! Box purchased successfully! </template>
    <template #secondary-button>
      <BaseButton
        variant="outlined"
        size="large"
        buttonStyle="rounded-xl"
        @click="boxPurchasedModal = false"
        >CLOSE</BaseButton
      >
    </template>
  </BasePopupModal>

  <ChallengeModal
    v-if="challengeModalOpen"
    v-lock-scroll="challengeModalOpen"
    @check-winning="handleCheckWinning"
    @close="challengeModalOpen = false"
  />

  <CheckIfYouWonPopup
    v-if="youDidntWonModalOpen"
    v-lock-scroll="youDidntWonModalOpen"
  >
    <template #title>YOU DIDN’T WIN</template>
    <template #middle>
      <div
        class="w-40 h-40 flex items-center justify-center rounded-full border-2 border-white"
      >
        <img :src="SadDuck" alt="Sad Duck" class="w-20 h-20" />
      </div>
    </template>
  </CheckIfYouWonPopup>

  <CheckIfYouWonPopup v-if="youWonModalOpen" v-lock-scroll="youWonModalOpen">
    <template #title
      ><h1 class="max-w-56 text-3xl font-semibold">
        Congrats, you won a badge!
      </h1></template
    >
    <template #middle>
      <img :src="GreenBurstBackground" class="absolute w-full h-96" />
      <div class="w-40 h-40 rounded-full overflow-y-auto">
        <div
          class="relative w-40 h-40 flex items-center justify-center rounded-full bg-black border-[10px] border-gray-500"
        >
          <img :src="FirstMedal" class="absolute -top-5 w-36 h-36" />
        </div>
      </div>
    </template>
  </CheckIfYouWonPopup>
</template>

<script setup lang="ts">
import BaseMisteryBox from "../components/base/BaseMisteryBox.vue";
import { boxData } from "../constants/data";
import Timer from "../components/Timer.vue";
import ChallengeButton from "../components/ChallengeButton.vue";
import Trophy from "../assets/trophy.gif";
import BasePopupModal from "../components/base/BasePopupModal.vue";
import { computed, ref } from "vue";
import BaseButton from "../components/base/BaseButton.vue";
import { useBoxStore } from "../services/boxStore";
import MisteryBoxOpenedModal from "../components/MisteryBoxOpenedModal.vue";
import { Box } from "../types/box";
import { storeToRefs } from "pinia";
import ChallengeModal from "../components/ChallengeModal.vue";
import CheckIfYouWonPopup from "../components/CheckIfYouWonPopup.vue";
import SadDuck from "../assets/sadDuck.gif";
import FirstMedal from "../assets/first.gif";
import BaseGlowingWrapper from "../components/base/BaseGlowingWrapper.vue";
import Star from "../assets/Star.png";
import GreenBurstBackground from "../assets/greenBurstBackground.png";
import { confetti } from "@tsparticles/confetti";

const boxStore = useBoxStore();
const { boxes } = storeToRefs(boxStore);
const challengeModalOpen = ref(false);
const youWonModalOpen = ref(false);
const youDidntWonModalOpen = ref(false);

const endOfDay = new Date();
endOfDay.setUTCHours(23, 59, 59, 999);

const userBoxData = computed(() => {
  return boxData.map((box) => {
    const storedBox = boxes.value.find((b) => b.id === box.id) || {
      id: box.id,
      count: box.id === 1 ? 1 : 0,
    };
    return { ...box, ...storedBox };
  });
});

async function triggerConfetti() {
  await confetti({
    count: 100,
    spread: 70,
    origin: { y: 0.6 },
    zIndex: 2000,
  });
}

const boxPurchasedModal = ref(false);
const openedBox = ref<Box | null>(null);

function buyMisteryBox(boxId: number) {
  boxPurchasedModal.value = true;
  boxStore.updateBoxCount(boxId, 1);
}

function openMisteryBox(boxId: number) {
  boxStore.updateBoxCount(boxId, -1);
  openedBox.value = boxData.find((box) => box.id === boxId)!;
  boxStore.setLastOpened(boxId, new Date());
}

function openChallengeModal() {
  challengeModalOpen.value = true;
}

function handleCheckWinning() {
  challengeModalOpen.value = false;
  const win = Math.round(Math.random());
  if (win) {
    youWonModalOpen.value = true;
    triggerConfetti();
  } else {
    youDidntWonModalOpen.value = true;
  }

  setTimeout(() => {
    youWonModalOpen.value = false;
    youDidntWonModalOpen.value = false;
  }, 3000);
}

function resetTimer() {
  endOfDay.setUTCHours(23, 59, 59, 999);
}
</script>

<style scoped>
@keyframes starFade {
  0% {
    opacity: 0;
  }
  25% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  75% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}

@keyframes star2Fade {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0;
  }
  75% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.star-1 {
  animation: starFade 2s ease-in-out infinite;
}

.star-2 {
  animation: star2Fade 2s ease-in-out infinite;
}
</style>

<template>
  <div class="fixed inset-0 flex items-center justify-center">
    <div class="absolute inset-0 bg-black opacity-50"></div>

    <div class="relative mt-32 mb-4 w-[90%] rounded-2xl">
      <BaseGlowingWrapper>
        <img
          :src="BackgroundCards"
          class="absolute -top-20 left-1/2 transform -translate-x-1/2 w-[80%] pointer-events-none"
          alt="Background Cards"
        />
        <div class="absolute inset-0 bg-black rounded-2xl">
          <div
            class="absolute h-1/3 inset-0 bg-gradient-to-b from-[#8DC077] via-[#588BA2] to-black rounded-2xl"
          ></div>
        </div>

        <div
          class="relative z-10 p-4 flex flex-col rounded-2xl border border-gray-300"
        >
          <button class="absolute -top-2 -right-2" @click="$emit('close')">
            <CloseIcon />
          </button>

          <div
            class="absolute inset-0 mx-auto h-28 w-28 bg-[radial-gradient(_#E72E6D_0%,_transparent_50%)]"
          />

          <img
            :src="TrophyGif"
            class="absolute -top-16 left-1/2 transform -translate-x-1/2 w-36"
            alt="Trophy"
          />

          <img
            :src="StarGroup"
            class="absolute -top-16 left-1/2 transform -translate-x-1/2 w-44"
            alt="StarGroup"
          />

          <h2 class="text-2xl font-semibold text-center text-white mt-16">
            Box challenge
          </h2>

          <BaseButton
            variant="gold"
            size="large"
            class="mt-1 w-full rounded-xl"
            @click="checkIfYouWon"
            >CHECK IF YOU WON</BaseButton
          >

          <div class="flex mt-4 bg-[#2C2C2E] p-[2px] rounded-lg w-full">
            <button
              class="flex-1 py-1 px-4 rounded-lg text-center font-medium transition-all duration-200"
              :class="isDaily ? 'bg-[#3A3A3C] text-white' : 'text-gray-400'"
              @click="isDaily = true"
            >
              Daily
            </button>
            <button
              class="flex-1 py-1 px-4 rounded-lg text-center font-medium transition-all duration-200"
              :class="!isDaily ? 'bg-[#3A3A3C] text-white' : 'text-gray-400'"
              @click="isDaily = false"
            >
              All-time
            </button>
          </div>

          <div class="flex justify-end text-[#BBEE53] mt-2 text-sm">
            <span class="mr-1">Resets in</span>
            <Timer :endDate="endOfDay" @endTime="resetTimer" />
          </div>

          <Leaderboard :leaderboard="leaderboard" :userId="userId" />
        </div>
      </BaseGlowingWrapper>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import BackgroundCards from "../assets/backgroundCards.png";
import TrophyGif from "../assets/trophy.gif";
import BaseButton from "./base/BaseButton.vue";
import StarGroup from "../assets/starGroup.png";
import Timer from "./Timer.vue";
import CloseIcon from "../assets/redCloseIcon.svg";
import { DailyLeaderboard, WeeklyLeaderboard } from "../constants/data";
import BaseGlowingWrapper from "./base/BaseGlowingWrapper.vue";
import Leaderboard from "./Leaderboard.vue";

const emit = defineEmits<{
  (event: "checkWinning"): void;
  (event: "close"): void;
}>();

const userId = 8;

const endOfDay = new Date();
endOfDay.setUTCHours(23, 59, 59, 999);

const isDaily = ref(true);

const leaderboard = computed(() =>
  isDaily.value ? DailyLeaderboard : WeeklyLeaderboard
);

function checkIfYouWon() {
  emit("checkWinning");
}

function resetTimer() {
  endOfDay.setUTCHours(23, 59, 59, 999);
}
</script>

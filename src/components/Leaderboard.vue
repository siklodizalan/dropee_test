<template>
  <div ref="listRef" class="mt-4 overflow-y-auto space-y-2 max-h-60 pr-2">
    <BaseItemRow
      v-for="(user, index) in leaderboard"
      :key="index"
      :ref="
        (el) => {
          if (el && el.$el) rowRefs[index] = el.$el;
        }
      "
      :data-index="index"
      :class="{
        'border border-[#BBEE53]': index === userId && isUserRowVisible,
      }"
    >
      <template #left>
        <div class="flex items-center space-x-2 ml-2">
          <span class="text-white text-lg font-semibold">{{ index + 1 }}.</span>
          <img :src="Avatar" class="w-6 h-6 rounded-full" />
          <span class="text-white font-medium">{{ user.name }}</span>
          <img v-if="index === 0" :src="FirstMedal" class="w-6 h-6" />
          <img v-if="index === 1" :src="SecondMedal" class="w-6 h-6" />
          <img v-if="index === 2" :src="ThirdMedal" class="w-6 h-6" />
        </div>
      </template>

      <template #right>
        <span class="text-gray-400 font-medium mr-2">{{
          user.score.toLocaleString()
        }}</span>
      </template>
    </BaseItemRow>
  </div>

  <div
    v-if="
      !isUserRowVisible || userId === 0 || userId === leaderboard.length - 1
    "
    class="absolute left-0 w-full pl-4 pr-6"
    :class="userRowPlacement === 'bottom' ? 'bottom-4' : 'bottom-[216px]'"
  >
    <BaseItemRow class="border border-[#BBEE53]">
      <template #left>
        <div class="flex items-center space-x-2 ml-2">
          <span class="text-white text-lg font-semibold"
            >{{ userId + 1 }}.</span
          >
          <img :src="Avatar" class="w-6 h-6 rounded-full" />
          <span class="text-white font-medium">{{
            leaderboard[userId].name
          }}</span>
        </div>
      </template>

      <template #right>
        <span class="text-gray-400 font-medium mr-2">{{
          leaderboard[userId].score.toLocaleString()
        }}</span>
      </template>
    </BaseItemRow>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, watch } from "vue";
import BaseItemRow from "./base/BaseItemRow.vue";
import Avatar from "../assets/avatar.png";
import FirstMedal from "../assets/first.gif";
import SecondMedal from "../assets/second.gif";
import ThirdMedal from "../assets/third.gif";
import { Leaderboard } from "../types/box";

interface Props {
  leaderboard: Leaderboard[];
  userId: number;
}

const props = defineProps<Props>();

const listRef = ref<HTMLElement | null>(null);
const rowRefs = ref<(HTMLElement | null)[]>([]);
const isUserRowVisible = ref(false);
const scrollDirection = ref<"up" | "down" | null>(null);
const userRowPlacement = ref<"top" | "bottom" | null>(
  isUserRowVisible.value ? null : "bottom"
);

let observer: IntersectionObserver | null = null;
let lastScrollTop = 0;

function checkUserRowVisibility() {
  if (!props.leaderboard[props.userId]) return;

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const index = Number(entry.target.getAttribute("data-index"));
        if (
          (index === props.userId + 1 && userRowPlacement.value !== "top") ||
          (index === props.userId - 1 && userRowPlacement.value !== "bottom")
        ) {
          isUserRowVisible.value = entry.isIntersecting;
          userRowPlacement.value = isUserRowVisible.value
            ? null
            : scrollDirection.value === "down"
            ? "top"
            : "bottom";
        }
      });
    },
    { root: listRef.value, threshold: 0.001 }
  );

  nextTick(() => {
    rowRefs.value.forEach((row) => {
      if (row instanceof Element) {
        observer?.observe(row);
      }
    });
  });
}

function handleScroll() {
  if (!listRef.value) return;

  const currentScrollTop = listRef.value.scrollTop;
  if (currentScrollTop > lastScrollTop) {
    scrollDirection.value = "down";
  } else if (currentScrollTop < lastScrollTop) {
    scrollDirection.value = "up";
  }
  lastScrollTop = currentScrollTop;
}

onMounted(() => {
  checkUserRowVisibility();
  if (listRef.value) {
    listRef.value.addEventListener("scroll", handleScroll);
  }
});

onUnmounted(() => {
  observer?.disconnect();
  if (listRef.value) {
    listRef.value.removeEventListener("scroll", handleScroll);
  }
});

watch(
  () => props.leaderboard,
  () => {
    nextTick(() => {
      checkUserRowVisibility();
    });
  },
  { deep: true }
);
</script>

<style scoped>
::-webkit-scrollbar {
  display: none;
}
</style>

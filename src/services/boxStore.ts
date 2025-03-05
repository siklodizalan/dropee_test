import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { StoredBox } from "../types/box";

const STORAGE_KEY = "userBoxes";

function loadBoxes(): StoredBox[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

function saveBoxes(boxes: StoredBox[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(boxes));
}

export const useBoxStore = defineStore("boxStore", () => {
  const boxes = ref<StoredBox[]>(loadBoxes());

  function updateBoxCount(boxId: number, change: number) {
    const box = boxes.value.find((b) => b.id === boxId);
    if (box) {
      box.count += change;
    } else {
      boxes.value.push({ id: boxId, count: Math.max(0, change) });
    }
    saveBoxes(boxes.value);
  }

  function setLastOpened(boxId: number, date: Date) {
    const box = boxes.value.find((b) => b.id === boxId);
    if (box) {
      box.lastOpened = date;
    }
    saveBoxes(boxes.value);
  }

  function reloadBoxes() {
    boxes.value = loadBoxes();
  }

  function getBoxById(boxId: number) {
    return boxes.value.find((b) => b.id === boxId) ?? { id: boxId, count: 0 };
  }

  const allBoxes = computed(() => boxes.value);

  return {
    boxes,
    allBoxes,
    updateBoxCount,
    setLastOpened,
    reloadBoxes,
    getBoxById,
  };
});

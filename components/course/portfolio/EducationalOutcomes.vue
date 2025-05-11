<template>
  <div class="p-4 flex flex-col gap-4">
    <div
      class="text-base font-semibold w-full pb-2 border-b border-grey-secondary"
    >
      3. Educational Outcomes
    </div>
        <div class="flex flex-row">
      <button
        v-for="(menu, index) in menus"
        :key="index"
        @click="activeMenu = menu"
        class="text-left px-4 py-2 rounded-lg border border-grey-secondary "
        :class="{ 'bg-black-primary text-white': activeMenu === menu }"
      >
        {{ menu }}
      </button>
    </div>
    <div v-if="activeMenu === 'Score & Grade'" class="max-h-[calc(100vh-470px)] scrollbar-set overflow-y-scroll">
      <div class="grid grid-cols-2 gap-4">
        <div class="flex flex-col gap-4">
          <PortChart
            :grade_frequencies="result.grade_frequencies"
            :score_frequencies="result.score_frequencies"
            :activeButton="activeButton"
            @update:activeButton="setActiveButton"
          />
          <div class="grid grid-cols-2 rounded-xl gap-4">
            <div
              v-for="(value, key) in result.statistics"
              :key="key"
              class="flex flex-col gap-4"
            >
              <div
                class="flex flex-row w-full rounded-xl border border-grey-secondary"
              >
                <div
                  class="flex items-center justify-center px-4 py-3 border-2 border-grey-primary rounded-xl w-36"
                >
                  {{ changeKeyToLabel(key) }}
                </div>
                <div class="flex items-center justify-center px-4 py-3 w-full">
                  {{ value.toFixed(2) }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="cols-span-init flex flex-col gap-6">
          <div v-if="activeButton === 'Overview'">
            <PortScoreRange :score_frequencies="result.score_frequencies" />
          </div>
          <div v-else-if="activeButton === 'Grade Overview'">
            <PortGradeRange :grade_frequencies="result.grade_frequencies" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import PortScoreRange from "@/components/course/PortScoreRange.vue";
import PortGradeRange from "@/components/course/PortGradeRange.vue";
import PortChart from "@/components/course/PortChart.vue";
const menus = ["Score & Grade", "Outcomes"];
const activeMenu = ref("Score & Grade");
const buttons = ["Overview", "Grade Overview"];
const activeButton = ref(buttons[0]);
const setActiveButton = (button) => {
  activeButton.value = button;
};
const changeKeyToLabel = (key) => {
  switch (key) {
    case "mean":
      return "Mean";
    case "sd":
      return "S.D.";
    case "median":
      return "Median";
    case "max":
      return "Max";
    case "mode":
      return "Mode";
    case "min":
      return "Min";
    default:
      return key;
  }
};

const result = ref({
  student_amount: 0,
  gpa: 0,
  grade_frequencies: [
    {
      name: "A",
      grade_score: 90,
      frequency: 0,
    },
    {
      name: "BP",
      grade_score: 85,
      frequency: 0,
    },
    {
      name: "B",
      grade_score: 80,
      frequency: 0,
    },
    {
      name: "CP",
      grade_score: 75,
      frequency: 0,
    },
    {
      name: "C",
      grade_score: 70,
      frequency: 0,
    },
    {
      name: "DP",
      grade_score: 65,
      frequency: 0,
    },
    {
      name: "D",
      grade_score: 60,
      frequency: 0,
    },
    {
      name: "F",
      grade_score: 0,
      frequency: 0,
    },
  ],
  score_frequencies: [
    {
      score: "0-50",
      frequency: 0,
    },
    {
      score: "51-55",
      frequency: 0,
    },
    {
      score: "56-60",
      frequency: 0,
    },
    {
      score: "61-65",
      frequency: 0,
    },
    {
      score: "66-70",
      frequency: 0,
    },
    {
      score: "71-75",
      frequency: 0,
    },
    {
      score: "76-80",
      frequency: 0,
    },
    {
      score: "81-85",
      frequency: 0,
    },
    {
      score: "86-90",
      frequency: 0,
    },
    {
      score: "91-95",
      frequency: 0,
    },
    {
      score: "96-100",
      frequency: 0,
    },
  ],
  statistics: {
    min: 0,
    max: 0,
    mean: 0,
    median: 0,
    mode: 0,
    sd: 0,
  },
});
</script>

<style lang="scss" scoped>
.scrollbar-set {
  scrollbar-width: thin;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 10px;
    border: 2px solid #f1f1f1;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
}
</style>

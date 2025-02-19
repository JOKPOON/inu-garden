<template>
  <div
    class="shadow-sm rounded-xl p-6 bg-white border border-grey-tertiary flex flex-col gap-6"
  >
    <div class="flex flex-row">
      <div class="border border-grey-secondary rounded-xl">
        <button
          v-for="button in buttons"
          :key="button"
          :class="[
            'px-6 py-3 rounded-xl',
            activeButton === button
              ? 'bg-black-primary text-white'
              : 'border border-grey-secondary text-base',
          ]"
          @click="setActiveButton(button)"
        >
          {{ button }}
        </button>
      </div>
    </div>
    <div v-if="activeButton === 'Overview'">
      <ScoreChart
        :score_frequencies="props.score_frequencies"
        :activeButton="activeButton"
      />
    </div>
    <div v-else-if="activeButton === 'Grade Overview'">
      <GradeChart
        :grade_frequencies="props.grade_frequencies"
        :activeButton="activeButton"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from "vue";
import ScoreChart from "@/components/course/ScoreChart.vue";
import GradeChart from "@/components/course/GradeChart.vue";

const props = defineProps({
  activeButton: String,
  score_frequencies: {
    type: Array,
    required: true,
  },
  grade_frequencies: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["update:activeButton"]);

const buttons = ["Overview", "Grade Overview"];
const setActiveButton = (button) => {
  emit("update:activeButton", button);
};
</script>

<style lang="scss" scoped></style>

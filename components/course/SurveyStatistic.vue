<template>
  <div class="flex justify-between flex-row">
    <div class="flex flex-col">
      <div class="text-base text-black-primary">
        Survey of -
        <span class="font-semibold">{{ survey.code }} : {{ survey.name }}</span>
      </div>
      <div class="text-base text-black-primary">
        Score Description -
        <span class="font-semibold"> คะแนนความมั่นใจ </span>
      </div>
      <div class="text-base text-black-primary">
        Expected Average Score -
        <span class="font-semibold">
          {{ survey.expectAvgScore }}
        </span>
      </div>
      <div class="flex flex-row">
        <div class="text-base text-black-primary pr-2">Score Meaning -</div>
        <div class="flex flex-row gap-2">
          <div class="font-semibold">
            1 <span class="font-normal"> : ไม่มีความมั่นใจเลย 😡 |</span>
          </div>
          <div class="font-semibold">
            2 <span class="font-normal"> : ไม่มั่นใจ 😕 |</span>
          </div>
          <div class="font-semibold">
            3 <span class="font-normal"> : ปานกลาง 😐 |</span>
          </div>
          <div class="font-semibold">
            4 <span class="font-normal"> : มั่นใจ 😊 |</span>
          </div>
          <div class="font-semibold">
            5 <span class="font-normal"> : มั่นใจมาก 😍</span>
          </div>
        </div>
      </div>
      <div class="text-base text-black-primary">
        Survey statistic from -
        <span class="font-semibold">
          {{ survey.student }}
        </span>
        Students
      </div>
    </div>
    <div class="">
      <button
        class="flex items-center flex-row justify-center border border-grey-secondary rounded-xl px-4 py-2 gap-2 hover:bg-black-primary hover:text-white"
      >
        <Export class="w-5 h-5" />
        <div class="text-base">Export</div>
      </button>
    </div>
  </div>
  <div class="mt-4 rounded-xl p-4 bg-white border border-grey-secondary">
    <div class="grid grid-cols-7 gap-4 pb-2 border-b">
      <div
        class="col-span-4 text-sm text-grey-primary flex items-center justify-center"
      >
        Questions
      </div>
      <div
        class="col-span-2 text-sm text-grey-primary flex items-center justify-center flex-col text-center"
      >
        <div class="w-full">NO. Student Each Score</div>
        <div class="w-full grid grid-cols-5 mt-2">
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
          <div>5</div>
        </div>
      </div>
      <div
        class="col-span-1 text-sm text-grey-primary flex items-center justify-center"
      >
        Average Score
      </div>
    </div>
    <div class="max-h-[calc(100vh-580px)] overflow-y-scroll scrollbar-set">
      <div
        v-for="question in survey.questions"
        :key="question.id"
        class="grid grid-cols-7 gap-4 py-2 border-b"
      >
        <div class="col-span-4 text-sm text-black-primary flex items-center">
          {{ question.text }}
        </div>
        <div
          class="col-span-2 text-sm text-black-primary flex items-center justify-center flex-col text-center"
        >
          <div class="w-full grid grid-cols-5">
            <div>{{ question.scores[1] }}</div>
            <div>{{ question.scores[2] }}</div>
            <div>{{ question.scores[3] }}</div>
            <div>{{ question.scores[4] }}</div>
            <div>{{ question.scores[5] }}</div>
          </div>
        </div>
        <div
          class="col-span-1 text-sm text-black-primary flex items-center justify-center"
        >
          {{ question.avgScore }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Export from "@/components/icons/Export.vue";

const survey = ref({
  id: "CPE123",
  name: "Computer Engineering",
  code: "CPE123",
  expectAvgScore: 4.3,
  curriculum: "Computer Science",
  student: 10,
  questions: [
    {
      id: 1,
      text: "How confident are you in your programming skills?",
      scores: { 1: 1, 2: 2, 3: 3, 4: 2, 5: 2 },
      avgScore: 3.2,
    },
    {
      id: 2,
      text: "How confident are you in your problem-solving skills?",
      scores: { 1: 0, 2: 1, 3: 2, 4: 4, 5: 3 },
      avgScore: 4.0,
    },
    {
      id: 3,
      text: "How confident are you in your communication skills?",
      scores: { 1: 0, 2: 0, 3: 1, 4: 4, 5: 5 },
      avgScore: 4.6,
    },

    {
      id: 4,
      text: "How confident are you in your teamwork skills?",
      scores: { 1: 0, 2: 0, 3: 1, 4: 4, 5: 5 },
      avgScore: 4.6,
    },
    {
      id: 5,
      text: "How confident are you in your leadership skills?",
      scores: { 1: 0, 2: 0, 3: 1, 4: 4, 5: 5 },
      avgScore: 4.6,
    },
    {
      id: 6,
      text: "How confident are you in your creativity skills?",
      scores: { 1: 0, 2: 0, 3: 1, 4: 4, 5: 5 },
      avgScore: 4.6,
    },
    {
      id: 7,
      text: "How confident are you in your critical thinking skills?",
      scores: { 1: 0, 2: 0, 3: 1, 4: 4, 5: 5 },
      avgScore: 4.6,
    },
    {
      id: 8,
      text: "How confident are you in your problem-solving skills?",
      scores: { 1: 0, 2: 0, 3: 1, 4: 4, 5: 5 },
      avgScore: 4.6,
    },
    {
      id: 9,
      text: "How confident are you in your problem-solving skills?",
      scores: { 1: 0, 2: 0, 3: 1, 4: 4, 5: 5 },
      avgScore: 4.6,
    },
    {
      id: 10,
      text: "How confident are you in your problem-solving skills?",
      scores: { 1: 0, 2: 0, 3: 1, 4: 4, 5: 5 },
      avgScore: 4.6,
    },
  ],
});
</script>

<style lang="scss" scoped>
.scrollbar-set {
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>

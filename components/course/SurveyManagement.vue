<template>
  <div class="flex flex-col">
    <div class="flex items-center justify-between flex-row">
      <div class="text-base text-black-primary">
        Survey of -
        <span class="font-semibold">{{ survey.code }} : {{ survey.name }}</span>
      </div>
      <button
        class="flex items-center flex-row justify-center border border-grey-secondary rounded-xl px-4 py-2 gap-2"
      >
        <Setting class="w-5 h-5" />
        <div class="text-base">Edit The Survey</div>
      </button>
    </div>
    <div class="mt-4 rounded-xl p-4 bg-white border border-grey-secondary">
      <div class="grid grid-cols-7 gap-4 pb-2 border-b">
        <div
          class="col-span-4 text-sm text-grey-primary flex items-center justify-center"
        >
          Questions
        </div>
        <div
          class="col-span-1 text-sm text-grey-primary flex items-center justify-center"
        >
          Involved PLO
        </div>
        <div
          class="col-span-1 text-sm text-grey-primary flex items-center justify-center"
        >
          Involved PO
        </div>
        <div
          class="col-span-1 text-sm text-grey-primary flex items-center justify-center"
        >
          Involved SO
        </div>
      </div>
      <div class="max-h-[calc(100vh-470px)] overflow-y-scroll scrollbar-set">
        <div
          v-for="question in survey.question"
          :key="question.id"
          class="grid grid-cols-7 space-x-4 py-2 border-b"
        >
          <div class="col-span-4 text-sm text-black-primary">
            {{ question.question }}
          </div>
          <div class="col-span-1 text-sm text-black-primary text-center">
            <ul>
              <li v-for="plo in question.plo" :key="plo">{{ plo }}</li>
            </ul>
          </div>
          <div class="col-span-1 text-sm text-black-primary text-center">
            <ul>
              <li v-for="po in question.po" :key="po">{{ po }}</li>
            </ul>
          </div>
          <div class="col-span-1 text-sm text-black-primary text-center">
            <ul>
              <li v-for="so in question.so" :key="so">{{ so }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Setting from "@/components/icons/Setting.vue";
const survey = ref({
  id: "CPE123",
  name: "Computer Engineering",
  code: "CPE123",
  expectAvgScore: 4.3,
  curriculum: "Computer Science",
  question: [
    {
      id: "Q1",
      question: "How do you feel about this course?",
      plo: ["PLO1", "PLO2"],
      po: ["PO1", "PO2"],
      so: ["SO1", "SO2"],
    },
    {
      id: "Q2",
      question:
        "I can apply knowledge of mathematics, science, and engineering to solve engineering problems.",
      plo: ["PLO1", "PLO2"],
      po: ["PO1", "PO2"],
      so: ["SO1", "SO2"],
    },
    {
      id: "Q3",
      question: "How do you feel about this course?",
      plo: ["PLO1", "PLO2"],
      po: ["PO1", "PO2"],
      so: ["SO1", "SO2"],
    },
    {
      id: "Q4",
      question: "How do you feel about this course?",
      plo: ["PLO1", "PLO2"],
      po: ["PO1", "PO2"],
      so: ["SO1", "SO2"],
    },
    {
      id: "Q5",
      question: "How do you feel about this course?",
      plo: ["PLO1", "PLO2"],
      po: ["PO1", "PO2"],
      so: ["SO1", "SO2"],
    },
    {
      id: "Q6",
      question: "How do you feel about this course?",
      plo: ["PLO1", "PLO2"],
      po: ["PO1", "PO2"],
      so: ["SO1", "SO2"],
    },
    {
      id: "Q7",
      question: "How do you feel about this course?",
      plo: ["PLO1", "PLO2"],
      po: ["PO1", "PO2"],
      so: ["SO1", "SO2"],
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

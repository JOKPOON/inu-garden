<template>
  <div class="flex flex-col p-4 container mx-auto">
    <div class="text-base text-black-primary">
      Survey of -
      <span class="font-semibold">{{ survey.code }} : {{ survey.name }}</span>
    </div>
    <div class="text-base text-black-primary">
      Score Description -
      <span class="font-semibold"> คะแนนความมั่นใจ </span>
    </div>
    <div class="flex flex-row mb-4">
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
    <div class="overflow-x-auto">
      <table class="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr class="bg-gray-100">
            <th class="px-4 py-2 border border-gray-200">Question</th>
            <th class="px-4 py-2 border border-gray-200">1</th>
            <th class="px-4 py-2 border border-gray-200">2</th>
            <th class="px-4 py-2 border border-gray-200">3</th>
            <th class="px-4 py-2 border border-gray-200">4</th>
            <th class="px-4 py-2 border border-gray-200">5</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="question in survey.question"
            :key="question.id"
            class="hover:bg-gray-50"
          >
            <td class="border px-4 py-2">
              {{ question.id }}: {{ question.question }}
            </td>
            <td class="border px-4 py-2 text-center">
              <input
                type="radio"
                :id="`q${question.id}-1`"
                :name="`q${question.id}`"
                value="1"
              />
            </td>
            <td class="border px-4 py-2 text-center">
              <input
                type="radio"
                :id="`q${question.id}-2`"
                :name="`q${question.id}`"
                value="2"
              />
            </td>
            <td class="border px-4 py-2 text-center">
              <input
                type="radio"
                :id="`q${question.id}-3`"
                :name="`q${question.id}`"
                value="3"
              />
            </td>
            <td class="border px-4 py-2 text-center">
              <input
                type="radio"
                :id="`q${question.id}-4`"
                :name="`q${question.id}`"
                value="4"
              />
            </td>
            <td class="border px-4 py-2 text-center">
              <input
                type="radio"
                :id="`q${question.id}-5`"
                :name="`q${question.id}`"
                value="5"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const code = router.currentRoute.value.params.code;
const survey = ref({
  id: "CPE123",
  name: "Computer Engineering",
  code: "CPE123",
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
  ],
});
</script>

<style lang="scss" scoped></style>

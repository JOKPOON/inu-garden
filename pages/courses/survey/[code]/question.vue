<template>
  <div class="bg-[#F6F8F8] min-h-screen">
    <div class="flex flex-col container mx-auto">
      <div
        class="my-3 md:my-6 rounded-lg shadow-lg p-3 md:p-6 bg-white border-grey-secondary border"
      >
        <div
          class="p-3 border border-grey-secondary text-black-primary rounded-lg mb-3 md:mb-6"
        >
          <div
            class="bg-black-primary text-white text-center text-sm sm:text-base md:text-lg rounded-lg p-3 mb-2"
          >
            Survey of -
            <span class="font-semibold"
              >{{ survey.code }} : {{ survey.name }}</span
            >
          </div>
          <div class="text-xs sm:text-sm md:text-base">
            Score Description -
            <span class="font-semibold"> คะแนนความมั่นใจ </span>
          </div>
          <div class="text-xs sm:text-sm md:text-base">
            Score Details -
            <span class="font-semibold">
              1 : ไม่มีความมั่นใจเลย 😡 | 2 : ไม่มั่นใจ 😕 | 3 : ปานกลาง 😐 | 4
              : มั่นใจ 😊 | 5 : มั่นใจมาก 😍
            </span>
          </div>
        </div>
        <div
          class="overflow-x-auto border-grey-secondary border rounded-lg p-0 w-full"
        >
          <table
            class="table-auto w-full border-collapse border border-grey-secondary text-xs sm:text-sm md:text-base rounded-lg"
          >
            <thead>
              <tr class="bg-yellow-primary text-black-primary">
                <th class="px-4 py-2 border border-grey-secondary">Question</th>
                <th class="px-4 py-2 border border-grey-secondary">1</th>
                <th class="px-4 py-2 border border-grey-secondary">2</th>
                <th class="px-4 py-2 border border-grey-secondary">3</th>
                <th class="px-4 py-2 border border-grey-secondary">4</th>
                <th class="px-4 py-2 border border-grey-secondary">5</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="question in survey.question"
                :key="question.id"
                class="border-grey-secondary"
              >
                <td class="border1 border px-4 py-2 rounded-l-lg">
                  {{ question.id }}: {{ question.question }}
                </td>
                <td class="border1 border px-2 py-2 text-center">
                  <input
                    type="radio"
                    :id="`q${question.id}-1`"
                    :name="`q${question.id}`"
                    value="1"
                    title="ไม่มีความมั่นใจเลย 😡"
                    v-model="answers[question.id]"
                  />
                </td>
                <td class="border1 border px-2 py-2 text-center">
                  <input
                    type="radio"
                    :id="`q${question.id}-2`"
                    :name="`q${question.id}`"
                    value="2"
                    title="ไม่มั่นใจ 😕"
                    v-model="answers[question.id]"
                  />
                </td>
                <td class="border1 border px-2 py-2 text-center">
                  <input
                    type="radio"
                    :id="`q${question.id}-3`"
                    :name="`q${question.id}`"
                    value="3"
                    title="ปานกลาง 😐"
                    v-model="answers[question.id]"
                  />
                </td>
                <td class="border1 border px-2 py-2 text-center">
                  <input
                    type="radio"
                    :id="`q${question.id}-4`"
                    :name="`q${question.id}`"
                    value="4"
                    title="มั่นใจ 😊"
                    v-model="answers[question.id]"
                  />
                </td>
                <td class="border1 border px-2 py-2 text-center rounded-r-lg">
                  <input
                    type="radio"
                    :id="`q${question.id}-5`"
                    :name="`q${question.id}`"
                    value="5"
                    title="มั่นใจมาก 😍"
                    v-model="answers[question.id]"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="w-full flex items-center justify-center mb-4">
          <SendButton
            v-if="allQuestionsAnswered"
            class="flex items-center justify-center border border-grey-secondary rounded-xl px-4 py-2 mt-6 gap-1 md:gap-2 bg-white text-black-primary hover:bg-black-primary hover:text-white transition-colors duration-300"
            @click="SendSurvey"
          >
            <div class="text-xs sm:text-sm md:text-base">Send Survey</div>
          </SendButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import SendButton from "@/components/button/SendButton.vue";

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
const answers = ref({});

const allQuestionsAnswered = computed(() => {
  return survey.value.question.every((q) => answers.value[q.id]);
});

function SendSurvey() {
  localStorage.setItem(`survey_${code}_sent`, 'true');
  router.push(`/courses/survey/${code}/thanks`);
}

onMounted(() => {
  const surveySent = localStorage.getItem(`survey_${code}_sent`);
  if (surveySent === 'true') {
    router.push(`/courses/survey/${code}/thanks`);
  }
});

useHead({
  title: "Inu - Courses Survey",
  description: t("seo.desc"),
});
</script>

<style lang="scss" scoped>
.flex-wrap {
  gap: 0.5rem;
}

@media (max-width: 640px) {
  .flex-wrap {
    flex-direction: column;
  }
  .border1 {
    padding: 0.4rem;
  }
  input[type="radio"] {
    transform: scale(0.8);
  }
}

.container {
  padding: 2rem;
}

button:hover {
  color: #ffffff;
}

table {
  border-radius: 0.5rem;
  overflow: hidden;
  width: 100%;
}

table th,
table td {
  padding: 0.75rem;
  border-radius: 0.25rem;
}

table thead {
  background-color: #f3f4f6;
}

table tbody tr:hover {
  background-color: #f9fafb;
}
</style>

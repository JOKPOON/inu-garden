<template>
  <div class="flex flex-col">
    <div class="flex items-center justify-between flex-row">
      <div class="text-base text-black-primary">
        Survey of -
        <span class="font-semibold">{{ survey.code }} : {{ survey.name }}</span>
      </div>
      <button
        @click="toggleEditMode"
        class="flex items-center flex-row justify-center border border-grey-secondary rounded-xl px-4 py-2 gap-2 hover:bg-black-primary hover:text-white"
      >
        <div v-if="!editMode">
          <Setting class="w-5 h-5" />
        </div>
        <div v-else>
          <Include class="w-5 h-5" />
        </div>
        <div class="text-base">{{ editMode ? "Save" : "Edit The Survey" }}</div>
      </button>
    </div>
    <div class="mt-4 rounded-xl p-4 bg-white border border-grey-secondary">
      <div
        :class="[
          editMode ? 'grid grid-cols-8' : 'grid grid-cols-7',
          'gap-4 pb-2 border-b',
        ]"
      >
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
        <div
          v-if="editMode"
          class="col-span-1 text-sm text-grey-primary flex items-center justify-center"
        >
          Actions
        </div>
      </div>
      <div class="max-h-[calc(100vh-470px)] overflow-y-scroll scrollbar-set">
        <div
          v-for="(question, index) in survey.question"
          :key="question.id"
          :class="[
            editMode ? 'grid grid-cols-8' : 'grid grid-cols-7',
            'space-x-4 py-2 border-b',
          ]"
        >
          <div class="col-span-4 text-sm text-black-primary">
            <textarea
              v-if="editMode"
              v-model="question.question"
              class="w-full outline-none"
              placeholder="Enter the question here"
            ></textarea>
            <span v-else>{{ question.question }}</span>
          </div>
          <div class="col-span-1 text-sm text-black-primary text-center">
            <ul>
              <li
                v-for="(plo, ploIndex) in question.plo"
                :key="plo"
                class="flex items-center space-x-2"
              >
                <div class="w-full flex items-center justify-center mt-1">
                  <input
                    v-if="editMode"
                    :value="plo"
                    @input="updatePLO(index, ploIndex, $event.target.value)"
                    class="w-14 outline-none"
                    placeholder="PLO"
                  />
                  <span v-else>{{ plo }}</span>
                  <button
                    v-if="editMode"
                    @click="removePLO(index, ploIndex)"
                    class="flex items-center justify-center rounded-lg p-1 border hover:bg-red-500 hover:text-white"
                  >
                    <Delete class="w-5 h-5" />
                  </button>
                </div>
              </li>
              <li v-if="editMode">
                <div class="w-full flex items-center justify-center mt-2">
                  <button
                    @click="addPLO(index)"
                    class="flex items-center flex-row justify-center border border-grey-secondary rounded-xl px-3 py-1 hover:bg-black-primary hover:text-white"
                  >
                    <Add class="w-5 h-5" />
                    <div class="text-base">Add</div>
                  </button>
                </div>
              </li>
            </ul>
          </div>
          <div class="col-span-1 text-sm text-black-primary text-center">
            <ul>
              <li
                v-for="(po, poIndex) in question.po"
                :key="po"
                class="flex items-center space-x-2"
              >
                <div class="w-full flex items-center justify-center mt-1">
                  <input
                    v-if="editMode"
                    :value="po"
                    @input="updatePO(index, poIndex, $event.target.value)"
                    class="w-14 outline-none"
                    placeholder="PO"
                  />
                  <span v-else>{{ po }}</span>
                  <button
                    v-if="editMode"
                    @click="removePO(index, poIndex)"
                    class="flex items-center justify-center rounded-lg p-1 border hover:bg-red-500 hover:text-white"
                  >
                    <Delete class="w-5 h-5" />
                  </button>
                </div>
              </li>
              <li v-if="editMode">
                <div class="w-full flex items-center justify-center mt-2">
                  <button
                    @click="addPO(index)"
                    class="flex items-center flex-row justify-center border border-grey-secondary rounded-xl px-3 py-1 hover:bg-black-primary hover:text-white"
                  >
                    <Add class="w-5 h-5" />
                    <div class="text-base">Add</div>
                  </button>
                </div>
              </li>
            </ul>
          </div>
          <div class="col-span-1 text-sm text-black-primary text-center">
            <ul>
              <li
                v-for="(so, soIndex) in question.so"
                :key="so"
                class="flex items-center space-x-2"
              >
                <div class="w-full flex items-center justify-center mt-1">
                  <input
                    v-if="editMode"
                    :value="so"
                    @input="updateSO(index, soIndex, $event.target.value)"
                    class="w-14 outline-none"
                    placeholder="SO"
                  />
                  <span v-else>{{ so }}</span>
                  <button
                    v-if="editMode"
                    @click="removeSO(index, soIndex)"
                    class="flex items-center justify-center rounded-lg p-1 border hover:bg-red-500 hover:text-white"
                  >
                    <Delete class="w-5 h-5" />
                  </button>
                </div>
              </li>
              <li v-if="editMode">
                <div class="w-full flex items-center justify-center mt-2">
                  <button
                    @click="addSO(index)"
                    class="flex items-center flex-row justify-center border border-grey-secondary rounded-xl px-3 py-1 hover:bg-black-primary hover:text-white"
                  >
                    <Add class="w-5 h-5" />
                    <div class="text-base">Add</div>
                  </button>
                </div>
              </li>
            </ul>
          </div>
          <div
            v-if="editMode"
            class="col-span-1 text-sm text-black-primary text-center"
          >
            <div class="w-full h-full flex items-center justify-center">
              <button
                v-if="editMode"
                @click="removeQuestion(index)"
                class="flex items-center justify-center rounded-xl p-2 border hover:bg-red-500 hover:text-white"
              >
                <Delete class="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        <div class="w-full flex items-center justify-center mt-4">
          <button
            v-if="editMode"
            @click="addQuestion"
            class="flex items-center flex-row justify-center border border-grey-secondary rounded-xl px-4 py-2 gap-2 hover:bg-black-primary hover:text-white"
          >
            <Add class="w-5 h-5" />
            <div class="text-base">Add Question</div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { debounce } from "lodash";
import Setting from "@/components/icons/Setting.vue";
import Add from "@/components/icons/Add.vue";
import Delete from "@/components/icons/Delete.vue";
import Include from "@/components/icons/Include.vue";

// {
//             "id": "01JM4T28J1R62WJPXFBN04WA6F",
//             "title": "Sample Survey",
//             "description": "This is a sample survey",
//             "is_complete": false,
//             "create_at": "2025-02-15T12:41:49.889Z",
//             "questions": [
//                 {
//                     "id": "01JM4T28J1R62WJPXFBJ2KANM2",
//                     "question": "What is your opinion?",
//                     "po_id": "01JKK58CDCMNF4VDR69DGJPQZN",
//                     "plo_id": "01JKK58K4JD4XNQQ9CVNEF2G6V",
//                     "so_id": "01JKK586ND59G4E7J0VXJJKRTE",
//                     "survey_id": "01JM4T28J1R62WJPXFBN04WA6F",
//                     "q_scores": []
//                 }
//             ],
//             "course_id": "01JKK52H934X4KCRHNBRGY068W"
//         },
const CreateSurvey = async (course_id) => {
  try {
    const response = await fetch(`${base_url}surveys`, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: survey.value.name,
        description: survey.value.name,
        is_complete: false,
        course_id: course_id,
        questions: map(survey.value.question, (question) => ({
          question: question.question,
          po_id: question.po_id,
          plo_id: question.plo_id,
          so_id: question.so_id,
        })),
      }),
    });
    if (!response.ok) throw new Error("Failed to add student scores");
    const res = await response.json();
    console.log(res);
  } catch (error) {
    console.error("Error adding student scores:", error);
  }
};

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
  ],
});

const editMode = ref(false);

const toggleEditMode = () => {
  editMode.value = !editMode.value;
};

const addQuestion = () => {
  survey.value.question.push({
    id: `Q${survey.value.question.length + 1}`,
    question: "",
    plo: [],
    po: [],
    so: [],
  });
};

const removeQuestion = (index) => {
  survey.value.question.splice(index, 1);
};

const addPLO = (questionIndex) => {
  survey.value.question[questionIndex].plo.push("");
};

const removePLO = (questionIndex, ploIndex) => {
  survey.value.question[questionIndex].plo.splice(ploIndex, 1);
};

const addPO = (questionIndex) => {
  survey.value.question[questionIndex].po.push("");
};

const removePO = (questionIndex, poIndex) => {
  survey.value.question[questionIndex].po.splice(poIndex, 1);
};

const addSO = (questionIndex) => {
  survey.value.question[questionIndex].so.push("");
};

const removeSO = (questionIndex, soIndex) => {
  survey.value.question[questionIndex].so.splice(soIndex, 1);
};

const updatePLO = debounce((questionIndex, ploIndex, value) => {
  survey.value.question[questionIndex].plo[ploIndex] = value;
}, 300);

const updatePO = debounce((questionIndex, poIndex, value) => {
  survey.value.question[questionIndex].po[poIndex] = value;
}, 300);

const updateSO = debounce((questionIndex, soIndex, value) => {
  survey.value.question[questionIndex].so[soIndex] = value;
}, 300);
</script>

<style lang="scss" scoped>
.scrollbar-set {
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>

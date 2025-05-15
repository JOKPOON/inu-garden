<template>
  <teleport to="body">
    <div
      class="w-full h-full fixed inset-0 flex items-center justify-center bg-black-primary bg-opacity-50 z-50"
    >
      <div
        class="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center border border-grey-secondary"
      >
        <div
          class="flex flex-col w-[28rem] pb-2 border-b border-grey-secondary"
        >
          <div
            class="text-2xl font-semibold text-black-primary w-full text-start"
          >
            Add Student to Assessment
          </div>
          <div class="text-sm text-grey-primary mt-1">
            <span class="font-semibold text-black-primary"> {{ name }} </span>
            in
            <span class="font-semibold text-black-primary">{{
              groupName
            }}</span>
          </div>
        </div>
        <div class="mt-4 text-center flex gap-4 flex-col text-sm w-[28rem]">
          <div class="flex flex-col items-start w-full gap-2">
            <label class="font-semibold text-black-primary">Student ID</label>
            <div
              class="bg-transparent border border-grey-secondary rounded-xl text-base p-3 hover:cursor-pointer w-full"
            >
              <input
                v-if="studentSelected"
                v-model="studentSelected.student_id"
                class="w-full border-none outline-none"
                placeholder="Enter Student ID"
                @keyup.enter="handleSearch"
              />
            </div>
            <button
              @click="handleSearch"
              class="py-2 font-medium border border-grey-secondary text-black-primary rounded-xl w-full bg-yellow-primary hover:bg-black-primary hover:text-white"
            >
              Search
            </button>
            <div
              v-if="students"
              class="flex flex-col items-start w-full gap-2 max-h-[150px] overflow-y-auto"
            >
              <div
                v-for="student in students"
                :key="student.id"
                class="bg-white border border-grey-secondary rounded-xl text-base p-3 hover:cursor-pointer w-full"
                @click="handleSelectStudent(student)"
              >
                {{ student.student_id }} - {{ student.first_name_en }}
                {{ student.last_name_en }}
              </div>
            </div>
          </div>
          <div class="flex flex-col items-start w-full gap-2">
            <label class="font-semibold text-black-primary">Score</label>
            <div
              class="bg-transparent border border-grey-secondary rounded-xl text-base p-3 hover:cursor-pointer w-full"
            >
              <input
                v-if="studentSelected"
                type="number"
                v-model="studentSelected.score"
                class="w-full border-none outline-none"
                placeholder="Enter Score"
              />
            </div>
          </div>
        </div>
        <div
          class="flex flex-row items-center justify-center gap-2 w-full mt-4 rounded-xl"
        >
          <button
            @click="addStudent"
            class="py-2 font-medium border border-grey-secondary text-black-primary rounded-xl w-full bg-yellow-primary hover:bg-black-primary hover:text-white"
          >
            Add
          </button>
          <button
            @click="$emit('close')"
            class="py-2 font-medium border border-grey-secondary text-black-primary rounded-xl w-full hover:bg-black-primary hover:text-white"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { ref } from "vue";
import { defineProps, defineEmits } from "vue";
import { fetchEnrollments, BaseURL } from "~/api/api";

const emit = defineEmits(["close", "updated"]);

const props = defineProps({
  groupID: {
    type: String,
    required: true,
  },
  groupName: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  courseId: {
    type: String,
    required: true,
  },
});

const students = ref(null);
const studentSelected = ref({
  student_id: null,
  score: null,
});

const handleSearch = () => {
  fetchEnrollments(students, props.courseId, studentSelected.value.student_id);
  console.log(students.value);
};

const handleSelectStudent = (student) => {
  studentSelected.value = student;
  students.value = null;
};

const addStudent = async () => {
  if (!studentSelected.value.student_id || !studentSelected.value.score) {
    alert("Please fill in all fields");
    return;
  }
  try {
    await fetch(BaseURL + "scores", {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        assignment_id: props.id,
        student_scores: [
          {
            student_id: studentSelected.value.student_id,
            score: studentSelected.value.score,
          },
        ],
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.error) {
          console.error(json.error);
          return;
        }
        emit("updated", studentSelected.value);
        console.log(json);
      });
  } catch (error) {
    console.error("Error adding score:", error);
  }
  emit("close");
};
</script>

<style scoped>
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}
</style>

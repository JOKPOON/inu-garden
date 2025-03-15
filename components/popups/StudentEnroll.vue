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
            Student Details
          </div>
          <div class="text-sm text-grey-primary mt-1">
            Student details in
            <span class="font-semibold text-black-primary">{{
              courseName
            }}</span>
          </div>
        </div>
        <div class="mt-4 text-center flex gap-4 flex-col text-sm w-[28rem]">
          <div class="grid grid-cols-2 gap-4">
            <div class="flex flex-col items-start w-full gap-2">
              <label class="font-semibold text-black-primary">Student ID</label>
              <div
                class="w-full px-4 py-2 border border-grey-secondary rounded-xl"
              >
                {{ props.studentID }}
              </div>
            </div>
            <div class="flex flex-col items-start w-full gap-2">
              <label class="font-semibold text-black-primary">Program</label>
              <div
                class="w-full px-4 py-2 border border-grey-secondary rounded-xl"
              >
                {{ student.program }}
              </div>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="flex flex-col items-start w-full gap-2">
              <label class="font-semibold text-black-primary">Name (TH)</label>
              <div
                class="w-full px-4 py-2 border border-grey-secondary rounded-xl"
              >
                {{ student.first_name_th }} {{ student.last_name_th }}
              </div>
            </div>
            <div class="flex flex-col items-start w-full gap-2">
              <label class="font-semibold text-black-primary">Name (EN)</label>
              <div
                class="w-full px-4 py-2 border border-grey-secondary rounded-xl"
              >
                {{ student.first_name_en }} {{ student.last_name_en }}
              </div>
            </div>
          </div>

          <div class="flex flex-col items-start w-full gap-2">
            <label class="font-semibold text-black-primary">Program</label>
            <div
              class="w-full px-4 py-2 border border-grey-secondary rounded-xl text-start"
            >
              {{ student.programme_name }}
            </div>
          </div>
          <div class="flex flex-col items-start w-full gap-2">
            <label class="font-semibold text-black-primary">Department</label>
            <div
              class="w-full px-4 py-2 border border-grey-secondary rounded-xl text-start"
            >
              {{ student.department_name }}
            </div>
          </div>
          <div class="flex flex-col items-start w-full gap-2">
            <label class="font-semibold text-black-primary">Email</label>
            <div
              class="w-full px-4 py-2 border border-grey-secondary rounded-xl text-start"
            >
              {{ student.email }}
            </div>
          </div>
        </div>
        <div
          class="flex flex-row items-center justify-center gap-2 w-full mt-4 rounded-xl"
        >
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

const emit = defineEmits(["close"]);

const student = ref({
  id: "64070501011",
  first_name_th: "อริสา",
  last_name_th: "สมิธ",
  first_name_en: "Alice",
  last_name_en: "Smith",
  gpax: 3.9,
  math_gpa: 4.0,
  eng_gpa: 3.8,
  sci_gpa: 3.9,
  school: "XYZ High School",
  city: "Chiang Mai",
  email: "alice.smith@example.com",
  year: "2024",
  program: "Regular",
  remark: "Top scorer in regional math olympiad",
  programme_name: "Computer Engineering",
  department_name: "Computer Engineering",
  programme_id: "01JKK501SMEE3K9NYKBVAKHER6",
});

const props = defineProps({
  studentID: {
    type: String,
    required: true,
  },
  courseID: {
    type: String,
    required: true,
  },
  courseName: {
    type: String,
    required: true,
  },
  studentName: {
    type: String,
    required: true,
  },
  studentStatus: {
    type: String,
    required: true,
  },
});

const enrollStudent = () => {
  // Add your enrollment logic here
  emit("close");
};
</script>

<style scoped></style>

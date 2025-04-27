<template>
    <teleport to="body">
      <div
        class="w-full h-full fixed inset-0 flex items-center justify-center bg-black-primary bg-opacity-50 z-50"
      >
        <div
          class="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center border border-grey-secondary"
        >
          <div class="flex flex-col w-full">
            <div class="text-2xl font-semibold text-black-primary">
              Edit Student Details
            </div>
            <div class="text-sm text-grey-primary mt-1">
              Editing details of
              <span class="font-normal text-grey-primary">{{
                student.name
              }}</span>
            </div>
          </div>
          <div
            class="mt-4 text-start flex gap-4 flex-col text-sm max-h-[50vh] overflow-y-scroll scrollbar-set"
          >
            <div class="flex flex-col items-start w-full gap-2">
              <label class="font-normal text-grey-primary">Student ID</label>
              <input
                type="text"
                v-model="student.studentId"
                class="w-[32rem] px-4 py-2 border border-grey-secondary rounded-xl"
                disabled
              />
            </div>
            <div class="flex flex-col items-start w-full gap-2">
              <label class="font-normal text-grey-primary">Name</label>
              <input
                type="text"
                v-model="student.name"
                class="w-[32rem] px-4 py-2 border border-grey-secondary rounded-xl"
              />
            </div>
            <div class="flex flex-col items-start w-full gap-2">
              <label class="font-normal text-grey-primary">Email</label>
              <input
                type="email"
                v-model="student.email"
                class="w-[32rem] px-4 py-2 border border-grey-secondary rounded-xl"
              />
            </div>
            <div class="flex flex-col items-start w-full gap-2">
              <label class="font-normal text-grey-primary">Faculty</label>
              <input
                type="text"
                v-model="student.faculty"
                class="w-[32rem] px-4 py-2 border border-grey-secondary rounded-xl"
              />
            </div>
            <div class="flex flex-col items-start w-full gap-2">
              <label class="font-normal text-grey-primary">Department</label>
              <input
                type="text"
                v-model="student.department"
                class="w-[32rem] px-4 py-2 border border-grey-secondary rounded-xl"
              />
            </div>
            <div class="flex flex-col items-start w-full gap-2">
              <label class="font-normal text-grey-primary">Program</label>
              <input
                type="text"
                v-model="student.program"
                class="w-[32rem] px-4 py-2 border border-grey-secondary rounded-xl"
              />
            </div>
            <div class="grid grid-cols-2 w-[32rem] gap-2">
              <div class="flex flex-col items-start w-full gap-2">
                <label class="font-normal text-grey-primary">GPAX</label>
                <input
                  type="number"
                  step="0.01"
                  v-model="student.gpax"
                  class="w-full px-4 py-2 border border-grey-secondary rounded-xl"
                />
              </div>
              <div class="flex flex-col items-start w-full gap-2">
                <label class="font-normal text-grey-primary"
                  >High School GPAX</label
                >
                <input
                  type="number"
                  step="0.01"
                  v-model="student.highSchoolGpax"
                  class="w-full px-4 py-2 border border-grey-secondary rounded-xl"
                />
              </div>
            </div>
            <div class="grid grid-cols-2 w-[32rem] gap-2">
              <div class="flex flex-col items-start w-full gap-2">
                <label class="font-normal text-grey-primary">Math GPAX</label>
                <input
                  type="number"
                  step="0.01"
                  v-model="student.mathGpax"
                  class="w-full px-4 py-2 border border-grey-secondary rounded-xl"
                />
              </div>
              <div class="flex flex-col items-start w-full gap-2">
                <label class="font-normal text-grey-primary">Science GPAX</label>
                <input
                  type="number"
                  step="0.01"
                  v-model="student.scienceGpax"
                  class="w-full px-4 py-2 border border-grey-secondary rounded-xl"
                />
              </div>
              <div class="flex flex-col items-start w-full gap-2">
                <label class="font-normal text-grey-primary">English GPAX</label>
                <input
                  type="number"
                  step="0.01"
                  v-model="student.englishGpax"
                  class="w-full px-4 py-2 border border-grey-secondary rounded-xl"
                />
              </div>
              <div class="flex flex-col items-start w-full gap-2">
                <label class="font-normal text-grey-primary">Admission Score</label>
                <input
                  type="number"
                  step="0.01"
                  v-model="student.admission"
                  class="w-full px-4 py-2 border border-grey-secondary rounded-xl"
                />
              </div>
            </div>
            <div class="flex flex-col items-start w-full gap-2 mb-4">
              <label class="font-normal text-grey-primary">School Name</label>
              <input
                type="text"
                v-model="student.schoolName"
                class="w-[32rem] px-4 py-2 border border-grey-secondary rounded-xl"
              />
            </div>
          </div>
          <div
            class="flex flex-row items-center justify-center gap-4 w-full mt-4"
          >
            <button
              @click="saveChanges"
              class="py-2 font-medium border border-grey-secondary text-white rounded-xl w-full hover:bg-black-primary bg-yellow-primary hover:text-black-primary"
            >
              Save
            </button>
            <button
              @click="$emit('close')"
              class="py-2 font-medium border border-grey-secondary text-black-primary rounded-xl w-full hover:bg-black-primary hover:text-white"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </teleport>
  </template>
  
  <script setup>
  import { defineProps, defineEmits, ref, watch } from "vue";
  
  const props = defineProps({
    studentId: {
      type: String,
      required: true,
    },
  });
  
  const emit = defineEmits(["close", "save"]);
  
  const student = ref({});
  
  const Students = ref([
    {
      id: 1,
      studentId: "S001",
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      faculty: "Science",
      department: "Biology",
      program: "Undergraduate",
      gpax: 3.8,
      highSchoolGpax: 3.9,
      mathGpax: 3.7,
      scienceGpax: 3.6,
      englishGpax: 3.8,
      admission: 3.85,
      schoolName: "Greenwood High School",  grade: [
      {
        semester: "1st/2023",
        gpax: 3.8,
      },
      {
        semester: "2nd/2023",
        gpax: 3.9,
      },
      {
        semester: "3rd/2023",
        gpax: 4.0,
      },
      {
        semester: "4th/2023",
        gpax: 3.7,
      },
    ],
    PLO: [
      {
        code: "PLO1",
        desc: "Understand the basic concepts of biology",
        course: [
          { id: "CPE2", name: "Biology 101" },
          { id: "CPE3", name: "Biology Lab" },
        ],
        status: 0,
      },
      {
        code: "PLO2",
        desc: "Apply biological concepts to real-world problems",
        course: [
          { id: "CPE4", name: "Biology 201" },
          { id: "CPE5", name: "Biology Lab II" },
        ],
        status: 1,
      },
    ],
    PO: [
      {
        code: "PO1",
        desc: "Demonstrate knowledge of biology",
        course: [
          { id: "CPE4", name: "Biology 201" },
          { id: "CPE5", name: "Biology Lab II" },
        ],
        status: 0,
      },
    ],
    SO: [
      {
        code: "SO1",
        desc: "Conduct experiments in biology",
        course: [
          { id: "CPE4", name: "Biology 201" },
          { id: "CPE5", name: "Biology Lab II" },
        ],
        status: 0,
      },
    ],
    },

  ]);
  
  watch(
    () => props.studentId,
    (newId) => {
      student.value = { ...Students.value.find((s) => s.studentId === newId) };
    },
    { immediate: true }
  );
  
  const saveChanges = () => {
    const index = Students.value.findIndex((s) => s.studentId === student.value.studentId);
    if (index !== -1) {
      Students.value[index] = { ...student.value };
      emit("save", student.value);
    }
    emit("close");
  };
  </script>
  
  <style scoped>
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
<template>
    <teleport to="body">
      <div
        class="w-full h-full fixed inset-0 flex items-center justify-center bg-black-primary bg-opacity-50 z-50"
      >
        <div
          class="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center border border-grey-secondary"
        >
          <div class="flex flex-col w-[32rem]">
            <div class="text-2xl font-semibold text-black-primary">Add Student</div>
            <div class="text-sm text-grey-primary mt-1">
              Add a new student to the system.
            </div>
          </div>
          <div
            class="mt-4 text-center flex gap-4 flex-col text-sm max-h-[50vh] overflow-y-scroll scrollbar-set"
          >
            <div class="flex flex-col items-start w-full gap-2">
              <label class="font-semibold text-black-primary">Student ID</label>
              <input
                v-model="newStudent.studentId"
                type="text"
                placeholder="Student ID"
                class="w-[32rem] px-4 py-2 border border-grey-secondary rounded-xl outline-none"
              />
            </div>
            <div class="flex flex-col items-start w-full gap-2">
              <label class="font-semibold text-black-primary">Name</label>
              <input
                v-model="newStudent.name"
                type="text"
                placeholder="Student Name"
                class="w-[32rem] px-4 py-2 border border-grey-secondary rounded-xl outline-none"
              />
            </div>
            <div class="flex flex-col items-start w-full gap-2">
              <label class="font-semibold text-black-primary">Email</label>
              <input
                v-model="newStudent.email"
                type="email"
                placeholder="Student Email"
                class="w-[32rem] px-4 py-2 border border-grey-secondary rounded-xl outline-none"
              />
            </div>
            <div class="flex flex-col items-start w-full gap-2">
              <label class="font-semibold text-black-primary">Faculty</label>
              <input
                v-model="newStudent.faculty"
                type="text"
                placeholder="Faculty"
                class="w-[32rem] px-4 py-2 border border-grey-secondary rounded-xl outline-none"
              />
            </div>
            <div class="flex flex-col items-start w-full gap-2">
              <label class="font-semibold text-black-primary">Department</label>
              <input
                v-model="newStudent.department"
                type="text"
                placeholder="Department"
                class="w-[32rem] px-4 py-2 border border-grey-secondary rounded-xl outline-none"
              />
            </div>
            <div class="flex flex-col items-start w-full gap-2">
              <label class="font-semibold text-black-primary">Program</label>
              <input
                v-model="newStudent.program"
                type="text"
                placeholder="Program"
                class="w-[32rem] px-4 py-2 border border-grey-secondary rounded-xl outline-none"
              />
            </div>
                  <div class="grid grid-cols-2 w-[32rem] gap-2">
            <div class="flex flex-col items-start w-full gap-2">
              <label class="font-semibold text-black-primary">GPAX</label>
              <input
                v-model="newStudent.gpax"
                type="number"
                step="0.01"
                placeholder="GPAX"
                class="w-full px-4 py-2 border border-grey-secondary rounded-xl outline-none"
              />
            </div>
            <div class="flex flex-col items-start w-full gap-2">
              <label class="font-semibold text-black-primary">High School GPAX</label>
              <input
                v-model="newStudent.highSchoolGpax"
                type="number"
                step="0.01"
                placeholder="High School GPAX"
                class="w-full px-4 py-2 border border-grey-secondary rounded-xl outline-none"
              />
            </div>
            <div class="flex flex-col items-start w-full gap-2">
              <label class="font-semibold text-black-primary">Math GPAX</label>
              <input
                v-model="newStudent.mathGpax"
                type="number"
                step="0.01"
                placeholder="Math GPAX"
                class="w-full px-4 py-2 border border-grey-secondary rounded-xl outline-none"
              />
            </div>
            <div class="flex flex-col items-start w-full gap-2">
              <label class="font-semibold text-black-primary">Science GPAX</label>
              <input
                v-model="newStudent.scienceGpax"
                type="number"
                step="0.01"
                placeholder="Science GPAX"
                class="w-full px-4 py-2 border border-grey-secondary rounded-xl outline-none"
              />
            </div>
            <div class="flex flex-col items-start w-full gap-2">
              <label class="font-semibold text-black-primary">English GPAX</label>
              <input
                v-model="newStudent.englishGpax"
                type="number"
                step="0.01"
                placeholder="English GPAX"
                class="w-full px-4 py-2 border border-grey-secondary rounded-xl outline-none"
              />
            </div>
            <div class="flex flex-col items-start w-full gap-2">
              <label class="font-semibold text-black-primary">Admission Score</label>
              <input
                v-model="newStudent.admissionGpax"
                type="number"
                step="0.01"
                placeholder="Admission GPAX"
                class="w-full px-4 py-2 border border-grey-secondary rounded-xl outline-none"
              />
            </div> </div>
            <div class="flex flex-col items-start w-full gap-2 mb-4">
              <label class="font-semibold text-black-primary">School Name</label>
              <input
                v-model="newStudent.schoolName"
                type="text"
                placeholder="School Name"
                class="w-[32rem] px-4 py-2 border border-grey-secondary rounded-xl outline-none"
              />
            </div>
          </div>
          <div
            class="flex flex-row items-center justify-center gap-4 w-full mt-4"
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
  import { defineEmits } from "vue";
  
  const emit = defineEmits(["close", "add"]);
  
  const newStudent = ref({
    studentId: "",
    name: "",
    email: "",
    faculty: "",
    department: "",
    program: "",
    highSchoolGpax: 0,
    gpax: 0,
    mathGpax: 0,
    scienceGpax: 0,
    englishGpax: 0,
    admissionGpax: 0,
    schoolName: "",
  });
  
  const addStudent = () => {
    emit("add", newStudent.value);
    newStudent.value = {
      studentId: "",
      name: "",
      email: "",
      faculty: "",
      department: "",
      program: "",
        gpax: 0,
        mathGpax: 0,
      highSchoolGpax: 0,
      scienceGpax: 0,
      englishGpax: 0,
      admissionGpax: 0,
      schoolName: "",
    };
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
  
  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  
  input[type="number"] {
    -moz-appearance: textfield;
  }
  </style>
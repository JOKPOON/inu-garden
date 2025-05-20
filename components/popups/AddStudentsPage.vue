<template>
  <teleport to="body">
    <div
      class="w-full h-full fixed inset-0 flex items-center justify-center bg-black-primary bg-opacity-50 z-50"
    >
      <div
        class="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center border border-grey-secondary"
      >
        <div class="flex flex-col w-[32rem]">
          <div class="text-2xl font-semibold text-black-primary">
            Add Student
          </div>
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
              v-model="newStudent.id"
              type="text"
              placeholder="Student ID"
              class="w-[32rem] px-4 py-2 border border-grey-secondary rounded-xl outline-none"
            />
          </div>
          <div class="flex flex-col items-start w-full gap-2">
            <label class="font-semibold text-black-primary"
              >First Name (Thai)</label
            >
            <input
              v-model="newStudent.first_name_th"
              type="text"
              placeholder="First Name (Thai)"
              class="w-[32rem] px-4 py-2 border border-grey-secondary rounded-xl outline-none"
            />
          </div>
          <div class="flex flex-col items-start w-full gap-2">
            <label class="font-semibold text-black-primary">
              Last Name (Thai)
            </label>
            <input
              v-model="newStudent.last_name_th"
              type="text"
              placeholder="Last Name (Thai)"
              class="w-[32rem] px-4 py-2 border border-grey-secondary rounded-xl outline-none"
            />
          </div>
          <div class="flex flex-col items-start w-full gap-2">
            <label class="font-semibold text-black-primary">
              First Name (English)
            </label>
            <input
              v-model="newStudent.first_name_en"
              type="text"
              placeholder="First Name (English)"
              class="w-[32rem] px-4 py-2 border border-grey-secondary rounded-xl outline-none"
            />
          </div>
          <div class="flex flex-col items-start w-full gap-2">
            <label class="font-semibold text-black-primary">
              Last Name (English)
            </label>
            <input
              v-model="newStudent.last_name_en"
              type="text"
              placeholder="Last Name (English)"
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
            <label class="font-semibold text-black-primary">Department</label>
            <select
              v-model="newStudent.department_id"
              @change="fetchPrograms(programList, newStudent.department_id)"
              class="w-[32rem] px-4 py-2 border border-grey-secondary rounded-xl outline-none pr-2"
            >
              <option value="" disabled selected>Select Department</option>
              <option
                v-for="department in departmentList"
                :key="department.id"
                :value="department.id"
              >
                {{ department.name_th }}
              </option>
            </select>
          </div>
          <div class="flex flex-col items-start w-full gap-2">
            <label class="font-semibold text-black-primary">Program</label>
            <select
              v-model="newStudent.programme_id"
              :disabled="!newStudent.department_id || programList.length === 0"
              class="w-[32rem] px-4 py-2 border border-grey-secondary rounded-xl outline-none pr-2"
            >
              <option value="" disabled selected>Select Program</option>
              <option
                v-for="program in programList"
                :key="program.id"
                :value="program.id"
              >
                {{ program.name_th }}
              </option>
            </select>
          </div>
          <div class="flex flex-col items-start w-full gap-2 mb-4">
            <label class="font-semibold text-black-primary">Year</label>
            <input
              v-model="newStudent.year"
              type="text"
              placeholder="Year"
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
import { fetchDepartments, fetchPrograms, BaseURL } from "~/api/api";

const emit = defineEmits(["close", "add"]);

const newStudent = ref({
  id: "",
  first_name_th: "",
  last_name_th: "",
  first_name_en: "",
  last_name_en: "",
  email: "",
  department_id: "",
  programme_id: "",
  year: "",
});

const addStudent = async () => {
  try {
    const response = await fetch(`${BaseURL}students`, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newStudent.value),
    });
    if (!response.ok) throw new Error("Failed to add student");
    emit("add");
  } catch (error) {
    console.error("Error adding student:", error);
  }
  emit("close");
};

const departmentList = ref([]);
const programList = ref([]);
onMounted(async () => {
  await fetchDepartments(departmentList);
  await fetchPrograms(programList, newStudent.department);
  console.log(departmentList.value);
  console.log(programList.value);
});
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

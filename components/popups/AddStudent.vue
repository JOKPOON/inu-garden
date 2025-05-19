<template>
  <teleport to="body">
    <div
      class="w-full h-full fixed inset-0 flex items-center justify-center bg-black-primary bg-opacity-50 z-50"
    >
      <div
        class="bg-white p-8 rounded-xl shadow-lg flex flex-col items-center border border-grey-secondary"
      >
        <div class="flex flex-col w-[28rem]">
          <div class="text-2xl font-semibold text-black-primary">
            Add Student
          </div>
          <div class="text-sm text-grey-primary mt-1">
            Please select :
            <span class="font-medium text-black-primary"
              >Program, Department, Year
            </span>
          </div>
        </div>
        <div class="max-h-[28rem] overflow-y-scroll scrollbar-set">
          <div class="mt-4 text-center flex gap-4 flex-col text-sm">
            <div
              class="px-4 py-3 bg-white border border-grey-secondary rounded-xl flex flex-row gap-4 items-center"
            >
              <select
                v-model="selectedDepartment"
                class="bg-transparent w-[26rem] border-none focus:ring-0 outline-none text-base pr-2 hover:cursor-pointer"
              >
                <option value="">Departments</option>
                <option
                  v-for="department in departments"
                  :key="department.id"
                  :value="department.id"
                >
                  {{ department.name_en }}
                </option>
              </select>
            </div>
            <div
              class="px-4 py-3 bg-white border border-grey-secondary rounded-xl flex flex-row gap-4 items-center"
            >
              <select
                v-model="selectedProgram"
                class="bg-transparent w-[26rem] border-none focus:ring-0 outline-none text-base pr-2 hover:cursor-pointer"
              >
                <option value="">Programs</option>
                <option
                  v-for="program in programs"
                  :key="program.id"
                  :value="program.id"
                >
                  {{ program.name_en }}
                </option>
              </select>
            </div>
            <div
              class="px-4 py-3 bg-white border border-grey-secondary rounded-xl flex flex-row gap-4 items-center"
            >
              <select
                v-model="selectedYear"
                class="bg-transparent w-[26rem] border-none focus:ring-0 outline-none text-base pr-2 hover:cursor-pointer"
              >
                <option value="">Years</option>
                <option v-for="year in years" :key="year" :value="year">
                  {{ year }}
                </option>
              </select>
            </div>
            <input
              v-if="
                selectedYear != '' &&
                selectedDepartment != '' &&
                selectedProgram != ''
              "
              v-model="student.id"
              type="text"
              placeholder="Enter Student ID"
              class="w-[28rem] px-4 py-2 border border-grey-secondary rounded-xl outline-none"
              @keydown.enter="onEnter"
            />
            <h3
              class="text-base font-semibold border-b border-grey-secondary py-1 text-start"
            >
              Results
            </h3>
            <div>
              <ul
                v-if="students.students"
                class="max-h-60 overflow-y-scroll scrollbar-set w-[28rem] bg-white border border-grey-secondary rounded-xl mt-2"
              >
                <li
                  v-for="student in students.students"
                  :key="student.id"
                  @click="selectStudent(student)"
                  class="px-4 py-2 cursor-pointer hover:bg-grey-secondary"
                >
                  {{ student.id }} - {{ student.first_name_en }}
                  {{ student.last_name_en }}
                </li>
              </ul>
              <div v-else class="text-black-primary mt-2">
                <div
                  v-if="
                    selectedYear != '' &&
                    selectedDepartment != '' &&
                    selectedProgram != ''
                  "
                >
                  No results found
                </div>
              </div>
            </div>
          </div>
          <div v-if="selectedStudents.length" class="mt-6 w-[28rem]">
            <h3
              class="text-base font-semibold border-b border-grey-secondary py-1"
            >
              Selected Students
              <span class="font-normal text-grey-primary"
                >({{ selectedStudents.length }})
              </span>
            </h3>
            <ul class="mt-2 max-h-60 overflow-y-scroll scrollbar-set">
              <li
                v-for="student in selectedStudents"
                :key="student.id"
                class="pt-1 flex justify-between items-center"
              >
                <span
                  >{{ student.id }} - {{ student.first_name_en }}
                  {{ student.last_name_en }}</span
                >
                <button
                  @click="removeStudent(student.id)"
                  class="flex items-center justify-center bg-white rounded-xl p-2 border border-grey-secondary hover:bg-red-500 text-black-primary hover:text-white"
                >
                  <Delete class="w-5 h-5" />
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div
          class="flex flex-row items-center justify-center gap-2 w-full mt-6 border border-grey-secondary rounded-xl"
        >
          <button
            @click="addStudentAll"
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
import { ref, computed } from "vue";
import { defineProps, defineEmits } from "vue";
import Delete from "@/components/icons/Delete.vue";
import { BaseURL } from "@/api/api";
import { fetchDepartments, fetchPrograms, fetchStudents } from "~/api/api";

const emit = defineEmits(["close", "addStudent"]);

const student = ref({
  id: "",
});

const selectedStudents = ref([]);

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const students = ref([]);
const programs = ref([]);
const departments = ref([]);
const years = ref(["2023", "2024", "2025"]);

const selectedProgram = ref("");
const selectedDepartment = ref("");
const selectedYear = ref("");

const selectStudent = (selectedStudent) => {
  student.value = { ...selectedStudent };
  addStudent();
};

const addStudent = () => {
  if (student.value.id) {
    selectedStudents.value.push({ ...student.value });
    student.value = {
      id: "",
      programme_name: "",
      department_name: "",
      year: "",
    };
  }
};

const addStudentAll = async () => {
  emit("addStudent", selectedStudents.value);
  await addStudentEnrollment(selectedStudents.value);
  console.log(selectedStudents.value);
  selectedStudents.value = [];
  emit("updated");
  emit("close");
};

const removeStudent = (id) => {
  selectedStudents.value = selectedStudents.value.filter(
    (student) => student.id !== id
  );
};

onMounted(() => {
  fetchPrograms(programs, selectedDepartment.value);
  fetchDepartments(departments);
});

watch(selectedDepartment, () => {
  fetchPrograms(programs, selectedDepartment.value);
  if (
    selectedDepartment.value != "" &&
    selectedProgram.value != "" &&
    selectedYear.value != ""
  ) {
    fetchStudents(
      students,
      "",
      selectedProgram.value,
      selectedDepartment.value,
      selectedYear.value
    );
  }
});

watch(selectedProgram, () => {
  if (
    selectedDepartment.value != "" &&
    selectedProgram.value != "" &&
    selectedYear.value != ""
  ) {
    fetchStudents(
      students,
      "",
      selectedProgram.value,
      selectedDepartment.value,
      selectedYear.value
    );
  }
});

watch(selectedYear, () => {
  if (
    selectedDepartment.value != "" &&
    selectedProgram.value != "" &&
    selectedYear.value != ""
  ) {
    fetchStudents(
      students,
      "",
      selectedProgram.value,
      selectedDepartment.value,
      selectedYear.value
    );
  }
});

const onEnter = () => {
  fetchStudents(
    students,
    student.value.id || "",
    selectedProgram.value,
    selectedDepartment.value,
    selectedYear.value
  );
};

const addStudentEnrollment = async (students) => {
  await fetch(BaseURL + "enrollments", {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      course_id: props.id,
      student_ids: students.map((student) => student.id),
      status: "ENROLL",
    }),
  })
    .then((response) => response.json())
    .then((json) => {
      if (json.error) {
        console.error(json.error);
        return;
      }
      console.log(json);
    });
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

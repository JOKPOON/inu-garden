<template>
  <teleport to="body">
    <div
      class="w-full h-full fixed inset-0 flex items-center justify-center bg-black-primary bg-opacity-50 z-50"
    >
      <div class="bg-white p-6 rounded-2xl shadow-lg">
        <div
          class="flex flex-row justify-between items-center gap-12 pb-2 border-b"
        >
          <div class="w-full flex flex-row gap-4 items-center">
            <div class="rounded-full bg-black-primary h-16 w-16"></div>
            <div class="flex flex-col">
              <div
                class="text-lg 3xl:text-lg font-semibold text-black-primary text-start"
              >
                {{ selectedUser.first_name }} {{ selectedUser.last_name }}
              </div>
              <div class="text-base text-black-primary text-start">
                {{ selectedUser.role }}
              </div>
            </div>
          </div>

          <div v-if="!editMode && !deleteMode" class="flex flex-row gap-2">
            <button
              @click="handleEdit"
              class="flex items-center justify-center rounded-xl p-2 border hover:bg-black-primary hover:text-white"
            >
              <Edit class="w-6 h-6" />
            </button>
            <button
              @click="handleDelete"
              class="flex items-center justify-center rounded-xl p-2 border hover:bg-red-500 hover:text-white"
            >
              <Delete class="w-6 h-6" />
            </button>
          </div>
        </div>
        <div
          v-if="!deleteMode"
          class="max-h-[calc(100vh-385px)] overflow-y-scroll scrollbar-set mt-4"
        >
          <div class="flex flex-col gap-2">
            <div class="grid grid-cols-2 gap-4 mt-2">
              <div class="flex flex-col gap-1 min-w-64">
                <div class="col-span-1 text-grey-primary text-sm">
                  Academic Position - English
                </div>
                <div
                  v-if="!editMode"
                  class="col-span-2 border text-black border-grey-tertiary rounded-xl p-3"
                >
                  {{ selectedUser.academic_position_eng }}
                </div>
                <input
                  v-if="editMode"
                  v-model="userAcademicEng"
                  class="col-span-2 w-full border text-black border-grey-tertiary rounded-xl p-3 outline-grey-tertiary"
                  type="text"
                  :placeholder="selectedUser.academic_position_eng"
                />
              </div>
              <div class="flex flex-col gap-1 min-w-64">
                <div class="col-span-1 text-grey-primary text-sm">
                  Academic Position - ไทย
                </div>
                <div
                  v-if="!editMode"
                  class="col-span-2 border text-black border-grey-tertiary rounded-xl p-3"
                >
                  {{ selectedUser.academic_position_thai }}
                </div>
                <input
                  v-if="editMode"
                  v-model="userAcademicThai"
                  class="col-span-2 w-full border text-black border-grey-tertiary rounded-xl p-3 outline-grey-tertiary"
                  type="text"
                  :placeholder="selectedUser.academic_position_thai"
                />
              </div>
            </div>
            <div class="grid grid-cols-2 gap-4 mt-2">
              <div class="flex flex-col gap-1 min-w-64">
                <div class="col-span-1 text-grey-primary text-sm">
                  First Name - English
                </div>
                <div
                  v-if="!editMode"
                  class="col-span-2 border text-black border-grey-tertiary rounded-xl p-3"
                >
                  {{ selectedUser.first_name }}
                </div>
                <input
                  v-if="editMode"
                  v-model="userFirstname"
                  class="col-span-2 w-full border text-black border-grey-tertiary rounded-xl p-3 outline-grey-tertiary"
                  type="text"
                  :placeholder="selectedUser.first_name"
                />
              </div>
              <div class="flex flex-col gap-1 min-w-64">
                <div class="col-span-1 text-grey-primary text-sm">
                  Last Name - English
                </div>
                <div
                  v-if="!editMode"
                  class="col-span-2 border text-black border-grey-tertiary rounded-xl p-3"
                >
                  {{ selectedUser.last_name }}
                </div>
                <input
                  v-if="editMode"
                  v-model="userLastname"
                  class="col-span-2 w-full border text-black border-grey-tertiary rounded-xl p-3 outline-grey-tertiary"
                  type="text"
                  :placeholder="selectedUser.last_name"
                />
              </div>
            </div>
            <div class="grid grid-cols-2 gap-4 mt-2">
              <div class="flex flex-col gap-1 min-w-64">
                <div class="col-span-1 text-grey-primary text-sm">
                  First Name - ไทย
                </div>
                <div
                  v-if="!editMode"
                  class="col-span-2 border text-black border-grey-tertiary rounded-xl p-3"
                >
                  {{ selectedUser.first_name_thai }}
                </div>
                <input
                  v-if="editMode"
                  v-model="userFirstnameThai"
                  class="col-span-2 w-full border text-black border-grey-tertiary rounded-xl p-3 outline-grey-tertiary"
                  type="text"
                  :placeholder="selectedUser.first_name_thai"
                />
              </div>
              <div class="flex flex-col gap-1 min-w-64">
                <div class="col-span-1 text-grey-primary text-sm">
                  Last Name - ไทย
                </div>
                <div
                  v-if="!editMode"
                  class="col-span-2 border text-black border-grey-tertiary rounded-xl p-3"
                >
                  {{ selectedUser.last_name_thai }}
                </div>
                <input
                  v-if="editMode"
                  v-model="userLastnameThai"
                  class="col-span-2 w-full border text-black border-grey-tertiary rounded-xl p-3 outline-grey-tertiary"
                  type="text"
                  :placeholder="selectedUser.last_name_thai"
                />
              </div>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4 mt-2">
            <div class="flex flex-col gap-1 min-w-64">
              <div class="col-span-1 text-grey-primary text-sm">Email</div>
              <div
                v-if="!editMode"
                class="col-span-2 border text-black border-grey-tertiary rounded-xl p-3"
              >
                {{ selectedUser.email }}
              </div>
              <input
                v-if="editMode"
                v-model="userEmail"
                class="col-span-2 w-full border text-black border-grey-tertiary rounded-xl p-3 outline-grey-tertiary"
                type="text"
                :placeholder="selectedUser.email"
              />
            </div>
            <div class="flex flex-col gap-1 min-w-64">
              <div class="col-span-1 text-grey-primary text-sm">Role</div>
              <div
                v-if="!editMode"
                class="col-span-2 border text-black border-grey-tertiary rounded-xl p-3"
              >
                {{ selectedUser.role }}
              </div>
              <input
                v-if="editMode"
                v-model="userRole"
                class="col-span-2 w-full border text-black border-grey-tertiary rounded-xl p-3 outline-grey-tertiary"
                type="text"
                :placeholder="selectedUser.role"
              />
            </div>
          </div>
          <div class="flex flex-col gap-1 w-full mt-2">
            <div class="col-span-1 text-grey-primary text-sm">Degree</div>
            <div
              v-if="!editMode"
              class="col-span-2 border text-black border-grey-tertiary rounded-xl p-3"
            >
              {{ selectedUser.degree }}
            </div>
            <div class="flex flex-row gap-4 items-center">
              <input
                v-if="editMode"
                v-model="userDegree"
                class="col-span-2 w-full border text-black border-grey-tertiary rounded-xl p-3 outline-grey-tertiary"
                type="text"
                :placeholder="selectedUser.degree"
              />
              <div v-if="editMode" class="flex flex-row gap-2">
                <button
                  @click="editDegree"
                  class="flex items-center justify-center rounded-xl p-2 border hover:bg-black-primary hover:text-white"
                >
                  <Edit class="w-6 h-6" />
                </button>
                <button
                  @click="deleteDegree"
                  class="flex items-center justify-center rounded-xl p-2 border hover:bg-red-500 hover:text-white"
                >
                  <Delete class="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
          <button
            v-if="editMode"
            @click="addDegree"
            class="mt-2 font-medium w-full text-center py-2 border hover:bg-black-primary hover:text-white rounded-lg"
          >
            Add
          </button>
          <div class="flex flex-col gap-1 w-full mt-2">
            <div class="col-span-1 text-grey-primary text-sm">
              Courses
              <span class="text-yellow-primary">({{ courses.length }})</span>
            </div>
            <div class="flex flex-row gap-4 mb-2">
              <div
                class="px-4 py-3 bg-white border border-grey-secondary rounded-xl flex flex-row gap-4 items-center"
              >
                <input
                  type="text"
                  v-model="searchQuery"
                  class="bg-transparent border-none focus:ring-0 outline-none text-base w-40"
                  placeholder="Search..."
                />
                <button
                  class="flex items-center justify-center bg-white rounded-xl"
                  @click="handleSearch"
                >
                  <Search class="w-6 h-6" />
                </button>
              </div>
              <div
                class="px-4 py-3 bg-white border border-grey-secondary rounded-xl flex flex-row gap-4 items-center"
              >
                <select
                  v-model="selectedProgramOption"
                  class="bg-transparent border-none focus:ring-0 outline-none text-base pr-2 hover:cursor-pointer"
                >
                  <option value="">All Programs</option>
                  <option
                    v-for="option in programOptions"
                    :key="option"
                    :value="option"
                  >
                    {{ option }}
                  </option>
                </select>
              </div>
              <div
                class="px-4 py-3 bg-white border border-grey-secondary rounded-xl flex flex-row gap-4 items-center"
              >
                <select
                  v-model="selectedYearOption"
                  class="bg-transparent border-none focus:ring-0 outline-none text-base pr-2 hover:cursor-pointer"
                >
                  <option value="">All Years</option>
                  <option
                    v-for="option in yearsOptions"
                    :key="option"
                    :value="option"
                  >
                    {{ option }}
                  </option>
                </select>
              </div>
            </div>
            <div class="flex gap-4 flex-col">
              <div
                v-for="course in courses"
                :key="course.semester_id"
                class="bg-white border border-grey-tertiary shadow-sm rounded-xl p-6"
              >
                <div class="flex flex-row justify-between gap-6 items-center">
                  <button @click="overviewCourse(course.code)">
                    <p class="text-base text-start font-semibold text-grey-600">
                      {{ course.code }}
                    </p>
                    <p class="text-base text-start font-semibold">
                      {{ course.name }}
                    </p>
                  </button>
                  <div>
                    <div class="flex flex-row gap-2">
                      <button
                        @click="overviewCourse(course.code)"
                        class="flex items-center flex-row justify-center border border-grey-secondary hover:bg-black-primary text-black-primary hover:text-white rounded-xl px-4 py-3 gap-2"
                      >
                        <span class="font-semibold text-base">Overview</span>
                      </button>
                    </div>
                  </div>
                </div>
                <p class="text-sm text-orange-primary text-start">
                  {{ course.curriculum }}
                </p>
                <p class="text-sm text-grey-primary text-start">
                  credits : {{ course.credits }}
                </p>
                <div class="flex flex-row gap-2 mt-4">
                  <Lecturer class="w-6 h-6" />
                  <p class="text-sm text-grey-primary">
                    {{ course.user.first_name }}
                  </p>
                </div>
                <div class="grid grid-cols-2 gap-4 items-center mt-1">
                  <div class="flex flex-row gap-2">
                    <Course class="w-6 h-6" />
                    <p class="text-sm text-grey-primary">
                      Acadamic Year : {{ course.academic_year }}
                    </p>
                  </div>
                  <div class="flex flex-row gap-2 items-center">
                    <Course class="w-6 h-6" />
                    <p class="text-sm text-grey-primary">
                      Graduate Year : {{ course.graduate_year }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="deleteMode" class="mt-4 w-full">
          <div class="flex flex-col gap-1 w-full">
            <div class="col-span-1 text-grey-primary text-sm">
              Type "delete/{{ selectedUser.first_name }}" to delete
            </div>
            <input
              v-model="deleteUser"
              class="col-span-2 border text-black border-grey-tertiary rounded-xl p-3 outline-grey-tertiary w-96"
              type="text"
              placeholder="Type here..."
            />
            <div
              v-if="checkDelete"
              class="text-red-500 text-sm text-left w-full mt-1"
            >
              Incorrect input
            </div>
          </div>
        </div>
        <button
          v-if="!editMode && !deleteMode"
          @click="$emit('close')"
          class="mt-8 font-medium w-full text-center py-2 bg-grey-secondary hover:bg-black-primary hover:text-white rounded-lg"
        >
          Close
        </button>
        <div v-if="editMode && !deleteMode" class="flex flex-row gap-4 mt-8">
          <button
            @click="handleSaveEdit"
            class="w-full font-medium text-center py-2 bg-yellow-primary rounded-lg"
          >
            Save
          </button>
          <button
            @click="handleCancelEdit"
            class="w-full font-medium text-center py-2 bg-grey-secondary rounded-lg"
          >
            Cancel
          </button>
        </div>
        <div v-if="deleteMode && !editMode" class="flex flex-row gap-4 mt-8">
          <button
            @click="handleConfirmDelete"
            class="w-full font-medium text-center py-2 bg-yellow-primary rounded-lg"
          >
            Confirm
          </button>
          <button
            @click="handleCancelDelete"
            class="w-full font-medium text-center py-2 bg-grey-secondary rounded-lg"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { ref, computed } from "vue";
import Course from "@/components/icons/Course.vue";
import Lecturer from "@/components/icons/Lecturer.vue";
import Edit from "@/components/icons/Edit.vue";
import Delete from "@/components/icons/Delete.vue";
import Search from "@/components/icons/Search.vue";

const editMode = ref(false);
const deleteMode = ref(false);

const searchQuery = ref("");
const selectedProgramOption = ref("");
const selectedYearOption = ref("");

const programOptions = ref(getProgramOptions());
const yearsOptions = ref(getYearsOptions());

function getYearsOptions() {
  return ["2021", "2022", "2023", "2024"];
}

import { useRouter } from "vue-router";
const router = useRouter();

const overviewCourse = (code) => {
  router.push(`/courses/overview/${code}`);
};

function getProgramOptions() {
  return [
    "Regular",
    "International",
    "Health Data Science",
    "Ratchaburi Campus",
  ];
}

function handleSearch() {
  console.log("Search query:", searchQuery.value);
}

const props = defineProps({
  userId: {
    type: Number,
    required: true,
  },
});

const handleEdit = () => {
  editMode.value = !editMode.value;
};

const handleDelete = () => {
  deleteMode.value = !deleteMode.value;
};

const handleSaveEdit = () => {
  console.log("Save Edit");
  editMode.value = !editMode.value;
};

const handleCancelEdit = () => {
  console.log("Cancel Edit");
  editMode.value = !editMode.value;
};

const deleteUser = ref("");
const checkDelete = ref(false);

const handleConfirmDelete = () => {
  if (deleteUser.value === `delete/${selectedUser.first_name}`) {
    console.log("Confirm Delete");
    deleteMode.value = !deleteMode.value;
  } else {
    checkDelete.value = true;
    console.log("Incorrect input");
  }
};

const handleCancelDelete = () => {
  console.log("Cancel Delete");
  deleteMode.value = !deleteMode.value;
  deleteUser.value = "";
  checkDelete.value = false;
};

const Users = ref([
  {
    id: 1,
    first_name: "Daniel",
    last_name: "Smith",
    email: "daniel.smith@gmail.com",
    role: "Lecturer",
    courses: ["CSC101", "CSC102"],
    academic_position_eng: "Professor",
    academic_position_thai: "ศาสตราจารย์",
    first_name_thai: "แดเนียล",
    last_name_thai: "สมิธ",
    degree: "PhD in Computer Science",
  },
]);

const courses = ref([
  {
    id: "CPE123",
    name: "Computer Engineering",
    code: "CPE123",
    curriculum: "Computer Science",
    description: "This course introduces the fundamentals of programming.",
    expected_passing_clo_percentage: 85,
    is_portfolio_completed: false,
    portfolio_data: {},
    academic_year: 2024,
    graduate_year: 2028,
    credits: 3,
    program_year: 1,
    semester_id: "01JD1P61GEB6SE52AW5KZ2ZXW9",
    user_id: "01",
    criteria_grade_a: 90,
    criteria_grade_bp: 85,
    criteria_grade_b: 80,
    criteria_grade_cp: 75,
    criteria_grade_c: 70,
    criteria_grade_dp: 65,
    criteria_grade_d: 60,
    criteria_grade_f: 50,
    semester: {
      id: "01JD1P61GEB6SE52AW5KZ2ZXW9",
      year: 2024,
      semester_sequence: "1",
    },
    user: {
      id: "01K",
      email: "lecturer_1@inu.com",
      password: "$2a$10",
      first_name: "lecturer",
      last_name: "1",
      role: "LECTURER",
    },
  },
  {
    id: "CPE202",
    name: "Introduction to Programming",
    code: "CPE202",
    curriculum: "Computer Science",
    description: "This course introduces the fundamentals of programming.",
    expected_passing_clo_percentage: 85,
    is_portfolio_completed: false,
    portfolio_data: {},
    academic_year: 2024,
    graduate_year: 2028,
    credits: 3,
    program_year: 1,
    semester_id: "01JD1P61GEB6SE52AW5KZ2ZXW9",
    user_id: "01",
    criteria_grade_a: 90,
    criteria_grade_bp: 85,
    criteria_grade_b: 80,
    criteria_grade_cp: 75,
    criteria_grade_c: 70,
    criteria_grade_dp: 65,
    criteria_grade_d: 60,
    criteria_grade_f: 50,
    semester: {
      id: "01JD1P61GEB6SE52AW5KZ2ZXW9",
      year: 2024,
      semester_sequence: "1",
    },
    user: {
      id: "01",
      email: "lecturer_1@inu.com",
      password: "$2",
      first_name: "lecturer",
      last_name: "1",
      role: "LECTURER",
    },
  },
  {
    id: "LNG101",
    name: "Oral Communication in English",
    code: "LNG101",
    curriculum: "Computer Science",
    description: "This course introduces the fundamentals of programming.",
    expected_passing_clo_percentage: 85,
    is_portfolio_completed: false,
    portfolio_data: {},
    academic_year: 2024,
    graduate_year: 2028,
    credits: 3,
    program_year: 1,
    semester_id: "01JD1P61GEB6SE52AW5KZ2ZXW9",
    user_id: "01",
    criteria_grade_a: 90,
    criteria_grade_bp: 85,
    criteria_grade_b: 80,
    criteria_grade_cp: 75,
    criteria_grade_c: 70,
    criteria_grade_dp: 65,
    criteria_grade_d: 60,
    criteria_grade_f: 50,
    semester: {
      id: "01JD1P61GEB6SE52AW5KZ2ZXW9",
      year: 2024,
      semester_sequence: "1",
    },
    user: {
      id: "01",
      email: "lecturer_1@inu.com",
      password: "$2",
      first_name: "lecturer",
      last_name: "1",
      role: "LECTURER",
    },
  },
]);

const selectedUser = computed(() => {
  return Users.value.find((user) => user.id === props.userId);
});

const userAcademicEng = ref("");
const userAcademicThai = ref("");
const userFirstname = ref("");
const userLastname = ref("");
const userFirstnameThai = ref("");
const userLastnameThai = ref("");
const userEmail = ref("");
const userRole = ref("");
const userDegree = ref("");
</script>

<style lang="scss" scoped>
.scrollbar-set {
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>

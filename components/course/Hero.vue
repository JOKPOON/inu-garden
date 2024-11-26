<template>
  <div class="w-full flex flex-row justify-between">
    <div class="flex flex-row gap-4">
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
          <option v-for="option in yearsOptions" :key="option" :value="option">
            {{ option }}
          </option>
        </select>
      </div>
    </div>
    <AddCourseButton
      @click="addCourse"
      class="flex items-center flex-row justify-center bg-yellow-primary rounded-xl px-4 py-3 gap-2"
    >
      <span class="text-black-primary font-semibold text-base"
        >Create Course</span
      >
    </AddCourseButton>
  </div>
  <div class="grid grid-cols-2 grid-flex-media gap-4 mt-6 flex-col">
    <div
      v-for="course in courses"
      :key="course.semester_id"
      class="bg-white border border-grey-secondary shadow-sm rounded-xl p-4"
    >
      <div class="flex flex-row justify-between gap-6 items-center">
        <button @click="overviewCourse(course.code)">
          <p class="text-base text-start font-semibold text-grey-600">
            {{ course.code }}
          </p>
          <p class="text-base text-start font-semibold">{{ course.name }}</p>
        </button>
        <div>
          <div class="flex flex-row gap-2">
            <button
              @click="overviewCourse(course.code)"
              class="flex items-center flex-row justify-center border border-grey-secondary hover:bg-black-primary text-black-primary hover:text-white rounded-xl px-4 py-3 gap-2"
            >
              <span class="font-semibold text-base">Overview</span>
            </button>
            <button
              @click="editCourse(course.code)"
              class="flex items-center justify-center relative z-50 bg-white rounded-xl p-3 border border-grey-secondary hover:bg-black-primary text-black-primary hover:text-white"
            >
              <Edit class="w-6 h-6" />
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
</template>

<script setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import Search from "@/components/icons/Search.vue";
import Edit from "@/components/icons/Edit.vue";
import AddCourseButton from "@/components/button/AddCourseButton.vue";
import Course from "@/components/icons/Course.vue";
import Lecturer from "@/components/icons/Lecturer.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const addCourse = () => {
  router.push("/courses/create-course");
};

const overviewCourse = (code) => {
  router.push(`/courses/overview/${code}`);
};

const editCourse = (code) => {
  router.push(`/courses/edit-course/${code}`);
};

const { t } = useI18n();
const searchQuery = ref("");
const selectedProgramOption = ref("");
const selectedYearOption = ref("");

const programOptions = ref(getProgramOptions());
const yearsOptions = ref(getYearsOptions());

function getYearsOptions() {
  return ["2021", "2022", "2023", "2024"];
}

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
</script>

<style lang="scss" scoped>
.grid-flex-media{
  @media screen and (min-width: 2000px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

input::placeholder {
  color: #929292;
}

select:focus {
  outline: none;
}
</style>

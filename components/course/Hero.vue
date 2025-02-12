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
            v-for="option in programs"
            :key="option.id"
            :value="option.id"
          >
            {{ option.name_en }} ({{ option.year }})
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
      :key="course.id"
      class="bg-white border border-grey-tertiary shadow-sm rounded-xl p-6"
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
        {{ course.program.name_en }}
      </p>
      <p class="text-sm text-grey-primary text-start">
        Credits: {{ course.credit }}
      </p>
      <div class="flex flex-row gap-2 mt-4">
        <Lecturer class="w-6 h-6" />
        <div
          v-for="lecturer in course.lecturers"
          :key="lecturer.id"
          class="flex flex-row gap-2 items-center"
        >
          <p class="text-sm text-grey-primary">
            {{ lecturer.name_en }}
          </p>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-4 items-center mt-1">
        <div class="flex flex-row gap-2">
          <Course class="w-6 h-6" />
          <p class="text-sm text-grey-primary">
            Acadamic Year: {{ course.academic_year }}
          </p>
        </div>
        <div class="flex flex-row gap-2 items-center">
          <Course class="w-6 h-6" />
          <p class="text-sm text-grey-primary">
            Graduate Year: {{ course.graduate_year }}
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
import base_url from "@/config/api";

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

const courses = ref([]);
const programs = ref([]);
const yearsOptions = ref(getYearsOptions());

function getYearsOptions() {
  return ["2021", "2022", "2023", "2024"];
}

const fetchCourses = async (query, year, program) => {
  try {
    const response = await fetch(
      `${base_url}courses?query=${query}&year=${year}&program=${program}`,
      {
        credentials: "include",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) throw new Error("Failed to fetch semesters");
    const res = await response.json();
    courses.value = res.data.courses;
  } catch (error) {
    courses.value = [];
    console.error("Error fetching semesters:", error);
  }
};

const fetchPrograms = async () => {
  try {
    const response = await fetch(`${base_url}programmes`, {
      credentials: "include",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) throw new Error("Failed to fetch programs");
    const res = await response.json();
    programs.value = res.data;
  } catch (error) {
    console.error("Error fetching programs:", error);
  }
};

watch([searchQuery, selectedProgramOption, selectedYearOption], () => {
  fetchCourses(
    searchQuery.value,
    selectedYearOption.value,
    selectedProgramOption.value
  );
});

onMounted(() => {
  fetchCourses(
    searchQuery.value,
    selectedYearOption.value,
    selectedProgramOption.value
  );
  fetchPrograms();
});

function handleSearch() {
  console.log("Search query:", searchQuery.value);
}
</script>

<style lang="scss" scoped>
.grid-flex-media {
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

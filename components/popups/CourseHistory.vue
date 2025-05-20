<template>
  <teleport to="body">
    <div
      class="w-full h-full fixed inset-0 flex items-center justify-center bg-black-primary bg-opacity-50 z-50"
    >
      <div
        v-if="!importCourseVisible"
        class="flex flex-row justify-between py-6 px-12 bg-white rounded-xl"
      >
        <div class="flex flex-col">
          <div class="text-2xl font-semibold text-black-primary">
            Course History
          </div>
          <div class="text-sm text-grey-primary">
            Copy course settings from existing courses
          </div>
          <div class="flex flex-row gap-4 mt-4">
            <div
              class="px-4 py-3 bg-white border border-grey-secondary rounded-xl flex flex-row gap-4 items-center"
            >
              <input
                type="text"
                v-model="searchQuery"
                class="bg-transparent border-none focus:ring-0 outline-none text-base w-40"
                placeholder="Search..."
                @keydown.enter="handleSearch"
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
                <option value="">Programs</option>
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
                <option value="">Years</option>
                <option
                  v-for="option in sermester"
                  :key="option.id"
                  :value="option.id"
                >
                  {{ option.semester_sequence }} / {{ option.year }}
                </option>
              </select>
            </div>
          </div>
          <div
            v-if="courses.length"
            class="border border-grey-secondary rounded-xl p-4 grid grid-cols-2 w-full grid-flex-media gap-4 mt-6 flex-col max-h-[calc(100vh-350px)] overflow-y-scroll scrollbar-set"
          >
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
                  <p class="text-base text-start font-semibold">
                    {{ course.name }}
                  </p>
                </button>
                <div>
                  <div class="flex flex-row gap-2">
                    <div
                      class="flex items-center flex-row justify-center border border-grey-secondary text-grey-primary rounded-xl px-4 py-3 gap-2"
                    >
                      <span class="text-base">
                        {{ course.semester.semester_sequence }}
                        /
                        {{ course.semester.year }}
                      </span>
                    </div>
                    <button
                      @click="importCourse(course.id)"
                      class="flex items-center justify-center relative z-50 bg-white rounded-xl p-3 border border-grey-secondary hover:bg-black-primary text-black-primary hover:text-white"
                    >
                      <Import class="w-6 h-6" />
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
              <div class="flex flex-col mt-4">
                <div v-for="lecturer in course.lecturers" :key="lecturer.id">
                  <div class="flex flex-row gap-2 items-center">
                    <Lecturer class="w-6 h-6" />
                    <div class="text-sm text-grey-primary">
                      {{ lecturer.name_en }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex flex-row gap-2 mt-1">
                <Course class="w-6 h-6" />
                <p class="text-sm text-grey-primary">
                  Academic Year: {{ course.academic_year }}
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
          <div v-else class="flex items-center justify-center flex-col p-4">
            <img
              :src="BannerLogin"
              alt="Banner Login"
              class="w-64 max-w-md object-cover rounded-2xl mb-4"
            />
            <div class="text-center font-semibold text-grey-primary">
              No course found!
            </div>
          </div>
          <button
            @click="$emit('close')"
            class="w-full font-medium py-3 bg-gray-300 rounded-xl hover:bg-black-primary hover:text-white mt-4"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
    <ImportCourseHistory
      v-if="importCourseVisible"
      :course_id="selectedCourseOption"
      :program="programs"
      :semester="sermester"
      @close="importCourseVisible = false"
    />
  </teleport>
</template>

<script setup>
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import Search from "@/components/icons/Search.vue";
import Import from "@/components/icons/Import.vue";
import Course from "@/components/icons/Course.vue";
import Lecturer from "@/components/icons/Lecturer.vue";
import ImportCourseHistory from "@/components/popups/ImportCourseHistory.vue";
import BannerLogin from "@/components/images/BannerLogin.jpg";
import { useRouter } from "vue-router";
import { fetchCourses, fetchPrograms, fetchSerms } from "~/api/api";

const router = useRouter();
const emit = defineEmits(["close"]);

const overviewCourse = (code) => {
  router.push(`/courses/${code}`);
};

const importCourseVisible = ref(false);

const importCourse = (id) => {
  selectedCourseOption.value = id;
  importCourseVisible.value = true;
};

const programs = ref([
  { id: 1, name_en: "Computer Science", year: 2021 },
  { id: 2, name_en: "Information Technology", year: 2021 },
  { id: 3, name_en: "Software Engineering", year: 2021 },
]);
const sermester = ref(["2021", "2022", "2023", "2024", "2025"]);

const searchQuery = ref("");
const selectedProgramOption = ref("");
const selectedYearOption = ref("");
const selectedCourseOption = ref("");

const handleSearch = async () => {
  console.log("searching...");
  await fetchCourses(
    courses,
    searchQuery.value,
    selectedYearOption.value,
    selectedProgramOption.value
  );
};

const courses = ref([
  {
    id: 1,
    code: "CS101",
    name: "Introduction to Computer Science",
    program: { id: 1, name_en: "Computer Science", year: 2021 },
    credit: 3,
    lecturers: [
      { id: 1, name_en: "Dr. John Smith" },
      { id: 2, name_en: "Ms. Jane Doe" },
    ],
    academic_year: 2021,
    graduate_year: 2024,
    created_at: "1/2024",
  },
  {
    id: 2,
    code: "IT101",
    name: "Introduction to Information Technology",
    program: { id: 2, name_en: "Information Technology", year: 2021 },
    credit: 3,
    lecturers: [
      { id: 3, name_en: "Dr. John Smith" },
      { id: 4, name_en: "Ms. Jane Doe" },
    ],
    academic_year: 2021,
    graduate_year: 2024,
    created_at: "1/2024",
  },
  {
    id: 3,
    code: "SE101",
    name: "Introduction to Software Engineering",
    program: { id: 3, name_en: "Software Engineering", year: 2021 },
    credit: 3,
    lecturers: [
      { id: 5, name_en: "Dr. John Smith" },
      { id: 6, name_en: "Ms. Jane Doe" },
    ],
    academic_year: 2021,
    graduate_year: 2024,
    created_at: "1/2024",
  },
]);

watch(
  [selectedProgramOption, selectedYearOption],
  () => {
    fetchCourses(
      courses,
      searchQuery.value,
      selectedYearOption.value,
      selectedProgramOption.value
    );
  },
  { immediate: true }
);

onMounted(async () => {
  // Fetch courses from API if needed
  await fetchPrograms(programs);
  await fetchSerms(sermester);
  await fetchCourses(
    courses,
    searchQuery.value,
    selectedYearOption.value,
    selectedProgramOption.value
  );

  console.log("Courses fetched:", courses.value);
  console.log("Programs fetched:", programs.value);
  console.log("Serms fetched:", sermester.value);
});
</script>

<style lang="scss" scoped>
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

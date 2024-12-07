<template>
    <div
      class="grid grid-cols-2 grid-flex-media gap-4 mt-6 max-h-[calc(100vh-270px)] overflow-y-scroll hide-scrollbar"
    >
      <div class="flex flex-col gap-6">
        <div
          class="shadow-sm rounded-xl p-6 bg-white border border-grey-tertiary"
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
                  class="flex items-center flex-row justify-center bg-yellow-primary hover:bg-black-primary text-black-primary hover:text-white rounded-xl px-4 py-3 gap-2"
                >
                  <span class="font-semibold text-base">Course Portfolio</span>
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
                academic_year Year : {{ course.academic_year }}
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
        <CourseChart
          :activeButton="activeButton"
          @update:activeButton="setActiveButton"
        />
        <div class="grid grid-cols-2 rounded-xl gap-4">
          <div
            v-for="(value, key) in statistics"
            :key="key"
            class="flex flex-col gap-4"
          >
            <div
              class="flex flex-row w-full rounded-xl border border-grey-secondary"
            >
              <div
                class="flex items-center justify-center px-4 py-3 border-2 border-grey-primary rounded-xl w-36"
              >
                {{ changeKeyToLabel(key) }}
              </div>
              <div class="flex items-center justify-center px-4 py-3 w-full">
                {{ value.toFixed(2) }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="cols-span-init flex flex-col gap-6">
        <div
          class="shadow-sm rounded-xl p-6 bg-white border border-grey-tertiary flex flex-col gap-4"
        >
          <div class="text-base text-black-primary font-medium">
            Course Introduction & Description
          </div>
          <div class="text-base text-grey-primary">
            {{ course.description }}
          </div>
        </div>
        <div v-if="activeButton === 'Overview'">
          <ScoreRange />
        </div>
        <div v-else-if="activeButton === 'Grade Overview'">
          <GradeRange />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { useI18n } from "vue-i18n";
  import ScoreRange from "@/components/course/ScoreRange.vue";
  import GradeRange from "@/components/course/GradeRange.vue";
  import CourseChart from "@/components/course/CourseChart.vue";
  import Edit from "@/components/icons/Edit.vue";
  import AddCourseButton from "@/components/button/AddCourseButton.vue";
  import Course from "@/components/icons/Course.vue";
  import Lecturer from "@/components/icons/Lecturer.vue";
  import { useRouter } from "vue-router";
  const { t } = useI18n();
  
  useHead({
    title: t("seo.title"),
    description: t("seo.desc"),
  });
  
  definePageMeta({
    layout: "landing",
  });
  
  const router = useRouter();
  const overviewCourse = (code) => {
    router.push(`/courses/portfolio/${code}`);
  };
  
  const editCourse = (code) => {
    router.push(`/courses/edit-course/${code}`);
  };
  
  const buttons = ["Overview", "Grade Overview"];
  const activeButton = ref(buttons[0]);
  const setActiveButton = (button) => {
    activeButton.value = button;
  };
  
  const course = ref({
    id: "CPE123",
    name: "Computer Engineering",
    code: "CPE123",
    curriculum: "Computer Science",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
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
    },
  });
  
  const statistics = {
    mean: 80.0,
    sd: 10.0,
    median: 70.0,
    max: 90.0,
    mode: 60.0,
    min: 50.0,
  };
  
  const changeKeyToLabel = (key) => {
    switch (key) {
      case "mean":
        return "Mean";
      case "sd":
        return "S.D.";
      case "median":
        return "Median";
      case "max":
        return "Max";
      case "mode":
        return "Mode";
      case "min":
        return "Min";
      default:
        return key;
    }
  };
  </script>
  
  <style lang="scss" scoped>
  .grid-flex-media {
    @media screen and (min-width: 2050px) {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }
  
  .cols-span-init {
    @media screen and (min-width: 2050px) {
      grid-column: span 2;
    }
  }
  
  .hide-scrollbar {
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  </style>
  
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
          {{ course.programme.name_en }}
        </p>
        <p class="text-sm text-grey-primary text-start">
          credits : {{ course.credit }}
        </p>
        <div class="flex flex-row gap-2 mt-4">
          <Lecturer class="w-6 h-6" />
          <div
            v-for="lecturer in course.lecturers"
            :key="lecturer.id"
            class="flex flex-row gap-2 items-center"
          >
            <p class="text-sm text-grey-primary">
              {{ lecturer.title_en_short }}
              {{ lecturer.first_name_en }}
              {{ lecturer.last_name_en }}
            </p>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4 items-center mt-1">
          <div class="flex flex-row gap-2">
            <Course class="w-6 h-6" />
            <p class="text-sm text-grey-primary">
              Academic Year : {{ course.academic_year }}
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
        :grade_frequencies="result.grade_frequencies"
        :score_frequencies="result.score_frequencies"
        :activeButton="activeButton"
        @update:activeButton="setActiveButton"
      />
      <div class="grid grid-cols-2 rounded-xl gap-4">
        <div
          v-for="(value, key) in result.statistics"
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
        <ScoreRange :score_frequencies="result.score_frequencies" />
      </div>
      <div v-else-if="activeButton === 'Grade Overview'">
        <GradeRange :grade_frequencies="result.grade_frequencies" />
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
import base_url from "@/config/api";
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

const course_id = ref("01JKNGF1F05NF2TH1JX3BJKAQZ");
const course = ref({
  id: "01JKNGF1F05NF2TH1JX3BJKAQZ",
  name: "Introduction to Programming",
  code: "CS111",
  description: "This course introduces the fundamentals of programming.",
  academic_year: "2024",
  graduate_year: "2028",
  credit: 3,
  expected_passing_clo_percentage: 85,
  is_portfolio_completed: false,
  portfolio_data: {},
  result: null,
  criteria_grade_a: 90,
  criteria_grade_bp: 85,
  criteria_grade_b: 80,
  criteria_grade_cp: 75,
  criteria_grade_c: 70,
  criteria_grade_dp: 65,
  criteria_grade_d: 60,
  programme_id: "01JKK501SMEE3K9NYKBVAKHER6",
  semester_id: "01JKK4ZMC1PJF3TA5H2CTS8TG4",
  lecturers: [
    {
      id: "01JKNG75Z05JKPVZA9C33Y1JNV",
      email: "somchai.thongdee@example.com",
      password: "$2a$10$nEvw7XfWvgcbHvSgq8q3ouJV7uqiBUkKTcEBpfrS.QYueEzSaeJm.",
      title_th_short: "รศ.",
      title_en_short: "Assoc. Prof.",
      title_th: "รองศาสตราจารย์",
      title_en: "Associate Professor",
      first_name_th: "สมชาย",
      last_name_th: "ทองดี",
      first_name_en: "Somchai",
      last_name_en: "Thongdee",
      academic_position_th: "รองศาสตราจารย์",
      academic_position_en: "Associate Professor",
      role: "LECTURER",
      degree_th: "ปริญญาเอก",
      degree_en: "Ph.D.",
      tel: "0812345678",
    },
    {
      id: "01JKNG760KWMREGH31G9ME65XV",
      email: "kanda.wichai@example.com",
      password: "$2a$10$FKr4uSQpTVeO57VmJsCxwety/Cp9ZwzwH5xHMTQbB/N6NLlmIohTa",
      title_th_short: "ผศ.",
      title_en_short: "Asst. Prof.",
      title_th: "ผู้ช่วยศาสตราจารย์",
      title_en: "Assistant Professor",
      first_name_th: "กานดา",
      last_name_th: "วิชัย",
      first_name_en: "Kanda",
      last_name_en: "Wichai",
      academic_position_th: "ผู้ช่วยศาสตราจารย์",
      academic_position_en: "Assistant Professor",
      role: "LECTURER",
      degree_th: "ปริญญาโท",
      degree_en: "Master's Degree",
      tel: "0876543210",
    },
  ],
  semester: {
    id: "01JKK4ZMC1PJF3TA5H2CTS8TG4",
    year: 2024,
    semester_sequence: "2",
  },
  programme: {
    id: "01JKK501SMEE3K9NYKBVAKHER6",
    name_th: "หลักสูตรปกติ",
    name_en: "Regular Program",
    degree_th: "วิศวกรรมศาสตรบัณฑิต",
    degree_en: "Bachelor of Engineering",
    degree_short_th: "วศ.บ.",
    degree_short_en: "B.Eng.",
    year: "2021",
    academic_year: "",
    structure: {
      category: [
        {
          sub: null,
          name: "ก. หมวดวิชาศึกษาทั่วไป",
          credit: 31,
        },
        {
          sub: [
            {
              name: "วิชาแกนทางวิศวกรรม",
              credit: 30,
            },
            {
              name: "วิชาเฉพาะด้าน",
              credit: 51,
            },
            {
              name: "วิชาเลือก",
              credit: 12,
            },
          ],
          name: "ข. หมวดวิชาเฉพาะ",
          credit: 93,
        },
        {
          sub: null,
          name: "ค. หมวดวิชาเลือกเสรี",
          credit: 6,
        },
      ],
      totals_credit: 130,
    },
    program_outcomes: null,
    program_learning_outcomes: null,
    student_outcomes: null,
  },
});

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

const result = ref({
  student_amount: 0,
  gpa: 0,
  grade_frequencies: [
    {
      name: "A",
      grade_score: 90,
      frequency: 0,
    },
    {
      name: "BP",
      grade_score: 85,
      frequency: 0,
    },
    {
      name: "B",
      grade_score: 80,
      frequency: 0,
    },
    {
      name: "CP",
      grade_score: 75,
      frequency: 0,
    },
    {
      name: "C",
      grade_score: 70,
      frequency: 0,
    },
    {
      name: "DP",
      grade_score: 65,
      frequency: 0,
    },
    {
      name: "D",
      grade_score: 60,
      frequency: 0,
    },
    {
      name: "F",
      grade_score: 0,
      frequency: 0,
    },
  ],
  score_frequencies: [
    {
      score: "0-50",
      frequency: 0,
    },
    {
      score: "51-55",
      frequency: 0,
    },
    {
      score: "56-60",
      frequency: 0,
    },
    {
      score: "61-65",
      frequency: 0,
    },
    {
      score: "66-70",
      frequency: 0,
    },
    {
      score: "71-75",
      frequency: 0,
    },
    {
      score: "76-80",
      frequency: 0,
    },
    {
      score: "81-85",
      frequency: 0,
    },
    {
      score: "86-90",
      frequency: 0,
    },
    {
      score: "91-95",
      frequency: 0,
    },
    {
      score: "96-100",
      frequency: 0,
    },
  ],
  statistics: {
    min: 0,
    max: 0,
    mean: 0,
    median: 0,
    mode: 0,
    sd: 0,
  },
});

const fetchCourse = async () => {
  try {
    const response = await fetch(`${base_url}courses/${course_id}`, {
      credentials: "include",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) throw new Error("Failed to fetch semesters");
    const res = await response.json();
    course.value = res.data;
    console.log(course.value);
  } catch (error) {
    console.error("Error fetching semesters:", error);
  }
};

const fetchResult = async () => {
  try {
    const response = await fetch(
      `${base_url}courses/${course_id.value}/result`,
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
    result.value = res.data;
    console.log(result.value);
  } catch (error) {
    console.error("Error fetching semesters:", error);
  }
};

onMounted(() => {
  fetchResult();
  fetchCourse();
});
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
  scrollbar-width: thin;

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

<template>
  <div class="flex items-center justify-between flex-row">
    <div class="flex flex-row gap-4">
      <div class="border border-grey-secondary rounded-xl">
        <button
          v-for="button in buttons"
          :key="button"
          :class="[
            'px-6 py-2 rounded-xl',
            activeButton === button
              ? 'bg-black-primary text-white'
              : 'border border-grey-secondary text-base',
          ]"
          @click="setActionButton(button)"
        >
          {{ button }}
        </button>
      </div>
      <div class="flex">
        <div
          class="px-4 py-2 bg-white border border-grey-secondary rounded-xl flex flex-row gap-4 items-center"
        >
          <input
            type="text"
            class="bg-transparent border-none focus:ring-0 outline-none text-base w-48"
            placeholder="Search..."
          />
          <button class="flex items-center justify-center bg-white rounded-xl">
            <Search class="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
    <div class="flex flex-row gap-4">
      <button
        @click="toggleSteam"
        :class="[
          'flex items-center flex-row justify-center border border-grey-secondary rounded-xl px-4 py-2 gap-2 transition-all duration-300',
          steamStatusClass,
        ]"
      >
        <span class="font-semibold text-base">Stream</span>
        <template v-if="steamStatus === 'default'">
          <Status class="w-5 h-5" />
        </template>
        <template v-else-if="steamStatus === 'ascending'">
          <ArrowUp class="w-5 h-5" />
        </template>
        <template v-else>
          <ArrowDown class="w-5 h-5" />
        </template>
      </button>
      <button
        @click="toggleDateTime"
        :class="[
          'flex items-center flex-row justify-center border border-grey-secondary rounded-xl px-4 py-2 gap-2 transition-all duration-300',
          dateTimeStatusClass,
        ]"
      >
        <span class="font-semibold text-base">Date Time</span>
        <template v-if="dateTimeStatus === 'default'">
          <Status class="w-5 h-5" />
        </template>
        <template v-else-if="dateTimeStatus === 'ascending'">
          <ArrowUp class="w-5 h-5" />
        </template>
        <template v-else>
          <ArrowDown class="w-5 h-5" />
        </template>
      </button>
    </div>
  </div>
  <div class="grid grid-cols-2 grid-flex-media gap-4">
    <div
      class="flex-col flex gap-4 max-h-[calc(100vh-305px)] overflow-y-scroll scrollbar-set"
    >
      <div
        v-for="course in courses"
        :key="course.semester_id"
        class="bg-white border border-grey-tertiary shadow-sm rounded-xl p-6"
      >
        <div class="flex flex-row justify-between gap-6 items-center">
          <button @click="feedback(course)">
            <p class="text-base text-start font-semibold text-grey-600">
              {{ course.code }}
            </p>
            <p class="text-base text-start font-semibold">{{ course.name }}</p>
          </button>
          <div>
            <div class="flex flex-row gap-2">
              <button
                @click="feedback(course)"
                class="flex items-center flex-row justify-center border border-grey-secondary hover:bg-black-primary text-black-primary hover:text-white rounded-xl px-4 py-3 gap-2"
              >
                <span class="font-semibold text-base">Feedback</span>
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
    <div class="flex-col flex gap-4">
      <div class="p-3 rounded-xl border border-grey-tertiary">
        <h3 class="text-base font-semibold mb-4 ml-3">Feedbacks</h3>
        <div class="max-h-[calc(100vh-540px)] overflow-y-scroll scrollbar-set">
          <div
            v-for="feedback in feedbacks"
            :key="feedback.id"
            class="bg-white border border-grey-tertiary shadow-sm rounded-xl p-3 mb-4"
          >
            <p class="text-sm font-semibold">{{ feedback.courseName }}</p>
            <p class="text-sm text-grey-primary">{{ feedback.message }}</p>
            <p class="text-sm text-grey-secondary">
              From: {{ feedback.sender }}
            </p>
            <p class="text-sm text-grey-secondary">{{ feedback.date }}</p>
          </div>
        </div>
      </div>
      <div
        class="bg-white border border-grey-tertiary shadow-sm rounded-xl p-6"
      >
        <div class="flex flex-row gap-4 items-center justify-between mb-4">
          <h3 class="text-base font-semibold">Add Feedback</h3>
          <button
            @click="addFeedback"
            class="bg-black-primary text-white px-4 py-2 rounded-lg text-sm flex items-center flex-row gap-1"
          >
          <Send class="w-4 h-4 color-white flex items-center" />
          <div>
            Submit</div>
          </button>
        </div>
        <textarea
          v-model="newFeedback.message"
          placeholder="Feedback Message"
          class="p-2 border rounded w-full"
        ></textarea>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import Status from "@/components/icons/Status.vue";
import ArrowUp from "@/components/icons/ArrowUp.vue";
import ArrowDown from "@/components/icons/ArrowDown.vue";
import { useI18n } from "vue-i18n";
import Course from "@/components/icons/Course.vue";
import Lecturer from "@/components/icons/Lecturer.vue";
import Search from "@/components/icons/Search.vue";
import Send from "@/components/icons/Send.vue";

const { t } = useI18n();

useHead({
  title: t("seo.title"),
  description: t("seo.desc"),
});

definePageMeta({
  layout: "landing",
});

const buttons = ["Received Feedbacks", "Manage Feedback"];

const activeButton = ref("Received Feedbacks");
const setActionButton = (button) => {
  activeButton.value = button;
};

const steamStatus = ref("default");
const dateTimeStatus = ref("default");

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

const feedbacks = ref([
  {
    id: "1",
    courseId: "CPE123",
    courseName: "Computer Engineering",
    message: "Great course, very informative!",
    sender: "Student A",
    date: "2023-10-01 10:00 AM",
  },
  {
    id: "2",
    courseId: "CPE124",
    courseName: "Software Engineering",
    message: "The course content was very well structured.",
    sender: "Student B",
    date: "2023-10-02 11:30 AM",
  },
  {
    id: "3",
    courseId: "CPE125",
    courseName: "Upstream Course",
    message: "The course was challenging but rewarding.",
    sender: "Student C",
    date: "2023-10-03 09:00 AM",
  },
  {
    id: "4",
    courseId: "CPE126",
    courseName: "Upstream Course",
    message: "Excellent teaching methods.",
    sender: "Student D",
    date: "2023-10-04 02:00 PM",
  },
]);

const toggleSteam = () => {
  if (steamStatus.value === "default") {
    steamStatus.value = "ascending";
  } else if (steamStatus.value === "ascending") {
    steamStatus.value = "descending";
  } else {
    steamStatus.value = "default";
  }
};

const toggleDateTime = () => {
  if (dateTimeStatus.value === "default") {
    dateTimeStatus.value = "ascending";
  } else if (dateTimeStatus.value === "ascending") {
    dateTimeStatus.value = "descending";
  } else {
    dateTimeStatus.value = "default";
  }
};

const steamStatusClass = computed(() => {
  return steamStatus.value === "default"
    ? "bg-white text-black-primary"
    : " bg-black-primary text-white";
});

const dateTimeStatusClass = computed(() => {
  return dateTimeStatus.value === "default"
    ? "bg-white text-black-primary"
    : " bg-black-primary text-white";
});

const newFeedback = ref({
  courseId: "",
  courseName: "",
  message: "",
  sender: "Cosebane",
  date: new Date().toISOString().slice(0, 16),
});

const feedback = (course) => {
  newFeedback.value.courseId = course.code;
  newFeedback.value.courseName = course.name;
};

const addFeedback = () => {
  if (
    newFeedback.value.courseId &&
    newFeedback.value.courseName &&
    newFeedback.value.message
  ) {
    feedbacks.value.push({ ...newFeedback.value, id: Date.now().toString() });
    newFeedback.value = {
      courseId: "",
      courseName: "",
      message: "",
      sender: "Cosebane",
      date: new Date().toISOString().slice(0, 16),
    };
  }
};
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

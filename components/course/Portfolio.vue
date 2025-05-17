<template>
  <div
    class="grid grid-cols-5 gap-4 w-full h-full rounded-lg border border-grey-secondary text-sm"
  >
    <div
      class="col-span-1 p-4 flex flex-col gap-2 min-h-[calc(100vh-310px)] border-r border-grey-secondary"
    >
      <button
        v-for="(menu, index) in menus"
        :key="index"
        @click="activeMenu = menu"
        class="w-full text-left px-4 py-2 rounded-lg border border-grey-secondary"
        :class="{ 'bg-black-primary text-white': activeMenu === menu }"
      >
        {{ menu }}
      </button>
    </div>
    <div v-if="!loading" class="col-span-4 py-4">
      <component :is="getActiveComponent" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import Details from "@/components/course/portfolio/Details.vue";
import Implementation from "@/components/course/portfolio/Implementation.vue";
import EducationalOutcomes from "@/components/course/portfolio/EducationalOutcomes.vue";
import ContinuousDevelopment from "@/components/course/portfolio/ContinuousDevelopment.vue";
import Report from "@/components/course/portfolio/Report.vue";
import { fetchCourse, fetchCoursePortfolioOutcome } from "~/api/api";
import {
  fetchReceivedFeedbacks,
  fetchSentFeedbacks,
  fetchCourseResult,
} from "~/api/api";
import { usePortfolioStore } from "~/store/usePortfolioStore";
const store = usePortfolioStore();
const router = useRouter();

const menus = [
  "Details",
  "Implementation",
  "Educational Outcomes",
  "Continuous Development",
  "Report",
];
const activeMenu = ref("Details");

const componentsMap = {
  Details,
  Implementation,
  "Educational Outcomes": EducationalOutcomes,
  "Continuous Development": ContinuousDevelopment,
  Report,
};

const getActiveComponent = computed(() => componentsMap[activeMenu.value]);
const loading = ref(true);
const receivedFeedbacks = ref([]);
const sentFeedbacks = ref([]);
const feedbacks = ref([]);
const result = ref(null);
const outcomes = ref([]);
onMounted(async () => {
  const course = ref(null);
  await fetchCourse(course, router.currentRoute.value.params.id);
  await fetchCourseResult(result, course.value.id);
  await fetchReceivedFeedbacks(receivedFeedbacks, course.value.id);
  await fetchSentFeedbacks(sentFeedbacks, course.value.id);
  await fetchCoursePortfolioOutcome(outcomes, course.value.id);
  store.setDetails(course.value);
  console.log(course.value.portfolio_data.improvements);

  if (!course.value.portfolio_data.implementation) {
    store.setImplementationData({
      methods: [],
      online_media: [],
      teaching_objectives: [],
    });
  }

  if (!course.value.portfolio_data.educational_outcomes) {
    store.setEducationalOutcomes({
      grade_distribution: [],
    });
  }

  if (!course.value.portfolio_data.continuous_development) {
    store.setContinuousDevelopment({
      feedbacks: {
        upstream_subjects: [],
        downstream_subjects: [],
      },
      improvements: [],
    });
  }

  store.setImplementationData(course.value.portfolio_data.implementation);
  store.setContinuousDevelopment(
    course.value.portfolio_data.continuous_development
  );
  store.setEducationalOutcomes(
    course.value.portfolio_data.educational_outcomes
  );

  store.setGradeDistribution(result.value);
  store.setOutcomes(outcomes.value);

  feedbacks.value = [...receivedFeedbacks.value, ...sentFeedbacks.value];
  store.setReceivedFeedbacks(
    feedbacks.value
      .filter((feedback) => feedback.stream_type === "DOWNSTREAM")
      .map((feedback) => ({
        course_code: feedback.target_course?.code || "",
        course_name: feedback.target_course?.name || "",
        comment: feedback.comment || "",
        sender:
          `${feedback.user?.title_en_short || ""} ${feedback.user?.first_name_en || ""} ${feedback.user?.last_name_en || ""}`.trim(),
      }))
  );
  store.setSentFeedbacks(
    feedbacks.value
      .filter((feedback) => feedback.stream_type === "UPSTREAM")
      .map((feedback) => ({
        course_code: feedback.from_course?.code || "",
        course_name: feedback.from_course?.name || "",
        comment: feedback.comment || "",
        sender:
          `${feedback.user?.title_en_short || ""} ${feedback.user?.first_name_en || ""} ${feedback.user?.last_name_en || ""}`.trim(),
      }))
  );

  loading.value = false;
});
</script>

<style lang="scss" scoped></style>

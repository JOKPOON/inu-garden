<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-row">
      <CourseNav :currentRouteName="'Learning Outcome'" />
    </div>
    <LearningOutcome />
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import CourseNav from "@/components/course/CourseNav.vue";
import LearningOutcome from "@/components/course/LearningOutcome.vue";

const { t } = useI18n();

useHead({
  title: "Inu - Courses Learning Outcome",
  description: t("seo.desc"),
});

definePageMeta({
  layout: "landing",
});
</script>

<style lang="scss" scoped></style>

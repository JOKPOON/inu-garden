<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-row">
      <CourseNav :currentRouteName="'Feedback'" />
    </div>
    <Feedback />
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import CourseNav from "@/components/course/CourseNav.vue";
import Feedback from "@/components/course/Feedback.vue";

const { t } = useI18n();

useHead({
  title: t("seo.title"),
  description: t("seo.desc"),
});

definePageMeta({
  layout: "landing",
});
</script>

<style lang="scss" scoped></style>

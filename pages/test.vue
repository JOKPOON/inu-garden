<template>
    <div class="flex flex-col gap-4">
      <div class="flex flex-row">
        <CourseNav :currentRouteName="'Enrollments'" />
      </div>
      <Enrollments />
    </div>
  </template>
  
  <script setup>
  import { useI18n } from "vue-i18n";
  import CourseNav from "@/components/course/CourseNav.vue";
  import Enrollments from "@/components/course/Enrollments.vue";
  
  const { t } = useI18n();
  
  useHead({
    title: "Inu - Courses Enrollments",
    description: t("seo.desc"),
  });
  
  definePageMeta({
    layout: "landing",
  });
  </script>
  
  <style lang="scss" scoped></style>
  
<template>
  <div class="flex flex-col">
    <div class="flex flex-row">
      <CourseNav :currentRouteName="'Overview'" />
    </div>
  </div>
</template>

<script setup>
import CourseNav from "@/components/course/CourseNav.vue";
import BannerLogin from "@/components/images/BannerLogin.jpg";
const { t } = useI18n();

useHead({
  title: "Inu - Courses Portfolio",
  description: t("seo.desc"),
});

definePageMeta({
  layout: "landing",
});
</script>

<style lang="scss" scoped></style>

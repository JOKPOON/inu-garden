<template>
    <div class="flex flex-col gap-4">
      <div class="flex flex-row">
        <CourseNav :currentRouteName="'Assessments'" />
      </div>
      <div class="flex flex-col gap-4">
        <div class="flex flex-row gap-2">
          <button
            @click="backToAssessments"
            class="border border-grey-secondary text-black-primary text-base px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-black-primary hover:text-white"
          >
            <ArrowHeadIcon class="w-4 h-4 duration-0" direction="left" />
            Back
          </button>
          <div
            class="bg-black-primary text-white text-base px-6 py-3 rounded-xl flex"
          >
            {{ groupName }}
          </div>
        </div>
        <Assessments />
      </div>
    </div>
  </template>
  
  <script setup>
  import { useRouter, useRoute } from "vue-router";
  import CourseNav from "@/components/course/CourseNav.vue";
  import ArrowHeadIcon from "@/components/icons/ArrowHeadIcon.vue";
  import Assessments from "@/components/course/Assessments.vue";
  import { useI18n } from "vue-i18n";
  import { ref } from "vue";
  
  const { t } = useI18n();
  
  useHead({
    title: "Inu - Courses Assessments",
    description: t("seo.desc"),
  });
  
  definePageMeta({
    layout: "landing",
  });
  
  const router = useRouter();
  const route = useRoute();
  
  const groupName = ref(route.query.name);
  
  const backToAssessments = () => {
    router.go(-1);
  };
  </script>
  
  <style lang="scss" scoped></style>
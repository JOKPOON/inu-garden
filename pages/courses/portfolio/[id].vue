<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-row">
      <CourseNav :currentRouteName="'Overview'" />
    </div>
    <div class="flex flex-col gap-4">
      <div class="flex flex-row gap-4 justify-between">
        <div class="flex flex-row gap-2">
          <button
            @click="backToOverview"
            class="border border-grey-secondary text-black-primary text-base px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-black-primary hover:text-white"
          >
            <ArrowHeadIcon class="w-4 h-4 duration-0" direction="left" />
            Back
          </button>
          <div
            class="bg-black-primary text-white text-base px-6 py-3 rounded-xl flex"
          >
            Course Portfolio
          </div>
        </div>
      </div>
        <Portfolio />
    </div>
  </div>
</template>

<script setup>
import CourseNav from "@/components/course/CourseNav.vue";
import ArrowHeadIcon from "@/components/icons/ArrowHeadIcon.vue";
import { useRouter, useRoute } from "vue-router";
import Portfolio from "@/components/course/Portfolio.vue";
const { t } = useI18n();

useHead({
  title: "Inu - Courses Portfolio",
  description: t("seo.desc"),
});

definePageMeta({
  layout: "landing",
});

const router = useRouter();
const route = useRoute();

const backToOverview = () => {
  router.go(-1);
};
</script>

<style lang="scss" scoped></style>
<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-row">
      <CourseNav :currentRouteName="'Assessments'" />
    </div>

    <div class="flex flex-col gap-4">
      <div class="flex flex-row gap-4 justify-between">
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
        <div class="flex">
          <div
            class="flex flex-row gap-2 px-4 py-2 rounded-xl text-grey-primary items-center justify-center border border-gray-primary"
          >
            <div
              class="text-[12px] p-1 w-6 h-6 rounded-full border border-grey-primary items-center justify-center flex"
            >
              i
            </div>
            <div class="text-[14px]">
              The score is calculated as a percentage out of 100%
            </div>
          </div>
        </div>
      </div>
      <Assessments :courseId="courseId" />
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
const courseId = ref(router.currentRoute.value.params.id);

const backToAssessments = () => {
  router.go(-1);
};
</script>

<style lang="scss" scoped></style>

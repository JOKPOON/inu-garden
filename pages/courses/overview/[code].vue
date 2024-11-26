<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-row">
      <div class="border border-grey-secondary rounded-xl">
        <button
          v-for="button in buttons"
          :key="button"
          :class="[
            'px-6 py-3 rounded-xl',
            activeButton === button
              ? 'bg-black-primary text-white'
              : 'border border-grey-secondary text-base',
          ]"
          @click="setActiveButton(button)"
        >
          {{ button }}
        </button>
      </div>
    </div>
    <index v-if="activeButton === 'Overview'" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import index from "@/pages/courses/overview/index.vue";
const { t } = useI18n();

const buttons = [
  "Overview",
  "Enrollments",
  "Learning Outcome",
  "Assessments",
  "Feedback",
];
const activeButton = ref(buttons[0]);

const setActiveButton = (button) => {
  activeButton.value = button;
};

useHead({
  title: t("seo.title"),
  description: t("seo.desc"),
});

definePageMeta({
  layout: "landing",
});
</script>

<style lang="scss" scoped></style>

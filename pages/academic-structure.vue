<template>
  <div class="flex items-center justify-between flex-row">
    <div class="border border-grey-secondary rounded-xl mb-4">
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
  </div>
  <div v-if="activeButton === 'Academic Management'">
    <AcademicManagement />
  </div>
  <div v-else-if="activeButton === 'Semester'">
    <Semester />
  </div>
</template>

<script setup>
import { ref } from "vue";
import AcademicManagement from "@/components/academic-structure/AcademicManagement.vue";
import Semester from "@/components/academic-structure/Semester.vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const router = useRouter();

useHead({
  title: "Inu - Criteria",
  description: t("seo.desc"),
});

definePageMeta({
  layout: "landing",
});

const buttons = ["Academic Management", "Semester"];
const activeButton = ref("Academic Management");

const setActionButton = (button) => {
  activeButton.value = button;
};
</script>

<style lang="scss" scoped></style>

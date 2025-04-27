<template>
  <div class="flex items-center justify-between flex-row">
    <div class="mb-4 flex flex-row items-center justify-between gap-4 w-full">
      <button
        v-for="button in buttons"
        :key="button"
        :class="[ 
          'px-6 py-3 rounded-xl',
          activeButton === button
            ? 'bg-black-primary text-white'
            : 'border border-grey-secondary text-base',
        ]"
        @click="button === 'Semester' ? openSemesterPopup() : setActionButton(button)"
      >
        {{ button }}
      </button>
    </div>
  </div>
  <div v-if="activeButton === 'Academic Management'">
    <AcademicManagement />
  </div>
  <Semester v-if="isSemesterPopupOpen" @close="closeSemesterPopup" />
</template>

<script setup>
import { ref } from "vue";
import AcademicManagement from "@/components/academic-structure/AcademicManagement.vue";
import Semester from "@/components/popups/Semester.vue";

const { t } = useI18n();

useHead({
  title: "Inu - Criteria",
  description: t("seo.desc"),
});

definePageMeta({
  layout: "landing",
});

const buttons = ["Academic Management", "Semester"];
const activeButton = ref("Academic Management");

const isSemesterPopupOpen = ref(false);

const setActionButton = (button) => {
  activeButton.value = button;
};

const openSemesterPopup = () => {
  isSemesterPopupOpen.value = true;
};

const closeSemesterPopup = () => {
  isSemesterPopupOpen.value = false;
};
</script>

<style lang="scss" scoped></style>
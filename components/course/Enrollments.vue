<template>
  <div class="flex items-center justify-between flex-row">
    <div class="border border-grey-secondary rounded-xl">
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
    <div
      v-if="activeButton === 'Student Enrollments'"
      class="flex flex-row gap-8"
    >
      <div class="flex flex-col">
        <div class="text-base text-black-primary font-semibold text-end">
          Total
        </div>
        <div class="text-base text-grey-primary text-end -mt-2">
          <span class="font-semibold text-2xl text-black-primary">{{
            10
          }}</span>
          Students
        </div>
      </div>
      <AddUserButton
        @click="onClickAddUser"
        class="flex items-center flex-row justify-center border border-grey-secondary rounded-xl px-4 py-3 gap-2"
      >
        <span class="text-black-primary font-semibold text-base"
          >Add Student</span
        >
      </AddUserButton>
    </div>
  </div>
  <div v-if="activeButton === 'Student Enrollments'">
    <StudentEnrollments />
  </div>
  <div v-else-if="activeButton === 'Student Results'">
    <StudentResult />
  </div>
</template>

<script setup>
import { ref } from "vue";
import AddUserButton from "@/components/button/AddUserButton.vue";
import StudentEnrollments from "@/components/course/StudentEnrollments.vue";
import StudentResult from "@/components/course/StudentResult.vue";

const { t } = useI18n();

useHead({
  title: t("seo.title"),
  description: t("seo.desc"),
});

definePageMeta({
  layout: "landing",
});

const buttons = ["Student Enrollments", "Student Results"];

const activeButton = ref("Student Enrollments");
const setActionButton = (button) => {
  activeButton.value = button;
};
</script>

<style lang="scss" scoped>
.scrollbar-set {
  scrollbar-width: thin;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 10px;
    border: 2px solid #f1f1f1;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
}
</style>

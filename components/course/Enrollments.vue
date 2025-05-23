<template>
  <div class="flex items-center justify-between flex-row">
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
           totalStudents
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
    <StudentEnrollments :refresh="studentListUpdated" @update:totalStudents="totalStudents = $event"/>
  </div>
  <div v-else-if="activeButton === 'Student Results'">
    <StudentResult :courseId="id" />
  </div>
  <AddStudent
    v-if="showAddStudentPopup"
    :id="id"
    :course="course"
    @close="showAddStudentPopup = false"
    @updated="handleStudentListUpdated"
  />
</template>

<script setup>
import { ref } from "vue";
import AddUserButton from "@/components/button/AddUserButton.vue";
import StudentEnrollments from "@/components/course/StudentEnrollments.vue";
import StudentResult from "@/components/course/StudentResult.vue";
import AddStudent from "@/components/popups/AddStudent.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const { t } = useI18n();
const totalStudents = ref(0);

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

const showAddStudentPopup = ref(false);
const studentListUpdated = ref(false);

const id = ref(router.currentRoute.value.params.id);

const onClickAddUser = () => {
  id.value = router.currentRoute.value.params.id;
  showAddStudentPopup.value = true;
};

const handleStudentListUpdated = () => {
  studentListUpdated.value = !studentListUpdated.value;
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

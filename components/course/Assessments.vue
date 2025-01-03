<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-row justify-between items-center gap-4">
      <div
        class="px-4 py-3 bg-white border border-grey-secondary rounded-xl flex flex-row gap-4 items-center"
      >
        <input
          type="text"
          v-model="searchQuery"
          @keyup.enter="getStudents(searchQuery)"
          class="bg-transparent border-none focus:ring-0 outline-none text-base w-48"
          placeholder="Search..."
        />
        <button
          class="flex items-center justify-center bg-white rounded-xl"
          @click="getStudents(searchQuery)"
        >
          <Search class="w-6 h-6" />
        </button>
      </div>
      <div class="flex flex-row gap-4">
        <AddUserButton
          @click="onClickAddUser"
          class="flex items-center flex-row justify-center border border-grey-secondary rounded-xl px-4 py-3 gap-2"
        >
          <span class="text-black-primary font-semibold text-base"
            >Add</span
          >
        </AddUserButton>
        <TemplateButton
          @click="exportUser"
          class="flex items-center flex-row justify-center border border-grey-secondary rounded-xl px-4 py-3 gap-2"
        >
          <span class="text-black-primary font-semibold text-base"
            >Template</span
          >
        </TemplateButton>
        <Import
          @click="onClickImportUser"
          class="flex items-center flex-row justify-center border border-grey-secondary rounded-xl px-4 py-3 gap-2"
        >
          <span class="text-black-primary font-semibold text-base">Import</span>
        </Import>
      </div>
    </div>
    <div class="border border-grey-secondary p-4 rounded-2xl">
      <div class="flex flex-row gap-4 pb-2 border-b">
        <div
          class="w-64 text-sm text-grey-primary flex items-center justify-center"
        >
          Assessment Name
        </div>
        <div
          class="w-24 text-sm text-grey-primary flex items-center justify-center text-center"
        >
          Included <br />In CLOs
        </div>
        <div
          class="w-full text-sm text-grey-primary flex items-center justify-center"
        >
          Details
        </div>
      </div>
      <div
        class="min-h-[calc(100vh-400px)] overflow-y-scroll scrollbar-set mt-2 flex flex-col justify-between h-full"
      >
        <div class="h-full w-full flex flex-row gap-4">
          <div class="h-full w-64 flex flex-col gap-2">
            <button
              v-for="assessment in assessments"
              :key="assessment.id"
              @click="setActiveAssessment(assessment.id)"
              :class="[
                'flex items-center justify-center py-2 rounded-xl w-full hover:cursor-pointer',
                activeAssessment === assessment.id
                  ? 'bg-black-primary text-white'
                  : 'border border-grey-secondary',
              ]"
            >
              {{ assessment.name }}
            </button>
          </div>
          <div class="h-full w-24 flex items-center justify-center py-2">2</div>
          <div class="h-full w-full p-2">3</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Search from "@/components/icons/Search.vue";
import AddUserButton from "@/components/button/AddUserButton.vue";
import TemplateButton from "@/components/button/TemplateButton.vue";
import Import from "@/components/button/ImportButton.vue";
import Export from "@/components/button/ExportButton.vue";
const { t } = useI18n();

const searchQuery = ref("");
const assessments = ref([]);
const activeAssessment = ref(1);

const getStudents = (query) => {
  console.log("getStudents called with query:", query);
  assessments.value = [
    {
      id: 1,
      name: "Assessment 1",
      clos: "Include",
      details: "Details for Assessment 1",
    },
    {
      id: 2,
      name: "Assessment 2",
      clos: "Include",
      details: "Details for Assessment 2",
    },
    {
      id: 3,
      name: "Assessment 3",
      clos: "Include",
      details: "Details for Assessment 3",
    },
  ];
  console.log("assessments:", assessments.value);
};

const setActiveAssessment = (id) => {
  activeAssessment.value = id;
};

onMounted(() => {
  getStudents(searchQuery.value);
});

useHead({
  title: t("seo.title"),
  description: t("seo.desc"),
});

definePageMeta({
  layout: "landing",
});
</script>

<style lang="scss" scoped>
.scrollbar-set {
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>

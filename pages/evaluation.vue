<template>
  <div class="flex flex-row gap-4">
    <div
      class="px-4 py-3 bg-white border border-grey-secondary rounded-xl flex flex-row gap-4 items-center"
    >
      <select
        v-model="selectedFacultyOption"
        @change="getDepartments(selectedFacultyOption)"
        class="bg-transparent border-none focus:ring-0 outline-none text-base pr-2 hover:cursor-pointer"
      >
        <option value="">Faculties</option>
        <option
          v-for="option in facultyOptions"
          :key="option.id"
          :value="option"
        >
          {{ option.name_en }}
        </option>
      </select>
    </div>
    <div
      class="px-4 py-3 bg-white border border-grey-secondary rounded-xl flex flex-row gap-4 items-center"
    >
      <select
        v-model="selectedDepartmentOption"
        @change="getPrograms(selectedDepartmentOption)"
        class="bg-transparent border-none focus:ring-0 outline-none text-base pr-2 hover:cursor-pointer"
      >
        <option value="">Departments</option>
        <option
          v-for="option in departmentOptions"
          :key="option.id"
          :value="option"
        >
          {{ option.name_en }}
        </option>
      </select>
    </div>
    <div
      class="px-4 py-3 bg-white border border-grey-secondary rounded-xl flex flex-row gap-4 items-center"
    >
      <select
        v-model="selectedProgramOption"
        class="bg-transparent border-none focus:ring-0 outline-none text-base pr-2 hover:cursor-pointer"
      >
        <option value="">Programs</option>
        <option
          v-for="option in programOptions"
          :key="option.id"
          :value="option.id"
        >
          {{ option.name_en }}
        </option>
      </select>
    </div>
  </div>
  <div class="rounded-xl p-6 bg-white border border-grey-secondary mt-6">
    <div class="mb-4">
      <div class="flex flex-row gap-4 items-center">
        <h2 class="text-base font-semibold text-gray-800">Topics :</h2>
        <div
          class="px-4 py-3 bg-white border border-grey-secondary rounded-xl flex flex-row gap-4 items-center"
        >
          <select
            v-model="selectedTopic"
            class="bg-transparent border-none focus:ring-0 outline-none text-base pr-2 hover:cursor-pointer"
          >
            <option value="">Select Topic</option>
            <option
              v-for="topic in topics"
              :key="topic.name"
              :value="topic.name"
            >
              {{ topic.name }}
            </option>
          </select>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-4 gap-6">
      <div
        v-if="selectedTopic"
        class="col-span-3 rounded-xl bg-white border border-grey-secondary overflow-y-scroll min-h-[calc(100vh-360px)] scrollbar-set"
      >
        <div
          class="flex flex-col gap-4 justify-center items-center h-full w-full"
        >
          <img
            :src="Exel"
            alt="Banner Login"
            class="w-24 max-w-md object-cover rounded-2xl -ml-4"
          />
          <div class="text-center text-black-primary text-sm">
            {{ selectedTopic }}.xlsx
          </div>
          <ImportButton
            @click="downloadExel(selectedTopic)"
            class="flex items-center flex-row justify-center border border-grey-secondary rounded-xl px-4 py-3 gap-2"
          >
            <span class="text-black-primary font-semibold text-base"
              >Download</span
            >
          </ImportButton>
        </div>
      </div>
      <div
        v-else
        class="col-span-3 flex items-center border-grey-secondary justify-center flex-col overflow-y-scroll min-h-[calc(100vh-360px)] scrollbar-set"
      >
        <img
          :src="BannerLogin"
          alt="Banner Login"
          class="w-64 max-w-md object-cover rounded-2xl mb-4"
        />
        <div class="text-center font-semibold text-grey-primary">
          Please select a topic!
        </div>
      </div>
      <div class="col-span-1 h-full">
        <h3 class="text-base font-semibold text-black-primary mb-2">
          From Academic Year
        </h3>
        <div
          class="px-4 py-3 bg-white border border-grey-secondary rounded-xl flex flex-row gap-4 items-center"
        >
          <select
            v-model="selectedStartAcademicYear"
            class="bg-transparent border-none focus:ring-0 outline-none text-base pr-2 hover:cursor-pointer w-full"
          >
            <option value="">From</option>
            <option
              v-for="year in academicYearOptions"
              :key="year.id"
              :value="year.year"
            >
              {{ year.semester_sequence }} / {{ year.year }}
            </option>
          </select>
        </div>
        <h3 class="text-base font-semibold text-black-primary mt-4">
          To Academic Year
        </h3>
        <div
          class="px-4 py-3 bg-white border border-grey-secondary rounded-xl flex flex-row gap-4 items-center mt-2"
        >
          <select
            v-model="selectedEndAcademicYear"
            class="bg-transparent border-none focus:ring-0 outline-none text-base pr-2 hover:cursor-pointer w-full"
          >
            <option value="">Until</option>
            <option
              v-for="year in academicYearOptions"
              :key="year.id"
              :value="year.year"
            >
              {{ year.semester_sequence }} / {{ year.year }}
            </option>
          </select>
        </div>
      </div>
    </div>
  </div>
  <StatusPopup
    v-if="statusVisible"
    @close="statusVisible = false"
    :status="status"
    :message="message"
    :path="path"
  />
</template>

<script setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import Exel from "@/components/images/Exel.png";
import ImportButton from "@/components/button/ImportButton.vue";
import BannerLogin from "@/components/images/BannerLogin.jpg";
import StatusPopup from "@/components/popups/StatusPopup.vue";
import { fetchEvaluation, fetchFaculties, fetchSerms } from "~/api/api";
const { t } = useI18n();

useHead({
  title: "Inu - Evaluation",
  description: t("seo.desc"),
});

definePageMeta({
  layout: "landing",
});

const selectedDepartmentOption = ref("");
const selectedFacultyOption = ref("");
const selectedProgramOption = ref("");
const selectedTopic = ref("");
const selectedStartAcademicYear = ref("");
const selectedEndAcademicYear = ref("");
const statusVisible = ref(false);
const status = ref("");
const message = ref("");
const path = ref("");

const departmentOptions = ref([]);
const facultyOptions = ref([]);
const programOptions = ref([]);
const academicYearOptions = ref([]);

const topics = ref([
  { name: "Course CLO Assessment" },
  { name: "Course Link Outcome " },
  { name: "Course Outcome Success Rate" },
]);

const downloadExel = async (topic) => {
  console.log("Downloading Exel for topic: ", topic);
  if (topic === "Course CLO Assessment") {
    topic = 0;
  } else if (topic === "Course Link Outcome") {
    topic = 1;
  } else if (topic === "Course Outcome Success Rate") {
    topic = 2;
  }

  if (
    !selectedFacultyOption.value ||
    !selectedDepartmentOption.value ||
    !selectedProgramOption.value ||
    !selectedStartAcademicYear.value ||
    !selectedEndAcademicYear.value
  ) {
    statusVisible.value = true;
    status.value = "error";
    message.value = "Please select all fields!";
    path.value = "";
    return;
  }

  await fetchEvaluation(
    selectedProgramOption.value,
    selectedStartAcademicYear.value,
    selectedEndAcademicYear.value,
    topic
  );
};

const getDepartments = (faculty) => {
  departmentOptions.value = faculty.departments || [];
};

const getPrograms = (department) => {
  programOptions.value = department.programmes || [];
};

onMounted(async () => {
  await fetchFaculties(facultyOptions);
  await fetchSerms(academicYearOptions);
  console.log("Faculties: ", facultyOptions.value);
});
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

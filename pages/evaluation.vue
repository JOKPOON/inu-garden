<template>
  <div class="flex flex-row gap-4">
    <div
      class="px-4 py-3 bg-white border border-grey-secondary rounded-xl flex flex-row gap-4 items-center"
    >
      <input
        type="text"
        v-model="searchQuery"
        class="bg-transparent border-none focus:ring-0 outline-none text-base w-56"
        placeholder="Search..."
      />
      <button
        class="flex items-center justify-center bg-white rounded-xl"
        @click="handleSearch"
      >
        <Search class="w-6 h-6" />
      </button>
    </div>
    <div
      class="px-4 py-3 bg-white border border-grey-secondary rounded-xl flex flex-row gap-4 items-center"
    >
      <select
        v-model="selectedDepartmentOption"
        class="bg-transparent border-none focus:ring-0 outline-none text-base pr-2 hover:cursor-pointer"
      >
        <option value="">All Departments</option>
        <option
          v-for="option in departmentOptions"
          :key="option"
          :value="option"
        >
          {{ option }}
        </option>
      </select>
    </div>
    <div
      class="px-4 py-3 bg-white border border-grey-secondary rounded-xl flex flex-row gap-4 items-center"
    >
      <select
        v-model="selectedFactoryOption"
        class="bg-transparent border-none focus:ring-0 outline-none text-base pr-2 hover:cursor-pointer"
      >
        <option value="">All Factories</option>
        <option v-for="option in factoryOptions" :key="option" :value="option">
          {{ option }}
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
        <option value="">All Programs</option>
        <option v-for="option in programOptions" :key="option" :value="option">
          {{ option }}
        </option>
      </select>
    </div>
  </div>
  <div
    class="rounded-xl p-6 bg-white border border-grey-secondary mt-6 max-h-[calc(100vh-250px)] overflow-y-scroll scrollbar-set"
  >
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
        class="col-span-3 rounded-xl bg-white border border-grey-secondary overflow-y-scroll set-scrollbar"
      >
        <table
          v-if="selectedTopic"
          class="min-w-full divide-y divide-grey-secondary"
        >
          <thead class="bg-gray-50">
            <tr>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Code
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Course Name
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                CLO
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Assessment
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                PLO
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                PO
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                SO
              </th>
            </tr>
          </thead>
          <thead class="bg-gray-50">
            <tr>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Code
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Course Name
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                CLO
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Assessment
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                <div v-for="topic in filteredTopics" :key="topic.name">
                  <div
                    v-for="(clo, index) in Object.keys(topic.clo)"
                    :key="index"
                    class="flex flex-row gap-2 items-center"
                  >
                    <div
                      v-for="(ploKey, ploValue) in topic.clo[clo].plo"
                      :key="ploKey"
                    >
                      <div class="text-sm text-gray-500 text-center">
                        {{ ploValue }}
                      </div>
                    </div>
                  </div>
                </div>
              </th>
            </tr>
          </thead>
        </table>
      </div>
      <div class="col-span-1">
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
              :key="year"
              :value="year"
            >
              {{ year }}
            </option>
          </select>
        </div>
        <h3 class="text-base font-semibold text-black-primary mt-4">
          To Academic Year (Optional)
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
              :key="year"
              :value="year"
            >
              {{ year }}
            </option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import Search from "@/components/icons/Search.vue";
const { t } = useI18n();

const searchQuery = ref("");
const selectedDepartmentOption = ref("");
const selectedFactoryOption = ref("");
const selectedProgramOption = ref("");
const selectedTopic = ref("");
const selectedStartAcademicYear = ref("");
const selectedEndAcademicYear = ref("");

const departmentOptions = ref(["Department 1", "Department 2", "Department 3"]);
const factoryOptions = ref(["Factory 1", "Factory 2", "Factory 3"]);
const programOptions = ref(["Program 1", "Program 2", "Program 3"]);
const academicYearOptions = ref(["2021", "2022", "2023", "2024"]);

const topics = ref([
  {
    name: "Topic 1",
    code: "CS211",
    couseName: "Data Structures",
    description: "Introduction to Data Structures",
    clo: {
      CLO1: {
        description: "CLO1 Example",
        Include: ["Assesment1", "Assesment2"],
        plo: { PLO1: "X", PLO2: "O" },
        po: { PO1: "X", PO2: "O" },
        so: { SO1: "X", SO2: "O" },
      },
      CLO2: {
        description: "CLO2 Example",
        Include: ["Assesment1", "Assesment2"],
        plo: { PLO1: "X", PLO2: "O" },
        po: { PO1: "X", PO2: "O" },
        so: { SO1: "X", SO2: "O" },
      },
    },
  },
  {
    name: "Topic 2",
    code: "CS212",
    couseName: "Algorithms",
    description: "Introduction to Algorithms",
    clo: {
      CLO1: {
        description: "CLO1 Example",
        Include: ["Assesment1", "Assesment2"],
        plo: { PLO1: "X", PLO2: "O", PLO3: "O" },
        po: { PO1: "X", PO2: "O" },
        so: { SO1: "X", SO2: "O" },
      },
      CLO2: {
        description: "CLO2 Example",
        Include: ["Assesment1", "Assesment2"],
        plo: { PLO1: "X", PLO2: "O" },
        po: { PO1: "X", PO2: "O" },
        so: { SO1: "X", SO2: "O" },
      },
    },
  },
  {
    name: "Topic 3",
    code: "CS213",
    couseName: "Database Management",
    description: "Introduction to Database Management",
    clo: {
      CLO1: {
        description: "CLO1 Example",
        Include: ["Assesment1", "Assesment2"],
        plo: { PLO1: "X", PLO2: "O" },
        po: { PO1: "X", PO2: "O" },
        so: { SO1: "X", SO2: "O" },
      },
      CLO2: {
        description: "CLO2 Example",
        Include: ["Assesment1", "Assesment2"],
        plo: { PLO1: "X", PLO2: "O" },
        po: { PO1: "X", PO2: "O" },
        so: { SO1: "X", SO2: "O" },
      },
    },
  },
]);

const filteredTopics = computed(() => {
  if (!selectedTopic.value) return [];
  return topics.value.filter((topic) => topic.name === selectedTopic.value);
});

const handleSearch = () => {};

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

.set-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #d1d5db #f3f4f6;
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: #f3f4f6;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #d1d5db;
    border-radius: 6px;
    border: 3px solid #f3f4f6;
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: #b8c2cc;
  }
}
</style>

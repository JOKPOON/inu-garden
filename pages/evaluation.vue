<template>
  <div class="flex flex-row gap-4">
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
        v-model="selectedFacultyOption"
        class="bg-transparent border-none focus:ring-0 outline-none text-base pr-2 hover:cursor-pointer"
      >
        <option value="">All Faculties</option>
        <option v-for="option in facultyOptions" :key="option" :value="option">
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
        class="col-span-3 rounded-xl bg-white border border-grey-secondary overflow-y-scroll set-scrollbar max-h-[calc(100vh-360px)]"
      >
        <table
          v-if="selectedTopic"
          class="min-w-full divide-y divide-grey-secondary"
        >
          <thead class="bg-gray-50">
            <tr>
              <th
                scope="col"
                class="px-6 py-3 text-center text-xs font-medium text-grey-primary uppercase tracking-wider"
              >
                Code
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-center text-xs font-medium text-grey-primary uppercase tracking-wider"
              >
                Course Name
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-center text-xs font-medium text-grey-primary uppercase tracking-wider"
              >
                CLO
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-center text-xs font-medium text-grey-primary uppercase tracking-wider"
              >
                Assessment
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-center text-xs font-medium text-grey-primary uppercase tracking-wider"
              >
                PLO
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-center text-xs font-medium text-grey-primary uppercase tracking-wider"
              >
                PO
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-center text-xs font-medium text-grey-primary uppercase tracking-wider"
              >
                SO
              </th>
            </tr>
          </thead>
          <thead class="bg-gray-50">
            <tr>
              <th
                scope="col"
                class="px-6 py-3 text-center text-xs font-medium text-grey-primary uppercase tracking-wider"
              ></th>
              <th
                scope="col"
                class="px-6 py-3 text-center text-xs font-medium text-grey-primary uppercase tracking-wider"
              ></th>
              <th
                scope="col"
                class="px-6 py-3 text-center text-xs font-medium text-grey-primary uppercase tracking-wider"
              ></th>
              <th
                scope="col"
                class="px-6 py-3 text-center text-xs font-medium text-grey-primary uppercase tracking-wider"
              ></th>
              <th
                class="py-3 text-center text-xs font-medium text-grey-primary uppercase tracking-wider"
              >
                <div class="flex flex-row gap-4 items-center px-4">
                  <div v-for="i in checkLongestPLO(filteredTopics[0])" :key="i">
                    PLO{{ i }}
                  </div>
                </div>
              </th>
              <th
                class="py-3 text-center text-xs font-medium text-grey-primary uppercase tracking-wider"
              >
                <div class="flex flex-row gap-4 items-center px-4">
                  <div v-for="i in checkLongestPO(filteredTopics[0])" :key="i">
                    PO{{ i }}
                  </div>
                </div>
              </th>
              <th
                class="py-3 text-center text-xs font-medium text-grey-primary uppercase tracking-wider"
              >
                <div class="flex flex-row gap-4 items-center px-4">
                  <div v-for="i in checkLongestSO(filteredTopics[0])" :key="i">
                    SO{{ i }}
                  </div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-grey-secondary">
            <tr v-for="topic in topics" :key="topic.name">
              <td
                class="px-6 py-4 whitespace-nowrap text-sm text-black-primary"
              >
                {{ topic.code }}
              </td>
              <td
                class="px-6 py-4 whitespace-nowrap text-sm text-black-primary"
              >
                {{ topic.courseName }}
              </td>
              <td
                class="px-6 py-4 whitespace-nowrap text-sm text-black-primary"
              >
                <div v-for="(clo, cloKey) in topic.clo" :key="cloKey">
                  {{ clo.description }}
                  <div
                    v-for="(item, index) in clo.Include.length - 1"
                    :key="index"
                    class="flex flex-row gap-4 items-center px-4"
                  >
                    <div><br /></div>
                  </div>
                </div>
              </td>
              <td
                class="px-6 py-4 whitespace-nowrap text-sm text-black-primary"
              >
                <div v-for="(clo, cloKey) in topic.clo" :key="cloKey">
                  <div
                    v-for="assessment in clo.Include"
                    :key="assessment.name"
                    class="flex flex-row gap-4 items-center px-4"
                  >
                    <div>{{ assessment.name }}</div>
                  </div>
                </div>
              </td>
              <td class="py-4 whitespace-nowrap text-sm text-black-primary">
                <div v-for="(clo, cloKey) in topic.clo" :key="cloKey">
                  <div
                    v-for="assessment in clo.Include"
                    :key="assessment.name"
                    class="flex flex-row gap-4 items-center px-4"
                  >
                    <div
                      v-for="plo in Object.keys(assessment.plo)"
                      :key="plo"
                      class="w-full text-center"
                    >
                      {{ assessment.plo[plo] }}
                    </div>
                  </div>
                </div>
              </td>
              <td class="py-4 whitespace-nowrap text-sm text-black-primary">
                <div v-for="(clo, cloKey) in topic.clo" :key="cloKey">
                  <div
                    v-for="assessment in clo.Include"
                    :key="assessment.name"
                    class="flex flex-row gap-4 items-center px-4"
                  >
                    <div
                      v-for="po in Object.keys(assessment.po)"
                      :key="po"
                      class="w-full text-center"
                    >
                      {{ assessment.po[po] }}
                    </div>
                  </div>
                </div>
              </td>
              <td class="py-4 whitespace-nowrap text-sm text-black-primary">
                <div v-for="(clo, cloKey) in topic.clo" :key="cloKey">
                  <div
                    v-for="assessment in clo.Include"
                    :key="assessment.name"
                    class="flex flex-row gap-4 items-center px-4"
                  >
                    <div
                      v-for="so in Object.keys(assessment.so)"
                      :key="so"
                      class="w-full text-center"
                    >
                      {{ assessment.so[so] }}
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else class="col-span-3 flex items-center justify-center flex-col">
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
        <div class="mt-4 flex flex-col">
          <div class="text-base text-black- font-medium">Meaning</div>
          <div class="text-base text-black-primary">
            <span class="font-semibold">X</span> : Direct Assessment
          </div>
          <div class="text-base text-black-primary">
            <span class="font-semibold">O</span> : Indirect Assessment
          </div>
          <div class="border-t mt-4">
            <ExportButton
              class="flex items-center flex-row justify-center border border-grey-secondary rounded-xl px-4 py-3 gap-2 mt-4"
            >
              <span class="text-black-primary font-semibold text-base"
                >Export</span
              >
            </ExportButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import ExportButton from "@/components/button/ExportButton.vue";
import BannerLogin from "@/components/images/BannerLogin.jpg";
const { t } = useI18n();

const handleSearch = () => {
  console.log("Search query:", searchQuery.value);
};

useHead({
  title: "Inu - Evaluation",
  description: t("seo.desc"),
});

definePageMeta({
  layout: "landing",
});

const searchQuery = ref("");
const selectedDepartmentOption = ref("");
const selectedFacultyOption = ref("");
const selectedProgramOption = ref("");
const selectedTopic = ref("");
const selectedStartAcademicYear = ref("");
const selectedEndAcademicYear = ref("");

const departmentOptions = ref(["Department 1", "Department 2", "Department 3"]);
const facultyOptions = ref(["faculty 1", "faculty 2", "faculty 3"]);
const programOptions = ref(["Program 1", "Program 2", "Program 3"]);
const academicYearOptions = ref(["2021", "2022", "2023", "2024"]);

const topics = ref([
  {
    name: "Topic 1",
    code: "CS211",
    courseName: "Data Structures",
    description: "Introduction to Data Structures",
    clo: {
      CLO1: {
        description: "CLO1 Example",
        Include: [
          {
            name: "Assessment1",
            plo: { PLO1: "O", PLO2: "X" },
            po: { PO1: "X", PO2: "O" },
            so: { SO1: "X", SO2: "O" },
          },
          {
            name: "Assessment2",
            plo: { PLO1: "O", PLO2: "X" },
            po: { PO1: "X", PO2: "O" },
            so: { SO1: "X", SO2: "O" },
          },
        ],
      },
      CLO2: {
        description: "CLO2 Example",
        Include: [
          {
            name: "Assessment1",
            plo: { PLO1: "O", PLO2: "X" },
            po: { PO1: "X", PO2: "O" },
            so: { SO1: "X", SO2: "O" },
          },
          {
            name: "Assessment2",
            plo: { PLO1: "O", PLO2: "X" },
            po: { PO1: "X", PO2: "O" },
            so: { SO1: "X", SO2: "O" },
          },
        ],
      },
    },
  },
  {
    name: "Topic 2",
    code: "CS212",
    courseName: "Algorithms",
    description: "Introduction to Algorithms",
    clo: {
      CLO1: {
        description: "CLO1 Example",
        Include: [
          {
            name: "Assessment1",
            plo: { PLO1: "O", PLO2: "X" },
            po: { PO1: "X", PO2: "O" },
            so: { SO1: "X", SO2: "O" },
          },
          {
            name: "Assessment2",
            plo: { PLO1: "O", PLO2: "X" },
            po: { PO1: "X", PO2: "O" },
            so: { SO1: "X", SO2: "O" },
          },
        ],
      },
      CLO2: {
        description: "CLO2 Example",
        Include: [
          {
            name: "Assessment1",
            plo: { PLO1: "O", PLO2: "X" },
            po: { PO1: "X", PO2: "O" },
            so: { SO1: "X", SO2: "O" },
          },
          {
            name: "Assessment2",
            plo: { PLO1: "O", PLO2: "X" },
            po: { PO1: "X", PO2: "O" },
            so: { SO1: "X", SO2: "O" },
          },
        ],
      },
    },
  },
  {
    name: "Topic 3",
    code: "CS213",
    courseName: "Operating Systems",
    description: "Introduction to Operating Systems",
    clo: {
      CLO1: {
        description: "CLO1 Example",
        Include: [
          {
            name: "Assessment1",
            plo: { PLO1: "O", PLO2: "X" },
            po: { PO1: "X", PO2: "O" },
            so: { SO1: "X", SO2: "O" },
          },
          {
            name: "Assessment2",
            plo: { PLO1: "O", PLO2: "X" },
            po: { PO1: "X", PO2: "O" },
            so: { SO1: "X", SO2: "O" },
          },
        ],
      },
      CLO2: {
        description: "CLO2 Example",
        Include: [
          {
            name: "Assessment1",
            plo: { PLO1: "O", PLO2: "X" },
            po: { PO1: "X", PO2: "O" },
            so: { SO1: "X", SO2: "O" },
          },
          {
            name: "Assessment2",
            plo: { PLO1: "O", PLO2: "X" },
            po: { PO1: "X", PO2: "O" },
            so: { SO1: "X", SO2: "O" },
          },
        ],
      },
    },
  },
]);

const checkLongestPLO = (topic) => {
  if (!topic) return 0;
  let longest = 0;
  for (const cloKey in topic.clo) {
    const clo = topic.clo[cloKey];
    for (const assessment of clo.Include) {
      const ploKeys = Object.keys(assessment.plo);
      if (ploKeys.length > longest) {
        longest = ploKeys.length;
      }
    }
  }
  return longest;
};

const checkLongestPO = (topic) => {
  if (!topic) return 0;
  let longest = 0;
  for (const cloKey in topic.clo) {
    const clo = topic.clo[cloKey];
    for (const assessment of clo.Include) {
      const poKeys = Object.keys(assessment.po);
      if (poKeys.length > longest) {
        longest = poKeys.length;
      }
    }
  }
  return longest;
};

const checkLongestSO = (topic) => {
  if (!topic) return 0;
  let longest = 0;
  for (const cloKey in topic.clo) {
    const clo = topic.clo[cloKey];
    for (const assessment of clo.Include) {
      const soKeys = Object.keys(assessment.so);
      if (soKeys.length > longest) {
        longest = soKeys.length;
      }
    }
  }
  return longest;
};

const filteredTopics = computed(() => {
  if (!selectedTopic.value) return [];
  return topics.value.filter((topic) => topic.name === selectedTopic.value);
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

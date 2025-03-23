<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-row justify-between gap-6 items-center w-full">
      <div class="flex">
        <div
          class="px-4 py-3 bg-white border border-grey-secondary rounded-xl flex flex-row gap-4 items-center"
        >
          <input
            type="text"
            v-model="searchQuery"
            class="bg-transparent border-none focus:ring-0 outline-none text-base w-48"
            placeholder="Search..."
          />
          <button class="flex items-center justify-center bg-white rounded-xl">
            <Search class="w-6 h-6" />
          </button>
        </div>
      </div>
      <div class="flex flex-row gap-4">
        <TemplateButton
          class="flex items-center flex-row justify-center border border-grey-secondary rounded-xl px-4 py-3 gap-2"
        >
          <span class="text-black-primary font-semibold text-base"
            >Template</span
          >
        </TemplateButton>
        <Import
          class="flex items-center flex-row justify-center border border-grey-secondary rounded-xl px-4 py-3 gap-2"
        >
          <span class="text-black-primary font-semibold text-base">Import</span>
        </Import>
        <ExportButton
          class="flex items-center flex-row justify-center border border-grey-secondary rounded-xl px-4 py-3 gap-2"
        >
          <span class="text-black-primary font-semibold text-base">Export</span>
        </ExportButton>
      </div>
    </div>

    <div
      class="flex h-[calc(100vh-300px)] border border-grey-secondary rounded-xl"
    >
      <div class="grid grid-cols-9 w-full h-full text-sm">
        <div class="col-span-1 h-full border-r">
          <div
            class="w-full flex items-center justify-center py-3 border-b border-grey-secondary font-semibold text-grey-primary"
          >
            Code
          </div>
          <div
            class="max-h-[calc(100vh-342px)] overflow-y-scroll scrollbar-set"
          >
            <button
              v-for="po in PO"
              :key="po.name"
              @click="selectPO(po)"
              :class="{
                'bg-grey-secondary text-black-primary':
                  selectedPO.name === po.name,
                'bg-white': selectedPO.name !== po.name,
              }"
              class="w-full flex items-center justify-center py-3 border-b border-grey-secondary"
            >
              {{ po.name }}
            </button>
          </div>
          <div class="w-full mt-4 flex items-center justify-center">
            <SmallAddButton
              @click="showAddPO"
              class="flex items-center flex-row justify-center border border-grey-secondary rounded-xl px-3 py-2 gap-2"
            >
              <span class="text-black-primary font-semibold text-base"
                >Add</span
              >
            </SmallAddButton>
          </div>
        </div>
        <div class="col-span-8 h-full flex flex-col">
          <div
            class="w-full flex items-center justify-center py-3 border-b border-grey-secondary font-semibold text-grey-primary"
          >
            Detail of {{ selectedPO.name }}
          </div>

          <div class="grid grid-cols-2 w-full h-full">
            <div
              class="col-span-1 h-full border-r max-h-[calc(100vh-342px)] overflow-y-scroll scrollbar-set"
            >
              <div
                class="w-full flex flex-col gap-2 py-3 border-b border-grey-secondary"
              >
                <div class="font-semibold text-black-primary px-4">
                  Description
                </div>
                <div v-if="selectedPO.detail" class="px-4">
                  {{ selectedPO.detail.desc_th }}
                </div>
                <div v-if="selectedPO.detail" class="px-4">
                  {{ selectedPO.detail.desc }}
                </div>
              </div>
            </div>

            <div
              class="col-span-1 h-full border-r max-h-[calc(100vh-342px)] overflow-y-scroll scrollbar-set"
            >
              <div
                class="w-full flex flex-col gap-2 py-3 border-b border-grey-secondary"
              >
                <div class="flex flex-row gap-4 px-4">
                  <div class="font-semibold text-black-primary w-full">
                    Expected Weighted Passing CLO rate
                  </div>
                  <div>
                    {{ selectedPO.detail.expectedWeightPassingCLORate }}%
                  </div>
                </div>
                <div class="flex flex-row gap-4 px-4">
                  <div class="font-semibold text-black-primary w-full">
                    Expected Overall Passing Rate
                  </div>
                  <div>
                    {{ selectedPO.detail.expectedWeightPassingCLORate }}%
                  </div>
                </div>
                <div class="flex flex-row gap-4 px-4">
                  <div class="font-semibold text-black-primary w-full">
                    Expected Weighted Passing CLO rate
                  </div>
                  <div>
                    {{ selectedPO.detail.expectedWeightPassingCLORate }}%
                  </div>
                </div>
              </div>
              <div class="w-full flex flex-col gap-2 pt-2">
                <div
                  class="font-semibold text-grey-primary px-4 w-full text-center border-b border-grey-secondary pb-2"
                >
                  Involved Courses
                </div>
                <div class="flex flex-row gap-4 px-4 mt-2 items-center">
                  <div class="font-semibold text-black-primary w-full">
                    Expected Course PO passing rate (%)
                  </div>
                  <div>
                    <div v-if="!editMode" class="flex items-center justify-center w-16 border p-1 rounded-lg border-grey-tertiary">
                      {{ selectedPO.detail.expectedCoursePOPassingRate }}
                    </div>
                    <div v-if="editMode">
                      <input
                        type="text"
                        class="bg-transparent text-center focus:ring-0 outline-none text-base w-16 border p-1 rounded-lg border-grey-primary"
                        v-model="
                          selectedPO.detail.expectedCoursePOPassingRate
                        "
                      />
                    </div>
                  </div>
                </div>
                <div class="flex flex-row gap-4 px-4 mt-2 justify-between">
                  <div class="flex">
                    <div
                      class="px-3 py-2 bg-white border border-grey-secondary rounded-xl flex flex-row gap-4 items-center"
                    >
                      <input
                        type="text"
                        v-model="searchQuery"
                        class="bg-transparent border-none focus:ring-0 outline-none text-base w-48"
                        placeholder="Search..."
                      />
                      <button
                        class="flex items-center justify-center bg-white rounded-xl"
                      >
                        <Search class="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                  <SmallEditButton
                    v-if="!editMode"
                    @click="editPO"
                    class="flex items-center flex-row justify-center border border-grey-secondary rounded-xl px-3 py-2 gap-2"
                  >
                    <span class="text-black-primary font-semibold text-base"
                      >Edit</span
                    >
                  </SmallEditButton>
                  <SmallSaveButton
                    v-if="editMode"
                    @click="savePO"
                    class="flex items-center flex-row justify-center border border-grey-secondary rounded-xl px-3 py-2 gap-2"
                  >
                    <span class="text-black-primary font-semibold text-base"
                      >Save</span
                    >
                  </SmallSaveButton>
                </div>
                <table
                  class="min-w-full divide-y border-grey-secondary mt-2 border-y"
                >
                  <thead class="divide-x border-grey-secondary">
                    <tr>
                      <th
                        scope="col"
                        class="px-6 py-3 text-center font-semibold text-grey-primary border-r border-grey-secondary"
                      >
                        Course
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 text-center font-semibold text-grey-primary border-r border-grey-secondary"
                      >
                        PO Passing Rate
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y border-grey-secondary">
                    <tr
                      v-for="course in selectedPO.detail.involvedCourses"
                      :key="course.code"
                    >
                      <td
                        class="px-4 py-4 text-sm border-r border-grey-secondary"
                      >
                        <span class="font-semibold">{{ course.code }}</span
                        >- {{ course.name }} <br />
                        <span class="text-grey-primary">{{
                          course.semester
                        }}</span>
                      </td>
                      <td
                        class="px-4 py-4 text-sm font-medium border-r border-grey-secondary"
                      >
                        <div class="flex flex-row items-center justify-center">
                          <div
                            :class="[
                              'flex',
                              course.coursePOPassingRate >=
                              selectedPO.detail.expectedCoursePOPassingRate
                                ? 'bg-green-500'
                                : 'bg-red-500',
                            ]"
                            class="py-1 px-3 rounded-full text-white"
                          >
                            {{ course.coursePOPassingRate }}%
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <AddPO
    v-if="showAddPOPopup"
    :id="id"
    :name="POName"
    @close="showAddPOPopup = false"
  />
</template>

<script setup>
import TemplateButton from "@/components/button/TemplateButton.vue";
import Import from "@/components/button/ImportButton.vue";
import ExportButton from "@/components/button/ExportButton.vue";
import SmallAddButton from "@/components/button/SmallAddButton.vue";
import SmallEditButton from "@/components/button/SmallEditButton.vue";
import SmallSaveButton from "@/components/button/SmallSaveButton.vue";
import Search from "@/components/icons/Search.vue";
import Edit from "@/components/icons/Edit.vue";
import Delete from "@/components/icons/Delete.vue";
import AddPO from "@/components/popups/AddPO.vue";
import { ref } from "vue";

const searchQuery = ref("");
const editMode = ref(false);
const editPO = () => {
  editMode.value = true;
};

const savePO = () => {
  editMode.value = false;
};

const showAddPOPopup = ref(false);
const POName = ref("");
const id = ref("");

const showAddPO = () => {
  id.value = "PLO1";
  POName.value = "Computer Engineering (Regular) year 2565";
  showAddPOPopup.value = true;
};


const PO = ref([
  {
    name: "PO 1",
    detail: {
      desc: "Able to apply principles and knowledge of science, mathematics, and engineering to analyze and design solutions for computer engineering problems.",
      desc_th:
        "สามารถใช้หลักการและความรู้ทางวิทยาศาสตร์ คณิตศาสตร์ และวิศวกรรมศาสตร์ ในการวิเคราะห์และออกแบบเพื่อแก้ปัญหาทางวิศวกรรมคอมพิวเตอร์ได้",
      subPO: [
        {
          code: "PO 1.1",
          desc: "Apply knowledge of mathematics, science, and engineering to computer engineering problems.",
          desc_th:
            "ใช้ความรู้ด้านคณิตศาสตร์ วิทยาศาสตร์ และวิศวกรรมศาสตร์ในการแก้ปัญหาทางวิศวกรรมคอมพิวเตอร์",
        },
        {
          code: "PO 1.2",
          desc: "Apply knowledge of mathematics, science, and engineering to computer engineering problems.",
          desc_th:
            "ใช้ความรู้ด้านคณิตศาสตร์ วิทยาศาสตร์ และวิศวกรรมศาสตร์ในการแก้ปัญหาทางวิศวกรรมคอมพิวเตอร์",
        },
      ],
      expectedWeightPassingCLORate: 50,
      expectOverallRate: 50,
      overallPassingRate: 50,
      expectedCoursePOPassingRate: 50,
      involvedCourses: [
        {
          code: "CPE231",
          name: "Computer Engineering Project",
          semester: "1/2021",
          coursePOPassingRate: 50,
        },
        {
          code: "CPE232",
          name: "Algorithms",
          semester: "1/2021",
          coursePOPassingRate: 50,
        },
        {
          code: "CPE233",
          name: "Computer Engineering",
          semester: "1/2021",
          coursePOPassingRate: 50,
        },
      ],
    },
  },
  {
    name: "PO 2",
    detail: {},
  },
]);

const selectedPO = ref(PO.value[0]);

function selectPO(po) {
  selectedPO.value = po;
}
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
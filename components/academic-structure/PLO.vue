<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-row justify-between gap-6 items-center w-full">
      <div class="flex"></div>
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
              v-for="plo in PLO"
              :key="plo.id"
              :class="{
                'bg-grey-secondary text-black-primary': selectedPLO === plo,
                'bg-white': selectedPLO !== plo,
              }"
              @click="selectPLO(plo)"
              class="w-full flex items-center justify-center py-3 border-b border-grey-secondary"
            >
              <div class="w-full flex items-center justify-evenly gap-2">
                <span class="text-black-primary">
                  {{ plo.code }}
                </span>
                <button
                  v-if="editMode"
                  class="bg-white rounded-xl p-2 border border-grey-secondary hover:bg-red-500 text-black-primary hover:text-white"
                  @click="deletePLO(plo)"
                >
                  <Delete class="w-4 h-4" />
                </button>
              </div>
            </button>
            <div class="w-full my-4 flex items-center justify-center">
              <SmallAddButton
                @click="addPLO"
                class="flex items-center flex-row justify-center border border-grey-secondary rounded-xl px-3 py-2 gap-2"
              >
                <span class="text-black-primary font-semibold text-base"
                  >Add</span
                >
              </SmallAddButton>
            </div>
          </div>
        </div>
        <div class="col-span-8 h-full flex flex-col">
          <div
            class="w-full flex items-center justify-center py-3 border-b border-grey-secondary font-semibold text-grey-primary"
          >
            Detail of {{ selectedPLO.code }}
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
                <div v-if="selectedPLO" class="px-4">
                  {{ selectedPLO.description_thai }}
                </div>
                <div v-if="selectedPLO" class="px-4">
                  {{ selectedPLO.description_eng }}
                </div>
              </div>
              <div class="w-full flex flex-col gap-2 pt-3">
                <div class="font-semibold text-black-primary px-4">Sub PLO</div>
                <div
                  class="flex flex-row justify-between gap-6 items-center w-full px-4"
                >
                  <div class="flex"></div>
                  <div class="flex flex-row gap-4">
                    <SmallAddButton
                      @click="addSubPLO"
                      class="flex items-center flex-row justify-center border border-grey-secondary rounded-xl px-3 py-2 gap-2"
                    >
                      <span class="text-black-primary font-semibold text-base"
                        >Add</span
                      >
                    </SmallAddButton>
                  </div>
                </div>
                <div
                  v-if="
                    selectedPLO && selectedPLO.sub_program_learning_outcomes
                  "
                >
                  <table
                    class="min-w-full divide-y border-grey-secondary mt-4 border-y"
                  >
                    <thead class="divide-x border-grey-secondary">
                      <tr>
                        <th
                          scope="col"
                          class="px-6 py-3 text-center font-semibold text-grey-primary border-r border-grey-secondary"
                        >
                          Code
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 text-center font-semibold text-grey-primary border-r border-grey-secondary"
                        >
                          Description
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 text-center font-semibold text-grey-primary"
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody class="bg-white divide-y border-grey-secondary">
                      <tr
                        v-for="subPLO in selectedPLO.sub_program_learning_outcomes"
                        :key="subPLO.id"
                      >
                        <td
                          class="px-6 py-4 whitespace-nowrap text-sm font-medium border-r border-grey-secondary"
                        >
                          {{ subPLO.code }}
                        </td>
                        <td class="px-6 py-4 border-r border-grey-secondary">
                          <div class="w-full flex flex-col gap-2">
                            <div>
                              {{ subPLO.description_thai }}
                            </div>
                            <div>{{ subPLO.description_eng }}</div>
                          </div>
                        </td>
                        <td
                          class="px-6 py-4 whitespace-nowrap text-sm font-medium"
                        >
                          <div
                            class="flex flex-col gap-2 items-center justify-center"
                          >
                            <!-- <button
                              class="flex items-center justify-center bg-white rounded-xl p-2 border border-grey-secondary hover:bg-black-primary text-black-primary hover:text-white"
                            >
                              <Edit class="w-5 h-5" />
                            </button> -->
                            <button
                              class="flex items-center justify-center bg-white rounded-xl p-2 border border-grey-secondary hover:bg-red-500 text-black-primary hover:text-white"
                              @click="deleteSubPLO(subPLO)"
                            >
                              <Delete class="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                      <tr
                        v-if="!selectedPLO.sub_program_learning_outcomes.length"
                      >
                        <td
                          colspan="3"
                          class="px-6 py-4 whitespace-nowrap text-sm font-medium border-r border-grey-secondary text-center"
                        >
                          No Data
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div
              class="col-span-1 h-full border-r max-h-[calc(100vh-342px)] overflow-y-scroll scrollbar-set"
            >
              <!-- <div
                class="w-full flex flex-col gap-2 py-3 border-b border-grey-secondary"
              >
                <div class="flex flex-row gap-4 px-4">
                  <div class="font-semibold text-black-primary w-full">
                    Expected Weighted Passing CLO rate
                  </div>
                  <div>
                    {{ selectedPLO.detail.expectedWeightPassingCLORate }}%
                  </div>
                </div>
                <div class="flex flex-row gap-4 px-4">
                  <div class="font-semibold text-black-primary w-full">
                    Expected Overall Passing Rate
                  </div>
                  <div>
                    {{ selectedPLO.detail.expectedWeightPassingCLORate }}%
                  </div>
                </div>
                <div class="flex flex-row gap-4 px-4">
                  <div class="font-semibold text-black-primary w-full">
                    Expected Weighted Passing CLO rate
                  </div>
                  <div>
                    {{ selectedPLO.detail.expectedWeightPassingCLORate }}%
                  </div>
                </div>
              </div> -->
              <div class="w-full flex flex-col gap-2 pt-2">
                <div
                  class="font-semibold text-grey-primary px-4 w-full text-center border-b border-grey-secondary pb-2"
                >
                  Involved Courses
                </div>
                <div class="flex flex-row gap-4 px-4 mt-2 items-center">
                  <div class="font-semibold text-black-primary w-full">
                    Expected Course PLO passing rate (%)
                  </div>
                  <div>
                    <div
                      v-if="!editMode"
                      class="flex items-center justify-center w-16 border p-1 rounded-lg border-grey-tertiary"
                    >
                      {{ selectedPLO.expected_course_passing_percentage }}
                    </div>
                    <div v-if="editMode">
                      <input
                        type="number"
                        class="bg-transparent text-center focus:ring-0 outline-none text-base w-16 border p-1 rounded-lg border-grey-primary"
                        v-model="selectedPLO.expected_course_passing_percentage"
                      />
                    </div>
                  </div>
                </div>
                <div class="flex flex-row gap-4 px-4 mt-2 justify-between">
                  <div class="flex"></div>
                  <SmallEditButton
                    v-if="!editMode"
                    @click="editPLO"
                    class="flex items-center flex-row justify-center border border-grey-secondary rounded-xl px-3 py-2 gap-2"
                  >
                    <span class="text-black-primary font-semibold text-base"
                      >Edit</span
                    >
                  </SmallEditButton>
                  <SmallSaveButton
                    v-if="editMode"
                    @click="savePLO"
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
                        PLO Passing Rate
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y border-grey-secondary">
                    <tr
                      v-for="course in selectedPLO?.involvedCourses"
                      :key="course.id"
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
                              course.plo_passing_percentage >=
                              selectedPLO.expected_course_passing_percentage
                                ? 'bg-green-500'
                                : 'bg-red-500',
                            ]"
                            class="py-1 px-3 rounded-full text-white"
                          >
                            {{ course.plo_passing_percentage }}%
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
  <AddPLO
    v-if="showAddPLOPopup"
    :id="id"
    :name="name"
    :PLOs="PLO"
    @close="showAddPLOPopup = false"
  />
  <AddSubPLO
    v-if="showAddSubPLOPopup"
    :id="id"
    :name="name"
    :ploId="selectedPLO.id"
    :subPLOs="selectedPLO.sub_program_learning_outcomes"
    @close="showAddSubPLOPopup = false"
  />
</template>

<script setup>
import TemplateButton from "@/components/button/TemplateButton.vue";
import Import from "@/components/button/ImportButton.vue";
import ExportButton from "@/components/button/ExportButton.vue";
import SmallAddButton from "@/components/button/SmallAddButton.vue";
import SmallEditButton from "@/components/button/SmallEditButton.vue";
import SmallSaveButton from "@/components/button/SmallSaveButton.vue";
import AddPLO from "@/components/popups/AddPLO.vue";
import AddSubPLO from "@/components/popups/AddSubPLO.vue";
import Search from "@/components/icons/Search.vue";
import Delete from "@/components/icons/Delete.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { fetchPLOs, BaseURL } from "~/api/api";

const router = useRouter();
const id = ref("");
const name = ref("");

const showAddPLOPopup = ref(false);
const showAddSubPLOPopup = ref(false);
const addPLO = () => {
  showAddPLOPopup.value = true;
};

const addSubPLO = () => {
  showAddSubPLOPopup.value = true;
};

const searchQuery = ref("");
const editMode = ref(false);
const editPLO = () => {
  editMode.value = true;
};

const savePLO = async () => {
  try {
    console.log(selectedPLO);
    const response = await fetch(`${BaseURL}plos/${selectedPLO.value.id}`, {
      credentials: "include",
      method: "PATCH",
      body: JSON.stringify(selectedPLO.value),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) throw new Error("Failed to update PLO");
  } catch (error) {
    console.error(error);
  }
  editMode.value = false;
};
const PLO = ref([
  {
    name: "PLO 1",
    detail: {
      desc_en:
        "Able to apply principles and knowledge of science, mathematics, and engineering to analyze and design solutions for computer engineering problems.",
      desc_th:
        "สามารถใช้หลักการและความรู้ทางวิทยาศาสตร์ คณิตศาสตร์ และวิศวกรรมศาสตร์ ในการวิเคราะห์และออกแบบเพื่อแก้ปัญหาทางวิศวกรรมคอมพิวเตอร์ได้",
      subPLO: [
        {
          code: "PLO 1.1",
          desc: "Apply knowledge of mathematics, science, and engineering to computer engineering problems.",
          desc_th:
            "ใช้ความรู้ด้านคณิตศาสตร์ วิทยาศาสตร์ และวิศวกรรมศาสตร์ในการแก้ปัญหาทางวิศวกรรมคอมพิวเตอร์",
        },
        {
          code: "PLO 1.2",
          desc: "Apply knowledge of mathematics, science, and engineering to computer engineering problems.",
          desc_th:
            "ใช้ความรู้ด้านคณิตศาสตร์ วิทยาศาสตร์ และวิศวกรรมศาสตร์ในการแก้ปัญหาทางวิศวกรรมคอมพิวเตอร์",
        },
      ],
      expectedCoursePLOPassingRate: 50,
      involvedCourses: [
        {
          code: "CPE231",
          name: "Computer Engineering Project",
          semester: "1/2021",
          coursePLOPassingRate: 50,
        },
        {
          code: "CPE232",
          name: "Algorithms",
          semester: "1/2021",
          coursePLOPassingRate: 50,
        },
        {
          code: "CPE233",
          name: "Computer Engineering",
          semester: "1/2021",
          coursePLOPassingRate: 50,
        },
      ],
    },
  },
  {
    name: "PLO 2",
    detail: {},
  },
]);

const selectedPLO = ref({
  id: "",
  code: "",
  description_thai: "",
  description_eng: "",
  program_id: "",
  sub_program_learning_outcomes: [],
});

function selectPLO(plo) {
  selectedPLO.value = plo;
}

const deletePLO = async (plo) => {
  console.log(PLO);
  try {
    const response = await fetch(`${BaseURL}plos/${plo.id}`, {
      credentials: "include",
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) throw new Error("Failed to delete PLO");
    PLO.value = PLO.value.filter((p) => {
      return p.id != plo.id;
    });
  } catch (error) {
    console.error(error);
  }
};

const deleteSubPLO = async (SubPLO) => {
  console.log(SubPLO);
  try {
    const response = await fetch(`${BaseURL}splos/${SubPLO.id}`, {
      credentials: "include",
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) throw new Error("Failed to delete SPLO");
    selectedPLO.value.sub_program_learning_outcomes =
      selectedPLO.value.sub_program_learning_outcomes.filter((splo) => {
        return splo.id != SubPLO.id;
      });
  } catch (error) {
    console.error(error);
  }
};

onMounted(async () => {
  id.value = router.currentRoute.value.params.id;
  name.value = router.currentRoute.value.query.name;

  await fetchPLOs(PLO, id.value);
  console.log(PLO.value);
  selectPLO(PLO.value[0]);
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

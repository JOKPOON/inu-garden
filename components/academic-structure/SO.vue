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
              v-for="so in SO"
              :key="so.id"
              @click="selectSO(so)"
              :class="{
                'bg-grey-secondary text-black-primary':
                  selectedSO.code === so.code,
                'bg-white': selectedSO.code !== so.code,
              }"
              class="w-full flex items-center justify-center py-3 border-b border-grey-secondary"
            >
              {{ so.code }}
            </button>
          </div>
          <div class="w-full mt-4 flex items-center justify-center">
            <SmallAddButton
              @click="addSO"
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
            Detail of {{ selectedSO.code }}
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
                <div v-if="selectedSO" class="px-4">
                  {{ selectedSO.description_thai }}
                </div>
                <div v-if="selectedSO" class="px-4">
                  {{ selectedSO.description_eng }}
                </div>
              </div>
              <div class="w-full flex flex-col gap-2 pt-3">
                <div class="font-semibold text-black-primary px-4">Sub SO</div>
                <div
                  class="flex flex-row justify-between gap-6 items-center w-full px-4"
                >
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
                  <div class="flex flex-row gap-4">
                    <SmallAddButton
                      @click="addSubSO"
                      class="flex items-center flex-row justify-center border border-grey-secondary rounded-xl px-3 py-2 gap-2"
                    >
                      <span class="text-black-primary font-semibold text-base"
                        >Add</span
                      >
                    </SmallAddButton>
                  </div>
                </div>
                <div v-if="selectedSO && selectedSO.sub_student_outcomes">
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
                        v-for="subSO in selectedSO.sub_student_outcomes"
                        :key="subSO.id"
                      >
                        <td
                          class="px-6 py-4 whitespace-nowrap text-sm font-medium border-r border-grey-secondary"
                        >
                          {{ subSO.code }}
                        </td>
                        <td class="px-6 py-4 border-r border-grey-secondary">
                          <div class="w-full flex flex-col gap-2">
                            <div>
                              {{ subSO.description_thai }}
                            </div>
                            <div>{{ subSO.description_eng }}</div>
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
                              @click="deleteSubSO(subSO)"
                            >
                              <Delete class="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                      <tr v-if="!selectedSO.sub_student_outcomes.length">
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
                    {{ selectedSO.detail.expectedWeightPassingCLORate }}%
                  </div>
                </div>
                <div class="flex flex-row gap-4 px-4">
                  <div class="font-semibold text-black-primary w-full">
                    Expected Overall Passing Rate
                  </div>
                  <div>
                    {{ selectedSO.detail.expectedWeightPassingCLORate }}%
                  </div>
                </div>
                <div class="flex flex-row gap-4 px-4">
                  <div class="font-semibold text-black-primary w-full">
                    Expected Weighted Passing CLO rate
                  </div>
                  <div>
                    {{ selectedSO.detail.expectedWeightPassingCLORate }}%
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
                    Expected Course SO passing rate (%)
                  </div>
                  <div>
                    <div
                      v-if="!editMode"
                      class="flex items-center justify-center w-16 border p-1 rounded-lg border-grey-tertiary"
                    >
                      {{ selectedSO.expected_course_passing_percentage }}
                    </div>
                    <div v-if="editMode">
                      <input
                        type="number"
                        class="bg-transparent text-center focus:ring-0 outline-none text-base w-16 border p-1 rounded-lg border-grey-primary"
                        v-model="selectedSO.expected_course_passing_percentage"
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
                    @click="editSO"
                    class="flex items-center flex-row justify-center border border-grey-secondary rounded-xl px-3 py-2 gap-2"
                  >
                    <span class="text-black-primary font-semibold text-base"
                      >Edit</span
                    >
                  </SmallEditButton>
                  <SmallSaveButton
                    v-if="editMode"
                    @click="saveSO"
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
                        SO Passing Rate
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y border-grey-secondary">
                    <tr
                      v-for="course in selectedSO.involvedCourses"
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
                              course.courseSOPassingRate >=
                              selectedSO.expected_course_passing_percentage
                                ? 'bg-green-500'
                                : 'bg-red-500',
                            ]"
                            class="py-1 px-3 rounded-full text-white"
                          >
                            {{ course.courseSOPassingRate }}%
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
  <AddSO
    v-if="showAddSOPopup"
    :id="id"
    :name="SOName"
    :SOs="SO"
    @close="showAddSOPopup = false"
  />
  <AddSubSO
    v-if="showAddSubSOPopup"
    :id="id"
    :So="SOid"
    :name="SOName"
    :soId="selectedSO.id"
    :subSOs="selectedSO.sub_student_outcomes"
    @close="showAddSubSOPopup = false"
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
import AddSO from "@/components/popups/AddSO.vue";
import AddSubSO from "@/components/popups/AddSubSO.vue";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { fetchSOs, BaseURL } from "~/api/api";

const router = useRouter();

const searchQuery = ref("");
const editMode = ref(false);
const editSO = () => {
  editMode.value = true;
};

const saveSO = async () => {
  try {
    console.log(selectedSO);
    const response = await fetch(`${BaseURL}sos/${selectedSO.value.id}`, {
      credentials: "include",
      method: "PATCH",
      body: JSON.stringify(selectedSO.value),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) throw new Error("Failed to update SO");
  } catch (error) {
    console.error(error);
  }
  editMode.value = false;
};

const deleteSubSO = async (SubSO) => {
  console.log(SubSO);
  try {
    const response = await fetch(`${BaseURL}ssos/${SubSO.id}`, {
      credentials: "include",
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) throw new Error("Failed to delete SSO");
    selectedSO.value.sub_student_outcomes =
      selectedSO.value.sub_student_outcomes.filter((sso) => {
        return sso.id != SubSO.id;
      });
  } catch (error) {
    console.error(error);
  }
};

const showAddSOPopup = ref(false);
const showAddSubSOPopup = ref(false);
const SOName = ref("");
const id = ref("");
const SOid = ref("");

const addSO = () => {
  id.value = router.currentRoute.value.params.id;
  SOName.value = "Computer Engineering (Regular) year 2565";
  showAddSOPopup.value = true;
};

const addSubSO = () => {
  id.value = router.currentRoute.value.params.id;
  SOid.value = "SO1";
  SOName.value = "Computer Engineering (Regular) year 2565";
  showAddSubSOPopup.value = true;
};

const SO = ref([
  {
    name: "SO 1",
    detail: {
      desc: "Able to apply principles and knowledge of science, mathematics, and engineering to analyze and design solutions for computer engineering problems.",
      desc_th:
        "สามารถใช้หลักการและความรู้ทางวิทยาศาสตร์ คณิตศาสตร์ และวิศวกรรมศาสตร์ ในการวิเคราะห์และออกแบบเพื่อแก้ปัญหาทางวิศวกรรมคอมพิวเตอร์ได้",
      subSO: [
        {
          code: "SO 1.1",
          desc: "Apply knowledge of mathematics, science, and engineering to computer engineering problems.",
          desc_th:
            "ใช้ความรู้ด้านคณิตศาสตร์ วิทยาศาสตร์ และวิศวกรรมศาสตร์ในการแก้ปัญหาทางวิศวกรรมคอมพิวเตอร์",
        },
        {
          code: "SO 1.2",
          desc: "Apply knowledge of mathematics, science, and engineering to computer engineering problems.",
          desc_th:
            "ใช้ความรู้ด้านคณิตศาสตร์ วิทยาศาสตร์ และวิศวกรรมศาสตร์ในการแก้ปัญหาทางวิศวกรรมคอมพิวเตอร์",
        },
      ],
      expectedWeightPassingCLORate: 50,
      expectOverallRate: 50,
      overallPassingRate: 50,
      expectedCourseSOPassingRate: 50,
      involvedCourses: [
        {
          code: "CPE231",
          name: "Computer Engineering Project",
          semester: "1/2021",
          courseSOPassingRate: 50,
        },
        {
          code: "CPE232",
          name: "Algorithms",
          semester: "1/2021",
          courseSOPassingRate: 50,
        },
        {
          code: "CPE233",
          name: "Computer Engineering",
          semester: "1/2021",
          courseSOPassingRate: 50,
        },
      ],
    },
  },
  {
    name: "SO 2",
    detail: {},
  },
]);

const selectedSO = ref({
  id: "",
  code: "",
  description_thai: "",
  description_eng: "",
  expected_course_passing_percentage: "",
  program_id: "",
  sub_student_outcomes: [],
});

function selectSO(so) {
  selectedSO.value = so;
}

onMounted(async () => {
  id.value = router.currentRoute.value.params.id;
  await fetchSOs(SO, id.value);
  console.log(SO.value);
  selectSO(SO.value[0]);
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

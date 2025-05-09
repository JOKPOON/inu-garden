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
              v-for="po in PO"
              :key="po.id"
              @click="selectPO(po)"
              :class="{
                'bg-grey-secondary text-black-primary': selectedPO.id === po.id,
                'bg-white': selectedPO.id !== po.id,
              }"
              class="w-full flex items-center justify-center py-3 border-b border-grey-secondary"
            >
              <div class="w-full flex items-center justify-evenly gap-2">
                <span class="text-black-primary">
                  {{ po.code }}
                </span>
                <button
                  v-if="editMode"
                  class="bg-white rounded-xl p-2 border border-grey-secondary hover:bg-red-500 text-black-primary hover:text-white"
                  @click="deletePO(po)"
                >
                  <Delete class="w-4 h-4" />
                </button>
              </div>
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
            Detail of {{ selectedPO?.code }}
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
                <div v-if="selectedPO" class="px-4">
                  {{ selectedPO.description }}
                </div>
                <div class="font-semibold text-black-primary px-4">
                  Category
                </div>
                <div v-if="selectedPO" class="px-4">
                  {{ selectedPO.category }}
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
              </div> -->
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
                    <div
                      v-if="!editMode"
                      class="flex items-center justify-center w-16 border p-1 rounded-lg border-grey-tertiary"
                    >
                      {{ selectedPO?.expected_course_passing_percentage }}
                    </div>
                    <div v-if="editMode">
                      <input
                        type="number"
                        class="bg-transparent text-center focus:ring-0 outline-none text-base w-16 border p-1 rounded-lg border-grey-primary"
                        v-model="selectedPO.expected_course_passing_percentage"
                      />
                    </div>
                  </div>
                </div>
                <div class="flex flex-row gap-4 px-4 mt-2 justify-between">
                  <div class="flex"></div>
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
                      v-for="course in selectedPO?.involvedCourses"
                      :key="course?.code"
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
                              selectedPO.expected_course_passing_percentage
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
    :name="name"
    :POs="PO"
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
import { fetchPOs, BaseURL } from "~/api/api";
import { useRouter } from "vue-router";

const router = useRouter();
const searchQuery = ref("");
const editMode = ref(false);
const editPO = () => {
  editMode.value = true;
};

const showAddPOPopup = ref(false);
const name = ref("");
const id = ref("");

const showAddPO = () => {
  showAddPOPopup.value = true;
};

const PO = ref([]);

const selectedPO = ref({});

function selectPO(po) {
  selectedPO.value = po;
}

const savePO = async () => {
  try {
    console.log(selectedPO);
    const response = await fetch(`${BaseURL}pos/${selectedPO.value.id}`, {
      credentials: "include",
      method: "PATCH",
      body: JSON.stringify(selectedPO.value),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) throw new Error("Failed to update PO");
  } catch (error) {
    console.error(error);
  }
  editMode.value = false;
};

const deletePO = async (po) => {
  try {
    const response = await fetch(`${BaseURL}pos/${po.id}`, {
      credentials: "include",
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) throw new Error("Failed to delete PO");
    PO.value = PO.value.filter((item) => item.id !== po.id);
  } catch (error) {
    console.error(error);
  }
};

onMounted(async () => {
  id.value = router.currentRoute.value.params.id;
  name.value = router.currentRoute.value.query.name;

  await fetchPOs(PO, id.value);
  selectPO(PO.value[0] || {});
  console.log(PO.value);
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

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
      class="flex h-[calc(100vh-310px)] border border-grey-secondary rounded-xl"
    >
      <div class="grid grid-cols-9 w-full h-full text-sm">
        <div class="col-span-1 h-full border-r">
          <div
            class="w-full flex items-center justify-center py-3 border-b border-grey-secondary font-semibold text-grey-primary"
          >
            Code
          </div>
          <div
            class="max-h-[calc(100vh-360px)] overflow-y-scroll scrollbar-set"
          >
            <button
              v-for="clo in CLO"
              :key="clo.name"
              :class="{
                'bg-grey-secondary text-black-primary': selectedCLO === clo,
                'bg-white': selectedCLO !== clo,
              }"
              @click="selectCLO(clo)"
              class="w-full flex items-center justify-center py-3 border-b border-grey-secondary"
            >
              {{ clo.name }}
            </button>
          </div>
          <div class="w-full mt-4 flex items-center justify-center">
            <SmallAddButton
              @click="addCLO"
              class="flex items-center flex-row justify-center border border-grey-secondary rounded-xl px-3 py-2 gap-2"
            >
              <span class="text-black-primary font-semibold text-base"
                >Add</span
              >
            </SmallAddButton>
          </div>
        </div>
        <div class="col-span-1 h-full border-r">
          <div
            class="w-full flex items-center justify-center py-3 border-b border-grey-secondary font-semibold text-grey-primary"
          >
            CLO Type
          </div>
          <div
            class="max-h-[calc(100vh-360px)] overflow-y-scroll scrollbar-set"
          >
            <div
              class="w-full flex items-center justify-center p-3 border-b border-grey-secondary"
            >
              <div
                :class="{
                  'bg-green-500': selectedCLO.type === 0,
                  'bg-yellow-500': selectedCLO.type === 1,
                }"
                class="p-2 rounded-xl text-white"
              >
                <span v-if="selectedCLO.type === 0">Curriculum</span>
                <span v-else>Modified</span>
              </div>
            </div>
          </div>
        </div>
        <div class="col-span-7 h-full flex flex-col">
          <div
            class="w-full flex items-center justify-center py-3 border-b border-grey-secondary font-semibold text-grey-primary"
          >
            Detail of {{ selectedCLO.name }}
          </div>

          <div class="grid grid-cols-2 w-full h-full">
            <div
              class="col-span-1 h-full border-r max-h-[calc(100vh-360px)] overflow-y-scroll scrollbar-set"
            >
              <div
                class="w-full flex flex-col gap-2 py-3 border-b border-grey-secondary"
              >
                <div class="font-semibold text-black-primary px-4">
                  Description
                </div>
                <div v-if="selectedCLO.detail" class="px-4">
                  {{ selectedCLO.detail.desc_th }}
                </div>
                <div v-if="selectedCLO.detail" class="px-4">
                  {{ selectedCLO.detail.desc }}
                </div>
              </div>
              <div
                class="w-full flex flex-col gap-2 py-3 border-b border-grey-secondary"
              >
                <div class="flex flex-row gap-4 px-4">
                  <div class="font-semibold text-black-primary w-full">
                    Expected Passing Assessment
                  </div>
                  <div>
                    {{ selectedCLO.detail.expectedWeightPassingCLORate }}%
                  </div>
                </div>
                <div class="flex flex-row gap-4 px-4">
                  <div class="font-semibold text-black-primary w-full">
                    Expected Passing Student
                  </div>
                  <div>
                    {{ selectedCLO.detail.expectedWeightPassingCLORate }}%
                  </div>
                </div>
              </div>
            </div>
            <div class="col-span-1 h-full border-r py-3">
              <div class="flex flex-row gap-4 px-4">
                <div class="border border-grey-secondary rounded-xl mb-4 flex">
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
              </div>
              <div
                class="grid grid-cols-4 gap-4 border-y py-1 border-grey-tertiary px-4"
              >
                <div
                  class="col-span-1 text-sm w-full text-grey-primary font-medium "
                >
                  Code
                </div>
                <div
                  class="col-span-3 text-sm w-full text-grey-primary font-medium"
                >
                   Description
                </div>
              </div>
              <div
                class="max-h-[calc(100vh-455px)] overflow-y-scroll scrollbar-set"
              >
                <div v-if="activeButton === 'PLO'">
                  <div
                    class="w-full flex flex-col gap-2 border-b border-grey-secondary"
                  >
                    <div v-if="selectedCLO.detail && selectedCLO.detail.PLO">
                      <div
                        v-for="(plo, key) in selectedCLO.detail.PLO"
                        :key="key"
                      >
                        <div
                          class="grid grid-cols-4 gap-4 border-b border-grey-tertiary px-4 py-3"
                        >
                          <div class="col-span-1 text-sm w-full font-medium ">
                            {{ key }}
                          </div>
                          <div class="col-span-3 text-sm w-full">
                            <div class="flex flex-col gap-3">
                              <div>{{ plo.desc_th }}</div>
                              <div>{{ plo.desc }}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-else-if="activeButton === 'PO'">
                  <div
                    class="w-full flex flex-col gap-2 border-b border-grey-secondary"
                  >
                    <div v-if="selectedCLO.detail && selectedCLO.detail.PO">
                      <div
                        v-for="(po, key) in selectedCLO.detail.PO"
                        :key="key"
                      >
                        <div
                          class="grid grid-cols-4 gap-4 border-b border-grey-tertiary px-4 py-3"
                        >
                          <div class="col-span-1 text-sm w-full font-medium">
                            {{ key }}
                          </div>
                          <div class="col-span-3 text-sm w-full">
                            <div class="flex flex-col gap-3">
                              <div>{{ po.desc_th }}</div>
                              <div>{{ po.desc }}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  </div>
                <div v-else-if="activeButton === 'SO'">
                  <div
                    class="w-full flex flex-col gap-2 border-b border-grey-secondary"
                  >
                    <div v-if="selectedCLO.detail && selectedCLO.detail.SO">
                      <div
                        v-for="(so, key) in selectedCLO.detail.SO"
                        :key="key"
                      >
                        <div
                          class="grid grid-cols-4 gap-4 border-b border-grey-tertiary px-4 py-3"
                        >
                          <div class="col-span-1 text-sm w-full font-medium">
                            {{ key }}
                          </div>
                          <div class="col-span-3 text-sm w-full">
                            <div class="flex flex-col gap-3">
                              <div>{{ so.desc_th }}</div>
                              <div>{{ so.desc }}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <AddCLO
    v-if="showAddCLOPopup"
    :id="id"
    :name="name"
    @close="showAddCLOPopup = false"
  />
</template>

<script setup>
import TemplateButton from "@/components/button/TemplateButton.vue";
import Import from "@/components/button/ImportButton.vue";
import ExportButton from "@/components/button/ExportButton.vue";
import SmallAddButton from "@/components/button/SmallAddButton.vue";
import SmallEditButton from "@/components/button/SmallEditButton.vue";
import SmallSaveButton from "@/components/button/SmallSaveButton.vue";
import AddCLO from "@/components/popups/AddCLO.vue";
import Search from "@/components/icons/Search.vue";
import Edit from "@/components/icons/Edit.vue";
import Delete from "@/components/icons/Delete.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const id = ref("");
const name = ref("");

const buttons = ["PLO", "PO", "SO"];
const activeButton = ref("PLO");

const setActionButton = (button) => {
  activeButton.value = button;
};

const showAddCLOPopup = ref(false);
const addCLO = () => {
  id.value = router.currentRoute.value.params.id;
  name.value = "Computer Engineering (Regular) year 2565";
  showAddCLOPopup.value = true;
};

const searchQuery = ref("");

const CLO = ref([
  {
    name: "CLO 1",
    type: 0,
    detail: {
      desc: "Able to apply principles and knowledge of science, mathematics, and engineering to analyze and design solutions for computer engineering problems.",
      desc_th:
        "สามารถใช้หลักการและความรู้ทางวิทยาศาสตร์ คณิตศาสตร์ และวิศวกรรมศาสตร์ ในการวิเคราะห์และออกแบบเพื่อแก้ปัญหาทางวิศวกรรมคอมพิวเตอร์ได้",
      expectedWeightPassingCLORate: 70,
      expectedWeightPassingStudentRate: 70,
      PLO: {
        PLO1: {
          desc: "Able to apply principles and knowledge of science, mathematics, and engineering to analyze and design solutions for computer engineering problems.",
          desc_th:
            "สามารถใช้หลักการและความรู้ทางวิทยาศาสตร์ คณิตศาสตร์ และวิศวกรรมศาสตร์ ในการวิเคราะห์และออกแบบเพื่อแก้ปัญหาทางวิศวกรรมคอมพิวเตอร์ได้",
        },
        PLO2: {
          desc: "Able to apply principles and knowledge of science, mathematics, and engineering to analyze and design solutions for computer engineering problems.",
          desc_th:
            "สามารถใช้หลักการและความรู้ทางวิทยาศาสตร์ คณิตศาสตร์ และวิศวกรรมศาสตร์ ในการวิเคราะห์และออกแบบเพื่อแก้ปัญหาทางวิศวกรรมคอมพิวเตอร์ได้",
        },
        PLO3: {
          desc: "Able to apply principles and knowledge of science, mathematics, and engineering to analyze and design solutions for computer engineering problems.",
          desc_th:
            "สามารถใช้หลักการและความรู้ทางวิทยาศาสตร์ คณิตศาสตร์ และวิศวกรรมศาสตร์ ในการวิเคราะห์และออกแบบเพื่อแก้ปัญหาทางวิศวกรรมคอมพิวเตอร์ได้",
        },
      },
      PO: {
        PO1: {
          desc: "Able to apply principles and knowledge of science, mathematics, and engineering to analyze and design solutions for computer engineering problems.",
          desc_th:
            "สามารถใช้หลักการและความรู้ทางวิทยาศาสตร์ คณิตศาสตร์ และวิศวกรรมศาสตร์ ในการวิเคราะห์และออกแบบเพื่อแก้ปัญหาทางวิศวกรรมคอมพิวเตอร์ได้",
        },
        PO2: {
          desc: "Able to apply principles and knowledge of science, mathematics, and engineering to analyze and design solutions for computer engineering problems.",
          desc_th:
            "สามารถใช้หลักการและความรู้ทางวิทยาศาสตร์ คณิตศาสตร์ และวิศวกรรมศาสตร์ ในการวิเคราะห์และออกแบบเพื่อแก้ปัญหาทางวิศวกรรมคอมพิวเตอร์ได้",
        },
        PO3: {
          desc: "Able to apply principles and knowledge of science, mathematics, and engineering to analyze and design solutions for computer engineering problems.",
          desc_th:
            "สามารถใช้หลักการและความรู้ทางวิทยาศาสตร์ คณิตศาสตร์ และวิศวกรรมศาสตร์ ในการวิเคราะห์และออกแบบเพื่อแก้ปัญหาทางวิศวกรรมคอมพิวเตอร์ได้",
        },
      },
      SO: {
        SO1: {
          desc: "Able to apply principles and knowledge of science, mathematics, and engineering to analyze and design solutions for computer engineering problems.",
          desc_th:
            "สามารถใช้หลักการและความรู้ทางวิทยาศาสตร์ คณิตศาสตร์ และวิศวกรรมศาสตร์ ในการวิเคราะห์และออกแบบเพื่อแก้ปัญหาทางวิศวกรรมคอมพิวเตอร์ได้",
        },
        SO2: {
          desc: "Able to apply principles and knowledge of science, mathematics, and engineering to analyze and design solutions for computer engineering problems.",
          desc_th:
            "สามารถใช้หลักการและความรู้ทางวิทยาศาสตร์ คณิตศาสตร์ และวิศวกรรมศาสตร์ ในการวิเคราะห์และออกแบบเพื่อแก้ปัญหาทางวิศวกรรมคอมพิวเตอร์ได้",
        },
        SO3: {
          desc: "Able to apply principles and knowledge of science, mathematics, and engineering to analyze and design solutions for computer engineering problems.",
          desc_th:
            "สามารถใช้หลักการและความรู้ทางวิทยาศาสตร์ คณิตศาสตร์ และวิศวกรรมศาสตร์ ในการวิเคราะห์และออกแบบเพื่อแก้ปัญหาทางวิศวกรรมคอมพิวเตอร์ได้",
        },
      },
    },
  },
  {
    name: "CLO 2",
    type: 1,
    detail: {},
  },
]);

const selectedCLO = ref(CLO.value[0]);

function selectCLO(clo) {
  selectedCLO.value = clo;
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

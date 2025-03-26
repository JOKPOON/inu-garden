<template>
  <teleport to="body">
    <div
      v-if="!showAddSubCLOPopup"
      class="w-full h-full fixed inset-0 flex items-center justify-center bg-black-primary bg-opacity-50 z-50"
    >
      <div
        class="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center border border-grey-secondary"
      >
        <div class="flex flex-col w-[36rem]">
          <div class="text-2xl font-semibold text-black-primary">Add CLO</div>
          <div class="text-sm text-grey-primary mt-1">
            Add CLO for
            <span class="font-semibold text-black-primary">{{ name }}</span>
          </div>
        </div>
        <div
          class="border-t border-grey-secondary  w-[36rem] my-4"
        ></div>
        <div class="max-h-[60vh] overflow-y-scroll scrollbar-set mb-4 text-sm">
          <div class="mb-4 text-center flex gap-4 flex-col text-sm">
            <div class="flex flex-col items-start w-full gap-2">
              <label class="font-semibold text-black-primary">CLO Code</label>
              <input
                v-model="newCLO.code"
                type="text"
                placeholder="CLO Code"
                class="w-[36rem] px-4 py-2 border border-grey-secondary rounded-xl outline-none"
              />
            </div>
            <div class="flex flex-col items-start w-full gap-2">
              <label class="font-semibold text-black-primary">Description (Eng)</label>
              <textarea
                v-model="newCLO.desc"
                rows="3"
                placeholder="CLO Description"
                class="w-[36rem] px-4 py-2 border border-grey-secondary rounded-xl outline-none"
              ></textarea>
            </div>
            <div class="flex flex-col items-start w-full gap-2">
              <label class="font-semibold text-black-primary">Description (TH)</label>
              <textarea
                v-model="newCLO.desc_th"
                rows="3"
                placeholder="CLO Description (TH)"
                class="w-[36rem] px-4 py-2 border border-grey-secondary rounded-xl outline-none"
              ></textarea>
            </div>
            <div class="flex flex-col items-start w-full gap-2">
              <label class="font-semibold text-black-primary">Type</label>
              <div
                class="bg-transparent border border-grey-secondary rounded-xl text-base p-3 hover:cursor-pointer w-full"
              >
                <select
                  v-model="newCLO.type"
                  placeholder="Select Type"
                  class="w-full border-none outline-none hover:cursor-pointer"
                >
                  <option value="">Select Type</option>
                  <option value="From Curriculum">From Curriculum</option>
                  <option value="Custom">Custom</option>
                </select>
              </div>
            </div>
            <div class="flex flex-row gap-4 items-center w-[36rem]">
              <div class="font-semibold text-black-primary w-full text-start">
                Expected Passing Assessment (%)
              </div>
              <div>
                <input
                  type="text"
                  placeholder="%"
                  class="bg-transparent text-center focus:ring-0 outline-none text-base w-16 border p-1 rounded-lg border-grey-primary"
                  v-model="newCLO.expectedPassingAssessment"
                />
              </div>
            </div>
            <div class="flex flex-row gap-4 items-center w-[36rem]">
              <div class="font-semibold text-black-primary w-full text-start">
                Expected Passing Student (%)
              </div>
              <div>
                <input
                  type="text"
                  placeholder="%"
                  class="bg-transparent text-center focus:ring-0 outline-none text-base w-16 border p-1 rounded-lg border-grey-primary"
                  v-model="newCLO.expectedPassingStudent"
                />
              </div>
            </div>
          </div>
          <div class="h-[1px] w-full bg-grey-secondary"></div>
          <div class="w-[36rem] flex flex-col gap-2 pt-2">
            <div class="flex flex-row items-center justify-between">
              <div class="flex flex-row gap-4">
                <div class="border border-grey-secondary rounded-xl flex">
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
              <SmallAddButton
                @click="addSubCLO(activeButton)"
                class="flex items-center flex-row justify-center border border-grey-secondary rounded-xl px-3 py-2 gap-2"
              >
                <span class="text-black-primary font-semibold text-base"
                  >Add</span
                >
              </SmallAddButton>
            </div>
            <div class="h-[1px] w-full bg-grey-secondary"></div>
            <div class="max-h-[250px] overflow-y-scroll scrollbar-set">
              <table
                class="min-w-full divide-y border border-grey-secondary rounded-xl"
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
                  <tr v-for="(detail, key) in selectedDetails" :key="key">
                    <td
                      class="px-6 py-3 text-center border-r border-grey-secondary"
                    >
                      {{ key }}
                    </td>
                    <td class="px-6 py-3 border-r border-grey-secondary">
                      <div class="mb-2">{{ detail.desc_th }}</div>
                      {{ detail.desc }}
                    </td>
                    <td class="px-6 py-3 text-center">
                      <button
                        class="flex items-center justify-center bg-white rounded-xl p-2 border border-grey-secondary hover:bg-red-500 text-black-primary hover:text-white"
                        @click="removeDetail(key)"
                      >
                        <Delete class="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="flex flex-row items-center justify-center gap-4 w-full">
          <button
            @click="addCLO"
            class="py-2 font-medium border border-grey-secondary text-black-primary rounded-xl w-full bg-yellow-primary hover:bg-black-primary hover:text-white"
          >
            Add
          </button>
          <button
            @click="$emit('close')"
            class="py-2 font-medium border border-grey-secondary text-black-primary rounded-xl w-full hover:bg-black-primary hover:text-white"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { ref, computed } from "vue";
import { defineProps, defineEmits } from "vue";
import { useRouter } from "vue-router";
import Delete from "@/components/icons/Delete.vue";
import SmallAddButton from "@/components/button/SmallAddButton.vue";
import AddPLO from "@/components/popups/AddPLO.vue";

const router = useRouter();

const showAddSubCLOPopup = ref(false);

const addSubCLO = (path) => {
  if (path === "PLO") {
    // Add PLO logic
  } else if (path === "PO") {
    // Add PO logic
  } else if (path === "SO") {
    // Add SO logic
  }
};

const buttons = ["PLO", "PO", "SO"];
const activeButton = ref("PLO");

const setActionButton = (button) => {
  activeButton.value = button;
};

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["close", "add"]);

const newCLO = ref({
  code: "",
  desc: "",
  desc_th: "",
  expectedPassingAssessment: "",
  expectedPassingStudent: "",
  type: "",
});

const removeDetail = (key) => {
  selectedDetails.value.splice(key, 1);
};

const addCLO = () => {
  emit("add", newCLO.value);
  newCLO.value = {
    code: "",
    desc: "",
    desc_th: "",
    expectedPassingAssessment: "",
    expectedPassingStudent: "",
  };
  emit("close");
};
</script>

<style scoped>
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

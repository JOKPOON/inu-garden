<template>
  <teleport to="body">
    <div
      class="w-full h-full fixed inset-0 flex items-center justify-center bg-black-primary bg-opacity-50 z-50"
    >
      <div
        class="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center border border-grey-secondary"
      >
        <div class="flex flex-col w-[28rem]">
          <div
            class="text-2xl font-semibold text-black-primary w-full text-start"
          >
            Add Assessment
          </div>
          <div class="text-sm text-grey-primary mt-1">
            Add Assessment Group for
            <span class="font-semibold text-black-primary">{{ name }}</span>
          </div>
        </div>
        <div
          class="mt-4 text-center flex gap-4 flex-col text-sm max-h-[60vh] overflow-y-auto scrollbar-set"
        >
          <div class="flex flex-col items-start w-full gap-2">
            <label class="font-semibold text-black-primary"
              >Assessment Group Name</label
            >
            <input
              v-model="assessmentsGroup.name"
              type="text"
              placeholder="Assessment Group Name"
              class="w-[28rem] px-4 py-2 border border-grey-secondary rounded-xl outline-none"
            />
          </div>
          <div class="flex flex-col items-start w-full gap-2">
            <label class="font-semibold text-black-primary">Description</label>
            <textarea
              v-model="assessmentsGroup.desc_en"
              placeholder="Description"
              class="w-[28rem] px-4 py-2 border border-grey-secondary rounded-xl outline-none"
            ></textarea>
          </div>
          <div class="grid grid-cols-2 gap-4 items-center w-[28rem]">
            <div class="flex flex-col items-start w-full gap-2">
              <label class="font-semibold text-black-primary"
                >Weighted (%)</label
              >
              <input
                v-model="assessmentsGroup.weight"
                type="number"
                placeholder="Max Weighted Score"
                class="px-4 py-2 border border-grey-secondary rounded-xl outline-none"
              />
            </div>
            <div class="flex flex-row items-center w-full gap-2">
              <div class="flex flex-col items-start w-full gap-2">
                <label class="font-semibold text-black-primary"
                  >Include CLO</label
                >
                <div
                  class="flex flex-row items-center w-full gap-2 p-2 border border-grey-secondary rounded-xl"
                >
                  <input
                    v-model="assessmentsGroup.includeCLO"
                    type="checkbox"
                    class="w-4 h-4 rounded-xl"
                  />
                  <label
                    class="font-semibold text-black-primary border-l border-grey-secondary pl-2"
                    ><span
                      v-if="assessmentsGroup.includeCLO"
                      class="text-green-500"
                      >Include</span
                    >
                    <span v-else class="text-red-500">Not Include</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div class="flex flex-col items-start w-full gap-2">
            <label class="font-semibold text-black-primary">Max Scored</label>
            <input
              v-model="assessmentsGroup.maxScored"
              type="number"
              placeholder="Max Scored"
              class="w-[28rem] px-4 py-2 border border-grey-secondary rounded-xl outline-none"
            />
          </div>
          <div class="flex flex-col items-start w-full gap-2">
            <label class="font-semibold text-black-primary"
              >Expected Passing Student (%)</label
            >
            <input
              v-model="assessmentsGroup.expectedPassingStudent"
              type="number"
              placeholder="Expected Passing Student (%)"
              class="w-[28rem] px-4 py-2 border border-grey-secondary rounded-xl outline-none"
            />
          </div>
          <div class="flex flex-col items-start w-full gap-2 mb-4">
            <label class="font-semibold text-black-primary"
              >Expected Passing Score (%)</label
            >
            <input
              v-model="assessmentsGroup.expectedPassingScore"
              type="number"
              placeholder="Expected Passing Score (%)"
              class="w-[28rem] px-4 py-2 border border-grey-secondary rounded-xl outline-none"
            />
          </div>
        </div>
        <div
          class="flex flex-row items-center justify-center gap-2 w-full mt-4 border border-grey-secondary rounded-xl"
        >
          <button
            @click="addAssignmentsGroup"
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
import { ref } from "vue";
import { defineProps, defineEmits } from "vue";

const emit = defineEmits(["close"]);

const assessmentsGroup = ref({
  name: "",
  desc_en: "",
  weight: 0,
  includeCLO: true,
  maxScored: 0,
  expectedPassingStudent: 50,
  expectedPassingScore: 50,
});

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

const addAssignmentsGroup = () => {
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
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}
</style>

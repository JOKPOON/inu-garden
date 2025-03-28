<template>
  <teleport to="body">
    <div
      class="w-full h-full fixed inset-0 flex items-center justify-center bg-black-primary bg-opacity-50 z-50"
    >
      <div
        class="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center border border-grey-secondary"
      >
        <div class="flex flex-col w-[32rem]">
          <div class="text-2xl font-semibold text-black-primary">Add PO</div>
          <div class="text-sm text-grey-primary mt-1">
            Add PO for
            <span class="font-semibold text-black-primary">{{ name }}</span>
          </div>
        </div>
        <div class="mt-4 text-center flex gap-4 flex-col text-sm">
          <div class="flex flex-col items-start w-full gap-2">
            <label class="font-semibold text-black-primary">PO Code</label>
            <input
              v-model="newPO.code"
              type="text"
              placeholder="PO Code"
              class="w-[32rem] px-4 py-2 border border-grey-secondary rounded-xl outline-none"
            />
          </div>
          <div class="flex flex-col items-start w-full gap-2">
            <label class="font-semibold text-black-primary"
              >Description (Eng)</label
            >
            <textarea
              v-model="newPO.desc"
              rows="3"
              placeholder="PO Description"
              class="w-[32rem] px-4 py-2 border border-grey-secondary rounded-xl outline-none"
            ></textarea>
          </div>
          <div class="flex flex-col items-start w-full gap-2">
            <label class="font-semibold text-black-primary"
              >Description (TH)</label
            >
            <textarea
              v-model="newPO.desc_th"
              rows="3"
              placeholder="PO Description (TH)"
              class="w-[32rem] px-4 py-2 border border-grey-secondary rounded-xl outline-none"
            ></textarea>
          </div>
          <div class="flex flex-col items-start w-full gap-2">
            <label class="font-semibold text-black-primary">PO Category</label>
            <input
              v-model="newPO.category"
              type="text"
              placeholder="PO Category"
              class="w-[32rem] px-4 py-2 border border-grey-secondary rounded-xl outline-none"
            />
          </div>

          <div class="w-full flex flex-row gap-2 items-center">
            <div class="w-full text-left">
              Expected Passing Student rate (%)
            </div>

            <input
              v-model="newPO.expectedRate"
              class="border border-grey-tertiary rounded-xl p-3 outline-grey-tertiary w-12 text-center"
              type="number"
              placeholder="ExpectedPassingCLO"
            />
          </div>
        </div>
        <div
          class="flex flex-row items-center justify-center gap-4 w-full mt-4"
        >
          <button
            @click="addPO"
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

const newPO = ref({
  desc: "",
  desc_th: "",
  code: "",
  description: "",
  category: "",
  expectedRate: 0,
});

const addPO = () => {
  emit("add", newPO.value);
  newPO.value = {
    desc: "",
    desc_th: "",
    code: "",
    description: "",
    category: "",
    expectedRate: 0,
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

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}
</style>

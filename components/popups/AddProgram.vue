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
            Add Programme
          </div>
          <div class="text-sm text-grey-primary mt-1">
            Add Program for
            <span class="font-semibold text-black-primary">{{ faculty }}</span>
          </div>
        </div>
        <div class="mt-4 text-center flex gap-4 flex-col text-sm">
          <input
            v-model="program.name_th"
            type="text"
            placeholder="Program Name (TH)"
            class="w-[28rem] px-4 py-2 border border-grey-secondary rounded-xl outline-none"
          />

          <input
            v-model="program.name"
            type="text"
            placeholder="Program Name"
            class="w-[28rem] px-4 py-2 border border-grey-secondary rounded-xl outline-none"
          />
          <textarea
            v-model="program.desc_th"
            rows="3"
            placeholder="Program Description (TH)"
            class="w-[28rem] px-4 py-2 border border-grey-secondary rounded-xl outline-none"
          ></textarea>
          <textarea
            v-model="program.desc"
            rows="3"
            placeholder="Program Description"
            class="w-[28rem] px-4 py-2 border border-grey-secondary rounded-xl outline-none"
          ></textarea>
          <input
            v-model="program.year"
            type="text"
            placeholder="Year"
            class="w-[28rem] px-4 py-2 border border-grey-secondary rounded-xl outline-none"
          />
        </div>
        <div
          class="flex flex-row items-center justify-center gap-2 w-full mt-4 border border-grey-secondary rounded-xl"
        >
          <button
            @click="addProgram"
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

const program = ref({
  name_th: "",
  name: "",
  desc_th: "",
  desc: "",
  year: "",
});

const props = defineProps({
  faculty: {
    type: String,
    required: true,
  },
});

const addProgram = () => {
  emit("close");
};
</script>

<style scoped></style>

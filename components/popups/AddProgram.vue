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
            <span class="font-semibold text-black-primary">{{
              department
            }}</span>
          </div>
        </div>
        <div class="mt-4 text-center flex gap-4 flex-col text-sm">
          <div class="flex flex-col items-start w-full gap-2">
            <div class="flex flex-col items-start w-full gap-2">
              <label class="font-semibold text-black-primary"
                >Program Name (EN)</label
              >
              <input
                v-model="program.name_en"
                type="text"
                placeholder="Program Name  (EN)"
                class="w-[28rem] px-4 py-2 border border-grey-secondary rounded-xl outline-none"
              />
            </div>
            <label class="font-semibold text-black-primary"
              >Program Name (TH)</label
            >
            <input
              v-model="program.name_th"
              type="text"
              placeholder="Program Name (TH)"
              class="w-[28rem] px-4 py-2 border border-grey-secondary rounded-xl outline-none"
            />
          </div>
          <div class="flex flex-col items-start w-full gap-2">
            <label class="font-semibold text-black-primary"
              >Program Description (EN)</label
            >
            <textarea
              v-model="program.description_en"
              rows="3"
              placeholder="Program Description (EN)"
              class="w-[28rem] px-4 py-2 border border-grey-secondary rounded-xl outline-none"
            ></textarea>
          </div>
          <div class="flex flex-col items-start w-full gap-2">
            <label class="font-semibold text-black-primary"
              >Program Description (TH)</label
            >
            <textarea
              v-model="program.description_th"
              rows="3"
              placeholder="Program Description (TH)"
              class="w-[28rem] px-4 py-2 border border-grey-secondary rounded-xl outline-none"
            ></textarea>
          </div>
          <div class="flex flex-col items-start w-full gap-2">
            <label class="font-semibold text-black-primary">Program Year</label>
            <input
              v-model="program.year"
              type="number"
              placeholder="Year"
              class="w-[28rem] px-4 py-2 border border-grey-secondary rounded-xl outline-none"
            />
          </div>
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
import { BaseURL } from "~/api/api";

const emit = defineEmits(["close", "updated"]);

const props = defineProps({
  department: {
    type: String,
    required: true,
  },
});

const program = ref({
  name_th: "",
  name_en: "",
  degree_th: "วิศวกรรมศาสตรบัณฑิต",
  degree_en: "Bachelor of Engineering",
  degree_short_th: "วศ.บ.",
  degree_short_en: "B.Eng.",
  description_th: "",
  description_en: "",
  year: "",
  department_id: props.department,
});

const addProgram = async () => {
  try {
    const response = await fetch(`${BaseURL}programmes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(program.value),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to add faculty");
    }
    const data = await response.json();
    console.log("programmse", data);
    emit("updated", data);
  } catch (error) {
    console.error(error);
  }
  emit("close");
};
</script>

<style scoped>
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}
</style>

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
            Add Department
          </div>
          <div class="text-sm text-grey-primary mt-1">
            Add Department for
            <span class="font-semibold text-black-primary">{{ program }}</span>
          </div>
        </div>
        <div class="mt-4 text-center flex gap-4 flex-col text-sm">
          <div class="flex flex-col items-start w-full gap-2">
            <label class="font-semibold text-black-primary"
              >Department Name (TH)</label
            >
            <input
              v-model="type.name_th"
              type="text"
              placeholder="Name (TH)"
              class="w-[28rem] px-4 py-2 border border-grey-secondary rounded-xl outline-none"
            />
          </div>
          <div class="flex flex-col items-start w-full gap-2">
            <label class="font-semibold text-black-primary"
              >Department Name (EN)</label
            >
            <input
              v-model="type.name_en"
              type="text"
              placeholder="Name (EN)"
              class="w-[28rem] px-4 py-2 border border-grey-secondary rounded-xl outline-none"
            />
          </div>
        </div>
        <div
          class="flex flex-row items-center justify-center gap-2 w-full mt-4 border border-grey-secondary rounded-xl"
        >
          <button
            @click="addDepartment"
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
  program: {
    type: String,
    required: true,
  },
});

const type = ref({
  name_th: "",
  name_en: "",
  faculty_id: props.program,
});

const addDepartment = async () => {
  try {
    const response = await fetch(`${BaseURL}departments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(type.value),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to add faculty");
    }
    const data = await response.json();
    console.log("Departments added successfully:", data);
    emit("updated", data);
  } catch (error) {
    console.error(error);
  }
  emit("close");
};
</script>

<style scoped></style>

<template>
  <teleport to="body">
    <div
      class="w-full h-full fixed inset-0 flex items-center justify-center bg-black-primary bg-opacity-50 z-50"
    >
      <div
        class="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center border border-grey-secondary"
      >
        <div class="flex flex-col w-[28rem]">
          <div class="text-2xl font-semibold text-black-primary">
            Add Sub PLO
          </div>
          <div class="text-sm text-grey-primary mt-1">
            Add Sub PLO of
            <span class="font-semibold text-black-primary">{{ ploId }}</span>
            <br />
            of
            <span class="font-semibold text-black-primary">{{ name }}</span>
          </div>
        </div>
        <div class="mt-4 text-center flex gap-4 flex-col text-sm">
          <div class="flex flex-col items-start w-full gap-2">
            <label class="font-semibold text-black-primary">Sub PLO Code</label>
            <input
              v-model="newSubPLO.code"
              type="text"
              placeholder="Sub PLO Code"
              class="w-[28rem] px-4 py-2 border border-grey-secondary rounded-xl outline-none"
            />
          </div>
          <div class="flex flex-col items-start w-full gap-2">
            <label class="font-semibold text-black-primary"
              >Description (Eng)</label
            >
            <textarea
              v-model="newSubPLO.description_eng"
              rows="3"
              placeholder="Sub PLO Description"
              class="w-[28rem] px-4 py-2 border border-grey-secondary rounded-xl outline-none"
            ></textarea>
          </div>
          <div class="flex flex-col items-start w-full gap-2">
            <label class="font-semibold text-black-primary"
              >Description (TH)</label
            >
            <textarea
              v-model="newSubPLO.description_thai"
              rows="3"
              placeholder="Sub PLO Description (TH)"
              class="w-[28rem] px-4 py-2 border border-grey-secondary rounded-xl mb-4 outline-none"
            ></textarea>
          </div>
        </div>
        <div
          class="flex flex-row items-center justify-center gap-4 w-full mt-4"
        >
          <button
            @click="addSubPLO"
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

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  ploId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  subPLOs: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["close", "add"]);

const newSubPLO = ref({
  code: "",
  description_thai: "",
  description_eng: "",
  editMode: false,
});

const addSubPLO = async () => {
  emit("add");
  if (props.ploId) {
    try {
      newSubPLO.value.program_learning_outcome_id = props.ploId;
      const response = await fetch(`${BaseURL}splos`, {
        credentials: "include",
        method: "POST",
        body: JSON.stringify({
          sub_program_learning_outcomes: [newSubPLO.value],
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to create SPLO");
      props.subPLOs.push(newSubPLO.value);
    } catch (error) {
      console.error(error);
    }
  } else {
    props.subPLOs.push(newSubPLO.value);
  }
  emit("close");
};
</script>

<style scoped></style>

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
            Add Sub SO
          </div>
          <div class="text-sm text-grey-primary mt-1">
            Add Sub SO of
            <span class="font-semibold text-black-primary">{{ so }}</span>
            <br />
            of
            <span class="font-semibold text-black-primary">{{ name }}</span>
          </div>
        </div>
        <div class="mt-4 text-center flex gap-4 flex-col text-sm">
          <div class="flex flex-col items-start w-full gap-2">
            <label class="font-semibold text-black-primary">Sub SO Code</label>
            <input
              v-model="newSubSO.code"
              type="text"
              placeholder="Sub SO Code"
              class="w-[28rem] px-4 py-2 border border-grey-secondary rounded-xl outline-none"
            />
          </div>
          <div class="flex flex-col items-start w-full gap-2">
            <label class="font-semibold text-black-primary"
              >Description (Eng)</label
            >
            <textarea
              v-model="newSubSO.description_eng"
              rows="3"
              placeholder="Sub SO Description"
              class="w-[28rem] px-4 py-2 border border-grey-secondary rounded-xl outline-none"
            ></textarea>
          </div>
          <div class="flex flex-col items-start w-full gap-2">
            <label class="font-semibold text-black-primary"
              >Description (TH)</label
            >
            <textarea
              v-model="newSubSO.description_thai"
              rows="3"
              placeholder="Sub SO Description (TH)"
              class="w-[28rem] px-4 py-2 border border-grey-secondary rounded-xl mb-4 outline-none"
            ></textarea>
          </div>
        </div>
        <div
          class="flex flex-row items-center justify-center gap-4 w-full mt-4"
        >
          <button
            @click="addSubSO"
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
import { BaseURL } from "~/api/api";
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  so: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  subSOs: {
    type: Array,
    required: true,
  },
  soId: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["close", "add"]);

const newSubSO = ref({
  code: "",
  description_eng: "",
  description_thai: "",
});

const addSubSO = async () => {
  emit("add", newSubSO.value);
  if (props.soId) {
    try {
      newSubSO.value.student_outcome_id = props.soId;
      const response = await fetch(`${BaseURL}ssos`, {
        credentials: "include",
        method: "POST",
        body: JSON.stringify({
          sub_student_outcomes: [newSubSO.value],
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to create SSO");
      props.subSOs.push(newSubSO.value);
    } catch (error) {
      console.error(error);
    }
  } else {
    props.subSOs.push(newSubSO.value);
  }
  emit("close");
};
</script>

<style scoped></style>

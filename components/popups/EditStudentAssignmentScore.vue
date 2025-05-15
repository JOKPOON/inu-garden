<template>
  <teleport to="body">
    <div
      class="w-full h-full fixed inset-0 flex items-center justify-center bg-black-primary bg-opacity-50 z-50"
    >
      <div
        class="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center border border-grey-secondary"
      >
        <div
          class="flex flex-col w-[28rem] pb-2 border-b border-grey-secondary"
        >
          <div
            class="text-2xl font-semibold text-black-primary w-full text-start"
          >
            Edit Student Assessment Score
          </div>
          <div class="text-sm text-grey-primary mt-1">
            <span class="font-semibold text-black-primary"> {{ name }} </span>
            in
            <span class="font-semibold text-black-primary">{{
              groupName
            }}</span>
          </div>
        </div>
        <div class="mt-4 text-center flex gap-4 flex-col text-sm w-[28rem]">
          <div class="flex flex-col items-start w-full gap-2">
            <label class="font-semibold text-black-primary">Student ID</label>
            <div
              class="bg-transparent border border-grey-secondary rounded-xl text-base p-3 hover:cursor-pointer w-full"
            >
              <input
                v-if="score"
                v-model="score.student_id"
                class="w-full border-none outline-none"
                disabled
              />
            </div>
          </div>
          <div class="flex flex-col items-start w-full gap-2">
            <label class="font-semibold text-black-primary">Score</label>
            <div
              class="bg-transparent border border-grey-secondary rounded-xl text-base p-3 hover:cursor-pointer w-full"
            >
              <input
                v-if="score"
                type="number"
                v-model="score.score"
                class="w-full border-none outline-none"
                placeholder="Enter Score"
                max="10"
              />
            </div>
          </div>
        </div>
        <div
          class="flex flex-row items-center justify-center gap-2 w-full mt-4 rounded-xl"
        >
          <button
            @click="saveStudent"
            class="py-2 font-medium border border-grey-secondary text-black-primary rounded-xl w-full bg-yellow-primary hover:bg-black-primary hover:text-white"
          >
            Save
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
import { defineProps, defineEmits } from "vue";
import { BaseURL } from "~/api/api";

const emit = defineEmits(["close", "updated"]);

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  groupName: {
    type: String,
    required: true,
  },
  score: {
    type: Object,
    required: true,
  },
});

const saveStudent = async () => {
  try {
    const response = await fetch(`${BaseURL}scores/${props.score.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        score: props.score.score,
      }),
      credentials: "include",
    });
    if (response.ok) {
      emit("close");
    } else {
      console.error("Error updating score:", response.statusText);
    }
  } catch (error) {
    console.error(error);
  }
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

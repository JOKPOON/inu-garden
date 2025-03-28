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
              Add PLO
            </div>
            <div class="text-sm text-grey-primary mt-1"> 
              in
              <span class="font-semibold text-black-primary">Leaning Outcome</span>
            </div>
          </div>
          <div class="mt-4 text-center flex gap-4 flex-col text-sm w-[28rem]">
            <div class="flex flex-col items-start w-full gap-2">
              <label class="font-semibold text-black-primary">Select PLO</label>
              <div
                class="bg-transparent border border-grey-secondary rounded-xl text-base p-3 hover:cursor-pointer w-full"
              >
                <select
                  v-model="selectPLO"
                  class="w-full border-none outline-none hover:cursor-pointer"
                  placeholder="Select PLO"
                >
                  <option value="">Select PLO</option>
                  <option v-for="plo in plos" :key="plo.id" :value="plo.id">
                    {{ plo.code }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div
            class="flex flex-row items-center justify-center gap-2 w-full mt-4 rounded-xl"
          >
            <button
              @click="updateStatus"
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
  import { ref, onMounted } from "vue";
  import { defineProps, defineEmits } from "vue";

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
  });

  const selectPLO = ref("");
  const plos = ref([]);

  const updateStatus = () => {
    addPLO();
  };

  const addPLO = () => {
    try {
      console.log("PLO added:", selectPLO.value);
      emit("updated");
      emit("close");
    } catch (error) {
      console.error(error);
    }
  };

  onMounted(() => {
    plos.value = [
      { id: "1", code: "PLO1" },
      { id: "2", code: "PLO2" },
      { id: "3", code: "PLO3" },
    ];
  });
  </script>
  
  <style scoped></style>
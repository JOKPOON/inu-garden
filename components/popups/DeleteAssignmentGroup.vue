<template>
    <teleport to="body">
      <div class="w-full h-full fixed inset-0 flex items-center justify-center bg-black-primary bg-opacity-50 z-50">
        <div class="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center border border-grey-secondary">
          <div class="flex flex-col w-[28rem] pb-2 border-b border-grey-secondary">
            <div class="text-2xl font-semibold text-black-primary w-full text-start">
              Delete Assessment Group
            </div>
            <div class="text-sm text-grey-primary mt-1">
              Are you sure you want to delete the group ?
            </div>
          </div>
          <div class="mt-4 text-center flex gap-4 flex-col text-sm w-[28rem]">
            <div class="flex flex-col items-start w-full gap-2">
              <label class="font-semibold text-black-primary">Group Name</label>
              <div class="w-full px-4 py-2 border border-grey-secondary rounded-xl">
                {{ groupName }}
              </div>
            </div>
          </div>
          <div class="flex flex-row items-center justify-center gap-2 w-full mt-4 rounded-xl">
            <button
              @click="confirmDelete"
              class="py-2 font-medium border border-grey-secondary text-white rounded-xl w-full bg-red-500 "
            >
              Delete
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
  
  const props = defineProps({
    groupID: {
      type: String,
      required: true,
    },
    groupName: {
      type: String,
      required: true,
    },
  });
  
  const confirmDelete = () => {
    console.log(`Deleting assessment group with ID ${props.groupID}`);
    emit("close");
  };
  </script>
  
  <style scoped></style>
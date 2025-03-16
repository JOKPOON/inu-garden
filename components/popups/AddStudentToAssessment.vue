<template>
    <teleport to="body">
      <div class="w-full h-full fixed inset-0 flex items-center justify-center bg-black-primary bg-opacity-50 z-50">
        <div class="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center border border-grey-secondary">
          <div class="flex flex-col w-[28rem] pb-2 border-b border-grey-secondary">
            <div class="text-2xl font-semibold text-black-primary w-full text-start">
              Add Student to Assessment
            </div>
            <div class="text-sm text-grey-primary mt-1">
              <span class="font-semibold text-black-primary"> {{ name }} </span>
              in
              <span class="font-semibold text-black-primary">{{ groupName }}</span>
            </div>
          </div>
          <div class="mt-4 text-center flex gap-4 flex-col text-sm w-[28rem]">
            <div class="flex flex-col items-start w-full gap-2">
              <label class="font-semibold text-black-primary">Student ID</label>
              <div class="bg-transparent border border-grey-secondary rounded-xl text-base p-3 hover:cursor-pointer w-full">
                <input
                  v-model="studentID"
                  class="w-full border-none outline-none "
                  placeholder="Enter Student ID"
                />
              </div>
            </div>
          </div>
          <div class="flex flex-row items-center justify-center gap-2 w-full mt-4 rounded-xl">
            <button @click="addStudent" class="py-2 font-medium border border-grey-secondary text-black-primary rounded-xl w-full bg-yellow-primary hover:bg-black-primary hover:text-white">
              Add
            </button>
            <button @click="$emit('close')" class="py-2 font-medium border border-grey-secondary text-black-primary rounded-xl w-full hover:bg-black-primary hover:text-white">
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
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  });
  
  const studentID = ref("");
  
  const addStudent = () => {
    emit("close");
  };
  </script>
  
  <style scoped></style>
<template>
    <teleport to="body">
      <div
        class="w-full h-full fixed inset-0 flex items-center justify-center bg-black-primary bg-opacity-50 z-50"
      >
        <div
          class="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center border border-grey-secondary"
        >
          <div class="flex flex-row gap-4 items-center w-full justify-between">
            <div class="flex flex-col w-full">
              <div class="text-2xl font-semibold text-black-primary">
                Semester Details
              </div>
              <div class="text-sm text-grey-primary mt-1">
                Manage the list of semesters below.
              </div>
            </div>
            <div class="flex flex-row items-center justify-end w-full gap-2 mt-4">
              <button
                v-if="!isAdding"
                @click="toggleEditMode"
                class="flex items-center justify-center rounded-xl p-2 border bg-white hover:bg-black-primary hover:text-white"
                aria-label="Toggle Edit Mode"
              >
                <template v-if="isEditMode">
                  <Include class="w-5 h-5" />
                </template>
                <template v-else>
                  <Edit class="w-5 h-5" />
                </template>
              </button>
            </div>
          </div>
          <div class="mt-4 text-start flex gap-4 flex-col text-sm">
            <div
              v-if="!isAdding"
              class="rounded-xl border border-grey-secondary p-4 w-full"
            >
              <div :class="gridClass">
                <div class="font-normal text-grey-primary w-full text-center">
                  Year
                </div>
                <div class="font-normal text-grey-primary w-full text-center">
                  Semester
                </div>
                <div
                  v-if="isEditMode"
                  class="font-normal text-grey-primary w-full text-center"
                >
                  Action
                </div>
              </div>
              <div
                class="gap-2 my-2 max-h-[50vh] w-[32rem] overflow-y-scroll scrollbar-set"
              >
                <div
                  v-for="(semester, index) in semesters"
                  :key="index"
                  :class="gridClass"
                  class="flex items-center"
                >
                  <div class="text-sm w-full text-black-primary text-center">
                    <template v-if="isEditMode">
                      <input
                        v-model="semester.year"
                        type="text"
                        class="border rounded-lg p-1 text-center w-full"
                      />
                    </template>
                    <template v-else>
                      {{ semester.year }}
                    </template>
                  </div>
                  <div class="text-sm w-full text-center text-black-primary">
                    <template v-if="isEditMode">
                      <input
                        v-model="semester.semester"
                        type="text"
                        class="border rounded-lg p-1 text-center w-full"
                      />
                    </template>
                    <template v-else>
                      {{ semester.semester }}
                    </template>
                  </div>
                  <div
                    v-if="isEditMode"
                    class="flex items-center justify-center w-full"
                  >
                    <button
                      @click="deleteSemester(index)"
                      class="flex items-center justify-center rounded-xl p-2 border hover:bg-red-500 hover:text-white"
                      aria-label="Delete Semester"
                    >
                      <Delete class="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="isAdding" class="grid grid-cols-2 gap-4 w-[32rem]">
              <input
                v-model="newSemester.year"
                type="text"
                placeholder="Year"
                class="border rounded-lg p-2"
              />
              <input
                v-model="newSemester.semester"
                type="text"
                placeholder="Semester"
                class="border rounded-lg p-2"
              />
            </div>
          </div>
          <div
            class="flex flex-row items-center justify-center gap-4 w-full mt-4"
          >
            <button
              v-if="isAdding"
              @click="IncludeSemester"
              class="w-full py-2 font-medium border border-grey-secondary rounded-xl bg-yellow-primary hover:bg-black-primary hover:text-white"
            >
              Save
            </button>
            <button
              v-if="!isEditMode && !isAdding"
              @click="startAdding"
              class="py-2 font-medium border border-grey-secondary rounded-xl w-full bg-yellow-primary hover:bg-black-primary hover:text-white"
            >
              Add Semester
            </button>
            <button
              v-if="!isAdding && !isEditMode"
              @click="$emit('close')"
              class="py-2 font-medium border border-grey-secondary text-black-primary rounded-xl w-full hover:bg-black-primary hover:text-white"
            >
              Cancel
            </button>
            <button
              v-if="isAdding "
              @click="toggleAdding"
              class="py-2 font-medium border border-grey-secondary text-black-primary rounded-xl w-full hover:bg-black-primary hover:text-white"
            >
              Cancel
            </button>
            <button
              v-if="!isAdding && isEditMode"
              @click="toggleEditMode"
              class="py-2 font-medium border border-grey-secondary text-black-primary rounded-xl w-full hover:bg-black-primary hover:text-white"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </teleport>
  </template>
  
  <script setup>
  import { ref, computed } from "vue";
  import Include from "@/components/icons/Include.vue";
  import Edit from "@/components/icons/Edit.vue";
  import Delete from "@/components/icons/Delete.vue";
  
  const semesters = ref([
    { year: "2023", semester: "Fall" },
    { year: "2024", semester: "Spring" },
    { year: "2024", semester: "Summer" },
    { year: "2024", semester: "Fall" },
    { year: "2025", semester: "Spring" },
    { year: "2025", semester: "Summer" },
    { year: "2025", semester: "Fall" },
  ]);
  
  const isEditMode = ref(false);
  const isAdding = ref(false);
  const newSemester = ref({ year: "", semester: "" });
  
  const gridClass = computed(
    () =>
      `w-full grid ${isEditMode.value ? "grid-cols-3" : "grid-cols-2"} gap-2 py-2 border-b border-grey-tertiary`
  );
  
  const toggleEditMode = () => {
    isEditMode.value = !isEditMode.value;
  };
  
  const deleteSemester = (index) => {
    semesters.value.splice(index, 1);
  };
  
  const startAdding = () => {
    isAdding.value = true;
    newSemester.value = { year: "", semester: "" };
  };
  
  const toggleAdding = () => {
    isAdding.value = !isAdding.value;
  };
  
  const IncludeSemester = () => {
    if (newSemester.value.year.trim() && newSemester.value.semester.trim()) {
      semesters.value.push({ ...newSemester.value });
      isAdding.value = false;
    } else {
      alert("Please fill in both fields.");
    }
  };
  </script>
  
  <style lang="scss" scoped>
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
  </style>
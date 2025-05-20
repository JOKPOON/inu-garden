<template>
  <teleport to="body">
    <div
      v-if="showImportCoursePopup"
      class="w-full h-full fixed inset-0 flex items-center justify-center bg-black-primary bg-opacity-50 z-50"
    >
      <div
        class="bg-white p-8 rounded-2xl shadow-xl flex flex-col items-center border border-grey-secondary max-w-lg w-full"
      >
        <div class="flex flex-col w-full pb-4 border-b border-grey-secondary">
          <h2 class="text-2xl font-bold text-black-primary text-left">
            Import Student Enrollments
          </h2>
          <p class="text-sm text-grey-primary mt-1">
            Upload a file to
            <span class="font-semibold text-black-primary">
            Import Student Enrollments
            </span>
          </p>
        </div>

        <div class="mt-6 text-center flex flex-col gap-6 text-sm w-full">
          <div class="flex flex-col items-start w-full gap-3">
            <label class="font-semibold text-black-primary text-left">
              Upload File
              <span class="text-grey-primary font-normal"
                >(Excel .xlsx only)</span
              >
            </label>
            <div class="w-full flex items-center justify-center">
              <div
                :class="[
                  'flex items-center justify-center w-full py-12 border border-dashed rounded-lg',
                  isDragging ? ' bg-grey-tertiary' : 'border-grey-secondary',
                ]"
                @dragover.prevent="onDragOver"
                @dragleave.prevent="onDragLeave"
                @drop.prevent="onDrop"
              >
                <div class="relative flex w-full">
                  <input
                    type="file"
                    accept=".xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                    @change="handleFileUpload"
                    class="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                  />

                  <button
                    type="button"
                    class="w-full text-black-primary transition-all duration-200 pointer-events-none flex items-center justify-center"
                    tabindex="-1"
                  >
                    <p
                      class="py-3 px-6 font-medium border border-grey-secondary text-black-primary rounded-lg w-48"
                    >
                      Choose or Drop File
                    </p>
                  </button>
                </div>
              </div>
            </div>
            <p v-if="ErrorText" class="text-red-500 text-sm mt-2">
              {{ ErrorText }}
            </p>
          </div>
        </div>

        <div
          class="flex flex-row items-center justify-center gap-4 w-full mt-6"
        >
          <button
            @click="importFile"
            class="py-3 px-6 font-medium border border-grey-secondary text-black-primary rounded-lg w-full bg-yellow-primary hover:bg-black-primary hover:text-white transition-all duration-200"
          >
            Import
          </button>
          <button
            @click="$emit('close')"
            class="py-3 px-6 font-medium border border-grey-secondary text-black-primary rounded-lg w-full hover:bg-black-primary hover:text-white transition-all duration-200"
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
const emit = defineEmits(["close", "imported"]);
const file = ref(null);
const isDragging = ref(false);
const showImportCoursePopup = ref(true);
const ErrorText = ref("");

const handleFileUpload = (event) => {
  const uploadedFile = event.target.files[0];
  if (uploadedFile) {
    if (
      uploadedFile.type !==
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" &&
      !uploadedFile.name.endsWith(".xlsx")
    ) {
      ErrorText.value = "Only Excel (.xlsx) files are allowed.";
      return;
    }
    ErrorText.value = "";
    file.value = uploadedFile;
    showImportCoursePopup.value = false;
    event.target.value = "";
    console.log("File selected:", uploadedFile.name);
  }
};

const onDragOver = () => {
  isDragging.value = true;
};

const onDragLeave = () => {
  isDragging.value = false;
};

const onDrop = (event) => {
  isDragging.value = false;
  const droppedFile = event.dataTransfer.files[0];
  if (droppedFile) {
    if (
      droppedFile.type !==
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" &&
      !droppedFile.name.endsWith(".xlsx")
    ) {
      ErrorText.value = "Only Excel (.xlsx) files are allowed.";
      return;
    }
    ErrorText.value = "";
    file.value = droppedFile;
    showImportCoursePopup.value = false;
    console.log("File dropped:", droppedFile.name);
  }
};

const importFile = () => {
  if (!file.value) {
    ErrorText.value = "Please upload a file before importing.";
    return;
  }
  ErrorText.value = "";
  console.log("File import triggered:", file.value.name);
  emit("imported", file.value);
};
</script>

<style scoped>
input[type="file"] {
  transition:
    border-color 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out;
}

input[type="file"]:hover {
  border-color: #000;
}

button {
  transition:
    background-color 0.2s ease-in-out,
    color 0.2s ease-in-out;
}
</style>

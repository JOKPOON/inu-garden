<template>
  <teleport to="body">
    <div
      class="w-full h-full fixed inset-0 flex items-center justify-center bg-black-primary bg-opacity-50 z-50"
    >
      <div
        class="bg-white p-8 rounded-2xl shadow-xl flex flex-col items-center border border-grey-secondary max-w-lg w-full"
      >
        <!-- Header -->
        <div class="flex flex-col w-full pb-4 border-b border-grey-secondary">
          <h2 class="text-2xl font-bold text-black-primary text-left">
            Import File
          </h2>
          <p class="text-sm text-grey-primary mt-1">
            Upload a file to import data into
            <span class="font-semibold text-black-primary">
              Course Portfolio
            </span>
          </p>
        </div>

        <!-- File Upload Section -->
        <div class="mt-6 text-center flex flex-col gap-6 text-sm w-full">
          <div class="flex flex-col items-start w-full gap-3">
            <label class="font-semibold text-black-primary text-left">
              Upload File
              <span class="text-grey-primary font-normal">(PDF only)</span>
            </label>
            <div class="w-full flex items-center justify-center">
              <div
                class="flex items-center justify-center w-full py-12 border border-dashed border-grey-secondary rounded-lg bg-white"
              >
                <div v-if="!file" class="relative flex">
                  <input
                    type="file"
                    accept="application/pdf"
                    @change="handleFileUpload"
                    class="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                  />
                  <button
                    class="w-full py-3 px-6 font-medium border border-grey-secondary text-black-primary rounded-lg transition-all duration-200"
                  >
                    Upload File
                  </button>
                </div>
                <div v-else class="flex flex-col items-center">
                  <img
                    :src="PDF"
                    alt="PDF"
                    class="w-16 max-w-md object-cover rounded-2xl mb-2"
                  />
                  <p class="text-center text-black-primary text-sm">
                    {{ file.name }}
                  </p>
                </div>
              </div>
            </div>
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
import { defineEmits } from "vue";
import PDF from "@/components/images/PDF.png";
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["close", "imported"]);
const file = ref(null); 

const handleFileUpload = (event) => {
  const uploadedFile = event.target.files[0];
  if (uploadedFile) {
    if (uploadedFile.type !== "application/pdf") {
      alert("Only PDF files are allowed.");
      return;
    }
    file.value = uploadedFile; 
    console.log("File selected:", uploadedFile.name);
  }
};

const importFile = () => {
  if (!file.value) {
    alert("Please upload a file before importing.");
    return;
  }
  console.log("File import triggered:", file.value.name);
  emit("imported", file.value);
};
</script>

<style scoped>
input[type="file"] {
  transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}

input[type="file"]:hover {
  border-color: #000;
}

button {
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
}
</style>
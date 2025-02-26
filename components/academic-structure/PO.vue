<template>
    <div class="flex flex-col gap-4">
      <div class="flex flex-row justify-between gap-6 items-center w-full">
        <div class="flex">
          <div
            class="px-4 py-3 bg-white border border-grey-secondary rounded-xl flex flex-row gap-4 items-center"
          >
            <input
              type="text"
              v-model="searchQuery"
              class="bg-transparent border-none focus:ring-0 outline-none text-base w-48"
              placeholder="Search..."
            />
            <button class="flex items-center justify-center bg-white rounded-xl">
              <Search class="w-6 h-6" />
            </button>
          </div>
        </div>
        <div class="flex flex-row gap-4">
          <TemplateButton
            class="flex items-center flex-row justify-center border border-grey-secondary rounded-xl px-4 py-3 gap-2"
          >
            <span class="text-black-primary font-semibold text-base"
              >Template</span
            >
          </TemplateButton>
          <Import
            class="flex items-center flex-row justify-center border border-grey-secondary rounded-xl px-4 py-3 gap-2"
          >
            <span class="text-black-primary font-semibold text-base">Import</span>
          </Import>
          <ExportButton
            class="flex items-center flex-row justify-center border border-grey-secondary rounded-xl px-4 py-3 gap-2"
          >
            <span class="text-black-primary font-semibold text-base">Export</span>
          </ExportButton>
        </div>
      </div>
  
      <div
        class="flex h-[calc(100vh-295px)] border border-grey-secondary rounded-xl"
      >
        <div class="grid grid-cols-9 w-full h-full text-sm"></div>
      </div>
    </div>
  </template>
  
  <script setup>
  import TemplateButton from "@/components/button/TemplateButton.vue";
  import Import from "@/components/button/ImportButton.vue";
  import ExportButton from "@/components/button/ExportButton.vue";
  import Search from "@/components/icons/Search.vue";
  const searchQuery = ref("");
  </script>
  
  <style lang="scss" scoped></style>
  
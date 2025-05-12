<template>
  <div class="p-4 flex flex-col gap-4 h-full w-full">
    <div
      class="text-base font-semibold w-full pb-2 border-b border-grey-secondary"
    >
      5. Report
    </div>
    <div class="flex flex-col gap-4 justify-center items-center h-full w-full">
      <img
        :src="Docx"
        alt="Docx"
        class="w-24 max-w-md object-cover rounded-2xl -ml-4"
      />
      <div class="text-center text-black-primary text-sm">Report.docx</div>
      <ImportButton
        @click=""
        class="flex items-center flex-row justify-center border border-grey-secondary rounded-xl px-4 py-3 gap-2 hover:cursor-pointer"
      >
        <span class="text-black-primary font-semibold text-base">Download</span>
      </ImportButton>
    </div>
  </div>
</template>

<script setup>
import Docx from "@/components/images/Docx.png";
</script>

<style lang="scss" scoped></style>

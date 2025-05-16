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
        @click="downloadDocx"
        class="flex items-center flex-row justify-center border border-grey-secondary rounded-xl px-4 py-3 gap-2 hover:cursor-pointer"
      >
        <span class="text-black-primary font-semibold text-base">Download</span>
      </ImportButton>
    </div>
  </div>
</template>

<script setup>
import Docx from "@/components/images/Docx.png";
import { generateDocx } from "~/utils/docxGenerator";
import { usePortfolioStore } from "~/store/usePortfolioStore";
const store = usePortfolioStore();

const downloadDocx = () => {
  if (!store.implementationData) {
    alert("No data available to generate the report.");
    return;
  }
  generateDocx({
    course_name: store.details.code + " " + store.details.name,
    lecturers: store.details.lecturers
      ? store.details.lecturers
          .map(
            (lecturer) =>
              lecturer.title_th_short +
              " " +
              lecturer.first_name_th +
              " " +
              lecturer.last_name_th
          )
          .join(", ")
      : "",
    implementation: store.implementationData,
    education_outcomes: {
      grade_distribution: store.educationalOutcomes,
    },
    continuous_development: store.continuousDevelopment,
  });
};
</script>

<style lang="scss" scoped></style>

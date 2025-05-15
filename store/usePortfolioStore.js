import { defineStore } from "pinia";
import { ref } from "vue";

export const usePortfolioStore = defineStore("portfolio", () => {
  const courseId = ref(null);
  const details = ref(null);

  const implementationData = ref(null);
  const educationalOutcomes = ref({});
  const continuousDevelopment = ref({});
  const reportData = ref({});

  function setDetails(data) {
    details.value = { ...details.value, ...data };
  }
  function setImplementationData(data) {
    implementationData.value = { ...implementationData.value, ...data };
  }

  return {
    courseId,
    details,
    implementationData,
    educationalOutcomes,
    continuousDevelopment,
    reportData,
    setDetails,
    setImplementationData,
  };
});

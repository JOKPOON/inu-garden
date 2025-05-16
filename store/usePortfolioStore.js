import { defineStore } from "pinia";
import { ref } from "vue";
import { watch } from "vue";
import { BaseURL } from "~/api/api";

export const usePortfolioStore = defineStore("portfolio", () => {
  const courseId = ref(null);
  const details = ref(null);

  const implementationData = ref(null);
  const educationalOutcomes = ref(null);
  const continuousDevelopment = ref(null);
  const reportData = ref(null);

  function setCourseId(id) {
    courseId.value = id;
  }
  function setDetails(data) {
    details.value = { ...details.value, ...data };
  }
  function setImplementationData(data) {
    implementationData.value = { ...implementationData.value, ...data };
  }
  function setEducationalOutcomes(data) {
    educationalOutcomes.value = { ...educationalOutcomes.value, ...data };
    console.log("educational outcomes", educationalOutcomes.value);
    update();
  }
  function setContinuousDevelopment(data) {
    continuousDevelopment.value = { ...continuousDevelopment.value, ...data };
  }
  function setReportData(data) {
    reportData.value = { ...reportData.value, ...data };
  }

  async function setMethods(data) {
    implementationData.value.methods = data;
    await update();
  }
  function setOnlineMedia(data) {
    implementationData.value.online_media = data;
    update();
  }
  function setTeachingObjectives(data) {
    implementationData.value.teaching_objectives = data;
    update();
  }

  function setPlans(data) {
    continuousDevelopment.value.plans = data;
    update();
  }
  function setDoAndChecks(data) {
    continuousDevelopment.value.do_and_checks = data;
    update();
  }
  function setActs(data) {
    continuousDevelopment.value.acts = data;
    update();
  }
  function setUpstreamFeedbacks(data) {
    continuousDevelopment.value.feedbacks.upstream_subjects = data;
    update();
  }
  function setDownstreamFeedbacks(data) {
    continuousDevelopment.value.feedbacks.downstream_subjects = data;
    update();
  }

  async function update() {
    try {
      console.log("Updating implementation data...");
      const response = await fetch(
        `${BaseURL}courses/${details.value.id}/portfolio`,
        {
          credentials: "include",
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            education_outcomes: {
              grade_distribution: educationalOutcomes.value,
            },
            continuous_development: {
              plans: continuousDevelopment.value.plans,
              do_and_checks: continuousDevelopment.value.do_and_checks,
              acts: continuousDevelopment.value.acts,
              feedbacks: continuousDevelopment.value.feedbacks,
            },
            implementation: {
              methods: implementationData.value.methods,
              online_media: implementationData.value.online_media,
              teaching_objectives: implementationData.value.teaching_objectives,
            },
          }),
        }
      );
      if (!response.ok) throw new Error("failed to update implementation data");
    } catch (error) {
      console.error(error);
    }
  }

  return {
    courseId,
    details,
    implementationData,
    educationalOutcomes,
    continuousDevelopment,
    reportData,
    setCourseId,
    setDetails,
    setImplementationData,
    setMethods,
    setOnlineMedia,
    setTeachingObjectives,
    setEducationalOutcomes,
    setContinuousDevelopment,
    setReportData,
    setPlans,
    setDoAndChecks,
    setActs,
    setSentFeedbacks: setUpstreamFeedbacks,
    setReceivedFeedbacks: setDownstreamFeedbacks,
  };
});

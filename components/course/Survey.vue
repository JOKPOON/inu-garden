<template>
  <div class="flex items-center justify-between flex-row">
    <div class="border border-grey-secondary rounded-xl">
      <button
        v-for="button in buttons"
        :key="button"
        :class="[
          'px-6 py-2 rounded-xl',
          activeButton === button
            ? 'bg-black-primary text-white'
            : 'border border-grey-secondary text-base',
        ]"
        @click="setActionButton(button)"
      >
        {{ button }}
      </button>
    </div>
    <div class="flex flex-row gap-4">
      <button
        v-if="!isComplete"
        class="flex items-center flex-row justify-center border border-grey-secondary rounded-xl px-4 py-2 gap-2 hover:bg-black-primary hover:text-white"
        @click="showPopup"
      >
        <Send class="w-5 h-5" />
        <div class="text-base">Start Survey</div>
      </button>
      <button
        :class="[
          'flex items-center flex-row justify-center border rounded-xl px-4 py-2 gap-2',
          isComplete ? 'bg-black-primary text-white' : 'border-grey-secondary',
        ]"
        @click="markAsComplete"
      >
        <Include class="w-5 h-5" />
        <div class="text-base">
          {{ isComplete ? "Complete!" : "Mark as complete" }}
        </div>
      </button>
    </div>
  </div>

  <div class="rounded-xl p-6 bg-white border border-grey-secondary">
    <div v-if="activeButton === 'Survey Management'">
      <SurveyManagement />
    </div>
    <div v-else-if="activeButton === 'Survey Statistic'">
      <SurveyStatistic />
    </div>
  </div>

  <SurverLink
    v-if="isPopupVisible"
    @close="isPopupVisible = false"
    :link="surveyLink"
    :name="surveyName"
  />
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import SurveyManagement from "@/components/course/SurveyManagement.vue";
import SurveyStatistic from "@/components/course/SurveyStatistic.vue";
import Send from "@/components/icons/Send.vue";
import Include from "@/components/icons/Include.vue";
import SurverLink from "@/components/popups/SurverLink.vue";

const buttons = ["Survey Management", "Survey Statistic"];
const activeButton = ref("Survey Management");
const isComplete = ref(false);
const isPopupVisible = ref(false);
const router = useRouter();
const code = router.currentRoute.value.params.code;
const surveyLink = ref(`http://https://inugardenview.vercel.app/courses/survey/${code}/question`);
const surveyName = code;

const setActionButton = (button) => {
  activeButton.value = button;
};

const markAsComplete = () => {
  isComplete.value = !isComplete.value;
};

const showPopup = () => {
  isPopupVisible.value = true;
};
</script>

<style lang="scss" scoped></style>

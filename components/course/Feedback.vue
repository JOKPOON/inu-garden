<template>
  <div class="flex items-center justify-between flex-row">
    <div class="flex flex-row gap-4">
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
    </div>
  </div>

  <div class="mt-4">
    <div v-if="activeButton === 'Received Feedbacks'">
      <RecivedFeedbacks />
    </div>
    <div v-else-if="activeButton === 'Manage Feedback'">
      <ManageFeedback />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import RecivedFeedbacks from "@/components/course/RecivedFeedbacks.vue";
import ManageFeedback from "@/components/course/ManageFeedback.vue";

const { t } = useI18n();

useHead({
  title: t("seo.title"),
  description: t("seo.desc"),
});

definePageMeta({
  layout: "landing",
});

const buttons = ["Received Feedbacks", "Manage Feedback"];

const activeButton = ref("Received Feedbacks");
const setActionButton = (button) => {
  activeButton.value = button;
};
</script>

<style lang="scss" scoped>
.scrollbar-set {
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
}
</style>

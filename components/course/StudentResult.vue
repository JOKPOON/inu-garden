<template>
  <div class="flex items-center justify-between flex-row">
    <div class="border border-grey-secondary rounded-xl mb-4">
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
  <div v-if="activeButton === 'PLO'">
    <CLO />
  </div>
  <div v-if="activeButton === 'PLO'">
    <PLO />
  </div>
  <div v-else-if="activeButton === 'PO'">
    <PO />
  </div>
  <div v-else-if="activeButton === 'SO'">
    <SO />
  </div>
</template>

<script setup>
import { ref } from "vue";
import CLO from "@/components/course/student/CLO.vue";
import PLO from "@/components/course/student/PLO.vue";
import PO from "@/components/course/student/PO.vue";
import SO from "@/components/course/student/SO.vue";

import { useI18n } from "vue-i18n";

const { t } = useI18n();

useHead({
  title: "Inu - Criteria",
  description: t("seo.desc"),
});

definePageMeta({
  layout: "landing",
});

const buttons = ["CLO", "PLO", "PO", "SO"];
const activeButton = ref("CLO");

const setActionButton = (button) => {
  activeButton.value = button;
};
</script>

<style lang="scss" scoped></style>

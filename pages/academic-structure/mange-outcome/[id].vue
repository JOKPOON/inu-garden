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
import PLO from "@/components/academic-structure/PLO.vue";
import PO from "@/components/academic-structure/PO.vue";
import SO from "@/components/academic-structure/SO.vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

useHead({
  title: "Inu - Criteria",
  description: t("seo.desc"),
});

definePageMeta({
  layout: "landing",
});

const buttons = ["PLO", "PO", "SO"];
const activeButton = ref("PLO");

const setActionButton = (button) => {
  activeButton.value = button;
};
</script>

<style lang="scss" scoped></style>

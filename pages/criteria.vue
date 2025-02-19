<template>
  <div class="flex flex-col gap-4 p-4">
    <div class="flex flex-col">
      <div class="text-2xl font-semibold text-black-primary">Criteria</div>
      <div class="text-sm text-grey-primary">Select Program</div>
    </div>
    <div class="flex flex-col p-6 rounded-xl"></div>
  </div>
</template>

<script setup>
const { t } = useI18n();

useHead({
  title: "Inu - Criteria",
  description: t("seo.desc"),
});

definePageMeta({
  layout: "landing",
});
</script>

<style lang="scss" scoped></style>

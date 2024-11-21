<template>
    <div>
        hello from Criteria
    </div>
</template>

<script setup>
const { t } = useI18n();

useHead({
  title: t("seo.title"),
  description: t("seo.desc"),
});

definePageMeta({
  layout: "landing",
});
</script>

<style lang="scss" scoped>

</style>
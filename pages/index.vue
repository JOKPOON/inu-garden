<template>
  <Hero />
</template>

<script setup>
import Hero from "@/components/course/Hero.vue";
const { t } = useI18n();

useHead({
  title: t("seo.title"),
  description: t("seo.desc"),
});

definePageMeta({
  layout: "landing",
});
</script>

<style lang="scss" scoped></style>

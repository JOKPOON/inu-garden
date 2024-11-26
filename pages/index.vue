<template>
  <main class="overflow-hidden text-black px-32">
    {{ t("seo.welcome") }}
  </main>
</template>

<script setup>
import { useI18n, useLocalePath, useSwitchLocalePath } from "#imports";

const { t } = useI18n();
const switchLocalePath = useSwitchLocalePath();

useHead({
  title: t("seo.welcome"),
  description: t("seo.welcome"),
});

definePageMeta({
  layout: "landing",
});
</script>

<style lang="scss" scoped></style>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import { useHead } from "@vueuse/head";
import { useLocaleHead } from "#i18n";

const { t } = useI18n();
const i18nHead = useLocaleHead({
  addSeoAttributes: {},
});

useHead({
  htmlAttrs: {
    lang: i18nHead.value.htmlAttrs.lang,
  },
  meta: [...(i18nHead.value.meta || [])],
});
</script>

<style lang="scss">

</style>
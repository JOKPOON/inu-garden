<template>
  <div class="flex justify-center items-center flex-col h-full w-full">
    <img
      :src="BannerLogin"
      alt="Banner Login"
      class="h-[405px] object-cover rounded-2xl"
    />
  </div>
</template>

<script setup>
import BannerLogin from "@/components/images/BannerLogin.jpg";
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

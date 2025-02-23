<template>
  <div class="flex justify-center items-center flex-col h-[100vh] w-full p-4">
    <img
      :src="BannerLogin"
      alt="Banner Login"
      class="w-full max-w-md object-cover rounded-2xl mb-4"
    />
    <div
      class="text-center text-lg md:text-xl font-semibold text-black-primary"
    >
      Thank you!
    </div>
  </div>
</template>

<script setup>
import BannerLogin from "@/components/images/BannerLogin.jpg";
useHead({
  title: "Inu - Courses Survey",
  description: t("seo.desc"),
});
</script>

<style lang="scss" scoped></style>

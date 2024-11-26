<template>
  <div>
    <LandingNavbar
      :show-lang-options="openLangOptions"
      @open-lang-options="openLangOptions = true"
      @close-lang-options="openLangOptions = false"
    />
    <slot />
  </div>
</template>

<script setup>
import LandingNavbar from "@/components/layouts/LandingNavbar.vue";
const openLangOptions = ref(true);
</script>

<style lang="scss" scoped></style>

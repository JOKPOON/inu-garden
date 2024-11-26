<template>
  <SideBar
    :show-lang-options="openLangOptions"
    @open-lang-options="openLangOptions = true"
    @close-lang-options="openLangOptions = false"
  >
    <slot />
  </SideBar>
</template>

<script setup>
import { ref } from "vue";
import SideBar from "@/components/layouts/SideBar.vue";

const openLangOptions = ref(true);
</script>

<style lang="scss" scoped></style>

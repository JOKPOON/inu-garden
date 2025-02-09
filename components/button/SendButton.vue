<template>
  <button v-bind="$attrs" class="flex items-center rounded-full group w-fit">
    <div class="w-4 md:w-5 duration-200 larr group-hover:w-0">
      <Send class="w-full h-full" direction="right" />
    </div>
    <slot />
    <div class="w-0 duration-200 rarr group-hover:w-4 md:group-hover:w-5">
      <Send class="w-full h-full" direction="right" />
    </div>
  </button>
</template>

<script setup>
import Send from "@/components/icons/Send.vue";
</script>

<style lang="scss" scoped></style>

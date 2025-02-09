<template>
  <button v-bind="$attrs" class="flex items-center rounded-full group w-fit">
    <div class="w-5 duration-200 larr group-hover:w-0">
      <Export class="w-full h-full" direction="right" />
    </div>
    <slot />
    <div class="w-0 duration-200 rarr group-hover:w-5">
      <Export class="w-full h-full" direction="right" />
    </div>
  </button>
</template>

<script setup>
import Export from "@/components/icons/Export.vue";
</script>

<style lang="scss" scoped></style>

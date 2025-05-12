<template>
    <button v-bind="$attrs" class="flex items-center rounded-full group w-fit">
      <div class="w-5 duration-200 larr group-hover:w-0">
        <Import class="w-full h-full" direction="right" />
      </div>
      <slot />
      <div class="w-0 duration-200 rarr group-hover:w-5">
        <Import class="w-full h-full" direction="right" />
      </div>
    </button>
  </template>
  
  <script setup>
  import Import from "@/components/icons/Import.vue";
  </script>
  
  <style lang="scss" scoped></style>
  
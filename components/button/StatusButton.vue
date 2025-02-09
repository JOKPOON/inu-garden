<template>
    <button v-bind="$attrs" class="flex items-center rounded-full group w-fit">
      <div class="w-6 duration-200 larr group-hover:w-0">
        <Status class="w-full h-full" direction="right" />
      </div>
      <slot />
      <div class="w-0 duration-200 rarr group-hover:w-6">
        <Status class="w-full h-full" direction="right" />
      </div>
    </button>
  </template>
  
  <script setup>
  import Status from "@/components/icons/Status.vue";
  </script>
  
  <style lang="scss" scoped></style>
  
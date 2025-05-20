<template>
  <div class="flex flex-col gap-4">
    <div class="flex">
      <div
        class="px-4 py-3 bg-white border border-grey-secondary rounded-xl flex flex-row gap-4 items-center"
      >
        <input
          type="text"
          v-model="searchQuery"
          class="bg-transparent border-none focus:ring-0 outline-none text-base w-40"
          placeholder="Search..."
        />
        <button
          class="flex items-center justify-center bg-white rounded-xl"
          @click="handleSearch"
        >
          <Search class="w-6 h-6" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import Search from "@/components/icons/Search.vue";
</script>

<style lang="scss" scoped></style>

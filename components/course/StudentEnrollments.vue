<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-row justify-between gap-6 items-center w-full">
      <div class="flex flex-row gap-4">
        <div
          class="px-4 py-3 bg-white border border-grey-secondary rounded-xl flex flex-row gap-4 items-center"
        >
          <input
            type="text"
            v-model="searchQuery"
            @keyup.enter="getStudents(searchQuery)"
            class="bg-transparent border-none focus:ring-0 outline-none text-base w-56"
            placeholder="Search..."
          />
          <button
            class="flex items-center justify-center bg-white rounded-xl"
            @click="getStudents(searchQuery)"
          >
            <Search class="w-6 h-6" />
          </button>
        </div>
        <button
          @click="toggleStatus"
          :class="[
            'flex items-center flex-row justify-center border border-grey-secondary rounded-xl px-4 py-3 gap-2 transition-all duration-300',
            statusClass,
          ]"
        >
          <span class="font-semibold text-base">Status</span>
          <template v-if="status === 'default'">
            <Status class="w-5 h-5" />
          </template>
          <template v-else-if="status === 'ascending'">
            <ArrowUp class="w-5 h-5" />
          </template>
          <template v-else>
            <ArrowDown class="w-5 h-5" />
          </template>
        </button>
      </div>
      <div class="flex flex-row gap-4">
        <TemplateButton
          @click="exportStudent"
          class="flex items-center flex-row justify-center border border-grey-secondary rounded-xl px-4 py-3 gap-2"
        >
          <span class="text-black-primary font-semibold text-base"
            >Template</span
          >
        </TemplateButton>
        <Import
          @click="onClickImportStudent"
          class="flex items-center flex-row justify-center border border-grey-secondary rounded-xl px-4 py-3 gap-2"
        >
          <span class="text-black-primary font-semibold text-base">Import</span>
        </Import>
        <Export
          @click="onClickExportStudent"
          class="flex items-center flex-row justify-center border border-grey-secondary rounded-xl px-4 py-3 gap-2"
        >
          <span class="text-black-primary font-semibold text-base">Export</span>
        </Export>
      </div>
    </div>
    <div class="border border-grey-secondary p-4 rounded-2xl">
      <div class="grid grid-cols-5 gap-4 pb-2 border-b">
        <div
          class="col-span-1 text-sm text-grey-primary flex items-center justify-center"
        >
          Student ID
        </div>
        <div
          class="col-span-2 text-sm text-grey-primary flex items-center justify-center"
        >
          Name
        </div>
        <div
          class="col-span-1 text-sm text-grey-primary flex items-center justify-center"
        >
          Status
        </div>
        <div
          class="col-span-1 text-sm text-grey-primary flex items-center justify-center"
        >
          Actions
        </div>
      </div>
      <div
        class="max-h-[calc(100vh-490px)] overflow-y-scroll scrollbar-set mt-2"
      >
        <div
          v-for="(student, index) in students"
          :key="student.id"
          class="contents"
        >
          <div
            class="grid grid-cols-5 gap-4 py-2 hover:cursor-pointer hover:bg-[#F6F8F8] hover:rounded-xl"
          >
            <div
              class="col-span-1 text-sm text-black-primary flex items-center justify-center"
            >
              {{ student.id }}
            </div>
            <div
              class="col-span-2 text-sm text-black-primary flex items-center justify-center"
            >
              {{ student.name }}
            </div>
            <div
              class="col-span-1 text-sm text-black-primary flex items-center justify-center"
            >
              {{ student.status }}
            </div>
            <div
              class="col-span-1 flex-row gap-4 flex items-center justify-center"
            >
              <button
                class="flex items-center justify-center bg-white rounded-xl p-2 border hover:bg-black-primary hover:text-white"
              >
                <ShowUser class="w-5 h-5" />
              </button>
              <button
                class="flex items-center justify-center rounded-xl p-2 border bg-white hover:bg-black-primary hover:text-white"
              >
                <Edit class="w-5 h-5" />
              </button>
              <button
                class="flex items-center justify-center rounded-xl p-2 border hover:bg-red-500 hover:text-white"
              >
                <Delete class="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-center items-center mt-2">
      <button
        v-if="currentPage != 1"
        @click="prevPage"
        class="flex items-center justify-center bg-white rounded-xl p-2 mr-2"
        :disabled="currentPage === 1"
      >
        <ArrowRight class="w-4 h-4 rotate-180" />
      </button>
      <div class="flex items-center justify-center gap-2">
        <span class="text-sm text-grey-primary">Page</span>
        <span class="text-sm text-black-primary font-semibold">{{
          currentPage
        }}</span>
        <span class="text-sm text-grey-primary">of</span>
        <span class="text-sm text-black-primary font-semibold">{{
          totalPages
        }}</span>
      </div>
      <button
        v-if="currentPage != totalPages"
        @click="nextPage"
        class="flex items-center justify-center bg-white rounded-xl p-2 ml-2"
        :disabled="currentPage === totalPages"
      >
        <ArrowRight class="w-4 h-4" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import TemplateButton from "@/components/button/TemplateButton.vue";
import Import from "@/components/button/ImportButton.vue";
import Export from "@/components/button/ExportButton.vue";
import Search from "@/components/icons/Search.vue";
import Status from "@/components/icons/Status.vue";
import ArrowUp from "@/components/icons/ArrowUp.vue";
import ArrowDown from "@/components/icons/ArrowDown.vue";
import Edit from "@/components/icons/Edit.vue";
import Delete from "@/components/icons/Delete.vue";
import ShowUser from "@/components/icons/ShowUser.vue";

const searchQuery = ref("");

const status = ref("default");

const toggleStatus = () => {
  if (status.value === "default") {
    status.value = "ascending";
  } else if (status.value === "ascending") {
    status.value = "descending";
  } else {
    status.value = "default";
  }
};
const statusClass = computed(() => {
  return status.value === "default"
    ? "bg-white text-black-primary"
    : " bg-black-primary text-white";
});

const getStudents = (query) => {};

const onClickAddStudent = () => {};

const exportStudent = () => {};

const onClickImportStudent = () => {};

const onClickExportStudent = () => {};

const students = ref(
  Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    name: `Student ${i + 1}`,
    status: i % 2 === 0 ? "Active" : "Inactive",
  }))
);

const currentPage = ref(1);
const totalPages = ref(1);

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};
</script>

<style lang="scss" scoped>
button {
  transition: background-color 0.3s ease;
}

.scrollbar-set {
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>

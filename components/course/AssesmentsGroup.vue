<template>
  <div class="flex flex-col gap-4 text-sm">
    <div class="flex flex-row justify-between gap-6 items-center w-full">
      <div class="flex flex-row gap-4">
        <div
          class="bg-black-primary text-white text-base px-6 py-3 rounded-xl flex"
        >
          Assignment Groups
        </div>
        <div
          class="px-4 py-3 bg-white border border-grey-secondary rounded-xl flex flex-row gap-4 items-center"
        >
          <input
            type="text"
            v-model="searchQuery"
            @keyup.enter="fetchEnrollments(course_id, searchQuery)"
            class="bg-transparent border-none focus:ring-0 outline-none text-base w-56"
            placeholder="Search..."
          />
          <button
            class="flex items-center justify-center bg-white rounded-xl"
            @click="fetchEnrollments(course_id, searchQuery)"
          >
            <Search class="w-6 h-6" />
          </button>
        </div>
      </div>
      <div class="flex flex-row gap-4">
        <TemplateButton
          class="flex items-center flex-row justify-center border border-grey-secondary rounded-xl px-4 py-3 gap-2"
        >
          <span class="text-black-primary font-semibold text-base"
            >Template</span
          >
        </TemplateButton>
        <Import
          class="flex items-center flex-row justify-center border border-grey-secondary rounded-xl px-4 py-3 gap-2"
        >
          <span class="text-black-primary font-semibold text-base">Import</span>
        </Import>
        <Export
          class="flex items-center flex-row justify-center border border-grey-secondary rounded-xl px-4 py-3 gap-2"
        >
          <span class="text-black-primary font-semibold text-base">Export</span>
        </Export>
      </div>
    </div>
    <div class="px-6 py-4 border border-grey-tertiary rounded-xl">
      <div class="grid grid-cols-5 pb-2 border-b border-grey-tertiary">
        <div class="font-semibold col-span-3">Assessment Group Name</div>
        <div class="font-semibold w-full text-center">Max Weighted Score</div>
        <div class="font-semibold w-full text-center">Action</div>
      </div>
      <div class="grid grid-cols-5 gap-2 mt-4">
        <div v-for="group in assessmentGroups" :key="group.id" class="contents">
          <div class="col-span-3">
            {{ group.name }}
          </div>
          <div class="text-center">
            {{ group.maxWeightedScore }}
          </div>
          <div class="flex flex-row gap-2 items-center justify-center">
            <button
              @click="showGroup(group.id, group.name)"
              class="flex items-center justify-center bg-white rounded-xl p-2 border hover:bg-black-primary hover:text-white"
            >
              <ShowUser class="w-5 h-5" />
            </button>
            <button
              @click="editGroup(group.id)"
              class="flex items-center justify-center bg-white rounded-xl p-2 border hover:bg-black-primary hover:text-white"
            >
              <Edit class="w-5 h-5" />
            </button>
            <button
              @click="deleteGroup(group.id)"
              class="flex items-center justify-center rounded-xl p-2 border hover:bg-red-500 hover:text-white"
            >
              <Delete class="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import TemplateButton from "@/components/button/TemplateButton.vue";
import Import from "@/components/button/ImportButton.vue";
import Export from "@/components/button/ExportButton.vue";
import Search from "@/components/icons/Search.vue";
import Edit from "@/components/icons/Edit.vue";
import Delete from "@/components/icons/Delete.vue";
import ShowUser from "@/components/icons/ShowUser.vue";

const searchQuery = ref("");
const course_id = ref(1);
const assessmentGroups = ref([
  { id: 15456, name: "Group 1", maxWeightedScore: 100 },
  { id: 21321, name: "Group 2", maxWeightedScore: 90 },
]);

const fetchEnrollments = (courseId, query) => {};

const router = useRouter();

const showGroup = (groupId, groupName) => {
  router.push({
    path: `/courses/assessments/groups/${groupId}`,
    query: { name: groupName },
  });
};

const editGroup = (groupId) => {};
const deleteGroup = (groupId) => {};
</script>

<style lang="scss" scoped>
.scrollbar-set {
  scrollbar-width: thin;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 10px;
    border: 2px solid #f1f1f1;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
}
</style>
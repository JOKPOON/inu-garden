<template>
  <div class="flex flex-col gap-4 text-sm">
    <div class="flex flex-row justify-between gap-6 items-center w-full">
      <div class="flex flex-row gap-4">
        <div
          class="bg-black-primary text-white text-base px-6 py-3 rounded-xl flex"
        >
          Assignment Groups
        </div>
      </div>
      <div class="flex flex-row gap-4">
        <Export
          class="flex items-center flex-row justify-center border border-grey-secondary rounded-xl px-4 py-3 gap-2"
        >
          <span class="text-black-primary font-semibold text-base">Export</span>
        </Export>
      </div>
    </div>
    <div class="px-2 py-4 border border-grey-tertiary rounded-xl">
      <div class="grid grid-cols-5 pb-2 border-b border-grey-tertiary px-4">
        <div class="font-semibold col-span-3">Assessment Group Name</div>
        <div class="font-semibold w-full text-center">Max Weighted Score</div>
        <div class="font-semibold w-full text-center">Action</div>
      </div>
      <div
        v-for="group in assessmentGroups"
        :key="group.id"
        class="contents rounded-xl"
      >
        <div
          @click="showGroup(group.id, group.name)"
          class="grid grid-cols-5 gap-2 mt-4 hover:cursor-pointer hover:bg-[#F6F8F8] px-4 rounded-xl py-2 items-center"
        >
          <div class="col-span-3">
            {{ group.name }}
          </div>
          <div class="text-center">
            {{ group.weight }}
          </div>
          <div class="flex flex-row gap-2 items-center justify-center">
            <button
              @click="showGroup(group.id, group.name)"
              class="flex items-center justify-center bg-white rounded-xl p-2 border hover:bg-black-primary hover:text-white"
            >
              <ShowUser class="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import Export from "@/components/button/ExportButton.vue";
import ShowUser from "@/components/icons/ShowUser.vue";
import { fetchAssignmentGroup } from "~/api/api";

const searchQuery = ref("");
const router = useRouter();
const route = useRoute();
const course_code = route.query.code;
const course_id = router.currentRoute.value.params.id;

const assessmentGroups = ref([]);

const showGroup = (groupId, groupName) => {
  router.push({
    path: `/courses/assessments/groups-of/${course_id}`,
    query: {
      code: course_code,
      name: groupName,
      groupId: groupId,
    },
  });
};

onMounted(async () => {
  await fetchAssignmentGroup(assessmentGroups, false, "", course_id);
  console.log(assessmentGroups.value);
});
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

.hover\\:bg-grey-light:hover {
  background-color: #f6f8f8;
}
</style>

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
        <div v-for="student in students" :key="student.id" class="contents">
          <div
            class="grid grid-cols-5 gap-4 py-2 hover:cursor-pointer hover:bg-[#F6F8F8] hover:rounded-xl border-b border-grey-tertiary"
          >
            <div
              class="col-span-1 text-sm text-black-primary flex items-center justify-center"
            >
              {{ student.student_id }}
            </div>
            <div
              class="col-span-2 text-sm text-black-primary flex items-center justify-center"
            >
              {{ student.first_name }} {{ student.last_name }}
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
import base_url from "@/config/api";

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

const onClickAddStudent = () => {};

const exportStudent = () => {};

const onClickImportStudent = () => {};

const onClickExportStudent = () => {};

const students = ref([]);

const currentPage = ref(1);
const totalPages = ref(1);

//TODO: Get course id
const course_id = ref("01JKNGF1F05NF2TH1JX3BJKAQZ");

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

//Create enrollment
//status: ENROLL OR WITHDRAW
//student_ids: Array of student ids (6XXXXX)
const CreateEnrollment = async (student_ids, course_id, status) => {
  try {
    const response = await fetch(`${base_url}enrollments`, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        course_id: course_id,
        student_ids: student_ids,
        status: status,
      }),
    });

    if (!response.ok) throw new Error("Failed to create enrollment");
    const res = await response.json();
    console.log(res);
  } catch (error) {
    console.error("Error fetching students:", error);
  }
};

//Delete enrollment
const DeleteEnrollment = async (id) => {
  try {
    const response = await fetch(`${base_url}enrollments/${id}`, {
      credentials: "include",
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) throw new Error("Failed to delete enrollment");
    const res = await response.json();
    console.log(res);
  } catch (error) {
    console.error("Error fetching students:", error);
  }
};

//Update enrollment status to ENROLL OR WITHDRAW
const UpdateEnrollment = async (id, status) => {
  try {
    const response = await fetch(`${base_url}enrollments/${id}`, {
      credentials: "include",
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        status: status,
      }),
    });

    if (!response.ok) throw new Error("Failed to update enrollment");
    const res = await response.json();
    console.log(res);
  } catch (error) {
    console.error("Error fetching students:", error);
  }
};

//Fetch enrollments
const fetchEnrollments = async (course_id, searchQuery) => {
  try {
    const response = await fetch(
      `${base_url}courses/${course_id}/enrollments?query=${searchQuery}`,
      {
        credentials: "include",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) throw new Error("Failed to fetch students");
    const res = await response.json();
    students.value = res.data;
  } catch (error) {
    console.error("Error fetching students:", error);
  }
};

onMounted(() => {
  fetchEnrollments(course_id.value, searchQuery.value);
});
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

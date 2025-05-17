<template>
  <div class="flex flex-col gap-4 p-4 pb-0">
    <!-- Header Section -->
    <div class="flex flex-row justify-between gap-6 items-center w-full">
      <div class="flex flex-col">
        <div class="text-2xl font-semibold text-black-primary">Students</div>
        <div class="text-sm text-grey-primary">Students in Inu system</div>
      </div>
      <div class="flex flex-col">
        <div class="text-base text-black-primary font-semibold text-end">
          Total
        </div>
        <div class="text-base text-grey-primary text-end -mt-2">
          <span class="font-semibold text-2xl text-black-primary">{{
            Students.total
          }}</span>
          Students
        </div>
      </div>
    </div>

    <!-- Search and Actions Section -->
    <div class="flex flex-row justify-between gap-6 items-center w-full">
      <div class="flex">
        <div
          class="px-4 py-3 bg-white border border-grey-secondary rounded-xl flex flex-row gap-4 items-center shadow-sm"
        >
          <input
            type="text"
            v-model="searchQuery"
            @input="debouncedSearch"
            class="bg-transparent border-none focus:ring-0 outline-none text-base w-48"
            placeholder="Search..."
            aria-label="Search students"
          />
          <button
            class="flex items-center justify-center bg-white rounded-xl hover:bg-grey-secondary"
            @click="getStudent(searchQuery)"
            aria-label="Search button"
          >
            <Search class="w-6 h-6" />
          </button>
        </div>
      </div>
      <div class="flex flex-row gap-4">
        <AddUserButton
          @click="onClickAddStudent"
          class="flex items-center flex-row justify-center border border-grey-secondary rounded-xl px-4 py-3 gap-2"
          aria-label="Add Student"
        >
          <span class="text-black-primary font-semibold text-base"
            >Add Student</span
          >
        </AddUserButton>
        <TemplateButton
          @click="exportStudent"
          class="flex items-center flex-row justify-center border border-grey-secondary rounded-xl px-4 py-3 gap-2"
          aria-label="Export Template"
        >
          <span class="text-black-primary font-semibold text-base"
            >Template</span
          >
        </TemplateButton>
        <Import
          @click="onClickImportStudent"
          class="flex items-center flex-row justify-center border border-grey-secondary rounded-xl px-4 py-3 gap-2"
          aria-label="Import Students"
        >
          <span class="text-black-primary font-semibold text-base">Import</span>
        </Import>
      </div>
    </div>

    <!-- Table Section -->
    <div class="border border-grey-secondary rounded-2xl relative">
      <div
        class="flex flex-col gap-4 p-4 pb-0 max-w-full max-h-[calc(100vh-380px)] overflow-auto scrollbar-set"
        :class="{
          'max-w-[calc(100vw-280px)]': smallNav,
          'max-w-[calc(100vw-485px)]': !smallNav,
        }"
      >
        <table
          class="table-auto w-full h-full text-sm text-left text-grey-primary border-collapse"
        >
          <thead class="text-sm text-grey-primary">
            <tr>
              <th
                v-for="column in columns"
                :key="column.key"
                class="px-4 py-3 border-b border-grey-secondary font-normal cursor-pointer"
                @click="sortBy(column.key)"
              >
                <div class="flex flex-row gap-2 items-center">
                  {{ column.label }}
                  <div v-if="sortKey === column.key">
                    <span v-if="sortOrder === 'asc'">
                      <ArrowRight class="w-4 h-4 rotate-90"
                    /></span>
                    <span v-else>
                      <ArrowRight class="w-4 h-4 -rotate-90"
                    /></span>
                  </div>
                </div>
              </th>
              <th class="px-4 py-3 border-b border-grey-secondary font-normal">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="user in Students.students"
              :key="user.id"
              class="hover:bg-[#F6F8F8] text-black-primary hover:cursor-pointer"
            >
              <td
                @click="openPopup(user.id, 'show')"
                class="px-4 py-3 border-b border-grey-secondary"
              >
                {{ user.id }}
              </td>
              <td
                @click="openPopup(user.id, 'show')"
                class="px-4 py-3 border-b border-grey-secondary"
              >
                {{ user?.first_name_th }} {{ user?.last_name_th }} <br />
                {{ user?.first_name_en }} {{ user?.last_name_en }}
              </td>
              <td
                @click="openPopup(user.id, 'show')"
                class="px-4 py-3 border-b border-grey-secondary"
              >
                {{ user.email }}
              </td>
              <td
                @click="openPopup(user.id, 'show')"
                class="px-4 py-3 border-b border-grey-secondary"
              >
                {{ user.department.name_th }} <br />
                {{ user.department.name_en }}
              </td>
              <td
                @click="openPopup(user.id, 'show')"
                class="px-4 py-3 border-b border-grey-secondary"
              >
                {{ user.programme.name_th }} <br />
                {{ user.programme.name_en }}
              </td>

              <td
                @click="openPopup(user.id, 'show')"
                class="px-4 py-3 border-b border-grey-secondary"
              >
                {{ user.year }}
              </td>
              <td class="px-4 py-3 border-b border-grey-secondary">
                <div class="flex-row gap-4 flex items-center justify-center">
                  <button
                    class="flex items-center justify-center bg-white rounded-xl p-2 border hover:bg-black-primary hover:text-white"
                    @click="openPopup(user, 'show')"
                    aria-label="Show Student"
                  >
                    <ShowUser class="w-5 h-5" />
                  </button>
                  <button
                    @click="openPopup(user.id, 'edit')"
                    class="flex items-center justify-center rounded-xl p-2 border bg-white hover:bg-black-primary hover:text-white"
                    aria-label="Edit Student"
                  >
                    <Edit class="w-5 h-5" />
                  </button>
                  <button
                    @click="openPopup(user.id, 'delete')"
                    class="flex items-center justify-center rounded-xl p-2 border hover:bg-red-500 hover:text-white"
                    aria-label="Delete Student"
                  >
                    <Delete class="w-5 h-5" />
                  </button>
                </div>
              </td>
            </tr>
            <!-- <tr v-if="filteredStudents.length === 0">
              <td colspan="13" class="text-center py-6">
                <div class="flex justify-center items-center">
                  <img
                    :src="BannerLogin"
                    alt="No Students Found"
                    class="w-56 max-w-md object-cover rounded-2xl mb-4"
                  />
                </div>
                <div class="text-center font-semibold text-grey-primary">
                  No students match your search criteria.
                </div>
              </td>
            </tr> -->
          </tbody>
        </table>
      </div>
    </div>
    <div class="flex justify-center items-center mt-2">
      <button
        v-if="currentPage > 1"
        @click="prevPage"
        class="flex items-center justify-center bg-white rounded-xl p-2 mr-2"
        :disabled="currentPage === 1"
        aria-label="Previous Page"
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
        v-if="currentPage < totalPages"
        @click="nextPage"
        class="flex items-center justify-center bg-white rounded-xl p-2 ml-2"
        :disabled="currentPage === totalPages"
        aria-label="Next Page"
      >
        <ArrowRight class="w-4 h-4" />
      </button>
    </div>
  </div>
  <AddStudent v-if="showAddStudentPopup" @close="showAddStudentPopup = false" />
  <ShowStudentDetails
    v-if="showStudentDetailsPopup"
    @close="showStudentDetailsPopup = false"
    :Student="selectedStudent"
  />
  <EditStudentPage
    v-if="showEditStudentPopup"
    @close="showEditStudentPopup = false"
    :Student="selectedStudent"
  />
  <DeleteStudentPage
    v-if="showDeleteStudentPopup"
    @close="showDeleteStudentPopup = false"
    :Student="selectedStudent"
  />
</template>

<script setup>
import { ref, onMounted, defineProps } from "vue";
import { useI18n } from "vue-i18n";
import AddUserButton from "@/components/button/AddUserButton.vue";
import TemplateButton from "@/components/button/TemplateButton.vue";
import Import from "@/components/button/ImportButton.vue";
import Search from "@/components/icons/Search.vue";
import ShowUser from "@/components/icons/ShowUser.vue";
import Edit from "@/components/icons/Edit.vue";
import Delete from "@/components/icons/Delete.vue";
import ArrowRight from "@/components/icons/ArrowRight.vue";
import AddStudent from "@/components/popups/AddStudentsPage.vue";
import ShowStudentDetails from "@/components/popups/ShowStudentDetails.vue";
import EditStudentPage from "@/components/popups/EditStudentPage.vue";
import DeleteStudentPage from "@/components/popups/DeleteStudentPage.vue";
import { fetchStudents } from "~/api/api";

const { t } = useI18n();

const props = defineProps({
  smallNav: {
    type: Boolean,
    default: false,
    required: true,
  },
});

useHead({
  title: "Inu - Students",
  description: t("seo.desc"),
});

definePageMeta({
  layout: "landing",
});

const columns = [
  { key: "studentId", label: "Student ID" },
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "department", label: "Department" },
  { key: "program", label: "Program" },
  { key: "year", label: "Year" },
];

const searchQuery = ref("");
const currentPage = ref(1);
const itemsPerPage = 10;
const Students = ref([]);
const totalPages = ref(10);

const getStudent = async (query) => {
  await fetchStudents(Students, query);
  console.log("Searching for:", query);
};

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};

const showAddStudentPopup = ref(false);

const onClickAddStudent = () => {
  showAddStudentPopup.value = true;
};

const exportStudent = () => {
  console.log("Export Student button clicked");
};

const onClickImportStudent = () => {
  console.log("Import Student button clicked");
};

const showStudentDetailsPopup = ref(false);
const showEditStudentPopup = ref(false);
const showDeleteStudentPopup = ref(false);
const selectedStudent = ref(null);

const openPopup = (id, action) => {
  selectedStudent.value = id;
  if (action === "show") {
    showStudentDetailsPopup.value = true;
  } else if (action === "edit") {
    showEditStudentPopup.value = true;
  } else if (action === "delete") {
    showDeleteStudentPopup.value = true;
  }
};

onMounted(async () => {
  await fetchStudents(
    Students,
    "",
    "",
    "",
    "",
    itemsPerPage,
    currentPage.value
  );

  console.log("Students:", Students.value);
  totalPages.value = Students.value.total_page;
});

watch(
  () => currentPage.value,
  async (newPage) => {
    await fetchStudents(Students, "", "", "", "", itemsPerPage, newPage - 1);
  }
);
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

table {
  word-wrap: break-word;
  word-break: break-word;
  overflow-wrap: break-word;
}

td,
th {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>

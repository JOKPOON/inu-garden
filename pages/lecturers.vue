<template>
  <div class="flex flex-col gap-4 p-4 pb-0">
    <div class="flex flex-row justify-between gap-6 items-center w-full">
      <div class="flex flex-col">
        <div class="text-2xl font-semibold text-black-primary">Lecturers</div>
        <div class="text-sm text-grey-primary">Users in Inu system</div>
      </div>
      <div class="flex flex-col">
        <div class="text-base text-black-primary font-semibold text-end">
          Total
        </div>
        <div class="text-base text-grey-primary text-end -mt-2">
          <span class="font-semibold text-2xl text-black-primary">{{
            totalUsers
          }}</span>
          Lecturers
        </div>
      </div>
    </div>
    <div class="flex flex-row justify-between gap-6 items-center w-full">
      <div class="flex">
        <div
          class="px-4 py-3 bg-white border border-grey-secondary rounded-xl flex flex-row gap-4 items-center"
        >
          <input
            type="text"
            v-model="searchQuery"
            @keyup.enter="getUsers(searchQuery)"
            class="bg-transparent border-none focus:ring-0 outline-none text-base w-48"
            placeholder="Search..."
          />
          <button
            class="flex items-center justify-center bg-white rounded-xl"
            @click="getUsers(searchQuery)"
          >
            <Search class="w-6 h-6" />
          </button>
        </div>
      </div>
      <div class="flex flex-row gap-4">
        <AddUserButton
          @click="onClickAddUser"
          class="flex items-center flex-row justify-center border border-grey-secondary rounded-xl px-4 py-3 gap-2"
        >
          <span class="text-black-primary font-semibold text-base"
            >Add Lecturer</span
          >
        </AddUserButton>
        <TemplateButton
          @click="exportUser"
          class="flex items-center flex-row justify-center border border-grey-secondary rounded-xl px-4 py-3 gap-2"
        >
          <span class="text-black-primary font-semibold text-base"
            >Template</span
          >
        </TemplateButton>
        <Import
          @click="onClickImportUser"
          class="flex items-center flex-row justify-center border border-grey-secondary rounded-xl px-4 py-3 gap-2"
        >
          <span class="text-black-primary font-semibold text-base">Import</span>
        </Import>
      </div>
    </div>
    <div class="border border-grey-secondary p-4 rounded-2xl">
      <div class="grid grid-cols-5 gap-4 pb-2 border-b">
        <div
          class="col-span-1 text-sm text-grey-primary flex items-center justify-center"
        >
          Name
        </div>
        <div
          class="col-span-2 text-sm text-grey-primary flex items-center justify-center"
        >
          Email
        </div>
        <div
          class="col-span-1 text-sm text-grey-primary flex items-center justify-center"
        >
          Role
        </div>
        <div
          class="col-span-1 text-sm text-grey-primary flex items-center justify-center"
        >
          Actions
        </div>
      </div>
      <div
        v-if="Users.length > 0"
        class="max-h-[calc(100vh-450px)] overflow-y-scroll scrollbar-set mt-2"
      >
        <div v-for="(user, index) in Users" :key="user.id" class="contents">
          <div
            @click="openPopup(user.id)"
            class="grid grid-cols-5 gap-4 py-2 hover:cursor-pointer hover:bg-[#F6F8F8] hover:rounded-xl"
            :class="[
              'border-b',
              { 'border-grey-tertiary': index !== paginatedUsers.length - 1 },
            ]"
          >
            <div
              class="col-span-1 text-sm text-black-primary flex items-center justify-start pl-4"
            >
              {{ user.title_en_short }} {{ user.first_name_en }}
              {{ user.last_name_en }} <br />
              {{ user.title_th_short }} {{ user.first_name_th }}
              {{ user.last_name_th }}
            </div>
            <div
              class="col-span-2 text-sm text-black-primary flex items-center justify-center"
            >
              {{ user.email }}
            </div>
            <div
              class="text-sm text-black-primary text-start mt-1 flex flex-wrap gap-2 items-center"
            >
              <span
                v-for="(role, index) in user.role"
                :key="index"
                class="p-1 px-3 bg-grey-tertiary rounded-lg border"
              >
                {{
                  role
                    .replace(/_/g, " ")
                    .toLowerCase()
                    .replace(/\b\w/g, (char) => char.toUpperCase())
                }}
              </span>
            </div>
            <div
              class="col-span-1 flex-row gap-4 flex items-center justify-center"
            >
              <button
                class="flex items-center justify-center bg-white rounded-xl p-2 border hover:bg-black-primary hover:text-white"
                @click="openPopup(user.id, 'show')"
              >
                <ShowUser class="w-5 h-5" />
              </button>
              <button
                @click="openPopup(user.id, 'edit')"
                class="flex items-center justify-center rounded-xl p-2 border bg-white hover:bg-black-primary hover:text-white"
              >
                <Edit class="w-5 h-5" />
              </button>
              <button
                @click="openPopup(user.id, 'delete')"
                class="flex items-center justify-center rounded-xl p-2 border hover:bg-red-500 hover:text-white"
              >
                <Delete class="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        v-else
        class="flex items-center justify-center flex-col pt-4"
      >
        <img
          :src="BannerLogin"
          alt="Banner Login"
          class="w-56 max-w-md object-cover rounded-2xl mb-4"
        />
        <div class="text-center font-semibold text-grey-primary">
          No lecturer found!
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
    <Lecturers
      v-if="showUserPopup"
      :userId="selectedUserId"
      :editMode="editMode"
      :deleteMode="deleteMode"
      @close="showUserPopup = false"
    />
    <AddLecturer v-if="showAddUserPopup" @close="showAddUserPopup = false" />
    <ImportUser
      v-if="showImportUserPopup"
      @close="showImportUserPopup = false"
    />
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import Lecturers from "@/components/popups/Lecturers.vue";
import AddLecturer from "@/components/popups/AddLecturer.vue";
import ImportUser from "@/components/popups/ImportUser.vue";
import AddUserButton from "@/components/button/AddUserButton.vue";
import TemplateButton from "@/components/button/TemplateButton.vue";
import Import from "@/components/button/ImportButton.vue";
import Search from "@/components/icons/Search.vue";
import ShowUser from "@/components/icons/ShowUser.vue";
import ArrowRight from "@/components/icons/ArrowRight.vue";
import base_url from "@/config/api";
import Edit from "@/components/icons/Edit.vue";
import Delete from "@/components/icons/Delete.vue";
import BannerLogin from "@/components/images/BannerLogin.jpg";
import * as XLSX from "xlsx";
const { t } = useI18n();

const user = ref({
  picture: "",
  pictureName: "",
  title_en: "",
  title_th: "",
  title_en_short: "",
  title_th_short: "",
  academic_position_en: "",
  academic_position_th: "",
  first_name_en: "",
  last_name_en: "",
  first_name_th: "",
  last_name_th: "",
  email: "",
  role: [""],
  degree_en: [""],
  degree_th: [""],
});

const exportUser = () => {
  const data = [
    [
      "Picture",
      "Title (EN)",
      "Title (TH)",
      "Title Short (EN)",
      "Title Short (TH)",
      "Academic Position (EN)",
      "Academic Position (TH)",
      "First Name (EN)",
      "Last Name (EN)",
      "First Name (TH)",
      "Last Name (TH)",
      "Email",
      "Role",
      "Degree (EN)",
      "Degree (TH)",
    ],
    [
      user.value.picture,
      user.value.title_en,
      user.value.title_th,
      user.value.title_en_short,
      user.value.title_th_short,
      user.value.academic_position_en,
      user.value.academic_position_th,
      user.value.first_name_en,
      user.value.last_name_en,
      user.value.first_name_th,
      user.value.last_name_th,
      user.value.email,
      user.value.role.join(";"),
      user.value.degree_en.join(";"),
      user.value.degree_th.join(";"),
    ],
  ];

  const worksheet = XLSX.utils.aoa_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Lecturers");

  XLSX.writeFile(workbook, "lecturer.xlsx");
};

const searchQuery = ref("");
const currentPage = ref(1);
const itemsPerPage = 20;
const showUserPopup = ref(false);
const showAddUserPopup = ref(false);
const showImportUserPopup = ref(false);
const selectedUserId = ref(null);

const getUsers = (query, page, size) => {
  if (!page) {
    page = 1;
  }
  if (!size) {
    size = 20;
  }

  if (!query) {
    query = "";
  }

  fetch(
    base_url +
      "users?pageIndex=" +
      page +
      "&pageSize=" +
      size +
      "&query=" +
      query,
    {
      credentials: "include",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        console.log(res);
        res.data.data.forEach((user) => {
          user.role = user.role.split(",");
        });
        Users.value = res.data.data;
        totalUsers.value = res.data.data.length;
        totalPages.value = res.data.total_page;
      } else {
        console.log(res.error.message);
      }
    });
};

onMounted(() => {
  getUsers();
});

watch(currentPage, (newPage) => {
  getUsers(searchQuery.value, newPage, itemsPerPage);
});

watch(showUserPopup, (newVal) => {
  if (!newVal) {
    getUsers();
  }
});

watch(showAddUserPopup, (newVal) => {
  if (!newVal) {
    getUsers();
  }
});

watch(showImportUserPopup, (newVal) => {
  if (!newVal) {
    getUsers();
  }
});

const Users = ref([]);

const onClickAddUser = () => {
  showAddUserPopup.value = true;
};

const onClickImportUser = () => {
  showImportUserPopup.value = true;
};

const totalUsers = ref(0);
const totalPages = ref(0);

const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return Users.value.slice(start, end);
});

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

const editMode = ref(false);
const deleteMode = ref(false);

const openPopup = (userId, action) => {
  selectedUserId.value = userId;
  showUserPopup.value = true;

  if (action === "show") {
    editMode.value = false;
    deleteMode.value = false;
  }

  if (action === "edit") {
    editMode.value = true;
    deleteMode.value = false;
  }

  if (action === "delete") {
    editMode.value = false;
    deleteMode.value = true;
  }
};

useHead({
  title: "Inu - Lecturers",
  description: t("seo.desc"),
});

definePageMeta({
  layout: "landing",
});
</script>

<style lang="scss" scoped>
.scrollbar-set {
  scrollbar-width: thin;

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

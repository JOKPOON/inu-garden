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
            class="bg-transparent border-none focus:ring-0 outline-none text-base w-56"
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
        class="max-h-[calc(100vh-450px)] overflow-y-scroll scrollbar-set mt-2"
      >
        <div v-for="(user, index) in Users" :key="user.id" class="contents">
          <div
            class="grid grid-cols-5 gap-4 py-2"
            :class="[
              'border-b',
              { 'border-grey-tertiary': index !== paginatedUsers.length - 1 },
            ]"
          >
            <div
              class="col-span-1 text-sm text-black-primary flex items-center justify-center"
            >
              {{ user.academic_position_en }} {{ user.first_name_en }}
              {{ user.last_name_en }}
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
                class="flex items-center justify-center bg-white rounded-xl p-2 border"
                @click="openPopup(user.id)"
              >
                <ShowUser class="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
 
    </div>     <div class="flex justify-center items-center mt-2">
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
import { useUserStore } from "@/store/user";
const { t } = useI18n();

const user = ref({
  picture: "",
  pictureName: "",
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
  const csvContent = [
    [
      "Picture",
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
  ]
    .map((e) => e.join(","))
    .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", "lecturer.csv");
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const searchQuery = ref("");
const currentPage = ref(1);
const itemsPerPage = 20;
const showUserPopup = ref(false);
const showAddUserPopup = ref(false);
const showImportUserPopup = ref(false);
const selectedUserId = ref(null);

const handleSearch = () => {};

const getUsers = (page, size) => {
  if (!page) {
    page = 1;
  }
  if (!size) {
    size = 20;
  }

  fetch(base_url + "users?pageIndex=" + page + "&pageSize=" + size, {
    credentials: "include",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        console.log(res);
        res.data.data.forEach((user) => {
          user.role = user.role.split(",");
        });
        Users.value = res.data.data;
        totalUsers.value = res.data.total;
        totalPages.value = res.data.total_page;
      } else {
        console.log(res.error.message);
      }
    });
};

onMounted(() => {
  getUsers();
});

const userStore = useUserStore();



watch(currentPage, (newPage) => {
  getUsers(newPage);
  console.log("User", Users);
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

const openPopup = (id) => {
  selectedUserId.value = id;
  showUserPopup.value = true;
};

useHead({
  title: t("seo.title"),
  description: t("seo.desc"),
});

definePageMeta({
  layout: "landing",
});
</script>

<style lang="scss" scoped>
.scrollbar-set {
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
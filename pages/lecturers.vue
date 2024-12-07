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
          @click="addUser"
          class="flex items-center flex-row justify-center border border-grey-secondary rounded-xl px-4 py-3 gap-2"
        >
          <span class="text-black-primary font-semibold text-base"
            >Add Lecturer</span
          >
        </AddUserButton>
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
        <div v-for="user in paginatedUsers" :key="user.id" class="contents">
          <div class="grid grid-cols-5 gap-4 py-2"
          :class="[
            'border-b',
            { 'border-grey-tertiary': index !== paginatedUsers.length - 1 },
          ]"
          >
            <div
              class="col-span-1 text-sm text-black-primary flex items-center justify-center"
            >
              {{ user.first_name }} {{ user.last_name }}
            </div>
            <div
              class="col-span-2 text-sm text-black-primary flex items-center justify-center"
            >
              {{ user.email }}
            </div>
            <div
              class="text-sm text-black-primary text-start mt-1 flex flex-col gap-2"
            >
              <role v-for="(role, index) in user.role" :key="index">
                <div class="p-1 px-3 bg-grey-tertiary rounded-lg border">
                  {{ role }}
                </div>
              </role>
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
    </div>
    <div class="flex justify-center items-center mt-2">
      <button
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
        @click="nextPage"
        class="flex items-center justify-center bg-white rounded-xl p-2 ml-2"
        :disabled="currentPage === totalPages"
      >
        <ArrowRight class="w-4 h-4" />
      </button>
    </div>
  </div>
  <Lecturers
    v-if="showUserPopup"
    :userId="selectedUserId"
    @close="showUserPopup = false"
  />
  <AddLecturer v-if="showAddUserPopup" @close="showAddUserPopup = false" />
</template>

<script setup>
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import Lecturers from "@/components/popups/Lecturers.vue";
import AddLecturer from "@/components/popups/AddLecturer.vue";
import AddUserButton from "@/components/button/AddUserButton.vue";
import TemplateButton from "@/components/button/TemplateButton.vue";
import Import from "@/components/button/ImportButton.vue";
import Search from "@/components/icons/Search.vue";
import ShowUser from "@/components/icons/ShowUser.vue";
import ArrowRight from "@/components/icons/ArrowRight.vue";

const { t } = useI18n();

const searchQuery = ref("");
const currentPage = ref(1);
const itemsPerPage = 20;
const showUserPopup = ref(false);
const showAddUserPopup = ref(false);
const selectedUserId = ref(null);

const addUser = () => {
  showAddUserPopup.value = true;
};

const UsersPage1 = ref([
  {
    id: 1,
    first_name: "Daniel",
    last_name: "Smith",
    email: "daniel.smith@gmail.com",
    role: ["Lecturer", "Moderator", "Criteria Manager"],
    courses: ["CSC101", "CSC102"],
  },
  {
    id: 2,
    first_name: "Sarah",
    last_name: "Johnson",
    email: "sarah.johnson@gmail.com",
    role: ["Lecturer", "Criteria Manager"],
    courses: ["CSC103", "CSC104"],
  },
  {
    id: 3,
    first_name: "James",
    last_name: "Williams",
    email: "james.williams@gmail.com",
    role: ["Lecturer"],
    courses: ["CSC105", "CSC106"],
  },
  {
    id: 4,
    first_name: "Patricia",
    last_name: "Brown",
    email: "patricia.brown@gmail.com",
    role: ["Lecturer"],
    courses: ["CSC107", "CSC108"],
  },
  {
    id: 5,
    first_name: "Robert",
    last_name: "Jones",
    email: "robert.jones@gmail.com",
    role: ["Lecturer"],
    courses: ["CSC109", "CSC110"],
  },
  {
    id: 6,
    first_name: "Linda",
    last_name: "Garcia",
    email: "linda.garcia@gmail.com",
    role: ["Lecturer"],
    courses: ["CSC111", "CSC112"],
  },
  {
    id: 7,
    first_name: "Michael",
    last_name: "Martinez",
    email: "michael.martinez@gmail.com",
    role: ["Lecturer", "Moderator", "Criteria Manager"],
    courses: ["CSC113", "CSC114"],
  },
  {
    id: 8,
    first_name: "Barbara",
    last_name: "Rodriguez",
    email: "barbara.rodriguez@gmail.com",
    role: ["Lecturer"],
    courses: ["CSC115", "CSC116"],
  },
  {
    id: 9,
    first_name: "William",
    last_name: "Hernandez",
    email: "william.hernandez@gmail.com",
    role: ["Lecturer"],
    courses: ["CSC117", "CSC118"],
  },
  {
    id: 10,
    first_name: "Elizabeth",
    last_name: "Lopez",
    email: "elizabeth.lopez@gmail.com",
    role: ["Lecturer", "Moderator", "Criteria Manager"],
    courses: ["CSC119", "CSC120"],
  },
  {
    id: 11,
    first_name: "David",
    last_name: "Gonzalez",
    email: "david.gonzalez@gmail.com",
    role: ["Lecturer", "Criteria Manager"],
    courses: ["CSC121", "CSC122"],
  },
  {
    id: 12,
    first_name: "Jennifer",
    last_name: "Wilson",
    email: "jennifer.wilson@gmail.com",
    role: ["Lecturer", "Moderator", "Criteria Manager"],
    courses: ["CSC123", "CSC124"],
  },
  {
    id: 13,
    first_name: "Richard",
    last_name: "Anderson",
    email: "richard.anderson@gmail.com",
    role: ["Lecturer"],
    courses: ["CSC125", "CSC126"],
  },
  {
    id: 14,
    first_name: "Maria",
    last_name: "Thomas",
    email: "maria.thomas@gmail.com",
    role: ["Lecturer"],
    courses: ["CSC127", "CSC128"],
  },
  {
    id: 15,
    first_name: "Charles",
    last_name: "Taylor",
    email: "charles.taylor@gmail.com",
    role: ["Lecturer"],
    courses: ["CSC129", "CSC130"],
  },
  {
    id: 16,
    first_name: "Susan",
    last_name: "Moore",
    email: "susan.moore@gmail.com",
    role: ["Lecturer"],
    courses: ["CSC131", "CSC132"],
  },
  {
    id: 17,
    first_name: "Joseph",
    last_name: "Jackson",
    email: "joseph.jackson@gmail.com",
    role: ["Lecturer"],
    courses: ["CSC133", "CSC134"],
  },
  {
    id: 18,
    first_name: "Margaret",
    last_name: "Martin",
    email: "margaret.martin@gmail.com",
    role: ["Lecturer"],
    courses: ["CSC135", "CSC136"],
  },
  {
    id: 19,
    first_name: "Thomas",
    last_name: "Lee",
    email: "thomas.lee@gmail.com",
    role: ["Lecturer"],
    courses: ["CSC137", "CSC138"],
  },
  {
    id: 20,
    first_name: "Jessica",
    last_name: "Perez",
    email: "jessica.perez@gmail.com",
    role: ["Lecturer"],
    courses: ["CSC139", "CSC140"],
  },
]);

const UsersPage2 = ref([
  {
    id: 21,
    first_name: "Christopher",
    last_name: "Thompson",
    email: "christopher.thompson@gmail.com",
    role: ["Lecturer"],
    courses: ["CSC141", "CSC142"],
  },
  {
    id: 22,
    first_name: "Amanda",
    last_name: "White",
    email: "amanda.white@gmail.com",
    role: ["Lecturer"],
    courses: ["CSC143", "CSC144"],
  },
  {
    id: 23,
    first_name: "Matthew",
    last_name: "Harris",
    email: "matthew.harris@gmail.com",
    role: ["Lecturer"],
    courses: ["CSC145", "CSC146"],
  },
  {
    id: 24,
    first_name: "Ashley",
    last_name: "Clark",
    email: "ashley.clark@gmail.com",
    role: ["Lecturer"],
    courses: ["CSC147", "CSC148"],
  },
  {
    id: 25,
    first_name: "Joshua",
    last_name: "Lewis",
    email: "joshua.lewis@gmail.com",
    role: ["Lecturer"],
    courses: ["CSC149", "CSC150"],
  },
  {
    id: 26,
    first_name: "Emily",
    last_name: "Robinson",
    email: "emily.robinson@gmail.com",
    role: ["Lecturer"],
    courses: ["CSC151", "CSC152"],
  },
  {
    id: 27,
    first_name: "Daniel",
    last_name: "Walker",
    email: "daniel.walker@gmail.com",
    role: ["Lecturer"],
    courses: ["CSC153", "CSC154"],
  },
  {
    id: 28,
    first_name: "Jessica",
    last_name: "Young",
    email: "jessica.young@gmail.com",
    role: ["Lecturer"],
    courses: ["CSC155", "CSC156"],
  },
  {
    id: 29,
    first_name: "Andrew",
    last_name: "Allen",
    email: "andrew.allen@gmail.com",
    role: ["Lecturer"],
    courses: ["CSC157", "CSC158"],
  },
  {
    id: 30,
    first_name: "Laura",
    last_name: "King",
    email: "laura.king@gmail.com",
    role: ["Lecturer"],
    courses: ["CSC159", "CSC160"],
  },
  {
    id: 31,
    first_name: "Brian",
    last_name: "Scott",
    email: "brian.scott@gmail.com",
    role: ["Lecturer"],
    courses: ["CSC161", "CSC162"],
  },
  {
    id: 32,
    first_name: "Megan",
    last_name: "Green",
    email: "megan.green@gmail.com",
    role: ["Lecturer"],
    courses: ["CSC163", "CSC164"],
  },
  {
    id: 33,
    first_name: "Kevin",
    last_name: "Baker",
    email: "kevin.baker@gmail.com",
    role: ["Lecturer"],
    courses: ["CSC165", "CSC166"],
  },
  {
    id: 34,
    first_name: "Stephanie",
    last_name: "Adams",
    email: "stephanie.adams@gmail.com",
    role: ["Lecturer"],
    courses: ["CSC167", "CSC168"],
  },
  {
    id: 35,
    first_name: "Jason",
    last_name: "Nelson",
    email: "jason.nelson@gmail.com",
    role: ["Lecturer"],
    courses: ["CSC169", "CSC170"],
  },
  {
    id: 36,
    first_name: "Rebecca",
    last_name: "Carter",
    email: "rebecca.carter@gmail.com",
    role: ["Lecturer"],
    courses: ["CSC171", "CSC172"],
  },
  {
    id: 37,
    first_name: "Eric",
    last_name: "Mitchell",
    email: "eric.mitchell@gmail.com",
    role: ["Lecturer"],
    courses: ["CSC173", "CSC174"],
  },
  {
    id: 38,
    first_name: "Michelle",
    last_name: "Perez",
    email: "michelle.perez@gmail.com",
    role: ["Lecturer"],
    courses: ["CSC175", "CSC176"],
  },
  {
    id: 39,
    first_name: "Ryan",
    last_name: "Roberts",
    email: "ryan.roberts@gmail.com",
    role: ["Lecturer"],
    courses: ["CSC177", "CSC178"],
  },
  {
    id: 40,
    first_name: "Kimberly",
    last_name: "Turner",
    email: "kimberly.turner@gmail.com",
    role: ["Lecturer"],
    courses: ["CSC179", "CSC180"],
  },
]);

const Users = ref([...UsersPage1.value, ...UsersPage2.value]);

const totalUsers = computed(() => Users.value.length);
const totalPages = computed(() => Math.ceil(totalUsers.value / itemsPerPage));

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

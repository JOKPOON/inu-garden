<template>
  <div class="flex flex-row">
    <div class="p-6 h-screen bg-[#F6F8F8] relative">
      <button
        @click="toggleNav"
        class="absolute z-10 flex items-center justify-center top-[100px] right-2 w-10 h-10 rounded-full bg-white border border-grey-secondary"
      >
        <ArrowRight
          class="w-6 h-6 transition-transform duration-300"
          :class="{ 'rotate-180': !smallNav, 'rotate-0': smallNav }"
        />
      </button>
      <div
        class="h-full bg-white rounded-xl p-6 flex flex-col justify-between items-center shadow-sm"
        :class="{
          'w-28  transition-all duration-300': smallNav,
          'w-80': !smallNav,
        }"
      >
        <div class="flex flex-col gap-6 w-full">
          <button
            class="w-full flex flex-row gap-4 items-center"
            @click="handleClick('/profile')"
          >
            <div class="rounded-full bg-black-primary h-16 w-16">
              <div class="rounded-full bg-grey-primary h-16 w-16">
                <img
                  :src="'https://thumbs.dreamstime.com/b/arabic-business-man-traditional-muslim-hat-placeholder-102337208.jpg'"
                  alt="Profile Picture"
                  class="h-full w-full object-cover rounded-full"
                />
              </div>
            </div>
            <div v-if="!smallNav" class="flex flex-col">
              <div
                class="text-base 3xl:text-lg font-semibold text-black-primary text-start"
              >
                {{ userStore.userData?.first_name_en }}
                {{ userStore.userData?.last_name_en }}
              </div>
              <div class="text-sm text-grey-primary text-start">
                {{
                  userStore.userData?.role
                    .split(",")[0]
                    .replace(/_/g, " ")
                    .toLowerCase()
                    .replace(/\b\w/g, (char) => char.toUpperCase())
                }}
              </div>
            </div>
          </button>
          <div
            class="flex flex-col gap-3 text-sm"
            :class="{ 'items-center': smallNav, '': !smallNav }"
          >
            <button
              class="flex flex-row items-center gap-2 p-2 rounded-xl hover:translate-x-1 transition-transform"
              :class="{
                'bg-black-primary text-white':
                  route.path === '/' || route.path.startsWith('/courses'),
                'bg-grey-light text-black-primary':
                  route.path !== '/' && !route.path.startsWith('/courses'),
              }"
              @click="handleClick('/')"
            >
              <Course
                :class="{
                  'text-white':
                    route.path === '/' || route.path.startsWith('/courses'),
                  'text-black-primary':
                    route.path !== '/' && !route.path.startsWith('/courses'),
                }"
              />
              <div v-if="!smallNav" class="font-medium">
                {{ t("layout.courses") }}
              </div>
            </button>
            <button
              class="flex flex-row items-center gap-2 p-2 rounded-xl hover:translate-x-1 transition-transform"
              :class="{
                'bg-black-primary text-white':
                  route.path.startsWith('/students'),
                'bg-grey-light text-black-primary': route.path !== '/students',
              }"
              @click="handleClick('/students')"
            >
              <Student
                :class="{
                  'text-white': route.path.startsWith('/students'),
                  'text-black-primary': route.path !== '/students',
                }"
              />
              <div v-if="!smallNav" class="font-medium">
                {{ t("layout.students") }}
              </div>
            </button>
            <button
              class="flex flex-row items-center gap-2 p-2 rounded-xl hover:translate-x-1 transition-transform"
              :class="{
                'bg-black-primary text-white':
                  route.path.startsWith('/lecturers'),
                'bg-grey-light text-black-primary': route.path !== '/lecturers',
              }"
              @click="handleClick('/lecturers')"
            >
              <Lecturer
                :class="{
                  'text-white': route.path.startsWith('/lecturers'),
                  'text-black-primary': route.path !== '/lecturers',
                }"
              />
              <div v-if="!smallNav" class="font-medium">
                {{ t("layout.lecturers") }}
              </div>
            </button>
            <!-- <button
              class="flex flex-row items-center gap-2 p-2 rounded-xl hover:translate-x-1 transition-transform"
              :class="{
                'bg-black-primary text-white':
                  route.path.startsWith('/graduation'),
                'bg-grey-light text-black-primary':
                  route.path !== '/graduation',
              }"
              @click="handleClick('/graduation')"
            >
              <Graduation
                :class="{
                  'text-white': route.path.startsWith('/graduation'),
                  'text-black-primary': route.path !== '/graduation',
                }"
              />
              <div v-if="!smallNav" class="font-medium">
                {{ t("layout.graduation") }}
              </div>
            </button> -->
            <button
              class="flex flex-row items-center gap-2 p-2 rounded-xl hover:translate-x-1 transition-transform"
              :class="{
                'bg-black-primary text-white':
                  route.path.startsWith('/evaluation'),
                'bg-grey-light text-black-primary':
                  route.path !== '/evaluation',
              }"
              @click="handleClick('/evaluation')"
            >
              <Evaluation
                :class="{
                  'text-white': route.path.startsWith('/evaluation'),
                  'text-black-primary': route.path !== '/evaluation',
                }"
              />
              <div v-if="!smallNav" class="font-medium">
                {{ t("layout.evaluation") }}
              </div>
            </button>
            <button
              class="flex flex-row items-center gap-2 p-2 rounded-xl hover:translate-x-1 transition-transform"
              :class="{
                'bg-black-primary text-white': route.path.startsWith(
                  '/academic-structure'
                ),
                'bg-grey-light text-black-primary':
                  route.path !== '/academic-structure',
              }"
              @click="handleClick('/academic-structure')"
            >
              <Criteria
                :class="{
                  'text-white': route.path.startsWith('/academic-structure'),
                  'text-black-primary': route.path !== '/academic-structure',
                }"
              />
              <div v-if="!smallNav" class="font-medium">
                {{ t("layout.academic-structure") }}
              </div>
            </button>
            <div class="h-[1px] bg-grey-secondary w-full"></div>
            <button
              class="flex flex-row items-center gap-2 p-2 rounded-xl hover:translate-x-1 transition-transform"
              :class="{
                'bg-black-primary text-white':
                  route.path.startsWith('/profile'),
                'bg-grey-light text-black-primary': route.path !== '/profile',
              }"
              @click="handleClick('/profile')"
            >
              <Profile
                :class="{
                  'text-white': route.path.startsWith('/profile'),
                  'text-black-primary': route.path !== '/profile',
                }"
              />
              <div v-if="!smallNav" class="font-medium">
                {{ t("layout.profile") }}
              </div>
            </button>
            <button
              class="flex flex-row items-center gap-2 p-2 rounded-xl hover:translate-x-1 transition-transform"
              :class="{
                'bg-black-primary text-white': route.path.startsWith('/logout'),
                'bg-grey-light text-black-primary': route.path !== '/logout',
              }"
              @click="showLogoutPopup = true"
            >
              <Logout
                :class="{
                  'text-white': route.path.startsWith('/logout'),
                  'text-black-primary': route.path !== '/logout',
                }"
              />
              <div v-if="!smallNav" class="font-medium">
                {{ t("layout.logout") }}
              </div>
            </button>
          </div>
        </div>
        <img
          v-if="!smallNav"
          @click="handleClick('/')"
          :src="LogoSidebar"
          class="w-20 hover:cursor-pointer"
        />
        <LoginLogo
          v-else
          @click="handleClick('/')"
          class="w-12 h-12 hover:cursor-pointer"
        />
      </div>
    </div>
    <div class="w-full flex flex-col bg-[#F6F8F8] p-6 pl-0 gap-6">
      <div class="rounded-xl">
        <div class="w-full flex flex-row justify-between items-center">
          <div
            class="px-4 py-3 bg-white border border-grey-secondary rounded-xl"
          >
            <div
              class="text-base 3xl:text-lg font-[500] text-black-primary flex flex-row gap-1 items-center"
            >
              <template v-for="(segment, index) in routeSegments">
                <span>{{ segment }}</span>
                <span v-if="index !== routeSegments.length - 1">
                  <ArrowRight class="w-4 h-4" />
                </span>
              </template>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full h-full p-6 bg-white shadow-sm rounded-xl">
        <slot v-if="route.path !== '/students'" class="w-full h-full" />
        <Students v-if="route.path === '/students'" :smallNav="smallNav" />
      </div>
    </div>
    <LogoutPopup v-if="showLogoutPopup" @close="showLogoutPopup = false" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useUserStore } from "@/store/user";
import { useRouter, useRoute } from "vue-router";
import Students from "@/pages/students.vue";
import Course from "@/components/icons/Course.vue";
import Student from "@/components/icons/Student.vue";
import Lecturer from "@/components/icons/Lecturer.vue";
import Graduation from "@/components/icons/Graduation.vue";
import Evaluation from "@/components/icons/Evaluation.vue";
import Criteria from "@/components/icons/Criteria.vue";
import Profile from "@/components/icons/Profile.vue";
import Logout from "@/components/icons/Logout.vue";
import ArrowRight from "@/components/icons/ArrowRight.vue";
import LogoSidebar from "@/components/icons/LogoSidebar.png";
import LoginLogo from "@/components/icons/LoginLogo.vue";
import LogoutPopup from "@/components/popups/Logout.vue";

const userStore = useUserStore();

const { t } = useI18n();
const router = useRouter();
const route = useRoute();
const props = defineProps({
  showLangOptions: {
    type: Boolean,
    default: true,
  },
});

const smallNav = ref(false);
const showLogoutPopup = ref(false);

const emit = defineEmits(["open-lang-options", "close-lang-options"]);

function handleClick(action) {
  router.push(action);
}

const toggleNav = () => {
  smallNav.value = !smallNav.value;
};

watch(smallNav, (newValue) => {
  localStorage.setItem("smallNav", newValue);
});

onMounted(() => {
  const smallNavValue = localStorage.getItem("smallNav");
  if (smallNavValue) {
    smallNav.value = JSON.parse(smallNavValue);
  }
});

const stylePath = (path) => {
  return path
    .split("-")
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");
};

const routeSegments = computed(() => {
  const segments = route.path
    .split("/")
    .filter(
      (segment) =>
        segment &&
        !segment.startsWith("[") &&
        !segment.endsWith("]") &&
        !segment.includes(":") &&
        !/\d/.test(segment)
    )
    .map((segment) => stylePath(segment));
  if (route.path === "/") {
    segments.unshift("Courses");
  }
  if (route.query.code) {
    segments.push(route.query.code);
  }
  if (route.query.name) {
    segments.push(route.query.name);
  }
  return segments;
});
</script>

<style lang="scss" scoped></style>

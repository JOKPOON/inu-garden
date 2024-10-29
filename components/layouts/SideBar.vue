<template>
  <div class="flex flex-row">
    <div class="p-6 h-screen bg-[#F6F8F8]">
      <div
        class="w-80 h-full bg-white rounded-xl p-6 flex flex-col justify-between items-center"
      >
        <div class="flex flex-col gap-6 w-full">
          <div class="flex flex-row gap-4 items-center">
            <div class="w-16 h-16 rounded-full bg-slate-200"></div>
            <div class="flex flex-col">
              <div
                class="text-base 3xl:text-lg font-semibold text-black-primary"
              >
                Username
              </div>
              <div class="text-sm 3xl:text-base text-grey-primary">Role</div>
            </div>
          </div>
          <div class="flex flex-col gap-3 text-sm 3xl:text-base">
            <button
              class="flex flex-row items-center gap-2 p-2 rounded-xl bg-black-primary"
            >
              <Course />
              <div class="font-medium text-white">
                {{ t("layout.courses") }}
              </div>
            </button>
            <button class="flex flex-row items-center gap-2 p-2 rounded-xl">
              <Student />
              <div class="font-medium text-black-primary">
                {{ t("layout.students") }}
              </div>
            </button>
            <button class="flex flex-row items-center gap-2 p-2 rounded-xl">
              <Student />
              <div class="font-medium text-black-primary">
                {{ t("layout.lecturers") }}
              </div>
            </button>
            <button class="flex flex-row items-center gap-2 p-2 rounded-xl">
              <Student />
              <div class="font-medium text-black-primary">
                {{ t("layout.graduation") }}
              </div>
            </button>
            <button class="flex flex-row items-center gap-2 p-2 rounded-xl">
              <Student />
              <div class="font-medium text-black-primary">
                {{ t("layout.criteria") }}
              </div>
            </button>
            <div class="h-[1px] bg-grey-secondary w-full"></div>
            <button class="flex flex-row items-center gap-2 p-2 rounded-xl">
              <Student />
              <div class="font-medium text-black-primary">
                {{ t("layout.profile") }}
              </div>
            </button>
            <button class="flex flex-row items-center gap-2 p-2 rounded-xl">
              <Student />
              <div class="font-medium text-black-primary">
                {{ t("layout.logout") }}
              </div>
            </button>
          </div>
        </div>
        <img :src="LogoSidebar" class="w-20" />
      </div>
    </div>
    <div class="w-full flex flex-col bg-[#F6F8F8] p-6 pl-0 gap-6">
      <div class="rounded-xl px-6">
        <div class="w-full flex flex-row justify-between h-18 items-center">
          <div></div>
          <div class="h-8">
            <component :is="LanguageToggler" :force-open="showLangOptions" />
          </div>
        </div>
      </div>
      <div class="w-full h-full p-6 rounded-xl">
        <slot class="w-full h-full" />
      </div>
    </div>
  </div>
</template>

<script setup>
import Course from "@/components/icons/Course.vue";
import Student from "@/components/icons/Student.vue";
import LogoSidebar from "@/components/icons/LogoSidebar.png";
import LanguageToggler from "@/components/accordians/LanguageToggler.vue";
const { t } = useI18n();
const props = defineProps({
  showLangOptions: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["open-lang-options", "close-lang-options"]);
</script>

<style lang="scss" scoped></style>

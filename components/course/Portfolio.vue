<template>
  <div
    class="grid grid-cols-5 gap-4 w-full h-full rounded-lg border border-grey-secondary text-sm"
  >
    <div
      class="col-span-1 p-4 flex flex-col gap-2 min-h-[calc(100vh-310px)] border-r border-grey-secondary"
    >
      <button
        v-for="(menu, index) in menus"
        :key="index"
        @click="activeMenu = menu"
        class="w-full text-left px-4 py-2 rounded-lg border border-grey-secondary"
        :class="{ 'bg-black-primary text-white': activeMenu === menu }"
      >
        {{ menu }}
      </button>
    </div>
    <div v-if="!loading" class="col-span-4 py-4">
      <component :is="getActiveComponent" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import Details from "@/components/course/portfolio/Details.vue";
import Implementation from "@/components/course/portfolio/Implementation.vue";
import EducationalOutcomes from "@/components/course/portfolio/EducationalOutcomes.vue";
import ContinuousDevelopment from "@/components/course/portfolio/ContinuousDevelopment.vue";
import Report from "@/components/course/portfolio/Report.vue";
import { usePortfolioStore } from "~/store/usePortfolioStore";
import { fetchCourse } from "~/api/api";
const store = usePortfolioStore();
const router = useRouter();

const menus = [
  "Details",
  "Implementation",
  "Educational Outcomes",
  "Continuous Development",
  "Report",
];
const activeMenu = ref("Details");

const componentsMap = {
  Details,
  Implementation,
  "Educational Outcomes": EducationalOutcomes,
  "Continuous Development": ContinuousDevelopment,
  Report,
};

const getActiveComponent = computed(() => componentsMap[activeMenu.value]);
const loading = ref(true);

onMounted(async () => {
  const course = ref(null);
  await fetchCourse(course, router.currentRoute.value.params.id);
  store.setDetails(course.value);
  loading.value = false;
});
</script>

<style lang="scss" scoped></style>

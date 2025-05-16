<template>
  <div class="p-4 flex flex-col gap-4">
    <div
      class="text-base font-semibold w-full pb-2 border-b border-grey-secondary"
    >
      3. Educational Outcomes
    </div>
    <div class="flex flex-row justify-between items-center">
      <div class="flex flex-row">
        <button
          v-for="(menu, index) in menus"
          :key="index"
          @click="activeMenu = menu"
          class="text-left px-4 py-2 rounded-lg border border-grey-secondary"
          :class="{ 'bg-black-primary text-white': activeMenu === menu }"
        >
          {{ menu }}
        </button>
      </div>
      <button v-if="activeMenu === 'Score & Grade'" class="flex flex-row gap-2">
        <div
          v-if="file"
          class="px-4 py-2 rounded-lg border border-grey-secondary flex flex-row gap-2 items-center"
        >
          <div class="px-2">
            <img
              :src="PDF"
              alt="PDF"
              class="w-6 max-w-md object-cover rounded-2xl -ml-4"
            />
          </div>
          <div class="text-center text-black-primary text-sm">
            {{ file.name }}
          </div>
        </div>
        <SmallImportButton
          @click="importSinfoModal"
          class="flex items-center flex-row justify-center border border-grey-secondary rounded-xl px-4 py-2 gap-2 hover:cursor-pointer"
        >
          <span class="text-black-primary font-semibold"
            >Import SINFO Grade</span
          >
        </SmallImportButton>
      </button>
      <div v-else-if="activeMenu === 'Outcomes'" class="flex flex-row">
        <button
          v-for="(menu, index) in menusOutcomes"
          :key="index"
          @click="activeMenuOutcomes = menu"
          class="text-left px-4 py-2 rounded-lg border border-grey-secondary"
          :class="{
            'bg-black-primary text-white': activeMenuOutcomes === menu,
          }"
        >
          {{ menu }}
        </button>
      </div>
    </div>
    <div
      v-if="activeMenu === 'Score & Grade' && result"
      class="max-h-[calc(100vh-475px)] scrollbar-set overflow-y-scroll"
    >
      <div class="grid grid-cols-2 gap-4">
        <div class="flex flex-col gap-4">
          <PortChart
            :grade_frequencies="result.grade_frequencies"
            :score_frequencies="result.score_frequencies"
            :activeButton="activeButton"
            @update:activeButton="setActiveButton"
          />
          <div class="grid grid-cols-2 rounded-xl gap-4">
            <div
              v-for="(value, key) in result.statistics"
              :key="key"
              class="flex flex-col gap-4"
            >
              <div
                class="flex flex-row w-full rounded-xl border border-grey-secondary"
              >
                <div
                  class="flex items-center justify-center px-4 py-3 border-2 border-grey-primary rounded-xl w-36"
                >
                  {{ changeKeyToLabel(key) }}
                </div>
                <div class="flex items-center justify-center px-4 py-3 w-full">
                  {{ value.toFixed(2) }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="cols-span-init flex flex-col gap-6">
          <div v-if="activeButton === 'Overview'">
            <PortScoreRange :score_frequencies="result.score_frequencies" />
          </div>
          <div v-else-if="activeButton === 'Grade Overview'">
            <PortGradeRange :grade_frequencies="result.grade_frequencies" />
          </div>
        </div>
      </div>
    </div>
    <div
      v-else-if="activeMenu === 'Outcomes' && activeMenuOutcomes === 'CLO'"
      class="max-h-[calc(100vh-475px)] scrollbar-set overflow-y-scroll"
    >
      <CLO :clos="outcomes.clos" />
    </div>
    <div
      v-else-if="activeMenu === 'Outcomes' && activeMenuOutcomes === 'PLO'"
      class="max-h-[calc(100vh-475px)] scrollbar-set overflow-y-scroll"
    >
      <PLO :plos="outcomes.plos" />
    </div>
    <div
      v-else-if="activeMenu === 'Outcomes' && activeMenuOutcomes === 'PO'"
      class="max-h-[calc(100vh-475px)] scrollbar-set overflow-y-scroll"
    >
      <PO :pos="outcomes.pos" />
    </div>
    <div
      v-else-if="activeMenu === 'Outcomes' && activeMenuOutcomes === 'SO'"
      class="max-h-[calc(100vh-475px)] scrollbar-set overflow-y-scroll"
    >
      <SO :sos="outcomes.sos" />
    </div>
  </div>

  <ImportPDFFRomSinfo
    v-if="isPopupVisible"
    @close="isPopupVisible = false"
    :id="id"
  />
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import PortScoreRange from "@/components/course/PortScoreRange.vue";
import PortGradeRange from "@/components/course/PortGradeRange.vue";
import PortChart from "@/components/course/PortChart.vue";
import SmallImportButton from "@/components/button/SmallImportButton.vue";
import ImportPDFFRomSinfo from "@/components/popups/ImportPDFFRomSinfo.vue";
import CLO from "@/components/course/portfolio/CLO.vue";
import PLO from "@/components/course/portfolio/PLO.vue";
import PO from "@/components/course/portfolio/PO.vue";
import SO from "@/components/course/portfolio/SO.vue";
import PDF from "@/components/images/PDF.png";
import { fetchCourseResult } from "~/api/api";
import { usePortfolioStore } from "~/store/usePortfolioStore";
const store = usePortfolioStore();

const router = useRouter();
const menus = ["Score & Grade", "Outcomes"];
const activeMenu = ref("Score & Grade");

const menusOutcomes = ["CLO", "PLO", "PO", "SO"];
const activeMenuOutcomes = ref("CLO");

const buttons = ["Overview", "Grade Overview"];
const activeButton = ref(buttons[0]);
const id = ref(router.currentRoute.value.params.id);

const outcomes = ref(store.educationalOutcomes.outcomes);

const setActiveButton = (button) => {
  activeButton.value = button;
};

const file = ref(null);
// Can you check if it has a file? then you can show the file name

const isPopupVisible = ref(false);

const importSinfoModal = () => {
  id.value = router.currentRoute.value.params.id;
  isPopupVisible.value = true;
};

const changeKeyToLabel = (key) => {
  switch (key) {
    case "mean":
      return "Mean";
    case "sd":
      return "S.D.";
    case "median":
      return "Median";
    case "max":
      return "Max";
    case "mode":
      return "Mode";
    case "min":
      return "Min";
    default:
      return key;
  }
};

const result = ref(null);

onMounted(async () => {
  await fetchCourseResult(result, id.value);
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
</style>

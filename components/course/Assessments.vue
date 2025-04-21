<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-row justify-between items-center gap-4">
      <div class="flex flex-row gap-4">
        <div
          class="px-4 py-3 bg-white border border-grey-secondary rounded-xl flex flex-row gap-4 items-center"
        >
          <input
            type="text"
            v-model="searchQuery"
            @keyup.enter="getStudents(searchQuery)"
            class="bg-transparent border-none focus:ring-0 outline-none text-base w-48"
            placeholder="Search..."
          />
          <button
            class="flex items-center justify-center bg-white rounded-xl"
            @click="getStudents(searchQuery)"
          >
            <Search class="w-6 h-6" />
          </button>
        </div>
        <div
          class="flex flex-col gap-1 items-center py-2 px-4 rounded-xl bg-black-primary"
        >
          <div class="text-sm font-semibold text-start w-full">
            <span v-if="normalizedWeight !== 100" class="text-yellow-primary">
              In Progress ({{ normalizedWeight }}%)
            </span>
            <span v-else class="text-green-700">Completed! </span>
          </div>
          <div class="w-48 bg-grey-tertiary rounded-full h-2">
            <div
              :class="{
                'bg-yellow-primary rounded-full h-2': normalizedWeight < 100,
                'bg-green-700 rounded-full h-2': normalizedWeight === 100,
              }"
              :style="{ width: normalizedWeight + '%' }"
            ></div>
          </div>
        </div>
      </div>
      <div class="flex flex-row gap-4">
        <AddButton
          @click="addAssesments"
          class="flex items-center flex-row justify-center border border-grey-secondary rounded-xl px-4 py-3 gap-2"
        >
          <span class="text-black-primary font-semibold text-base">Add</span>
        </AddButton>
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
      <div class="flex flex-row gap-4 pb-2 border-b">
        <div
          class="w-64 text-sm text-grey-primary flex items-center justify-center"
        >
          Assessment Name
        </div>
        <div
          class="w-24 text-sm text-grey-primary flex items-center justify-center text-center"
        >
          Included <br />In CLOs
        </div>
        <div
          class="w-full text-sm text-grey-primary flex items-center justify-center"
        >
          Details
        </div>
      </div>
      <div v-if="assessments != null">
        <div
          class="min-h-[calc(100vh-470px)] overflow-y-scroll scrollbar-set mt-4 flex flex-col justify-between h-full"
        >
          <div class="h-full w-full flex flex-row gap-4">
            <div
              class="h-[calc(100vh-470px)] overflow-y-scroll scrollbar-set w-64 flex flex-col gap-2"
            >
              <button
                v-for="assessment in assessments"
                :key="assessment.id"
                @click="setActiveAssessment(assessment)"
                :class="[
                  'flex items-center  py-3 rounded-xl w-full hover:cursor-pointer  flex-row gap-2 px-3 justify-between text-sm',
                  activeAssessment === assessment.id
                    ? 'bg-black-primary text-white'
                    : 'border border-grey-secondary',
                ]"
              >
                <div
                  v-if="!editMode"
                  class="text-sm bg-yellow-primary rounded-lg text-black-primary p-1"
                >
                  {{ assessment.weight }}%
                </div>
                <div
                  v-if="!editMode"
                  class="text-start w-full flex items-center h-full"
                >
                  {{ assessment.name }}
                </div>
                <div
                  v-if="editMode"
                  class="text-start w-full flex items-center h-full border border-grey-primary p-3 rounded-xl"
                >
                  <input
                    type="text"
                    class="bg-transparent focus:ring-0 outline-none w-full text-sm"
                    v-model="assessment.name"
                  />
                </div>
              </button>
            </div>
            <div
              class="h-full w-24 flex items-center justify-center py-2 text-sm"
            >
              <Include
                v-if="getActiveAssessment().is_included_in_clo == true"
                class="text-green-700"
              />
              <NotInclude v-else class="text-red-700" />
            </div>
            <div
              class="h-full w-full grid grid-cols-2 gap-6 max-h-[calc(100vh-470px)] overflow-y-scroll scrollbar-set"
            >
              <div class="flex flex-col gap-2">
                <div class="flex justify-end w-full">
                  <SmallEditButton
                    v-if="!editMode"
                    @click="editAssessment"
                    class="flex items-center flex-row justify-center border border-grey-secondary rounded-xl px-3 py-2 gap-2"
                  >
                    <span class="text-black-primary font-semibold text-base"
                      >Edit</span
                    >
                  </SmallEditButton>
                  <SmallSaveButton
                    v-else
                    @click="saveAssessment"
                    class="flex items-center flex-row justify-center border border-grey-secondary rounded-xl px-3 py-2 gap-2"
                  >
                    <span class="text-black-primary font-semibold text-base"
                      >Save</span
                    >
                  </SmallSaveButton>
                </div>
                <div
                  class="p-4 border border-grey-tertiary rounded-xl flex flex-col gap-2"
                >
                  <div v-if="editMode" class="text-sm font-semibold">
                    Weighted Score
                  </div>
                  <input
                    v-if="editMode"
                    v-model="getActiveAssessment().weight"
                    type="number"
                    class="w-full px-4 py-2 border border-grey-secondary rounded-xl outline-none"
                    placeholder="Weighted Score"
                  />
                  <div class="text-sm font-semibold">Description</div>
                  <div v-if="!editMode" class="text-sm text-grey-primary">
                    {{ getActiveAssessment().description }}
                  </div>
                  <textarea
                    v-if="editMode"
                    v-model="getActiveAssessment().description"
                    rows="5"
                    class="w-full px-4 py-2 border border-grey-secondary rounded-xl outline-none text-sm"
                    placeholder="Description"
                  ></textarea>
                  <div class="flex flex-row justify-between gap-4 mt-2">
                    <div class="text-sm font-semibold">Max Score</div>
                    <div class="text-sm text-black-primary">
                      {{ getActiveAssessment().max_score }}
                    </div>
                  </div>
                  <div class="flex flex-row justify-between gap-4 items-center">
                    <div class="text-sm font-semibold">
                      Expected Passing Student (%)
                    </div>
                    <div v-if="!editMode" class="text-sm text-black-primary">
                      {{
                        getActiveAssessment()
                          .expected_passing_student_percentage
                      }}
                    </div>
                    <input
                      v-if="editMode"
                      v-model="
                        getActiveAssessment()
                          .expected_passing_student_percentage
                      "
                      type="number"
                      class="px-4 py-2 border border-grey-secondary rounded-xl outline-none w-24"
                      placeholder="(%)"
                    />
                  </div>
                  <div
                    class="flex flex-row justify-between gap-4 mb-2 items-center"
                  >
                    <div class="text-sm font-semibold">
                      Expected Passing Score (%)
                    </div>
                    <div v-if="!editMode" class="text-sm text-black-primary">
                      {{ getActiveAssessment().expected_score_percentage }}
                    </div>
                    <input
                      v-if="editMode"
                      v-model="getActiveAssessment().expected_score_percentage"
                      type="number"
                      class="px-4 py-2 border border-grey-secondary rounded-xl outline-none w-24"
                      placeholder="(%)"
                    />
                  </div>
                </div>
                <div class="chart-container">
                  <Bar
                    v-if="chartData && chartOptions"
                    :data="chartData"
                    :options="chartOptions"
                  />
                </div>
                <div class="grid grid-cols-2 rounded-xl gap-4 mt-2 text-sm">
                  <div
                    v-for="(value, key) in getActiveAssessment().statistics"
                    :key="key"
                    class="flex flex-col gap-4"
                  >
                    <div
                      class="flex flex-row w-full rounded-xl border border-grey-secondary"
                    >
                      <div
                        class="flex items-center justify-center px-3 py-2 border-2 border-grey-primary rounded-xl w-36"
                      >
                        {{ changeKeyToLabel(key) }}
                      </div>
                      <div
                        class="flex items-center justify-center px-3 py-2 w-full"
                      >
                        {{ value.toFixed(2) }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex flex-col gap-2">
                <div
                  class="grid grid-cols-2 border border-grey-secondary rounded-xl"
                >
                  <button
                    v-for="button in buttons"
                    :key="button"
                    :class="[
                      ' py-2 rounded-xl text-sm',
                      activeButton === button
                        ? 'bg-black-primary text-white'
                        : 'border border-grey-secondary ',
                    ]"
                    @click="setActionButton(button)"
                  >
                    {{ button }}
                  </button>
                </div>
                <div v-if="activeButton === 'Targeting CLO(s)'">
                  <div
                    class="grid grid-cols-4 gap-2 border-b pb-1 border-grey-tertiary mt-2"
                  >
                    <div
                      class="col-span-1 text-sm w-full text-grey-primary font-medium"
                    >
                      CLO Code
                    </div>
                    <div
                      class="col-span-3 text-sm w-full text-grey-primary font-medium"
                    >
                      CLO Description
                    </div>
                  </div>

                  <div
                    v-for="clo in clos"
                    :key="clo.id"
                    class="grid grid-cols-4 gap-2 mt-2 border-b pb-2 border-grey-tertiary"
                  >
                    <div class="col-span-1 text-sm flex items-center">
                      {{ clo.code }}
                    </div>
                    <div class="col-span-3 text-sm flex flex-row gap-4">
                      <div class="w-full flex items-center">
                        {{ clo.description }}
                      </div>
                      <div class="h-full flex items-center">
                        <button
                          class="flex items-center justify-center rounded-xl h-10 w-10 border hover:bg-red-500 hover:text-white"
                          @click="removeCLO(clo.id)"
                        >
                          <Delete class="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="w-full flex flex-row justify-center mt-4 mb-2">
                    <AddButton
                      class="flex items-center flex-row justify-center border border-grey-secondary rounded-xl px-4 py-2 gap-2"
                      @click="addCLO"
                    >
                      <span class="text-black-primary font-semibold text-base"
                        >Add</span
                      >
                    </AddButton>
                  </div>
                </div>
                <div v-else-if="activeButton === 'Students Assessment'">
                  <div
                    class="grid grid-cols-7 gap-4 py-2 hover:rounded-xl border-b border-grey-tertiary"
                  >
                    <div
                      class="col-span-2 text-sm text-start text-grey-primary font-medium"
                    >
                      Student ID
                    </div>
                    <div
                      class="col-span-2 text-sm text-start text-grey-primary font-medium"
                    >
                      Name
                    </div>
                    <div
                      class="col-span-1 text-sm flex items-center justify-center text-grey-primary font-medium"
                    >
                      Score
                    </div>
                  </div>
                  <div
                    v-for="score in scores"
                    :key="score.id"
                    class="grid grid-cols-7 gap-4 py-2 hover:rounded-xl border-b border-grey-tertiary"
                  >
                    <div
                      class="col-span-2 text-sm text-black-primary text-start flex items-center"
                    >
                      {{ score.student_id }}
                    </div>
                    <div
                      class="col-span-2 text-sm text-black-primary text-start flex items-center"
                    >
                      {{ score.first_name_en }} {{ score.last_name_en }}
                    </div>
                    <div
                      class="col-span-1 text-sm text-black-primary flex items-center justify-center"
                    >
                      {{ score.score }}
                    </div>
                    <div
                      class="col-span-2 text-sm text-black-primary flex items-center justify-end flex-row gap-2"
                    >
                      <button
                        @click="editScore(score.id, 55)"
                        class="flex items-center justify-center rounded-xl p-2 border bg-white hover:bg-black-primary hover:text-white"
                      >
                        <Edit class="w-5 h-5" />
                      </button>
                      <button
                        @click="deleteScore(score.id)"
                        class="flex items-center justify-center rounded-xl p-2 border hover:bg-red-500 hover:text-white"
                      >
                        <Delete class="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <div class="w-full flex flex-row justify-center mt-4 mb-2">
                    <AddButton
                      @click="addStudentToAssessment"
                      class="flex items-center flex-row justify-center border border-grey-secondary rounded-xl px-4 py-2 gap-2"
                    >
                      <span class="text-black-primary font-semibold text-base"
                        >Add</span
                      >
                    </AddButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <AddAssesments
    v-if="isAddAssesmentsShow"
    @close="isAddAssesmentsShow = false"
    :id="assesmentsGroupID"
    :name="assesmentsGroupName"
  />
  <AddCLO
    v-if="isAddCLOShow"
    @close="isAddCLOShow = false"
    @updated="updateClos"
    :groupID="assesmentsGroupID"
    :groupName="assesmentsGroupName"
    :id="assesmentsID"
    :courseId="props.courseId"
    :name="assesmentsName"
  />
  <AddStudentToAssessment
    v-if="isAddStudentShow"
    @close="isAddStudentShow = false"
    :groupID="assesmentsGroupID"
    :groupName="assesmentsGroupName"
    :id="assesmentsID"
    :name="assesmentsName"
  />
</template>

<script setup>
import { ref, onMounted } from "vue";
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import Search from "@/components/icons/Search.vue";
import AddButton from "@/components/button/AddButton.vue";
import TemplateButton from "@/components/button/TemplateButton.vue";
import Import from "@/components/button/ImportButton.vue";
import Include from "@/components/icons/Include.vue";
import NotInclude from "@/components/icons/NotInclude.vue";
import Edit from "@/components/icons/Edit.vue";
import Delete from "@/components/icons/Delete.vue";
import AddCLO from "@/components/popups/AddCLOAssessment.vue";
import AddStudentToAssessment from "@/components/popups/AddStudentToAssessment.vue";
import AddAssesments from "@/components/popups/AddAssesments.vue";
import SmallEditButton from "@/components/button/SmallEditButton.vue";
import SmallSaveButton from "@/components/button/SmallSaveButton.vue";
import {
  BaseURL,
  fetchAssignmentGroups,
  fetchAssignmentScores,
} from "~/api/api";

const props = defineProps({
  courseId: {
    type: String,
    required: true,
  },
});

const { t } = useI18n();
const route = useRoute();

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const normalizeWeights = (assessments) => {
  const totalWeight = 1;

  return assessments.map((assessment) => ({
    ...assessment,
    weight: assessment.weight / totalWeight,
    weightPercentage: ((assessment.weight / totalWeight) * 100).toFixed(2),
  }));
};
const normalizedWeight = computed(() => {
  const normalized = normalizeWeights(assessments.value);
  return normalized.reduce((sum, assessment) => sum + assessment.weight, 0);
});

const editMode = ref(false);
const editAssessment = () => {
  editMode.value = !editMode.value;
};

const saveAssessment = () => {
  editMode.value = false;
};

const searchQuery = ref("");
const assessments = ref([]);
const activeAssessment = ref(1);
const chartData = ref(null);
const chartOptions = ref(null);
const clos = ref([]);
const scores = ref([]);
const score_frequency = ref([]);

useHead({
  title: t("seo.title"),
  description: t("seo.desc"),
});

definePageMeta({
  layout: "landing",
});

const buttons = ["Targeting CLO(s)", "Students Assessment"];

const activeButton = ref("Targeting CLO(s)");
const setActionButton = (button) => {
  activeButton.value = button;
};

const groupID = route.query.groupId;
const groupName = route.query.name;

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

const updateClos = async () => {
  await fetchAssignmentScores(scores, clos, assesmentsID.value);
};

const setActiveAssessment = async (assessment) => {
  activeAssessment.value = assessment.id;
  await fetchAssignmentScores(scores, clos, assessment.id);

  score_frequency.value = Array(21).fill(0);

  // Calculate the frequency of scores in ranges
  scores.value.forEach((score) => {
    // Determine the range based on the score
    const range = score.score === 100 ? 20 : Math.floor(score.score / 5);
    score_frequency.value[range] += 1; // Increment the count for the appropriate range
  });

  // Create the chart data
  chartData.value = {
    labels: [
      "0-5",
      "6-10",
      "11-15",
      "16-20",
      "21-25",
      "26-30",
      "31-35",
      "36-40",
      "41-45",
      "46-50",
      "51-55",
      "56-60",
      "61-65",
      "66-70",
      "71-75",
      "76-80",
      "81-85",
      "86-90",
      "91-95",
      "96-100",
    ],
    datasets: [
      {
        label: "Scores",
        backgroundColor: "#FEC232",
        borderRadius: 5,
        data: score_frequency.value,
      },
    ],
  };
};

const getActiveAssessment = () => {
  return assessments.value.find((a) => a.id === activeAssessment.value) || {};
};

const removeCLO = (code) => {
  deleteClo(code);
};

const isAddAssesmentsShow = ref(false);
const isAddCLOShow = ref(false);
const isAddStudentShow = ref(false);
const assesmentsGroupID = ref("");
const assesmentsGroupName = ref("");
const assesmentsID = ref("");
const assesmentsName = ref("");

const addAssesments = () => {
  const active = getActiveAssessment();
  assesmentsGroupID.value = groupID;
  assesmentsGroupName.value = groupName;
  assesmentsID.value = active.id;
  assesmentsName.value = active.name;
  isAddAssesmentsShow.value = true;
};

const addCLO = () => {
  const active = getActiveAssessment();
  assesmentsGroupID.value = groupID;
  assesmentsGroupName.value = groupName;
  assesmentsID.value = active.id;
  assesmentsName.value = active.name;
  isAddCLOShow.value = true;
};

const addStudentToAssessment = () => {
  const active = getActiveAssessment();
  assesmentsGroupID.value = groupID;
  assesmentsGroupName.value = groupName;
  assesmentsID.value = active.id;
  assesmentsName.value = active.name;
  isAddStudentShow.value = true;
};

onMounted(async () => {
  await fetchAssignmentGroups(assessments, props.courseId, true, groupID);
  setActiveAssessment(assessments.value[0]);
  const active = getActiveAssessment();
  chartData.value = {
    datasets: [
      {
        label: "Scores",
        backgroundColor: "#FEC232",
        borderRadius: 5,
        data: active.scores,
      },
    ],
  };

  chartOptions.value = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: "Score Range",
        },
        grid: {
          display: false,
        },
      },
      y: {
        title: {
          display: true,
          text: "No. of Students",
        },
        grid: {
          display: false,
        },
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };
});

const deleteClo = async (cloId) => {
  try {
    const response = await fetch(
      `${BaseURL}assignments/${activeAssessment.value}/clos/${cloId}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );
    if (response.ok) {
      clos.value = clos.value.filter((clo) => clo.id !== cloId);
    }
  } catch (error) {
    console.error(error);
  }
};

const addScore = async (score = 0.0, student_id) => {
  try {
    const response = await fetch(`${BaseURL}scores`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        assignment_id: activeAssessment.value,
        student_scores: [
          {
            student_id: student_id,
            score: score,
          },
        ],
      }),
      credentials: "include",
    });
    if (response.ok) {
      const newScore = await response.json();
      scores.value = [...scores.value, newScore];
    }
  } catch (error) {
    console.error(error);
  }
};

const editScore = async (scoreId, score = 0.0) => {
  try {
    const response = await fetch(`${BaseURL}scores/${scoreId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        score: score,
      }),
      credentials: "include",
    });
    if (response.ok) {
      scores.value = scores.value.map((s) =>
        s.id === scoreId ? { ...s, score: score } : s
      );
    }
  } catch (error) {
    console.error(error);
  }
};

const deleteScore = async (scoreId) => {
  try {
    const response = await fetch(`${BaseURL}scores/${scoreId}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (response.ok) {
      scores.value = scores.value.filter((score) => score.id !== scoreId);
    }
  } catch (error) {
    console.error(error);
  }
};
</script>

<style lang="scss" scoped>
.scrollbar-set {
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
}

.chart-container {
  width: 100%;
  height: 300px;
  margin: 0 auto;
}
</style>

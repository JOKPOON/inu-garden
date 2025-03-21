<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-row justify-between items-center gap-4">
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
      <div class="flex flex-row gap-4">
        <AddButton
          @click="onClickAddUser"
          class="flex items-center flex-row justify-center border border-grey-secondary rounded-xl px-4 py-3 gap-2"
        >
          <span class="text-black-primary font-semibold text-base">Add</span>
        </AddButton>
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
                @click="setActiveAssessment(assessment.id)"
                :class="[
                  'flex items-center justify-center py-2 rounded-xl w-full hover:cursor-pointer',
                  activeAssessment === assessment.id
                    ? 'bg-black-primary text-white'
                    : 'border border-grey-secondary',
                ]"
              >
                {{ assessment.name }}
              </button>
            </div>
            <div
              class="h-full w-24 flex items-center justify-center py-2 text-sm"
            >
              <Include
                v-if="getActiveAssessment().is_included_in_clo == true"
                class="text-green-700"
              />
              <NotInclude v-else 
                class="text-red-700"
              />
            </div>
            <div
              class="h-full w-full grid grid-cols-2 gap-6 max-h-[calc(100vh-470px)] overflow-y-scroll scrollbar-set"
            >
              <div class="flex flex-col gap-2">
                <div
                  class="p-4 border border-grey-tertiary rounded-xl flex flex-col gap-2"
                >
                  <div class="text-sm font-semibold">Description</div>
                  <div class="text-sm text-grey-primary">
                    {{ getActiveAssessment().description }}
                  </div>
                  <div class="flex flex-row justify-between gap-4 mt-2">
                    <div class="text-sm font-semibold">Max Score</div>
                    <div class="text-sm text-black-primary">
                      {{ getActiveAssessment().max_score }}
                    </div>
                  </div>
                  <div class="flex flex-row justify-between gap-4">
                    <div class="text-sm font-semibold">
                      Expected Passing Student (%)
                    </div>
                    <div class="text-sm text-black-primary">
                      {{
                        getActiveAssessment()
                          .expected_passing_student_percentage
                      }}
                    </div>
                  </div>
                  <div class="flex flex-row justify-between gap-4 mb-2">
                    <div class="text-sm font-semibold">
                      Expected Passing Score (%)
                    </div>
                    <div class="text-sm text-black-primary">
                      {{ getActiveAssessment().expected_score_percentage }}
                    </div>
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
                    :key="clo.clo_id"
                    class="grid grid-cols-4 gap-2 mt-2 border-b pb-2 border-grey-tertiary"
                  >
                    <div class="col-span-1 text-sm flex items-center">
                      {{ clo.clo_code }}
                    </div>
                    <div class="col-span-3 text-sm flex flex-row gap-4">
                      <div class="w-full flex items-center">
                        {{ clo.clo_description }}
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
    <AddCLO
      v-if="isAddCLOShow"
      @close="isAddCLOShow = false"
      :groupID="assesmentsGroupID"
      :groupName="assesmentsGroupName"
      :id="assesmentsID"
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
import AddCLO from "~/components/popups/AddCLOAssessment.vue";
import AddStudentToAssessment from "@/components/popups/AddStudentToAssessment.vue";
const { t } = useI18n();

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const searchQuery = ref("");
const assessments = ref([]);
const activeAssessment = ref(1);
const chartData = ref(null);
const chartOptions = ref(null);

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

const AllCLOs = [
  {
    code: "CLO1",
    description: "Understand the basic concepts of computer science",
  },
  {
    code: "CLO2",
    description: "Understand the basic concepts of computer engineering",
  },
  {
    code: "CLO3",
    description: "Understand the basic concepts of software engineering",
  },
  {
    code: "CLO4",
    description: "Understand the basic concepts of information technology",
  },
];

const getStudents = (query) => {
  assessments.value = [
    {
      id: 1,
      name: "Assessment 1",
      closStatus: "Include",
      description:
        "lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud",
      maxScore: 100,
      expectedStudent: 50,
      expectScore: 80,
      scores: [
        12, 19, 3, 5, 2, 3, 7, 10, 15, 12, 5, 30, 35, 20, 45, 30, 55, 40, 25, 3,
      ],
      statistics: {
        mean: 80.0,
        sd: 10.0,
        median: 70.0,
        max: 90.0,
        mode: 60.0,
        min: 50.0,
      },
      clos: ["CLO1", "CLO2"],
      student: [
        {
          studentID: "64070501010",
          studentName: "Jirapat Lakma",
          score: 80,
        },
        {
          studentID: "64070501039",
          studentName: "Peerapat Padtawaro",
          score: 20,
        },
        {
          studentID: "64070501092",
          studentName: "Nutchapong Pramualsup",
          score: 100,
        },
      ],
    },
    {
      id: 2,
      name: "Assessment 2",
      closStatus: "Not Include",
      description:
        "lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud",
      maxScore: 90,
      expectedStudent: 60,
      expectScore: 80,
      scores: [
        10, 15, 5, 8, 3, 6, 9, 12, 18, 14, 7, 25, 30, 22, 40, 28, 50, 35, 20, 5,
      ],
      statistics: {
        mean: 80.0,
        sd: 10.0,
        median: 70.0,
        max: 90.0,
        mode: 60.0,
        min: 50.0,
      },
      clos: ["CLO3", "CLO4"],
      student: [
        {
          studentID: "64070501010",
          studentName: "Jirapat Lakma",
          score: 80,
        },
        {
          studentID: "64070501039",
          studentName: "Peerapat Padtawaro",
          score: 20,
        },
        {
          studentID: "64070501092",
          studentName: "Nutchapong Pramualsup",
          score: 100,
        },
      ],
    },
    {
      id: 3,
      name: "Assessment 3",
      closStatus: "Include",
      description:
        "lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud",
      maxScore: 100,
      expectedStudent: 50,
      expectScore: 80,
      scores: [
        8, 12, 4, 6, 3, 5, 8, 11, 16, 13, 6, 28, 32, 18, 38, 25, 45, 30, 18, 4,
      ],
      statistics: {
        mean: 80.0,
        sd: 10.0,
        median: 70.0,
        max: 90.0,
        mode: 60.0,
        min: 50.0,
      },
      clos: ["CLO1", "CLO2"],
      student: [
        {
          studentID: "64070501010",
          studentName: "Jirapat Lakma",
          score: 80,
        },
        {
          studentID: "64070501039",
          studentName: "Peerapat Padtawaro",
          score: 20,
        },
        {
          studentID: "64070501092",
          studentName: "Nutchapong Pramualsup",
          score: 100,
        },
      ],
    },
  ];
};

const setActiveAssessment = (id) => {
  activeAssessment.value = id;
  const active = getActiveAssessment();
  chartData.value = {
    labels: [
      "0-5",
      "5-10",
      "10-15",
      "15-20",
      "20-25",
      "25-30",
      "30-35",
      "35-40",
      "40-45",
      "45-50",
      "50-55",
      "55-60",
      "60-65",
      "65-70",
      "70-75",
      "75-80",
      "80-85",
      "85-90",
      "90-95",
      "95-100",
    ],
    datasets: [
      {
        label: "Scores",
        backgroundColor: "#FEC232",
        borderRadius: 5,
        data: active.scores,
      },
    ],
  };
};

const getActiveAssessment = () => {
  return assessments.value.find((a) => a.id === activeAssessment.value) || {};
};

const getCLODescription = (code) => {
  const clo = AllCLOs.find((clo) => clo.code === code);
  return clo ? clo.description : "";
};

const removeCLO = (code) => {
  const active = getActiveAssessment();
  active.clos = active.clos.filter((clo) => clo !== code);
};

const isAddCLOShow = ref(false);
const isAddStudentShow = ref(false);
const  assesmentsGroupID = ref("");
const  assesmentsGroupName = ref("");
const  assesmentsID = ref("");
const  assesmentsName = ref("");


const addCLO = () => {
  const active = getActiveAssessment();
  assesmentsGroupID.value = "ID252";
  assesmentsGroupName.value = "EX group";
  assesmentsID.value = "EX1D";
  assesmentsName.value = "EXName";
  isAddCLOShow.value = true;
};

const addStudentToAssessment = () => {
  const active = getActiveAssessment();
  assesmentsGroupID.value = "ID252";
  assesmentsGroupName.value = "EX group";
  assesmentsID.value = "EX1D";
  assesmentsName.value = "EXName";
  isAddStudentShow.value = true;
};

const onClickAddUser = () => {};

const exportUser = () => {};

const onClickImportUser = () => {};

onMounted(() => {
  getStudents(searchQuery.value);

  const active = getActiveAssessment();
  chartData.value = {
    labels: [
      "0-5",
      "5-10",
      "10-15",
      "15-20",
      "20-25",
      "25-30",
      "30-35",
      "35-40",
      "40-45",
      "45-50",
      "50-55",
      "55-60",
      "60-65",
      "65-70",
      "70-75",
      "75-80",
      "80-85",
      "85-90",
      "90-95",
      "95-100",
    ],
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
</script>

<!-- <script setup>
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
import { BaseURL } from "@/api/api";
import { fetchAssignments, fetchScores } from "@/api/api";

import { useRouter } from "vue-router";
const router = useRouter();
const { t } = useI18n();

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const course_id = ref(router.currentRoute.value.params.id);
const searchQuery = ref("");
const assessments = ref(null);
const activeAssessment = ref(null);
const chartData = ref(null);
const chartOptions = ref(null);
const scores = ref(null);
const clos = ref(null);

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

const AllCLOs = [
  {
    code: "CLO1",
    description: "Understand the basic concepts of computer science",
  },
  {
    code: "CLO2",
    description: "Understand the basic concepts of computer engineering",
  },
  {
    code: "CLO3",
    description: "Understand the basic concepts of software engineering",
  },
  {
    code: "CLO4",
    description: "Understand the basic concepts of information technology",
  },
];

const setActiveAssessment = (id) => {
  activeAssessment.value = id;
  const active = getActiveAssessment();
  chartData.value = {
    labels: [
      "0-5",
      "5-10",
      "10-15",
      "15-20",
      "20-25",
      "25-30",
      "30-35",
      "35-40",
      "40-45",
      "45-50",
      "50-55",
      "55-60",
      "60-65",
      "65-70",
      "70-75",
      "75-80",
      "80-85",
      "85-90",
      "90-95",
      "95-100",
    ],
    datasets: [
      {
        label: "Scores",
        backgroundColor: "#FEC232",
        borderRadius: 5,
        data: active.scores,
      },
    ],
  };
};

const getActiveAssessment = () => {
  return assessments.value.find((a) => a.id === activeAssessment.value) || {};
};

const getCLODescription = (code) => {
  const clo = AllCLOs.find((clo) => clo.code === code);
  return clo ? clo.description : "";
};

const removeCLO = (code) => {
  const active = getActiveAssessment();
  active.clos = active.clos.filter((clo) => clo !== code);
};

const addCLO = () => {
  const active = getActiveAssessment();
  const newCLO = prompt("Enter CLO code:");
  if (newCLO && !active.clos.includes(newCLO)) {
    active.clos.push(newCLO);
  }
};

const onClickAddUser = () => {};

const exportUser = () => {};

const onClickImportUser = () => {};

// Add CLOs to the assignment
// clo_ids: Array of CLO IDs
// assignment_id: ID of the assignment
const linkCLOs = async (assignment_id, clo_ids) => {
  try {
    const response = await fetch(
      `${BaseURL}assignments/${assignment_id}/clos`,
      {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          course_learning_outcome_ids: clo_ids,
        }),
      }
    );
    if (!response.ok) throw new Error("Failed to add CLO");
    const res = await response.json();
    console.log(res);
  } catch (error) {
    console.error("Error adding CLO:", error);
  }
};

// Add student score to the assignment
// student_scores: Array of student scores [{student_id, score}]
// assignment_id: ID of the assignment
const addStudentScores = async (assignment_id, student_scores) => {
  try {
    const response = await fetch(
      `${BaseURL}assignments/${assignment_id}/scores`,
      {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          assignment_id: assignment_id,
          student_scores: student_scores.map((s) => ({
            student_id: s.student_id,
            score: s.score,
          })),
        }),
      }
    );
    if (!response.ok) throw new Error("Failed to add student scores");
    const res = await response.json();
    console.log(res);
  } catch (error) {
    console.error("Error adding student scores:", error);
  }
};

// Update student score in the assignment
// score_id: ID of the score
// score: New score
const updateStudentScore = async (score_id, score) => {
  try {
    const response = await fetch(`${BaseURL}scores/${score_id}`, {
      credentials: "include",
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        score: score,
      }),
    });
    if (!response.ok) throw new Error("Failed to update student score");
    const res = await response.json();
    console.log(res);
  } catch (error) {
    console.error("Error updating student score:", error);
  }
};

// Remove student score from the assignment
// score_id: ID of the score
const removeStudentScore = async (score_id) => {
  try {
    const response = await fetch(`${BaseURL}scores/${score_id}`, {
      credentials: "include",
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) throw new Error("Failed to remove student score");
    const res = await response.json();
    console.log(res);
  } catch (error) {
    console.error("Error removing student score:", error);
  }
};

// Remove CLO from the assignment
// clo_id: ID of the CLO
// assignment_id: ID of the assignment
const unlinkCLO = async (assignment_id, clo_id) => {
  try {
    const response = await fetch(
      `${BaseURL}assignments/${assignment_id}/clos/${clo_id}`,
      {
        credentials: "include",
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) throw new Error("Failed to remove CLO");
    const res = await response.json();
    console.log(res);
  } catch (error) {
    console.error("Error removing CLO:", error);
  }
};

onMounted(() => {
  chartData.value = {
    labels: [
      "0-5",
      "5-10",
      "10-15",
      "15-20",
      "20-25",
      "25-30",
      "30-35",
      "35-40",
      "40-45",
      "45-50",
      "50-55",
      "55-60",
      "60-65",
      "65-70",
      "70-75",
      "75-80",
      "80-85",
      "85-90",
      "90-95",
      "95-100",
    ],
    datasets: [
      {
        label: "Scores",
        backgroundColor: "#FEC232",
        borderRadius: 5,
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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

  fetchAssignments(assessments, course_id.value);
});

watch(assessments, async (newVal) => {
  if (newVal.length > 0) {
    setActiveAssessment(newVal[0].id);
  }
});

watch(activeAssessment, async (newVal) => {
  await fetchScores(scores, clos, newVal);
});

watch(scores, async (newVal) => {
  let score_freq = {
    0: 0,
    5: 0,
    10: 0,
    15: 0,
    20: 0,
    25: 0,
    30: 0,
    35: 0,
    40: 0,
    45: 0,
    50: 0,
    55: 0,
    60: 0,
    65: 0,
    70: 0,
    75: 0,
    80: 0,
    85: 0,
    90: 0,
    95: 0,
  };

  newVal.forEach((score) => {
    if (score.score >= 0 && score.score <= 100) {
      score_freq[Math.floor(score.score / 5) * 5] += 1;
    }
  });

  chartData.value = {
    labels: [
      "0-5",
      "5-10",
      "10-15",
      "15-20",
      "20-25",
      "25-30",
      "30-35",
      "35-40",
      "40-45",
      "45-50",
      "50-55",
      "55-60",
      "60-65",
      "65-70",
      "70-75",
      "75-80",
      "80-85",
      "85-90",
      "90-95",
      "95-100",
    ],
    datasets: [
      {
        label: "Scores",
        backgroundColor: "#FEC232",
        borderRadius: 5,
        data: Object.values(score_freq),
      },
    ],
  };
});
</script> -->

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

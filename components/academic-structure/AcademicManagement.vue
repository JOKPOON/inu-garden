<template>
  <div class="flex flex-col gap-4">
    <div
      class="flex h-[calc(100vh-245px)] border border-grey-secondary rounded-xl"
    >
      <div class="grid grid-cols-5 w-full h-full text-sm">
        <div class="col-span-1 h-full border-r flex flex-col">
          <div
            class="w-full flex items-center justify-center py-3 border-b border-grey-secondary font-semibold text-grey-primary"
          >
            Faculty
          </div>
          <div
            v-if="selectFaculty"
            class="max-h-[calc(100vh-346px)] overflow-y-scroll scrollbar-set"
          >
            <button
              v-for="faculty in AcadamicManagement"
              :key="faculty.id"
              :class="{
                'bg-grey-secondary text-black-primary':
                  selectedFaculty === faculty.id,
                'bg-white': selectedFaculty !== faculty.id,
              }"
              class="w-full flex items-center justify-center py-3 border-b border-grey-secondary"
              @click="selectFaculty(faculty.id)"
            >
              {{ faculty.name_th }}<br />
              {{ faculty.name_en }}
            </button>
          </div>
          <div class="w-full mt-4 flex items-center justify-center">
            <SmallAddButton
              @click="addFaculty"
              class="flex items-center flex-row justify-center border border-grey-secondary rounded-xl px-3 py-2 gap-2"
            >
              <span class="text-black-primary font-semibold text-sm">Add</span>
            </SmallAddButton>
          </div>
        </div>
        <div
          class="col-span-4 h-full flex flex-col max-h-[calc(100vh-230px)] overflow-y-scroll scrollbar-set"
        >
          <div
            class="w-full flex items-center justify-center py-3 border-b border-grey-secondary font-semibold text-grey-primary"
          >
            Details of {{ selectedFacultyDetails.name_en }}
          </div>
          <div
            v-if="selectedFacultyDetails"
            class="w-full flex px-12 flex-row justify-between border-b border-grey-secondary gap-6"
          >
            <div v-if="!editFacultyMode" class="py-4 w-full">
              <span class="font-semibold"> Name(Th):</span>
              {{ selectedFacultyDetails.name_th }}<br />
              <span class="font-semibold">Name(En):</span>
              {{ selectedFacultyDetails.name_en }}<br />
            </div>
            <div v-else class="py-4 w-full flex flex-col gap-2">
              <input
                v-model="selectedFacultyDetails.name_th"
                type="text"
                placeholder="Faculty Name (TH)"
                class="w-full px-4 py-2 border border-grey-secondary rounded-xl outline-none"
              />
              <input
                v-model="selectedFacultyDetails.name_en"
                type="text"
                placeholder="Faculty Name (EN)"
                class="w-full px-4 py-2 border border-grey-secondary rounded-xl outline-none"
              />
            </div>
            <!-- <div v-if="!editFacultyMode" class="py-4 w-full">
              <span class="font-semibold">Abbreviate(Th):</span>
              {{ selectedFacultyDetails.abbreviate_th }}<br />
              <span class="font-semibold">Abbreviate(En):</span>
              {{ selectedFacultyDetails.abbreviate }}<br />
            </div>
            <div v-else class="py-4 w-full flex flex-col gap-2">
              <input
                v-model="selectedFacultyDetails.abbreviate_th"
                type="text"
                placeholder="Faculty Abbreviation (TH)"
                class="w-full px-4 py-2 border border-grey-secondary rounded-xl outline-none"
              />
              <input
                v-model="selectedFacultyDetails.abbreviate"
                type="text"
                placeholder="Faculty Abbreviation (EN)"
                class="w-full px-4 py-2 border border-grey-secondary rounded-xl outline-none"
              />
            </div> -->

            <div class="py-4 flex justify-end">
              <button
                v-if="!editFacultyMode"
                @click="editFaculty"
                class="flex items-center justify-center rounded-xl p-2 border bg-white hover:bg-black-primary hover:text-white"
              >
                <Edit class="w-5 h-5" />
              </button>
              <div v-else class="flex items-center">
                <button
                  @click="saveFaculty"
                  class="flex items-center justify-center rounded-xl p-2 border bg-white hover:bg-black-primary hover:text-white"
                >
                  <Save class="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
          <div class="grid grid-cols-4 h-full w-full">
            <div
              v-if="selectedDepartmentDetails"
              class="col-span-1 h-full border-r flex flex-col"
            >
              <div
                class="max-h-[calc(100vh-418.5px)] overflow-y-scroll scrollbar-set"
              >
                <button
                  v-for="department in selectedFacultyDetails.departments"
                  :key="department.id"
                  :class="{
                    'bg-grey-secondary text-black-primary':
                      selectedDepartment === department.id,
                    'bg-white': selectedDepartment !== department.id,
                  }"
                  class="w-full flex items-center justify-center py-3 border-b border-grey-secondary"
                  @click="selectDepartment(department.id)"
                >
                  {{ department.name_th }}<br />
                  {{ department.name_en }}
                </button>
              </div>
              <div class="w-full mt-4 flex items-center justify-center">
                <SmallAddButton
                  @click="addDepartment"
                  class="flex items-center flex-row justify-center border border-grey-secondary rounded-xl px-3 py-2 gap-2"
                >
                  <span class="text-black-primary font-semibold text-sm"
                    >Add</span
                  >
                </SmallAddButton>
              </div>
            </div>
            <div
              v-if="selectedDepartmentDetails"
              class="col-span-3 h-full flex flex-col"
            >
              <div
                class="w-full flex items-center justify-center py-3 border-b border-grey-secondary font-semibold text-grey-primary"
              >
                Details of {{ selectedDepartmentDetails.name_en }}
              </div>
              <div
                class="w-full flex px-12 flex-row justify-between border-b border-grey-secondary gap-6"
              >
                <div v-if="!editDepartmentMode" class="py-4 w-full">
                  <span class="font-semibold"> Name(Th):</span>
                  {{ selectedDepartmentDetails.name_th }}<br />
                  <span class="font-semibold">Name(En):</span>
                  {{ selectedDepartmentDetails.name_en }}<br />
                </div>
                <div v-else class="py-4 w-full flex flex-col gap-2">
                  <input
                    v-model="selectedDepartmentDetails.name_th"
                    type="text"
                    placeholder="Department Name (TH)"
                    class="w-full px-4 py-2 border border-grey-secondary rounded-xl outline-none"
                  />
                  <input
                    v-model="selectedDepartmentDetails.name_en"
                    type="text"
                    placeholder="Department Name (EN)"
                    class="w-full px-4 py-2 border border-grey-secondary rounded-xl outline-none"
                  />
                </div>
                <div class="py-4 flex justify-end">
                  <button
                    v-if="!editDepartmentMode"
                    @click="editDepartment"
                    class="flex items-center justify-center rounded-xl p-2 border bg-white hover:bg-black-primary hover:text-white"
                  >
                    <Edit class="w-5 h-5" />
                  </button>
                  <div v-if="editDepartmentMode" class="flex items-center">
                    <button
                      @click="saveDepartment"
                      class="flex items-center justify-center rounded-xl p-2 border bg-white hover:bg-black-primary hover:text-white"
                    >
                      <Save class="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
              <div class="grid grid-cols-3 h-full w-full">
                <div
                  v-if="selectedDepartmentDetails"
                  class="col-span-1 h-full border-r flex flex-col"
                >
                  <div
                    class="max-h-[calc(100vh-520px)] overflow-y-scroll scrollbar-set"
                  >
                    <button
                      v-if="selectedDepartmentDetails"
                      v-for="program in selectedDepartmentDetails.programmes"
                      :key="program.id"
                      :class="{
                        'bg-grey-secondary text-black-primary':
                          selectedProgram === program.id,

                        'bg-white': selectedProgram !== program.id,
                      }"
                      class="w-full flex items-center justify-center py-3 border-b border-grey-secondary"
                      @click="selectProgram(program.id)"
                    >
                      {{ program.name_th }}<br />
                      {{ program.name_en }}
                    </button>
                  </div>
                  <div class="w-full mt-4 flex items-center justify-center">
                    <SmallAddButton
                      @click="addProgram"
                      class="flex items-center flex-row justify-center border border-grey-secondary rounded-xl px-3 py-2 gap-2"
                    >
                      <span class="text-black-primary font-semibold text-sm"
                        >Add</span
                      >
                    </SmallAddButton>
                  </div>
                </div>
                <div
                  v-if="selectedProgramDetails"
                  class="col-span-2 h-full flex flex-col"
                >
                  <div
                    v-if="selectedProgramDetails"
                    class="w-full flex items-center justify-center py-3 border-b border-grey-secondary font-semibold text-grey-primary"
                  >
                    Details of {{ selectedProgramDetails.name_en }}
                  </div>
                  <div
                    v-if="selectedProgramDetails"
                    class="w-full flex px-12 flex-row justify-between border-b border-grey-secondary gap-6"
                  >
                    <div v-if="!editTypeMode" class="py-4 w-full">
                      <span class="font-semibold"> Name(Th):</span>
                      {{ selectedProgramDetails.name_th }}<br />
                      <span class="font-semibold">Name(En):</span>
                      {{ selectedProgramDetails.name_en }}<br />
                    </div>
                    <div v-else class="py-4 w-full flex flex-col gap-2">
                      <input
                        v-model="selectedProgramDetails.name_th"
                        type="text"
                        placeholder="Program Name (TH)"
                        class="w-full px-4 py-2 border border-grey-secondary rounded-xl outline-none"
                      />
                      <input
                        v-model="selectedProgramDetails.name_en"
                        type="text"
                        placeholder="Program Name (EN)"
                        class="w-full px-4 py-2 border border-grey-secondary rounded-xl outline-none"
                      />
                    </div>
                    <div class="py-4 flex justify-end">
                      <button
                        v-if="!editTypeMode"
                        @click="editType"
                        class="flex items-center justify-center rounded-xl p-2 border bg-white hover:bg-black-primary hover:text-white"
                      >
                        <Edit class="w-5 h-5" />
                      </button>
                      <div v-if="editTypeMode" class="flex items-center">
                        <button
                          @click="saveType"
                          class="flex items-center justify-center rounded-xl p-2 border bg-white hover:bg-black-primary hover:text-white"
                        >
                          <Save class="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div
                    class="max-h-[calc(100vh-601px)] overflow-y-scroll scrollbar-set"
                  >
                    <div
                      v-if="selectedProgramDetails"
                      class="w-full flex px-8 flex-col gap-4"
                    >
                      <div class="flex flex-col w-full mt-3">
                        <div
                          class="font-semibold w-full border-b border-grey-secondary pb-1"
                        >
                          Description(Th)
                        </div>
                        <div class="mt-1">
                          {{ selectedProgramDetails.description_th }}
                        </div>
                      </div>
                      <div class="flex flex-col w-full">
                        <div
                          class="font-semibold w-full border-b border-grey-secondary pb-1"
                        >
                          Description(En)
                        </div>
                        <div class="mt-1">
                          {{ selectedProgramDetails.description_en }}
                        </div>
                      </div>
                      <div class="flex mb-4 w-full items-center justify-center">
                        <SmallEditButton
                          @click="manageOutcome"
                          class="flex items-center flex-row justify-center border font-[500] border-grey-secondary rounded-xl px-4 py-3 gap-2 hover:bg-black-primary hover:text-white"
                        >
                          Manage Outcome
                        </SmallEditButton>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <AddFaculty v-if="showAddFacultyPopup" @close="showAddFacultyPopup = false" />
  <AddProgram
    v-if="showAddProgramPopup"
    :faculty="AddtoFaculty"
    @close="showAddProgramPopup = false"
  />
  <AddDepartment
    v-if="showAddDepartmentPopup"
    :program="AddtoProgram"
    @close="showAddDepartmentPopup = false"
  />
</template>

<script setup>
import { ref, computed, watch } from "vue";
import SmallAddButton from "@/components/button/SmallAddButton.vue";
import SmallEditButton from "@/components/button/SmallEditButton.vue";
import Edit from "@/components/icons/Edit.vue";
import Save from "@/components/icons/Include.vue";
import AddFaculty from "@/components/popups/AddFaculty.vue";
import AddProgram from "@/components/popups/AddProgram.vue";
import AddDepartment from "@/components/popups/AddDepartment.vue";
import { useRouter } from "vue-router";
import { fetchFaculties } from "~/api/api";

const router = useRouter();

const AddtoFaculty = ref("");
const AddtoProgram = ref("");

const showAddFacultyPopup = ref(false);

const addFaculty = () => {
  showAddFacultyPopup.value = true;
};

const showAddProgramPopup = ref(false);
const addProgram = () => {
  AddtoFaculty.value = "Computer Engineering";
  showAddProgramPopup.value = true;
};

const showAddDepartmentPopup = ref(false);
const addDepartment = () => {
  AddtoProgram.value = "Engineering Faculty";
  showAddDepartmentPopup.value = true;
};

const editFacultyMode = ref(false);
const editFaculty = () => {
  editFacultyMode.value = true;
};

const saveFaculty = () => {
  editFacultyMode.value = false;
};

const editDepartmentMode = ref(false);
const editDepartment = () => {
  editDepartmentMode.value = true;
};

const saveDepartment = () => {
  editDepartmentMode.value = false;
};

const editTypeMode = ref(false);
const editType = () => {
  editTypeMode.value = true;
};

const saveType = () => {
  editTypeMode.value = false;
};

const AcadamicManagement = ref([
  {
    id: "01JSYTYQWGR0B7FTY048RWA15C",
    name_th: "วิศวกรรมศาสตร์",
    name_en: "Engineering",
    departments: [
      {
        id: "01JSYV7A3RK5HC8J05D59N1X6K",
        name_th: "วิศวกรรมคอมพิวเตอร์",
        name_en: "Computer Engineering",
        faculty_id: "01JSYTYQWGR0B7FTY048RWA15C",
        programmes: [
          {
            id: "01JT07KAN3V5YMG1YC7AEH7RKG",
            name_th: "หลักสูตรปกติ",
            name_en: "Regular Program",
            description_th:
              "วิศวกรรมศาสตร์คือการประยุกต์ใช้หลักการทางวิทยาศาสตร์อย่างสร้างสรรค์เพื่อการออกแบบและพัฒนาโครงสร้าง, เครื่องจักร, เครื่องมือ, หรือกระบวนการผลิต หรืองานเพื่อการใช้ประโยชน์สิ่งเหล่านี้โดดๆหรือประยุกต์เข้าด้วยกัน หรือเพื่อการสร้างหรือใช้งานสิ่งเหล่านั้นด้วยความรู้ความเข้าใจเกี่ยวกับสิ่งที่ใช้งานอย่างหมดจด หรือเพื่อการพยากรณ์พฤติกรรมของสิ่งเหล่านั้นภายใต้สภาวะที่เจาะจง สิ่งที่กล่าวมาทั้งหมดนี้จักต้องคำนึงถึงความมุ่งหมายในการใช้งาน, ความคุ้มค่าในการปฏิบัติการ แลความปลอดภัยต่อชีวิตและทรัพยสินด้วย",
            description_en:
              "The discipline of engineering encompasses a broad range of more specialized fields of engineering, each with a more specific emphasis for applications of mathematics and science. See glossary of engineering",
            degree_th: "วิศวกรรมศาสตรบัณฑิต",
            degree_en: "Bachelor of Engineering",
            degree_short_th: "วศ.บ.",
            degree_short_en: "B.Eng.",
            year: "2021",
            academic_year: "",
            department_id: "01JSYV7A3RK5HC8J05D59N1X6K",
            structure: {
              category: [
                {
                  sub: null,
                  name: "ก. หมวดวิชาศึกษาทั่วไป",
                  credit: 31,
                },
                {
                  sub: [
                    {
                      name: "วิชาแกนทางวิศวกรรม",
                      credit: 30,
                    },
                    {
                      name: "วิชาเฉพาะด้าน",
                      credit: 51,
                    },
                    {
                      name: "วิชาเลือก",
                      credit: 12,
                    },
                  ],
                  name: "ข. หมวดวิชาเฉพาะ",
                  credit: 93,
                },
                {
                  sub: null,
                  name: "ค. หมวดวิชาเลือกเสรี",
                  credit: 6,
                },
              ],
              totals_credit: 130,
            },
            program_outcomes: null,
            program_learning_outcomes: null,
            student_outcomes: null,
          },
          {
            id: "01JT08A4JZ7MBHXHD58TRMGRQP",
            name_th: "หลักสูตรปกติ 2",
            name_en: "Regular Program II",
            description_th:
              "วิศวกรรมศาสตร์คือการประยุกต์ใช้หลักการทางวิทยาศาสตร์อย่างสร้างสรรค์เพื่อการออกแบบและพัฒนาโครงสร้าง, เครื่องจักร, เครื่องมือ, หรือกระบวนการผลิต หรืองานเพื่อการใช้ประโยชน์สิ่งเหล่านี้โดดๆหรือประยุกต์เข้าด้วยกัน หรือเพื่อการสร้างหรือใช้งานสิ่งเหล่านั้นด้วยความรู้ความเข้าใจเกี่ยวกับสิ่งที่ใช้งานอย่างหมดจด หรือเพื่อการพยากรณ์พฤติกรรมของสิ่งเหล่านั้นภายใต้สภาวะที่เจาะจง สิ่งที่กล่าวมาทั้งหมดนี้จักต้องคำนึงถึงความมุ่งหมายในการใช้งาน, ความคุ้มค่าในการปฏิบัติการ แลความปลอดภัยต่อชีวิตและทรัพยสินด้วย",
            description_en:
              "The discipline of engineering encompasses a broad range of more specialized fields of engineering, each with a more specific emphasis for applications of mathematics and science. See glossary of engineering",
            degree_th: "วิศวกรรมศาสตรบัณฑิต",
            degree_en: "Bachelor of Engineering",
            degree_short_th: "วศ.บ.",
            degree_short_en: "B.Eng.",
            year: "2021",
            academic_year: "",
            department_id: "01JSYV7A3RK5HC8J05D59N1X6K",
            structure: {
              category: [
                {
                  sub: null,
                  name: "ก. หมวดวิชาศึกษาทั่วไป",
                  credit: 31,
                },
                {
                  sub: [
                    {
                      name: "วิชาแกนทางวิศวกรรม",
                      credit: 30,
                    },
                    {
                      name: "วิชาเฉพาะด้าน",
                      credit: 51,
                    },
                    {
                      name: "วิชาเลือก",
                      credit: 12,
                    },
                  ],
                  name: "ข. หมวดวิชาเฉพาะ",
                  credit: 93,
                },
                {
                  sub: null,
                  name: "ค. หมวดวิชาเลือกเสรี",
                  credit: 6,
                },
              ],
              totals_credit: 130,
            },
            program_outcomes: null,
            program_learning_outcomes: null,
            student_outcomes: null,
          },
        ],
      },
      {
        id: "01JT089HVNVVBSFEV42CG3N4G1",
        name_th: "วิศวกรรมคอมพิวเตอร์ 2",
        name_en: "Computer Engineering II",
        faculty_id: "01JSYTYQWGR0B7FTY048RWA15C",
        programmes: [],
      },
    ],
  },
  {
    id: "01JT088QZV5E7QPXJ9K00404DK",
    name_th: "วิศวกรรมศาสตร์ 2",
    name_en: "Engineering II",
    departments: [],
  },
]);

const selectedFaculty = ref(AcadamicManagement.value[0].id);
const selectedDepartment = ref(AcadamicManagement.value[0].departments[0].id);
const selectedProgram = ref(
  AcadamicManagement.value[0].departments[0].programmes[0].id
);

const selectedFacultyDetails = computed(() => {
  return AcadamicManagement.value.find(
    (faculty) => faculty.id === selectedFaculty.value
  );
});

const selectedDepartmentDetails = computed(() => {
  return selectedFacultyDetails.value.departments?.find(
    (department) => department.id === selectedDepartment.value
  );
});

const selectedProgramDetails = computed(() => {
  return selectedDepartmentDetails.value?.programmes?.find(
    (program) => program.id === selectedProgram.value
  );
});

const selectFaculty = (faculty) => {
  selectedFaculty.value = faculty;
};

const selectDepartment = (department) => {
  selectedDepartment.value = department;
};

const selectProgram = (program) => {
  selectedProgram.value = program;
};

watch(
  AcadamicManagement,
  (newVal) => {
    if (newVal.length > 0) {
      selectedFaculty.value = newVal[0].id;
      if (newVal[0].departments.length > 0) {
        selectedDepartment.value = newVal[0].departments[0].id;
        if (newVal[0].departments[0].programmes.length > 0) {
          selectedProgram.value = newVal[0].departments[0].programmes[0].id;
        }
      }
    }
  },
  { deep: true }
);

const path = "7casdas547ads45s56a45d6s4ad";
const name = "Computer Engineering (Regular)";

const manageOutcome = () => {
  router.push({
    path: `/academic-structure/mange-outcome/${selectedProgramDetails.value.id}`,
    query: { name: selectedProgramDetails.value.name_en },
  });
};

const faculties = ref([]);

onMounted(async () => {
  await fetchFaculties(faculties);
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

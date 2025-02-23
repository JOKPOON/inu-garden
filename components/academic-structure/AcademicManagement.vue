<template>
  <div class="flex flex-col gap-4">
    <div
      class="flex h-[calc(100vh-232px)] border border-grey-secondary rounded-xl"
    >
      <div class="grid grid-cols-5 w-full h-full text-sm">
        <div class="col-span-1 h-full border-r flex flex-col">
          <div
            class="w-full flex items-center justify-center py-3 border-b border-grey-secondary font-semibold text-grey-primary"
          >
            Faculty
          </div>
          <div
            class="max-h-[calc(100vh-346px)] overflow-y-scroll scrollbar-set"
          >
            <button
              v-for="faculty in AcadamicManagement.faculty"
              :key="faculty.name"
              :class="{
                'bg-grey-secondary text-black-primary':
                  selectedFaculty === faculty.name,
                'bg-white': selectedFaculty !== faculty.name,
              }"
              class="w-full flex items-center justify-center py-3 border-b border-grey-secondary"
              @click="selectFaculty(faculty.name)"
            >
              {{ faculty.name_th }}<br />
              {{ faculty.name }}
            </button>
          </div>
          <div class="w-full mt-4 flex items-center justify-center">
            <SmallAddButton
              class="flex items-center flex-row justify-center border border-grey-secondary rounded-xl px-3 py-2 gap-2"
            >
              <span class="text-black-primary font-semibold text-sm">Add</span>
            </SmallAddButton>
          </div>
        </div>
        <div class="col-span-4 h-full flex flex-col">
          <div
            class="w-full flex items-center justify-center py-3 border-b border-grey-secondary font-semibold text-grey-primary"
          >
            Details of {{ selectedFaculty }}
          </div>
          <div
            v-if="selectedFacultyDetails"
            class="w-full flex px-12 flex-row justify-between border-b border-grey-secondary gap-6"
          >
            <div class="py-4 w-full">
              <span class="font-semibold"> Name(Th):</span>
              {{ selectedFacultyDetails.name_th }}<br />
              <span class="font-semibold">Name(En):</span>
              {{ selectedFacultyDetails.name }}<br />
            </div>
            <div class="py-4 w-full">
              <span class="font-semibold">Abbreviate(Th):</span>
              {{ selectedFacultyDetails.abbreviate_th }}<br />
              <span class="font-semibold">Abbreviate(En):</span>
              {{ selectedFacultyDetails.abbreviate }}<br />
            </div>
            <div class="py-4 flex justify-end">
              <button
                class="flex items-center justify-center rounded-xl p-2 border bg-white hover:bg-black-primary hover:text-white"
              >
                <Edit class="w-5 h-5" />
              </button>
            </div>
          </div>
          <div class="grid grid-cols-4 h-full w-full">
            <div class="col-span-1 h-full border-r flex flex-col">
              <div
                class="max-h-[calc(100vh-418.5px)] overflow-y-scroll scrollbar-set"
              >
                <button
                  v-for="department in selectedFacultyDetails.details"
                  :key="department.departments"
                  :class="{
                    'bg-grey-secondary text-black-primary':
                      selectedDepartment === department.departments,
                    'bg-white': selectedDepartment !== department.departments,
                  }"
                  class="w-full flex items-center justify-center py-3 border-b border-grey-secondary"
                  @click="selectDepartment(department.departments)"
                >
                  {{ department.departments_th }}<br />
                  {{ department.departments }}
                </button>
              </div>
              <div class="w-full mt-4 flex items-center justify-center">
                <SmallAddButton
                  class="flex items-center flex-row justify-center border border-grey-secondary rounded-xl px-3 py-2 gap-2"
                >
                  <span class="text-black-primary font-semibold text-sm"
                    >Add</span
                  >
                </SmallAddButton>
              </div>
            </div>
            <div class="col-span-3 h-full flex flex-col">
              <div
                class="w-full flex items-center justify-center py-3 border-b border-grey-secondary font-semibold text-grey-primary"
              >
                Details of {{ selectedDepartment }}
              </div>
              <div
                v-if="selectedFacultyDetails"
                class="w-full flex px-12 flex-row justify-between border-b border-grey-secondary gap-6"
              >
                <div class="py-4 w-full">
                  <span class="font-semibold"> Name(Th):</span>
                  {{ selectedDepartmentDetails.departments_th }}<br />
                  <span class="font-semibold">Name(En):</span>
                  {{ selectedDepartmentDetails.departments }}<br />
                </div>
                <div class="py-4 flex justify-end">
                  <button
                    class="flex items-center justify-center rounded-xl p-2 border bg-white hover:bg-black-primary hover:text-white"
                  >
                    <Edit class="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div class="grid grid-cols-3 h-full w-full">
                <div class="col-span-1 h-full border-r flex flex-col">
                  <div
                    class="max-h-[calc(100vh-520px)] overflow-y-scroll scrollbar-set"
                  >
                    <button
                      v-if="selectedDepartmentDetails"
                      v-for="program in selectedDepartmentDetails.programs"
                      :key="program.type"
                      :class="{
                        'bg-grey-secondary text-black-primary':
                          selectedProgram === program.type,

                        'bg-white': selectedProgram !== program.type,
                      }"
                      class="w-full flex items-center justify-center py-3 border-b border-grey-secondary"
                      @click="selectProgram(program.type)"
                    >
                      {{ program.type_th }}<br />
                      {{ program.type }}
                    </button>
                  </div>
                  <div class="w-full mt-4 flex items-center justify-center">
                    <SmallAddButton
                      class="flex items-center flex-row justify-center border border-grey-secondary rounded-xl px-3 py-2 gap-2"
                    >
                      <span class="text-black-primary font-semibold text-sm"
                        >Add</span
                      >
                    </SmallAddButton>
                  </div>
                </div>
                <div class="col-span-2 h-full flex flex-col">
                  <div
                    class="w-full flex items-center justify-center py-3 border-b border-grey-secondary font-semibold text-grey-primary"
                  >
                    Details of {{ selectedProgram }}
                  </div>

                  <div
                    class="w-full flex px-12 flex-row justify-between border-b border-grey-secondary gap-6"
                  >
                    <div class="py-4 w-full">
                      <span class="font-semibold"> Name(Th):</span>
                      {{ selectedProgramDetails.type_th }}<br />
                      <span class="font-semibold">Name(En):</span>
                      {{ selectedProgramDetails.type }}<br />
                    </div>
                    <div class="py-4 flex justify-end">
                      <button
                        class="flex items-center justify-center rounded-xl p-2 border bg-white hover:bg-black-primary hover:text-white"
                      >
                        <Edit class="w-5 h-5" />
                      </button>
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
                          {{ selectedProgramDetails.details.description_th }}
                        </div>
                      </div>
                      <div class="flex flex-col w-full">
                        <div
                          class="font-semibold w-full border-b border-grey-secondary pb-1"
                        >
                          Description(En)
                        </div>
                        <div class="mt-1">
                          {{ selectedProgramDetails.details.description }}
                        </div>
                      </div>
                      <div class="flex mt-4 w-full items-center justify-center">
                        <SmallEditButton
                          v-if="!editMode"
                          @click="toggleEditMode"
                          class="flex items-center flex-row justify-center border font-[500] border-grey-secondary rounded-xl px-3 py-2 gap-2 hover:bg-black-primary hover:text-white"
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
</template>

<script setup>
import { ref, computed, watch } from "vue";
import SmallAddButton from "@/components/button/SmallAddButton.vue";
import SmallEditButton from "@/components/button/SmallEditButton.vue";
import Edit from "@/components/icons/Edit.vue";

const AcadamicManagement = ref({
  faculty: [
    {
      name: "Engineering",
      name_th: "วิศวกรรมศาสตร์",
      abbreviate: "B.Eng",
      abbreviate_th: "วศ.บ.",
      details: [
        {
          departments: "Computer Engineering",
          departments_th: "วิศวกรรมคอมพิวเตอร์",
          programs: [
            {
              type: "Regular (2555)",
              type_th: "ปกติ (2555)",
              details: {
                description: "Bachelor of Engineering in Computer Engineering",
                description_th: "วิศวกรรมศาสตร์ วิศวกรรมคอมพิวเตอร์",
              },
            },
            {
              type: "Regular (2556)",
              type_th: "ปกติ (2556)",
              details: {
                description: "Bachelor of Engineering in Computer Engineering",
                description_th: "วิศวกรรมศาสตร์ วิศวกรรมคอมพิวเตอร์",
              },
            },
            {
              type: "Regular (2557)",
              type_th: "ปกติ (2557)",
              details: {
                description: "Bachelor of Engineering in Computer Engineering",
                description_th: "วิศวกรรมศาสตร์ วิศวกรรมคอมพิวเตอร์",
              },
            },
          ],
        },
        {
          departments: "Software Engineering",
          departments_th: "วิศวกรรมซอฟต์แวร์",
          programs: [
            {
              type: "Regular (2555)",
              type_th: "ปกติ (2555)",
              details: {
                description: "Bachelor of Engineering in Software Engineering",
                description_th: "วิศวกรรมศาสตร์ วิศวกรรมซอฟต์แวร์",
              },
            },
          ],
        },
      ],
    },
    {
      name: "Science",
      name_th: "วิทยาศาสตร์",
      abbreviate: "B.Sc",
      abbreviate_th: "วศ.บ.",
      details: [
        {
          departments: "Computer Science",
          departments_th: "วิทยาการคอมพิวเตอร์",
          programs: [
            {
              type: "Regular (2555)",
              type_th: "ปกติ (2555)",
              details: {
                description: "Bachelor of Science in Computer Science",
                description_th: "วิทยาศาสตร์ วิทยาการคอมพิวเตอร์",
              },
            },
          ],
        },
      ],
    },
  ],
});

const selectedFaculty = ref(AcadamicManagement.value.faculty[0].name);
const selectedDepartment = ref(
  AcadamicManagement.value.faculty[0].details[0].departments
);
const selectedProgram = ref(
  AcadamicManagement.value.faculty[0].details[0].programs[0].type
);

const selectedFacultyDetails = computed(() => {
  return AcadamicManagement.value.faculty.find(
    (faculty) => faculty.name === selectedFaculty.value
  );
});

const selectedDepartmentDetails = computed(() => {
  return selectedFacultyDetails.value?.details.find(
    (department) => department.departments === selectedDepartment.value
  );
});

const selectedProgramDetails = computed(() => {
  return selectedDepartmentDetails.value?.programs.find(
    (program) => program.type === selectedProgram.value
  );
});

const selectFaculty = (facultyName) => {
  selectedFaculty.value = facultyName;
  const facultyDetails = AcadamicManagement.value.faculty.find(
    (faculty) => faculty.name === facultyName
  );
  if (facultyDetails && facultyDetails.details.length > 0) {
    selectedDepartment.value = facultyDetails.details[0].departments;
    if (facultyDetails.details[0].programs.length > 0) {
      selectedProgram.value = facultyDetails.details[0].programs[0].type;
    } else {
      selectedProgram.value = "";
    }
  } else {
    selectedDepartment.value = "";
    selectedProgram.value = "";
  }
};

const selectDepartment = (departmentName) => {
  selectedDepartment.value = departmentName;
  const departmentDetails = selectedFacultyDetails.value?.details.find(
    (department) => department.departments === departmentName
  );
  if (departmentDetails && departmentDetails.programs.length > 0) {
    selectedProgram.value = departmentDetails.programs[0].type;
  } else {
    selectedProgram.value = "";
  }
};

const selectProgram = (programType) => {
  selectedProgram.value = programType;
};

watch(
  AcadamicManagement,
  (newVal) => {
    if (newVal.faculty.length > 0) {
      selectedFaculty.value = newVal.faculty[0].name;
      if (newVal.faculty[0].details.length > 0) {
        selectedDepartment.value = newVal.faculty[0].details[0].departments;
        if (newVal.faculty[0].details[0].programs.length > 0) {
          selectedProgram.value = newVal.faculty[0].details[0].programs[0].type;
        }
      }
    }
  },
  { deep: true }
);
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

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
          v-if="selectedFacultyDetails"
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
            <div class="col-span-1 h-full border-r flex flex-col">
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
  <AddFaculty
    v-if="showAddFacultyPopup"
    @close="showAddFacultyPopup = false"
    @updated="getFaculties"
  />
  <AddDepartment
    v-if="showAddDepartmentPopup"
    :program="AddtoFaculty"
    @close="showAddDepartmentPopup = false"
    @updated="getFaculties"
  />
  <AddProgram
    v-if="showAddProgramPopup"
    :department="AddtoDepartment"
    @close="showAddProgramPopup = false"
    @updated="getFaculties"
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

const AddtoDepartment = ref("");
const AddtoFaculty = ref("");

const showAddFacultyPopup = ref(false);

const addFaculty = () => {
  showAddFacultyPopup.value = true;
};

const showAddProgramPopup = ref(false);
const addProgram = () => {
  AddtoDepartment.value = selectedDepartment;
  showAddProgramPopup.value = true;
};

const showAddDepartmentPopup = ref(false);
const addDepartment = () => {
  AddtoFaculty.value = selectedFaculty;
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

const AcadamicManagement = ref([]);

const selectedFaculty = ref(null);
const selectedDepartment = ref(null);
const selectedProgram = ref(null);

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

const manageOutcome = () => {
  router.push({
    path: `/academic-structure/mange-outcome/${selectedProgramDetails.value.id}`,
    query: { name: selectedProgramDetails.value.name_en },
  });
};

const getFaculties = async () => {
  await fetchFaculties(AcadamicManagement);
};

onMounted(async () => {
  await getFaculties(AcadamicManagement);
  console.log(AcadamicManagement.value);
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

<template>
  <teleport to="body">
    <div
      class="w-full h-full fixed inset-0 flex items-center justify-center bg-black-primary bg-opacity-50 z-50"
    >
      <div
        class="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center border border-grey-secondary"
      >
        <div class="flex flex-col w-full">
          <div class="text-2xl font-semibold text-black-primary">
            Edit Student Details
          </div>
          <div class="text-sm text-grey-primary mt-1">
            Editing details of
            <span class="font-normal text-grey-primary">{{
              student.name
            }}</span>
          </div>
        </div>
        <div
          class="mt-4 text-start flex gap-4 flex-col text-sm max-h-[50vh] overflow-y-scroll scrollbar-set"
        >
          <!-- Editable Student Details -->
          <div class="flex flex-col items-start w-full gap-2">
            <label class="font-normal text-grey-primary">Student ID</label>
            <input
              type="text"
              v-model="student.studentId"
              class="w-[32rem] px-4 py-2 border border-grey-secondary rounded-xl"
              disabled
            />
          </div>
          <div class="flex flex-col items-start w-full gap-2">
            <label class="font-normal text-grey-primary">Name</label>
            <input
              type="text"
              v-model="student.name"
              class="w-[32rem] px-4 py-2 border border-grey-secondary rounded-xl"
            />
          </div>
          <div class="flex flex-col items-start w-full gap-2">
            <label class="font-normal text-grey-primary">Email</label>
            <input
              type="email"
              v-model="student.email"
              class="w-[32rem] px-4 py-2 border border-grey-secondary rounded-xl"
            />
          </div>
          <div class="flex flex-col items-start w-full gap-2">
            <label class="font-normal text-grey-primary">Faculty</label>
            <input
              type="text"
              v-model="student.faculty"
              class="w-[32rem] px-4 py-2 border border-grey-secondary rounded-xl"
            />
          </div>
          <div class="flex flex-col items-start w-full gap-2">
            <label class="font-normal text-grey-primary">Department</label>
            <input
              type="text"
              v-model="student.department"
              class="w-[32rem] px-4 py-2 border border-grey-secondary rounded-xl"
            />
          </div>
          <div class="flex flex-col items-start w-full gap-2">
            <label class="font-normal text-grey-primary">Program</label>
            <input
              type="text"
              v-model="student.program"
              class="w-[32rem] px-4 py-2 border border-grey-secondary rounded-xl"
            />
          </div>
          <div class="grid grid-cols-2 w-[32rem] gap-2">
            <div class="flex flex-col items-start w-full gap-2">
              <label class="font-normal text-grey-primary">GPAX</label>
              <input
                type="number"
                step="0.01"
                v-model="student.gpax"
                class="w-full px-4 py-2 border border-grey-secondary rounded-xl"
              />
            </div>
            <div class="flex flex-col items-start w-full gap-2">
              <label class="font-normal text-grey-primary"
                >High School GPAX</label
              >
              <input
                type="number"
                step="0.01"
                v-model="student.highSchoolGpax"
                class="w-full px-4 py-2 border border-grey-secondary rounded-xl"
              />
            </div>
          </div>
          <div class="grid grid-cols-2 w-[32rem] gap-2">
            <div class="flex flex-col items-start w-full gap-2">
              <label class="font-normal text-grey-primary">Math GPAX</label>
              <input
                type="number"
                step="0.01"
                v-model="student.mathGpax"
                class="w-full px-4 py-2 border border-grey-secondary rounded-xl"
              />
            </div>
            <div class="flex flex-col items-start w-full gap-2">
              <label class="font-normal text-grey-primary">Science GPAX</label>
              <input
                type="number"
                step="0.01"
                v-model="student.scienceGpax"
                class="w-full px-4 py-2 border border-grey-secondary rounded-xl"
              />
            </div>
            <div class="flex flex-col items-start w-full gap-2">
              <label class="font-normal text-grey-primary">English GPAX</label>
              <input
                type="number"
                step="0.01"
                v-model="student.englishGpax"
                class="w-full px-4 py-2 border border-grey-secondary rounded-xl"
              />
            </div>
            <div class="flex flex-col items-start w-full gap-2">
              <label class="font-normal text-grey-primary"
                >Admission Score</label
              >
              <input
                type="number"
                step="0.01"
                v-model="student.admission"
                class="w-full px-4 py-2 border border-grey-secondary rounded-xl"
              />
            </div>
          </div>
          <div class="flex flex-col items-start w-full gap-2 mb-4">
            <label class="font-normal text-grey-primary">School Name</label>
            <input
              type="text"
              v-model="student.schoolName"
              class="w-[32rem] px-4 py-2 border border-grey-secondary rounded-xl"
            />
          </div>

          <!-- Editable Grade Section -->
          <div
            v-if="student.grade"
            class="flex flex-col items-start w-full gap-2"
          >
            <label class="font-normal text-grey-primary">Grades</label>
            <div
              v-for="(grade, index) in student.grade"
              :key="index"
              class="flex flex-row items-center gap-4 w-full"
            >
              <input
                type="text"
                v-model="grade.semester"
                placeholder="Semester"
                class="w-1/2 px-4 py-2 border border-grey-secondary rounded-xl"
              />
              <input
                type="number"
                step="0.01"
                v-model="grade.gpax"
                placeholder="GPA"
                class="w-1/2 px-4 py-2 border border-grey-secondary rounded-xl"
              />
              <button
                @click="deleteGrade(index)"
                class="flex items-center justify-center rounded-xl p-2 border hover:bg-red-500 hover:text-white"
                aria-label="Delete Student"
              >
                <Delete class="w-5 h-5" />
              </button>
            </div>

            <SmallAddButton
              @click="addGrade"
              class="flex items-center flex-row justify-center border border-grey-secondary rounded-xl px-3 py-2 gap-2"
            >
              <span class="text-black-primary font-semibold text-base"
                >Add</span
              >
            </SmallAddButton>
          </div>

          <div
            v-if="student.PLO"
            class="flex flex-col items-start w-full gap-2"
          >
            <label class="font-normal text-grey-primary">PLO</label>
            <div
              v-for="(plo, index) in student.PLO"
              :key="index"
              class="flex flex-row items-center gap-4 w-full"
            >
              <div class="flex flex-row items-start w-full gap-2">
                <div
                  class="bg-transparent border border-grey-secondary rounded-xl text-sm p-2 hover:cursor-pointer w-full"
                >
                  <select
                    v-model="plo.code"
                    class="w-full border-none outline-none hover:cursor-pointer"
                    placeholder="Select PO"
                  >
                    <option value="">Select PLO</option>
                    <option value="PLO1">PLO1</option>
                    <option value="PLO2">PLO2</option>
                  </select>
                </div>
                <div
                  class="bg-transparent border border-grey-secondary rounded-xl text-sm p-2 hover:cursor-pointer w-full"
                >
                  <select
                    v-model="plo.status"
                    class="w-full border-none outline-none hover:cursor-pointer"
                    placeholder="Select PO"
                  >
                    <option value="">Select Status</option>
                    <option value="0">Pass</option>
                    <option value="1">Fail</option>
                  </select>
                </div>
                <button
                  @click="deletePLO(index)"
                  class="flex items-center justify-center rounded-xl p-2 border hover:bg-red-500 hover:text-white"
                  aria-label="Delete Student"
                >
                  <Delete class="w-5 h-5" />
                </button>
              </div>
            </div>
            <SmallAddButton
              @click="addPLO"
              class="flex items-center flex-row justify-center border border-grey-secondary rounded-xl px-3 py-2 gap-2"
            >
              <span class="text-black-primary font-semibold text-base"
                >Add</span
              >
            </SmallAddButton>
          </div>
          <div v-if="student.PO" class="flex flex-col items-start w-full gap-2">
            <label class="font-normal text-grey-primary">PO</label>
            <div
              v-for="(po, index) in student.PO"
              :key="index"
              class="flex flex-row items-center gap-4 w-full"
            >
              <div class="flex flex-row items-start w-full gap-2">
                <div
                  class="bg-transparent border border-grey-secondary rounded-xl text-sm p-2 hover:cursor-pointer w-full"
                >
                  <select
                    v-model="po.code"
                    class="w-full border-none outline-none hover:cursor-pointer"
                    placeholder="Select PO"
                  >
                    <option value="">Select PO</option>
                    <option value="PO1">PO1</option>
                    <option value="PO2">PO2</option>
                  </select>
                </div>
                <div
                  class="bg-transparent border border-grey-secondary rounded-xl text-sm p-2 hover:cursor-pointer w-full"
                >
                  <select
                    v-model="po.status"
                    class="w-full border-none outline-none hover:cursor-pointer"
                    placeholder="Select PO"
                  >
                    <option value="">Select Status</option>
                    <option value="0">Pass</option>
                    <option value="1">Fail</option>
                  </select>
                </div>
                <button
                  @click="deletePO(index)"
                  class="flex items-center justify-center rounded-xl p-2 border hover:bg-red-500 hover:text-white"
                  aria-label="Delete Student"
                >
                  <Delete class="w-5 h-5" />
                </button>
              </div>
            </div>
            <SmallAddButton
              @click="addPO"
              class="flex items-center flex-row justify-center border border-grey-secondary rounded-xl px-3 py-2 gap-2"
            >
              <span class="text-black-primary font-semibold text-base"
                >Add</span
              >
            </SmallAddButton>
          </div>
          <div
            v-if="student.SO"
            class="flex flex-col items-start w-full gap-2 mb-4"
          >
            <label class="font-normal text-grey-primary">SO</label>
            <div
              v-for="(so, index) in student.SO"
              :key="index"
              class="flex flex-row items-center gap-4 w-full"
            >
              <div class="flex flex-row items-start w-full gap-2">
                <div
                  class="bg-transparent border border-grey-secondary rounded-xl text-sm p-2 hover:cursor-pointer w-full"
                >
                  <select
                    v-model="so.code"
                    class="w-full border-none outline-none hover:cursor-pointer"
                    placeholder="Select SO"
                  >
                    <option value="">Select SO</option>
                    <option value="SO1">SO1</option>
                    <option value="SO2">SO2</option>
                  </select>
                </div>
                <div
                  class="bg-transparent border border-grey-secondary rounded-xl text-sm p-2 hover:cursor-pointer w-full"
                >
                  <select
                    v-model="so.status"
                    class="w-full border-none outline-none hover:cursor-pointer"
                    placeholder="Select PO"
                  >
                    <option value="">Select Status</option>
                    <option value="0">Pass</option>
                    <option value="1">Fail</option>
                  </select>
                </div>
                <button
                  @click="deleteSO(index)"
                  class="flex items-center justify-center rounded-xl p-2 border hover:bg-red-500 hover:text-white"
                  aria-label="Delete Student"
                >
                  <Delete class="w-5 h-5" />
                </button>
              </div>
            </div>
            <SmallAddButton
              @click="addSO"
              class="flex items-center flex-row justify-center border border-grey-secondary rounded-xl px-3 py-2 gap-2"
            >
              <span class="text-black-primary font-semibold text-base"
                >Add</span
              >
            </SmallAddButton>
          </div>
        </div>

        <!-- Save and Cancel Buttons -->
        <div
          class="flex flex-row items-center justify-center gap-4 w-full mt-4"
        >
          <button
            @click="saveChanges"
            class="py-2 font-medium border border-grey-secondary rounded-xl w-full bg-yellow-primary hover:bg-black-primary hover:text-white"
          >
            Save
          </button>
          <button
            @click="$emit('close')"
            class="py-2 font-medium border border-grey-secondary text-black-primary rounded-xl w-full hover:bg-black-primary hover:text-white"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch } from "vue";
import SmallAddButton from "@/components/button/SmallAddButton.vue";
import Delete from "@/components/icons/Delete.vue";

const props = defineProps({
  studentId: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["close", "save"]);

const student = ref({});

const Students = ref([
  {
    id: 1,
    studentId: "S001",
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    faculty: "Science",
    department: "Biology",
    program: "Undergraduate",
    gpax: 3.8,
    highSchoolGpax: 3.9,
    mathGpax: 3.7,
    scienceGpax: 3.6,
    englishGpax: 3.8,
    admission: 3.85,
    schoolName: "Greenwood High School",
    grade: [
      { semester: "1st/2023", gpax: 3.8 },
      { semester: "2nd/2023", gpax: 3.9 },
    ],
    PLO: [
      { code: "PLO1", desc: "Understand biology", status: 0 },
      { code: "PLO2", desc: "Apply biology concepts", status: 1 },
    ],
    PO: [{ code: "PO1", desc: "Demonstrate biology knowledge", status: 0 }],
    SO: [{ code: "SO1", desc: "Conduct biology experiments", status: 0 }],
  },
]);

watch(
  () => props.studentId,
  (newId) => {
    student.value = { ...Students.value.find((s) => s.studentId === newId) };
  },
  { immediate: true }
);

const addGrade = () => {
  student.value.grade.push({ semester: "", gpax: null });
};

const deleteGrade = (index) => {
  student.value.grade.splice(index, 1);
};

const addPLO = () => {
  student.value.PLO.push({ code: "", desc: "", status: 0 });
};

const deletePLO = (index) => {
  student.value.PLO.splice(index, 1);
};

const addPO = () => {
  student.value.PO.push({ code: "", desc: "", status: 0 });
};

const deletePO = (index) => {
  student.value.PO.splice(index, 1);
};

const addSO = () => {
  student.value.SO.push({ code: "", desc: "", status: 0 });
};

const deleteSO = (index) => {
  student.value.SO.splice(index, 1);
};

const saveChanges = () => {
  const index = Students.value.findIndex(
    (s) => s.studentId === student.value.studentId
  );
  if (index !== -1) {
    Students.value[index] = { ...student.value };
    emit("save", student.value);
  }
  emit("close");
};
</script>

<style scoped>
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

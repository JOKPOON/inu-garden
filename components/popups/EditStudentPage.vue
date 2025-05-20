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
              Student.name
            }}</span>
          </div>
        </div>
        <div
          class="mt-4 text-start flex gap-4 flex-col text-sm max-h-[50vh] overflow-y-scroll scrollbar-set"
        >
          <!-- Editable Student Details -->
          <div class="flex flex-col items-start w-full gap-2">
            <label class="font-semibold text-gray-primary">Student ID</label>
            <input
              disabled
              v-model="Student.id"
              type="text"
              placeholder="Student ID"
              class="w-[32rem] px-4 py-2 border border-grey-secondary rounded-xl outline-none"
            />
          </div>
          <div class="flex flex-col items-start w-full gap-2">
            <label class="font-semibold text-black-primary"
              >First Name (Thai)</label
            >
            <input
              v-model="Student.first_name_th"
              type="text"
              placeholder="First Name (Thai)"
              class="w-[32rem] px-4 py-2 border border-grey-secondary rounded-xl outline-none"
            />
          </div>
          <div class="flex flex-col items-start w-full gap-2">
            <label class="font-semibold text-black-primary">
              Last Name (Thai)
            </label>
            <input
              v-model="Student.last_name_th"
              type="text"
              placeholder="Last Name (Thai)"
              class="w-[32rem] px-4 py-2 border border-grey-secondary rounded-xl outline-none"
            />
          </div>
          <div class="flex flex-col items-start w-full gap-2">
            <label class="font-semibold text-black-primary">
              First Name (English)
            </label>
            <input
              v-model="Student.first_name_en"
              type="text"
              placeholder="First Name (English)"
              class="w-[32rem] px-4 py-2 border border-grey-secondary rounded-xl outline-none"
            />
          </div>
          <div class="flex flex-col items-start w-full gap-2">
            <label class="font-semibold text-black-primary">
              Last Name (English)
            </label>
            <input
              v-model="Student.last_name_en"
              type="text"
              placeholder="Last Name (English)"
              class="w-[32rem] px-4 py-2 border border-grey-secondary rounded-xl outline-none"
            />
          </div>
          <div class="flex flex-col items-start w-full gap-2">
            <label class="font-semibold text-black-primary">Email</label>
            <input
              v-model="Student.email"
              type="email"
              placeholder="Student Email"
              class="w-[32rem] px-4 py-2 border border-grey-secondary rounded-xl outline-none"
            />
          </div>
          <div class="flex flex-col items-start w-full gap-2">
            <label class="font-semibold text-black-primary">Department</label>
            <select
              v-model="Student.department_id"
              @change="fetchPrograms(programList, Student.department_id)"
              class="w-[32rem] px-4 py-2 border border-grey-secondary rounded-xl outline-none pr-2"
            >
              <option value="" disabled selected>Select Department</option>
              <option
                v-for="department in departmentList"
                :key="department.id"
                :value="department.id"
              >
                {{ department.name_th }}
              </option>
            </select>
          </div>
          <div class="flex flex-col items-start w-full gap-2">
            <label class="font-semibold text-black-primary">Program</label>
            <select
              v-model="Student.programme_id"
              :disabled="!Student.department_id || programList.length === 0"
              class="w-[32rem] px-4 py-2 border border-grey-secondary rounded-xl outline-none pr-2"
            >
              <option value="" disabled selected>Select Program</option>
              <option
                v-for="program in programList"
                :key="program.id"
                :value="program.id"
              >
                {{ program.name_th }}
              </option>
            </select>
          </div>
          <div class="flex flex-col items-start w-full gap-2 mb-4">
            <label class="font-semibold text-black-primary">Year</label>
            <input
              v-model="Student.year"
              type="text"
              placeholder="Year"
              class="w-[32rem] px-4 py-2 border border-grey-secondary rounded-xl outline-none"
            />
          </div>

          <!-- Editable Grade Section -->
          <div
            v-if="Student.grade"
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
            v-if="Student.PLO"
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
          <div v-if="Student.PO" class="flex flex-col items-start w-full gap-2">
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
            v-if="Student.SO"
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
import { fetchDepartments, fetchPrograms, BaseURL } from "~/api/api";

const props = defineProps({
  Student: {
    type: Object,
    required: true,
  },
});

const programList = ref([]);
const departmentList = ref([]);

const emit = defineEmits(["close", "save"]);

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

const saveChanges = async () => {
  try {
    const response = await fetch(`${BaseURL}students/${props.Student.id}`, {
      credentials: "include",
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: props.Student.id,
        first_name_th: props.Student.first_name_th,
        last_name_th: props.Student.last_name_th,
        first_name_en: props.Student.first_name_en,
        last_name_en: props.Student.last_name_en,
        email: props.Student.email,
        department_id: props.Student.department_id,
        programme_id: props.Student.programme_id,
        year: props.Student.year,
      }),
    });
    if (!response.ok) throw new Error("Failed to add student");
    emit("add");
  } catch (error) {
    console.error("Error adding student:", error);
  }
  emit("close");
};

onMounted(async () => {
  await fetchDepartments(departmentList);
  await fetchPrograms(programList, props.Student.department);
  console.log(departmentList.value);
  console.log(programList.value);
});
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

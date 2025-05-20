<template>
  <teleport to="body">
    <div
      class="fixed inset-0 flex items-center justify-center bg-black-primary bg-opacity-50 z-50"
    >
      <div
        class="bg-white p-8 rounded-2xl shadow-xl flex flex-col items-center border border-grey-secondary max-w-[70vw] w-full"
      >
        <div class="flex flex-col w-full pb-4 border-b border-grey-secondary">
          <h2 class="text-2xl font-bold text-black-primary text-left">
            Create Course
          </h2>
          <p class="text-sm text-grey-primary mt-1">
            file :
            <span class="font-semibold text-black-primary">
              {{ file?.name }}</span
            >
          </p>
          <p v-if="ErrorText" class="text-sm text-red-500 mt-1">
            <span class="font-semibold"> Error : </span>
            {{ ErrorText }}
          </p>
          <p class=""></p>
        </div>
        <div class="max-h-[50vh] overflow-y-scroll scrollbar-set">
          <div class="mt-6 grid grid-cols-3 gap-4 w-full">
            <div class="col-span-2 w-full flex flex-col gap-2">
              <div class="text-sm text-black-primary font-semibold">Name</div>
              <input
                v-model="courseName"
                class="w-full border border-grey-tertiary rounded-xl p-3 outline-grey-tertiary"
                type="text"
                placeholder="Course name"
              />
            </div>
            <div class="w-full flex flex-col gap-2">
              <div class="text-sm text-black-primary font-semibold">Code</div>
              <input
                v-model="courseCode"
                class="w-full border border-grey-tertiary rounded-xl p-3 outline-grey-tertiary"
                type="text"
                placeholder="Course code"
              />
            </div>
            <div class="col-span-3 w-full flex flex-col gap-2">
              <div class="text-sm text-black-primary font-semibold">
                Instructors
              </div>
              <div
                v-for="(instructor, index) in courseInstructors"
                :key="index"
                class="flex items-center gap-2"
              >
                <div
                  class="bg-transparent border border-grey-tertiary rounded-xl text-sm p-3 hover:cursor-pointer w-full"
                >
                  <select
                    v-model="courseInstructors[index]"
                    class="w-full focus:ring-0 outline-none hover:cursor-pointer"
                  >
                    <option value="" disabled selected>
                      Select Instructor
                    </option>
                    <option
                      v-for="instructor in instructors"
                      :key="instructor.id"
                      :value="instructor.id"
                    >
                      {{ instructor.title_th_short }}
                      {{ instructor.first_name_th }}
                      {{ instructor.last_name_th }} /
                      {{ instructor.title_en_short
                      }}{{ instructor.first_name_en }}
                      {{ instructor.last_name_en }}
                    </option>
                  </select>
                </div>
                <button
                  @click="removeInstructor(index)"
                  class="flex items-center justify-center rounded-xl p-3 border hover:bg-red-500 hover:text-white"
                >
                  <Delete class="w-5 h-5" />
                </button>
              </div>
              <button
                @click="addInstructor"
                class="flex items-center justify-center rounded-xl p-3 border hover:bg-black-primary hover:text-white"
              >
                Add Instructor
              </button>
            </div>
            <div class="w-full flex flex-col gap-2">
              <div class="text-sm text-black-primary font-semibold">
                Semester
              </div>
              <div
                class="bg-transparent border border-grey-tertiary rounded-xl text-sm p-3 hover:cursor-pointer"
              >
                <select
                  v-model="courseSemester"
                  class="w-full focus:ring-0 outline-none hover:cursor-pointer"
                >
                  <option value="" disabled selected>Select Semesters</option>
                  <option
                    v-for="semester in semesters"
                    :key="semester.id"
                    :value="semester.id"
                  >
                    {{ semester.semester_sequence }} / {{ semester.year }}
                  </option>
                </select>
              </div>
            </div>
            <div class="w-full flex flex-col gap-2">
              <div class="text-sm text-black-primary font-semibold">
                Academic Year
              </div>
              <input
                v-model="courseAcademicYear"
                class="w-full border border-grey-tertiary rounded-xl p-3 outline-grey-tertiary"
                type="text"
                placeholder="Academic Year"
              />
            </div>
            <div class="w-full flex flex-col gap-2">
              <div class="text-sm text-black-primary font-semibold">
                Graduate Year
              </div>
              <input
                v-model="courseGraduateYear"
                class="w-full border border-grey-tertiary rounded-xl p-3 outline-grey-tertiary"
                type="text"
                placeholder="Graduate Year"
              />
            </div>
            <div class="col-span-2 w-full flex flex-col gap-2">
              <div class="text-sm text-black-primary font-semibold">
                Program
              </div>
              <div
                class="bg-transparent border border-grey-tertiary rounded-xl text-sm p-3 hover:cursor-pointer"
              >
                <select
                  v-model="courseProgram"
                  class="w-full focus:ring-0 outline-none hover:cursor-pointer"
                >
                  <option value="" disabled selected>Select Programs</option>
                  <option
                    v-for="program in programs"
                    :key="program.id"
                    :value="program.id"
                  >
                    {{ program.name_en }} - {{ program.name_th }} /
                    {{ program.year }}
                  </option>
                </select>
              </div>
            </div>
            <div class="grid grid-cols-3 gap-4">
              <div class="w-full flex flex-col gap-2">
                <div class="text-sm text-black-primary font-semibold">
                  Credit
                </div>
                <input
                  v-model="courseCredit"
                  class="w-full border border-grey-tertiary rounded-xl p-3 outline-grey-tertiary"
                  type="text"
                  placeholder="Credit"
                />
              </div>
              <div class="w-full flex flex-col gap-2 col-span-2">
                <div class="text-sm text-black-primary font-semibold">
                  Expected Passing CLO %
                </div>
                <input
                  v-model="courseExpectedPassingCLOPercentage"
                  class="w-full border border-grey-tertiary rounded-xl p-3 outline-grey-tertiary"
                  type="text"
                  placeholder="ExpectedPassingCLO"
                />
              </div>
            </div>
          </div>
          <div class="w-full flex flex-col gap-2 mt-4">
            <div class="text-sm text-black-primary font-semibold">
              Course Instruction & Description
            </div>
            <textarea
              v-model="courseDescription"
              class="w-full border border-grey-tertiary rounded-xl p-3 outline-grey-tertiary"
              placeholder="Course Instruction & Description"
              rows="4"
            ></textarea>
          </div>
          <div class="w-full flex flex-col gap-2 mt-4">
            <div class="text-sm text-black-primary font-semibold">
              Define your course grade
            </div>
            <div class="flex flex-wrap gap-4">
              <div
                class="flex flex-row border border-grey-tertiary rounded-xl outline-grey-tertiary"
              >
                <div
                  class="text-sm text-black-primary font-semibold rounded-xl bg-grey-secondary py-3 px-4"
                >
                  A
                </div>
                <input
                  v-model="courseGradeA"
                  class="w-16 bg-transparent rounded-xl p-3 outline-none text-center"
                  type="text"
                  placeholder="80"
                />
              </div>
              <div
                class="flex flex-row border border-grey-tertiary rounded-xl outline-grey-tertiary"
              >
                <div
                  class="text-sm text-black-primary font-semibold rounded-xl bg-grey-secondary py-3 px-4"
                >
                  B+
                </div>
                <input
                  v-model="courseGradeBPlus"
                  class="w-16 bg-transparent rounded-xl p-3 outline-none text-center"
                  type="text"
                  placeholder="75"
                />
              </div>
              <div
                class="flex flex-row border border-grey-tertiary rounded-xl outline-grey-tertiary"
              >
                <div
                  class="text-sm text-black-primary font-semibold rounded-xl bg-grey-secondary py-3 px-4"
                >
                  B
                </div>
                <input
                  v-model="courseGradeB"
                  class="w-16 bg-transparent rounded-xl p-3 outline-none text-center"
                  type="text"
                  placeholder="70"
                />
              </div>
              <div
                class="flex flex-row border border-grey-tertiary rounded-xl outline-grey-tertiary"
              >
                <div
                  class="text-sm text-black-primary font-semibold rounded-xl bg-grey-secondary py-3 px-4"
                >
                  C+
                </div>
                <input
                  v-model="courseGradeCPlus"
                  class="w-16 bg-transparent rounded-xl p-3 outline-none text-center"
                  type="text"
                  placeholder="65"
                />
              </div>
              <div
                class="flex flex-row border border-grey-tertiary rounded-xl outline-grey-tertiary"
              >
                <div
                  class="text-sm text-black-primary font-semibold rounded-xl bg-grey-secondary py-3 px-4"
                >
                  C
                </div>
                <input
                  v-model="courseGradeC"
                  class="w-16 bg-transparent rounded-xl p-3 outline-none text-center"
                  type="text"
                  placeholder="60"
                />
              </div>
              <div
                class="flex flex-row border border-grey-tertiary rounded-xl outline-grey-tertiary"
              >
                <div
                  class="text-sm text-black-primary font-semibold rounded-xl bg-grey-secondary py-3 px-4"
                >
                  D+
                </div>
                <input
                  v-model="courseGradeDPlus"
                  class="w-16 bg-transparent rounded-xl p-3 outline-none text-center"
                  type="text"
                  placeholder="55"
                />
              </div>
              <div
                class="flex flex-row border border-grey-tertiary rounded-xl outline-grey-tertiary"
              >
                <div
                  class="text-sm text-black-primary font-semibold rounded-xl bg-grey-secondary py-3 px-4"
                >
                  D
                </div>
                <input
                  v-model="courseGradeD"
                  class="w-16 bg-transparent rounded-xl p-3 outline-none text-center"
                  type="text"
                  placeholder="50"
                />
              </div>
            </div>
          </div>
        </div>
        <div
          class="flex flex-row items-center justify-center gap-4 w-full mt-6"
        >
          <button
            @click="createCourse"
            class="py-3 px-6 font-medium border border-grey-secondary text-black-primary rounded-lg w-full bg-yellow-primary hover:bg-black-primary hover:text-white transition-all duration-200"
          >
            Create Course
          </button>
          <button
            @click="cancel"
            class="py-3 px-6 font-medium border border-grey-secondary text-black-primary rounded-lg w-full hover:bg-black-primary hover:text-white transition-all duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import StatusPopup from "@/components/popups/StatusPopup.vue";
import Delete from "@/components/icons/Delete.vue";
import { BaseURL } from "@/api/api";
import { useRouter } from "vue-router";
import { fetchInstructors, fetchPrograms, fetchSerms } from "~/api/api";
import * as XLSX from "xlsx";

const parseFileAndSetFields = async () => {
  if (!props.file) return;
  try {
    const data = await props.file.arrayBuffer();
    const workbook = XLSX.read(data, { type: "array" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const mapping = {
      name: "B2",
      code: "A2",
      "acadamic year": "E2",
      "graduate year": "F2",
      program: "C2",
      "expect passing clo": "C20",
      a: "B25",
      "b+": "B26",
      b: "B27",
      "c+": "B28",
      c: "B29",
      "d+": "B30",
      d: "B31",
    };

    const getCellValue = (cell) => (sheet[cell] ? sheet[cell].v : "");
    courseName.value = String(getCellValue(mapping.name));
    courseCode.value = String(getCellValue(mapping.code));
    courseAcademicYear.value = String(getCellValue(mapping["acadamic year"]));
    courseGraduateYear.value = String(getCellValue(mapping["graduate year"]));
    courseProgram.value = String(getCellValue(mapping.program));
    courseExpectedPassingCLOPercentage.value = Number(
      getCellValue(mapping["expect passing clo"])
    );
    courseGradeA.value = Number(getCellValue(mapping.a));
    courseGradeBPlus.value = Number(getCellValue(mapping["b+"]));
    courseGradeB.value = Number(getCellValue(mapping.b));
    courseGradeCPlus.value = Number(getCellValue(mapping["c+"]));
    courseGradeC.value = Number(getCellValue(mapping.c));
    courseGradeDPlus.value = Number(getCellValue(mapping["d+"]));
    courseGradeD.value = Number(getCellValue(mapping.d));
  } catch (e) {
    console.error("Failed to parse Excel file:", e);
  }
};

const router = useRouter();
const props = defineProps({
  file: {
    type: Object,
    required: true,
  },
});
const courseName = ref("");
const courseCode = ref("");
const courseSemester = ref("");
const courseAcademicYear = ref("");
const courseGraduateYear = ref("");
const courseProgram = ref("");
const courseCredit = ref(3);
const courseDescription = ref("");
const courseExpectedPassingCLOPercentage = ref(85.0);
const courseGradeA = ref(80);
const courseGradeBPlus = ref(75);
const courseGradeB = ref(70);
const courseGradeCPlus = ref(65);
const courseGradeC = ref(60);
const courseGradeDPlus = ref(55);
const courseGradeD = ref(50);
const instructors = ref([]);
const semesters = ref([]);
const programs = ref([]);
const courseInstructors = ref([""]);
const emit = defineEmits(["close", "imported"]);
const ErrorText = ref("");

const createCourse = async () => {
  try {
    const response = await fetch(`${BaseURL}courses`, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: courseName.value,
        code: courseCode.value,
        lecturer_ids: courseInstructors.value,
        semester_id: courseSemester.value,
        academic_year: courseAcademicYear.value,
        graduate_year: courseGraduateYear.value,
        programme_id: courseProgram.value,
        expected_passing_clo_percentage:
          courseExpectedPassingCLOPercentage.value,
        program_id: courseProgram.value,
        credit: courseCredit.value,
        description: courseDescription.value,
        criteria_grade_a: courseGradeA.value,
        criteria_grade_bp: courseGradeBPlus.value,
        criteria_grade_b: courseGradeB.value,
        criteria_grade_cp: courseGradeCPlus.value,
        criteria_grade_c: courseGradeC.value,
        criteria_grade_dp: courseGradeDPlus.value,
        criteria_grade_d: courseGradeD.value,
      }),
    });
    if (!response.ok) throw new Error("Failed to create course");
    const res = await response.json();
    console.log(res);
    router.push("/");
  } catch (error) {
    console.error("Error creating course:", error);
    ErrorText.value = "Failed to create course. Please check your input.";
  }
};

const addInstructor = () => {
  courseInstructors.value.push("");
};

const removeInstructor = (index) => {
  courseInstructors.value.splice(index, 1);
};

const cancel = () => {
  emit("close");
  router.push("/courses/create-course");
};

onMounted(() => {
  parseFileAndSetFields();
  fetchInstructors(instructors);
  fetchSerms(semesters);
  fetchPrograms(programs);
});
</script>

<style lang="scss" scoped>
.hide-scrollbar {
  scrollbar-width: thin;
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

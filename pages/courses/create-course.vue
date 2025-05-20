<template>
  <div class="flex flex-col gap-4 p-4">
    <div class="flex flex-row justify-between gap-6 items-center w-full">
      <div class="flex flex-col">
        <div class="text-2xl font-semibold text-black-primary">
          Create Course
        </div>
        <div class="text-sm text-grey-primary">Define your course details</div>
      </div>
      <div class="flex flex-row gap-4">
        <TemplateButton
          @click="clickTemplate"
          class="flex items-center flex-row justify-center border border-grey-secondary rounded-xl px-4 py-3 gap-2"
        >
          <span class="text-black-primary font-semibold text-base"
            >Template</span
          >
        </TemplateButton>
        <Import
          @click="ClickImport"
          class="flex items-center flex-row justify-center border border-grey-secondary rounded-xl px-4 py-3 gap-2"
        >
          <span class="text-black-primary font-semibold text-base">Import</span>
        </Import>
        <History
          @click="HistoryButton"
          class="flex items-center flex-row justify-center border border-grey-secondary rounded-xl px-4 py-3 gap-2"
        >
          <span class="text-black-primary font-semibold text-base"
            >History</span
          >
        </History>
      </div>
    </div>
    <div class="max-h-[calc(100vh-365px)] overflow-y-scroll hide-scrollbar">
      <div class="mt-6 grid grid-cols-3 gap-4 w-full">
        <div class="col-span-2 w-full flex flex-col gap-2">
          <div class="text-base text-black-primary font-semibold">Name</div>
          <input
            v-model="courseName"
            class="w-full border border-grey-tertiary rounded-xl p-3 outline-grey-tertiary"
            type="text"
            placeholder="Course name"
          />
        </div>
        <div class="w-full flex flex-col gap-2">
          <div class="text-base text-black-primary font-semibold">Code</div>
          <input
            v-model="courseCode"
            class="w-full border border-grey-tertiary rounded-xl p-3 outline-grey-tertiary"
            type="text"
            placeholder="Course code"
          />
        </div>
        <div class="col-span-3 w-full flex flex-col gap-2">
          <div class="text-base text-black-primary font-semibold">
            Instructors
          </div>
          <div
            v-for="(instructor, index) in courseInstructors"
            :key="index"
            class="flex items-center gap-2"
          >
            <div
              class="bg-transparent border border-grey-tertiary rounded-xl text-base p-3 hover:cursor-pointer w-full"
            >
              <select
                v-model="courseInstructors[index]"
                class="w-full focus:ring-0 outline-none hover:cursor-pointer"
              >
                <option value="" disabled selected>Select Instructor</option>
                <option
                  v-for="instructor in instructors"
                  :key="instructor.id"
                  :value="instructor.id"
                >
                  {{ instructor.title_th_short }}
                  {{ instructor.first_name_th }} {{ instructor.last_name_th }} /
                  {{ instructor.title_en_short }}{{ instructor.first_name_en }}
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
          <div class="text-base text-black-primary font-semibold">Semester</div>
          <div
            class="bg-transparent border border-grey-tertiary rounded-xl text-base p-3 hover:cursor-pointer"
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
          <div class="text-base text-black-primary font-semibold">
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
          <div class="text-base text-black-primary font-semibold">
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
          <div class="text-base text-black-primary font-semibold">Program</div>
          <div
            class="bg-transparent border border-grey-tertiary rounded-xl text-base p-3 hover:cursor-pointer"
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
            <div class="text-base text-black-primary font-semibold">Credit</div>
            <input
              v-model="courseCredit"
              class="w-full border border-grey-tertiary rounded-xl p-3 outline-grey-tertiary"
              type="text"
              placeholder="Credit"
            />
          </div>
          <div class="w-full flex flex-col gap-2 col-span-2">
            <div class="text-base text-black-primary font-semibold">
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
        <div class="text-base text-black-primary font-semibold">
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
        <div class="text-base text-black-primary font-semibold">
          Define your course grade
        </div>
        <div class="flex flex-wrap gap-4">
          <div
            class="flex flex-row border border-grey-tertiary rounded-xl outline-grey-tertiary"
          >
            <div
              class="text-base text-black-primary font-semibold rounded-xl bg-grey-secondary py-3 px-4"
            >
              A
            </div>
            <input
              v-model="courseGradeA"
              class="w-20 bg-transparent rounded-xl p-3 outline-none text-center"
              type="text"
              placeholder="80"
            />
          </div>
          <div
            class="flex flex-row border border-grey-tertiary rounded-xl outline-grey-tertiary"
          >
            <div
              class="text-base text-black-primary font-semibold rounded-xl bg-grey-secondary py-3 px-4"
            >
              B+
            </div>
            <input
              v-model="courseGradeBPlus"
              class="w-20 bg-transparent rounded-xl p-3 outline-none text-center"
              type="text"
              placeholder="75"
            />
          </div>
          <div
            class="flex flex-row border border-grey-tertiary rounded-xl outline-grey-tertiary"
          >
            <div
              class="text-base text-black-primary font-semibold rounded-xl bg-grey-secondary py-3 px-4"
            >
              B
            </div>
            <input
              v-model="courseGradeB"
              class="w-20 bg-transparent rounded-xl p-3 outline-none text-center"
              type="text"
              placeholder="70"
            />
          </div>
          <div
            class="flex flex-row border border-grey-tertiary rounded-xl outline-grey-tertiary"
          >
            <div
              class="text-base text-black-primary font-semibold rounded-xl bg-grey-secondary py-3 px-4"
            >
              C+
            </div>
            <input
              v-model="courseGradeCPlus"
              class="w-20 bg-transparent rounded-xl p-3 outline-none text-center"
              type="text"
              placeholder="65"
            />
          </div>
          <div
            class="flex flex-row border border-grey-tertiary rounded-xl outline-grey-tertiary"
          >
            <div
              class="text-base text-black-primary font-semibold rounded-xl bg-grey-secondary py-3 px-4"
            >
              C
            </div>
            <input
              v-model="courseGradeC"
              class="w-20 bg-transparent rounded-xl p-3 outline-none text-center"
              type="text"
              placeholder="60"
            />
          </div>
          <div
            class="flex flex-row border border-grey-tertiary rounded-xl outline-grey-tertiary"
          >
            <div
              class="text-base text-black-primary font-semibold rounded-xl bg-grey-secondary py-3 px-4"
            >
              D+
            </div>
            <input
              v-model="courseGradeDPlus"
              class="w-20 bg-transparent rounded-xl p-3 outline-none text-center"
              type="text"
              placeholder="55"
            />
          </div>
          <div
            class="flex flex-row border border-grey-tertiary rounded-xl outline-grey-tertiary"
          >
            <div
              class="text-base text-black-primary font-semibold rounded-xl bg-grey-secondary py-3 px-4"
            >
              D
            </div>
            <input
              v-model="courseGradeD"
              class="w-20 bg-transparent rounded-xl p-3 outline-none text-center"
              type="text"
              placeholder="50"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="w-full flex justify-end gap-4 mt-6">
      <button
        @click="createCourse"
        class="flex items-center flex-row justify-center bg-yellow-primary rounded-xl px-4 py-3 gap-2"
      >
        <span class="text-black-primary font-[500] text-base"
          >Create Course</span
        >
      </button>
      <button
        @click="cancel"
        class="flex items-center flex-row justify-center font-[500] bg-grey-secondary rounded-xl p-3 border hover:bg-black-primary text-black-primary hover:text-white"
      >
        Cancel
      </button>
    </div>
  </div>

  <CourseHistory v-if="isPopupVisible" @close="isPopupVisible = false" />
  <ImportCorse 
    v-if="isImportPopupVisible"
    @close="isImportPopupVisible = false"
  />

  <StatusPopup
    v-if="statusVisible"
    @close="statusVisible = false"
    :status="status"
    :message="message"
    :path="path"
  />
</template>

<script setup>
import TemplateButton from "@/components/button/TemplateButton.vue";
import Import from "@/components/button/ImportButton.vue";
import History from "@/components/button/HistoryButton.vue";
import Delete from "@/components/icons/Delete.vue";
import CourseHistory from "@/components/popups/CourseHistory.vue";
import ImportCorse from "@/components/popups/ImportCorse.vue";
import { BaseURL } from "@/api/api";
import StatusPopup from "@/components/popups/StatusPopup.vue";
import { useRouter } from "vue-router";
import { fetchInstructors, fetchPrograms, fetchSerms } from "~/api/api";

const router = useRouter();
const { t } = useI18n();

useHead({
  title: "Inu - Create Course",
  description: t("seo.desc"),
});

definePageMeta({
  layout: "landing",
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

const isPopupVisible = ref(false);
const isImportPopupVisible = ref(false);
const statusVisible = ref(false);
const message = ref("");
const path = ref("");
const status = ref("");

const HistoryButton = () => {
  isPopupVisible.value = true;
  isImportPopupVisible.value = false;
};

const clickTemplate = () => {
  window.open(
    "https://cdn.discordapp.com/attachments/1266636608971477085/1374297978688372776/instant_course_import_template.xlsx?ex=682d8a3b&is=682c38bb&hm=c81aded386a525d836106b3c7ba1b527f4bbf443e56aaa82f227bc3871cdbdf7&",
    "_blank"
  );
};

const ClickImport = () => {
  isImportPopupVisible.value = true;
  isPopupVisible.value = false;
};

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
    status.value = "success";
    message.value = "Course created successfully!";
    path.value = "/";
    statusVisible.value = true;
  } catch (error) {
    console.error("Error creating course:", error);
    status.value = "error";
    message.value = "Failed to create course!";
    path.value = "/courses/create-course";
    statusVisible.value = true;
  }
};

const addInstructor = () => {
  courseInstructors.value.push("");
};

const removeInstructor = (index) => {
  courseInstructors.value.splice(index, 1);
};

const cancel = () => {
  router.push("/");
};

onMounted(() => {
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

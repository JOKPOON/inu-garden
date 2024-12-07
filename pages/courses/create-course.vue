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
          @click="Template"
          class="flex items-center flex-row justify-center border border-grey-secondary rounded-xl px-4 py-3 gap-2"
        >
          <span class="text-black-primary font-semibold text-base"
            >Template</span
          >
        </TemplateButton>
        <Import
          @click="Import"
          class="flex items-center flex-row justify-center border border-grey-secondary rounded-xl px-4 py-3 gap-2"
        >
          <span class="text-black-primary font-semibold text-base">Import</span>
        </Import>
        <History
          @click="History"
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
        <div class="w-full flex flex-col gap-2">
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
        <div class="w-full flex flex-col gap-2">
          <div class="text-base text-black-primary font-semibold">
            Instructor
          </div>
          <div
            class="bg-transparent border border-grey-tertiary rounded-xl text-base p-3 hover:cursor-pointer"
          >
            <select
              v-model="courseInstructor"
              class="w-full focus:ring-0 outline-none hover:cursor-pointer"
            >
              <option value="" disabled selected>Select Instructor</option>
              <option
                v-for="instructor in instructors"
                :key="instructor.id"
                :value="instructor.id"
              >
                {{ instructor.first_name }}
              </option>
            </select>
          </div>
        </div>
        <div class="w-full flex flex-col gap-2">
          <div class="text-base text-black-primary font-semibold">Semester</div>
          <div
            class="bg-transparent border border-grey-tertiary rounded-xl text-base p-3 hover:cursor-pointer"
          >
            <select
              v-model="courseInstructor"
              class="w-full focus:ring-0 outline-none hover:cursor-pointer"
            >
              <option value="" disabled selected>Select Semesters</option>
              <option
                v-for="semester in semesters"
                :key="semester.value"
                :value="semester.value"
              >
                {{ semester.year }}
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
        <div class="w-full flex flex-col gap-2">
          <div class="text-base text-black-primary font-semibold">
            Program Year
          </div>
          <input
            v-model="courseProgramYear"
            class="w-full border border-grey-tertiary rounded-xl p-3 outline-grey-tertiary"
            type="text"
            placeholder="Program Year"
          />
        </div>
        <div class="w-full flex flex-col gap-2">
          <div class="text-base text-black-primary font-semibold">Program</div>
          <div
            class="bg-transparent border border-grey-tertiary rounded-xl text-base p-3 hover:cursor-pointer"
          >
            <select
              v-model="courseProgram"
              class="w-full focus:ring-0 outline-none hover:cursor-pointer"
            >
              <option value="" disabled selected>Program</option>
              <option
                v-for="Program in Programs"
                :key="Program.value"
                :value="Program.value"
              >
                {{ Program.year }}
              </option>
            </select>
          </div>
        </div>
        <div class="w-full flex flex-col gap-2">
          <div class="text-base text-black-primary font-semibold">Credit</div>
          <input
            v-model="courseCredit"
            class="w-full border border-grey-tertiary rounded-xl p-3 outline-grey-tertiary"
            type="text"
            placeholder="Credit"
          />
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
   
    </div>   <div class="w-full flex justify-end gap-4 mt-6">
        <button
          @click="createCourse"
          class="flex items-center flex-row justify-center bg-yellow-primary rounded-xl px-4 py-3 gap-2"
        >
          <span class="text-black-primary font-[500] text-base"
            >Create Course</span
          >
        </button>
        <button
          @click="cancelCourse"
          class="flex items-center flex-row justify-center font-[500] bg-grey-secondary rounded-xl p-3 border hover:bg-black-primary text-black-primary hover:text-white"
        >
          Cancel
        </button>
      </div>
  </div>
</template>

<script setup>
import TemplateButton from "@/components/button/TemplateButton.vue";
import Import from "@/components/button/ImportButton.vue";
import History from "@/components/button/HistoryButton.vue";
const { t } = useI18n();

const instructors = ref([
  { id: 1, first_name: "John" },
  { id: 2, first_name: "Doe" },
  { id: 3, first_name: "Jane" },
]);

const semesters = ref([
  { value: 1, year: "2021" },
  { value: 2, year: "2022" },
  { value: 3, year: "2023" },
]);

const Programs = ref([
  { value: 1, year: "2021" },
  { value: 2, year: "2022" },
  { value: 3, year: "2023" },
]);

useHead({
  title: t("seo.title"),
  description: t("seo.desc"),
});

definePageMeta({
  layout: "landing",
});
</script>

<style lang="scss" scoped>
.hide-scrollbar {
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>

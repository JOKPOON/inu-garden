<template>
  <teleport to="body">
    <div
      class="w-full h-full fixed inset-0 flex items-center justify-center bg-black-primary bg-opacity-50 z-50"
    >
      <div class="flex flex-col gap-4 p-4 py-6 px-12 bg-white rounded-xl">
        <div class="flex flex-row justify-between gap-6 items-center w-full">
          <div class="flex flex-col">
            <div class="text-2xl font-semibold text-black-primary">
              Import Course
            </div>
            <div class="text-sm text-grey-primary">
              Define your course details
            </div>
          </div>
        </div>
        <div
          class="border border-grey-secondary rounded-xl p-4 max-h-[calc(100vh-300px)] overflow-y-scroll hide-scrollbar scrollbar-set"
        >
          <div class="grid grid-cols-3 gap-4 w-full">
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
              <div class="text-base text-black-primary font-semibold">
                Semester
              </div>
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
            <div class="w-full flex flex-col gap-2">
              <div class="text-base text-black-primary font-semibold">
                Program
              </div>
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
            <div class="w-full flex flex-col gap-2">
              <div class="text-base text-black-primary font-semibold">
                Credit
              </div>
              <input
                v-model="courseCredit"
                class="w-full border border-grey-tertiary rounded-xl p-3 outline-grey-tertiary"
                type="text"
                placeholder="Credit"
              />
            </div>
            <div class="w-full flex flex-col gap-2">
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
            @click="EditCourse"
            class="flex items-center flex-row justify-center bg-yellow-primary rounded-xl px-4 py-3 gap-2"
          >
            <span class="text-black-primary font-[500] text-base"
              >Import Course</span
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
    </div>
  </teleport>
</template>

<script setup>
import Delete from "@/components/icons/Delete.vue";
import base_url from "@/config/api";
const { t } = useI18n();

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

const router = useRouter();
const emit = defineEmits(["close"]);

const cancelCourse = () => {
  emit("close");
};

const EditCourse = async () => {
  try {
    const response = await fetch(`${base_url}courses`, {
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
  }
};

const fetchInstructors = async () => {
  try {
    const response = await fetch(`${base_url}users`, {
      credentials: "include",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) throw new Error("Failed to fetch instructors");
    const res = await response.json(); // Adjust based on API response structure
    instructors.value = res.data.data;
  } catch (error) {
    console.error("Error fetching instructors:", error);
  }
};

const fetchSemesters = async () => {
  try {
    const response = await fetch(`${base_url}semesters`, {
      credentials: "include",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) throw new Error("Failed to fetch semesters");
    const res = await response.json();
    semesters.value = res.data;
  } catch (error) {
    console.error("Error fetching semesters:", error);
  }
};

const fetchPrograms = async () => {
  try {
    const response = await fetch(`${base_url}programmes`, {
      credentials: "include",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) throw new Error("Failed to fetch programs");
    const res = await response.json();
    programs.value = res.data;
  } catch (error) {
    console.error("Error fetching programs:", error);
  }
};

const addInstructor = () => {
  courseInstructors.value.push("");
};

const removeInstructor = (index) => {
  courseInstructors.value.splice(index, 1);
};

// Call API functions on component mount
onMounted(() => {
  fetchInstructors();
  fetchSemesters();
  fetchPrograms();
});

useHead({
  title: t("seo.title"),
  description: t("seo.desc"),
});

definePageMeta({
  layout: "landing",
});
</script>

<style lang="scss" scoped>
.scrollbar-set {
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

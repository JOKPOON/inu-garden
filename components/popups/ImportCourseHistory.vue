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
          v-if="course"
          class="border border-grey-secondary rounded-xl p-4 max-h-[calc(100vh-300px)] max-w-[70vw] overflow-y-scroll hide-scrollbar scrollbar-set"
        >
          <div class="grid grid-cols-3 gap-4 w-full">
            <div class="col-span-2 w-full flex flex-col gap-2">
              <div class="text-base text-black-primary font-semibold">Name</div>
              <input
                v-model="course.name"
                class="w-full border border-grey-tertiary rounded-xl p-3 outline-grey-tertiary"
                type="text"
                placeholder="Course name"
              />
            </div>
            <div class="w-full flex flex-col gap-2">
              <div class="text-base text-black-primary font-semibold">Code</div>
              <input
                v-model="course.code"
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
                v-model="course.academic_year"
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
                v-model="course.graduate_year"
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
                v-model="course.credit"
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
                v-model="course.expected_passing_clo_percentage"
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
              v-model="course.description"
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
                  v-model="course.criteria_grade_a"
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
                  v-model="course.criteria_grade_bp"
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
                  v-model="course.criteria_grade_b"
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
                  v-model="course.criteria_grade_cp"
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
                  v-model="course.criteria_grade_c"
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
                  v-model="course.criteria_grade_dp"
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
                  v-model="course.criteria_grade_d"
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
import { BaseURL, fetchCourse } from "@/api/api";
import { fetchInstructors } from "@/api/api";

const { t } = useI18n();

const props = defineProps({
  course_id: {
    type: Object,
    required: true,
  },
  semester: {
    type: Object,
    required: true,
  },
  program: {
    type: Object,
    required: true,
  },
});

const course = ref();
const instructors = ref([]);
const semesters = ref(props.semester);
const programs = ref(props.program);
const courseInstructors = ref([""]);
const courseSemester = ref("");
const courseProgram = ref("");

const router = useRouter();
const emit = defineEmits(["close"]);

const cancelCourse = () => {
  emit("close");
};

const EditCourse = async () => {
  try {
    const response = await fetch(`${BaseURL}courses`, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: course.value.name,
        code: course.value.code,
        lecturer_ids: courseInstructors.value,
        semester_id: courseSemester.value,
        academic_year: course.value.academic_year,
        graduate_year: course.value.graduate_year,
        programme_id: courseProgram.value,
        expected_passing_clo_percentage:
          course.value.expected_passing_clo_percentage,
        program_id: courseProgram.value,
        credit: course.value.credit,
        description: course.value.description,
        criteria_grade_a: course.value.criteria_grade_a,
        criteria_grade_bp: course.value.criteria_grade_bp,
        criteria_grade_b: course.value.criteria_grade_b,
        criteria_grade_cp: course.value.criteria_grade_cp,
        criteria_grade_c: course.value.criteria_grade_c,
        criteria_grade_dp: course.value.criteria_grade_dp,
        criteria_grade_d: course.value.criteria_grade_d,
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

const addInstructor = () => {
  courseInstructors.value.push("");
};

const removeInstructor = (index) => {
  courseInstructors.value.splice(index, 1);
};

watch(course, () => {
  courseInstructors.value = course.value.lecturers.map((instructor) => {
    return instructor.id;
  });

  courseSemester.value = course.value.semester.id;
  courseProgram.value = course.value.programme.id;
});

// Call API functions on component mount
onMounted(async () => {
  await fetchCourse(course, props.course_id);
  await fetchInstructors(instructors);

  console.log("course", course.value);
  console.log("instructors", instructors.value);
  console.log("semesters", semesters.value);
  console.log("programs", programs.value);
  console.log("courseInstructors", courseInstructors.value);
  console.log("courseSemester", courseSemester.value);
  console.log("courseProgram", courseProgram.value);
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

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
            Student Details
          </div>
          <div class="text-sm text-grey-primary mt-1">
            Details of
            <span class="font-normal text-grey-primary">{{
              student.name
            }}</span>
          </div>
        </div>
        <div
          v-if="overallDetails"
          class="mt-4 text-start flex gap-4 flex-col text-sm max-h-[50vh] overflow-y-scroll scrollbar-set"
        >
          <div class="flex flex-col items-start w-full gap-2">
            <label class="font-normal text-grey-primary">Student ID</label>
            <div
              class="w-[32rem] px-4 py-2 border border-grey-secondary rounded-xl"
            >
              {{ student.studentId }}
            </div>
          </div>
          <div class="flex flex-col items-start w-full gap-2">
            <label class="font-normal text-grey-primary">Name</label>
            <div
              class="w-[32rem] px-4 py-2 border border-grey-secondary rounded-xl"
            >
              {{ student.name }}
            </div>
          </div>
          <div class="flex flex-col items-start w-full gap-2">
            <label class="font-normal text-grey-primary">Email</label>
            <div
              class="w-[32rem] px-4 py-2 border border-grey-secondary rounded-xl"
            >
              {{ student.email }}
            </div>
          </div>
          <div class="flex flex-col items-start w-full gap-2">
            <label class="font-normal text-grey-primary">Faculty</label>
            <div
              class="w-[32rem] px-4 py-2 border border-grey-secondary rounded-xl"
            >
              {{ student.faculty }}
            </div>
          </div>
          <div class="flex flex-col items-start w-full gap-2">
            <label class="font-normal text-grey-primary">Department</label>
            <div
              class="w-[32rem] px-4 py-2 border border-grey-secondary rounded-xl"
            >
              {{ student.department }}
            </div>
          </div>
          <div class="flex flex-col items-start w-full gap-2">
            <label class="font-normal text-grey-primary">Program</label>
            <div
              class="w-[32rem] px-4 py-2 border border-grey-secondary rounded-xl"
            >
              {{ student.program }}
            </div>
          </div>
          <div class="grid grid-cols-2 w-[32rem] gap-2">
            <div class="flex flex-col items-start w-full gap-2">
              <label class="font-normal text-grey-primary">GPAX</label>
              <div
                class="w-full px-4 py-2 border border-grey-secondary rounded-xl"
              >
                {{ student.gpax }}
              </div>
            </div>
            <div class="flex flex-col items-start w-full gap-2">
              <label class="font-normal text-grey-primary"
                >High School GPAX</label
              >
              <div
                class="w-full px-4 py-2 border border-grey-secondary rounded-xl"
              >
                {{ student.highSchoolGpax }}
              </div>
            </div>

            <div class="grid grid-cols-2 w-[32rem] gap-2">
              <div class="flex flex-col items-start w-full gap-2">
                <label class="font-normal text-grey-primary">Math GPAX</label>
                <div
                  class="w-full px-4 py-2 border border-grey-secondary rounded-xl"
                >
                  {{ student.mathGpax }}
                </div>
              </div>
              <div class="flex flex-col items-start w-full gap-2">
                <label class="font-normal text-grey-primary"
                  >Science GPAX</label
                >
                <div
                  class="w-full px-4 py-2 border border-grey-secondary rounded-xl"
                >
                  {{ student.scienceGpax }}
                </div>
              </div>
              <div class="flex flex-col items-start w-full gap-2">
                <label class="font-normal text-grey-primary"
                  >English GPAX</label
                >
                <div
                  class="w-full px-4 py-2 border border-grey-secondary rounded-xl"
                >
                  {{ student.englishGpax }}
                </div>
              </div>
              <div class="flex flex-col items-start w-full gap-2">
                <label class="font-normal text-grey-primary"
                  >Admission Score</label
                >
                <div
                  class="w-full px-4 py-2 border border-grey-secondary rounded-xl"
                >
                  {{ student.admission }}
                </div>
              </div>
            </div>
          </div>
          <div class="flex flex-col items-start w-full gap-2 mb-4">
            <label class="font-normal text-grey-primary">School Name</label>
            <div
              class="w-[32rem] px-4 py-2 border border-grey-secondary rounded-xl"
            >
              {{ student.schoolName }}
            </div>
          </div>
        </div>
        <div
          v-if="showGradeDetails"
          class="mt-4 text-start flex gap-4 flex-col text-sm max-h-[50vh] w-[32rem] overflow-y-scroll scrollbar-set"
        >
          <div class="rounded-xl border border-grey-secondary p-4 w-full">
            <div
              class="w-full grid grid-cols-2 gap-2 pb-2 border-b border-grey-secondary"
            >
              <div class="font-normal text-grey-primary w-full">Semester</div>
              <div class="font-normal text-grey-primary w-full text-center">
                GPA
              </div>
            </div>
            <div class="gap-2 my-2">
              <div
                v-for="(grade, index) in student.grade"
                :key="index"
                class="grid grid-cols-2 text-black-primary"
              >
                <div class="text-sm w-full text-black-primary">
                  {{ grade.semester }}
                </div>
                <div class="text-sm w-full text-center text-black-primary">
                  {{ grade.gpax }}
                </div>
              </div>
            </div>
            <div
              class="w-full grid grid-cols-2 gap-2 pt-2 border-t border-grey-secondary"
            >
              <div class="font-semibold text-black-primary w-full">GPAX</div>
              <div class="font-semibold text-black-primary w-full text-center">
                {{ student.gpax }}
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="showPLODetails"
          class="mt-4 text-start flex gap-4 flex-col text-sm max-h-[50vh] max-w-[50vw] overflow-y-scroll scrollbar-set w-full"
        >
          <div class="rounded-xl border border-grey-secondary p-4 w-full">
            <div
              class="w-full grid grid-cols-5 gap-6 pb-2 border-b border-grey-secondary"
            >
              <div class="font-normal text-grey-primary w-full col-span-2">
                PLO
              </div>
              <div class="font-normal text-grey-primary w-full col-span-2">
                Course
              </div>
              <div
                class="font-normal text-grey-primary w-full col-span-1 text-center"
              >
                Status
              </div>
            </div>
            <div class="gap-2 my-2">
              <div
                v-for="(plo, index) in student.PLO"
                :key="index"
                class="grid grid-cols-5 text-black-primary gap-6 py-2 border-b border-grey-secondary"
              >
                <div class="text-sm w-full text-black-primary col-span-2">
                  <div class="text-black-primary">
                    {{ plo.code }}
                    <span class="text-grey-primary">
                      -
                      {{ plo.desc }}
                    </span>
                  </div>
                </div>
                <div class="text-sm w-full text-black-primary col-span-2">
                  <div
                    v-for="course in plo.course"
                    :key="course.id"
                    class="flex flex-row gap-2"
                  >
                    <div class="text-black-primary">
                      {{ course.id }}
                    </div>
                    <div class="text-grey-primary">- {{ course.name }}</div>
                  </div>
                </div>
                <div
                  class="text-sm w-full text-center text-black-primary col-span-1 h-full items-center flex justify-center"
                >
                  <span v-if="plo.status == 0" class="text-green-500"
                    >Pass</span
                  >
                  <span v-else-if="plo.status == 1" class="text-red-500"
                    >Fail</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="showPODetails"
          class="mt-4 text-start flex gap-4 flex-col text-sm max-h-[50vh] w-[32rem] overflow-y-scroll scrollbar-set"
        >
          <div class="rounded-xl border border-grey-secondary p-4 w-full">
            <div
              class="w-full grid grid-cols-3 gap-6 pb-2 border-b border-grey-secondary"
            >
              <div class="font-normal text-grey-primary w-full col-span-2">
                PO
              </div>

              <div
                class="font-normal text-grey-primary w-full col-span-1 text-center"
              >
                Status
              </div>
            </div>
            <div class="gap-2 my-2">
              <div
                v-for="(po, index) in student.PO"
                :key="index"
                class="grid grid-cols-3 text-black-primary gap-6 py-2 border-b border-grey-secondary"
              >
                <div class="text-sm w-full text-black-primary col-span-2">
                  <div class="text-black-primary">
                    {{ po.code }}
                    <span class="text-grey-primary">
                      -
                      {{ po.desc }}
                    </span>
                  </div>
                </div>

                <div
                  class="text-sm w-full text-center text-black-primary col-span-1 h-full items-center flex justify-center"
                >
                  <span v-if="po.status == 0" class="text-green-500">Pass</span>
                  <span v-else-if="po.status == 1" class="text-red-500"
                    >Fail</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="showSODetails"
          class="mt-4 text-start flex gap-4 flex-col text-sm max-h-[50vh] w-[32rem] overflow-y-scroll scrollbar-set"
        >
          <div class="rounded-xl border border-grey-secondary p-4 w-full">
            <div
              class="w-full grid grid-cols-3 gap-6 pb-2 border-b border-grey-secondary"
            >
              <div class="font-normal text-grey-primary w-full col-span-2">
                SO
              </div>

              <div
                class="font-normal text-grey-primary w-full col-span-1 text-center"
              >
                Status
              </div>
            </div>
            <div class="gap-2 my-2">
              <div
                v-for="(so, index) in student.SO"
                :key="index"
                class="grid grid-cols-3 text-black-primary gap-6 py-2 border-b border-grey-secondary"
              >
                <div class="text-sm w-full text-black-primary col-span-2">
                  <div class="text-black-primary">
                    {{ so.code }}
                    <span class="text-grey-primary">
                      -
                      {{ so.desc }}
                    </span>
                  </div>
                </div>
                <div
                  class="text-sm w-full text-center text-black-primary col-span-1 h-full items-center flex justify-center"
                >
                  <span v-if="so.status == 0" class="text-green-500">Pass</span>
                  <span v-else-if="so.status == 1" class="text-red-500"
                    >Fail</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="mt-4 text-center flex gap-4 flex-row w-full justify-between"
        >
          <div
            class="flex flex-row items-center justify-center gap-2 w-full rounded-xl text-sm"
          >
            <button
              @click="showDetails"
              :class="[
                'py-2 font-medium border border-grey-secondary rounded-lg w-full',
                overallDetails
                  ? 'bg-black text-white'
                  : 'text-black-primary hover:bg-black-primary hover:text-white',
              ]"
            >
              Details
            </button>
            <button
              @click="GradeDetails"
              :class="[
                'py-2 font-medium border border-grey-secondary rounded-lg w-full',
                showGradeDetails
                  ? 'bg-black text-white'
                  : 'text-black-primary hover:bg-black-primary hover:text-white',
              ]"
            >
              Grade
            </button>
            <button
              @click="PLODetails"
              :class="[
                'py-2 font-medium border border-grey-secondary rounded-lg w-full',
                showPLODetails
                  ? 'bg-black text-white'
                  : 'text-black-primary hover:bg-black-primary hover:text-white',
              ]"
            >
              PLO
            </button>
            <button
              @click="PODetails"
              :class="[
                'py-2 font-medium border border-grey-secondary rounded-lg w-full',
                showPODetails
                  ? 'bg-black text-white'
                  : 'text-black-primary hover:bg-black-primary hover:text-white',
              ]"
            >
              PO
            </button>
            <button
              @click="SODetails"
              :class="[
                'py-2 font-medium border border-grey-secondary rounded-lg w-full',
                showSODetails
                  ? 'bg-black text-white'
                  : 'text-black-primary hover:bg-black-primary hover:text-white',
              ]"
            >
              SO
            </button>
          </div>
        </div>

        <div
          class="flex flex-row items-center justify-center gap-4 w-full mt-4"
        >
          <button
            @click="$emit('close')"
            class="py-2 font-medium border border-grey-secondary text-black-primary rounded-xl w-full hover:bg-black-primary hover:text-white"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch } from "vue";

const props = defineProps({
  studentId: {
    type: String,
    required: true,
  },
});

const student = ref({});
const overallDetails = ref(true);

const Students = ref([
  {
    id: 1,
    studentId: "S001",
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    faculty: "Science",
    department: "Biology",
    program: "Undergraduate",
    gpax: 3.85,
    highSchoolGpax: 3.8,
    mathGpax: 3.9,
    scienceGpax: 3.9,
    englishGpax: 3.7,
    admission: 3.85,
    schoolName: "Greenwood High School",
    grade: [
      {
        semester: "1st/2023",
        gpax: 3.8,
      },
      {
        semester: "2nd/2023",
        gpax: 3.9,
      },
      {
        semester: "3rd/2023",
        gpax: 4.0,
      },
      {
        semester: "4th/2023",
        gpax: 3.7,
      },
    ],
    PLO: [
      {
        code: "PLO1",
        desc: "Understand the basic concepts of biology",
        course: [
          { id: "CPE2", name: "Biology 101" },
          { id: "CPE3", name: "Biology Lab" },
        ],
        status: 0,
      },
      {
        code: "PLO2",
        desc: "Apply biological concepts to real-world problems",
        course: [
          { id: "CPE4", name: "Biology 201" },
          { id: "CPE5", name: "Biology Lab II" },
        ],
        status: 1,
      },
    ],
    PO: [
      {
        code: "PO1",
        desc: "Demonstrate knowledge of biology",
        course: [
          { id: "CPE4", name: "Biology 201" },
          { id: "CPE5", name: "Biology Lab II" },
        ],
        status: 0,
      },
    ],
    SO: [
      {
        code: "SO1",
        desc: "Conduct experiments in biology",
        course: [
          { id: "CPE4", name: "Biology 201" },
          { id: "CPE5", name: "Biology Lab II" },
        ],
        status: 0,
      },
    ],
  },
  {
    id: 2,
    studentId: "S002",
    name: "Bob Smith",
    email: "bob.smith@example.com",
    faculty: "Engineering",
    department: "Computer Engineering",
    program: "Undergraduate",
    gpax: 3.7,
    highSchoolGpax: 3.6,
    mathGpax: 3.9,
    scienceGpax: 3.8,
    englishGpax: 3.5,
    admission: 3.7,
    schoolName: "Tech Valley High School",
    grade: [
      {
        semester: "1st/2023",
        gpax: 3.8,
      },
      {
        semester: "2nd/2023",
        gpax: 3.9,
      },
      {
        semester: "3rd/2023",
        gpax: 4.0,
      },
      {
        semester: "4th/2023",
        gpax: 3.7,
      },
    ],
    PLO: [
      {
        code: "PLO1",
        desc: "Understand the basic concepts of biology",
        course: [
          { id: "CPE2", name: "Biology 101" },
          { id: "CPE3", name: "Biology Lab" },
        ],
        status: 0,
      },
      {
        code: "PLO2",
        desc: "Apply biological concepts to real-world problems",
        course: [
          { id: "CPE4", name: "Biology 201" },
          { id: "CPE5", name: "Biology Lab II" },
        ],
        status: 1,
      },
    ],
    PO: [
      {
        code: "PO1",
        desc: "Demonstrate knowledge of biology",
        course: [
          { id: "CPE4", name: "Biology 201" },
          { id: "CPE5", name: "Biology Lab II" },
        ],
        status: 0,
      },
    ],
    SO: [
      {
        code: "SO1",
        desc: "Conduct experiments in biology",
        course: [
          { id: "CPE4", name: "Biology 201" },
          { id: "CPE5", name: "Biology Lab II" },
        ],
        status: 0,
      },
    ],
  },
  {
    id: 3,
    studentId: "S003",
    name: "Charlie Brown",
    email: "charlie.brown@example.com",
    faculty: "Arts",
    department: "History",
    program: "Undergraduate",
    gpax: 3.8,
    highSchoolGpax: 3.9,
    mathGpax: 3.9,
    scienceGpax: 3.4,
    englishGpax: 4.0,
    admission: 3.85,
    schoolName: "Riverside High School",
    grade: [
      {
        semester: "1st/2023",
        gpax: 3.8,
      },
      {
        semester: "2nd/2023",
        gpax: 3.9,
      },
      {
        semester: "3rd/2023",
        gpax: 4.0,
      },
      {
        semester: "4th/2023",
        gpax: 3.7,
      },
    ],
    PLO: [
      {
        code: "PLO1",
        desc: "Understand the basic concepts of biology",
        course: [
          { id: "CPE2", name: "Biology 101" },
          { id: "CPE3", name: "Biology Lab" },
        ],
        status: 0,
      },
      {
        code: "PLO2",
        desc: "Apply biological concepts to real-world problems",
        course: [
          { id: "CPE4", name: "Biology 201" },
          { id: "CPE5", name: "Biology Lab II" },
        ],
        status: 1,
      },
    ],
    PO: [
      {
        code: "PO1",
        desc: "Demonstrate knowledge of biology",
        course: [
          { id: "CPE4", name: "Biology 201" },
          { id: "CPE5", name: "Biology Lab II" },
        ],
        status: 0,
      },
    ],
    SO: [
      {
        code: "SO1",
        desc: "Conduct experiments in biology",
        course: [
          { id: "CPE4", name: "Biology 201" },
          { id: "CPE5", name: "Biology Lab II" },
        ],
        status: 0,
      },
    ],
  },
  {
    id: 4,
    studentId: "S004",
    name: "Diana Prince",
    email: "diana.prince@example.com",
    faculty: "Business",
    department: "Marketing",
    program: "Undergraduate",
    gpax: 3.9,
    highSchoolGpax: 3.7,
    mathGpax: 3.9,
    scienceGpax: 3.6,
    englishGpax: 3.8,
    admission: 3.75,
    schoolName: "Sunrise High School",
    grade: [
      {
        semester: "1st/2023",
        gpax: 3.8,
      },
      {
        semester: "2nd/2023",
        gpax: 3.9,
      },
      {
        semester: "3rd/2023",
        gpax: 4.0,
      },
      {
        semester: "4th/2023",
        gpax: 3.7,
      },
    ],
    PLO: [
      {
        code: "PLO1",
        desc: "Understand the basic concepts of biology",
        course: [
          { id: "CPE2", name: "Biology 101" },
          { id: "CPE3", name: "Biology Lab" },
        ],
        status: 0,
      },
      {
        code: "PLO2",
        desc: "Apply biological concepts to real-world problems",
        course: [
          { id: "CPE4", name: "Biology 201" },
          { id: "CPE5", name: "Biology Lab II" },
        ],
        status: 1,
      },
    ],
    PO: [
      {
        code: "PO1",
        desc: "Demonstrate knowledge of biology",
        course: [
          { id: "CPE4", name: "Biology 201" },
          { id: "CPE5", name: "Biology Lab II" },
        ],
        status: 0,
      },
    ],
    SO: [
      {
        code: "SO1",
        desc: "Conduct experiments in biology",
        course: [
          { id: "CPE4", name: "Biology 201" },
          { id: "CPE5", name: "Biology Lab II" },
        ],
        status: 0,
      },
    ],
  },
  {
    id: 5,
    studentId: "S005",
    name: "Ethan Hunt",
    email: "ethan.hunt@example.com",
    faculty: "Law",
    department: "Criminal Law",
    program: "Undergraduate",
    gpax: 3.6,
    highSchoolGpax: 3.5,
    mathGpax: 3.9,
    scienceGpax: 3.3,
    englishGpax: 3.9,
    admission: 3.65,
    schoolName: "Hilltop High School",
    grade: [
      {
        semester: "1st/2023",
        gpax: 3.5,
      },
      {
        semester: "2nd/2023",
        gpax: 3.6,
      },
      {
        semester: "3rd/2023",
        gpax: 3.7,
      },
      {
        semester: "4th/2023",
        gpax: 3.8,
      },
    ],
    PLO: [
      {
        code: "PLO1",
        desc: "Understand the basic concepts of law",
        desc_th: "เข้าใจแนวคิดพื้นฐานของกฎหมาย",
        expectedRate: 80,
        status: 0,
      },
      {
        code: "PLO2",
        desc: "Apply legal concepts to real-world problems",
        desc_th: "นำแนวคิดทางกฎหมายไปใช้ในปัญหาในโลกแห่งความเป็นจริง",
        expectedRate: 75,
        status: 1,
      },
    ],
    PO: [
      {
        code: "PO1",
        desc: "Demonstrate knowledge of law",
        desc_th: "แสดงความรู้ด้านกฎหมาย",
        expectedRate: 85,
        status: 0,
      },
    ],
    SO: [
      {
        code: "SO1",
        desc: "Conduct experiments in law",
        desc_th: "ทำการทดลองในกฎหมาย",
        expectedRate: 90,
        status: 0,
      },
    ],
    grade: [
      {
        semester: "1st/2023",
        gpax: 3.8,
      },
      {
        semester: "2nd/2023",
        gpax: 3.9,
      },
      {
        semester: "3rd/2023",
        gpax: 4.0,
      },
      {
        semester: "4th/2023",
        gpax: 3.7,
      },
    ],
    PLO: [
      {
        code: "PLO1",
        desc: "Understand the basic concepts of biology",
        course: [
          { id: "CPE2", name: "Biology 101" },
          { id: "CPE3", name: "Biology Lab" },
        ],
        status: 0,
      },
      {
        code: "PLO2",
        desc: "Apply biological concepts to real-world problems",
        course: [
          { id: "CPE4", name: "Biology 201" },
          { id: "CPE5", name: "Biology Lab II" },
        ],
        status: 1,
      },
    ],
    PO: [
      {
        code: "PO1",
        desc: "Demonstrate knowledge of biology",
        course: [
          { id: "CPE4", name: "Biology 201" },
          { id: "CPE5", name: "Biology Lab II" },
        ],
        status: 0,
      },
    ],
    SO: [
      {
        code: "SO1",
        desc: "Conduct experiments in biology",
        course: [
          { id: "CPE4", name: "Biology 201" },
          { id: "CPE5", name: "Biology Lab II" },
        ],
        status: 0,
      },
    ],
  },
  {
    id: 6,
    studentId: "S006",
    name: "Fiona Apple",
    email: "fiona.apple@example.com",
    faculty: "Medicine",
    department: "Anatomy",
    program: "Undergraduate",
    gpax: 3.95,
    highSchoolGpax: 3.95,
    mathGpax: 3.9,
    scienceGpax: 4.0,
    englishGpax: 3.8,
    admission: 3.9,
    schoolName: "Maple Leaf High School",
    grade: [
      {
        semester: "1st/2023",
        gpax: 3.8,
      },
      {
        semester: "2nd/2023",
        gpax: 3.9,
      },
      {
        semester: "3rd/2023",
        gpax: 4.0,
      },
      {
        semester: "4th/2023",
        gpax: 3.7,
      },
    ],
    PLO: [
      {
        code: "PLO1",
        desc: "Understand the basic concepts of biology",
        course: [
          { id: "CPE2", name: "Biology 101" },
          { id: "CPE3", name: "Biology Lab" },
        ],
        status: 0,
      },
      {
        code: "PLO2",
        desc: "Apply biological concepts to real-world problems",
        course: [
          { id: "CPE4", name: "Biology 201" },
          { id: "CPE5", name: "Biology Lab II" },
        ],
        status: 1,
      },
    ],
    PO: [
      {
        code: "PO1",
        desc: "Demonstrate knowledge of biology",
        course: [
          { id: "CPE4", name: "Biology 201" },
          { id: "CPE5", name: "Biology Lab II" },
        ],
        status: 0,
      },
    ],
    SO: [
      {
        code: "SO1",
        desc: "Conduct experiments in biology",
        course: [
          { id: "CPE4", name: "Biology 201" },
          { id: "CPE5", name: "Biology Lab II" },
        ],
        status: 0,
      },
    ],
  },
]);

watch(
  () => props.studentId,
  (newId) => {
    student.value = Students.value.find((s) => s.studentId === newId) || {};
  },
  { immediate: true }
);

const showGradeDetails = ref(false);
const showPLODetails = ref(false);
const showPODetails = ref(false);
const showSODetails = ref(false);

const showDetails = () => {
  overallDetails.value = true;
  showGradeDetails.value = false;
  showPLODetails.value = false;
  showPODetails.value = false;
  showSODetails.value = false;
};

const GradeDetails = () => {
  showGradeDetails.value = true;
  overallDetails.value = false;
  showPLODetails.value = false;
  showPODetails.value = false;
  showSODetails.value = false;
};

const PLODetails = () => {
  showPLODetails.value = true;
  overallDetails.value = false;
  showGradeDetails.value = false;
  showPODetails.value = false;
  showSODetails.value = false;
};

const PODetails = () => {
  showPODetails.value = true;
  overallDetails.value = false;
  showGradeDetails.value = false;
  showPLODetails.value = false;
  showSODetails.value = false;
};
const SODetails = () => {
  showSODetails.value = true;
  overallDetails.value = false;
  showGradeDetails.value = false;
  showPLODetails.value = false;
  showPODetails.value = false;
};

const emit = defineEmits(["close"]);
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

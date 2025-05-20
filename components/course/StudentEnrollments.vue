<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-row justify-between gap-6 items-center w-full">
      <div class="flex flex-row gap-4">
        <div
          class="px-4 py-3 bg-white border border-grey-secondary rounded-xl flex flex-row gap-4 items-center"
        >
          <input
            type="text"
            v-model="searchQuery"
            @keyup.enter="fetchEnrollments(course_id, searchQuery)"
            class="bg-transparent border-none focus:ring-0 outline-none text-base w-56"
            placeholder="Search..."
          />
          <button
            class="flex items-center justify-center bg-white rounded-xl"
            @click="fetchEnrollments(course_id, searchQuery)"
          >
            <Search class="w-6 h-6" />
          </button>
        </div>
        <button
          @click="toggleStatus"
          :class="[
            'flex items-center flex-row justify-center border border-grey-secondary rounded-xl px-4 py-3 gap-2 transition-all duration-300',
            statusClass,
          ]"
        >
          <span class="font-semibold text-base">Status</span>
          <template v-if="status === 'default'">
            <Status class="w-5 h-5" />
          </template>
          <template v-else-if="status === 'ascending'">
            <ArrowUp class="w-5 h-5" />
          </template>
          <template v-else>
            <ArrowDown class="w-5 h-5" />
          </template>
        </button>
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
          @click="onClickImportStudent"
          class="flex items-center flex-row justify-center border border-grey-secondary rounded-xl px-4 py-3 gap-2"
        >
          <span class="text-black-primary font-semibold text-base">Import</span>
        </Import>
        <Export
          @click="onClickExportStudent"
          class="flex items-center flex-row justify-center border border-grey-secondary rounded-xl px-4 py-3 gap-2"
        >
          <span class="text-black-primary font-semibold text-base">Export</span>
        </Export>
      </div>
    </div>
    <div class="border border-grey-secondary p-4 rounded-2xl">
      <div class="grid grid-cols-5 gap-4 pb-2 border-b">
        <div
          class="col-span-1 text-sm text-grey-primary flex items-center justify-center"
        >
          Student ID
        </div>
        <div
          class="col-span-2 text-sm text-grey-primary flex items-center justify-center"
        >
          Name
        </div>
        <div
          class="col-span-1 text-sm text-grey-primary flex items-center justify-center"
        >
          Status
        </div>
        <div
          class="col-span-1 text-sm text-grey-primary flex items-center justify-center"
        >
          Actions
        </div>
      </div>
      <div
        class="max-h-[calc(100vh-490px)] overflow-y-scroll scrollbar-set mt-2"
      >
        <div v-for="student in students" :key="student.id" class="contents">
          <div
            class="grid grid-cols-5 gap-4 py-2 hover:cursor-pointer hover:bg-[#F6F8F8] hover:rounded-xl border-b border-grey-tertiary"
          >
            <div
              class="col-span-1 text-sm text-black-primary flex items-center justify-center"
            >
              {{ student.student_id }}
            </div>
            <div
              class="col-span-2 text-sm text-black-primary flex items-center justify-center"
            >
              {{ student.first_name_th }} {{ student.last_name_th }} /
              {{ student.first_name_en }} {{ student.last_name_en }}
            </div>
            <div
              class="col-span-1 text-sm text-black-primary flex items-center justify-center"
            >
              {{ getStatusText(student.status) }}
            </div>
            <div
              class="col-span-1 flex-row gap-4 flex items-center justify-center"
            >
              <button
                @click="studentDetails(student.student_id)"
                class="flex items-center justify-center bg-white rounded-xl p-2 border hover:bg-black-primary hover:text-white"
              >
                <ShowUser class="w-5 h-5" />
              </button>
              <button
                @click="
                  editStudentEnroll(
                    student.id,
                    student.student_id,
                    student.status
                  )
                "
                class="flex items-center justify-center rounded-xl p-2 border bg-white hover:bg-black-primary hover:text-white"
              >
                <Edit class="w-5 h-5" />
              </button>
              <button
                @click="deleteStudent(student.id, student.student_id)"
                class="flex items-center justify-center rounded-xl p-2 border hover:bg-red-500 hover:text-white"
              >
                <Delete class="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-center items-center mt-2">
      <button
        v-if="currentPage != 1"
        @click="prevPage"
        class="flex items-center justify-center bg-white rounded-xl p-2 mr-2"
        :disabled="currentPage === 1"
      >
        <ArrowRight class="w-4 h-4 rotate-180" />
      </button>
      <div class="flex items-center justify-center gap-2">
        <span class="text-sm text-grey-primary">Page</span>
        <span class="text-sm text-black-primary font-semibold">{{
          currentPage
        }}</span>
        <span class="text-sm text-grey-primary">of</span>
        <span class="text-sm text-black-primary font-semibold">{{
          totalPages
        }}</span>
      </div>
      <button
        v-if="currentPage != totalPages"
        @click="nextPage"
        class="flex items-center justify-center bg-white rounded-xl p-2 ml-2"
        :disabled="currentPage === totalPages"
      >
        <ArrowRight class="w-4 h-4" />
      </button>
    </div>
  </div>
  <StudentEnroll
    v-if="isStudentEnrollVisible"
    :studentID="studentID"
    :courseID="courseID"
    :courseName="courseName"
    :studentName="studentName"
    :studentStatus="studentStatus"
    @close="isStudentEnrollVisible = false"
  />
  <EditStudentEnroll
    v-if="isEditStudentEnrollVisible"
    :studentID="studentID"
    :courseID="courseID"
    :courseName="courseName"
    :studentName="studentName"
    :studentStatus="studentStatus"
    :enrollmentId="enrollmentId"
    @close="isEditStudentEnrollVisible = false"
    @updated="reloadStudentList"
  />
  <DeleteStudent
    v-if="isDeleteStudentVisible"
    :studentID="studentID"
    :courseID="courseID"
    :courseName="courseName"
    :studentName="studentName"
    :studentStatus="studentStatus"
    :enrollmentId="enrollmentId"
    @close="isDeleteStudentVisible = false"
    @updated="reloadStudentList"
  />
  <ImportEnrollments
    v-if="isImportEnrollmentsVisible"
    @close="isImportEnrollmentsVisible = false"
    @updated="reloadStudentList"
  />
</template>

<script setup>
import { ref, computed } from "vue";
import { onMounted } from "vue";
import TemplateButton from "@/components/button/TemplateButton.vue";
import Import from "@/components/button/ImportButton.vue";
import Export from "@/components/button/ExportButton.vue";
import Search from "@/components/icons/Search.vue";
import Status from "@/components/icons/Status.vue";
import ArrowUp from "@/components/icons/ArrowUp.vue";
import ArrowDown from "@/components/icons/ArrowDown.vue";
import Edit from "@/components/icons/Edit.vue";
import Delete from "@/components/icons/Delete.vue";
import ShowUser from "@/components/icons/ShowUser.vue";
import { fetchEnrollments } from "@/api/api";
import StudentEnroll from "@/components/popups/StudentEnroll.vue";
import EditStudentEnroll from "@/components/popups/EditStudentEnroll.vue";
import DeleteStudent from "@/components/popups/DeleteStudent.vue";
import ImportEnrollments from "@/components/popups/ImportEnrollments.vue";
import { defineProps, watch } from "vue";

const props = defineProps({
  refresh: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:totalStudents"]);
const students = ref([]);
const isStudentEnrollVisible = ref(false);
const isEditStudentEnrollVisible = ref(false);
const isDeleteStudentVisible = ref(false);
const enrollmentId = ref("");
const studentID = ref("");
const courseID = ref("");
const courseName = ref("");
const studentName = ref("");
const studentStatus = ref("");

const clickTemplate = () => {
  window.open(
    "https://cdn.discordapp.com/attachments/1266636608971477085/1374297978688372776/instant_course_import_template.xlsx?ex=682d8a3b&is=682c38bb&hm=c81aded386a525d836106b3c7ba1b527f4bbf443e56aaa82f227bc3871cdbdf7&",
    "_blank"
  );
};

const studentDetails = (id) => {
  studentID.value = id;
  courseID.value = course_id.value;
  courseName.value = "Example Course";
  studentName.value = "Example Student";
  studentStatus.value = "ENROLL";
  isStudentEnrollVisible.value = true;
};

const editStudentEnroll = (id, student_id, status) => {
  studentID.value = student_id;
  enrollmentId.value = id;
  courseID.value = course_id.value;
  courseName.value = "Example Course";
  studentName.value = "Example Student";
  studentStatus.value = status;
  isEditStudentEnrollVisible.value = true;
};

const deleteStudent = (id, student_id) => {
  studentID.value = student_id;
  enrollmentId.value = id;
  courseID.value = course_id.value;
  courseName.value = "Example Course";
  studentName.value = "Example Student";
  studentStatus.value = "ENROLL";
  isDeleteStudentVisible.value = true;
};

const reloadStudentList = () => {
  fetchEnrollments(students, course_id.value, searchQuery.value);
};

const searchQuery = ref("");
const status = ref("default");

const toggleStatus = () => {
  if (status.value === "default") {
    status.value = "ascending";
  } else if (status.value === "ascending") {
    status.value = "descending";
  } else {
    status.value = "default";
  }
};

const statusClass = computed(() => {
  return status.value === "default"
    ? "bg-white text-black-primary"
    : " bg-black-primary text-white";
});

const onClickAddStudent = () => {};

const exportStudent = () => {};

const isImportEnrollmentsVisible = ref(false);
const onClickImportStudent = () => {
  isImportEnrollmentsVisible.value = true;
};

const onClickExportStudent = () => {};

const currentPage = ref(1);
const totalPages = ref(1);

//TODO: Get course id
import { useRouter } from "vue-router";
const router = useRouter();
const course_id = ref(router.currentRoute.value.params.id);

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

//Create enrollment
//status: ENROLL OR WITHDRAW
//student_ids: Array of student ids (6XXXXX)
const CreateEnrollment = async (student_ids, course_id, status) => {
  try {
    const response = await fetch(`${BaseURL}enrollments`, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        course_id: course_id,
        student_ids: student_ids,
        status: status,
      }),
    });

    if (!response.ok) throw new Error("Failed to create enrollment");
    const res = await response.json();
    console.log(res);
  } catch (error) {
    console.error("Error fetching students:", error);
  }
};

const getStatusText = (status) => {
  return status === "ENROLL" ? "Enroll" : "Withdraw";
};

const fetchAndEmit = async () => {
  await fetchEnrollments(students, course_id.value, searchQuery.value);
  emit("update:totalStudents", students.value.length);
};

onMounted(fetchAndEmit);

watch(
  () => props.refresh,
  () => {
    fetchAndEmit();
  }
);

watch(
  students,
  (newVal) => {
    emit("update:totalStudents", newVal.length);
  }
);


</script>

<style lang="scss" scoped>
button {
  transition: background-color 0.3s ease;
}

.scrollbar-set {
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>

<template>
  <teleport to="body">
    <div
      class="w-full h-full fixed inset-0 flex items-center justify-center bg-black-primary bg-opacity-50 z-50"
    >
      <div
        class="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center border border-grey-secondary"
      >
        <div
          class="flex flex-col w-[28rem] pb-2 border-b border-grey-secondary"
        >
          <div
            class="text-2xl font-semibold text-black-primary w-full text-start"
          >
            Delete Student
          </div>
          <div class="text-sm text-grey-primary mt-1">
            from course
            <span class="font-semibold text-black-primary">{{
              courseName
            }}</span>
          </div>
        </div>
        <div class="mt-4 text-center flex gap-4 flex-col text-sm w-[28rem]">
          <div class="flex flex-col items-start w-full gap-2">
            <label class="font-semibold text-black-primary">Student ID</label>
            <div
              class="w-full px-4 py-2 border border-grey-secondary rounded-xl"
            >
              {{ studentID }}
            </div>
          </div>
        </div>
        <div
          class="flex flex-row items-center justify-center gap-2 w-full mt-4 rounded-xl"
        >
          <button
            @click="confirmDelete"
            class="py-2 font-medium border border-grey-secondary text-white rounded-xl w-full bg-red-500"
          >
            Delete
          </button>
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
import { defineProps, defineEmits } from "vue";
import { BaseURL } from "~/api/api";

const emit = defineEmits(["close", "confirmDelete"]);

const props = defineProps({
  studentID: {
    type: String,
    required: true,
  },
  courseID: {
    type: String,
    required: true,
  },
  courseName: {
    type: String,
    required: true,
  },
  studentName: {
    type: String,
    required: true,
  },
  studentStatus: {
    type: String,
    required: true,
  },
  enrollmentId: {
    type: String,
    required: true,
  },
});

const confirmDelete = () => {
  DeleteEnrollment(props.enrollmentId);
  emit("updated");
  emit("close");
};

//Delete enrollment
const DeleteEnrollment = async (id) => {
  try {
    const response = await fetch(`${BaseURL}enrollments/${id}`, {
      credentials: "include",
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) throw new Error("Failed to delete enrollment");
    const res = await response.json();
    console.log(res);
  } catch (error) {
    console.error("Error fetching students:", error);
  }
};
</script>

<style scoped></style>

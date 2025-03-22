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
            Student Enrollment
          </div>
          <div class="text-sm text-grey-primary mt-1">
            Edit enrollment status for student in
            <span class="font-semibold text-black-primary">{{
              courseName
            }}</span>
          </div>
        </div>
        <div class="mt-4 text-center flex gap-4 flex-col text-sm w-[28rem]">
          <div class="flex flex-col items-start w-full gap-2">
            <label class="font-semibold text-black-primary">Student ID</label>
            <div
              class="w-full px-4 py-3 border border-grey-secondary rounded-xl"
            >
              {{ studentID }}
            </div>
          </div>
          <div class="flex flex-col items-start w-full gap-2">
            <label class="font-semibold text-black-primary">Status</label>
            <div
              class="bg-transparent border border-grey-secondary rounded-xl text-base p-3 hover:cursor-pointer w-full"
            >
              <select
                v-model="selectedStatus"
                class="w-full border-none outline-none hover:cursor-pointer"
              >
                <option value="ENROLL">Enroll</option>
                <option value="WITHDRAW">Withdraw</option>
              </select>
            </div>
          </div>
        </div>
        <div
          class="flex flex-row items-center justify-center gap-2 w-full mt-4 rounded-xl"
        >
          <button
            @click="updateStatus"
            class="py-2 font-medium border border-grey-secondary text-black-primary rounded-xl w-full bg-yellow-primary hover:bg-black-primary hover:text-white"
          >
            Update
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
import { ref } from "vue";
import { defineProps, defineEmits } from "vue";
import { BaseURL } from "~/api/api";

const emit = defineEmits(["close"]);

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

const selectedStatus = ref(props.studentStatus);

const updateStatus = () => {
  updateStudentStatus();
  emit("close");
};

const updateStudentStatus = async () => {
  try {
    const response = await fetch(
      `${BaseURL}enrollments/${props.enrollmentId}`,
      {
        credentials: "include",
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: selectedStatus.value,
        }),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to update student status");
    }
  } catch (error) {
    console.error(error);
  }
};
</script>

<style scoped></style>

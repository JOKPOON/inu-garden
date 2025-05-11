<template>
  <div class="p-4 flex flex-col gap-4">
    <div
      class="text-base font-semibold w-full pb-2 border-b border-grey-secondary"
    >
      1. Course Details
    </div>
    <div class="grid grid-cols-2 gap-4">
      <div class="flex">
        <span class="font-semibold w-40">Course Code:</span>
        <span>{{ courseDetails.courseCode }}</span>
      </div>
      <div class="flex">
        <span class="font-semibold w-40">Course Name:</span>
        <span>{{ courseDetails.courseName }}</span>
      </div>
      <div class="flex">
        <span class="font-semibold w-40">Credit:</span>
        <span>{{ courseDetails.credit }}</span>
      </div>
      <div class="flex">
        <span class="font-semibold w-40">Number of Students:</span>
        <span>{{ courseDetails.numberOfStudents }}</span>
      </div>
      <div class="flex">
        <span class="font-semibold w-40">Faculty:</span>
        <span>{{ courseDetails.faculty }}</span>
      </div>
      <div class="flex">
        <span class="font-semibold w-40">Department:</span>
        <span>{{ courseDetails.department }}</span>
      </div>
      <div class="flex">
        <span class="font-semibold w-40">Program:</span>
        <span>{{ courseDetails.program }}</span>
      </div>
      <div class="flex">
        <span class="font-semibold w-40">Education Level:</span>
        <span>{{ courseDetails.educationLevel }}</span>
      </div>
      <div class="flex">
        <span class="font-semibold w-40">Lecturer:</span>
        <span v-if="Array.isArray(courseDetails.lecturer)">
          <span
            v-for="(lecturer, index) in courseDetails.lecturer"
            :key="index"
          >
            {{ lecturer }}<br />
          </span>
        </span>
        <span v-else>{{ courseDetails.lecturer }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const courseDetails = {
  courseName: "Introduction to Programming",
  courseCode: "CS101",
  credit: 3,
  lecturer: ["Dr. John Doe", "Dr. Jane Smith"],
  numberOfStudents: 120,
  faculty: "Faculty of Computer Science",
  department: "Computer Science",
  program: "Bachelor of Computer Science",
  educationLevel: "Undergraduate",
};
</script>

<style lang="scss" scoped></style>

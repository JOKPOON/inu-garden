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
        <span>{{ courseDetails.code }}</span>
      </div>
      <div class="flex">
        <span class="font-semibold w-40">Course Name:</span>
        <span>{{ courseDetails.name }}</span>
      </div>
      <div class="flex">
        <span class="font-semibold w-40">Credit:</span>
        <span>{{ courseDetails.credit }}</span>
      </div>
      <!-- <div class="flex">
        <span class="font-semibold w-40">Number of Students:</span>
        <span>{{
          courseDetails.numberOfStudents ? courseDetails.numberOfStudents : "-"
        }}</span>
      </div> -->
      <div class="flex">
        <span class="font-semibold w-40">Faculty:</span>
        <span>{{ courseDetails.programme.department.faculty.name_th }}</span>
      </div>
      <div class="flex">
        <span class="font-semibold w-40">Department:</span>
        <span>{{ courseDetails.programme.department.name_th }}</span>
      </div>
      <div class="flex">
        <span class="font-semibold w-40">Program:</span>
        <span>{{ courseDetails.programme.name_th }}</span>
      </div>
      <div class="flex">
        <span class="font-semibold w-40"> Degree:</span>
        <span>{{ courseDetails.programme.degree_th }}</span>
      </div>
      <div class="flex">
        <span class="font-semibold w-40">Lecturer:</span>
        <span v-if="Array.isArray(courseDetails.lecturers)">
          <span
            v-for="(lecturer, index) in courseDetails.lecturers"
            :key="index"
          >
            {{ lecturer.title_th_short }}
            {{ lecturer.first_name_th }}
            {{ lecturer.last_name_th }}
            <br />
          </span>
        </span>
        <span v-else>{{ courseDetails.lecturer }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { usePortfolioStore } from "~/store/usePortfolioStore";
const store = usePortfolioStore();

console.log(store.details);
const courseDetails = store.details;
</script>

<style lang="scss" scoped></style>

<template>
  <div class="overflow-hidden rounded-xl border border-grey-tertiary">
    <table class="min-w-full divide-y divide-grey-tertiary">
      <thead class="bg-white divide-x divide-grey-primary">
        <tr>
          <th
            scope="col"
            class="px-6 py-3 text-center text-base font-medium text-black-primary tracking-wider border border-grey-tertiary"
          >
            Grades
          </th>
          <th
            scope="col"
            class="px-6 py-3 text-center text-base font-medium text-black-primary tracking-wider border border-grey-tertiary"
          >
            No. of Students
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-grey-tertiary">
        <tr v-for="grade in gradeData" :key="grade.name">
          <td
            class="px-6 py-4 whitespace-nowrap text-base text-gray-primary text-center border border-grey-tertiary"
          >
            {{ grade.name }}
          </td>
          <td
            class="px-6 py-4 whitespace-nowrap text-base text-gray-primary text-center border border-grey-tertiary"
          >
            {{ grade.frequency }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
const gradeData = [
  {
    name: "A",
    grade_score: 90,
    frequency: 1,
  },
  {
    name: "BP",
    grade_score: 85,
    frequency: 0,
  },
  {
    name: "B",
    grade_score: 80,
    frequency: 1,
  },
  {
    name: "CP",
    grade_score: 75,
    frequency: 0,
  },
  {
    name: "C",
    grade_score: 70,
    frequency: 1,
  },
  {
    name: "DP",
    grade_score: 65,
    frequency: 0,
  },
  {
    name: "D",
    grade_score: 60,
    frequency: 0,
  },
  {
    name: "F",
    grade_score: 0,
    frequency: 2,
  },
];
</script>

<style lang="scss" scoped></style>

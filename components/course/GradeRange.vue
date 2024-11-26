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
          <tr v-for="(students, grade) in gradeData" :key="grade">
            <td
              class="px-6 py-4 whitespace-nowrap text-base text-gray-primary text-center border border-grey-tertiary"
            >
              {{ grade }}
            </td>
            <td
              class="px-6 py-4 whitespace-nowrap text-base text-gray-primary text-center border border-grey-tertiary"
            >
              {{ students }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup>
  const gradeData = {
    'F': 12,
    'D': 19,
    'D+': 3,
    'C': 5,
    'C+': 2,
    'B': 3,
    'B+': 7,
    'A': 10
  };
  </script>
  
  <style lang="scss" scoped>
  </style>
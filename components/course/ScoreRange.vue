<template>
  <div class="overflow-hidden rounded-xl border border-grey-tertiary">
    <table class="min-w-full divide-y divide-grey-tertiary">
      <thead class="bg-white divide-x divide-grey-primary">
        <tr>
          <th
            scope="col"
            class="px-6 py-3 text-center text-base font-medium text-black-primary tracking-wider border border-grey-tertiary"
          >
            Score Range
          </th>
          <th
            scope="col"
            class="px-6 py-3 text-center text-base font-medium text-black-primary tracking-wider border border-grey-tertiary"
          >
            No. of Students
          </th>
        </tr>
      </thead>
      <tbody
        class="bg-white divide-y divide-grey-tertiary"
      >
        <tr v-for="(students, range) in scoreRanges" :key="range">
          <td
            class="px-6 py-4 whitespace-nowrap text-base text-gray-primary text-center border border-grey-tertiary"
          >
            {{ range }}
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
const scoreRanges = {
  "0-50": 10,
  "50-55": 5,
  "55-60": 8,
  "60-65": 12,
  "65-70": 7,
  "70-75": 9,
  "75-80": 6,
  "80-85": 4,
  "85-90": 3,
  "90-100": 2,
};
</script>

<style lang="scss" scoped>
</style>

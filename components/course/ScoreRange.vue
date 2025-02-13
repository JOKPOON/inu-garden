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
      <tbody class="bg-white divide-y divide-grey-tertiary">
        <tr v-for="score in scoreRanges" :key="score.score">
          <td
            class="px-6 py-4 whitespace-nowrap text-base text-gray-primary text-center border border-grey-tertiary"
          >
            {{ score.score }}
          </td>
          <td
            class="px-6 py-4 whitespace-nowrap text-base text-gray-primary text-center border border-grey-tertiary"
          >
            {{ score.frequency }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
const scoreRanges = [
  {
    score: "0-50",
    frequency: 2,
  },
  {
    score: "51-55",
    frequency: 0,
  },
  {
    score: "56-60",
    frequency: 0,
  },
  {
    score: "61-65",
    frequency: 0,
  },
  {
    score: "66-70",
    frequency: 1,
  },
  {
    score: "71-75",
    frequency: 0,
  },
  {
    score: "76-80",
    frequency: 1,
  },
  {
    score: "81-85",
    frequency: 0,
  },
  {
    score: "86-90",
    frequency: 0,
  },
  {
    score: "91-95",
    frequency: 1,
  },
  {
    score: "96-100",
    frequency: 0,
  },
];
</script>

<style lang="scss" scoped></style>

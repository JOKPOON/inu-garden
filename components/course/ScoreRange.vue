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
        <tr v-for="score in props.score_frequencies" :key="score.score">
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
const props = defineProps({
  score_frequencies: {
    type: Array,
    required: true,
  },
});
</script>

<style lang="scss" scoped></style>

<template>
  <div class="overflow-hidden rounded-xl border border-grey-tertiary">
    <table class="min-w-full divide-y divide-grey-tertiary">
      <thead class="bg-white divide-x divide-grey-primary">
        <tr>
          <th
            scope="col"
            class="px-6 py-3 text-center text-sm font-medium text-black-primary tracking-wider border border-grey-tertiary"
          >
            Grades
          </th>
          <th
            scope="col"
            class="px-6 py-3 text-center text-sm font-medium text-black-primary tracking-wider border border-grey-tertiary"
          >
            No. of Students
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-grey-tertiary">
        <tr v-for="grade in props.grade_frequencies" :key="grade.name">
          <td
            class="px-6 py-4 whitespace-nowrap text-sm text-gray-primary text-center border border-grey-tertiary"
          >
            {{ grade.name }}
          </td>
          <td
            class="px-6 py-4 whitespace-nowrap text-sm text-gray-primary text-center border border-grey-tertiary"
          >
            {{ grade.frequency }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
const props = defineProps({
  grade_frequencies: {
    type: Array,
    required: true,
  },
});
</script>

<style lang="scss" scoped></style>

<template>
  <!-- <ul class="space-y-3 pb-4 border-b border-grey-secondary">
    <li v-for="clo in closList" :key="clo.id" class="flex flex-col">
      <div class="text-black-primary">
        <span class="font-semibold text-black-primary">{{ clo.clo }} </span> :
        {{ clo.id }}
      </div>
      <div class="text-sm text-grey-primary">
        {{ clo.desc_th }}
      </div>
    </li>
  </ul> -->
  <div
    class="flex flex-col gap-4 w-full h-full rounded-xl border border-grey-secondary p-4 bg-white"
  >
    <div
      class="font-semibold w-full text-center pb-2 border-b border-grey-secondary"
    >
      Details of CLOs
    </div>
    <div class="grid grid-cols-2 gap-4 pb-2 border-b border-grey-secondary">
      <div
        class="w-full text-center font-semibold border-r border-grey-tertiary"
      >
        Involved CLO
      </div>
      <div class="w-full text-center font-semibold">Involved Assessment</div>
    </div>

    <div
      v-for="clo in closList"
      :key="clo.id"
      class="grid grid-cols-2 gap-4 pb-4 border-b border-grey-secondary"
    >
      <div
        v-for="detail in clo.details"
        :key="detail.id"
        class="space-y-3 border-r border-grey-tertiary"
      >
        <div v-for="involved in detail.involved_clo" :key="involved.id">
          <div class="font-semibold">{{ involved.name }}</div>
          <div class="text-grey-primary">
            Passing Rate :
            <span
              :class="{
                'text-green-500': involved.expect > involved.define,
                'text-red-500': involved.expect <= involved.define,
                'font-semibold': true,
              }"
            >
              {{ involved.expect.toFixed(2) }} %
            </span>
          </div>
          <div class="text-grey-primary">
            Expected Rate :
            <span class="font-semibold text-black-primary">
              {{ involved.define.toFixed(2) }} %
            </span>
          </div>
        </div>
      </div>
      <div v-for="detail in clo.details" :key="detail.id" class="space-y-3">
        <div
          v-for="assessment in detail.involved_assessment"
          :key="assessment.id"
        >
          <div class="font-semibold">{{ assessment.name }}</div>
          <div class="text-grey-primary">
            Passing Rate :
            <span
              :class="{
                'text-green-500': assessment.expect > assessment.define,
                'text-red-500': assessment.expect <= assessment.define,
                'font-semibold': true,
              }"
            >
              {{ assessment.expect.toFixed(2) }} %
            </span>
          </div>
          <div class="text-grey-primary">
            Expected Rate :
            <span class="font-semibold text-black-primary">
              {{ assessment.define.toFixed(2) }} %
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  clos: {
    type: Object,
    required: true,
  },
});

const closList = computed(() => {
  return Object.values(props.clos).map((clo) => {
    const involved_clo = [
      {
        id: clo.CLOID,
        name: clo.CLOCode,
        expect: clo.PassedPercentage,
        define: clo.ExpectedPassingAssignmentPercentage,
      },
    ];

    const involved_assessment = Object.values(clo.Assignments).map(
      (assignment) => ({
        id: assignment.AssignmentID,
        name: assignment.AssignmentName,
        expect: assignment.PassedPercentage,
        define: assignment.ExpectedPassingAssignmentPercentage,
      })
    );

    return {
      id: clo.CLOID,
      clo: clo.CLOCode,
      desc_th: "", // Add if you have description
      details: [
        {
          id: clo.CLOID + "-detail",
          involved_clo,
          involved_assessment,
        },
      ],
    };
  });
});

onMounted(() => {
  console.log(props.clos);
});
</script>

<style lang="scss" scoped></style>

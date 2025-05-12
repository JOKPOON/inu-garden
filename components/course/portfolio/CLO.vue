<template>
  <div
    class="flex flex-col gap-4 w-full h-full rounded-xl border border-grey-secondary p-4 bg-white"
  >
    <div class="font-semibold w-full pb-2 border-b border-grey-secondary">
      List of CLOs
    </div>
    <ul class="space-y-3 pb-4 border-b border-grey-secondary">
      <li v-for="clo in clos" :key="clo.id" class="flex flex-col">
        <div class="text-black-primary">
          <span class="font-semibold text-black-primary">{{ clo.clo }} </span> :
          {{ clo.desc }}
        </div>
        <div class="text-sm text-grey-primary">
          {{ clo.desc_th }}
        </div>
      </li>
    </ul>
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
        v-for="clo in clos"
        :key="clo.id"
        class="grid grid-cols-2 gap-4 pb-4 border-b border-grey-secondary"
      >
        <div v-for="detail in clo.details" :key="detail.id" class="space-y-3 border-r border-grey-tertiary">
          <div v-for="involved in detail.involved_clo" :key="involved.id">
            <div class="font-semibold">{{ involved.name }}</div>
            <div class="text-grey-primary">
              Passing Rate  :
              <span
                :class="{
                  'text-green-500': involved.expect > involved.define,
                  'text-red-500': involved.expect <= involved.define,
                  'font-semibold': true,
                }"
              >
                {{ involved.expect }} %
              </span>
            </div>
            <div class="text-grey-primary">
              Expected Rate :
              <span class="font-semibold text-black-primary">
                {{ involved.define }} %
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
              Passing Rate  :
              <span
                :class="{
                  'text-green-500': assessment.expect > assessment.define,
                  'text-red-500': assessment.expect <= assessment.define,
                  'font-semibold': true,
                }"
              >
                {{ assessment.expect }} %
              </span>
            </div>
            <div class="text-grey-primary">
              Expected Rate :
              <span class="font-semibold text-black-primary">
                {{ assessment.define }} %
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const clos = ref([
  {
    id: 1,
    clo: "CLO 1",
    desc: "Understand the basic concepts of programming.",
    desc_th: "เข้าใจแนวคิดพื้นฐานของการเขียนโปรแกรม",
    details: [
      {
        id: 1,
        involved_clo: [
          {
            id: 1,
            name: "CLO 1.1",
            expect: "51",
            define: "80",
          },
          {
            id: 2,
            name: "CLO 1.2",
            expect: "51",
            define: "80",
          },
        ],
        involved_assessment: [
          {
            id: 1,
            name: "Jump smash",
            expect: "51",
            define: "80",
          },
          {
            id: 1,
            name: "Jump smash",
            expect: "51",
            define: "80",
          },
          {
            id: 2,
            name: "Jump smash",
            expect: "51",
            define: "80",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    clo: "CLO 2",
    desc: "Apply programming concepts to solve problems.",
    desc_th: "ประยุกต์ใช้แนวคิดการเขียนโปรแกรมในการแก้ปัญหา",
    details: [
      {
        id: 1,
        involved_clo: [
          {
            id: 1,
            name: "CLO 2.1",
            expect: "51",
            define: "80",
          },
          {
            id: 2,
            name: "CLO 2.2",
            expect: "51",
            define: "80",
          },
        ],
        involved_assessment: [
          {
            id: 1,
            name: "Jump smash",
            expect: "51",
            define: "80",
          },
          {
            id: 2,
            name: "Jump smash",
            expect: "51",
            define: "80",
          },
        ],
      },
    ],
  },
  {
    id: 3,
    clo: "CLO 3",
    desc: "Analyze and design algorithms.",
    desc_th: "วิเคราะห์และออกแบบอัลกอริธึม",
    details: [
      {
        id: 1,
        involved_clo: [
          {
            id: 1,
            name: "CLO 3.1",
            expect: "51",
            define: "80",
          },
          {
            id: 2,
            name: "CLO 3.2",
            expect: "51",
            define: "80",
          },
        ],
        involved_assessment: [
          {
            id: 1,
            name: "Jump smash",
            expect: "51",
            define: "80",
          },
          {
            id: 2,
            name: "Jump smash",
            expect: "51",
            define: "80",
          },
        ],
      },
    ],
  },
]);
</script>

<style lang="scss" scoped></style>

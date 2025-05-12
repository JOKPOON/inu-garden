<template>
  <div
    class="flex flex-col gap-4 w-full h-full rounded-xl border border-grey-secondary p-4 bg-white"
  >
    <div class="font-semibold w-full pb-2 border-b border-grey-secondary">
      List of POs
    </div>
    <ul class="space-y-2 pb-4 border-b border-grey-secondary">
      <li v-for="po in pos" :key="po.id" class="flex flex-col">
        <div class="text-black-primary">
          <span class="font-semibold text-black-primary">{{ po.po }} </span> :
          {{ po.desc }}
        </div>
        <div class="text-sm text-grey-primary">
          {{ po.desc_th }}
        </div>
        <div class="flex flex-row gap-4 mt-2">
          <div class="font-semibold text-grey-primary">Sub</div>
          <ul class="space-y-2">
            <li
              v-for="sub in po.sub"
              :key="sub.sub_po"
              class="flex flex-col"
            >
              <div class="text-black-primary">
                <span class="font-semibold text-black-primary">{{ sub.sub_po }}</span>
                : {{ sub.desc }}
              </div>
              <div class="text-sm text-grey-primary">
                {{ sub.desc_th }}
              </div>
            </li>
          </ul>
        </div>
      </li>
    </ul>

    <div
      class="flex flex-col gap-4 w-full h-full rounded-xl border border-grey-secondary p-4 bg-white"
    >
      <div
        class="font-semibold w-full text-center pb-2 border-b border-grey-secondary"
      >
        Details of CLOs and POs
      </div>
      <div class="grid grid-cols-3 gap-4 pb-2 border-b border-grey-secondary">
        <div
          class="w-full text-center font-semibold border-r border-grey-tertiary"
        >
          PO
        </div>
        <div
          class="w-full text-center font-semibold border-r border-grey-tertiary"
        >
          Involved CLO
        </div>
        <div class="w-full text-center font-semibold">Involved Assessment</div>
      </div>
      <div
        v-for="po in pos"
        :key="po.id"
        class="grid grid-cols-3 gap-4 pb-4 border-b border-grey-secondary"
      >
        <!-- PO Column -->
        <div
          v-for="detail in po.details"
          :key="detail.id"
          class="space-y-3 border-r border-grey-tertiary pr-3"
        >
          <div v-for="poDetail in detail.po || []" :key="poDetail.id">
            <div class="font-semibold">{{ poDetail.name }}</div>
            <div class="text-grey-primary">
              Passing Rate :
              <span
                :class="{
                  'text-green-500': poDetail.expect > poDetail.define,
                  'text-red-500': poDetail.expect <= poDetail.define,
                  'font-semibold': true,
                }"
              >
                {{ poDetail.expect }} %
              </span>
            </div>
            <div class="text-grey-primary">
              Expected Rate :
              <span class="font-semibold text-black-primary">
                {{ poDetail.define }} %
              </span>
            </div>
          </div>
        </div>

        <!-- CLO Column -->
        <div
          v-for="detail in po.details"
          :key="detail.id"
          class="space-y-3 border-r border-grey-tertiary pr-3"
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

        <!-- Assessment Column -->
        <div v-for="detail in po.details" :key="detail.id" class="space-y-3">
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

const pos = ref([
  {
    id: 1,
    po: "PO 1",
    desc: "Understand the basic concepts of programming.",
    desc_th: "เข้าใจแนวคิดพื้นฐานของการเขียนโปรแกรม",
    sub: [
      {
        sub_po: "PO 1.1",
        desc: "Understand the basic concepts of programming.",
        desc_th: "เข้าใจแนวคิดพื้นฐานของการเขียนโปรแกรม",
      },
      {
        sub_po: "PO 1.2",
        desc: "Understand the basic concepts of programming.",
        desc_th: "เข้าใจแนวคิดพื้นฐานของการเขียนโปรแกรม",
      },
    ],
    details: [
      {
        id: 1,
        po: [
          {
            id: 1,
            name: "PO 1",
            expect: "51",
            define: "80",
          },
          {
            id: 2,
            name: "PO 2",
            expect: "51",
            define: "80",
          },
        ],
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
    po: "PO 2",
    desc: "Apply programming concepts to solve problems.",
    desc_th: "ประยุกต์ใช้แนวคิดการเขียนโปรแกรมในการแก้ปัญหา",
    sub: [
      {
        sub_po: "PO 2.1",
        desc: "Understand the basic concepts of programming.",
        desc_th: "เข้าใจแนวคิดพื้นฐานของการเขียนโปรแกรม",
      },
      {
        sub_po: "PO 2.2",
        desc: "Understand the basic concepts of programming.",
        desc_th: "เข้าใจแนวคิดพื้นฐานของการเขียนโปรแกรม",
      },
    ],
    details: [
      {
        id: 1,
        po: [
          {
            id: 1,
            name: "PO 3",
            expect: "51",
            define: "80",
          },
        ],
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
]);
</script>

<style lang="scss" scoped></style>
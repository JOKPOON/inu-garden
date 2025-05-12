<template>
  <div
    class="flex flex-col gap-4 w-full h-full rounded-xl border border-grey-secondary p-4 bg-white"
  >
    <!-- List of PLOs -->
    <div class="font-semibold w-full pb-2 border-b border-grey-secondary">
      List of PLOs
    </div>
    <ul class="space-y-2 pb-4 border-b border-grey-secondary">
      <li v-for="plo in plos" :key="`plo-${plo.id}`" class="flex flex-col">
        <div class="text-black-primary">
          <span class="font-semibold text-black-primary">{{ plo.plo }}</span> :
          {{ plo.desc }}
        </div>
        <div class="text-sm text-grey-primary">{{ plo.desc_th }}</div>
        <div class="flex flex-row gap-4 mt-2">
          <div class="font-semibold text-grey-primary">Sub</div>
          <ul class="space-y-2">
            <li
              v-for="sub in plo.sub"
              :key="`sub-${sub.sub_plo}`"
              class="flex flex-col"
            >
              <div class="text-black-primary">
                <span class="font-semibold text-black-primary">{{
                  sub.sub_plo
                }}</span>
                : {{ sub.desc }}
              </div>
              <div class="text-sm text-grey-primary">{{ sub.desc_th }}</div>
            </li>
          </ul>
        </div>
      </li>
    </ul>

    <!-- Details of CLOs and PLOs -->
    <div
      class="flex flex-col gap-4 w-full h-full rounded-xl border border-grey-secondary p-4 bg-white"
    >
      <div
        class="font-semibold w-full text-center pb-2 border-b border-grey-secondary"
      >
        Details of CLOs and PLOs
      </div>
      <div class="grid grid-cols-7 gap-4 pb-2 border-b border-grey-secondary">
        <div
          class="col-span-2 w-full text-center font-semibold border-r border-grey-tertiary"
        >
          PLO
        </div>
        <div
          class="col-span-1 w-full text-center font-semibold border-r border-grey-tertiary"
        >
          Sub PLO
        </div>
        <div
          class="col-span-2 w-full text-center font-semibold border-r border-grey-tertiary"
        >
          Involved CLO
        </div>
        <div class="col-span-2 w-full text-center font-semibold">
          Involved Assessment
        </div>
      </div>
      <div
        v-for="plo in plos"
        :key="`details-${plo.id}`"
        class="grid grid-cols-7 gap-4 pb-4 border-b border-grey-secondary"
      >
        <!-- PLO Column -->
        <div
          v-for="(detail, index) in [...new Map(plo.details.map(item => [item.plo[0]?.id, item])).values()]"
          :key="`plo-detail-${detail.id}-${index}`"
          class="col-span-2 space-y-3 border-r border-grey-tertiary pr-3"
        >
          <template v-if="index === 0">
            <div
              v-for="ploDetail in detail.plo"
              :key="`ploDetail-${ploDetail.id}`"
            >
              <div class="font-semibold">{{ ploDetail.name }}</div>
              <div class="text-grey-primary">
                Passing Rate :
                <span :class="getRateClass(ploDetail.expect, ploDetail.define)">
                  {{ ploDetail.expect }} %
                </span>
              </div>
              <div class="text-grey-primary">
                Expected Rate :
                <span class="font-semibold text-black-primary">
                  {{ ploDetail.define }} %
                </span>
              </div>
            </div>
          </template>
        </div>

        <!-- Sub PLO Column -->
        <div
          v-for="detail in plo.details"
          :key="`sub-plo-${detail.id}`"
          class="col-span-1 space-y-3 border-r border-grey-tertiary pr-3"
        >
          <div
            v-for="subPlo in detail.sub_plo || []"
            :key="`subPlo-${subPlo.id}`"
          >
            <div>{{ subPlo.include?.join(", ") }}</div>
          </div>
        </div>

        <!-- CLO Column -->
        <div
          v-for="detail in plo.details"
          :key="`clo-${detail.id}`"
          class="col-span-2 space-y-3 border-r border-grey-tertiary pr-3"
        >
          <div
            v-for="involved in detail.involved_clo || []"
            :key="`involved-${involved.id}`"
          >
            <div class="font-semibold">{{ involved.name }}</div>
            <div class="text-grey-primary">
              Passing Rate :
              <span :class="getRateClass(involved.expect, involved.define)">
                {{ involved.expect }} %
              </span>
            </div>
            <div class="text-grey-primary">
              Expected Rate :
              <span class="font-semibold text-black-primary"
                >{{ involved.define }} %</span
              >
            </div>
          </div>
        </div>

        <!-- Assessment Column -->
        <div
          v-for="detail in plo.details"
          :key="`assessment-${detail.id}`"
          class="col-span-2 space-y-3"
        >
          <div
            v-for="assessment in detail.involved_assessment || []"
            :key="`assessment-${assessment.id}`"
          >
            <div class="font-semibold">{{ assessment.name }}</div>
            <div class="text-grey-primary">
              Passing Rate :
              <span
                :class="getRateClass(assessment.expect, assessment.define)"
              >
                {{ assessment.expect }} %
              </span>
            </div>
            <div class="text-grey-primary">
              Expected Rate :
              <span class="font-semibold text-black-primary"
                >{{ assessment.define }} %</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Sample Data
const plos = ref([
  {
    id: 1,
    plo: "PLO 1",
    desc: "Understand the basic concepts of programming.",
    desc_th: "เข้าใจแนวคิดพื้นฐานของการเขียนโปรแกรม",
    sub: [
      {
        sub_plo: "PLO 1.1",
        desc: "Basic programming concepts.",
        desc_th: "แนวคิดพื้นฐาน",
      },
      {
        sub_plo: "PLO 1.2",
        desc: "Advanced programming concepts.",
        desc_th: "แนวคิดขั้นสูง",
      },
    ],
    details: [
      {
        id: 1,
        plo: [{ id: 1, name: "PLO 1", expect: 51, define: 80 }],
        sub_plo: [{ id: 1, include: ["PLO 1.1", "PLO 1.2"] }],
        involved_clo: [{ id: 1, name: "CLO 1.1", expect: 51, define: 80 }],
        involved_assessment: [
          { id: 1, name: "Assessment 1", expect: 51, define: 80 },
        ],
      },
    ],
  },
  {
    id: 2,
    plo: "PLO 2",
    desc: "Apply problem-solving techniques in software development.",
    desc_th: "ประยุกต์ใช้เทคนิคการแก้ปัญหาในการพัฒนาซอฟต์แวร์",
    sub: [
      {
        sub_plo: "PLO 2.1",
        desc: "Problem analysis.",
        desc_th: "การวิเคราะห์ปัญหา",
      },
      {
        sub_plo: "PLO 2.2",
        desc: "Algorithm design.",
        desc_th: "การออกแบบอัลกอริทึม",
      },
    ],
    details: [
      {
        id: 2,
        plo: [{ id: 2, name: "PLO 2", expect: 60, define: 85 }],
        sub_plo: [{ id: 2, include: ["PLO 2.1", "PLO 2.2"] }],
        involved_clo: [{ id: 2, name: "CLO 2.1", expect: 60, define: 85 }],
        involved_assessment: [
          { id: 2, name: "Assessment 2", expect: 60, define: 85 },
        ],
      },
    ],
  },
  {
    id: 3,
    plo: "PLO 3",
    desc: "Demonstrate effective teamwork and communication skills.",
    desc_th: "แสดงทักษะการทำงานเป็นทีมและการสื่อสารที่มีประสิทธิภาพ",
    sub: [
      {
        sub_plo: "PLO 3.1",
        desc: "Team collaboration.",
        desc_th: "การทำงานร่วมกันในทีม",
      },
      {
        sub_plo: "PLO 3.2",
        desc: "Professional communication.",
        desc_th: "การสื่อสารในระดับมืออาชีพ",
      },
    ],
    details: [
      {
        id: 3,
        plo: [{ id: 3, name: "PLO 3", expect: 70, define: 90 }],
        sub_plo: [{ id: 3, include: ["PLO 3.1", "PLO 3.2"] }],
        involved_clo: [{ id: 3, name: "CLO 3.1", expect: 70, define: 90 }],
        involved_assessment: [
          { id: 3, name: "Assessment 3", expect: 70, define: 90 },
        ],
      },
    ],
  },
  {
    id: 4,
    plo: "PLO 4",
    desc: "Utilize modern tools and technologies in software engineering.",
    desc_th: "ใช้เครื่องมือและเทคโนโลยีสมัยใหม่ในวิศวกรรมซอฟต์แวร์",
    sub: [
      {
        sub_plo: "PLO 4.1",
        desc: "Tool proficiency.",
        desc_th: "ความชำนาญในเครื่องมือ",
      },
      {
        sub_plo: "PLO 4.2",
        desc: "Technology adoption.",
        desc_th: "การนำเทคโนโลยีมาใช้",
      },
    ],
    details: [
      {
        id: 4,
        plo: [{ id: 3, name: "PLO 3", expect: 65, define: 75 }],
        sub_plo: [{ id: 3, include: ["PLO 3.1", "PLO 3.2"] }],
        involved_clo: [{ id: 3, name: "CLO 3.1", expect: 65, define: 75 }],
        involved_assessment: [
          { id: 3, name: "Assessment 4", expect: 65, define: 75 },
          { id: 4, name: "Assessment 5", expect: 65, define: 75 },
        ],
      },
    ],
  },
]);

function getRateClass(expect, define) {
  return {
    "text-green-500": expect > define,
    "text-red-500": expect <= define,
    "font-semibold": true,
  };
}
</script>

<style lang="scss" scoped>
</style>
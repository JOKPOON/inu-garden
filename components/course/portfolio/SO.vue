<template>
  <div
    class="flex flex-col gap-4 w-full h-full rounded-xl border border-grey-secondary p-4 bg-white"
  >
    <!-- List of PLOs -->
    <!-- <div class="font-semibold w-full pb-2 border-b border-grey-secondary">
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
    </ul> -->

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
          class="col-span-1 text-center font-semibold border-r border-grey-tertiary"
        >
          SO
        </div>
        <div
          class="col-span-2 text-center font-semibold border-r border-grey-tertiary"
        >
          Sub SO
        </div>
        <div
          class="col-span-2 text-center font-semibold border-r border-grey-tertiary"
        >
          Involved CLO
        </div>
        <div class="col-span-2 text-center font-semibold">
          Involved Assessment
        </div>
      </div>

      <div v-for="plo in structuredPlos" :key="`plo-${plo.id}`">
        <div
          v-for="sub in plo.sub"
          :key="`sub-plo-${sub.sub_plo}`"
          class="grid grid-cols-7 gap-4 pb-4 border-grey-secondary"
        >
          <div class="col-span-1 space-y-3 border-r border-grey-tertiary pr-3">
            <div class="font-semibold">{{ plo.plo }}</div>
          </div>
          <div class="col-span-2 border-r border-grey-tertiary pr-3">
            <div class="font-semibold">{{ sub.sub_plo }}</div>
            <div class="text-grey-primary">
              Passing Rate :
              <span :class="getRateClass(sub.expect, sub.define)">
                {{ sub.expect.toFixed(2) }} %
              </span>
            </div>
            <div class="text-grey-primary">
              Expected Rate :
              <span class="font-semibold text-black-primary">
                {{ sub.define.toFixed(2) }} %
              </span>
            </div>
          </div>
          <div class="col-span-4 space-y-3 border-r border-grey-tertiary pr-3">
            <div
              v-for="clo in sub.CLOPassingRate"
              :key="`clo-${clo.id}`"
              class="grid grid-cols-4 gap-4 pb-4 border-grey-secondary"
            >
              <div class="col-span-2 border-r">
                <div class="font-semibold">{{ clo.name }}</div>
                <div class="text-grey-primary">
                  Passing Rate :
                  <span :class="getRateClass(clo.expect, clo.define)">
                    {{ clo.expect.toFixed(2) }} %
                  </span>
                </div>
                <div class="text-grey-primary">
                  Expected Rate :
                  <span class="font-semibold text-black-primary">
                    {{ clo.define.toFixed(2) }} %
                  </span>
                </div>
              </div>
              <div class="col-span-2">
                <div
                  v-for="clo in sub.CLOPassingRate"
                  :key="`assessment-clo-${clo.id}`"
                >
                  <div
                    v-for="assessment in clo.involved_assessment"
                    :key="`assessment-${assessment.id}`"
                    class="mb-2"
                  >
                    <div class="font-semibold">{{ assessment.name }}</div>
                    <div class="text-grey-primary">
                      Passing Rate :
                      <span
                        :class="
                          getRateClass(assessment.expect, assessment.define)
                        "
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  sos: {
    type: Object,
    required: true,
  },
});

const structuredPlos = computed(() => {
  return Object.values(props.sos).reduce((acc, so) => {
    const existingSo = acc.find((p) => p.id === so.SOID);
    const formattedCLOs = Object.values(so.CLOPassingRate).map((clo) => ({
      id: clo.CLOID,
      name: clo.CLOCode,
      expect: clo.PassedPercentage,
      define: clo.ExpectedPassingAssignmentPercentage,
      involved_assessment: Object.values(clo.Assignments).map((assess) => ({
        id: assess.AssignmentID,
        name: assess.AssignmentName,
        expect: assess.PassedPercentage,
        define: assess.ExpectedPassingAssignmentPercentage,
      })),
    }));

    const subSO = {
      sub_plo: so.SSOCode,
      expect: so.PassedPercentage,
      define: so.ExpectedPassingCloPercentage,
      CLOPassingRate: formattedCLOs,
    };

    if (existingSo) {
      existingSo.sub.push(subSO);
    } else {
      acc.push({
        id: so.SOID,
        plo: so.SOCode,
        expect: so.PassedPercentage,
        define: so.ExpectedPassingCloPercentage,
        sub: [subSO],
      });
    }

    return acc;
  }, []);
});

const getRateClass = (expect, define) => {
  if (expect >= define) {
    return "text-green-500 font-semibold";
  } else if (expect < define && expect >= define * 0.8) {
    return "text-yellow-500 font-semibold";
  } else {
    return "text-red-500 font-semibold";
  }
};
</script>

<style lang="scss" scoped></style>

<template>
  <div
    class="px-4 py-3 bg-white border border-grey-secondary rounded-xl flex flex-col gap-4 items-center mt-4 text-sm"
  >
    <div class="flex gap-4 p-4 border-b font-bold w-full">
      <div class="flex-1">ID</div>
      <div class="flex-2">Name</div>
      <div class="flex-6 flex gap-2">
        <div
          v-for="plo in uniquePLOs"
          :key="plo"
          class="flex-1 flex items-center justify-center"
        >
          {{ plo }}
        </div>
      </div>
    </div>
    <div
      v-if="result"
      class="max-h-[calc(100vh-480px)] overflow-y-scroll scrollbar-set w-full"
    >
      <div
        v-for="student in result"
        :key="student.student_id"
        class="flex gap-4 p-4 border-b"
      >
        <div class="flex-1">{{ student.student_id }}</div>
        <div class="flex-2">{{ student.student_name_th }}</div>
        <div class="flex-6 flex gap-2">
          <div
            v-for="plo in uniquePLOs"
            :key="plo"
            class="flex-1 flex items-center justify-center"
          >
            <component
              :is="
                student.plos?.find((plos) => {
                  return plos.code == plo;
                })
                  ? Include
                  : NotInclude
              "
              :class="
                student.plos?.find((plos) => {
                  if (plos.code == plo) {
                    return plos.pass;
                  }
                })
                  ? 'text-green-700'
                  : 'text-red-700'
              "
              class="w-5 h-5"
            />
          </div>
        </div>
      </div>
    </div>
    <div v-else class="flex items-center justify-center flex-col pt-4">
      <img
        :src="BannerLogin"
        alt="Banner Login"
        class="w-56 max-w-md object-cover rounded-2xl mb-4"
      />
      <div class="text-center font-semibold text-grey-primary">
        No Student found!
      </div>
    </div>
  </div>
</template>

<script setup>
import Include from "@/components/icons/Include.vue";
import NotInclude from "@/components/icons/NotInclude.vue";
import BannerLogin from "@/components/images/BannerLogin.jpg";

const props = defineProps({
  result: {
    type: Object,
    required: true,
  },
  allCLOs: {
    type: Array,
    required: true,
  },
});

const allPLOs = props.result.map((student) => {
  return student.plos?.map((plo) => plo.code || "") || [];
});
const uniquePLOs = [...new Set(allPLOs.flat())];
</script>

<style lang="scss" scoped>
.scrollbar-set {
  scrollbar-width: thin;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 10px;
    border: 2px solid #f1f1f1;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
}
.flex-1 {
  flex: 1;
}
.flex-2 {
  flex: 2;
}
.flex-6 {
  flex: 6;
}
</style>

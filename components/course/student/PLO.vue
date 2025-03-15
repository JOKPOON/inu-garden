<template>
  <div
    class="px-4 py-3 bg-white border border-grey-secondary rounded-xl flex flex-col gap-4 items-center mt-4 text-sm"
  >
    <div class="flex gap-4 p-4 border-b font-bold w-full">
      <div class="flex-1">ID</div>
      <div class="flex-2">Name</div>
      <div class="flex-6 flex gap-2">
        <div
          v-for="plo in allPLOs"
          :key="plo"
          class="flex-1 flex items-center justify-center"
        >
          {{ plo }}
        </div>
      </div>
    </div>
    <div
      v-if="studentResults.length > 0"
      class="max-h-[calc(100vh-480px)] overflow-y-scroll scrollbar-set w-full"
    >
      <div
        v-for="student in studentResults"
        :key="student.studentID"
        class="flex gap-4 p-4 border-b"
      >
        <div class="flex-1">{{ student.studentID }}</div>
        <div class="flex-2">{{ student.studentName }}</div>
        <div class="flex-6 flex gap-2">
          <div
            v-for="plo in allPLOs"
            :key="plo"
            class="flex-1 flex items-center justify-center"
          >
            <component
              :is="student.PLO[plo] ? Include : NotInclude"
              :class="student.PLO[plo] ? 'text-green-700' : 'text-red-700'"
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

const studentResults = [
  {
    studentID: "64070501000",
    studentName: "John Doe",
    PLO: {
      PLO1: true,
      PLO2: true,
      PLO3: true,
      PLO4: true,
      PLO5: true,
    },
  },
  {
    studentID: "64070501001",
    studentName: "Jane Smith",
    PLO: {
      PLO1: true,
      PLO2: true,
      PLO4: true,
      PLO8: true,
      PLO9: true,
    },
  },
  {
    studentID: "64070501002",
    studentName: "Alice Johnson",
    PLO: {
      PLO1: true,
      PLO2: true,
      PLO3: true,
      PLO4: true,
      PLO5: true,
    },
  },
  {
    studentID: "64070501003",
    studentName: "Bob Brown",
    PLO: {
      PLO1: true,
      PLO2: true,
      PLO3: true,
      PLO6: true,
      PLO8: true,
    },
  },
  {
    studentID: "64070501004",
    studentName: "Charlie Davis",
    PLO: {
      PLO1: true,
      PLO2: true,
      PLO3: true,
      PLO4: true,
      PLO5: true,
    },
  },
  {
    studentID: "64070501005",
    studentName: "Eve Wilson",
    PLO: {
      PLO1: true,
      PLO2: true,
      PLO3: true,
      PLO4: true,
      PLO5: true,
    },
  },
  {
    studentID: "64070501006",
    studentName: "Frank Thompson",
    PLO: {
      PLO1: true,
      PLO2: true,
      PLO3: true,
      PLO4: true,
      PLO5: true,
    },
  },
  {
    studentID: "64070501007",
    studentName: "Grace Martinez",
    PLO: {
      PLO1: true,
      PLO2: true,
      PLO3: true,
      PLO4: true,
      PLO5: true,
    },
  },
];

const allPLOs = Array.from(
  new Set(studentResults.flatMap((student) => Object.keys(student.PLO)))
).sort((a, b) => {
  const numA = parseInt(a.replace("PLO", ""), 10);
  const numB = parseInt(b.replace("PLO", ""), 10);
  return numA - numB;
});
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

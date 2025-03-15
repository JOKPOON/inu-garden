<template>
    <div
      class="px-4 py-3 bg-white border border-grey-secondary rounded-xl flex flex-col gap-4 items-center mt-4 text-sm"
    >
      <div class="flex gap-4 p-4 border-b font-bold w-full">
        <div class="flex-1">ID</div>
        <div class="flex-2">Name</div>
        <div class="flex-6 flex gap-2">
          <div v-for="so in allSOs" :key="so" class="flex-1 flex items-center justify-center">{{ so }}</div>
        </div>
      </div>
      <div v-if="studentResults.length > 0" class="max-h-[calc(100vh-480px)] overflow-y-scroll scrollbar-set w-full">
        <div v-for="student in studentResults" :key="student.studentID" class="flex gap-4 p-4 border-b">
          <div class="flex-1">{{ student.studentID }}</div>
          <div class="flex-2">{{ student.studentName }}</div>
          <div class="flex-6 flex gap-2">
            <div v-for="so in allSOs" :key="so" class="flex-1 flex items-center justify-center">
              <component :is="student.SO[so] ? Include : NotInclude" class="w-5 h-5"/>
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
  import Include from '@/components/icons/Include.vue';
  import NotInclude from '@/components/icons/NotInclude.vue';
  import BannerLogin from "@/components/images/BannerLogin.jpg";

  const studentResults = [
    {
      studentID: "64070501000",
      studentName: "John Doe",
      SO: {
        SO1: true,
        SO2: true,
        SO3: true,
        SO4: true,
        SO5: true,
      },
    },
    {
      studentID: "64070501001",
      studentName: "Jane Smith",
      SO: {
        SO1: true,
        SO2: true,
        SO4: true,
        SO8: true,
        SO9: true,
      },
    },
    {
      studentID: "64070501002",
      studentName: "Alice Johnson",
      SO: {
        SO1: true,
        SO2: true,
        SO3: true,
        SO4: true,
        SO5: true,
      },
    },
    {
      studentID: "64070501003",
      studentName: "Bob Brown",
      SO: {
        SO1: true,
        SO2: true,
        SO3: true,
        SO6: true,
        SO8: true,
      },
    },
    {
      studentID: "64070501004",
      studentName: "Charlie Davis",
      SO: {
        SO1: true,
        SO2: true,
        SO3: true,
        SO4: true,
        SO5: true,
      },
    },
    {
      studentID: "64070501005",
      studentName: "Eve Wilson",
      SO: {
        SO1: true,
        SO2: true,
        SO3: true,
        SO4: true,
        SO5: true,
      },
    },
    {
      studentID: "64070501006",
      studentName: "Frank Thompson",
      SO: {
        SO1: true,
        SO2: true,
        SO3: true,
        SO4: true,
        SO5: true,
      },
    },
    {
      studentID: "64070501007",
      studentName: "Grace Martinez",
      SO: {
        SO1: true,
        SO2: true,
        SO3: true,
        SO4: true,
        SO5: true,
      },
    },
  ];
  
  const allSOs = Array.from(new Set(studentResults.flatMap(student => Object.keys(student.SO)))).sort((a, b) => {
    const numA = parseInt(a.replace('SO', ''), 10);
    const numB = parseInt(b.replace('SO', ''), 10);
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
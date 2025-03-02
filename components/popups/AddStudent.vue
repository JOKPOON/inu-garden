<template>
    <teleport to="body">
      <div
        class="w-full h-full fixed inset-0 flex items-center justify-center bg-black-primary bg-opacity-50 z-50"
      >
        <div
          class="bg-white p-8 rounded-xl shadow-lg flex flex-col items-center border border-grey-secondary"
        >
        <div class="flex flex-col w-[28rem]">
          <div class="text-2xl font-semibold text-black-primary">
            Add Student
          </div>
          <div class="text-sm text-grey-primary mt-1">
            Type student ID to add
          </div>
        </div>
          <div class="mt-4 text-center flex gap-4 flex-col text-sm">
            <input
              v-model="student.id"
              type="text"
              placeholder="Enter Student ID"
              class="w-[28rem] px-4 py-2 border border-grey-secondary rounded-xl outline-none"
            />
            <h3
              v-if="student.id && filteredStudents.length"
              class="text-base font-semibold border-b border-grey-secondary py-1 text-start"
            >
              Results
            </h3>
            <ul
              v-if="student.id && filteredStudents.length"
              class="max-h-60 overflow-y-scroll scrollbar-set w-[28rem] bg-white border border-grey-secondary rounded-xl mt-2"
            >
              <li
                v-for="student in filteredStudents"
                :key="student.id"
                @click="selectStudent(student)"
                class="px-4 py-2 cursor-pointer hover:bg-grey-secondary"
              >
                {{ student.id }} - {{ student.first_name_en }}
                {{ student.last_name_en }}
              </li>
            </ul>
            <div v-else-if="student.id" class="text-black-primary mt-2">
              No results found
            </div>
          </div>
          <div v-if="selectedStudents.length" class="mt-6 w-[28rem]">
            <h3
              class="text-base font-semibold border-b border-grey-secondary py-1"
            >
              Selected Students <span class="font-normal text-grey-primary">({{ selectedStudents.length }}) </span>
            </h3>
            <ul class="mt-2">
              <li
                v-for="student in selectedStudents"
                :key="student.id"
                class="pt-1 flex justify-between items-center"
              >
                <span
                  >{{ student.id }} - {{ student.first_name_en }}
                  {{ student.last_name_en }}</span
                >
                <button
                  @click="removeStudent(student.id)"
                  class="flex items-center justify-center bg-white rounded-xl p-2 border border-grey-secondary hover:bg-red-500 text-black-primary hover:text-white"
                >
                  <Delete class="w-5 h-5" />
                </button>
              </li>
            </ul>
          </div>
          <div
            class="flex flex-row items-center justify-center gap-2 w-full mt-6 border border-grey-secondary rounded-xl"
          >
            <button
              @click="addStudentAll"
              class="py-2 font-medium border border-grey-secondary text-black-primary rounded-xl w-full bg-yellow-primary hover:bg-black-primary hover:text-white"
            >
              Add 
            </button>
            <button
              @click="$emit('close')"
              class="py-2 font-medium border border-grey-secondary text-black-primary rounded-xl w-full hover:bg-black-primary hover:text-white"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </teleport>
  </template>
  
  <script setup>
  import { ref, computed } from "vue";
  import { defineProps, defineEmits } from "vue";
  import Delete from "@/components/icons/Delete.vue";
  
  const emit = defineEmits(["close", "addStudent"]);
  
  const student = ref({
    id: "",
  });
  
  const selectedStudents = ref([]);
  
  const props = defineProps({
    id: {
      type: String,
      required: true,
    },
  });
  
  const AllStudent = ref([
    {
      id: "64070501011",
      first_name_th: "อริสา",
      last_name_th: "สมิธ",
      first_name_en: "Alice",
      last_name_en: "Smith",
      gpax: 3.9,
      math_gpa: 4.0,
      eng_gpa: 3.8,
      sci_gpa: 3.9,
      school: "XYZ High School",
      city: "Chiang Mai",
      email: "alice.smith@example.com",
      year: "2024",
      admission: "Regular",
      remark: "Top scorer in regional math olympiad",
      programme_name: "Computer Engineering",
      department_name: "Computer Engineering",
      programme_id: "01JKK501SMEE3K9NYKBVAKHER6",
    },
    {
      id: "64070501012",
      first_name_th: "มานพ",
      last_name_th: "จอห์นสัน",
      first_name_en: "Michael",
      last_name_en: "Johnson",
      gpax: 3.6,
      math_gpa: 3.7,
      eng_gpa: 3.5,
      sci_gpa: 3.6,
      school: "DEF International School",
      city: "Phuket",
      email: "michael.johnson@example.com",
      year: "2024",
      admission: "Regular",
      remark: "Consistent academic performance with strong math skills",
      programme_name: "Computer Engineering",
      department_name: "Computer Engineering",
      programme_id: "01JKK501SMEE3K9NYKBVAKHER6",
    },
    {
      id: "64070501013",
      first_name_th: "เอมอร",
      last_name_th: "บราวน์",
      first_name_en: "Emma",
      last_name_en: "Brown",
      gpax: 3.85,
      math_gpa: 3.9,
      eng_gpa: 3.7,
      sci_gpa: 3.8,
      school: "GHI High School",
      city: "Pattaya",
      email: "emma.brown@example.com",
      year: "2024",
      admission: "Regular",
      remark: "Excellence in science projects and research",
      programme_name: "Computer Engineering",
      department_name: "Computer Engineering",
      programme_id: "01JKK501SMEE3K9NYKBVAKHER6",
    },
    {
      id: "64070501014",
      first_name_th: "ดนัย",
      last_name_th: "วิลสัน",
      first_name_en: "Daniel",
      last_name_en: "Wilson",
      gpax: 3.7,
      math_gpa: 3.8,
      eng_gpa: 3.6,
      sci_gpa: 3.7,
      school: "JKL High School",
      city: "Khon Kaen",
      email: "daniel.wilson@example.com",
      year: "2024",
      admission: "Regular",
      remark: "Strong analytical and problem-solving skills",
      programme_name: "Computer Engineering",
      department_name: "Computer Engineering",
      programme_id: "01JKK501SMEE3K9NYKBVAKHER6",
    },
    {
      id: "64070501015",
      first_name_th: "โสภิดา",
      last_name_th: "เทย์เลอร์",
      first_name_en: "Sophia",
      last_name_en: "Taylor",
      gpax: 3.95,
      math_gpa: 4.0,
      eng_gpa: 3.9,
      sci_gpa: 3.95,
      school: "MNO High School",
      city: "Hat Yai",
      email: "sophia.taylor@example.com",
      year: "2024",
      admission: "Regular",
      remark: "Exceptional GPA with perfect math scores",
      programme_name: "Computer Engineering",
      department_name: "Computer Engineering",
      programme_id: "01JKK501SMEE3K9NYKBVAKHER6",
    },
  ]);
  
  const filteredStudents = computed(() => {
    const searchTerm = student.value.id.toLowerCase();
    return AllStudent.value.filter((s) =>
      s.id.toLowerCase().includes(searchTerm)
    );
  });
  
  const selectStudent = (selectedStudent) => {
    student.value = { ...selectedStudent };
    addStudent();
  };
  
  const addStudent = () => {
    if (student.value.id) {
      selectedStudents.value.push({ ...student.value });
      student.value = { id: "" };
    }
  };
  
  const addStudentAll = () => {
    emit("addStudent", selectedStudents.value);
    selectedStudents.value = [];
  };
  
  const removeStudent = (id) => {
    selectedStudents.value = selectedStudents.value.filter(
      (student) => student.id !== id
    );
  };
  </script>
  
  <style scoped>
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
  </style>
<template>
  <teleport to="body">
    <div
      class="w-full h-full fixed inset-0 flex items-center justify-center bg-black-primary bg-opacity-50 z-50"
    >
      <div
        class="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center border border-grey-secondary"
      >
        <div class="flex flex-col w-[28rem]">
            <div
            class="text-2xl font-semibold text-black-primary w-full text-center border-b border-grey-secondary pb-3"
          >
            Add Student
          </div>
        </div>
        <div class="mt-4 text-center flex gap-4 flex-col text-sm">
          <input
            v-model="student.id"
            type="text"
            placeholder="Student ID"
            class="w-[28rem] px-4 py-2 border border-grey-secondary rounded-xl outline-none"
          />
          <input
            v-model="student.first_name"
            type="text"
            placeholder="First Name"
            class="w-[28rem] px-4 py-2 border border-grey-secondary rounded-xl outline-none"
          />
          <input
            v-model="student.last_name"
            type="text"
            placeholder="Last Name"
            class="w-[28rem] px-4 py-2 border border-grey-secondary rounded-xl outline-none"
          />
          <input
            v-model="student.school"
            type="text"
            placeholder="School"
            class="w-[28rem] px-4 py-2 border border-grey-secondary rounded-xl outline-none"
          />
          <input
            v-model="student.city"
            type="text"
            placeholder="City"
            class="w-[28rem] px-4 py-2 border border-grey-secondary rounded-xl outline-none"
          />
          <input
            v-model="student.email"
            type="email"
            placeholder="Email"
            class="w-[28rem] px-4 py-2 border border-grey-secondary rounded-xl outline-none"
          />
          <input
            v-model="student.year"
            type="text"
            placeholder="Year"
            class="w-[28rem] px-4 py-2 border border-grey-secondary rounded-xl outline-none"
          />
          <input
            v-model="student.admission"
            type="text"
            placeholder="Admission"
            class="w-[28rem] px-4 py-2 border border-grey-secondary rounded-xl outline-none"
          />
          <textarea
            v-model="student.remark"
            rows="2"
            placeholder="Remark"
            class="w-[28rem] px-4 py-2 border border-grey-secondary rounded-xl outline-none"
          ></textarea>
        </div>
        <div
          class="flex flex-row items-center justify-center gap-2 w-full mt-4 border border-grey-secondary rounded-xl"
        >
          <button
            @click="addStudent"
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
import { ref } from "vue";
import { defineProps, defineEmits } from "vue";

const emit = defineEmits(["close"]);

const student = ref({
  id: "",
  first_name: "",
  last_name: "",
  school: "",
  city: "",
  email: "",
  year: "",
  admission: "",
  remark: "",
});

const props = defineProps({
  id: {
    type: String,
    required: true,
  }
});

const addStudent = () => {
  emit("close");
};
</script>

<style scoped></style>

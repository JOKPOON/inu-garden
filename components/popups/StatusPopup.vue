<template>
  <teleport to="body">
    <div
      v-if="status === 'success'"
      class="w-full h-full fixed inset-0 flex items-center justify-center bg-black-primary bg-opacity-50 z-50"
    >
      <div class="bg-white p-6 rounded-2xl shadow-lg">
        <h2
          class="text-lg font-semibold mb-4 w-full text-center pb-2 border-b px-6"
        >
          {{ message }}
        </h2>
        <div class="flex items-center justify-center flex-col">
          <img
            :src="Success"
            alt="Banner Login"
            class="w-36 max-w-md object-cover rounded-2xl mb-4"
          />
        </div>
        <div class="flex gap-4">
          <button
            @click="closeButton"
            class="w-full font-medium py-3 bg-gray-300 rounded-xl hover:bg-black-primary hover:text-white"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
    <div
      v-else
      class="w-full h-full fixed inset-0 flex items-center justify-center bg-black-primary bg-opacity-50 z-50"
    >
      <div class="bg-white p-6 rounded-2xl shadow-lg">
        <h2
          class="text-lg font-semibold mb-4 w-full text-center pb-2 border-b px-6 text-red-600"
        >
          {{ message }}
        </h2>
        <div class="flex items-center justify-center flex-col px-12">
          <img
            :src="Unsuccess"
            alt="Banner Login"
            class="w-36 max-w-md object-cover rounded-2xl mb-4 p-2"
          />
        </div>
        <div class="flex gap-4">
          <button
            @click="closeButton"
            class="w-full font-medium py-3 bg-gray-300 rounded-xl hover:bg-black-primary hover:text-white"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import { useRouter } from "vue-router";
import Success from "@/components/images/Success.png";
import Unsuccess from "@/components/images/Unsuccess.jpg";

const props = defineProps({
  status: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
});
const emit = defineEmits(["close"]);
const router = useRouter();

const closeButton = () => {
  emit("close");
  router.push(props.path);
};
</script>

<style scoped></style>

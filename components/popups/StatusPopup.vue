<template>
  <teleport to="body">
    <div
      class="w-full h-full fixed inset-0 flex items-center justify-center bg-black-primary bg-opacity-20 z-50"
    >
      <div
        v-if="status === 'success'"
        class="h-auto fixed bottom-8 right-8 flex items-center justify-center z-50"
      >
        <div
          class="bg-white p-4 rounded-2xl shadow-xl border border-grey-tertiary"
        >
          <div class="flex flex-row h-full gap-4">
            <div class="h-14 w-[6px] bg-green-600 rounded-3xl"></div>
            <div class="flex flex-col">
              <h2
                class="text-lg font-semibold w-full text-start text-green-600"
              >
                Success!
              </h2>
              <div class="flex items-center justify-center flex-col">
                {{ message }}
              </div>
              <div class="flex gap-2"></div>
            </div>
            <div class="flex flex-start">
              <button
                @click="closeButton"
                class="text-grey-primary font-semibold hover:text-black-primary flex h-6"
              >
                X
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        v-else
        class="h-auto fixed bottom-8 right-8 flex items-center justify-center z-50"
      >
        <div
          class="bg-white p-4 rounded-2xl shadow-xl border border-grey-tertiary"
        >
          <div class="flex flex-row h-full gap-4">
            <div class="h-14 w-[6px] bg-red-600 rounded-3xl"></div>
            <div class="flex flex-col">
              <h2 class="text-lg font-semibold w-full text-start text-red-600">
                Error!
              </h2>
              <div class="flex items-center justify-center flex-col">
                {{ message }}
              </div>
              <div class="flex gap-2"></div>
            </div>
            <div class="flex flex-start">
              <button
                @click="closeButton"
                class="text-grey-primary font-semibold hover:text-black-primary flex h-6"
              >
                X
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import { useRouter } from "vue-router";

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

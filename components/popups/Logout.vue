<template>
  <teleport to="body">
    <div
      class="w-full h-full fixed inset-0 flex items-center justify-center bg-black-primary bg-opacity-50 z-50"
    >
      <div class="bg-white p-6 rounded-2xl shadow-lg">
        <h2 class="text-xl font-semibold mb-4 w-full text-center pb-2 border-b">
          Log Out
        </h2>
        <p class="mb-6 px-10">Click "Confirm" to log out</p>
        <div class="flex justify-between gap-4">
          <button
            @click="handleLogout"
            class="w-full font-medium py-3 text-white rounded-xl bg-red-600"
          >
            Confirm
          </button>
          <button
            @click="$emit('close')"
            class="w-full font-medium py-3 bg-gray-300 rounded-xl hover:bg-black-primary hover:text-white"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { useRouter } from "vue-router";
import { BaseURL } from "~/api/api";

const router = useRouter();
const emit = defineEmits(["close"]);

const handleLogout = () => {
  fetch(BaseURL + "auth/logout", {
    credentials: "include",
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        router.push("/login");
      } else {
        console.log(data.error.message);
      }
    });
};
</script>

<style lang="scss" scoped></style>

<template>
  <teleport to="body">
    <div
      class="w-full h-full fixed inset-0 flex items-center justify-center bg-black-primary bg-opacity-50 z-50"
    >
      <div class="bg-white p-6 rounded-2xl shadow-lg">
        <h2 class="text-xl font-semibold mb-4 w-full text-center">Log Out</h2>
        <p class="mb-6 px-10">Click "Confirm" to log out</p>
        <div class="flex justify-between gap-4">
          <button
            @click="handleLogout"
            class="w-full font-medium py-2 bg-orange-primary text-white rounded-xl hover:bg-red-600"
          >
            Confirm
          </button>
          <button
            @click="$emit('close')"
            class="w-full font-medium py-2 bg-gray-300 rounded-xl hover:grey-secondary"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const { t } = useI18n();
const router = useRouter();

const handleLogout = () => {
  router.push("/login");
};

useHead({
  title: t("seo.title"),
  description: t("seo.desc"),
});
</script>

<style lang="scss" scoped></style>

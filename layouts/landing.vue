<template>
  <SideBar
    :show-lang-options="openLangOptions"
    @open-lang-options="openLangOptions = true"
    @close-lang-options="openLangOptions = false"
  >
    <slot />
  </SideBar>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import SideBar from "@/components/layouts/SideBar.vue";
import base_url from "@/config/api";

const openLangOptions = ref(true);
const router = useRouter();

onMounted(() => {
  fetch(base_url + "auth/me", {
    credentials: "include",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        console.log(data);
      } else {
        router.push("/login");
        console.log(data.error.message);
      }
    });
});
</script>

<style lang="scss" scoped></style>

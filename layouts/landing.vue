<template>
  <div v-if="loading" class="loading-container">
    <div class="spinner"></div>
    <p>Loading...</p>
  </div>
  <div v-else>
    <SideBar
      :show-lang-options="openLangOptions"
      @open-lang-options="openLangOptions = true"
      @close-lang-options="openLangOptions = false"
    >
      <slot />
    </SideBar>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/user"; 
import SideBar from "@/components/layouts/SideBar.vue";
import base_url from "@/config/api";

const openLangOptions = ref(true);
const loading = ref(true);
const router = useRouter();
const userStore = useUserStore();

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
        userStore.setUserData(data.data);
        console.log(userStore.userData);
      } else {
        router.push("/login");
        console.log(data.error.message);
      }
    })
    .finally(() => {
      loading.value = false;
    });
});
</script>

<style lang="scss" scoped>
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #161616;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
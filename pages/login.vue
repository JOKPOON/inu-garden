<template>
  <div class=" w-full h-[100vh] bg-[#F6F8F8] flex items-center justify-center">
    <div
      class="p-6  pl-0 rounded-3xl bg-white border border-grey-tertiary shadow-setting flex flex-col gap-4 items-center"
    >
      <div class="flex flex-row justify-center items-center">
        <div class="text-2xl text-black-primary rounded-xl w-[450px]">
          <div class="rounded-2xl flex items-center justify-center relative">
            <img
              :src="BannerLogin"
              alt="Banner Login"
              class=" h-[405px] object-cover rounded-2xl"
            />
          </div>
        </div>
        <div class="flex flex-col">
          <div class="w-16 h-16 object-left" >
          </div>
          <div class="text-2xl text-black-primary -mt-4">Hello 👋</div>
          <div class="text-3xl text-black-primary font-semibold mb-4">
            Welcome!
          </div>
          <div
            :class="[
              'flex flex-row rounded-xl border mb-4 gap-2',
              { 'border-red-500': checkEmail },
            ]"
          >
            <div
              :class="[
                'border p-3 rounded-xl flex flex-center justify-center',
                { 'border-red-500': checkEmail },
              ]"
            >
              <EmailLogin class="w-6 h-6" />
            </div>
            <input
              id="email"
              type="email"
              v-model="Email"
              class="bg-transparent focus:ring-0 outline-none text-base w-72 pr-3"
              placeholder="Email"
            />
          </div>
          <div
            :class="[
              'flex flex-row rounded-xl border mb-4 gap-2',
              { 'border-red-500': checkPassword },
            ]"
          >
            <div
              :class="[
                'border p-3 rounded-xl flex flex-center justify-center',
                { 'border-red-500': checkPassword },
              ]"
            >
              <PasswordLogin class="w-6 h-6" />
            </div>
            <input
              id="password"
              type="password"
              v-model="Password"
              class="bg-transparent focus:ring-0 outline-none text-base w-72 pr-3"
              placeholder="Password"
            />
          </div>
          <div
            v-if="checkPassword || checkEmail"
            class="text-sm text-red-500 text-left w-72 mb-4 -mt-2"
          >
            <span v-if="checkEmail && !checkPassword">Invalid Email</span>
            <span v-if="checkPassword && !checkEmail">Invalid Password</span>
            <span v-if="checkEmail && checkPassword"
              >Invalid Email and Password</span
            >
          </div>
          <button @click="forgetPassword" class="text-sm text-start w-full text-grey-primary hover:underline"
            >Forgot Password?</button
          >
          <div class="flex items-center justify-center w-full pt-10">
            <LoginButton
              @click="handleLogin"
              class="flex items-center flex-row justify-center bg-black-primary rounded-xl px-12 py-3 gap-2"
            >
              <span class="text-white font-semibold text-base">Login</span>
            </LoginButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import BannerLogin from "@/components/images/BannerLogin.jpg";
import LoginLogo from "@/components/icons/LoginLogo.vue";
import EmailLogin from "@/components/icons/EmailLogin.vue";
import PasswordLogin from "@/components/icons/PasswordLogin.vue";
import LoginButton from "@/components/button/LoginButton.vue";
const { t } = useI18n();

const Email = ref("");
const Password = ref("");
const router = useRouter();
const checkEmail = ref(false);
const checkPassword = ref(false);

const handleLogin = () => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  checkEmail.value = !emailPattern.test(Email.value);
  checkPassword.value = Password.value.length < 0;

  if (!checkEmail.value && !checkPassword.value) {
    fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email: Email.value,
        password: Password.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          router.push("/");
        } else {
          console.log(data.error.message);
          if (data.error.message === "password or email is incorrect") {
            checkEmail.value = true;
            checkPassword.value = true;
          } else if (data.error.message === "password is incorrect") {
            console.log("password is incorrect");
            checkPassword.value = true;
          }
        }
      });
  }
};

const forgetPassword = () => {
  router.push("/forget-password");
};

watch(Email, () => {
  if (checkEmail.value) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    checkEmail.value = !emailPattern.test(Email.value);
  }
});

watch(Password, () => {
  if (checkPassword.value) {
    checkPassword.value = Password.value.length < 0;
  }
});

useHead({
  title: t("seo.title"),
  description: t("seo.desc"),
});
</script>

<style lang="scss" scoped>
.shadow-setting {
  box-shadow:  0px 25px 25px rgba(0, 0, 0, 0.05);
}
</style>

<template>
  <div class="w-full h-[100vh] bg-[#F6F8F8] flex items-center justify-center">
    <div
      class="p-6 pl-0 rounded-3xl bg-white border border-grey-tertiary shadow-setting flex flex-col gap-4 items-center"
    >
      <div v-if="!OTPCheck" class="flex flex-row justify-center items-center">
        <div class="text-2xl text-black-primary rounded-xl w-[450px]">
          <div class="rounded-2xl flex items-center justify-center relative">
            <img
              :src="BannerLogin"
              alt="Banner Login"
              class="h-[405px] object-cover rounded-2xl"
            />
          </div>
        </div>
        <div class="flex flex-col">
          <div class="w-16 h-16 object-left"></div>
          <div class="text-xl text-black-primary -mt-4">Reset 🔐</div>
          <div class="text-3xl text-black-primary font-semibold">Password</div>
          <div class="text-sm text-grey-primary mb-4 mt-2">
            Enter your email to receive an OTP
          </div>

          <div
            :class="[ 'flex flex-row rounded-xl border mb-4 gap-2', { 'border-red-500': checkEmail } ]"
          >
            <div
              :class="[ 'border p-3 rounded-xl flex flex-center justify-center', { 'border-red-500': checkEmail } ]"
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
            v-if="checkEmail"
            class="text-sm text-red-500 text-left w-72 mb-4 -mt-2"
          >
            Invalid Email Format
          </div>
          <div class="flex items-center justify-center w-full pt-6">
            <LoginButton
              @click="handleRequestOTP"
              class="flex items-center flex-row justify-center bg-black-primary rounded-xl px-12 py-3 gap-2"
            >
              <span class="text-white font-semibold text-base">Request OTP</span>
            </LoginButton>
          </div>
        </div>
      </div>
      <div v-if="OTPCheck" class="flex flex-row justify-center items-center">
        <div class="text-2xl text-black-primary rounded-xl w-[450px]">
          <div class="rounded-2xl flex items-center justify-center relative">
            <img
              :src="BannerLogin"
              alt="Banner Login"
              class="h-[405px] object-cover rounded-2xl"
            />
          </div>
        </div>
        <div class="flex flex-col">
          <div class="w-16 h-16 object-left"></div>
          <div class="text-xl text-black-primary -mt-4">Reset 🔐</div>
          <div class="text-3xl text-black-primary font-semibold">Password</div>
          <div class="text-sm text-grey-primary mb-4 mt-2">
            Enter your OTP and new password
          </div>

          <div
            :class="[ 'flex flex-row rounded-xl border mb-4 gap-2', { 'border-red-500': checkOTP } ]"
          >
            <div
              :class="[ 'border p-3 rounded-xl flex flex-center justify-center', { 'border-red-500': checkOTP } ]"
            >
              <PasswordLogin class="w-6 h-6" />
            </div>
            <input
              id="otp"
              type="text"
              v-model="OTP"
              class="bg-transparent focus:ring-0 outline-none text-base w-72 pr-3"
              placeholder="Enter OTP"
            />
          </div>
          <div
            :class="[ 'flex flex-row rounded-xl border mb-4 gap-2', { 'border-red-500': checkPassword } ]"
          >
            <div
              :class="[ 'border p-3 rounded-xl flex flex-center justify-center', { 'border-red-500': checkPassword } ]"
            >
              <PasswordLogin class="w-6 h-6" />
            </div>
            <input
              id="newPassword"
              type="password"
              v-model="newPassword"
              class="bg-transparent focus:ring-0 outline-none text-base w-72 pr-3"
              placeholder="Enter new password"
            />
          </div>
          <div
            :class="[ 'flex flex-row rounded-xl border mb-4 gap-2', { 'border-red-500': checkPassword } ]"
          >
            <div
              :class="[ 'border p-3 rounded-xl flex flex-center justify-center', { 'border-red-500': checkPassword } ]"
            >
              <PasswordLogin class="w-6 h-6" />
            </div>
            <input
              id="confirmPassword"
              type="password"
              v-model="confirmPassword"
              class="bg-transparent focus:ring-0 outline-none text-base w-72 pr-3"
              placeholder="Confirm new password"
            />
          </div>
          <div
            v-if="checkOTP || checkPassword"
            class="text-sm text-red-500 text-left w-72 mb-4 -mt-2"
          >
            <span v-if="checkOTP">Invalid OTP</span>
            <span v-if="checkPassword">Passwords do not match</span>
          </div>
          <div class="flex items-center justify-center w-full pt-6">
            <LoginButton
              @click="handlePasswordChange"
              class="flex items-center flex-row justify-center bg-black-primary rounded-xl px-12 py-3 gap-2"
            >
              <span class="text-white font-semibold text-base">Change Password</span>
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
import { useI18n } from "vue-i18n";
import BannerLogin from "@/components/images/BannerLogin.jpg";
import EmailLogin from "@/components/icons/EmailLogin.vue";
import PasswordLogin from "@/components/icons/PasswordLogin.vue";
import LoginButton from "@/components/button/LoginButton.vue";
import base_url from "@/config/api";

const { t } = useI18n();
const router = useRouter();

const Email = ref("");
const OTP = ref("");
const newPassword = ref("");
const confirmPassword = ref("");
const checkEmail = ref(false);
const checkOTP = ref(false);
const checkPassword = ref(false);
const OTPCheck = ref(false);

const handleRequestOTP = () => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  checkEmail.value = !emailPattern.test(Email.value);

};

const handlePasswordChange = () => {
  checkOTP.value = OTP.value.length !== 6;
  checkPassword.value = newPassword.value !== confirmPassword.value;

  if (!checkOTP.value && !checkPassword.value) {
    fetch(base_url + "auth/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: Email.value,
        otp: OTP.value,
        newPassword: newPassword.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          router.push("/login");
        } else {
          console.log(data.error.message);
          if (data.error.message === "Invalid OTP") {
            checkOTP.value = true;
          }
        }
      })
      .catch((error) => {
        console.error("Error resetting password:", error);
      });
  }
};

watch(Email, () => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  checkEmail.value = !emailPattern.test(Email.value);
});

watch(OTP, () => {
  checkOTP.value = OTP.value.length !== 6;
});

useHead({
  title: t("seo.title"),
  description: t("seo.desc"),
});
</script>

<style lang="scss" scoped>
.shadow-setting {
  box-shadow: 0px 25px 25px rgba(0, 0, 0, 0.05);
}
</style>
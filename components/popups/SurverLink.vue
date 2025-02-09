<template>
  <div class="fixed inset-0 flex items-center justify-center bg-[#F6F8F8] z-50">
    <div
      class="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center border border-grey-secondary"
    >
      <div class="flex justify-between items-center mb-4 w-full">
        <h2 class="text-xl">
          Survey of - <span class="font-semibold">{{ name }}</span>
        </h2>
      </div>
      <div class="mb-4 text-center">
        <div
          class="flex flex-row items-center justify-center border rounded-lg"
        >
          <button
            @click="copyLink"
            :class="
              copyStatus
                ? ' bg-yellow-primary text-black-primary'
                : 'bg-black-primary text-white'
            "
            class="px-4 w-28 py-2 rounded-xl"
          >
            {{ copyStatus ? "Copied!" : "Copy Link" }}
          </button>
          <p class="text-base px-4">{{ truncatedLink }}</p>
        </div>
        <div
          class="flex flex-row items-center justify-center border rounded-lg mt-4 p-6"
        >
          <img :src="qrCodeUrl" alt="QR Code" />
        </div>
      </div>
      <div class="flex flex-row items-center justify-center gap-4 w-full">
        <SendButton
          @click="openLink"
          class="py-2 bg-black-primary text-white rounded-xl w-full gap-2 items-center flex justify-center"
        >
          Open Link
        </SendButton>
        <button
          @click="$emit('close')"
          class="py-2 border border-grey-secondary text-black-primary rounded-xl w-full hover:bg-black-primary hover:text-white"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import SendButton from "@/components/button/SendButton.vue";

const props = defineProps({
  link: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const qrCodeUrl = computed(() => {
  return `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(props.link)}`;
});

const copyStatus = ref(false);

const copyLink = () => {
  navigator.clipboard.writeText(props.link).then(() => {
    copyStatus.value = true;
    setTimeout(() => {
      copyStatus.value = false;
    }, 2000);
  });
};

const openLink = () => {
  window.open(props.link, "_blank");
};

const truncatedLink = computed(() => {
  const maxLength = 30;
  return props.link.length > maxLength
    ? props.link.substring(0, maxLength) + "..."
    : props.link;
});
</script>

<style scoped>
.text-center {
  text-align: center;
}
</style>

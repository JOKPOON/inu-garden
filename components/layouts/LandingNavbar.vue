<template>
    <div
      class="sticky hidden w-full h-12 px-8 py-1 transition-all duration-500 text-note -top-12 md:block z-99 bg-linear lg:px-14"
      :class="{ 'top-0': showLangOptions }"
    >
      <div class="flex justify-end h-full py-1 space-x-2">
        <component :is="LanguageToggler" :force-open="showLangOptions" />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch, defineAsyncComponent } from "vue";
  import { useWindowScroll } from "@vueuse/core";
  
  const props = defineProps({
    showLangOptions: {
      type: Boolean,
      default: true,
    },
    tinted: {
      type: Boolean,
      default: false,
    },
  });
  const emit = defineEmits(["open-lang-options", "close-lang-options"]);
  const lastScrollPosition = ref(0);
  
  const LanguageToggler = defineAsyncComponent(() =>
    import("@/components/accordians/LanguageToggler.vue")
  );
  
  watch(useWindowScroll().y, (val) => {
    if (lastScrollPosition.value > val) {
      emit("open-lang-options");
    } else {
      emit("close-lang-options");
    }
    lastScrollPosition.value = val;
  });
  </script>
  

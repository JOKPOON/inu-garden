<template>
  <div
    class="flex flex-col justify-center min-h-full rounded-md h-fit w-fit bg-pastel-blue outline outline-1 -outline-offset-1 outline-ocean-blue"
  >
    <button
      @click="showLangs = !showLangs"
      class="text-royal-blue flex h-8 min-w-[5rem] items-center justify-between space-x-2 bg-transparent px-3"
    >
      <p>{{ localeProperties.name }}</p>
      <ArrowHeadIcon
        direction="down"
        class="w-3 h-3 transition-all duration-200"
        :class="{ 'rotate-180': openLangs }"
      />
    </button>
    <div class="overflow-hidden">
      <div
        class="grid px-3 transition-all duration-200"
        :class="openLangs ? 'grid-rows-[1fr] pb-1' : 'grid-rows-[0fr]'"
      >
        <NuxtLink
          :to="
            switchLocalePath(
              locales.filter((x) => x.code !== localeProperties.code)[0].code
            )
          "
          @click="
            (showLangs = !showLangs),
              moment.locale(
                locales.filter((x) => x.code !== localeProperties.code)[0].code
              ),
              $emit('toggle')
          "
          class="overflow-hidden text-royal-blue"
        >
          {{ locales.filter((x) => x.code !== localeProperties.code)[0].name }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import ArrowHeadIcon from "@/components/icons/ArrowHeadIcon.vue";
import moment from "moment/min/moment-with-locales";
const { t } = useI18n();

const props = defineProps({
  forceOpen: {
    type: Boolean,
    default: false,
  },
});
const { localeProperties, locales } = useI18n();
const switchLocalePath = useSwitchLocalePath();
const showLangs = ref(false);
const openLangs = computed(() => {
  if (!props.forceOpen) {
    showLangs.value = false;
  }
  return props.forceOpen && showLangs.value;
});

moment.locale(localeProperties.value.code);
</script>

<style lang="scss" scoped></style>

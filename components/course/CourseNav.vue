<template>
  <div class="border border-grey-secondary rounded-xl">
    <button
      v-for="button in buttons"
      :key="button"
      :class="[
        'px-6 py-3 rounded-xl',
        activeButton === button
          ? 'bg-black-primary text-white'
          : 'border border-grey-secondary text-base',
      ]"
      @click="setActionButton(button)"
    >
      {{ button }}
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { defineProps } from "vue";
const props = defineProps({
  currentRouteName: String,
});

const buttons = [
  "Overview",
  "Enrollments",
  "Learning Outcome",
  "Assessments",
  "Feedback",
];

const buttonRoutes = {
  Overview: "overview",
  Enrollments: "enrollments",
  "Learning Outcome": "learning-outcome",
  Assessments: "assessments",
  Feedback: "feedback",
};

const activeButton = ref(props.currentRouteName);
const router = useRouter();
const code = router.currentRoute.value.params.code;

const setActionButton = (button) => {
  const routePath = `/courses/${buttonRoutes[button]}/${code}`;
  router.push(routePath);
  activeButton.value = button;
};
</script>

<style lang="scss" scoped></style>

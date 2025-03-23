<template>
  <div class="">
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
import { useRouter, useRoute } from "vue-router";
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
  "Survey",
];

const buttonRoutes = {
  Overview: "overview",
  Enrollments: "enrollments",
  "Learning Outcome": "learning-outcome",
  Assessments: "assessments",
  Feedback: "feedback",
  Survey: "survey",
};

const activeButton = ref(props.currentRouteName);
const router = useRouter();
const route = useRoute();
const id = route.params.id;

const setActionButton = (button) => {
  const routePath = `/courses/${buttonRoutes[button]}/${id}`;
  const query = { ...route.query };
  delete query.name;
  delete query.groupId;
  router.push({ path: routePath, query });
  activeButton.value = button;
};
</script>

<style lang="scss" scoped></style>
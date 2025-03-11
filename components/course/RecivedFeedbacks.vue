<template>
  <div class="flex flex-col">
    <div class="flex items-center gap-4 flex-row">
      <div class="flex flex-row gap-4">
        <button
          @click="toggleSteam"
          :class="[
            'flex items-center flex-row justify-center border border-grey-secondary rounded-xl px-4 py-2 gap-2 transition-all duration-300',
            steamStatusClass,
          ]"
        >
          <span class="font-semibold text-base">Stream</span>
          <template v-if="steamStatus === 'default'">
            <Status class="w-5 h-5" />
          </template>
          <template v-else-if="steamStatus === 'ascending'">
            <ArrowUp class="w-5 h-5" />
          </template>
          <template v-else>
            <ArrowDown class="w-5 h-5" />
          </template>
        </button>
        <button
          @click="toggleDateTime"
          :class="[
            'flex items-center flex-row justify-center border border-grey-secondary rounded-xl px-4 py-2 gap-2 transition-all duration-300',
            dateTimeStatusClass,
          ]"
        >
          <span class="font-semibold text-base">Date Time</span>
          <template v-if="dateTimeStatus === 'default'">
            <Status class="w-5 h-5" />
          </template>
          <template v-else-if="dateTimeStatus === 'ascending'">
            <ArrowUp class="w-5 h-5" />
          </template>
          <template v-else>
            <ArrowDown class="w-5 h-5" />
          </template>
        </button>
      </div>
    </div>
    <div class="grid grid-cols-2 grid-flex-media gap-4 mt-4">
      <div
        class="flex-col flex gap-4 max-h-[calc(100vh-370px)] overflow-y-scroll scrollbar-set"
      >
        <div class="p-3 rounded-xl border border-grey-tertiary">
          <div
            v-for="feedback in received_feedbacks"
            :key="feedback.id"
            class="bg-white border border-grey-tertiary shadow-sm rounded-xl p-3 mb-4"
          >
            <p class="text-sm font-semibold">
              {{ feedback.from_course.code }} - {{ feedback.from_course.name }}
            </p>
            <p class="text-sm text-grey-primary">{{ feedback.comment }}</p>

            // TODO: Make type a tag on upper right side of the card
            <p class="text-sm text-grey-secondary">
              Type: {{ feedback.stream_type }}
            </p>
            <p class="text-sm text-grey-secondary">
              From:
              {{ feedback.user.title_en_short }}
              {{ feedback.user.first_name_en }}
              {{ feedback.user.last_name_en }}
            </p>
            <p class="text-sm text-grey-secondary">
              {{ Date(feedback.created_at).toString() }}
            </p>
          </div>
        </div>
      </div>
      <div class="flex-col flex gap-4">
        <div
          class="bg-white border border-grey-tertiary shadow-sm rounded-xl p-6"
        >
          <div class="flex flex-row gap-4 items-center justify-between mb-4">
            <h3 class="text-base font-semibold">Add Feedback</h3>
            <button
              @click="addFeedback"
              class="bg-black-primary text-white px-4 py-2 rounded-lg text-sm flex items-center flex-row gap-1"
            >
              <Send class="w-4 h-4 color-white flex items-center" />
              <div>Submit</div>
            </button>
          </div>
          <textarea
            v-model="newFeedback.message"
            placeholder="Feedback Message"
            class="p-2 border rounded w-full"
          ></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import Status from "@/components/icons/Status.vue";
import ArrowUp from "@/components/icons/ArrowUp.vue";
import ArrowDown from "@/components/icons/ArrowDown.vue";
import { useI18n } from "vue-i18n";
import Send from "@/components/icons/Send.vue";
import { fetchReceivedFeedbacks } from "~/api/api";
import { useRouter } from "vue-router";

const { t } = useI18n();

useHead({
  title: t("seo.title"),
  description: t("seo.desc"),
});

definePageMeta({
  layout: "landing",
});

const router = useRouter();
const buttons = ["Received Feedbacks", "Manage Feedback"];

const activeButton = ref("Received Feedbacks");
const setActionButton = (button) => {
  activeButton.value = button;
};

const steamStatus = ref("default");
const dateTimeStatus = ref("default");
const course_id = ref(router.currentRoute.value.params.id);
const received_feedbacks = ref([]);

const toggleSteam = () => {
  if (steamStatus.value === "default") {
    steamStatus.value = "ascending";
  } else if (steamStatus.value === "ascending") {
    steamStatus.value = "descending";
  } else {
    steamStatus.value = "default";
  }
};

const toggleDateTime = () => {
  if (dateTimeStatus.value === "default") {
    dateTimeStatus.value = "ascending";
  } else if (dateTimeStatus.value === "ascending") {
    dateTimeStatus.value = "descending";
  } else {
    dateTimeStatus.value = "default";
  }
};

const steamStatusClass = computed(() => {
  return steamStatus.value === "default"
    ? "bg-white text-black-primary"
    : " bg-black-primary text-white";
});

const dateTimeStatusClass = computed(() => {
  return dateTimeStatus.value === "default"
    ? "bg-white text-black-primary"
    : " bg-black-primary text-white";
});

const newFeedback = ref({
  courseId: "",
  courseName: "",
  message: "",
  sender: "Cosebane",
  date: new Date().toISOString().slice(0, 16),
});

const feedback = (course) => {
  newFeedback.value.courseId = course.code;
  newFeedback.value.courseName = course.name;
};

const addFeedback = () => {
  if (
    newFeedback.value.courseId &&
    newFeedback.value.courseName &&
    newFeedback.value.message
  ) {
    feedbacks.value.push({ ...newFeedback.value, id: Date.now().toString() });
    newFeedback.value = {
      courseId: "",
      courseName: "",
      message: "",
      sender: "Cosebane",
      date: new Date().toISOString().slice(0, 16),
    };
  }
};

onMounted(() => {
  fetchReceivedFeedbacks(received_feedbacks, course_id.value);
});
</script>

<style lang="scss" scoped>
.scrollbar-set {
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
}
</style>

<template>
  <div class="flex flex-col">
    <div class="flex items-center gap-4 flex-row">
      <div class="flex items-center gap-4 flex-row justify-between w-full">
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
        <div class="flex flex-row gap-4">
          <div
            class="flex items-center flex-row justify-center border border-grey-secondary rounded-xl px-4 py-2 gap-2 bg-grey-tertiary"
          >
            <p class="text-sm text-grey-primary">Total :</p>
            <p class="text-sm text-black-primary font-semibold">
              <span class="font-semibold text-black-primary">{{
                totalFeedbacks
              }}</span>
              Feedbacks
            </p>
          </div>
          <SendButton
            class="flex items-center flex-row justify-center border border-grey-secondary rounded-xl px-4 py-2 gap-2 hover:bg-black-primary hover:text-white transition-all duration-300"
            @click="onClickSendFeedback"
          >
            <span class="font-semibold text-base">Send Feedback</span>
          </SendButton>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-2 grid-flex-media gap-4 mt-4">
      <div
        class="text-black-primary text-sm pb-2 border-b border-grey-secondary font-medium"
      >
        Your feedbacks sent from this course
      </div>
      <div
        class="text-black-primary text-sm pb-2 border-b border-grey-secondary font-medium"
      >
        Other sent from this course
      </div>
    </div>
    <div class="grid grid-cols-2 grid-flex-media gap-4 mt-4">
      <!-- Your Feedbacks Section -->
      <div
        class="flex-col flex gap-4 max-h-[calc(100vh-415px)] overflow-y-scroll scrollbar-set"
      >
        <div
          v-for="feedback in sortedFeedbacks"
          :key="feedback.id"
          class="bg-white border border-grey-tertiary shadow-sm rounded-xl p-3 mb-4"
        >
          <div
            class="flex flex-row gap-4 bg-grey-tertiary rounded-xl p-3 items-center justify-between"
          >
            <div class="flex flex-row gap-4 items-center">
              <div
                class="text-sm flex flex-row gap-2 items-center rounded-lg px-2 py-1"
                :class="
                  feedback.stream_type === 'UPSTREAM'
                    ? 'bg-yellow-primary text-black-primary'
                    : 'bg-orange-primary text-white'
                "
              >
                <span v-if="feedback.stream_type === 'UPSTREAM'">
                  <ArrowUp class="w-4 h-4" />
                </span>
                <span v-else-if="feedback.stream_type === 'DOWNSTREAM'">
                  <ArrowDown class="w-4 h-4" />
                </span>
                {{
                  feedback.stream_type === "UPSTREAM"
                    ? "Upstream"
                    : "Downstream"
                }}
              </div>
              <p class="text-sm font-semibold">
                {{ feedback.from_course.code }} -
                {{ feedback.from_course.name }}
              </p>
            </div>
            <div>
              <p class="text-sm text-grey-primary text-end">
                {{ feedback.from_course.semester.semester_sequence }} /
                {{ feedback.from_course.semester.year }}
              </p>
            </div>
          </div>

          <p
            class="text-sm p-3 my-3 text-center text-black-primary border border-grey-secondary rounded-lg"
          >
            "{{ feedback.comment }}"
          </p>
          <div class="flex flex-row gap-4 items-center justify-between">
            <div>
              <p class="text-sm text-grey-primary">
                From:
                {{ feedback.user.title_en_short }}
                {{ feedback.user.first_name_en }}
                {{ feedback.user.last_name_en }}
              </p>
              <p class="text-sm text-grey-primary">
                {{ formatBangkokTime(feedback.created_at) }}
              </p>
            </div>
            <button
              @click="deleteFeedback(feedback.id)"
              class="flex items-center justify-center rounded-xl p-2 border hover:bg-red-500 hover:text-white"
            >
              <Delete class="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <!-- Mockup for Other Feedbacks Section -->
      <div
        class="flex-col flex gap-4 max-h-[calc(100vh-415px)] overflow-y-scroll scrollbar-set"
      >
        <div
          v-for="feedback in mockOtherFeedbacks"
          :key="feedback.id"
          class="bg-white border border-grey-tertiary shadow-sm rounded-xl p-3 mb-4"
        >
          <div
            class="flex flex-row gap-4 bg-grey-tertiary rounded-xl p-3 items-center justify-between"
          >
            <div class="flex flex-row gap-4 items-center">
              <div
                class="text-sm flex flex-row gap-2 items-center rounded-lg px-2 py-1"
                :class="
                  feedback.stream_type === 'UPSTREAM'
                    ? 'bg-yellow-primary text-black-primary'
                    : 'bg-orange-primary text-white'
                "
              >
                <span v-if="feedback.stream_type === 'UPSTREAM'">
                  <ArrowUp class="w-4 h-4" />
                </span>
                <span v-else-if="feedback.stream_type === 'DOWNSTREAM'">
                  <ArrowDown class="w-4 h-4" />
                </span>
                {{
                  feedback.stream_type === "UPSTREAM"
                    ? "Upstream"
                    : "Downstream"
                }}
              </div>
              <p class="text-sm font-semibold">
                {{ feedback.from_course.code }} -
                {{ feedback.from_course.name }}
              </p>
            </div>
            <div>
              <p class="text-sm text-grey-primary text-end">
                {{ feedback.from_course.semester.semester_sequence }} /
                {{ feedback.from_course.semester.year }}
              </p>
            </div>
          </div>

          <p
            class="text-sm p-3 my-3 text-center text-black-primary border border-grey-secondary rounded-lg"
          >
            "{{ feedback.comment }}"
          </p>

          <p class="text-sm text-grey-primary">
            From:
            {{ feedback.user.title_en_short }}
            {{ feedback.user.first_name_en }}
            {{ feedback.user.last_name_en }}
          </p>
          <p class="text-sm text-grey-primary">
            {{ formatBangkokTime(feedback.created_at) }}
          </p>
        </div>
      </div>
    </div>
  </div>
  <sendFeedback
    v-if="showSendFeedbackPopup"
    :id="id"
    :course="course"
    @close="showSendFeedbackPopup = false"
    @submit-feedback="updatedFeedbacks"
  />
</template>

<script setup>
import { ref, computed } from "vue";
import Status from "@/components/icons/Status.vue";
import ArrowUp from "@/components/icons/ArrowUp.vue";
import ArrowDown from "@/components/icons/ArrowDown.vue";
import { useI18n } from "vue-i18n";
import Delete from "@/components/icons/Delete.vue";
import SendButton from "@/components/button/SendButton.vue";
import SendFeedback from "@/components/popups/SendFeedback.vue";
import { useRouter, useRoute } from "vue-router";
import { onMounted } from "vue";
import { fetchSentFeedbacks, BaseURL } from "~/api/api";
import { useUserStore } from "@/store/user";

const userStore = useUserStore();
const router = useRouter();
const route = useRoute();

const formatBangkokTime = (dateString) => {
  return new Intl.DateTimeFormat("en-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "Asia/Bangkok",
  }).format(new Date(dateString));
};

const { t } = useI18n();

useHead({
  title: t("seo.title"),
  description: t("seo.desc"),
});

definePageMeta({
  layout: "landing",
});

const steamStatus = ref("default");
const dateTimeStatus = ref("default");

const totalFeedbacks = computed(() => {
  return sendFeedbacks.value.length + mockOtherFeedbacks.value.length;
});

const id = ref(router.currentRoute.value.params.id);
const course = ref(route.query.code);

const showSendFeedbackPopup = ref(false);
const onClickSendFeedback = () => {
  id.value = router.currentRoute.value.params.id;
  course.value = route.query.code;
  showSendFeedbackPopup.value = true;
};

const sendFeedbacks = ref([]);
const mockOtherFeedbacks = ref([]);

const sortedFeedbacks = computed(() => {
  return [...sendFeedbacks.value].sort((a, b) => {
    // Sort by stream_type if steamStatus is not "default"
    if (steamStatus.value !== "default") {
      const streamComparison =
        steamStatus.value === "ascending"
          ? a.stream_type.localeCompare(b.stream_type)
          : b.stream_type.localeCompare(a.stream_type);

      if (streamComparison !== 0) {
        return streamComparison;
      }
    }

    // Sort by created_at if dateTimeStatus is not "default"
    if (dateTimeStatus.value !== "default") {
      const dateComparison =
        dateTimeStatus.value === "ascending"
          ? new Date(a.created_at) - new Date(b.created_at)
          : new Date(b.created_at) - new Date(a.created_at);

      if (dateComparison !== 0) {
        return dateComparison;
      }
    }

    return 0; // If both criteria are equal
  });
});

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

const splitFeedbacks = () => {
  mockOtherFeedbacks.value = sendFeedbacks.value.filter(
    (feedback) => feedback.user.id != userStore.userData.id
  );
  sendFeedbacks.value = sendFeedbacks.value.filter(
    (feedback) => feedback.user.id == userStore.userData.id
  );
};

const updatedFeedbacks = async () => {
  await fetchSentFeedbacks(sendFeedbacks, id.value);
  splitFeedbacks();
};

const deleteFeedback = async (feedbackId) => {
  try {
    const response = await fetch(BaseURL + "course-streams/" + feedbackId, {
      credentials: "include",
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) throw new Error("Failed to delete feedback");
    await updatedFeedbacks();
  } catch (error) {
    console.error(error);
  }
};

onMounted(async () => {
  await fetchSentFeedbacks(sendFeedbacks, id.value);
  splitFeedbacks();
});
</script>

<style lang="scss" scoped>
.scrollbar-set {
  scrollbar-width: thin;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 10px;
    border: 2px solid #f1f1f1;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
}
</style>

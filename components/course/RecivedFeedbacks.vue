<template>
  <div class="flex flex-col">
    <div class="flex items-center gap-4 flex-row">
      <div class="flex flex-row gap-4 w-full">
        <!-- <button
          @click="toggleSteam"
          :class="[ 
            'flex items-center flex-row justify-center border border-grey-secondary rounded-xl px-4 py-3 gap-2 transition-all duration-300',
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
        </button> -->
        <div
          class="flex items-center flex-row justify-center border border-grey-secondary rounded-xl px-4 py-2 gap-2 bg-grey-tertiary"
        >
          <p class="text-sm text-grey-primary">Total :</p>
          <p class="text-sm text-black-primary font-semibold">
            <span class="font-semibold text-black-primary">{{
              downstreamFeedbacks.length + upstreamFeedbacks.length
            }}</span>
            Feedbacks
          </p>
        </div>
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

    <div
      class="grid grid-cols-2 gap-4 mt-4 max-h-[calc(100vh-370px)] overflow-y-scroll scrollbar-set"
    >
      <!-- Downstream Feedbacks -->
      <div>
        <div
          v-for="feedback in downstreamFeedbacks"
          :key="feedback.id"
          class="bg-white border border-grey-tertiary shadow-sm rounded-xl p-3 mb-4"
        >
          <div
            class="flex flex-row gap-4 bg-grey-tertiary rounded-xl p-3 items-center justify-between"
          >
            <div class="flex flex-row gap-4 items-center">
              <div
                class="text-sm flex flex-row gap-2 items-center rounded-lg px-2 py-1 bg-orange-primary text-white"
              >
                <ArrowDown class="w-4 h-4" />
                Downstream
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

      <!-- Upstream Feedbacks -->
      <div>
        <div
          v-for="feedback in upstreamFeedbacks"
          :key="feedback.id"
          class="bg-white border border-grey-tertiary shadow-sm rounded-xl p-3 mb-4"
        >
          <div
            class="flex flex-row gap-4 bg-grey-tertiary rounded-xl p-3 items-center justify-between"
          >
            <div class="flex flex-row gap-4 items-center">
              <div
                class="text-sm flex flex-row gap-2 items-center rounded-lg px-2 py-1 bg-yellow-primary text-black-primary"
              >
                <ArrowUp class="w-4 h-4" />
                Upstream
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
</template>

<script setup>
import { ref, computed } from "vue";
import Status from "@/components/icons/Status.vue";
import ArrowUp from "@/components/icons/ArrowUp.vue";
import ArrowDown from "@/components/icons/ArrowDown.vue";
import { useI18n } from "vue-i18n";
import { fetchReceivedFeedbacks } from "~/api/api";
import { useRouter } from "vue-router";

const router = useRouter();

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

const receivedFeedbacks = ref([
  {
    id: "1",
    stream_type: "UPSTREAM",
    comment: "This is a sample comment",
    created_at: "2025-04-05T07:59:50.856Z",
    user: {
      title_en_short: "Assoc. Prof.",
      first_name_en: "Somchai",
      last_name_en: "Thongdee",
    },
    from_course: {
      code: "CPE101",
      name: "Introduction to Programming I",
      semester: {
        year: 2024,
        semester_sequence: "1",
      },
    },
  },
  {
    id: "2",
    stream_type: "DOWNSTREAM",
    comment: "Another feedback comment",
    created_at: "2025-04-04T10:30:00.000Z",
    user: {
      title_en_short: "Dr.",
      first_name_en: "Jane",
      last_name_en: "Doe",
    },
    from_course: {
      code: "CPE102",
      name: "Introduction to Programming II",
      semester: {
        year: 2024,
        semester_sequence: "1",
      },
    },
  },
]);

const sortedFeedbacks = computed(() => {
  let feedbacks = [...receivedFeedbacks.value];

  if (steamStatus.value === "ascending") {
    feedbacks.sort((a, b) => {
      if (a.stream_type < b.stream_type) return -1;
      if (a.stream_type > b.stream_type) return 1;
      return 0;
    });
  } else if (steamStatus.value === "descending") {
    feedbacks.sort((a, b) => {
      if (a.stream_type > b.stream_type) return -1;
      if (a.stream_type < b.stream_type) return 1;
      return 0;
    });
  }

  if (dateTimeStatus.value === "ascending") {
    feedbacks.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
  } else if (dateTimeStatus.value === "descending") {
    feedbacks.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }

  return feedbacks;
});

const downstreamFeedbacks = computed(() =>
  sortedFeedbacks.value.filter(
    (feedback) => feedback.stream_type === "DOWNSTREAM"
  )
);

const upstreamFeedbacks = computed(() =>
  sortedFeedbacks.value.filter(
    (feedback) => feedback.stream_type === "UPSTREAM"
  )
);

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

onMounted(async () => {
  await fetchReceivedFeedbacks(
    receivedFeedbacks,
    router.currentRoute.value.params.id
  );
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

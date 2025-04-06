<template>
  <teleport to="body">
    <div
      class="w-full h-full fixed inset-0 flex items-center justify-center bg-black-primary bg-opacity-50 z-50"
    >
      <div
        class="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center border border-grey-secondary"
      >
        <div
          class="flex flex-col w-[28rem] pb-2 border-b border-grey-secondary"
        >
          <div
            class="text-2xl font-semibold text-black-primary w-full text-start"
          >
            Send Feedback
          </div>
          <div class="text-sm text-grey-primary mt-1">
            Provide your feedback for
            <span class="font-semibold text-black-primary">{{ course }}</span>
          </div>
        </div>
        <form
          class="mt-4 text-center flex gap-4 flex-col text-sm w-[28rem]"
          @submit.prevent="submitFeedback"
        >
          <div class="flex flex-col items-start w-full gap-2">
            <label for="course" class="font-semibold text-black-primary">
              Course
            </label>
            <div class="relative w-full">
              <div v-if="selectedCourse">
                <div
                  class="flex items-center justify-between w-full px-4 py-2 border border-grey-secondary rounded-xl text-base"
                >
                  <span
                    >{{ selectedCourse.code }} - {{ selectedCourse.name }}</span
                  >
                  <button
                    @click="clearSelectedCourse"
                    class="flex items-center justify-center rounded-xl p-2 border hover:bg-red-500 hover:text-white"
                  >
                    <Delete class="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div v-else>
                <input
                  type="text"
                  id="courseSearch"
                  v-model="courseSearch"
                  placeholder="Search for a course..."
                  class="w-full px-4 py-2 border border-grey-secondary rounded-xl outline-none text-base"
                />
                <ul
                  v-if="filteredCourses.length"
                  class="absolute z-10 bg-white border border-grey-secondary rounded-xl w-full mt-1 max-h-40 overflow-y-auto"
                >
                  <li
                    v-for="course in filteredCourses"
                    :key="course.code"
                    @click="selectCourse(course)"
                    class="px-4 py-2 hover:bg-grey-secondary hover:cursor-pointer"
                  >
                    {{ course.code }} - {{ course.name }}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div
            v-if="selectedCourse"
            class="flex flex-col items-start w-full gap-2"
          >
            <label for="semester" class="font-semibold text-black-primary">
              Semester
            </label>
            <div
              class="bg-transparent border border-grey-secondary rounded-xl text-base p-3 hover:cursor-pointer w-full"
            >
              <select
                id="semester"
                v-model="semester"
                class="w-full border-none outline-none hover:cursor-pointer"
              >
                <option value="" disabled>Select a semester</option>
                <option value="Spring">Spring</option>
                <option value="Summer">Summer</option>
                <option value="Fall">Fall</option>
                <option value="Winter">Winter</option>
              </select>
            </div>
          </div>

          <!-- Stream Type -->
          <div class="flex flex-col items-start w-full gap-2">
            <label for="streamType" class="font-semibold text-black-primary">
              Stream Type
            </label>
            <div
              class="bg-transparent border border-grey-secondary rounded-xl text-base p-3 hover:cursor-pointer w-full"
            >
              <select
                id="streamType"
                v-model="streamType"
                class="w-full border-none outline-none hover:cursor-pointer"
              >
                <option value="" disabled>Select a stream type</option>
                <option value="UPSTREAM">Upstream</option>
                <option value="DOWNSTREAM">Downstream</option>
              </select>
            </div>
          </div>

          <!-- Feedback -->
          <div class="flex flex-col items-start w-full gap-2">
            <label for="Feedback" class="font-semibold text-black-primary">
              Feedback
            </label>
            <textarea
              id="Feedback"
              v-model="Feedback"
              rows="4"
              class="w-full px-4 py-2 border border-grey-secondary rounded-xl outline-none text-base"
              placeholder="Write your feedback here..."
            ></textarea>
          </div>

          <!-- Buttons -->
          <div
            class="flex flex-row items-center justify-center gap-4 w-full mt-4 text-base"
          >
            <button
              type="submit"
              class="py-3 font-medium border border-grey-secondary text-black-primary rounded-xl w-full bg-yellow-primary hover:bg-black-primary hover:text-white"
            >
              Send Feedback
            </button>
            <button
              type="button"
              @click="$emit('close')"
              class="py-3 font-medium border border-grey-secondary text-black-primary rounded-xl w-full hover:bg-black-primary hover:text-white"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { ref, computed } from "vue";
import { defineProps, defineEmits } from "vue";
import Delete from "@/components/icons/Delete.vue";

const emit = defineEmits(["close", "submit-feedback"]);

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
});

const streamType = ref("");
const Feedback = ref("");
const selectedCourse = ref(null);
const semester = ref("");
const courseSearch = ref("");

const courses = ref([
  { code: "CS101", name: "Introduction to Computer Science" },
  { code: "MATH201", name: "Calculus II" },
  { code: "PHY301", name: "Physics for Engineers" },
  { code: "ENG102", name: "English Composition" },
]);

const filteredCourses = computed(() => {
  if (!courseSearch.value.trim()) {
    return [];
  }
  return courses.value.filter((course) =>
    `${course.code} - ${course.name}`
      .toLowerCase()
      .includes(courseSearch.value.toLowerCase())
  );
});

const selectCourse = (course) => {
  selectedCourse.value = course;
  courseSearch.value = `${course.code} - ${course.name}`;
};

const clearSelectedCourse = () => {
  selectedCourse.value = null;
  courseSearch.value = "";
};

const submitFeedback = () => {
  if (!selectedCourse.value) {
    alert("Please select a course.");
    return;
  }

  if (!semester.value) {
    alert("Please select a semester.");
    return;
  }

  if (!Feedback.value.trim()) {
    alert("Please enter a Feedback.");
    return;
  }

  if (!streamType.value) {
    alert("Please select a stream type.");
    return;
  }

  const feedbackData = {
    course_code: selectedCourse.value.code,
    course_name: selectedCourse.value.name,
    semester: semester.value,
    stream_type: streamType.value,
    Feedback: Feedback.value,
    date_time: new Date().toISOString(),
  };

  emit("submit-feedback", feedbackData);
  emit("close");

  // Reset fields
  streamType.value = "";
  Feedback.value = "";
  selectedCourse.value = null;
  semester.value = "";
  courseSearch.value = "";
};
</script>

<style scoped>
/* Add any necessary styles here */
</style>

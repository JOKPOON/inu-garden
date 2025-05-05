<template>
  <teleport to="body">
    <div
      v-if="!showAddSubSOPopup"
      class="w-full h-full fixed inset-0 flex items-center justify-center bg-black-primary bg-opacity-50 z-50"
    >
      <div
        class="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center border border-grey-secondary"
      >
        <div class="flex flex-col w-[32rem]">
          <div class="text-2xl font-semibold text-black-primary">Add SO</div>
          <div class="text-sm text-grey-primary mt-1">
            Add SO for
            <span class="font-semibold text-black-primary">{{ name }}</span>
          </div>
        </div>
        <div
          class="mt-4 text-center flex gap-4 flex-col text-sm max-h-[35vh] overflow-y-scroll scrollbar-set"
        >
          <div class="flex flex-col items-start w-full gap-2">
            <label class="font-semibold text-black-primary">SO Code</label>
            <input
              v-model="newSO.code"
              type="text"
              placeholder="SO Code"
              class="w-[32rem] px-4 py-2 border border-grey-secondary rounded-xl outline-none"
            />
          </div>
          <div class="flex flex-col items-start w-full gap-2">
            <label class="font-semibold text-black-primary"
              >Description (Eng)</label
            >
            <textarea
              v-model="newSO.description_eng"
              rows="3"
              placeholder="SO Description"
              class="w-[32rem] px-4 py-2 border border-grey-secondary rounded-xl outline-none"
            ></textarea>
          </div>
          <div class="flex flex-col items-start w-full gap-2">
            <label class="font-semibold text-black-primary"
              >Description (TH)</label
            >
            <textarea
              v-model="newSO.description_thai"
              rows="3"
              placeholder="SO Description (TH)"
              class="w-[32rem] px-4 py-2 border border-grey-secondary rounded-xl outline-none"
            ></textarea>
          </div>
          <div class="w-full flex flex-row gap-2 items-center -mt-2">
            <div class="w-full text-left">Expected Course Passing Rate (%)</div>
            <input
              v-model="newSO.expected_course_passing_percentage"
              class="border border-grey-tertiary rounded-xl p-3 outline-grey-tertiary w-12 text-center"
              type="number"
              placeholder="Expected Passing CLO"
            />
          </div>
        </div>
        <div class="h-[1px] w-full bg-grey-secondary"></div>
        <div class="w-[32rem] flex flex-col gap-2 pt-2">
          <div class="flex flex-row items-center justify-between px-4">
            <div class="font-semibold text-black-primary">Sub SO</div>
            <SmallAddButton
              @click="addSubSO"
              class="flex items-center flex-row justify-center border border-grey-secondary rounded-xl px-3 py-2 gap-2"
            >
              <span class="text-black-primary font-semibold text-base"
                >Add</span
              >
            </SmallAddButton>
          </div>
          <div class="h-[1px] w-full bg-grey-secondary"></div>
          <div class="max-h-[180px] overflow-y-scroll scrollbar-set text-sm">
            <table
              class="min-w-full divide-y border border-grey-secondary rounded-xl"
            >
              <thead class="divide-x border-grey-secondary">
                <tr>
                  <th
                    scope="col"
                    class="px-6 py-3 text-center font-semibold text-grey-primary border-r border-grey-secondary"
                  >
                    Code
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-center font-semibold text-grey-primary border-r border-grey-secondary"
                  >
                    Description
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-center font-semibold text-grey-primary"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y border-grey-secondary">
                <tr v-for="subSO in subSOs" :key="subSO.id">
                  <td
                    class="px-6 py-4 whitespace-nowrap text-sm font-medium border-r border-grey-secondary"
                  >
                    {{ subSO.code }}
                  </td>
                  <td class="px-6 py-4 border-r border-grey-secondary">
                    <div class="w-full flex flex-col gap-2">
                      <div v-if="!subSO.editMode">
                        {{ subSO.description_thai }}
                      </div>
                      <textarea
                        v-else
                        v-model="subSO.description_thai"
                        rows="4"
                        class="w-full p-2 border border-grey-secondary rounded-xl outline-none"
                      ></textarea>
                      <div v-if="!subSO.editMode">
                        {{ subSO.description_eng }}
                      </div>
                      <textarea
                        v-else
                        v-model="subSO.description_eng"
                        rows="4"
                        class="w-full p-2 border border-grey-secondary rounded-xl outline-none"
                      ></textarea>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div
                      class="flex flex-col gap-2 items-center justify-center"
                    >
                      <button
                        @click="toggleEditMode(subSO)"
                        class="flex items-center justify-center bg-white rounded-xl p-2 border border-grey-secondary hover:bg-black-primary text-black-primary hover:text-white"
                      >
                        <Edit class="w-5 h-5" />
                      </button>
                      <button
                        @click="deleteSubSO(subSO.code)"
                        class="flex items-center justify-center bg-white rounded-xl p-2 border border-grey-secondary hover:bg-red-500 text-black-primary hover:text-white"
                      >
                        <Delete class="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
                <tr v-if="!subSOs.length">
                  <td
                    colspan="3"
                    class="px-6 py-4 whitespace-nowrap text-sm font-medium border-r border-grey-secondary text-center"
                  >
                    No Data
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div
          class="flex flex-row items-center justify-center gap-4 w-full mt-4"
        >
          <button
            @click="addSO"
            class="py-2 font-medium border border-grey-secondary text-black-primary rounded-xl w-full bg-yellow-primary hover:bg-black-primary hover:text-white"
          >
            Add
          </button>
          <button
            @click="$emit('close')"
            class="py-2 font-medium border border-grey-secondary text-black-primary rounded-xl w-full hover:bg-black-primary hover:text-white"
          >
            Close
          </button>
        </div>
      </div>
    </div>
    <AddSubSO
      v-if="showAddSubSOPopup"
      :id="id"
      :name="SOName"
      :subSOs="subSOs"
      @close="showAddSubSOPopup = false"
    />
  </teleport>
</template>

<script setup>
import { ref } from "vue";
import { defineProps, defineEmits } from "vue";
import { useRouter } from "vue-router";
import Edit from "@/components/icons/Edit.vue";
import Delete from "@/components/icons/Delete.vue";
import SmallAddButton from "@/components/button/SmallAddButton.vue";
import AddSubSO from "@/components/popups/AddSubSO.vue";
import { BaseURL } from "~/api/api";

const router = useRouter();

const showAddSubSOPopup = ref(false);

const SOName = ref("");
const id = ref("");
const SOid = ref("");

const addSubSO = () => {
  id.value = router.currentRoute.value.params.id;
  SOid.value = "SO1";
  SOName.value = "Computer Engineering (Regular) year 2565";
  showAddSubSOPopup.value = true;
};

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  SOs: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["close", "add"]);

const newSO = ref({
  code: "",
  description_thai: "",
  description_eng: "",
  expected_course_passing_percentage: 50,
  program_id: "",
});

const subSOs = ref([]);

const addSO = async () => {
  emit("add", newSO.value);
  try {
    newSO.value.program_id = props.id;
    newSO.value.sub_student_outcomes = subSOs.value;
    const response = await fetch(`${BaseURL}sos`, {
      credentials: "include",
      method: "POST",
      body: JSON.stringify({
        student_outcomes: [newSO.value],
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) throw new Error("Failed to create PLO");
    props.SOs.push(newSO.value);
  } catch (error) {
    console.error(error);
  }
  emit("close");
};

const toggleEditMode = (subSO) => {
  subSO.editMode = !subSO.editMode;
};

const deleteSubSO = (code) => {
  subSOs.value = subSOs.value.filter((subSO) => subSO.code !== code);
};
</script>

<style scoped>
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

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}
</style>

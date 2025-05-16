<template>
  <div class="p-4 flex flex-col gap-4">
    <div
      class="text-base font-semibold w-full pb-2 border-b border-grey-secondary"
    >
      4. Continuous Development
    </div>
    <div class="flex flex-row">
      <button
        v-for="(menu, index) in menus"
        :key="index"
        @click="activeMenu = menu"
        class="text-left px-4 py-2 rounded-lg border border-grey-secondary"
        :class="{ 'bg-black-primary text-white': activeMenu === menu }"
      >
        {{ menu }}
      </button>
    </div>

    <!-- Plan Section -->
    <div
      v-if="activeMenu === 'Plan'"
      class="max-h-[calc(100vh-470px)] scrollbar-set overflow-y-scroll"
    >
      <div class="font-semibold mb-2">4.1 Plan</div>
      <ul class="list-disc pl-6 w-full">
        <li
          v-for="(plan, index) in Plans"
          :key="index"
          class="flex items-center w-full pt-2"
        >
          <div
            v-if="!editingIndex.includes(index)"
            class="flex items-center gap-2 flex-row justify-between w-full"
          >
            <div class="w-full">4.1.{{ index + 1 }} {{ plan }}</div>
            <div class="flex items-center gap-2 px-2">
              <button
                class="flex items-center justify-center bg-white rounded-xl p-2 border border-grey-secondary hover:bg-black-primary text-black-primary hover:text-white"
                @click="startEditing(index)"
              >
                <Edit class="w-5 h-5" />
              </button>

              <button
                class="flex items-center justify-center bg-white rounded-xl p-2 border border-grey-secondary hover:bg-red-500 text-black-primary hover:text-white"
                @click="deletePlan(index)"
              >
                <Delete class="w-5 h-5" />
              </button>
            </div>
          </div>
          <div v-else class="flex items-center gap-2 flex-row w-full pr-2">
            <textarea
              v-model="Plans[index]"
              class="border border-grey-secondary rounded-lg px-2 py-1 w-full"
              rows="2"
            ></textarea>
            <button
              class="flex items-center justify-center bg-white rounded-xl p-2 border border-grey-secondary hover:bg-black-primary text-black-primary hover:text-white"
              @click="stopEditing(index)"
            >
              <include class="w-5 h-5" />
            </button>
          </div>
        </li>
      </ul>
      <div class="mt-4">
        <div v-if="showAddInput" class="flex items-center gap-2 flex-row">
          <textarea
            v-model="newPlan"
            placeholder="Add new plan"
            class="border border-grey-secondary rounded-lg px-2 py-1 w-full"
            rows="2"
          ></textarea>
          <button
            class="flex items-center justify-center bg-white rounded-xl p-2 border border-grey-secondary hover:bg-black-primary text-black-primary hover:text-white"
            @click="addPlan"
          >
            <include class="w-5 h-5" />
          </button>
        </div>
        <div v-else class="flex items-center justify-center w-full">
          <SmallAddButton
            @click="showAddInput = true"
            class="flex items-center flex-row justify-center border border-grey-secondary rounded-xl px-3 py-2 gap-2"
          >
            <span class="text-black-primary font-semibold text-base">
              Add plan
            </span>
          </SmallAddButton>
        </div>
      </div>
    </div>

    <!-- Do & Check Section -->
    <div
      v-else-if="activeMenu === 'Do & Check'"
      class="max-h-[calc(100vh-470px)] scrollbar-set overflow-y-scroll"
    >
      <div class="font-semibold mb-2">4.2 Do & Check</div>
      <ul class="list-disc pl-6 w-full">
        <li
          v-for="(doCheck, index) in DoChecks"
          :key="index"
          class="flex items-center w-full pt-2"
        >
          <div
            v-if="!editingIndex.includes(index)"
            class="flex items-center gap-2 flex-row justify-between w-full"
          >
            <div class="w-full">4.2.{{ index + 1 }} {{ doCheck }}</div>
            <div class="flex items-center gap-2 px-2">
              <button
                class="flex items-center justify-center bg-white rounded-xl p-2 border border-grey-secondary hover:bg-black-primary text-black-primary hover:text-white"
                @click="startEditing(index)"
              >
                <Edit class="w-5 h-5" />
              </button>

              <button
                class="flex items-center justify-center bg-white rounded-xl p-2 border border-grey-secondary hover:bg-red-500 text-black-primary hover:text-white"
                @click="deleteDoCheck(index)"
              >
                <Delete class="w-5 h-5" />
              </button>
            </div>
          </div>
          <div v-else class="flex items-center gap-2 flex-row w-full pr-2">
            <textarea
              v-model="DoChecks[index]"
              class="border border-grey-secondary rounded-lg px-2 py-1 w-full"
              rows="2"
            ></textarea>
            <button
              class="flex items-center justify-center bg-white rounded-xl p-2 border border-grey-secondary hover:bg-black-primary text-black-primary hover:text-white"
              @click="stopEditing(index)"
            >
              <include class="w-5 h-5" />
            </button>
          </div>
        </li>
      </ul>
      <div class="mt-4">
        <div v-if="showAddInput" class="flex items-center gap-2 flex-row">
          <textarea
            v-model="newDoCheck"
            placeholder="Add new Do & Check"
            class="border border-grey-secondary rounded-lg px-2 py-1 w-full"
            rows="2"
          ></textarea>
          <button
            class="flex items-center justify-center bg-white rounded-xl p-2 border border-grey-secondary hover:bg-black-primary text-black-primary hover:text-white"
            @click="addDoCheck"
          >
            <include class="w-5 h-5" />
          </button>
        </div>
        <div v-else class="flex items-center justify-center w-full">
          <SmallAddButton
            @click="showAddInput = true"
            class="flex items-center flex-row justify-center border border-grey-secondary rounded-xl px-3 py-2 gap-2"
          >
            <span class="text-black-primary font-semibold text-base">
              Add Do & Check
            </span>
          </SmallAddButton>
        </div>
      </div>
    </div>

    <!-- Act Section -->
    <div
      v-else-if="activeMenu === 'Act'"
      class="max-h-[calc(100vh-470px)] scrollbar-set overflow-y-scroll"
    >
      <div class="font-semibold mb-2">4.3 Act</div>
      <ul class="list-disc pl-6 w-full">
        <li
          v-for="(act, index) in Acts"
          :key="index"
          class="flex items-center w-full pt-2"
        >
          <div
            v-if="!editingIndex.includes(index)"
            class="flex items-center gap-2 flex-row justify-between w-full"
          >
            <div class="w-full">4.3.{{ index + 1 }} {{ act }}</div>
            <div class="flex items-center gap-2 px-2">
              <button
                class="flex items-center justify-center bg-white rounded-xl p-2 border border-grey-secondary hover:bg-black-primary text-black-primary hover:text-white"
                @click="startEditing(index)"
              >
                <Edit class="w-5 h-5" />
              </button>

              <button
                class="flex items-center justify-center bg-white rounded-xl p-2 border border-grey-secondary hover:bg-red-500 text-black-primary hover:text-white"
                @click="deleteAct(index)"
              >
                <Delete class="w-5 h-5" />
              </button>
            </div>
          </div>
          <div v-else class="flex items-center gap-2 flex-row w-full pr-2">
            <textarea
              v-model="Acts[index]"
              class="border border-grey-secondary rounded-lg px-2 py-1 w-full"
              rows="2"
            ></textarea>
            <button
              class="flex items-center justify-center bg-white rounded-xl p-2 border border-grey-secondary hover:bg-black-primary text-black-primary hover:text-white"
              @click="stopEditing(index)"
            >
              <include class="w-5 h-5" />
            </button>
          </div>
        </li>
      </ul>
      <div class="mt-4">
        <div v-if="showAddInput" class="flex items-center gap-2 flex-row">
          <textarea
            v-model="newAct"
            placeholder="Add new Act"
            class="border border-grey-secondary rounded-lg px-2 py-1 w-full"
            rows="2"
          ></textarea>
          <button
            class="flex items-center justify-center bg-white rounded-xl p-2 border border-grey-secondary hover:bg-black-primary text-black-primary hover:text-white"
            @click="addAct"
          >
            <include class="w-5 h-5" />
          </button>
        </div>
        <div v-else class="flex items-center justify-center w-full">
          <SmallAddButton
            @click="showAddInput = true"
            class="flex items-center flex-row justify-center border border-grey-secondary rounded-xl px-3 py-2 gap-2"
          >
            <span class="text-black-primary font-semibold text-base">
              Add Act
            </span>
          </SmallAddButton>
        </div>
      </div>
    </div>
    <div
      v-else-if="activeMenu === 'Feedback'"
      class="max-h-[calc(100vh-470px)] scrollbar-set overflow-y-scroll"
    >
      <RecivedFeedbacks />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Delete from "@/components/icons/Delete.vue";
import Edit from "@/components/icons/Edit.vue";
import include from "@/components/icons/Include.vue";
import RecivedFeedbacks from "@/components/course/RecivedFeedbacks.vue";
import SmallAddButton from "@/components/button/SmallAddButton.vue";
import { usePortfolioStore } from "~/store/usePortfolioStore";
const store = usePortfolioStore();

const menus = ["Plan", "Do & Check", "Act", "Feedback"];
const activeMenu = ref("Plan");

const Plans = ref([]);
const DoChecks = ref([]);
const Acts = ref([]);

const newPlan = ref("");
const newDoCheck = ref("");
const newAct = ref("");

const editingIndex = ref([]);
const showAddInput = ref(false);

const startEditing = (index) => {
  editingIndex.value.push(index);
};
const stopEditing = (index) => {
  editingIndex.value = editingIndex.value.filter((i) => i !== index);
};

const addPlan = () => {
  if (newPlan.value.trim()) {
    Plans.value.push(newPlan.value.trim());
    newPlan.value = "";
    showAddInput.value = false;
  }
  if (Plans.value.length > 0) {
    store.setPlans(Plans.value);
  }
};

const addDoCheck = () => {
  if (newDoCheck.value.trim()) {
    DoChecks.value.push(newDoCheck.value.trim());
    newDoCheck.value = "";
    showAddInput.value = false;
  }
  if (DoChecks.value.length > 0) {
    store.setDoAndChecks(DoChecks.value);
  }
};

const addAct = () => {
  if (newAct.value.trim()) {
    Acts.value.push(newAct.value.trim());
    newAct.value = "";
    showAddInput.value = false;
  }
  if (Acts.value.length > 0) {
    store.setActs(Acts.value);
  }
};

const deletePlan = (index) => {
  Plans.value.splice(index, 1);
};

const deleteDoCheck = (index) => {
  DoChecks.value.splice(index, 1);
};

const deleteAct = (index) => {
  Acts.value.splice(index, 1);
};

onMounted(() => {
  Plans.value = store.continuousDevelopment.plans || [];
  DoChecks.value = store.continuousDevelopment.do_and_checks || [];
  Acts.value = store.continuousDevelopment.acts || [];
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

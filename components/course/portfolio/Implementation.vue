<template>
  <div class="p-4 flex flex-col gap-4">
    <div
      class="text-base font-semibold w-full pb-2 border-b border-grey-secondary"
    >
      2. Implementations
    </div>
    <div class="flex flex-row">
      <button
        v-for="(menu, index) in menus"
        :key="index"
        @click="activeMenu = menu"
        class="text-left px-4 py-2 rounded-lg border border-grey-secondary "
        :class="{ 'bg-black-primary text-white': activeMenu === menu }"
      >
        {{ menu }}
      </button>
    </div>
    <div>
      <!-- Methods Section -->
      <div v-if="activeMenu === 'Methods'" class="max-h-[calc(100vh-470px)] scrollbar-set overflow-y-scroll">
        <div class="font-semibold mb-2">2.1 Methods</div>
        <ul class="list-disc pl-6 w-full">
          <li
            v-for="(method, index) in methods"
            :key="index"
            class="flex items-center w-full pt-2"
          >
            <div
              v-if="!editingIndex.includes(index)"
              class="flex items-center gap-2 flex-row justify-between w-full"
            >
              <div class="w-full">{{ method }}</div>
              <div class="flex items-center gap-2 px-2">
                <button
                  class="flex items-center justify-center bg-white rounded-xl p-2 border border-grey-secondary hover:bg-black-primary text-black-primary hover:text-white"
                  @click="startEditing(index)"
                >
                  <Edit class="w-5 h-5" />
                </button>

                <button
                  class="flex items-center justify-center bg-white rounded-xl p-2 border border-grey-secondary hover:bg-red-500 text-black-primary hover:text-white"
                  @click="deleteMethod(index)"
                >
                  <Delete class="w-5 h-5" />
                </button>
              </div>
            </div>
            <div v-else class="flex items-center gap-2 flex-row w-full pr-2">
              <textarea
                v-model="methods[index]"
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
              v-model="newMethod"
              placeholder="Add new method"
              class="border border-grey-secondary rounded-lg px-2 py-1 w-full"
              rows="2"
            ></textarea>
            <button
              class="flex items-center justify-center bg-white rounded-xl p-2 border border-grey-secondary hover:bg-black-primary text-black-primary hover:text-white"
              @click="addMethod"
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
                Add Method
              </span>
            </SmallAddButton>
          </div>
        </div>
      </div>

      <!-- Online Media Section -->
      <div v-if="activeMenu === 'Online Media'" class="max-h-[calc(100vh-470px)] scrollbar-set overflow-y-scroll">
        <div class="font-semibold mb-2">2.2 Online Media</div>
        <ul class="list-disc pl-6 w-full">
          <li
            v-for="(media, index) in onlineMedia"
            :key="index"
            class="flex items-center w-full pt-2"
          >
            <div
              v-if="!editingIndex.includes(index)"
              class="flex items-center gap-2 flex-row justify-between w-full"
            >
              <div class="w-full">{{ media }}</div>
              <div class="flex items-center gap-2 px-2">
                <button
                  class="flex items-center justify-center bg-white rounded-xl p-2 border border-grey-secondary hover:bg-black-primary text-black-primary hover:text-white"
                  @click="startEditing(index)"
                >
                  <Edit class="w-5 h-5" />
                </button>

                <button
                  class="flex items-center justify-center bg-white rounded-xl p-2 border border-grey-secondary hover:bg-red-500 text-black-primary hover:text-white"
                  @click="deleteMedia(index)"
                >
                  <Delete class="w-5 h-5" />
                </button>
              </div>
            </div>
            <div v-else class="flex items-center gap-2 flex-row w-full pr-2">
              <textarea
                v-model="onlineMedia[index]"
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
              v-model="newMedia"
              placeholder="Add new media"
              class="border border-grey-secondary rounded-lg px-2 py-1 w-full"
              rows="2"
            ></textarea>
            <button
              class="flex items-center justify-center bg-white rounded-xl p-2 border border-grey-secondary hover:bg-black-primary text-black-primary hover:text-white"
              @click="addMedia"
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
                Add Media
              </span>
            </SmallAddButton>
          </div>
        </div>
      </div>

      <!-- Teaching Objective Section -->
      <div v-if="activeMenu === 'Teaching Objective'" class="max-h-[calc(100vh-470px)] scrollbar-set overflow-y-scroll">
        <div class="font-semibold mb-2">2.3 Teaching Objective</div>
        <ul class="list-disc pl-6 w-full">
          <li
            v-for="(objective, index) in teachingObjectives"
            :key="index"
            class="flex items-center w-full pt-2"
          >
            <div
              v-if="!editingIndex.includes(index)"
              class="flex items-center gap-2 flex-row justify-between w-full"
            >
              <div class="w-full">{{ objective }}</div>
              <div class="flex items-center gap-2 px-2">
                <button
                  class="flex items-center justify-center bg-white rounded-xl p-2 border border-grey-secondary hover:bg-black-primary text-black-primary hover:text-white"
                  @click="startEditing(index)"
                >
                  <Edit class="w-5 h-5" />
                </button>

                <button
                  class="flex items-center justify-center bg-white rounded-xl p-2 border border-grey-secondary hover:bg-red-500 text-black-primary hover:text-white"
                  @click="deleteObjective(index)"
                >
                  <Delete class="w-5 h-5" />
                </button>
              </div>
            </div>
            <div v-else class="flex items-center gap-2 flex-row w-full pr-2">
              <textarea
                v-model="teachingObjectives[index]"
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
              v-model="newObjective"
              placeholder="Add new objective"
              class="border border-grey-secondary rounded-lg px-2 py-1 w-full"
              rows="2"
            ></textarea>
            <button
              class="flex items-center justify-center bg-white rounded-xl p-2 border border-grey-secondary hover:bg-black-primary text-black-primary hover:text-white"
              @click="addObjective"
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
                Add Objective
              </span>
            </SmallAddButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Delete from "@/components/icons/Delete.vue";
import Edit from "@/components/icons/Edit.vue";
import include from "@/components/icons/Include.vue";
import SmallAddButton from "@/components/button/SmallAddButton.vue";

const menus = ["Methods", "Online Media", "Teaching Objective"];
const activeMenu = ref("Methods");

const methods = ref(["Method 1", "Method 2", "Method 3"]);
const onlineMedia = ref(["Media 1", "Media 2", "Media 3"]);
const teachingObjectives = ref(["Objective 1", "Objective 2", "Objective 3"]);

const newMethod = ref("");
const newMedia = ref("");
const newObjective = ref("");

const editingIndex = ref([]);
const showAddInput = ref(false);

const addMethod = () => {
  if (newMethod.value.trim()) {
    methods.value.push(newMethod.value.trim());
    newMethod.value = "";
    showAddInput.value = false;
  }
};

const addMedia = () => {
  if (newMedia.value.trim()) {
    onlineMedia.value.push(newMedia.value.trim());
    newMedia.value = "";
    showAddInput.value = false;
  }
};

const addObjective = () => {
  if (newObjective.value.trim()) {
    teachingObjectives.value.push(newObjective.value.trim());
    newObjective.value = "";
    showAddInput.value = false;
  }
};

const startEditing = (index) => {
  if (!editingIndex.value.includes(index)) {
    editingIndex.value.push(index);
  }
};

const stopEditing = (index) => {
  const idx = editingIndex.value.indexOf(index);
  if (idx !== -1) {
    editingIndex.value.splice(idx, 1);
  }
};

const deleteMethod = (index) => {
  methods.value.splice(index, 1);
};

const deleteMedia = (index) => {
  onlineMedia.value.splice(index, 1);
};

const deleteObjective = (index) => {
  teachingObjectives.value.splice(index, 1);
};
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
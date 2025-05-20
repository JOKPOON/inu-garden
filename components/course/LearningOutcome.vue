<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-row justify-between gap-6 items-center w-full">
      <div class="flex">
        <div
          class="px-4 py-3 bg-white border border-grey-secondary rounded-xl flex flex-row gap-4 items-center"
        >
          <input
            type="text"
            v-model="searchQuery"
            class="bg-transparent border-none focus:ring-0 outline-none text-base w-48"
            placeholder="Search..."
          />
          <button class="flex items-center justify-center bg-white rounded-xl">
            <Search class="w-6 h-6" />
          </button>
        </div>
      </div>
      <div class="flex flex-row gap-4">
        <TemplateButton
          @click="clickTemplate"
          class="flex items-center flex-row justify-center border border-grey-secondary rounded-xl px-4 py-3 gap-2"
        >
          <span class="text-black-primary font-semibold text-base"
            >Template</span
          >
        </TemplateButton>
        <Import
          @click="importFile"
          class="flex items-center flex-row justify-center border border-grey-secondary rounded-xl px-4 py-3 gap-2"
        >
          <span class="text-black-primary font-semibold text-base">Import</span>
        </Import>
        <ExportButton
          class="flex items-center flex-row justify-center border border-grey-secondary rounded-xl px-4 py-3 gap-2"
        >
          <span class="text-black-primary font-semibold text-base">Export</span>
        </ExportButton>
      </div>
    </div>

    <div
      class="flex h-[calc(100vh-310px)] border border-grey-secondary rounded-xl"
    >
      <div class="grid grid-cols-9 w-full h-full text-sm">
        <div class="col-span-1 h-full border-r">
          <div
            class="w-full flex items-center justify-center py-3 border-b border-grey-secondary font-semibold text-grey-primary"
          >
            Code
          </div>
          <div
            class="max-h-[calc(100vh-380px)] overflow-y-scroll scrollbar-set"
          >
            <button
              v-for="clo in clos"
              :key="clo.code"
              :class="{
                'bg-grey-secondary text-black-primary': selectedCLO === clo,
                'bg-white': selectedCLO !== clo,
              }"
              @click="selectCLO(clo)"
              class="w-full flex items-center justify-center py-3 border-b border-grey-secondary"
            >
              <div v-if="!editMode">
                {{ clo.code }}
              </div>
              <div
                v-if="editMode"
                class="text-start w-full flex items-center h-full border border-grey-primary p-3 rounded-xl mx-3"
              >
                <input
                  type="text"
                  class="bg-transparent focus:ring-0 outline-none w-full text-sm"
                  v-model="clo.code"
                />
              </div>
            </button>
          </div>
          <div class="w-full mt-4 flex items-center justify-center">
            <SmallAddButton
              @click="addCLO"
              class="flex items-center flex-row justify-center border border-grey-secondary rounded-xl px-3 py-2 gap-2"
            >
              <span class="text-black-primary font-semibold text-base"
                >Add</span
              >
            </SmallAddButton>
          </div>
        </div>
        <div class="col-span-1 h-full border-r">
          <div
            class="w-full flex items-center justify-center py-3 border-b border-grey-secondary font-semibold text-grey-primary"
          >
            CLO Type
          </div>
          <div
            class="max-h-[calc(100vh-380px)] overflow-y-scroll scrollbar-set"
          >
            <div
              v-if="selectedCLO != null"
              class="w-full flex items-center justify-center p-3 border-b border-grey-secondary"
            >
              <div
                v-if="!editMode && selectedCLO"
                :class="{
                  'bg-green-500': selectedCLO.type == 'CURRICULUM',
                  'bg-yellow-500': selectedCLO.type == 'MODIFIED',
                }"
                class="p-2 rounded-xl text-white"
              >
                <span v-if="selectedCLO.type === 'CURRICULUM'">Curriculum</span>
                <span v-else>Modified</span>
              </div>
              <div
                v-if="editMode && selectedCLO.type === 0"
                class="text-start w-full flex items-center h-full border border-grey-primary p-3 rounded-xl mx-3"
              >
                <select
                  v-model="selectedCLO.type"
                  class="w-full border-none outline-none hover:cursor-pointer"
                >
                  <option value="0">Curriculum</option>
                  <option value="1">Modified</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="col-span-7 h-full flex flex-col">
          <div
            class="w-full flex items-center justify-center py-3 border-b border-grey-secondary font-semibold text-grey-primary"
          >
            Detail of {{ selectedCLO?.name }}
          </div>
          <div class="grid grid-cols-2 w-full h-full">
            <div
              v-if="selectedCLO != null"
              class="col-span-1 h-full border-r max-h-[calc(100vh-380px)] overflow-y-scroll scrollbar-set"
            >
              <div
                class="w-full flex flex-col gap-2 py-3 border-b border-grey-secondary"
              >
                <div
                  class="flex justify-end w-full px-4 border-b border-grey-secondary pb-4"
                >
                  <SmallEditButton
                    v-if="!editMode"
                    @click="editLearningOutcome()"
                    class="flex items-center flex-row justify-center border border-grey-secondary rounded-xl px-3 py-2 gap-2"
                  >
                    <span class="text-black-primary font-semibold text-base"
                      >Edit</span
                    >
                  </SmallEditButton>
                  <SmallSaveButton
                    v-else
                    @click="saveLearningOutcome()"
                    class="flex items-center flex-row justify-center border border-grey-secondary rounded-xl px-3 py-2 gap-2"
                  >
                    <span class="text-black-primary font-semibold text-base"
                      >Save</span
                    >
                  </SmallSaveButton>
                  <button
                    @click="deleteCLO(selectedCLO.id)"
                    class="flex items-center flex-row justify-center border border-grey-secondary rounded-xl px-3 py-2 gap-2 ml-3 hover:bg-red-500 hover:text-white"
                  >
                    <Delete class="w-5 h-5" />
                  </button>
                </div>
                <div class="font-semibold text-black-primary px-4">
                  Description
                </div>
                <div v-if="selectedCLO" class="px-4">
                  <div v-if="!editMode">
                    {{ selectedCLO.description_th }}
                  </div>
                  <div v-else>
                    <textarea
                      v-model="selectedCLO.description_th"
                      class="w-full px-4 py-2 border border-grey-secondary rounded-xl outline-none text-sm"
                      rows="3"
                      placeholder="Description in Thai"
                    ></textarea>
                  </div>
                </div>
                <div v-if="selectedCLO" class="px-4">
                  <div v-if="!editMode">
                    {{ selectedCLO.description_en }}
                  </div>
                  <div v-else>
                    <textarea
                      v-model="selectedCLO.description_en"
                      class="w-full px-4 py-2 border border-grey-secondary rounded-xl outline-none text-sm"
                      rows="3"
                      placeholder="Description in English"
                    ></textarea>
                  </div>
                </div>
              </div>
              <div
                class="w-full flex flex-col gap-2 py-3 border-b border-grey-secondary"
              >
                <div class="flex flex-row gap-4 px-4 items-center">
                  <div class="font-semibold text-black-primary w-full">
                    Expected Passing Assessment
                  </div>
                  <div v-if="!editMode">
                    {{ selectedCLO.expected_passing_assignment_percentage }}%
                  </div>
                  <div v-if="editMode">
                    <input
                      v-model="
                        selectedCLO.expected_passing_assignment_percentage
                      "
                      type="number"
                      class="border border-grey-tertiary rounded-xl p-3 outline-grey-tertiary w-16 text-center"
                      placeholder="%"
                    />
                  </div>
                </div>
                <div class="flex flex-row gap-4 px-4 items-center">
                  <div class="font-semibold text-black-primary w-full">
                    Expected Passing Student
                  </div>
                  <div v-if="!editMode">
                    {{ selectedCLO.expected_passing_student_percentage }}%
                  </div>
                  <div v-if="editMode">
                    <input
                      v-model="selectedCLO.expected_passing_student_percentage"
                      type="number"
                      class="border border-grey-tertiary rounded-xl p-3 outline-grey-tertiary w-16 text-center"
                      placeholder="%"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div
              v-if="selectedCLO != null"
              class="col-span-1 h-full border-r py-3"
            >
              <div class="flex flex-row gap-4 px-4 justify-between">
                <div class="border border-grey-secondary rounded-xl mb-4 flex">
                  <button
                    v-for="button in buttons"
                    :key="button"
                    :class="[
                      'px-6 py-2 rounded-xl',
                      activeButton === button
                        ? 'bg-black-primary text-white'
                        : 'border border-grey-secondary text-base',
                    ]"
                    @click="setActionButton(button)"
                  >
                    {{ button }}
                  </button>
                </div>
                <div class="flex mb-4">
                  <SmallAddButton
                    @click="addSubCLO(activeButton)"
                    class="flex items-center flex-row justify-center border border-grey-secondary rounded-xl px-3 py-2 gap-2"
                  >
                    <span class="text-black-primary font-semibold text-base"
                      >Add</span
                    >
                  </SmallAddButton>
                </div>
              </div>
              <div
                :class="{
                  'grid grid-cols-5 ': editMode,
                  'grid grid-cols-4 ': !editMode,
                }"
                class="grid gap-4 border-y py-1 border-grey-tertiary px-4"
              >
                <div
                  class="col-span-1 text-sm w-full text-grey-primary font-medium"
                >
                  Code
                </div>
                <div
                  class="col-span-3 text-sm w-full text-grey-primary font-medium"
                >
                  Description
                </div>
                <div
                  v-if="editMode"
                  class="col-span-1 text-sm w-full text-grey-primary font-medium text-center"
                >
                  Action
                </div>
              </div>

              <div
                class="max-h-[calc(100vh-475px)] overflow-y-scroll scrollbar-set"
              >
                <div v-if="activeButton === 'PLO'">
                  <div
                    class="w-full flex flex-col gap-2 border-b border-grey-secondary"
                  >
                    <div
                      v-if="
                        selectedCLO && selectedCLO.program_learning_outcomes
                      "
                      v-for="(
                        plo, key
                      ) in selectedCLO.program_learning_outcomes"
                      :key="key"
                    >
                      <div
                        :class="{
                          'grid grid-cols-5 ': editMode,
                          'grid grid-cols-4 ': !editMode,
                        }"
                        class="gap-4 border-b border-grey-secondary px-4 py-3 bg-grey-tertiary"
                      >
                        <div class="col-span-1 text-sm w-full font-medium">
                          {{ plo.code }}
                        </div>
                        <div class="col-span-3 text-sm w-full">
                          <div class="flex flex-col gap-3">
                            <div>
                              {{ plo.description_thai }}
                            </div>
                            <div>
                              {{ plo.description_eng }}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        v-for="(splo, key) in plo.sub_program_learning_outcomes"
                        :key="key"
                      >
                        <div
                          :class="{
                            'grid grid-cols-5 ': editMode,
                            'grid grid-cols-4 ': !editMode,
                          }"
                          class="gap-4 border-b border-grey-tertiary px-4 py-3"
                        >
                          <div class="col-span-1 text-sm w-full font-medium">
                            <div>
                              {{ splo.code }}
                            </div>
                          </div>
                          <div class="col-span-3 text-sm w-full">
                            <div class="flex flex-col gap-3">
                              <div>
                                {{ splo.description_thai }}
                              </div>
                              <div>
                                {{ splo.description_eng }}
                              </div>
                            </div>
                          </div>
                          <div
                            class="col-span-1 flex items-center justify-center"
                          >
                            <button
                              v-if="editMode"
                              @click="deleteSubPLO(splo.id)"
                              class="flex items-center flex-row justify-center border border-grey-secondary rounded-xl px-3 py-2 gap-2 ml-3 hover:bg-red-500 hover:text-white"
                            >
                              <Delete class="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-else-if="activeButton === 'PO'">
                  <div
                    class="w-full flex flex-col gap-2 border-b border-grey-secondary"
                  >
                    <div
                      v-if="selectedCLO && selectedCLO.program_outcomes"
                      v-for="(po, key) in selectedCLO.program_outcomes"
                      :key="key"
                    >
                      <div
                        :class="{
                          'grid grid-cols-5 ': editMode,
                          'grid grid-cols-4 ': !editMode,
                        }"
                        class="gap-4 border-b border-grey-secondary px-4 py-3 bg-grey-tertiary"
                      >
                        <div class="col-span-1 text-sm w-full font-medium">
                          {{ po.code }}
                        </div>

                        <div class="col-span-3 text-sm w-full">
                          <div class="flex flex-col gap-3">
                            <div>
                              {{ po.description }}
                            </div>
                          </div>
                        </div>
                        <div
                          class="col-span-1 flex items-center justify-center"
                        >
                          <button
                            v-if="editMode"
                            @click="deletePO(po.id)"
                            class="flex items-center flex-row justify-center border bg-white border-grey-secondary rounded-xl px-3 py-2 gap-2 ml-3 hover:bg-red-500 hover:text-white"
                          >
                            <Delete class="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-else-if="activeButton === 'SO'">
                  <div
                    class="w-full flex flex-col gap-2 border-b border-grey-secondary"
                  >
                    <div
                      v-if="selectedCLO && selectedCLO.student_outcomes"
                      v-for="(so, key) in selectedCLO.student_outcomes"
                      :key="key"
                    >
                      <div
                        :class="{
                          'grid grid-cols-5 ': editMode,
                          'grid grid-cols-4 ': !editMode,
                        }"
                        class="gap-4 border-b border-grey-secondary px-4 py-3 bg-grey-tertiary"
                      >
                        <div class="col-span-1 text-sm w-full font-medium">
                          {{ so.code }}
                        </div>
                        <div class="col-span-3 text-sm w-full">
                          <div class="flex flex-col gap-3">
                            <div>
                              {{ so.description_thai }}
                            </div>

                            <div>
                              {{ so.description_eng }}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        v-for="(sso, key) in so.sub_student_outcomes"
                        :key="key"
                      >
                        <div
                          :class="{
                            'grid grid-cols-5 ': editMode,
                            'grid grid-cols-4 ': !editMode,
                          }"
                          class="gap-4 border-b border-grey-tertiary px-4 py-3"
                        >
                          <div class="col-span-1 text-sm w-full font-medium">
                            {{ sso.code }}
                          </div>
                          <div class="col-span-3 text-sm w-full">
                            <div class="flex flex-col gap-3">
                              <div>
                                {{ sso.description_thai }}
                              </div>

                              <div>
                                {{ sso.description_eng }}
                              </div>
                            </div>
                          </div>
                          <div
                            class="col-span-1 flex items-center justify-center"
                          >
                            <button
                              v-if="editMode"
                              @click="deleteSubSO(sso.id)"
                              class="flex items-center flex-row justify-center border border-grey-secondary rounded-xl px-3 py-2 gap-2 ml-3 hover:bg-red-500 hover:text-white"
                            >
                              <Delete class="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <AddCLO
    v-if="showAddCLOPopup"
    :id="id"
    :program_id="program_id"
    :name="name"
    @close="showAddCLOPopup = false"
    @updated="updated"
  />
  <DeleteCLO
    v-if="showDeleteCLOPopup"
    :id="selectedCLO.id"
    :name="selectedCLO.code"
    @close="showDeleteCLOPopup = false"
    @deleted="updated"
  />
  <AddPLO
    v-if="showAddPLOPopup"
    :id="id"
    :name="name"
    :splos="selectedSPLO"
    @updated="updatedSPLO"
    @close="showAddPLOPopup = false"
  ></AddPLO>
  <AddPO
    v-if="showAddPOPopup"
    :id="id"
    :name="name"
    :pos="selectedPO"
    @updated="updatedPO"
    @close="showAddPOPopup = false"
  ></AddPO>
  <AddSO
    v-if="showAddSOPopup"
    :id="id"
    :name="name"
    :ssos="selectedSSO"
    @updated="updatedSSO"
    @close="showAddSOPopup = false"
  ></AddSO>
  <ImportLearningOutcome
    v-if="showImportPopup"
    :id="id"
    @close="showImportPopup = false"
    @updated="updated"
  ></ImportLearningOutcome>
</template>

<script setup>
import TemplateButton from "@/components/button/TemplateButton.vue";
import Import from "@/components/button/ImportButton.vue";
import ExportButton from "@/components/button/ExportButton.vue";
import SmallAddButton from "@/components/button/SmallAddButton.vue";
import SmallEditButton from "@/components/button/SmallEditButton.vue";
import SmallSaveButton from "@/components/button/SmallSaveButton.vue";
import AddCLO from "@/components/popups/AddCLO.vue";
import AddPLO from "@/components/popups/AddPLOLO.vue";
import AddPO from "@/components/popups/AddPOLO.vue";
import AddSO from "@/components/popups/AddSOLO.vue";
import DeleteCLO from "@/components/popups/DeleteCLO.vue";
import Search from "@/components/icons/Search.vue";
import Delete from "@/components/icons/Delete.vue";
import ImportLearningOutcome from "@/components/popups/ImportLearningOutcome.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { fetchCourse, fetchCourseClos, BaseURL } from "~/api/api";

const router = useRouter();
const id = ref(router.currentRoute.value.params.id);
const name = ref("");
const program_id = ref("");
const course = ref(null);

const buttons = ["PLO", "PO", "SO"];
const activeButton = ref("PLO");

const selectedSPLO = ref([]);
const selectedPO = ref([]);
const selectedSSO = ref([]);

const clickTemplate = () => {
  window.open(
    "https://cdn.discordapp.com/attachments/1266636608971477085/1374297978688372776/instant_course_import_template.xlsx?ex=682d8a3b&is=682c38bb&hm=c81aded386a525d836106b3c7ba1b527f4bbf443e56aaa82f227bc3871cdbdf7&",
    "_blank"
  );
};

const showImportPopup = ref(false);
const importFile = () => {
  showImportPopup.value = true;
};

const updated = async () => {
  await fetchCourseClos(clos, id.value);
  selectedCLO.value =
    clos.value.find((clo) => clo.id === selectedCLO.value?.id) || clos.value[0];
};

const LinkSPLO = async () => {
  try {
    console.log("Linking new SPLO:", selectedSPLO.value);
    const response = await fetch(
      `${BaseURL}clos/${selectedCLO.value.id}/splos`,
      {
        credentials: "include",
        method: "POST",
        body: JSON.stringify({
          sub_program_learning_outcome_ids: selectedSPLO.value.map(
            (splo) => splo.id
          ),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) throw new Error("Failed to link new SPLO");
  } catch (error) {
    console.error(error);
  }
};

const UnlinkSPLO = async (id) => {
  try {
    console.log("Linking new PO:", selectedPO.value);
    const response = await fetch(
      `${BaseURL}clos/${selectedCLO.value.id}/splos/${id}`,
      {
        credentials: "include",
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) throw new Error("Failed to unlink SPLO");
  } catch (error) {
    console.error(error);
  }
};

const LinkPO = async () => {
  try {
    console.log("Linking new PO:", selectedPO.value);
    const response = await fetch(`${BaseURL}clos/${selectedCLO.value.id}/pos`, {
      credentials: "include",
      method: "POST",
      body: JSON.stringify({
        program_outcome_ids: selectedPO.value.map((po) => po.id),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) throw new Error("Failed to link new PO");
  } catch (error) {
    console.error(error);
  }
};

const UnlinkPO = async (id) => {
  try {
    console.log("Linking new PO:", selectedPO.value);
    const response = await fetch(
      `${BaseURL}clos/${selectedCLO.value.id}/pos/${id}`,
      {
        credentials: "include",
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) throw new Error("Failed to unlink PO");
  } catch (error) {
    console.error(error);
  }
};

const LinkSSO = async () => {
  try {
    console.log("Linking new SO:", selectedSSO.value);
    const response = await fetch(
      `${BaseURL}clos/${selectedCLO.value.id}/ssos`,
      {
        credentials: "include",
        method: "POST",
        body: JSON.stringify({
          sub_student_outcome_ids: selectedSSO.value.map((sso) => sso.id),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) throw new Error("Failed to link new SO");
  } catch (error) {
    console.error(error);
  }
};

const UnlinkSSO = async (id) => {
  try {
    console.log("Linking new PO:", selectedPO.value);
    const response = await fetch(
      `${BaseURL}clos/${selectedCLO.value.id}/ssos/${id}`,
      {
        credentials: "include",
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) throw new Error("Failed to unlink SSO");
  } catch (error) {
    console.error(error);
  }
};

const updatedSPLO = async () => {
  try {
    await LinkSPLO();
    updated();
  } catch (error) {
    console.error(error);
  }
};

const updatedPO = async () => {
  try {
    await LinkPO();
    updated();
  } catch (error) {
    console.error(error);
  }
};

const updatedSSO = async () => {
  try {
    await LinkSSO();
    updated();
  } catch (error) {
    console.error(error);
  }
};

const editMode = ref(false);

const editLearningOutcome = () => {
  editMode.value = true;
};

const saveLearningOutcome = async () => {
  await updateCLO();
  editMode.value = false;
};

const updateCLO = async () => {
  try {
    const response = await fetch(`${BaseURL}clos/${selectedCLO.value.id}`, {
      credentials: "include",
      method: "PATCH",
      body: JSON.stringify({
        name: selectedCLO.value.name,
        description_th: selectedCLO.value.description_th,
        description_en: selectedCLO.value.description_en,
        expected_passing_assignment_percentage:
          selectedCLO.value.expected_passing_assignment_percentage,
        expected_passing_student_percentage:
          selectedCLO.value.expected_passing_student_percentage,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) throw new Error("Failed to update CLO");
  } catch (error) {
    console.error(error);
  }
};

const showDeleteCLOPopup = ref(false);

const deleteCLO = (code) => {
  showDeleteCLOPopup.value = true;
};

const setActionButton = (button) => {
  activeButton.value = button;
};

const showAddCLOPopup = ref(false);

const addCLO = () => {
  id.value = router.currentRoute.value.params.id;
  showAddCLOPopup.value = true;
};

const showAddPLOPopup = ref(false);
const showAddPOPopup = ref(false);
const showAddSOPopup = ref(false);

const addSubCLO = (path) => {
  if (path === "PLO") {
    name.value = selectedCLO.name;
    showAddPLOPopup.value = true;
  } else if (path === "PO") {
    name.value = selectedCLO.name;
    showAddPOPopup.value = true;
  } else if (path === "SO") {
    name.value = selectedCLO.name;
    showAddSOPopup.value = true;
  }
};

const deletePO = async (id) => {
  console.log("Delete PO:", id);
  await UnlinkPO(id);
  selectedCLO.value.program_outcomes =
    selectedCLO.value.program_outcomes.filter((po) => po.id !== id);
};

const deleteSubPLO = async (id) => {
  console.log("Delete Sub PLO:", id);
  await UnlinkSPLO(id);
  updated();
};

const deleteSubSO = async (id) => {
  console.log("Delete Sub SO:", id);
  await UnlinkSSO(id);
  updated();
};

const searchQuery = ref("");

const clos = ref([
  {
    name: "",
    type: 0,
    id: "",
    code: "",
    description_th: "",
    description_en: "",
    expected_passing_assignment_percentage: 0,
    expected_passing_student_percentage: 0,
    status: "",
    program_learning_outcomes: [
      {
        id: "",
        code: "",
        description_eng: "",
        description_thai: "",
        sub_program_learning_outcomes: [
          {
            id: "",
            code: "",
            description_eng: "",
            description_thai: "",
          },
        ],
      },
    ],
    program_outcomes: [
      {
        id: "",
        code: "",
        name: "",
        category: "",
        description: "",
      },
    ],
    student_outcomes: [
      {
        id: "",
        code: "",
        description_thai: "",
        description_eng: "",
        sub_student_outcomes: [
          {
            id: "",
            code: "",
            description_thai: "",
            description_eng: "",
            student_outcome_id: "",
          },
        ],
      },
    ],
  },
]);

const selectedCLO = ref(null);

function selectCLO(clo) {
  selectedCLO.value = clo;
}

onMounted(async () => {
  await fetchCourse(course, id.value);
  if (course.value) {
    console.log(course.value);
    program_id.value = course.value.programme_id;
  }
  await fetchCourseClos(clos, id.value);
  console.log(clos.value);
  selectedCLO.value = clos.value[0] || null;
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

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}
</style>

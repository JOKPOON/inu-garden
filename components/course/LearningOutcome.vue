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
          class="flex items-center flex-row justify-center border border-grey-secondary rounded-xl px-4 py-3 gap-2"
        >
          <span class="text-black-primary font-semibold text-base"
            >Template</span
          >
        </TemplateButton>
        <Import
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
              v-for="clo in CLO"
              :key="clo.name"
              :class="{
                'bg-grey-secondary text-black-primary': selectedCLO === clo,
                'bg-white': selectedCLO !== clo,
              }"
              @click="selectCLO(clo)"
              class="w-full flex items-center justify-center py-3 border-b border-grey-secondary"
            >
              <div v-if="!editMode">
                {{ clo.name }}
              </div>
              <div
                v-if="editMode"
                class="text-start w-full flex items-center h-full border border-grey-primary p-3 rounded-xl mx-3"
              >
                <input
                  type="text"
                  class="bg-transparent focus:ring-0 outline-none w-full text-sm"
                  v-model="clo.name"
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
              class="w-full flex items-center justify-center p-3 border-b border-grey-secondary"
            >
              <div
                v-if="!editMode"
                :class="{
                  'bg-green-500': selectedCLO.type === 0,
                  'bg-yellow-500': selectedCLO.type === 1,
                }"
                class="p-2 rounded-xl text-white"
              >
                <span v-if="selectedCLO.type === 0">Curriculum</span>
                <span v-else>Modified</span>
              </div>
              <div
                v-if="editMode"
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
            Detail of {{ selectedCLO.name }}
          </div>

          <div class="grid grid-cols-2 w-full h-full">
            <div
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
                    @click="deleteCLO(selectedCLO.name)"
                    class="flex items-center flex-row justify-center border border-grey-secondary rounded-xl px-3 py-2 gap-2 ml-3 hover:bg-red-500 hover:text-white"
                  >
                    <Delete class="w-5 h-5" />
                  </button>
                </div>
                <div class="font-semibold text-black-primary px-4">
                  Description
                </div>
                <div v-if="selectedCLO.detail" class="px-4">
                  <div v-if="!editMode">
                    {{ selectedCLO.detail.desc_th }}
                  </div>
                  <div v-else>
                    <textarea
                      v-model="selectedCLO.detail.desc_th"
                      class="w-full px-4 py-2 border border-grey-secondary rounded-xl outline-none text-sm"
                      rows="3"
                      placeholder="Description in Thai"
                    ></textarea>
                  </div>
                </div>
                <div v-if="selectedCLO.detail" class="px-4">
                  <div v-if="!editMode">
                    {{ selectedCLO.detail.desc }}
                  </div>
                  <div v-else>
                    <textarea
                      v-model="selectedCLO.detail.desc"
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
                    {{ selectedCLO.detail.expectedWeightPassingCLORate }}%
                  </div>
                  <div v-if="editMode">
                    <input
                      v-model="selectedCLO.detail.expectedWeightPassingCLORate"
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
                    {{ selectedCLO.detail.expectedWeightPassingStudentRate }}%
                  </div>
                  <div v-if="editMode">
                    <input
                      v-model="
                        selectedCLO.detail.expectedWeightPassingStudentRate
                      "
                      type="number"
                      class="border border-grey-tertiary rounded-xl p-3 outline-grey-tertiary w-16 text-center"
                      placeholder="%"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="col-span-1 h-full border-r py-3">
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
                    <div v-if="selectedCLO.detail && selectedCLO.detail.PLO">
                      <div
                        :class="{
                          'grid grid-cols-5 ': editMode,
                          'grid grid-cols-4 ': !editMode,
                        }"
                        class="gap-4 border-b border-grey-secondary px-4 py-3 bg-grey-tertiary"
                      >
                        <div
                          v-if="!editMode"
                          class="col-span-1 text-sm w-full font-medium"
                        >
                          {{ selectedCLO.detail.PLOcode }}
                        </div>
                        <div
                          v-if="editMode"
                          class="col-span-1 text-sm w-full font-medium"
                        >
                          <input
                            v-model="selectedCLO.detail.PLOcode"
                            type="text"
                            class="border border-grey-tertiary rounded-xl p-3 outline-grey-tertiary w-16 text-center"
                            placeholder="Code"
                          />
                        </div>
                        <div class="col-span-3 text-sm w-full">
                          <div class="flex flex-col gap-3">
                            <div v-if="!editMode">
                              {{ selectedCLO.detail.PLOdesc_th }}
                            </div>
                            <div v-if="editMode">
                              <textarea
                                v-model="selectedCLO.detail.PLOdesc_th"
                                class="w-full px-4 py-2 border border-grey-secondary rounded-xl outline-none text-sm scrollbar-set"
                                rows="4"
                                placeholder="Description in Thai"
                              ></textarea>
                            </div>
                            <div v-if="!editMode">
                              {{ selectedCLO.detail.PLOdesc }}
                            </div>
                            <div v-if="editMode">
                              <textarea
                                v-model="selectedCLO.detail.PLOdesc"
                                class="w-full px-4 py-2 border border-grey-secondary rounded-xl outline-none text-sm scrollbar-set"
                                rows="4"
                                placeholder="Description in English"
                              ></textarea>
                            </div>
                          </div>
                        </div>
                        <div
                          class="col-span-1 flex items-center justify-center"
                        >
                          <button
                            v-if="editMode"
                            @click="deletePLO(selectedCLO.detail.PLOcode)"
                            class="flex items-center flex-row justify-center bg-white border border-grey-secondary rounded-xl px-3 py-2 gap-2 ml-3 hover:bg-red-500 hover:text-white"
                          >
                            <Delete class="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                      <div
                        v-for="(plo, key) in selectedCLO.detail.PLO"
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
                            <div v-if="!editMode">
                              {{ plo.code }}
                            </div>
                            <div
                              v-if="editMode"
                              class="col-span-1 text-sm w-full font-medium"
                            >
                              <input
                                v-model="plo.code"
                                type="text"
                                class="border border-grey-tertiary rounded-xl p-3 outline-grey-tertiary w-16 text-center"
                                placeholder="Code"
                              />
                            </div>
                          </div>
                          <div class="col-span-3 text-sm w-full">
                            <div class="flex flex-col gap-3">
                              <div v-if="!editMode">
                                {{ plo.desc_th }}
                              </div>
                              <div v-if="editMode">
                                <textarea
                                  v-model="plo.desc_th"
                                  class="w-full px-4 py-2 border border-grey-secondary rounded-xl outline-none text-sm scrollbar-set"
                                  rows="4"
                                  placeholder="Description in Thai"
                                ></textarea>
                              </div>
                              <div v-if="!editMode">
                                {{ plo.desc }}
                              </div>
                              <div v-if="editMode">
                                <textarea
                                  v-model="plo.desc"
                                  class="w-full px-4 py-2 border border-grey-secondary rounded-xl outline-none text-sm scrollbar-set"
                                  rows="4"
                                  placeholder="Description in English"
                                ></textarea>
                              </div>
                            </div>
                          </div>
                          <div
                            class="col-span-1 flex items-center justify-center"
                          >
                            <button
                              v-if="editMode"
                              @click="deleteSubPLO(plo.code)"
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
                    <div v-if="selectedCLO.detail && selectedCLO.detail.PO">
                      <div
                        :class="{
                          'grid grid-cols-5 ': editMode,
                          'grid grid-cols-4 ': !editMode,
                        }"
                        class="gap-4 border-b border-grey-secondary px-4 py-3 bg-grey-tertiary"
                      >
                        <div
                          v-if="!editMode"
                          class="col-span-1 text-sm w-full font-medium"
                        >
                          {{ selectedCLO.detail.POcode }}
                        </div>
                        <div
                          v-if="editMode"
                          class="col-span-1 text-sm w-full font-medium"
                        >
                          <input
                            v-model="selectedCLO.detail.POcode"
                            type="text"
                            class="border border-grey-tertiary rounded-xl p-3 outline-grey-tertiary w-16 text-center"
                            placeholder="Code"
                          />
                        </div>
                        <div class="col-span-3 text-sm w-full">
                          <div class="flex flex-col gap-3">
                            <div v-if="!editMode">
                              {{ selectedCLO.detail.POdesc_th }}
                            </div>
                            <div v-if="editMode">
                              <textarea
                                v-model="selectedCLO.detail.POdesc_th"
                                class="w-full px-4 py-2 border border-grey-secondary rounded-xl outline-none text-sm scrollbar-set"
                                rows="4"
                                placeholder="Description in Thai"
                              ></textarea>
                            </div>
                            <div v-if="!editMode">
                              {{ selectedCLO.detail.POdesc }}
                            </div>
                            <div v-if="editMode">
                              <textarea
                                v-model="selectedCLO.detail.POdesc"
                                class="w-full px-4 py-2 border border-grey-secondary rounded-xl outline-none text-sm scrollbar-set"
                                rows="4"
                                placeholder="Description in English"
                              ></textarea>
                            </div>
                          </div>
                        </div>
                        <div
                          class="col-span-1 flex items-center justify-center"
                        >
                          <button
                            v-if="editMode"
                            @click="deletePO(selectedCLO.detail.POcode)"
                            class="flex items-center flex-row justify-center border bg-white border-grey-secondary rounded-xl px-3 py-2 gap-2 ml-3 hover:bg-red-500 hover:text-white"
                          >
                            <Delete class="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                      <div
                        v-for="(po, key) in selectedCLO.detail.PO"
                        :key="key"
                      >
                        <div
                          :class="{
                            'grid grid-cols-5 ': editMode,
                            'grid grid-cols-4 ': !editMode,
                          }"
                          class="gap-4 border-b border-grey-tertiary px-4 py-3"
                        >
                          <div
                            v-if="!editMode"
                            class="col-span-1 text-sm w-full font-medium"
                          >
                            {{ po.code }}
                          </div>
                          <div
                            v-if="editMode"
                            class="col-span-1 text-sm w-full font-medium"
                          >
                            <input
                              v-model="po.code"
                              type="text"
                              class="border border-grey-tertiary rounded-xl p-3 outline-grey-tertiary w-16 text-center"
                              placeholder="Code"
                            />
                          </div>
                          <div class="col-span-3 text-sm w-full">
                            <div class="flex flex-col gap-3">
                              <div v-if="!editMode">
                                {{ po.desc_th }}
                              </div>
                              <div v-if="editMode">
                                <textarea
                                  v-model="po.desc_th"
                                  class="w-full px-4 py-2 border border-grey-secondary rounded-xl outline-none text-sm scrollbar-set"
                                  rows="4"
                                  placeholder="Description in Thai"
                                ></textarea>
                              </div>
                              <div v-if="!editMode">
                                {{ po.desc }}
                              </div>
                              <div v-if="editMode">
                                <textarea
                                  v-model="po.desc"
                                  class="w-full px-4 py-2 border border-grey-secondary rounded-xl outline-none text-sm scrollbar-set"
                                  rows="4"
                                  placeholder="Description in English"
                                ></textarea>
                              </div>
                            </div>
                          </div>
                          <div
                            class="col-span-1 flex items-center justify-center"
                          >
                            <button
                              v-if="editMode"
                              @click="deleteSubPO(po.code)"
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
                <div v-else-if="activeButton === 'SO'">
                  <div
                    class="w-full flex flex-col gap-2 border-b border-grey-secondary"
                  >
                    <div v-if="selectedCLO.detail && selectedCLO.detail.SO">
                      <div
                        :class="{
                          'grid grid-cols-5 ': editMode,
                          'grid grid-cols-4 ': !editMode,
                        }"
                        class="gap-4 border-b border-grey-secondary px-4 py-3 bg-grey-tertiary"
                      >
                        <div
                          v-if="!editMode"
                          class="col-span-1 text-sm w-full font-medium"
                        >
                          {{ selectedCLO.detail.SOcode }}
                        </div>
                        <div
                          v-if="editMode"
                          class="col-span-1 text-sm w-full font-medium"
                        >
                          <input
                            v-model="selectedCLO.detail.SOcode"
                            type="text"
                            class="border border-grey-tertiary rounded-xl p-3 outline-grey-tertiary w-16 text-center"
                            placeholder="Code"
                          />
                        </div>
                        <div class="col-span-3 text-sm w-full">
                          <div class="flex flex-col gap-3">
                            <div v-if="!editMode">
                              {{ selectedCLO.detail.SOdesc_th }}
                            </div>
                            <div v-if="editMode">
                              <textarea
                                v-model="selectedCLO.detail.SOdesc_th"
                                class="w-full px-4 py-2 border border-grey-secondary rounded-xl outline-none text-sm scrollbar-set"
                                rows="4"
                                placeholder="Description in Thai"
                              ></textarea>
                            </div>
                            <div v-if="!editMode">
                              {{ selectedCLO.detail.SOdesc }}
                            </div>
                            <div v-if="editMode">
                              <textarea
                                v-model="selectedCLO.detail.SOdesc"
                                class="w-full px-4 py-2 border border-grey-secondary rounded-xl outline-none text-sm scrollbar-set"
                                rows="4"
                                placeholder="Description in English"
                              ></textarea>
                            </div>
                          </div>
                        </div>
                        <div
                          class="col-span-1 flex items-center justify-center"
                        >
                          <button
                            v-if="editMode"
                            @click="deleteSO(selectedCLO.detail.SOcode)"
                            class="flex items-center flex-row justify-center border bg-white border-grey-secondary rounded-xl px-3 py-2 gap-2 ml-3 hover:bg-red-500 hover:text-white"
                          >
                            <Delete class="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                      <div
                        v-for="(so, key) in selectedCLO.detail.SO"
                        :key="key"
                      >
                        <div
                          :class="{
                            'grid grid-cols-5 ': editMode,
                            'grid grid-cols-4 ': !editMode,
                          }"
                          class="gap-4 border-b border-grey-tertiary px-4 py-3"
                        >
                          <div
                            v-if="!editMode"
                            class="col-span-1 text-sm w-full font-medium"
                          >
                            {{ so.code }}
                          </div>
                          <div
                            v-if="editMode"
                            class="col-span-1 text-sm w-full font-medium"
                          >
                            <input
                              v-model="so.code"
                              type="text"
                              class="border border-grey-tertiary rounded-xl p-3 outline-grey-tertiary w-16 text-center"
                              placeholder="Code"
                            />
                          </div>
                          <div class="col-span-3 text-sm w-full">
                            <div class="flex flex-col gap-3">
                              <div v-if="!editMode">
                                {{ so.desc_th }}
                              </div>
                              <div v-if="editMode">
                                <textarea
                                  v-model="so.desc_th"
                                  class="w-full px-4 py-2 border border-grey-secondary rounded-xl outline-none text-sm scrollbar-set"
                                  rows="4"
                                  placeholder="Description in Thai"
                                ></textarea>
                              </div>
                              <div v-if="!editMode">
                                {{ so.desc }}
                              </div>
                              <div v-if="editMode">
                                <textarea
                                  v-model="so.desc"
                                  class="w-full px-4 py-2 border border-grey-secondary rounded-xl outline-none text-sm scrollbar-set"
                                  rows="4"
                                  placeholder="Description in English"
                                ></textarea>
                              </div>
                            </div>
                          </div>
                          <div
                            class="col-span-1 flex items-center justify-center"
                          >
                            <button
                              v-if="editMode"
                              @click="deleteSubSO(so.code)"
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
    :name="name"
    @close="showAddCLOPopup = false"
  />
  <DeleteCLO
    v-if="showDeleteCLOPopup"
    :id="id"
    :name="name"
    @close="showDeleteCLOPopup = false"
  />
  <AddPLO
    v-if="showAddPLOPopup"
    :id="id"
    :name="name"
    @close="showAddPLOPopup = false"
  ></AddPLO>
  <AddPO
    v-if="showAddPOPopup"
    :id="id"
    :name="name"
    @close="showAddPOPopup = false"
  ></AddPO>
  <AddSO
    v-if="showAddSOPopup"
    :id="id"
    :name="name"
    @close="showAddSOPopup = false"
  ></AddSO>
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
import Edit from "@/components/icons/Edit.vue";
import Delete from "@/components/icons/Delete.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const id = ref("");
const name = ref("");

const buttons = ["PLO", "PO", "SO"];
const activeButton = ref("PLO");

const editMode = ref(false);

const editLearningOutcome = () => {
  editMode.value = true;
};

const saveLearningOutcome = () => {
  editMode.value = false;
};

const showDeleteCLOPopup = ref(false);
const deleteCLO = (code) => {
  id.value = code;
  name.value = "CLO101";
  showDeleteCLOPopup.value = true;
};

const setActionButton = (button) => {
  activeButton.value = button;
};

const showAddCLOPopup = ref(false);
const addCLO = () => {
  id.value = router.currentRoute.value.params.id;
  name.value = "Computer Engineering (Regular) year 2565";
  showAddCLOPopup.value = true;
};

const showAddPLOPopup = ref(false);
const showAddPOPopup = ref(false);
const showAddSOPopup = ref(false);

const addSubCLO = (path) => {
  if (path === "PLO") {
    id.value = router.currentRoute.value.params.id;
    name.value = "CLO101";
    showAddPLOPopup.value = true;
  } else if (path === "PO") {
    id.value = router.currentRoute.value.params.id;
    name.value = "CLO101";
    showAddPOPopup.value = true;
  } else if (path === "SO") {
    id.value = router.currentRoute.value.params.id;
    name.value = "CLO101";
    showAddSOPopup.value = true;
  }
};

const deletePLO = (code) => {
  console.log("Delete PLO:", code);
};

const deletePO = (code) => {
  console.log("Delete PO:", code);
};

const deleteSO = (code) => {
  console.log("Delete SO:", code);
};

const deleteSubPLO = (code) => {
  console.log("Delete Sub PLO:", code);
};

const deleteSubPO = (code) => {
  console.log("Delete Sub PO:", code);
};

const deleteSubSO = (code) => {
  console.log("Delete Sub SO:", code);
};

const searchQuery = ref("");

const CLO = ref([
  {
    name: "CLO1",
    type: 0,
    detail: {
      desc: "Able to apply principles and knowledge of science, mathematics, and engineering to analyze and design solutions for computer engineering problems.",
      desc_th:
        "สามารถใช้หลักการและความรู้ทางวิทยาศาสตร์ คณิตศาสตร์ และวิศวกรรมศาสตร์ ในการวิเคราะห์และออกแบบเพื่อแก้ปัญหาทางวิศวกรรมคอมพิวเตอร์ได้",
      expectedWeightPassingCLORate: 70,
      expectedWeightPassingStudentRate: 70,
      PLOcode: "PLO",
      PLOdesc:
        "Able to apply principles and knowledge of science, mathematics, and engineering to analyze and design solutions for computer engineering problems.",
      PLOdesc_th:
        "สามารถใช้หลักการและความรู้ทางวิทยาศาสตร์ คณิตศาสตร์ และวิศวกรรมศาสตร์ ในการวิเคราะห์และออกแบบเพื่อแก้ปัญหาทางวิศวกรรมคอมพิวเตอร์ได้",
      POcode: "PO",
      POdesc:
        "Able to apply principles and knowledge of science, mathematics, and engineering to analyze and design solutions for computer engineering problems.",
      POdesc_th:
        "สามารถใช้หลักการและความรู้ทางวิทยาศาสตร์ คณิตศาสตร์ และวิศวกรรมศาสตร์ ในการวิเคราะห์และออกแบบเพื่อแก้ปัญหาทางวิศวกรรมคอมพิวเตอร์ได้",
      SOcode: "SO",
      SOdesc:
        "Able to apply principles and knowledge of science, mathematics, and engineering to analyze and design solutions for computer engineering problems.",
      SOdesc_th:
        "สามารถใช้หลักการและความรู้ทางวิทยาศาสตร์ คณิตศาสตร์ และวิศวกรรมศาสตร์ ในการวิเคราะห์และออกแบบเพื่อแก้ปัญหาทางวิศวกรรมคอมพิวเตอร์ได้",
      PLO: [
        {
          code: "PLO1",
          desc: "Able to apply principles and knowledge of science, mathematics, and engineering to analyze and design solutions for computer engineering problems.",
          desc_th:
            "สามารถใช้หลักการและความรู้ทางวิทยาศาสตร์ คณิตศาสตร์ และวิศวกรรมศาสตร์ ในการวิเคราะห์และออกแบบเพื่อแก้ปัญหาทางวิศวกรรมคอมพิวเตอร์ได้",
        },
        {
          code: "PLO2",
          desc: "Able to apply principles and knowledge of science, mathematics, and engineering to analyze and design solutions for computer engineering problems.",
          desc_th:
            "สามารถใช้หลักการและความรู้ทางวิทยาศาสตร์ คณิตศาสตร์ และวิศวกรรมศาสตร์ ในการวิเคราะห์และออกแบบเพื่อแก้ปัญหาทางวิศวกรรมคอมพิวเตอร์ได้",
        },
        {
          code: "PLO3",
          desc: "Able to apply principles and knowledge of science, mathematics, and engineering to analyze and design solutions for computer engineering problems.",
          desc_th:
            "สามารถใช้หลักการและความรู้ทางวิทยาศาสตร์ คณิตศาสตร์ และวิศวกรรมศาสตร์ ในการวิเคราะห์และออกแบบเพื่อแก้ปัญหาทางวิศวกรรมคอมพิวเตอร์ได้",
        },
      ],
      PO: [
        {
          code: "PO1",
          desc: "Able to apply principles and knowledge of science, mathematics, and engineering to analyze and design solutions for computer engineering problems.",
          desc_th:
            "สามารถใช้หลักการและความรู้ทางวิทยาศาสตร์ คณิตศาสตร์ และวิศวกรรมศาสตร์ ในการวิเคราะห์และออกแบบเพื่อแก้ปัญหาทางวิศวกรรมคอมพิวเตอร์ได้",
        },
        {
          code: "PO2",
          desc: "Able to apply principles and knowledge of science, mathematics, and engineering to analyze and design solutions for computer engineering problems.",
          desc_th:
            "สามารถใช้หลักการและความรู้ทางวิทยาศาสตร์ คณิตศาสตร์ และวิศวกรรมศาสตร์ ในการวิเคราะห์และออกแบบเพื่อแก้ปัญหาทางวิศวกรรมคอมพิวเตอร์ได้",
        },
        {
          code: "PO3",
          desc: "Able to apply principles and knowledge of science, mathematics, and engineering to analyze and design solutions for computer engineering problems.",
          desc_th:
            "สามารถใช้หลักการและความรู้ทางวิทยาศาสตร์ คณิตศาสตร์ และวิศวกรรมศาสตร์ ในการวิเคราะห์และออกแบบเพื่อแก้ปัญหาทางวิศวกรรมคอมพิวเตอร์ได้",
        },
      ],
      SO: [
        {
          code: "SO1",
          desc: "Able to apply principles and knowledge of science, mathematics, and engineering to analyze and design solutions for computer engineering problems.",
          desc_th:
            "สามารถใช้หลักการและความรู้ทางวิทยาศาสตร์ คณิตศาสตร์ และวิศวกรรมศาสตร์ ในการวิเคราะห์และออกแบบเพื่อแก้ปัญหาทางวิศวกรรมคอมพิวเตอร์ได้",
        },
        {
          code: "SO2",
          desc: "Able to apply principles and knowledge of science, mathematics, and engineering to analyze and design solutions for computer engineering problems.",
          desc_th:
            "สามารถใช้หลักการและความรู้ทางวิทยาศาสตร์ คณิตศาสตร์ และวิศวกรรมศาสตร์ ในการวิเคราะห์และออกแบบเพื่อแก้ปัญหาทางวิศวกรรมคอมพิวเตอร์ได้",
        },
        {
          code: "SO3",
          desc: "Able to apply principles and knowledge of science, mathematics, and engineering to analyze and design solutions for computer engineering problems.",
          desc_th:
            "สามารถใช้หลักการและความรู้ทางวิทยาศาสตร์ คณิตศาสตร์ และวิศวกรรมศาสตร์ ในการวิเคราะห์และออกแบบเพื่อแก้ปัญหาทางวิศวกรรมคอมพิวเตอร์ได้",
        },
      ],
    },
  },
  {
    name: "CLO 2",
    type: 1,
    detail: {},
  },
]);

const selectedCLO = ref(CLO.value[0]);

function selectCLO(clo) {
  selectedCLO.value = clo;
}
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

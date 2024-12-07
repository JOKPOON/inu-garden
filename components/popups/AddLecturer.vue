<template>
    <teleport to="body">
      <div
        class="w-full h-full fixed inset-0 flex items-center justify-center bg-black-primary bg-opacity-50 z-50"
      >
        <div class="bg-white p-6 rounded-2xl shadow-lg">
          <div
            class="flex flex-row justify-between items-center gap-12 pb-2 border-b"
          >
            <div class="w-full flex flex-row gap-4 items-center">
              <div class="rounded-full bg-grey-primary h-16 w-16">
                <img
                  :src="
                    user.picture ||
                    'https://thumbs.dreamstime.com/b/arabic-business-man-traditional-muslim-hat-placeholder-102337208.jpg'
                  "
                  alt="Profile Picture"
                  class="h-full w-full object-cover rounded-full"
                />
              </div>
              <div class="flex flex-col">
                <div class="flex flex-row border border-grey-primary rounded-xl">
                  <div class="text-base px-4 py-2 text-grey-primary rounded-xl">
                    {{ user.pictureName || "file name" }}
                  </div>
                  <button
                    @click="triggerFileInput"
                    class="text-base font-semibold px-4 py-2 bg-black-primary text-white rounded-xl"
                  >
                    Upload Picture
                  </button>
                  <input
                    type="file"
                    ref="fileInput"
                    @change="handleFileChange"
                    class="hidden"
                    accept="image/jpeg, image/png"
                  />
                </div>
                <div class="text-sm text-start mt-1 text-grey-primary">
                  File type : JPG, PNG (max 10 MB.)
                </div>
                <div
                  v-if="invalidPicture"
                  class="text-sm text-red-500 text-start mt-1"
                >
                  Invalid Picture Format or Size
                </div>
              </div>
            </div>
          </div>
          <div
            class="max-h-[calc(100vh-385px)] overflow-y-scroll scrollbar-set mt-4"
          >
            <div class="flex flex-col gap-2">
              <div class="grid grid-cols-2 gap-4 mt-2">
                <div class="flex flex-col gap-1 min-w-64">
                  <div class="text-grey-primary text-sm">
                    Academic Position - English
                  </div>
                  <input
                    v-model="user.academic_position_eng"
                    class="w-full border text-black border-grey-tertiary rounded-xl p-3 outline-grey-tertiary"
                    type="text"
                    placeholder="Academic Position"
                  />
                </div>
                <div class="flex flex-col gap-1 min-w-64">
                  <div class="text-grey-primary text-sm">
                    Academic Position - ไทย
                  </div>
                  <input
                    v-model="user.academic_position_thai"
                    class="w-full border text-black border-grey-tertiary rounded-xl p-3 outline-grey-tertiary"
                    type="text"
                    placeholder="Academic Position"
                  />
                </div>
              </div>
              <div class="grid grid-cols-2 gap-4 mt-2">
                <div class="flex flex-col gap-1 min-w-64">
                  <div class="text-grey-primary text-sm">
                    First Name - English
                  </div>
                  <input
                    v-model="user.first_name"
                    class="w-full border text-black border-grey-tertiary rounded-xl p-3 outline-grey-tertiary"
                    type="text"
                    placeholder="First Name"
                  />
                </div>
                <div class="flex flex-col gap-1 min-w-64">
                  <div class="text-grey-primary text-sm">Last Name - English</div>
                  <input
                    v-model="user.last_name"
                    class="w-full border text-black border-grey-tertiary rounded-xl p-3 outline-grey-tertiary"
                    type="text"
                    placeholder="Last Name"
                  />
                </div>
              </div>
              <div class="grid grid-cols-2 gap-4 mt-2">
                <div class="flex flex-col gap-1 min-w-64">
                  <div class="text-grey-primary text-sm">First Name - ไทย</div>
                  <input
                    v-model="user.first_name_thai"
                    class="col-span-2 w-full border text-black border-grey-tertiary rounded-xl p-3 outline-grey-tertiary"
                    type="text"
                    placeholder="First name"
                  />
                </div>
                <div class="flex flex-col gap-1 min-w-64">
                  <div class="text-grey-primary text-sm">Last Name - ไทย</div>
                  <input
                    v-model="user.last_name_thai"
                    class="col-span-2 w-full border text-black border-grey-tertiary rounded-xl p-3 outline-grey-tertiary"
                    type="text"
                    placeholder="Last Name"
                  />
                </div>
              </div>
            </div>
  
            <div class="flex flex-col gap-1 min-w-64 mt-2">
              <div class="text-grey-primary text-sm">Email</div>
              <input
                v-model="user.email"
                class="w-full border text-black border-grey-tertiary rounded-xl p-3 outline-grey-tertiary"
                type="text"
                placeholder="Email"
              />
            </div>
            <div class="flex flex-col gap-1 min-w-64 mt-2">
              <div class="text-grey-primary text-sm">Role</div>
              <div class="flex flex-col gap-2">
                <div
                  v-for="(role, index) in user.role"
                  :key="index"
                  class="flex items-center gap-2 w-full"
                >
                  <div class="p-3 border border-grey-tertiary rounded-xl w-full">
                    <select
                      v-model="user.role[index]"
                      class="w-full text-black rounded-xl outline-none"
                    >
                      <option value="" disabled selected>Select Role</option>
                      <option value="Lecturer">Lecturer</option>
                      <option value="Moderator">Moderator</option>
                      <option value="Criteria Manager">Criteria Manager</option>
                      <option value="TABEE Managerr">TABEE Managerr</option>
                      <option value="ABET Manager">ABET Manager</option>
                      <option value="AUN-QA Manager">AUN-QA Manager</option>
                      <option value="Head of Curriculumn">
                        Head of Curriculumn
                      </option>
                    </select>
                  </div>
                  <button
                    @click="deleteRole(index)"
                    class="flex items-center justify-center rounded-xl p-2 border hover:bg-red-500 hover:text-white"
                  >
                    <Delete class="w-6 h-6" />
                  </button>
                </div>
                <button
                  @click="addRole"
                  class="flex items-center justify-center rounded-xl p-2 border hover:bg-black-primary hover:text-white"
                >
                  Add Role
                </button>
              </div>
            </div>
  
            <div class="flex flex-col gap-1 w-full mt-2">
              <div class="text-grey-primary text-sm">Degree</div>
              <div class="flex flex-col gap-2">
                <div
                  v-for="(degree, index) in user.degree"
                  :key="index"
                  class="flex items-center gap-2"
                >
                  <input
                    v-model="user.degree[index]"
                    class="w-full border text-black border-grey-tertiary rounded-xl p-3 outline-grey-tertiary"
                    type="text"
                    placeholder="Degree"
                  />
                  <button
                    @click="deleteDegree(index)"
                    class="flex items-center justify-center rounded-xl p-2 border hover:bg-red-500 hover:text-white"
                  >
                    <Delete class="w-6 h-6" />
                  </button>
                </div>
                <button
                  @click="addDegree"
                  class="flex items-center justify-center rounded-xl p-2 border hover:bg-black-primary hover:text-white"
                >
                  Add Degree
                </button>
              </div>
            </div>
          </div>
          <div class="flex justify-end mt-4 gap-4">
            <button
              @click="confirm"
              class="w-full font-medium text-center py-3 bg-yellow-primary rounded-lg"
            >
              Confirm
            </button>
            <button
              @click="$emit('close')"
              class="w-full font-medium text-center py-3 bg-grey-secondary rounded-lg"
            >
              Cancel
            </button>

          </div>
        </div>
      </div>
    </teleport>
  </template>
  
  <script setup>
  import { ref, defineEmits } from "vue";
  import Delete from "@/components/icons/Delete.vue";
  import * as XLSX from "xlsx";
  
  const emit = defineEmits(["close"]);
  
  const user = ref({
    picture: "",
    pictureName: "",
    academic_position_eng: "",
    academic_position_thai: "",
    first_name: "",
    last_name: "",
    first_name_thai: "",
    last_name_thai: "",
    email: "",
    role: [""],
    degree: [""],
  });
  
  const invalidPicture = ref(false);
  
  const fileInput = ref(null);
  
  const addDegree = () => {
    user.value.degree.push("");
  };
  
  const addRole = () => {
    user.value.role.push("");
  };
  
  const deleteDegree = (index) => {
    user.value.degree.splice(index, 1);
  };
  
  const deleteRole = (index) => {
    user.value.role.splice(index, 1);
  };
  
  const triggerFileInput = () => {
    fileInput.value.click();
  };
  
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.size <= 10 * 1024 * 1024) {
      const reader = new FileReader();
      reader.onload = (e) => {
        user.value.picture = e.target.result;
        user.value.pictureName = file.name;
      };
      reader.readAsDataURL(file);
    } else {
      invalidPicture.value = true;
    }
  };
  
  const confirm = () => {
    user.value.role = user.value.role.filter((role) => role !== "");
    user.value.degree = user.value.degree.filter((degree) => degree !== "");
    console.log(user.value);
    invalidPicture.value = false;
    emit("close");
  };
  

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
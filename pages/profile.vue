<template>
  <div class="flex flex-col gap-4 p-4">
    <div class="flex flex-col">
      <div class="text-2xl font-semibold text-black-primary">Profile</div>
      <div class="text-sm text-grey-primary">Manage your profile</div>
    </div>
    <div
      class="flex flex-col p-6 rounded-xl bg-white border border-grey-tertiary"
    >
      <div
        class="flex flex-row justify-between items-center gap-12 pb-2 border-b"
      >
        <div v-if="!editMode" class="w-full flex flex-row gap-4 items-center">
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
            <div
              class="text-lg 3xl:text-lg font-semibold text-black-primary text-start"
            >
              {{ user.title_en_short }} {{ user.first_name_en }}
              {{ user.last_name_en }}
            </div>
            <div
              class="text-sm text-black-primary text-start mt-1 flex flex-row gap-2"
            >
              <role v-for="(role, index) in user.role" :key="index">
                <div class="p-1 px-3 bg-grey-tertiary rounded-lg border">
                  {{
                    role
                      .replace(/_/g, " ")
                      .toLowerCase()
                      .replace(/\b\w/g, (char) => char.toUpperCase())
                  }}
                </div>
              </role>
            </div>
          </div>
        </div>

        <div v-if="editMode" class="w-full flex flex-row gap-4 items-center">
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
        <div class="flex flex-row gap-2 items-center">
          <EditButton
            v-if="!editMode"
            @click="toggleEditMode"
            class="flex items-center flex-row justify-center border font-[500] border-grey-secondary rounded-xl px-4 py-3 gap-2 hover:bg-black-primary hover:text-white"
          >
            Edit
          </EditButton>
          <SaveButton
            v-if="editMode"
            @click="toggleEditMode"
            class="bg-yellow-primary flex items-center flex-row justify-center border font-[500] border-grey-secondary rounded-xl px-4 py-3 gap-2 hover:bg-black-primary hover:text-white"
          >
            Save
          </SaveButton>
          <button
            v-if="editMode"
            @click="cancelEdit"
            class="flex items-center flex-row justify-center font-[500] bg-grey-secondary rounded-xl p-3 px-4 border hover:bg-black-primary text-black-primary hover:text-white"
          >
            Cancel
          </button>
        </div>
      </div>
      <div class="max-h-[calc(100vh-400px)] overflow-y-scroll scrollbar-set">
        <div class="mt-6 grid grid-cols-2 gap-4 w-full">
          <div class="grid grid-cols-2 gap-4 mt-2">
            <div class="flex flex-col gap-1">
              <div class="col-span-1 text-grey-primary text-sm">
                Academic Position - English
              </div>
              <div
                v-if="!editMode"
                class="col-span-2 border text-black border-grey-tertiary rounded-xl p-3"
              >
                {{ user.academic_position_en }}
              </div>
              <input
                v-if="editMode"
                v-model="user.academic_position_en"
                class="col-span-2 w-full border text-black border-grey-tertiary rounded-xl p-3 outline-grey-tertiary"
                type="text"
                :placeholder="user.academic_position_en"
              />
            </div>
            <div class="flex flex-col gap-1">
              <div class="col-span-1 text-grey-primary text-sm">
                Academic Position - ไทย
              </div>
              <div
                v-if="!editMode"
                class="col-span-2 border text-black border-grey-tertiary rounded-xl p-3"
              >
                {{ user.academic_position_th }}
              </div>
              <input
                v-if="editMode"
                v-model="user.academic_position_th"
                class="col-span-2 w-full border text-black border-grey-tertiary rounded-xl p-3 outline-grey-tertiary"
                type="text"
                :placeholder="user.academic_position_th"
              />
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4 mt-2">
            <div class="flex flex-col gap-1">
              <div class="col-span-1 text-grey-primary text-sm">
                Title - English
              </div>
              <div
                v-if="!editMode"
                class="col-span-2 border text-black border-grey-tertiary rounded-xl p-3"
              >
                {{ user.title_en }}
              </div>
              <input
                v-if="editMode"
                v-model="user.title_en"
                class="col-span-2 w-full border text-black border-grey-tertiary rounded-xl p-3 outline-grey-tertiary"
                type="text"
                :placeholder="user.title_en"
              />
            </div>
            <div class="flex flex-col gap-1">
              <div class="col-span-1 text-grey-primary text-sm">
                Title - ไทย
              </div>
              <div
                v-if="!editMode"
                class="col-span-2 border text-black border-grey-tertiary rounded-xl p-3"
              >
                {{ user.title_th }}
              </div>
              <input
                v-if="editMode"
                v-model="user.title_th"
                class="col-span-2 w-full border text-black border-grey-tertiary rounded-xl p-3 outline-grey-tertiary"
                type="text"
                :placeholder="user.title_th"
              />
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4 mt-2">
            <div class="flex flex-col gap-1">
              <div class="col-span-1 text-grey-primary text-sm">
                Title Short- English
              </div>
              <div
                v-if="!editMode"
                class="col-span-2 border text-black border-grey-tertiary rounded-xl p-3"
              >
                {{ user.title_en_short }}
              </div>
              <input
                v-if="editMode"
                v-model="user.title_en_short"
                class="col-span-2 w-full border text-black border-grey-tertiary rounded-xl p-3 outline-grey-tertiary"
                type="text"
                :placeholder="user.title_en_short"
              />
            </div>
            <div class="flex flex-col gap-1">
              <div class="col-span-1 text-grey-primary text-sm">
                Title Short - ไทย
              </div>
              <div
                v-if="!editMode"
                class="col-span-2 border text-black border-grey-tertiary rounded-xl p-3"
              >
                {{ user.title_th_short }}
              </div>
              <input
                v-if="editMode"
                v-model="user.title_th_short"
                class="col-span-2 w-full border text-black border-grey-tertiary rounded-xl p-3 outline-grey-tertiary"
                type="text"
                :placeholder="user.title_th_short"
              />
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4 mt-2">
            <div class="flex flex-col gap-1">
              <div class="col-span-1 text-grey-primary text-sm">
                First Name - English
              </div>
              <div
                v-if="!editMode"
                class="col-span-2 border text-black border-grey-tertiary rounded-xl p-3"
              >
                {{ user.first_name_en }}
              </div>
              <input
                v-if="editMode"
                v-model="user.first_name_en"
                class="col-span-2 w-full border text-black border-grey-tertiary rounded-xl p-3 outline-grey-tertiary"
                type="text"
                :placeholder="user.first_name_en"
              />
            </div>
            <div class="flex flex-col gap-1">
              <div class="col-span-1 text-grey-primary text-sm">
                Last Name - English
              </div>
              <div
                v-if="!editMode"
                class="col-span-2 border text-black border-grey-tertiary rounded-xl p-3"
              >
                {{ user.last_name_en }}
              </div>
              <input
                v-if="editMode"
                v-model="user.last_name_en"
                class="col-span-2 w-full border text-black border-grey-tertiary rounded-xl p-3 outline-grey-tertiary"
                type="text"
                :placeholder="user.last_name_en"
              />
            </div>
          </div>
          <div class="flex flex-col gap-1 mt-2">
            <div class="text-grey-primary text-sm">Email</div>
            <div class="border text-black border-grey-tertiary rounded-xl p-3">
              {{ user.email }}
            </div>
          </div>
          <div v-if="!showPassword" class="flex items-center gap-2 w-full">
            <div class="flex flex-col gap-1 mt-2 w-full">
              <div class="text-grey-primary text-sm">Password</div>
              <div
                class="border text-black border-grey-tertiary rounded-xl p-3"
              >
                ********
              </div>
            </div>
            <button
              @click="togglePasswordVisibility"
              class="mt-8 flex items-center justify-center rounded-xl p-2 border"
            >
              <HidePassword class="w-6 h-6" />
            </button>
          </div>
          <div v-if="showPassword" class="flex items-center gap-2 w-full">
            <div class="flex flex-col gap-1 mt-2 w-full">
              <div class="text-grey-primary text-sm">Password</div>
              <div
                class="border text-black border-grey-tertiary rounded-xl p-3"
              >
                {{ user.password }}
              </div>
            </div>
            <button
              @click="togglePasswordVisibility"
              class="mt-8 flex items-center justify-center rounded-xl p-2 border bg-black-primary text-white"
            >
              <ShowPassword class="w-6 h-6" />
            </button>
          </div>
          <div class="flex flex-col gap-1 mt-2 col-span-2">
            <div class="text-grey-primary text-sm">Role</div>
            <div
              v-if="!editMode"
              class="border text-black border-grey-tertiary rounded-xl p-3"
            >
              <ul>
                <li v-for="(role, index) in user.role" :key="index">
                  {{
                    role
                      .replace(/_/g, " ")
                      .toLowerCase()
                      .replace(/\b\w/g, (char) => char.toUpperCase())
                  }}
                </li>
              </ul>
            </div>
            <div v-if="editMode" class="flex flex-col gap-2">
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
                    <option value="LECTURER">Lecturer</option>
                    <option value="MODERATOR">Moderator</option>
                    <option value="Criteria Manager">Criteria Manager</option>
                    <option value="TABEE_MANAGER">TABEE Managerr</option>
                    <option value="ABET_MANAGER">ABET Manager</option>
                    <option value="AUN-QA_MANAGER">AUN-QA Manager</option>
                    <option value="HEAD_OF_CURRICULUM">
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
            <div class="text-grey-primary text-sm">Degree - English</div>
            <div
              v-if="!editMode"
              class="border text-black border-grey-tertiary rounded-xl p-3"
            >
              <ul>
                <li v-for="(degree, index) in user.degree_en" :key="index">
                  {{ degree }}
                </li>
              </ul>
            </div>
            <div v-if="editMode" class="flex flex-col gap-2">
              <div
                v-for="(degree, index) in user.degree_en"
                :key="index"
                class="flex flex-row gap-4 items-center"
              >
                <input
                  v-model="user.degree_en[index]"
                  class="w-full border text-black border-grey-tertiary rounded-xl p-3 outline-grey-tertiary"
                  type="text"
                  placeholder="Enter degree"
                />
                <button
                  @click="deleteDegree_en(index)"
                  class="flex items-center justify-center rounded-xl p-2 border hover:bg-red-500 hover:text-white"
                >
                  <Delete class="w-6 h-6" />
                </button>
              </div>
              <button
                @click="addDegree_en"
                class="flex items-center justify-center rounded-xl p-2 border hover:bg-black-primary hover:text-white"
              >
                Add Degree
              </button>
            </div>
          </div>
          <div class="flex flex-col gap-1 w-full mt-2">
            <div class="text-grey-primary text-sm">Degree - ไทย</div>
            <div
              v-if="!editMode"
              class="border text-black border-grey-tertiary rounded-xl p-3"
            >
              <ul>
                <li v-for="(degree, index) in user.degree_th" :key="index">
                  {{ degree }}
                </li>
              </ul>
            </div>
            <div v-if="editMode" class="flex flex-col gap-2">
              <div
                v-for="(degree, index) in user.degree_th"
                :key="index"
                class="flex flex-row gap-4 items-center"
              >
                <input
                  v-model="user.degree_th[index]"
                  class="w-full border text-black border-grey-tertiary rounded-xl p-3 outline-grey-tertiary"
                  type="text"
                  placeholder="Enter degree"
                />
                <button
                  @click="deleteDegree_th(index)"
                  class="flex items-center justify-center rounded-xl p-2 border hover:bg-red-500 hover:text-white"
                >
                  <Delete class="w-6 h-6" />
                </button>
              </div>
              <button
                @click="addDegree_th"
                class="flex items-center justify-center rounded-xl p-2 border hover:bg-black-primary hover:text-white"
              >
                Add Degree
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import ShowPassword from "@/components/icons/ShowPassword.vue";
import HidePassword from "@/components/icons/HidePassword.vue";
import Delete from "@/components/icons/Delete.vue";
import EditButton from "@/components/button/EditButton.vue";
import SaveButton from "@/components/button/SaveButton.vue";
const { t } = useI18n();

const user = ref({
  picture: "",
  pictureName: "profile-picture.jpg",
  title_en: "Professor",
  title_th: "ศาสตราจารย์",
  title_en_short: "Prof.",
  title_th_short: "ศ.",
  academic_position_en: "Head of Department",
  academic_position_th: "หัวหน้าภาควิชา",
  first_name_en: "John",
  last_name_en: "Doe",
  first_name_th: "จอห์น",
  last_name_th: "โด",
  email: "john.doe@example.com",
  password: "password",
  role: ["LECTURER", "MODERATOR"],
  degree_en: ["PhD in Computer Science", "MSc in Information Technology"],
  degree_th: ["ปริญญาเอก วิทยาการคอมพิวเตอร์", "ปริญญาโท เทคโนโลยีสารสนเทศ"],
});

const editMode = ref(false);
const invalidPicture = ref(false);
const fileInput = ref(null);

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

const toggleEditMode = () => {
  editMode.value = !editMode.value;
};

const showPassword = ref(false);

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const cancelEdit = () => {
  editMode.value = !editMode.value;
  user.value.picture = "";
  user.value.pictureName = "";
  user.value.title_en = "Professor";
  user.value.title_th = "ศาสตราจารย์";
  user.value.title_en_short = "Prof.";
  user.value.title_th_short = "ศ.";
  user.value.academic_position_en = "Head of Department";
  user.value.academic_position_th = "หัวหน้าภาควิชา";
  user.value.first_name_en = "John";
  user.value.last_name_en = "Doe";
  user.value.first_name_th = "จอห์น";
  user.value.last_name_th = "โด";
  (user.value.email = "john.doe@example.com"),
    (user.value.password = "password"),
    (user.value.role = ["LECTURER", "MODERATOR"]);
  user.value.degree_en = [
    "PhD in Computer Science",
    "MSc in Information Technology",
  ];
  user.value.degree_th = [
    "ปริญญาเอก วิทยาการคอมพิวเตอร์",
    "ปริญญาโท เทคโนโลยีสารสนเทศ",
  ];
};

const addDegree_en = () => {
  user.value.degree_en.push("");
};

const addDegree_th = () => {
  user.value.degree_th.push("");
};

const addRole = () => {
  user.value.role.push("");
};

const deleteDegree_en = (index) => {
  user.value.degree_en.splice(index, 1);
};

const deleteDegree_th = (index) => {
  user.value.degree_th.splice(index, 1);
};

const deleteRole = (index) => {
  user.value.role.splice(index, 1);
};

useHead({
  title: "Inu - Profile",
  description: t("seo.desc"),
});

definePageMeta({
  layout: "landing",
});
</script>

<style lang="scss" scoped>
.scrollbar-set {
  scrollbar-width: thin;

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

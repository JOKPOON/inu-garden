<template>
  <teleport to="body">
    <div
      class="w-full h-full fixed inset-0 flex items-center justify-center bg-black-primary bg-opacity-50 z-50"
    >
      <div v-if="!importDone" class="bg-white p-6 rounded-2xl shadow-lg">
        <div
          class="flex flex-row gap-2 mb-4 pb-2 border-b items-center justify-center"
        >
          <Import class="w-6 h-6" />
          <h2 class="text-xl font-semibold">Import Lecturer</h2>
        </div>

        <div
          class="w-full p-6 border border-dashed border-grey-primary rounded-lg"
          @dragover.prevent="handleDragOver"
          @dragleave.prevent="handleDragLeave"
          @drop.prevent="handleDrop"
          :class="{ 'bg-gray-200': isDragging }"
        >
          <div class="flex flex-col items-center justify-center gap-4 w-72">
            <div class="flex flex-col items-center gap-4">
              <div class="text-grey-primary text-sm">
                Drag and Drop File Here
              </div>
              <button
                @click="triggerImportFileInput"
                class="font-medium text-center py-3 px-4 border rounded-lg"
              >
                Browse File
              </button>
              <p
                v-if="invalidFileImport"
                class="text-sm text-red-500 text-center"
              >
                Invalid File Format
              </p>
            </div>
            <input
              type="file"
              ref="importFileInput"
              @change="handleFileSelect"
              class="hidden"
              accept=".xlsx, .xls, .csv"
              multiple
            />
          </div>
        </div>
        <p
          v-if="selectedFiles.length"
          class="text-sm text-black-primary text-start mt-4"
        >
          Selected Files:
          {{ selectedFiles.map((file) => file.name).join(", ") }}
        </p>

        <div class="flex flex-row gap-4 w-full mt-6">
          <button
            v-if="selectedFiles.length"
            @click="importFromExcel"
            class="font-medium text-center py-3 bg-yellow-primary rounded-lg w-full"
            :disabled="!selectedFiles.length"
          >
            Import
          </button>
          <button
            @click="$emit('close') && router.go()"
            class="font-medium text-center py-3 bg-grey-secondary rounded-lg w-full"
          >
            Cancel
          </button>
        </div>
      </div>
      <div v-if="importDone" class="bg-white p-6 rounded-2xl shadow-lg">
        <div
          class="flex flex-row justify-between items-center gap-12 pb-2 border-b"
        >
          <div class="w-full flex flex-row gap-4 items-center">
            <div class="rounded-full bg-grey-primary h-16 w-16">
              <img
                :src="
                  users[currentPage - 1].picture ||
                  'https://thumbs.dreamstime.com/b/arabic-business-man-traditional-muslim-hat-placeholder-102337208.jpg'
                "
                alt="Profile Picture"
                class="h-full w-full object-cover rounded-full"
              />
            </div>
            <div class="flex flex-col">
              <div class="flex flex-row border border-grey-primary rounded-xl">
                <div class="text-base px-4 py-2 text-grey-primary rounded-xl">
                  {{ users[currentPage - 1].pictureName || "file name" }}
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
          <div class="flex flex-row gap-2">
            <button
              @click="deleteUser"
              class="flex items-center justify-center rounded-xl w-12 h-12 border hover:bg-red-500 hover:text-white"
            >
              <Delete class="w-6 h-6" />
            </button>
            <button
              @click="$emit('close')"
              class="flex items-center justify-center rounded-xl px-3 h-12 border hover:bg-black-primary hover:text-white font-medium"
            >
              Close
            </button>
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
                  v-model="users[currentPage - 1].academic_position_en"
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
                  v-model="users[currentPage - 1].academic_position_th"
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
                  v-model="users[currentPage - 1].first_name_en"
                  class="w-full border text-black border-grey-tertiary rounded-xl p-3 outline-grey-tertiary"
                  type="text"
                  placeholder="First Name"
                />
              </div>
              <div class="flex flex-col gap-1 min-w-64">
                <div class="text-grey-primary text-sm">Last Name - English</div>
                <input
                  v-model="users[currentPage - 1].last_name_en"
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
                  v-model="users[currentPage - 1].first_name_th"
                  class="col-span-2 w-full border text-black border-grey-tertiary rounded-xl p-3 outline-grey-tertiary"
                  type="text"
                  placeholder="First name"
                />
              </div>
              <div class="flex flex-col gap-1 min-w-64">
                <div class="text-grey-primary text-sm">Last Name - ไทย</div>
                <input
                  v-model="users[currentPage - 1].last_name_th"
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
              v-model="users[currentPage - 1].email"
              class="w-full border text-black border-grey-tertiary rounded-xl p-3 outline-grey-tertiary"
              type="text"
              placeholder="Email"
            />
          </div>
          <div class="flex flex-col gap-1 min-w-64 mt-2">
            <div class="text-grey-primary text-sm">Role</div>
            <div class="flex flex-col gap-2">
              <div
                v-for="(role, index) in users[currentPage - 1].role"
                :key="index"
                class="flex items-center gap-2 w-full"
              >
                <div class="p-3 border border-grey-tertiary rounded-xl w-full">
                  <select
                    v-model="users[currentPage - 1].role[index]"
                    class="w-full text-black rounded-xl outline-none hover:cursor-pointer"
                  >
                    <option value="" disabled>Select Role</option>
                    <option value="Lecturer">Lecturer</option>
                    <option value="Moderator">Moderator</option>
                    <option value="Criteria Manager">Criteria Manager</option>
                    <option value="TABEE Manager">TABEE Manager</option>
                    <option value="ABET Manager">ABET Manager</option>
                    <option value="AUN-QA Manager">AUN-QA Manager</option>
                    <option value="Head of Curriculum">
                      Head of Curriculum
                    </option>
                  </select>
                </div>
                <button
                  @click="deleteRole(users[currentPage - 1], index)"
                  class="flex items-center justify-center rounded-xl p-2 border hover:bg-red-500 hover:text-white"
                >
                  <Delete class="w-6 h-6" />
                </button>
              </div>
              <button
                @click="addRole(users[currentPage - 1])"
                class="flex items-center justify-center rounded-xl p-3 border hover:bg-black-primary hover:text-white"
              >
                Add Role
              </button>
            </div>
          </div>

          <div class="flex flex-col gap-1 w-full mt-2">
            <div class="text-grey-primary text-sm">Degree - English</div>
            <div class="flex flex-col gap-2">
              <div
                v-for="(degree, index) in users[currentPage - 1].degree_en"
                :key="index"
                class="flex items-center gap-2"
              >
                <input
                  v-model="users[currentPage - 1].degree_en[index]"
                  class="w-full border text-black border-grey-tertiary rounded-xl p-3 outline-grey-tertiary"
                  type="text"
                  placeholder="Degree"
                />
                <button
                  @click="deleteDegree_en(users[currentPage - 1], index)"
                  class="flex items-center justify-center rounded-xl p-2 border hover:bg-red-500 hover:text-white"
                >
                  <Delete class="w-6 h-6" />
                </button>
              </div>
              <button
                @click="addDegree_en(users[currentPage - 1])"
                class="flex items-center justify-center rounded-xl p-3 border hover:bg-black-primary hover:text-white"
              >
                Add Degree
              </button>
            </div>
          </div>
          <div class="flex flex-col gap-1 w-full mt-2">
            <div class="text-grey-primary text-sm">Degree - ไทย</div>
            <div class="flex flex-col gap-2">
              <div
                v-for="(degree, index) in users[currentPage - 1].degree_th"
                :key="index"
                class="flex items-center gap-2"
              >
                <input
                  v-model="users[currentPage - 1].degree_th[index]"
                  class="w-full border text-black border-grey-tertiary rounded-xl p-3 outline-grey-tertiary"
                  type="text"
                  placeholder="Degree"
                />
                <button
                  @click="deleteDegree_th(users[currentPage - 1], index)"
                  class="flex items-center justify-center rounded-xl p-2 border hover:bg-red-500 hover:text-white"
                >
                  <Delete class="w-6 h-6" />
                </button>
              </div>
              <button
                @click="addDegree_th(users[currentPage - 1])"
                class="flex items-center justify-center rounded-xl p-3 border hover:bg-black-primary hover:text-white"
              >
                Add Degree
              </button>
            </div>
          </div>
        </div>
        <div class="flex justify-end mt-4 gap-4">
          <div class="w-full font-medium text-center py-3 border rounded-lg">
            Total Lecturer : {{ totalPages }}
          </div>
          <div class="w-full font-medium text-center border rounded-lg">
            <div class="flex justify-center items-center mt-2">
              <div v-if="currentPage == 1" class="w-6 h-6 mr-2"></div>
              <button
                v-if="currentPage != 1"
                @click="prevPage"
                class="flex items-center justify-center bg-white rounded-xl p-2 mr-2"
                :disabled="currentPage === 1"
              >
                <ArrowRight class="w-4 h-4 rotate-180" />
              </button>
              <div class="flex items-center justify-center gap-2">
                <span class="text-sm text-grey-primary">Lecturer</span>
                <span class="text-sm text-black-primary font-semibold">{{
                  currentPage
                }}</span>
                <span class="text-sm text-grey-primary">of</span>
                <span class="text-sm text-black-primary font-semibold">{{
                  totalPages
                }}</span>
              </div>
              <div v-if="currentPage == totalPages" class="w-6 h-6 ml-2"></div>
              <button
                v-if="currentPage != totalPages"
                @click="nextPage"
                class="flex items-center justify-center bg-white rounded-xl p-2 ml-2"
                :disabled="currentPage === totalPages"
              >
                <ArrowRight class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-2 mt-4 gap-4">
          <ImportButton
            @click="ImportUser(users[currentPage - 1])"
            class="flex items-center flex-row justify-center border bg-yellow-primary rounded-xl w-full py-3 gap-2"
          >
            <span class="text-black-primary font-semibold text-base"
              >Import</span
            >
          </ImportButton>
          <ImportAllButton
            @click="importAll"
            class="flex items-center flex-row justify-center border bg-black-primary rounded-xl w-full py-3 gap-2"
          >
            <span class="text-white font-semibold text-base">Import All</span>
          </ImportAllButton>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { ref, defineEmits, onMounted } from "vue";
import { useRouter } from "vue-router";
import ImportButton from "@/components/button/ImportButton.vue";
import ImportAllButton from "@/components/button/ImportAllButton.vue";
import ArrowRight from "@/components/icons/ArrowRight.vue";
import Delete from "@/components/icons/Delete.vue";
import Import from "@/components/icons/Import.vue";
import base_url from "@/config/api";
import * as XLSX from "xlsx";

const emit = defineEmits(["close"]);
const router = useRouter();

const users = ref([]);
const invalidPicture = ref(false);
const importDone = ref(false);
const invalidFileImport = ref(false);
const isDragging = ref(false);
const selectedFiles = ref([]);
const currentPage = ref(1);
const totalPages = ref(1);
const totalLecturer = ref(0);

const fileInput = ref(null);
const importFileInput = ref(null);

const addDegree_en = (user) => {
  user.degree_en.push("");
};

const addDegree_th = (user) => {
  user.degree_th.push("");
};

const addRole = (user) => {
  user.role.push("");
};

const deleteDegree_en = (user, index) => {
  user.degree_en.splice(index, 1);
};

const deleteDegree_th = (user, index) => {
  user.degree_th.splice(index, 1);
};

const deleteRole = (user, index) => {
  user.role.splice(index, 1);
};

const triggerFileInput = () => {
  fileInput.value.click();
};

const triggerImportFileInput = () => {
  importFileInput.value.click();
};

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file && file.size <= 10 * 1024 * 1024) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const user = users.value[currentPage.value - 1];
      user.picture = e.target.result;
      user.pictureName = file.name;
    };
    reader.readAsDataURL(file);
  } else {
    invalidPicture.value = true;
  }
};

const handleFileSelect = (event) => {
  const files = Array.from(event.target.files);
  const validFiles = files.filter((file) =>
    file.name.match(/\.(xlsx|xls|csv)$/)
  );
  if (validFiles.length !== files.length) {
    invalidFileImport.value = true;
    return;
  }
  invalidFileImport.value = false;
  selectedFiles.value = validFiles;
};

const handleDragOver = (event) => {
  event.preventDefault();
  isDragging.value = true;
};

const handleDragLeave = () => {
  isDragging.value = false;
};

const handleDrop = (event) => {
  event.preventDefault();
  isDragging.value = false;
  const files = Array.from(event.dataTransfer.files);
  handleFileSelect({ target: { files } });
};

const ImportUser = (user) => {
  fetch(base_url + "users", {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      picture: user.picture,
      academic_position_en: user.academic_position_en,
      academic_position_th: user.academic_position_th,
      first_name_en: user.first_name_en,
      last_name_en: user.last_name_en,
      first_name_th: user.first_name_th,
      last_name_th: user.last_name_th,
      email: user.email,
      role: user.role.map((r) => r.toUpperCase().replace(" ", "_")).join(","),
      degree_en: user.degree_en.join(","),
      degree_th: user.degree_th.join(","),
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        console.log(data);
        user.value.role = user.value.role.filter((role) => role !== "");
        user.value.degree = user.value.degree.filter((degree) => degree !== "");
        invalidPicture.value = false;
      } else {
        console.log(data.error.message);
      }
    });
  deleteUser();
};

const deleteUser = () => {
  users.value.splice(currentPage.value - 1, 1);
  totalPages.value = users.value.length;
  if (currentPage.value > totalPages.value) {
    currentPage.value = totalPages.value;
  }
};

const importAll = () => {
  const promises = users.value.map((user) => {
    fetch(base_url + "users", {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        picture: user.picture,
        academic_position_en: user.academic_position_en,
        academic_position_th: user.academic_position_th,
        first_name_en: user.first_name_en,
        last_name_en: user.last_name_en,
        first_name_th: user.first_name_th,
        last_name_th: user.last_name_th,
        email: user.email,
        role: user.role.map((r) => r.toUpperCase().replace(" ", "_")).join(","),
        degree_en: user.degree_en.join(","),
        degree_th: user.degree_th.join(","),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) {
          throw new Error(data.error.message);
        }
        return data;
      });
  });

  Promise.all(promises)
    .then((results) => {
      console.log("All users imported successfully:", results);
      users.value = [];
      totalPages.value = 0;
      currentPage.value = 1;
      importDone.value = false;
    })
    .catch((error) => {
      console.error("Error importing users:", error);
    });
  emit("close");
  router.go();
};

const importFromExcel = () => {
  if (!selectedFiles.value.length) return;

  selectedFiles.value.forEach((file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      console.log("Parsed JSON Data:", jsonData);

      const headers = jsonData[0];
      const values = jsonData.slice(1);

      values.forEach((row) => {
        const userData = {
          picture: "",
          pictureName: "",
          academic_position_en: "",
          academic_position_th: "",
          first_name_en: "",
          last_name_en: "",
          first_name_th: "",
          last_name_th: "",
          email: "",
          role: [""],
          degree_en: [""],
          degree_th: [""],
        };
        headers.forEach((header, index) => {
          switch (header) {
            case "Picture":
              userData.picture = "";
              break;
            case "Academic Position (EN)":
              userData.academic_position_en = row[index];
              break;
            case "Academic Position (TH)":
              userData.academic_position_th = row[index];
              break;
            case "First Name (EN)":
              userData.first_name_en = row[index];
              break;
            case "Last Name (EN)":
              userData.last_name_en = row[index];
              break;
            case "First Name (TH)":
              userData.first_name_th = row[index];
              break;
            case "Last Name (TH)":
              userData.last_name_th = row[index];
              break;
            case "Email":
              userData.email = row[index];
              break;
            case "Role":
              userData.role = row[index] ? row[index].split(", ") : [];
              break;
            case "Degree (EN)":
              userData.degree_en = row[index] ? row[index].split(", ") : [];
              break;
            case "Degree (TH)":
              userData.degree_th = row[index] ? row[index].split(", ") : [];
              break;
            default:
              break;
          }
        });
        users.value.push(userData);
      });

      console.log("Updated Users Array:", users.value);

      totalLecturer.value = users.value.length;
      totalPages.value = totalLecturer.value;
      importDone.value = true;
    };
    reader.readAsArrayBuffer(file);
  });
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
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

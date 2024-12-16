<template>
  <teleport to="body">
    <div
      class="w-full h-full fixed inset-0 flex items-center justify-center bg-black-primary bg-opacity-50 z-50"
    >
      <div class="bg-white p-6 rounded-2xl shadow-lg">
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
                {{ user.academic_position_en }} {{ user.first_name_en }}
                {{ user.last_name_en }}
              </div>
              <div
                class="text-sm text-black-primary text-start mt-1 flex flex-row gap-2"
              >
                <role v-for="(role, index) in user.role" :key="index">
                  <div class="p-1 px-3 bg-grey-tertiary rounded-lg border">
                    {{ role.replace(/_/g, " ")
                      .toLowerCase()
                      .replace(/\b\w/g, (char) => char.toUpperCase()) }}
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

          <div v-if="!editMode && !deleteMode" class="flex flex-row gap-2">
            <button
              @click="handleEdit"
              class="flex items-center justify-center rounded-xl p-2 border hover:bg-black-primary hover:text-white"
            >
              <Edit class="w-6 h-6" />
            </button>
            <button
              @click="handleDelete"
              class="flex items-center justify-center rounded-xl p-2 border hover:bg-red-500 hover:text-white"
            >
              <Delete class="w-6 h-6" />
            </button>
          </div>
        </div>
        <div
          v-if="!deleteMode"
          class="max-h-[calc(100vh-385px)] overflow-y-scroll scrollbar-set mt-4"
        >
          <div class="flex flex-col gap-2">
            <div class="grid grid-cols-2 gap-4 mt-2">
              <div class="flex flex-col gap-1 min-w-64">
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
              <div class="flex flex-col gap-1 min-w-64">
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
              <div class="flex flex-col gap-1 min-w-64">
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
              <div class="flex flex-col gap-1 min-w-64">
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
            <div class="grid grid-cols-2 gap-4 mt-2">
              <div class="flex flex-col gap-1 min-w-64">
                <div class="col-span-1 text-grey-primary text-sm">
                  First Name - ไทย
                </div>
                <div
                  v-if="!editMode"
                  class="col-span-2 border text-black border-grey-tertiary rounded-xl p-3"
                >
                  {{ user.first_name_th }}
                </div>
                <input
                  v-if="editMode"
                  v-model="user.first_name_th"
                  class="col-span-2 w-full border text-black border-grey-tertiary rounded-xl p-3 outline-grey-tertiary"
                  type="text"
                  :placeholder="user.first_name_th"
                />
              </div>
              <div class="flex flex-col gap-1 min-w-64">
                <div class="col-span-1 text-grey-primary text-sm">
                  Last Name - ไทย
                </div>
                <div
                  v-if="!editMode"
                  class="col-span-2 border text-black border-grey-tertiary rounded-xl p-3"
                >
                  {{ user.last_name_th }}
                </div>
                <input
                  v-if="editMode"
                  v-model="user.last_name_th"
                  class="col-span-2 w-full border text-black border-grey-tertiary rounded-xl p-3 outline-grey-tertiary"
                  type="text"
                  :placeholder="user.last_name_th"
                />
              </div>
            </div>
          </div>
          <div class="flex flex-col gap-1 min-w-64 mt-2">
            <div class="text-grey-primary text-sm">Email</div>
            <div
              v-if="!editMode"
              class="border text-black border-grey-tertiary rounded-xl p-3"
            >
              {{ user.email }}
            </div>
            <input
              v-if="editMode"
              v-model="user.email"
              class="w-full border text-black border-grey-tertiary rounded-xl p-3 outline-grey-tertiary"
              type="text"
              placeholder="Email"
            />
          </div>
          <div class="flex flex-col gap-1 min-w-64 mt-2">
            <div class="text-grey-primary text-sm">Role</div>
            <div
              v-if="!editMode"
              class="border text-black border-grey-tertiary rounded-xl p-3"
            >
              <ul>
                <li v-for="(role, index) in user.role" :key="index">
                  {{ role.replace(/_/g, " ")
                      .toLowerCase()
                      .replace(/\b\w/g, (char) => char.toUpperCase()) }}
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
            <div class="col-span-1 text-grey-primary text-sm">Degree - English</div>
            <div
              v-if="!editMode"
              class="col-span-2 border text-black border-grey-tertiary rounded-xl p-3"
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
                  class="col-span-2 w-full border text-black border-grey-tertiary rounded-xl p-3 outline-grey-tertiary"
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
          </div>  <div class="flex flex-col gap-1 w-full mt-2">
            <div class="col-span-1 text-grey-primary text-sm">Degree - ไทย</div>
            <div
              v-if="!editMode"
              class="col-span-2 border text-black border-grey-tertiary rounded-xl p-3"
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
                  class="col-span-2 w-full border text-black border-grey-tertiary rounded-xl p-3 outline-grey-tertiary"
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
          <div class="flex flex-col gap-1 w-full mt-2">
            <div class="col-span-1 text-grey-primary text-sm">
              Courses
              <span class="text-yellow-primary">({{ courses.length }})</span>
            </div>
            <div class="flex flex-row gap-4 mb-2">
              <div
                class="px-4 py-3 bg-white border border-grey-secondary rounded-xl flex flex-row gap-4 items-center"
              >
                <input
                  type="text"
                  v-model="searchQuery"
                  class="bg-transparent border-none focus:ring-0 outline-none text-base w-40"
                  placeholder="Search..."
                />
                <button
                  class="flex items-center justify-center bg-white rounded-xl"
                  @click="handleSearch"
                >
                  <Search class="w-6 h-6" />
                </button>
              </div>
              <div
                class="px-4 py-3 bg-white border border-grey-secondary rounded-xl flex flex-row gap-4 items-center"
              >
                <select
                  v-model="selectedProgramOption"
                  class="bg-transparent border-none focus:ring-0 outline-none text-base pr-2 hover:cursor-pointer"
                >
                  <option value="">All Programs</option>
                  <option
                    v-for="option in programOptions"
                    :key="option"
                    :value="option"
                  >
                    {{ option }}
                  </option>
                </select>
              </div>
              <div
                class="px-4 py-3 bg-white border border-grey-secondary rounded-xl flex flex-row gap-4 items-center"
              >
                <select
                  v-model="selectedYearOption"
                  class="bg-transparent border-none focus:ring-0 outline-none text-base pr-2 hover:cursor-pointer"
                >
                  <option value="">All Years</option>
                  <option
                    v-for="option in yearsOptions"
                    :key="option"
                    :value="option"
                  >
                    {{ option }}
                  </option>
                </select>
              </div>
            </div>
            <div class="flex gap-4 flex-col">
              <div
                v-for="course in courses"
                :key="course.semester_id"
                class="bg-white border border-grey-tertiary shadow-sm rounded-xl p-6"
              >
                <div class="flex flex-row justify-between gap-6 items-center">
                  <button @click="overviewCourse(course.code)">
                    <p class="text-base text-start font-semibold text-grey-600">
                      {{ course.code }}
                    </p>
                    <p class="text-base text-start font-semibold">
                      {{ course.name }}
                    </p>
                  </button>
                  <div>
                    <div class="flex flex-row gap-2">
                      <button
                        @click="overviewCourse(course.code)"
                        class="flex items-center flex-row justify-center border border-grey-secondary hover:bg-black-primary text-black-primary hover:text-white rounded-xl px-4 py-3 gap-2"
                      >
                        <span class="font-semibold text-base">Overview</span>
                      </button>
                    </div>
                  </div>
                </div>
                <p class="text-sm text-orange-primary text-start">
                  {{ course.curriculum }}
                </p>
                <p class="text-sm text-grey-primary text-start">
                  credits : {{ course.credits }}
                </p>
                <div class="flex flex-row gap-2 mt-4">
                  <Lecturer class="w-6 h-6" />
                  <p class="text-sm text-grey-primary">
                    {{ course.user.first_name }}
                  </p>
                </div>
                <div class="grid grid-cols-2 gap-4 items-center mt-1">
                  <div class="flex flex-row gap-2">
                    <Course class="w-6 h-6" />
                    <p class="text-sm text-grey-primary">
                      Acadamic Year : {{ course.academic_year }}
                    </p>
                  </div>
                  <div class="flex flex-row gap-2 items-center">
                    <Course class="w-6 h-6" />
                    <p class="text-sm text-grey-primary">
                      Graduate Year : {{ course.graduate_year }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="deleteMode" class="mt-4 w-full">
          <div class="flex flex-col gap-1 w-full">
            <div class="col-span-1 text-grey-primary text-sm">
              Type "delete/{{ user.first_name_en }}" to delete
            </div>
            <input
              v-model="deleteUser"
              class="col-span-2 border text-black border-grey-tertiary rounded-xl p-3 outline-grey-tertiary w-96"
              type="text"
              placeholder="Type here..."
            />
            <div
              v-if="checkDelete"
              class="text-red-500 text-sm text-left w-full mt-1"
            >
              Incorrect input
            </div>
          </div>
        </div>
        <button
          v-if="!editMode && !deleteMode"
          @click="$emit('close')"
          class="mt-8 font-medium w-full text-center py-3 bg-grey-secondary hover:bg-black-primary hover:text-white rounded-lg"
        >
          Close
        </button>
        <div v-if="editMode && !deleteMode" class="flex flex-row gap-4 mt-8">
          <button
            @click="handleSaveEdit"
            class="w-full font-medium text-center py-3 bg-yellow-primary rounded-lg"
          >
            Save
          </button>
          <button
            @click="handleCancelEdit"
            class="w-full font-medium text-center py-3 bg-grey-secondary rounded-lg"
          >
            Cancel
          </button>
        </div>
        <div v-if="deleteMode && !editMode" class="flex flex-row gap-4 mt-8">
          <button
            @click="handleConfirmDelete"
            class="w-full font-medium text-center py-3 bg-yellow-primary rounded-lg"
          >
            Confirm
          </button>
          <button
            @click="handleCancelDelete"
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
import { ref, computed } from "vue";
import Course from "@/components/icons/Course.vue";
import Lecturer from "@/components/icons/Lecturer.vue";
import Edit from "@/components/icons/Edit.vue";
import Delete from "@/components/icons/Delete.vue";
import Search from "@/components/icons/Search.vue";
import base_url from "@/config/api";
const emit = defineEmits(["close"]);

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

const user = ref({
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
});

onMounted(() => {
  fetch(base_url + "users/" + props.userId, {
    credentials: "include",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      user.value = json.data;
      user.value.role = json.data.role.split(",");
      user.value.degree_en = json.data.degree_en.split(",");
      user.value.degree_th = json.data.degree_th.split(",");
      console.log(user.value);
    });
});

// onActivated(() => {
//   fetch(base_url + "users/" + props.userId, {
//     credentials: "include",
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   })
//     .then((response) => response.json())
//     .then((json) => {
//       users.value = json.data;
//       console.log(user.value);
//     });
// });

const userDegree_en = ref([]);
const userDegree_th = ref([]);

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

const editMode = ref(false);
const deleteMode = ref(false);

const searchQuery = ref("");
const selectedProgramOption = ref("");
const selectedYearOption = ref("");

const programOptions = ref(getProgramOptions());
const yearsOptions = ref(getYearsOptions());

function getYearsOptions() {
  return ["2021", "2022", "2023", "2024"];
}

import { useRouter } from "vue-router";
const router = useRouter();

const overviewCourse = (code) => {
  router.push(`/courses/overview/${code}`);
};

function getProgramOptions() {
  return [
    "Regular",
    "International",
    "Health Data Science",
    "Ratchaburi Campus",
  ];
}

function handleSearch() {
  console.log("Search query:", searchQuery.value);
}

const props = defineProps({
  userId: {
    type: Number,
    required: true,
  },
});

const handleEdit = () => {
  editMode.value = !editMode.value;
  user.value = {
    ...user.value,
    degree_en: user.value.degree_en.split(","),
    degree_th: user.value.degree_th.split(","),
  };
  userDegree_en.value = user.value.degree_en;
  userDegree_th.value = user.value.degree_th;
};

const handleDelete = () => {
  deleteMode.value = !deleteMode.value;
};

const userJSON = (user) => {
  return {
    picture: user.value.picture,
    academic_position_en: user.value.academic_position_en,
    academic_position_th: user.value.academic_position_th,
    first_name_en: user.value.first_name_en,
    last_name_en: user.value.last_name_en,
    first_name_th: user.value.first_name_th,
    last_name_th: user.value.last_name_th,
    email: user.value.email,
    role: user.value.role.join(","),
    degree_en: user.value.degree_en.join(","),
    degree_th: user.value.degree_th.join(","),
  };
};

const handleSaveEdit = () => {
  console.log("Save Edit");
  user.value.role = user.value.role.filter((role) => role !== "");
  user.value.degree_en = user.value.degree_en.filter((degree_en) => degree_en !== "");
  user.value.degree_th = user.value.degree_th.filter((degree_th) => degree_th !== "");

  fetch(base_url + "users/" + props.userId, {
    credentials: "include",
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userJSON(user)),
  })
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
    });

  console.log(user.value);

  editMode.value = !editMode.value;
};



const handleCancelEdit = () => {
  console.log("Cancel Edit");
  editMode.value = !editMode.value;
};

const deleteUser = ref("");
const checkDelete = ref(false);

const handleConfirmDelete = () => {
  if (deleteUser.value === `delete/${user.value.first_name_en}`) {
    console.log("Confirm Delete");

    fetch(base_url + "users/" + props.userId, {
      credentials: "include",
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
      });
    deleteMode.value = !deleteMode.value;
    emit("close");
    router.go();
  } else {
    checkDelete.value = true;
    console.log("Incorrect input");
  }
};

const handleCancelDelete = () => {
  console.log("Cancel Delete");
  deleteMode.value = !deleteMode.value;
  deleteUser.value = "";
  checkDelete.value = false;
};

const courses = ref([
  {
    id: "CPE123",
    name: "Computer Engineering",
    code: "CPE123",
    curriculum: "Computer Science",
    description: "This course introduces the fundamentals of programming.",
    expected_passing_clo_percentage: 85,
    is_portfolio_completed: false,
    portfolio_data: {},
    academic_year: 2024,
    graduate_year: 2028,
    credits: 3,
    program_year: 1,
    semester_id: "01JD1P61GEB6SE52AW5KZ2ZXW9",
    user_id: "01",
    criteria_grade_a: 90,
    criteria_grade_bp: 85,
    criteria_grade_b: 80,
    criteria_grade_cp: 75,
    criteria_grade_c: 70,
    criteria_grade_dp: 65,
    criteria_grade_d: 60,
    criteria_grade_f: 50,
    semester: {
      id: "01JD1P61GEB6SE52AW5KZ2ZXW9",
      year: 2024,
      semester_sequence: "1",
    },
    user: {
      id: "01K",
      email: "lecturer_1@inu.com",
      password: "$2a$10",
      first_name: "lecturer",
      last_name: "1",
      role: "LECTURER",
    },
  },
  {
    id: "CPE202",
    name: "Introduction to Programming",
    code: "CPE202",
    curriculum: "Computer Science",
    description: "This course introduces the fundamentals of programming.",
    expected_passing_clo_percentage: 85,
    is_portfolio_completed: false,
    portfolio_data: {},
    academic_year: 2024,
    graduate_year: 2028,
    credits: 3,
    program_year: 1,
    semester_id: "01JD1P61GEB6SE52AW5KZ2ZXW9",
    user_id: "01",
    criteria_grade_a: 90,
    criteria_grade_bp: 85,
    criteria_grade_b: 80,
    criteria_grade_cp: 75,
    criteria_grade_c: 70,
    criteria_grade_dp: 65,
    criteria_grade_d: 60,
    criteria_grade_f: 50,
    semester: {
      id: "01JD1P61GEB6SE52AW5KZ2ZXW9",
      year: 2024,
      semester_sequence: "1",
    },
    user: {
      id: "01",
      email: "lecturer_1@inu.com",
      password: "$2",
      first_name: "lecturer",
      last_name: "1",
      role: "LECTURER",
    },
  },
  {
    id: "LNG101",
    name: "Oral Communication in English",
    code: "LNG101",
    curriculum: "Computer Science",
    description: "This course introduces the fundamentals of programming.",
    expected_passing_clo_percentage: 85,
    is_portfolio_completed: false,
    portfolio_data: {},
    academic_year: 2024,
    graduate_year: 2028,
    credits: 3,
    program_year: 1,
    semester_id: "01JD1P61GEB6SE52AW5KZ2ZXW9",
    user_id: "01",
    criteria_grade_a: 90,
    criteria_grade_bp: 85,
    criteria_grade_b: 80,
    criteria_grade_cp: 75,
    criteria_grade_c: 70,
    criteria_grade_dp: 65,
    criteria_grade_d: 60,
    criteria_grade_f: 50,
    semester: {
      id: "01JD1P61GEB6SE52AW5KZ2ZXW9",
      year: 2024,
      semester_sequence: "1",
    },
    user: {
      id: "01",
      email: "lecturer_1@inu.com",
      password: "$2",
      first_name: "lecturer",
      last_name: "1",
      role: "LECTURER",
    },
  },
]);
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
const BaseURL = api();

export function stage() {
  if (typeof window !== "undefined" && window.location) {
    return window.location.hostname === "localhost" ? "dev" : "prod";
  }
  return "prod";
}

export function api() {
  if (stage() === "dev") {
    return "https://localhost/";
  } else {
    return "https://api.example.com";
  }
}

const fetchMe = async (userStore, router, loading) => {
  try {
    const response = await fetch(BaseURL + "auth/me", {
      credentials: "include",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) throw new Error("Failed to fetch user");
    const res = await response.json();
    userStore.setUserData(res.data);
  } catch (error) {
    console.error("Error fetching user:", error);
    router.push("/login");
  }

  loading.value = false;
};

const fetchCourses = async (courses, query, serm, program) => {
  try {
    const response = await fetch(
      `${BaseURL}courses?query=${query}&serm=${serm}&program=${program}`,
      {
        credentials: "include",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) throw new Error("Failed to fetch courses");
    const res = await response.json();
    courses.value = res.data.courses;
  } catch (error) {
    courses.value = [];
    console.error("Error fetching courses:", error);
  }
};

const fetchCourse = async (course, course_id) => {
  try {
    const response = await fetch(`${BaseURL}courses/${course_id}`, {
      credentials: "include",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) throw new Error("Failed to fetch course");
    const res = await response.json();
    course.value = res.data;
  } catch (error) {
    console.error("Error fetching course:", error);
  }
};

const fetchCourseResult = async (result, course_id) => {
  try {
    const response = await fetch(`${BaseURL}courses/${course_id}/result`, {
      credentials: "include",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) throw new Error("Failed to fetch result");
    const res = await response.json();
    result.value = res.data;
  } catch (error) {
    console.error("Error fetching result:", error);
  }
};

const fetchEnrollments = async (students, course_id, searchQuery) => {
  try {
    const response = await fetch(
      `${BaseURL}courses/${course_id}/enrollments?query=${searchQuery}`,
      {
        credentials: "include",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) throw new Error("Failed to fetch enrollments");
    const res = await response.json();
    students.value = res.data;
  } catch (error) {
    console.error("Error fetching enrollments:", error);
  }
};

const fetchPrograms = async (programs) => {
  try {
    const response = await fetch(`${BaseURL}programmes`, {
      credentials: "include",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) throw new Error("Failed to fetch programs");
    const res = await response.json();
    programs.value = res.data;
  } catch (error) {
    console.error("Error fetching programs:", error);
  }
};

const fetchSerms = async (serms) => {
  try {
    const response = await fetch(`${BaseURL}semesters`, {
      credentials: "include",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) throw new Error("Failed to fetch semesters");
    const res = await response.json();
    serms.value = res.data;
  } catch (error) {
    console.error("Error fetching semesters:", error);
  }
};

const fetchAssignments = async (assessments, course_id) => {
  try {
    const response = await fetch(`${BaseURL}courses/${course_id}/assignments`, {
      credentials: "include",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) throw new Error("Failed to fetch assignments");
    const res = await response.json();
    assessments.value = res.data;
  } catch (error) {
    console.error("Error fetching assignments:", error);
  }
};

const fetchScores = async (scores, clos, assignment_id) => {
  try {
    const response = await fetch(
      `${BaseURL}assignments/${assignment_id}/scores`,
      {
        credentials: "include",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) throw new Error("Failed to fetch scores");
    const res = await response.json();
    scores.value = res.data.scores;
    clos.value = res.data.clos;
  } catch (error) {
    console.error("Error fetching scores:", error);
  }
};

const fetchInstructors = async (instructors) => {
  try {
    const response = await fetch(`${BaseURL}users`, {
      credentials: "include",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) throw new Error("Failed to fetch instructors");
    const res = await response.json(); // Adjust based on API response structure
    instructors.value = res.data.data;
  } catch (error) {
    console.error("Error fetching instructors:", error);
  }
};

const fetchInstructor = (instructor, user_id) => {
  try {
    fetch(BaseURL + "users/" + user_id, {
      credentials: "include",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        instructor.value = json.data;
        instructor.value.role = json.data.role.split(",");
        instructor.value.degree_en = json.data.degree_en.split(",");
        instructor.value.degree_th = json.data.degree_th.split(",");
      });
  } catch (error) {
    console.error("Error fetching user:", error);
  }
};

const fetchInstructorCourses = async (courses, user_id) => {
  try {
    const response = await fetch(`${BaseURL}users/${user_id}/courses`, {
      credentials: "include",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) throw new Error("Failed to fetch courses");
    const res = await response.json();
    courses.value = res.data;
  } catch (error) {
    console.error("Error fetching courses:", error);
  }
};

const fetchReceivedFeedbacks = async (received_feedbacks, course_id) => {
  try {
    const response = await fetch(
      `${BaseURL}course-streams?targetCourseId=${course_id}`,
      {
        credentials: "include",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) throw new Error("Failed to fetch courses");
    const res = await response.json();
    received_feedbacks.value = res.data;
  } catch (error) {
    console.error(error);
  }
};

export {
  BaseURL,
  fetchMe,
  fetchCourses,
  fetchPrograms,
  fetchSerms,
  fetchAssignments,
  fetchScores,
  fetchCourse,
  fetchCourseResult,
  fetchEnrollments,
  fetchInstructors,
  fetchInstructor,
  fetchInstructorCourses,
  fetchReceivedFeedbacks,
};

import axios from "axios";

const HttpClient = axios.create({
  baseURL: "https://inu.bukharney.site/", // Replace with your API's base URL
  timeout: 10000, // Timeout for requests
  headers: {
    "Content-Type": "application/json",
  },
});

// // Example interceptor for adding authentication tokens
// httpClient.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token"); // Fetch token from storage
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// httpClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     // Global error handling
//     if (error.response?.status === 401) {
//       console.error("Unauthorized. Redirecting to login...");
//       // You can redirect or perform another action here
//     }
//     return Promise.reject(error);
//   }
// );

export default HttpClient;

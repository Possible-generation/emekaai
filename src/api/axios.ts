import axios from "axios";

const api = axios.create({
  // baseURL: "https://smart.ai.laiki-tech.online/api",
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 20000,
});

export default api;

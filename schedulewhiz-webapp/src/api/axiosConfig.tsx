import axios from "axios";
const BASE_URL = "http://192.168.3.110:8090";

const api = axios.create({
  baseURL: BASE_URL,
});

// Attach interceptor to this api
export const apiPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export default api;

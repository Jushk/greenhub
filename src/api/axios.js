import axios from "axios";

const BASE_URL = "http://localhost:3500/api/v1";

const authInstance = axios.create({
  baseURL: `${BASE_URL}/auth`,
});

const instance = axios.create({
  baseURL: `${BASE_URL}`,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export { authInstance, instance };

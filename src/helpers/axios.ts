import axios from "axios";

let headers = {};

const axiosInstance = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://api.timmy.dnet.ovh"
      : "http://localhost:4000",
  timeout: 3000,
  headers,
});

async function setToken(token: string) {
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

async function clearToken() {
  axiosInstance.defaults.headers.common["Authorization"] = null;
}

export { axiosInstance, setToken, clearToken };

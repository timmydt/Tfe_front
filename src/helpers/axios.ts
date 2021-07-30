import axios from "axios";

let headers = {};

const axiosInstance = axios.create({
  baseURL: "https://api.timmy.dnet.ovh",
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

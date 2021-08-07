import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://api.timmy.dnet.ovh"
      : "http://localhost:4000",
  timeout: 3000,
});

async function setToken(token: string) {
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

async function clearToken() {
  delete axiosInstance.defaults.headers.common["Authorization"];
}

export { axiosInstance, setToken, clearToken };

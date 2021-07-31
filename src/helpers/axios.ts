import axios from "axios";
import * as dotenv from "dotenv";

let headers = {};
dotenv.config();

const axiosInstance = axios.create({
  baseURL: process.env.SRV_URL,
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

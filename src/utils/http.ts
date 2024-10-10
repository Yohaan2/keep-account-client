import axios, { AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
})

axiosInstance.defaults.withCredentials = true;


export default axiosInstance;
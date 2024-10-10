import axiosInstance from "@/utils/http"

export const getUser = async () => {
  return axiosInstance.get("/auth/user")
}
import axiosInstance from "@/utils/http"
import Cookies from "js-cookie"

export const getUser = async () => {
  const token = Cookies.get('access_token')
  return axiosInstance.get("/auth/user", {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })
}
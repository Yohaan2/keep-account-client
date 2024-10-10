import { UserLogin, UserRegister } from "@/types/auth";
import axios from "@/utils/http";

export const register = async (data: UserRegister) => {
  return await axios.post("/auth/register", data);
}

export const login = async (data: UserLogin) => {
  return await axios.post("/auth/login", data);
}

export const logout = async () => {
  return await axios.get("/auth/logout");
}

export const verifyToken = async (accessToken: string) => {
  return await axios.get("/auth/verify-token", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    }
  });
}

export const refreshToken = async (refresh_Token: string) => {
  return await axios.get("/auth/refresh-token", {
    headers: {
      Authorization:`Bearer ${refresh_Token}`
    }
  });
}
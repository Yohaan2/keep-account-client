import { AddDebt, CreateClient } from "@/types/client"
import axiosInstance from "@/utils/http"
import Cookies from "js-cookie"

export const createClient = async (data: CreateClient) => {
  const token = Cookies.get('access_token')
  return await axiosInstance.post("/client/create", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })
}

export const getClients = async () => {
  const token = Cookies.get('access_token')
  return await axiosInstance.get("/client/get-clients", {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })
}

export const getDebtsById = async (id:string) => {
  const token = Cookies.get('access_token')
  return await axiosInstance.get(`/client/${id}/debts`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })
}

export const addDebt = async (data: AddDebt) => {
  const token = Cookies.get('access_token')
  const { id, ...restData } = data
  return await axiosInstance.put(`/client/${id}/record-debt`, restData, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })
}

export const deleteClient = async (id: string) => {
  const token = Cookies.get('access_token')
  return await axiosInstance.delete(`/client/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })
}

export const reduceAccount = async (data : {id: string, amount: number}) => {
  const token = Cookies.get('access_token')
  const {id, amount} = data
  return await axiosInstance.put(`/client/reduce-account/${id}`, {amount}, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })
}

export const resetAccount = async (id: string) => {
  const token = Cookies.get('access_token')
  console.log(id)
  console.log(token)
  return await axiosInstance.put(`/client/reset-account/${id}`, undefined, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export const setDollarPrice = async (amount: number) => {
  const token = Cookies.get('access_token')
  return await axiosInstance.post('/client/set-dollar-price', {amount}, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })
}
import { AddDebt, CreateClient } from "@/types/client"
import axiosInstance from "@/utils/http"

export const createClient = async (data: CreateClient) => {
  return await axiosInstance.post("/client/create", data)
}

export const getClients = async () => {
  return await axiosInstance.get("/client/get-clients")
}

export const getDebtsById = async (id:string) => {
  return await axiosInstance.get(`/client/${id}/debts`)
}

export const addDebt = async (data: AddDebt) => {
  const { id, ...restData } = data
  return await axiosInstance.put(`/client/${id}/record-debt`, restData)
}

export const deleteClient = async (id: string) => {
  return await axiosInstance.delete(`/client/${id}`)
}

export const reduceAccount = async (data : {id: string, amount: number}) => {
  const {id, amount} = data
  return await axiosInstance.put(`/client/reduce-account/${id}`, {amount})
}

export const resetAccount = async (id: string) => {
  return axiosInstance.put(`/client/reset-account/${id}`)
}

export const setDollarPrice = async (amount: number) => {
  return await axiosInstance.post('/client/set-dollar-price', {amount})
}
import { addDebt, createClient, deleteClient, getClients, getDebtsById, reduceAccount, resetAccount, setDollarPrice } from "@/modules/client"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

export const useCreateClient = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createClient,
    onSuccess(data) {
      const createClientInCache = (oldData: any) => {
        if (!oldData) return undefined;
        oldData?.data?.push(data.data)
        return oldData
      }
      queryClient.setQueryData(["clients"], createClientInCache)
    },
  })
}

export const useGetClients = () => {
  return useQuery({
    queryKey: ["clients"],
    queryFn: getClients,
    refetchOnWindowFocus: false
  })
}

export const useGetDebtsById = (id:string) => {
  return useQuery({
    queryKey: ["debts", id],
    queryFn: () => getDebtsById(id),
    refetchOnWindowFocus: false,
    enabled: !!id
  })
}

export const useAddDebt = () => {
  return useMutation({
    mutationFn: addDebt,
    onSuccess: (data, variable) => {
      console.log(data)
    }
  })
}

export const useDeleteClient = () => {
  const router = useRouter()
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteClient,
    onSuccess: (data, variable) => {
      console.log('variable', variable)
      const deleteClientInCache = (oldData: any) => {
        console.log('oldData', oldData)
        // if (!oldData) return undefined;
        oldData.data = oldData?.data?.filter(
          (item: any) => item.id !== variable
        )
        console.log('newData', oldData)

        return oldData
      }

      queryClient.setQueryData(["clients"], deleteClientInCache);
      router.push('/panel')
    }
  })
}

export const useReduceAccount = () => {
  return useMutation({
    mutationFn: reduceAccount,
    onSuccess: (data, variable) => {}
  })
}

export const useResetAccount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: resetAccount,
    onSuccess: (data, variable) => {
      const resetAccountInCache = (oldData: any) => {
        if (!oldData) return undefined;
        oldData.data = oldData?.data?.map((item: any) => {
          if (item.id === variable) {
            item = {
              ...item,
              total: 0,
              totalDolar: '0.00$',
              debt: [],
              discounts: []
            }
          }
          return item
        })
        return oldData
      }

      queryClient.setQueryData(["clients"], resetAccountInCache)
    }
  })
}

export const useSetDollarPrice = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: setDollarPrice,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"]})
    }
  })
}
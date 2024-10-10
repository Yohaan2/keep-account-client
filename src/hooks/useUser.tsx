import { getUser } from "@/modules/user"
import { useQuery } from "@tanstack/react-query"

export const useGetUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: getUser
  })
}
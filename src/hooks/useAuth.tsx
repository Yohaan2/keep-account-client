import { login, logout, register } from "@/modules/auth"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"


export const useRegister = () => {
  const router = useRouter()
  return useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      console.log(data)
      router.push("/panel")
    }
  })
}


export const useLogin = () => {
  const router = useRouter()
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      console.log(data)
      router.push("/panel")
    }
  })
}

export const useLogout = () => {
  const router = useRouter()
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      router.push("/login")
      console.log("logout")
    }
  })
}

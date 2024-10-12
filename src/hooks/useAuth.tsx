import { login, logout, register } from "@/modules/auth"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import Cookie from "js-cookie"


export const useRegister = () => {
  const router = useRouter()
  return useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      Cookie.set('access_token', data.data.access_token)
      Cookie.set('refresh_token', data.data.refresh_token)
      router.push("/panel")
    }
  })
}


export const useLogin = () => {
  const router = useRouter()
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      Cookie.set('access_token', data.data.access_token, {
        expires: 1000 * 60 * 60 * 24 * 2,
        path: '/',
        sameSite: 'none',
        secure: true
      })
      Cookie.set('refresh_token', data.data.refresh_token, {
        expires: 1000 * 60 * 60 * 24 * 10,
        path: '/',
        sameSite: 'none',
        secure: true
      })
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

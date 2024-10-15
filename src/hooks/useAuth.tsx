import { login, register } from "@/modules/auth"
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
        expires: 3,
        path: '/',
        secure: true
      })
      Cookie.set('refresh_token', data.data.refresh_token, {
        expires: 10,
        path: '/',
        secure: true
      })
      router.push("/panel")
    }
  })
}

export const useLogout = () => {
  const router = useRouter();
  return {
    logout: () => {
      Cookie.remove('access_token')
      Cookie.remove('refresh_token')
      router.push("/login")
    }
  }
}

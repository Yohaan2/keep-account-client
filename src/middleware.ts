import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { refreshToken, verifyToken } from './modules/auth'
import { AxiosError } from 'axios'

// This function can be marked `async` if using `await` inside
export async  function middleware(request: NextRequest) {
  // if(request.nextUrl.pathname === '/') return NextResponse.redirect(new URL("/panel", request.url))
  const access_Token = request.cookies.get('access_token')
  const refresh_Token = request.cookies.get('refresh_token')

  if(!access_Token?.value) return NextResponse.redirect(new URL("/login", request.url))
  if(!refresh_Token?.value) return NextResponse.redirect(new URL("/login", request.url))

  try {
    
    const data = await verifyToken(access_Token.value)
    console.log('token verificado, deberia funcionar', data?.data)
    return NextResponse.next()
    
  } catch (error) {
    console.log('El primer error', (error as AxiosError).response?.data)
    if((error as AxiosError).response?.status === 401) {

      try {
        const {data} = await refreshToken(refresh_Token?.value)
        const response = NextResponse.next();

            const cookieValue = data?.access_token
            const cookieValue2 = data?.refresh_token

            response.cookies.set('access_token', cookieValue, {
              maxAge: 60 * 60 * 24 * 3,
              path: '/',
              secure: true
            })
            response.cookies.set('refresh_token', cookieValue2, {
              maxAge: 60 * 60 * 24 * 10,
              path: '/',
              secure: true
            })

          console.log('Token refrescado')
          return response
        
      } catch (error) {
        console.log('Error al refrescar el token: ', error)
        return NextResponse.redirect(new URL("/login", request.url))
      }
    }
    else {
      console.error('Error en la validacion del token: ', (error as AxiosError).response?.data)
      return NextResponse.redirect(new URL("/login", request.url))
    }
  }
}

export const config = {
  matcher: ['/panel/:path*', '/registrar-cliente', '/perfil', '/configuracion', '/actualizar-dolar', '/'],
}
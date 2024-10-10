import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { refreshToken, verifyToken } from './modules/auth'
import { AxiosError } from 'axios'
// This function can be marked `async` if using `await` inside
export async  function middleware(request: NextRequest) {
  console.log(request.nextUrl.pathname)
  if(request.nextUrl.pathname === '/') return NextResponse.redirect(new URL("/panel", request.url))
  const access_Token = request.cookies.get('access_token')
  const refresh_Token = request.cookies.get('refresh_token')

  if(!access_Token) return NextResponse.redirect(new URL("/login", request.url))
  if(!refresh_Token) return NextResponse.redirect(new URL("/login", request.url))

  try {
    
    await verifyToken(access_Token.value)
    return NextResponse.next()
    
  } catch (error) {
    console.log('El primer error', (error as AxiosError).response?.data)
    if((error as AxiosError).response?.status === 401) {

      try {
        const response = NextResponse.next();
        const {headers} = await refreshToken(refresh_Token?.value)
        const setCookies = headers['set-cookie']
        if (setCookies) {
          const cookies = Array.isArray(setCookies) ? setCookies : [setCookies];

            const cookieArr = cookies[0].split(',')
            cookieArr.forEach(cookie => {
              const cookieName = cookie.split(';')[0].split('=')[0]
              const cookieValue = cookie.split(';')[0].split('=')[1]

              response.cookies.set(cookieName, cookieValue,{
                httpOnly: true,
                path: '/',
                maxAge: cookieName === 'access_token' ? 1000 * 60 * 60 * 24 * 2 : 1000 * 60 * 60 * 24 * 10
              })
            })
            console.log('Token refrescado')
            return response
            
        }
      } catch (error) {
        console.log('Error al refrescar el token: ', (error as AxiosError).response?.data)
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
  matcher: ['/panel/:path*', '/registrar-cliente', '/perfil', '/configuracion', '/'],
}
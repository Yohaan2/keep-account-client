"use client"
import DefaultLayout from '@/components/Layouts/DefaultLaout'
import { usePathname } from 'next/navigation'
import React from 'react'

function ProtectedLayout({children}: {children: React.ReactNode}) {
  const pathname = usePathname()
  const isAuth = pathname === '/login' || pathname === '/register'

  if (isAuth) {
    return <>{children}</>
  }
  return (
    <DefaultLayout>
      {children}
    </DefaultLayout>
  )
}

export default ProtectedLayout

import Signin from '@/components/Auth/Signin'
import DarkModeSwitcher from '@/components/Header/DarkModeSwitcher'
import React from 'react'

export default function page() {
  return (
    <>
    <header className='sticky top-0 z-999 flex justify-end w-full py-4 px-6 border-b border-stroke bg-white dark:border-stroke-dark dark:bg-gray-dark'>
        <DarkModeSwitcher />
    </header>
    <div className='flex px-6 h-[85vh] w-full items-center justify-center lg:px-0 lg:h-[80vh]'>
      <div className="w-150 rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
        <div className="flex flex-wrap items-center">
          <div className="w-full">
            <div className="w-full p-4 sm:p-12.5 xl:p-15">
              <Signin />
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

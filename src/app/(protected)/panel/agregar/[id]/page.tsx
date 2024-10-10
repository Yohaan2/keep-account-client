"use client"
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import RegisterAccount from '@/components/FormElements/RegisterAccount';
import { useParams, useRouter } from 'next/navigation';
import { FaArrowLeft } from "react-icons/fa";

export default function Page() {
  const router = useRouter();
  
  return (
    <div>
      <FaArrowLeft 
        size={24} 
        className="cursor-pointer mb-4 text-dark dark:text-white"
        onClick={() => router.back()}
        />
      <Breadcrumb pageName="Registrar una Cuenta" />

      <RegisterAccount />
    </div>
  )
}

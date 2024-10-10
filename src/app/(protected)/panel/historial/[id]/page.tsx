"use client"
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import TableThree from '@/components/Tables/TableThree';
import { useGetDebtsById } from '@/hooks/useClient';
import { useRouter, useParams } from 'next/navigation';
import React from 'react'
import { FaArrowLeft } from "react-icons/fa";

export default function Page() {
  const router = useRouter();
  const { id } = useParams()
  console.log(id)
  const {data: debts} = useGetDebtsById(id as string)
  return (
    <div>
    <FaArrowLeft 
      size={24} 
      className="cursor-pointer mb-4 text-dark dark:text-white"
      onClick={() => router.back()}
      />
    <Breadcrumb pageName="Historial" />
    <TableThree debts={debts} />
  </div>
  )
}


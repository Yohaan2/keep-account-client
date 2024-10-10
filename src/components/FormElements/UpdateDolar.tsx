"use client"
import React, { useEffect, useState } from 'react'
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import Input from './InputGroup';
import ButtonDefault from '../Buttons/ButtonDefault';
import AlertSuccess from '../Alerts/AlertSuccess';
import { useSetDollarPrice } from '@/hooks/useClient';

type InputDolar = {
  amount: string
}

export default function UpdateDolar() {
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const { mutate, isSuccess, isPending } = useSetDollarPrice()
  
  useEffect(() => {
    if (isSuccess){
      setShowNotification(true)
      setTimeout(() => {
        setShowNotification(false)
      }, 3000)
    }
  }, [isSuccess])

  const shemaDolar = yup
    .object({
      amount: yup.string().required("El monto es requerido"),
    })

  const { handleSubmit, control, reset } = useForm<InputDolar>({
    resolver: yupResolver(shemaDolar)
  })

  const onSubmit: SubmitHandler<InputDolar> = (data) => {
    reset()
    mutate(Number(data.amount))
  }
  return (
    <>
    { showNotification && (
      <div className='mb-5'>
        <AlertSuccess
          title={"Dolar actualizado"}
        />
      </div>
    )}
      <div className="flex flex-col gap-9">
        <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
          <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
            <h3 className="font-medium text-dark dark:text-white">
              Actualiza el dolar
            </h3>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5.5 p-6.5">
            <Controller 
              name='amount'
              control={control}
              render={({ field, fieldState: { error: inputError }}) => (
                <Input 
                  label='Monto'
                  type='text'
                  placeholder='Ingrese el monto'
                  value={field.value}
                  error={!!inputError}
                  helpText={inputError ? inputError?.message : ""}
                  onChange={(event) => field.onChange(event.target.value)}
                />
              )}
            />
            <ButtonDefault
              label="Actualizar Dolar"
              type="submit"
              customClasses="bg-primary text-white rounded-full px-10 py-3.5 lg:px-8 xl:px-10"
              loading={isPending}
              disabled={isPending}
            />
          </form>
        </div>
      </div>
    </>
  )
}

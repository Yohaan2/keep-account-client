"use client";
import InputGroup from './InputGroup'
import ButtonDefault from '../Buttons/ButtonDefault'
import AlertSuccess from '../Alerts/AlertSuccess';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useCreateClient } from '@/hooks/useClient';

type Inputs = {
  name: string
}

export const RegisterClient =() => {
  const { mutate , isPending, isSuccess } = useCreateClient()
  const schemaClient = yup
  .object({
    name: yup.string().required("El nombre es requerido")
  })

  const { handleSubmit, control, reset} = useForm<Inputs>({
    resolver: yupResolver(schemaClient)
  })

  const onSubmit: SubmitHandler<Inputs>  = (data) => {
    reset()
    mutate(data)
  }
  return (
    <>
    { isSuccess && (
      <div className='mb-5'>
        <AlertSuccess
          title={"Cliente registrado correctamente"}
        />
      </div>
    )}
      <div className="flex flex-col gap-9">
        <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
          <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
            <h3 className="font-medium text-dark dark:text-white">
                Registrar Cliente
            </h3>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5.5 p-6.5">
            <Controller 
              name="name"
              control={control}
              render={({ field, fieldState: { error: inputError }}) => (
                <InputGroup 
                  label='Nombre Completo'
                  type='text'
                  placeholder='Ingrese el nombre de el cliente'
                  value={field.value}
                  error={!!inputError}
                  helpText={inputError ? inputError?.message : ""}
                  onChange={(event) => field.onChange(event.target.value)}
                />
              )}
            />
            <ButtonDefault
              label="Registrar Cliente"
              type="submit"
              customClasses="bg-primary text-white rounded-full px-10 py-3.5 lg:px-8 xl:px-10"
              disabled={isPending}
              loading={isPending}
            />
          </form>
        </div>
      </div>
    </>
  )
}

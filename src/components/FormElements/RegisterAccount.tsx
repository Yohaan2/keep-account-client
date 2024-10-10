"use client";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import AlertSuccess from "../Alerts/AlertSuccess";
import ButtonDefault from "../Buttons/ButtonDefault";
import Input from "./InputGroup";
import TextareaGroup from "./TextareaGruop";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAddDebt, useDeleteClient, useGetDebtsById, useReduceAccount, useResetAccount } from "@/hooks/useClient";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type InputsAccount = {
  amount: string
  description?: string
}

type InputsPayment = {
  paymentAmount: string
}

const RegisterAccount = () => {
  const { id } = useParams()
  const {data: debts} = useGetDebtsById(id as string)
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("")
  const { mutate: addDebt, isSuccess, isPending } = useAddDebt()
  const { mutate: deleteClient } = useDeleteClient()
  const { mutate: reduceAccount, isSuccess: isReduceSuccess, isPending: isReducePending } = useReduceAccount()
  const { mutate: resetAccount } = useResetAccount()

  useEffect(() => {
    if(isSuccess) {
      setShowNotification(true)
      setAlertMessage("Nuevo monto registrado")

      setTimeout(() => {
        setShowNotification(false)
      }, 3000)
    }

    if(isReduceSuccess) {
      setShowNotification(true)
      setAlertMessage("Monto reducido")

      setTimeout(() => {
        setShowNotification(false)
      }, 3000)
    }

  }, [isSuccess, isReduceSuccess])
  

  const schemaAccount = yup
    .object({
      amount: yup.string().required("El monto es requerido"),
      description: yup.string().optional(),
    })

  const schemaPayment = yup
    .object({
      paymentAmount: yup.string().required("El monto es requerido"),
    })
  
  const { handleSubmit, control, reset: resetAccountForm } = useForm<InputsAccount>({
    resolver: yupResolver(schemaAccount)
  })

  const { handleSubmit: handlePaymentSubmit, control: controlPayment, reset: resetPayment } = useForm<InputsPayment>({
    resolver: yupResolver(schemaPayment)
  })

  const onSubmit: SubmitHandler<InputsAccount> = (data) => {
    resetAccountForm()
    const sendData = {
      id: id as string,
      amount: Number(data.amount),
      description: data.description
    }
    addDebt(sendData)
  }

  const onSubmitReduceAccount: SubmitHandler<InputsPayment> = (data) => {
    resetPayment()
    reduceAccount({id: id as string, amount: Number(data.paymentAmount)})
  }


  return (
    <>
    {
      showNotification && (
        <div className="mb-5">
          <AlertSuccess
            title={alertMessage}
          />
        </div>
      )
    }

        <div className="flex flex-col gap-9">
          {/* <!-- Input Fields --> */}
          <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
              <h3 className="font-medium text-dark dark:text-white">
                Cuenta de {debts?.data.name}
              </h3>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5.5 p-6.5">
              <Controller 
                name="amount"
                control={control}
                render={({field, fieldState: { error: inputError }}) => (
                  <Input 
                    label="Monto"
                    type="text"
                    placeholder="Ingrese el monto"
                    value={field.value}
                    error={!!inputError}
                    helpText={inputError ? inputError?.message : ""}
                    onChange={(event) => field.onChange(event.target.value)}
                  />
                )}
              />
              
              <Controller 
                name="description"
                control={control}
                render={({field, fieldState: { error: inputError }}) => (
                  <TextareaGroup 
                    label="Descripcion"
                    placeholder="Ingrese la descripcion"
                    value={field.value}
                    error={!!inputError}
                    helpText={inputError ? inputError?.message : ""}
                    onChange={(event) => field.onChange(event.target.value)}
                  />
                )}
              />
                <ButtonDefault 
                  label="Registrar Deuda"
                  type="submit"
                  customClasses="bg-primary text-white rounded-full px-10 py-3.5 lg:px-8 xl:px-10"
                  disabled={isPending}
                  loading={isPending}
                />
            </form>
          </div>

          <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
              <h3 className="font-medium text-dark dark:text-white">
                Abono
              </h3>
              </div>
              <form className="flex flex-col gap-5.5 p-6.5" onSubmit={handlePaymentSubmit(onSubmitReduceAccount)}>
                <Controller
                  name="paymentAmount"
                  control={controlPayment}
                  render={({ field, fieldState: { error: inputError }}) => (
                    <Input 
                      label="Monto"
                      type="text"
                      placeholder="Ingrese el monto"
                      value={field.value}
                      error={!!inputError}
                      helpText={inputError ? inputError?.message : ""}
                      onChange={(event) => field.onChange(event.target.value)}
                    />  
                  )}
                />
                <ButtonDefault 
                  label="Registrar Abono"
                  type="submit"
                  customClasses="bg-primary text-white rounded-full px-10 py-3.5 lg:px-8 xl:px-10"
                  disabled={isReducePending}
                  loading={isReducePending}
                />
              </form>
            
          </div>

          <div className="flex justify-center items-center gap-5">
            <button
              className="text-center font-medium text-red-700 py-2 px-4 transition-all duration-300 hover:bg-red-700 hover:text-white hover:rounded-lg"
              onClick={() => deleteClient(id as string)}
              >Eliminar cuenta</button>
            <button
              className="text-center font-medium text-blue-700 py-2 px-4 transition-all duration-300 hover:bg-blue-700 hover:text-white hover:rounded-lg"
              onClick={() => resetAccount(id as string)}
            >Resetear cuenta</button>
          </div>
        </div>


    </>
  );
};

export default RegisterAccount;

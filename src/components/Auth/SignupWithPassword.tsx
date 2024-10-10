"use client";
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import InputGroup from "../FormElements/InputGroup";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ButtonDefault from "../Buttons/ButtonDefault";
import { FaRegUser } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { FiUnlock } from "react-icons/fi";
import { useRegister } from "@/hooks/useAuth";

type Inputs = {
  name: string
  email: string
  password: string
}

type IFields = {
  name: keyof Inputs
  label: string
  placeholder: string
  type: string
  endIcon?: React.ReactNode
}

const fields: IFields[] = [
  {
    name: "name",
    label: "Nombre Completo",
    placeholder: "Nombre Completo",
    type: "text",
    endIcon: <FaRegUser size={20}/>
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Introduce tu email",
    type: "text",
    endIcon: <HiOutlineMail size={24}/>
  },
  {
    name: "password",
    label: "Contraseña",
    placeholder: "Ingresa una contraseña",
    type: "password",
    endIcon: <FiUnlock size={20}/>
  }
]

export default function SignupWithPassword() {
  const { mutate, isPending, } = useRegister()

  const schema = yup
  .object({
    name: yup.string().required("El nombre es requerido"),
    email: yup.string().email("El email es invalido").required("El email es requerido"),
    password: yup.string().required("La contraseña es requerida"),
  })

  const {
    handleSubmit,
    control
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  })
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    mutate(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      
    {
      fields.map((fieldAtr, index) => (
        <Controller
          key={index}
          name={fieldAtr.name}
          control={control}
          render={({ field, fieldState: {error: inputError}}) => (
            <InputGroup 
              label={fieldAtr.label}
              type={fieldAtr.type}
              placeholder={fieldAtr.placeholder}
              value={field.value}
              error={!!inputError}
              endIcon={fieldAtr.endIcon}
              helpText={inputError ? inputError?.message : ""}
              onChange={(event) => field.onChange(event.target.value)}
              customClasses="mb-4"
            />
          )}
        />
      ))
    }

      <ButtonDefault
        label="Create account"
        type="submit"
        customClasses="flex w-full bg-primary text-white rounded-full px-10 py-3.5 mt-6 lg:px-8 xl:px-10"
        disabled={isPending}
        loading={isPending}
      />

    </form>
  );
}

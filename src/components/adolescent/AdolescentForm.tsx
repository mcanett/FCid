"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  adolescentFormSchema,
  type AdolescentFormValues,
} from "@/modules/adolescent/adolescent.schema"
import { useEffect, useState } from "react"
import { calculateAge } from "@/utils/date"

type Props = {
  defaultValues?: Partial<AdolescentFormValues>
  onSubmit: (data: AdolescentFormValues) => Promise<void>
}

export function AdolescentForm({ defaultValues, onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<AdolescentFormValues>({
    resolver: zodResolver(adolescentFormSchema),
    defaultValues: {
      ...defaultValues,
    },
  })

  const birthdate = watch("birthdate")
  const [age, setAge] = useState<number | null>(null)

  useEffect(() => {
    if (!birthdate) {
      setAge(null)
      return
    }

    setAge(calculateAge(birthdate))
  }, [birthdate])


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Nombre(s) </label>
        <input {...register("first_name")} />
        {errors.first_name && <p style={{color: "red"}}>{errors.first_name.message}</p>}
      </div>

      <div>
        <label>Apellido(s) </label>
        <input {...register("last_name")} />
        {errors.last_name && <p style={{color: "red"}}>{errors.last_name.message}</p>}
      </div>

      <div>
        <label>Fecha de nacimiento </label>
        <input type="date" {...register("birthdate")} />
        {age !== null && (age <= 10 || age >= 16) && (
          <label style={{color: "red"}}> : Edad fuera del rango esperado</label>
        )}
        {age !== null && (age > 10 && age < 16) && (
          <label> : {age} años</label>
        )}
        {errors.birthdate && <p style={{color: "red"}}>{errors.birthdate.message}</p>}
      </div>

      <div>
        <label>Etapa </label>
        <select {...register("stage")}>
          <option value="TEENS">Teens</option>
          <option value="YOUTH">Youth</option>
          <option value="UNIVERSITY">University</option>
          <option value="GRADUATED">Graduated</option>
        </select>
      </div>

      <button disabled={isSubmitting}>
        {isSubmitting ? "Guardando..." : "Guardar"}
      </button>
    </form>
  )
}
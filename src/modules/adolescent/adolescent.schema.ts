import { z } from "zod"
import { AdolescentStage, AdolescentStatus } from "@prisma/client";

export const adolescentFormSchema = z.object({
    first_name: z
        .string()
        .min(2, "El nombre debe tener al menos 2 caracteres"),
    last_name: z
        .string()
        .min(2, "El apellido debe tener al menos 2 caracteres"),
    birthdate: z
        .iso.date("La fecha de nacimiento es requerida"),
    stage: z.enum(AdolescentStage)
})

export type AdolescentFormValues = z.infer<
  typeof adolescentFormSchema
>
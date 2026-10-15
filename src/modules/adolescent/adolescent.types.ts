import { AdolescentStage, AdolescentStatus } from "@prisma/client";

export interface CreateAdolescentInput {
    first_name: string
    last_name: string
    qr_code: string
    birthdate: string
    stage: AdolescentStage
    //status?: AdolescentStatus
}

export interface UpdateAdolescentInput {
    first_name?: string
    last_name?: string
    stage?: AdolescentStage
    status?: AdolescentStatus
    birthdate?: string
}
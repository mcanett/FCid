import { prisma } from "../../../prisma/prisma"
import type { 
    CreateAdolescentInput, 
    UpdateAdolescentInput 
} from "./adolescent.types"
import { randomUUID } from 'crypto';

export const adolescentRepository = {
    findAll() {
        return prisma.adolescent.findMany({
            orderBy: { created_at: "desc" },
        })
    },

    findById(id: number) {
        return prisma.adolescent.findUnique({ where: { id } })
    },

    create(data: CreateAdolescentInput) {
        return prisma.adolescent.create({
            data: {
                ...data,
                qr_code: randomUUID(),
                birthdate: new Date(data.birthdate)
                //status: data.status ?? "ACTIVE",
            },
        })
    },

    update(id: number, data: UpdateAdolescentInput) {
        return prisma.adolescent.update({
            where: { id },
            data: {
                ...data,
                birthdate: data.birthdate ? new Date(data.birthdate) : new Date()
            }
        })
    },

    delete(id: number) {
        return prisma.adolescent.delete({ where: { id } })
    },

    findByIdWithDetails(id: number) {
        return prisma.adolescent.findUnique({
            where: { id },
            include: {
                tutors: {
                    include: {
                        tutor: true,
                    }
                },
                events: {
                    orderBy: {
                    registration_date: "desc",
                    },
                        take: 5,
                        include: {
                        event: true,
                    },
                },
            },
        })
    },
}
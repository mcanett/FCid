import { prisma } from "../../../prisma/prisma"
import type { CreateEventInput, UpdateEventInput } from "./event.types"

export const eventRepository = {
  findAll() {
    return prisma.event.findMany({
      orderBy: { start_date: "asc" },
    })
  },

  findById(id: number) {
    return prisma.event.findUnique({
      where: { id },
      include: {
        adolescents: {
          include: {
            adolescent: true,
          },
        },
      },
    })
  },

  create(data: CreateEventInput) {
    return prisma.event.create({ data })
  },

  update(id: number, data: UpdateEventInput) {
    return prisma.event.update({
      where: { id },
      data,
    })
  },

  delete(id: number) {
    return prisma.event.delete({
      where: { id },
    })
  },
}
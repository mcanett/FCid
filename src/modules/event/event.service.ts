import { eventRepository } from "./event.repository"
import type { CreateEventInput, UpdateEventInput } from "./event.types"

export const eventService = {
  getAll() {
    return eventRepository.findAll()
  },

  getById(id: number) {
    if (!id || Number.isNaN(id)) {
      throw new Error("Id de evento inválido")
    }
    return eventRepository.findById(id)
  },

  create(data: CreateEventInput) {
    if (!data.name || !data.start_date) {
      throw new Error("Nombre y fecha de inicio son obligatorios")
    }
    return eventRepository.create(data)
  },

  update(id: number, data: UpdateEventInput) {
    if (!id || Number.isNaN(id)) {
      throw new Error("Id de evento inválido")
    }
    return eventRepository.update(id, data)
  },

  delete(id: number) {
    if (!id || Number.isNaN(id)) {
      throw new Error("Id de evento inválido")
    }
    return eventRepository.delete(id)
  },

  async getDetailById(id: number) {
    return eventRepository.findById(id)
  },
}
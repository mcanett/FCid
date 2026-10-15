import { adolescentRepository } from "./adolescent.repository"
import type {
  CreateAdolescentInput,
  UpdateAdolescentInput,
} from "./adolescent.types"

export const adolescentService = {

    // Listado de adolescentes
    getAll() {
        return adolescentRepository.findAll()
    },
    // Obtiene adolescente por id
    getById(id: number) {
        if (!id || Number.isNaN(id)) {
            throw new Error("Id de adolescente invalido")
        }
        return adolescentRepository.findById(id)
    },
    // Crea un adolescente, valida campos requeridos
    create(input: CreateAdolescentInput) {
        if (!input.first_name) {
            throw new Error("Nombres son requeridos")
        }
        if (!input.last_name) {
            throw new Error("Apellidos son requeridos")
        }
        if (!input.birthdate) {
            throw new Error("Fecha de nacimiento es requerida")
        }
        if (!input.stage) {
            throw new Error("Etapa es requerida")
        }
        return adolescentRepository.create(input)
    },
    // Actualiza un adolescente, valida campos requeridos
    update(id: number, input: UpdateAdolescentInput) {
        if (!id || Number.isNaN(id)) {
            throw new Error("Id de adolescente invalido")
        }
        if (!input.first_name) {
            throw new Error("Nombres son requeridos")
        }
        if (!input.last_name) {
            throw new Error("Apellidos son requeridos")
        }
        if (!input.birthdate) {
            throw new Error("Fecha de nacimiento es requerida")
        }
        if (!input.stage) {
            throw new Error("Etapa es requerida")
        }
        return adolescentRepository.update(id, input)
    },
    // Elimina un adolescente por id
    delete(id: number) {
        if (!id || Number.isNaN(id)) {
            throw new Error("Id de adolescente invalido")
        }
        return adolescentRepository.delete(id)
    },
    // Obtiene el perfil del adolescente: tutores y eventos incluidos
    getProfile(id: number) {
        return adolescentRepository.findByIdWithDetails(id)
    },
}
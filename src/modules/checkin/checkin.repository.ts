import { prisma } from '../../../prisma/prisma'
import { AdolescentStatus } from  '@prisma/client';

export class CheckInRepository {

    // Encuentra a un adolescente por QRcode
    async findAdolescentByQr(qrCode: string) {
        return prisma.adolescent.findUnique({
            where: { qr_code: qrCode },
            include: {
                inactivations: {
                  where: { inactive_to: null },
                  orderBy: { inactive_from: 'desc' },
                  take: 1
                }
              }
        })
    }
    //Encuentra un evento por id
    async findEventById(eventId: number) {
        return prisma.event.findUnique({
            where: { id: eventId }
        })
    }
    // Encuentra un usuario por id
    async findUserById(userId: number) {
        return prisma.user.findUnique({
            where: { id: userId }
        })
    }
    //Verifica si un adolescente ya realizo check-in en un evento
    async hasCheckedIn(adolescentId: number, eventId: number) {
        return prisma.adolescentEvent.findUnique({
            where: {
            adolescent_id_event_id: {
                adolescent_id: adolescentId,
                event_id: eventId
            }
            }
        })
    }
    // Genera check-in
    async createCheckIn(adolescentId: number, eventId: number, userId: number) {
        return prisma.adolescentEvent.create({
            data: {
                adolescent_id: adolescentId,
                event_id: eventId,
                user_id: userId
            }
        })
    }
    // Cambia el estatus de un adolscente a "Activo"
    async activateAdolescent(adolescentId: number) {
        return prisma.adolescent.update({
            where: { id: adolescentId },
            data: { status: AdolescentStatus.ACTIVE }
        })
    }
    // Le asigna la fecha actual a campo "Inactive_to"
    // (Cierra una inactivación)
    async closeInactivation(inactivationId: number) {
        return prisma.adolescentInactivation.update({
            where: { id: inactivationId },
            data: { inactive_to: new Date() }
        })
    }
}
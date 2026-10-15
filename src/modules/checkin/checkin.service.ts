import { CheckInRepository } from './checkin.repository'
import type { CheckInInput, CheckInResult } from './checkin.types'
import { AdolescentStatus } from  '@prisma/client';

export class CheckInService {

  private repo = new CheckInRepository()

  async checkIn(input: CheckInInput): Promise<CheckInResult> {
    const { qrCode, eventId, userId } = input

    // Buscar adolescente por QR
    const adolescent = await this.repo.findAdolescentByQr(qrCode)
    if (!adolescent) {
      return { success: false, message: 'QR no válido' }
    }

    // Buscar evento
    const event = await this.repo.findEventById(eventId)
    if (!event) {
      return { success: false, message: 'Evento no encontrado' }
    }

    // Buscar usuario
    const user = await this.repo.findUserById(userId)
    if (!user) {
      return { success: false, message: 'Usuario no encontrado' }
    }

    // Verifificar si esta suspendido
    if (adolescent.status === AdolescentStatus.SUSPENDED) {
        return { success: false, message: 'Adolescente suspendido' }
    }

    // Si estaba inactivo -> reactivar
    let wasReactivated = false;
    let inactivation = adolescent.inactivations[0];
    if (adolescent.status ===  AdolescentStatus.INACTIVE) {
        await this.repo.activateAdolescent(adolescent.id)
        if(inactivation) {
            await this.repo.closeInactivation(inactivation.id)
        }
        wasReactivated = true;
    }

    // Verificar si ya hizo check-in
    const alreadyChecked = await this.repo.hasCheckedIn(adolescent.id, eventId)
    if (alreadyChecked) {
      return { success: false, message: 'Ya se registro asistencia' }
    }


    // Crear check-in
    await this.repo.createCheckIn(adolescent.id, eventId, userId)

    return {
      success: true,
      message: 'Check-in registrado correctamente',
      adolescent: {
        id: adolescent.id,
        firstName: adolescent.first_name,
        lastName: adolescent.last_name,
        status: adolescent.status
      },
      eventId,
      wasReactivated: wasReactivated,
      checkedInBy: user.id
    }
  }
}
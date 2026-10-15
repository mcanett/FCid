import { NextResponse } from 'next/server'
import { CheckInService } from '@/modules/checkin/checkin.service'

const service = new CheckInService()

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { qrCode, eventId, userId } = body

        if (!qrCode || !eventId || !userId) {
            return NextResponse.json(
                { success: false, message: 'qrCode, eventId, userId son requeridos' },
                { status: 400 }
            )
        }

        const result = await service.checkIn({
            qrCode,
            eventId: Number(eventId),
            userId: Number(userId)
        })

        if (!result.success) {
            return NextResponse.json(result, { status: 400 })
        }

        return NextResponse.json(result, { status: 200 })
    } catch (error) {
        console.error('Check-in error: ', error)

        return NextResponse.json(
            { success: false, message: 'Error interno del servidor' },
            { status: 500 }
        )
    }
}
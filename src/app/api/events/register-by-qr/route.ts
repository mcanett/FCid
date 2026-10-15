import { NextResponse } from "next/server"
import { prisma } from "../../../../../prisma/prisma"

export async function POST(req: Request) {
  const { eventId, qrCode } = await req.json()
  const userId = 1;

  if (!eventId || !qrCode) {
    return NextResponse.json(
      { error: "Datos incompletos" },
      { status: 400 }
    )
  }

  // Buscar adolescente por código QR
  const adolescent = await prisma.adolescent.findUnique({
    where: { qr_code: qrCode },
  })

  if (!adolescent) {
    return NextResponse.json(
      { error: "Adolescente no encontrado" },
      { status: 404 }
    )
  }

  // Verificar si ya está inscrito
  const existing = await prisma.adolescentEvent.findUnique({
    where: {
        adolescent_id_event_id: {
            adolescent_id: Number(adolescent.id),
            event_id: Number(eventId),
        }
    },
  })

  if (existing) {
    return NextResponse.json({
      message: "Ya estaba inscrito",
      alreadyRegistered: true,
    })
  }

  // Crear registro
  await prisma.adolescentEvent.create({
    data: {
      adolescent_id: Number(adolescent.id),
      event_id: Number(eventId),
      user_id: userId
    },
  })

  return NextResponse.json({
    message: "Inscripción exitosa",
  })
}
import { NextResponse } from "next/server"
import { eventService } from "@/modules/event/event.service"

type Params = {
  params: { id: string }
}

export async function GET(_: Request, { params }: Params) {
  const event = await eventService.getById(Number(params.id))
  return NextResponse.json(event)
}

export async function PUT(req: Request, { params }: Params) {
  const body = await req.json()
  const event = await eventService.update(Number(params.id), body)
  return NextResponse.json(event)
}

export async function DELETE(_: Request, { params }: Params) {
  await eventService.delete(Number(params.id))
  return NextResponse.json({ ok: true })
}
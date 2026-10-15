import { NextResponse } from "next/server"
import { eventService } from "@/modules/event/event.service"

export async function GET() {
  const events = await eventService.getAll()
  return NextResponse.json(events)
}

export async function POST(req: Request) {
  const body = await req.json()
  const event = await eventService.create({
    ...body,
    start_date: new Date(body.start_date),
    end_date: body.end_date ? new Date(body.end_date) : undefined,
  })
  return NextResponse.json(event)
}
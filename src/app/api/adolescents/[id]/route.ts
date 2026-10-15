import { NextResponse } from "next/server"
import { adolescentService } from "@/modules/adolescent/adolescent.service"

export async function GET(
  _: Request,
  { params }: { params: { id: string } }
) {
    const { id } = await params
    const adolescent = await adolescentService.getById(Number(id))
    return NextResponse.json(adolescent)
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
    const { id } = await params
    const body = await req.json()
    const updated = await adolescentService.update(Number(id), body)
    return NextResponse.json(updated)
}

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
    const { id } = await params
    await adolescentService.delete(Number(id))
    return NextResponse.json({ ok: true })
}
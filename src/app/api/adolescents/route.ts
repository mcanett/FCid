import { NextResponse } from "next/server"
import { adolescentService } from "@/modules/adolescent/adolescent.service"

export async function GET() {
    const data = await adolescentService.getAll()
    return NextResponse.json(data)
}

export async function POST(req: Request) {
    const body = await req.json()
    const adolescent = await adolescentService.create(body)
    return NextResponse.json(adolescent, { status: 201 })
}
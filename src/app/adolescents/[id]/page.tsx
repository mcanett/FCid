import { adolescentService } from "@/modules/adolescent/adolescent.service"
import { notFound } from "next/navigation"
import AdolescentInfo from "@/components/adolescent/AdolescentInfo"
import AdolescentQR from "@/components/adolescent/AdolescentQR"
import AdolescentTutors from "@/components/adolescent/AdolescentTutors"
import AdolescentRecentEvents from "@/components/adolescent/AdolescentRecentEvents"

type Props = {
  params: { id: string }
}

export default async function AdolescentDetailPage({ params }: Props) {
    const { id } = await params
    const adolescent = await adolescentService.getProfile(Number(id))

    if (!adolescent) {
      notFound()
    }

    return (
    <div className="space-y-6">
        <AdolescentInfo adolescent={adolescent} />

        <AdolescentQR adolescentId= {adolescent.id} qrCode={adolescent.qr_code} />

        <AdolescentTutors tutors={adolescent.tutors} />

        <AdolescentRecentEvents events={adolescent.events} />
    </div>
    )
}
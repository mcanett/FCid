export const dynamic = "force-static"
export const revalidate = 0

import { adolescentService } from "@/modules/adolescent/adolescent.service"
import * as QRCode from "qrcode"
import "./credential.css"

//import QRCode from "qrcode.react"

// Agregar en dado caso de que solo se quiera imprimir sin ver la pestaña
/*"use client"
import { useEffect } from "react"

useEffect(() => {
  window.print()
}, [])*/

type Props = {
    params: { id: string }
  }

export default async function CredentialPage({ params }: Props) {
    const { id } = await params
    const adolescent = await adolescentService.getById(Number(id))

    if(adolescent){
    const qr = await QRCode.toDataURL(adolescent.qr_code)

    return (
      <div className="credential-page">
        <div className="credential">
          <h1 className="text-sm font-bold">
            Factor Cambio
          </h1>
      
          <div className="my-2">
            <img
              src={qr}
              alt="QR Code"
              style={{ width: 120, height: 120 }}
            />
          </div>
      
          <div className="text-xs">
            <p className="font-semibold">
              {adolescent.first_name} {adolescent.last_name}
            </p>
          </div>
      
          <div className="mt-auto text-[10px] text-gray-500">
            Grupo: {adolescent.stage}
          </div>
        </div>
      </div>
    )
    }
    
}
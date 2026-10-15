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
        <html>
            <body>
                <div className="credential-page">
                    <div className="credential">
                    <h1 className="title">Factor Cambio</h1>

                    <img src={qr} alt="QR Code" className="qr" />

                    <p className="name">
                        {adolescent.first_name} {adolescent.last_name}
                    </p>

                    <p className="stage">
                        Grupo: {adolescent.stage}
                    </p>
                    </div>
                </div>
            </body>
        </html>
    )
    }
    
}
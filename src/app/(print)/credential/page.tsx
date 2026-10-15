"use client"

import * as QRCode from "qrcode"
import "./credential.css"

import { use, useEffect, useState } from "react"

// Agregar en dado caso de que solo se quiera imprimir sin ver la pestaña
/*useEffect(() => {
  window.print()
}, [])*/

type Props = {
    params: Promise <{ id: string }>
  }

export default async function CredentialPage({ params }: Props) {
    /*const { id } = await params
    const adolescent = await adolescentService.getById(Number(id))

    if(adolescent){
        const qr = await QRCode.toDataURL(adolescent.qr_code)
    }
    */
    const [data, setData] = useState<any>(null)
    const { id } = use(params)

    useEffect(() => {
        
        async function load() {
        //const { id } = await params
        const res = await fetch(`/api/adolescents/${id}`)
        const adolescent = await res.json()
        const qr = await QRCode.toDataURL(adolescent.qr_code)
        setData({ adolescent, qr })

        // CLAVE
        setTimeout(() => window.print(), 300)
        }

        load()
    }, [id])
  
    if (!data) return null
  
    const { adolescent, qr } = data
  

    return (
        <div className="credential-page">
            <div className="credential">
                <h1 className="title">Factor Cambio</h1>
            
                <img src={qr} alt="QR" className="qr" />
            
                <p className="name">
                    {adolescent.first_name} {adolescent.last_name}
                </p>
            
                <p className="group">
                    Grupo: {adolescent.stage}
                </p>
            </div>
        </div>
    )
    
}
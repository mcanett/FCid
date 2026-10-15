"use client"

import * as QRCode from "qrcode"
import React from "react"
import Link from "next/link"

export default function AdolescentQR({ adolescentId, qrCode }: { adolescentId: Number, qrCode: string }) {
  const [src, setSrc] = React.useState<string>("")

  React.useEffect(() => {
    QRCode.toDataURL(qrCode).then(setSrc)
  }, [qrCode])

  return (
    <section>
      <h2 className="font-semibold">QR del Adolescente</h2>
      {src && <img src={src} alt="QR Code" className="w-40" />}
      <Link
        href={`/credential/${adolescentId}`}
        target="_blank"
        className="mt-3 inline-flex items-center rounded bg-black px-4 py-2 text-white hover:bg-gray-800"
      >
        Generar credencial
      </Link>
    </section>
  )
}
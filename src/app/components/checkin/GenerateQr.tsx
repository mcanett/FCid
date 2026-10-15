"use client"

import { useEffect, useState } from "react"
import * as QRCode from "qrcode"

type Props = {
  value: string
}

export default function GenerateQr({ value }: Props) {
  const [qrUrl, setQrUrl] = useState<string>("")

  useEffect(() => {
    QRCode.toDataURL(value)
      .then(setQrUrl)
      .catch(console.error)
  }, [value])

  if (!qrUrl) return <p>Generando QR...</p>

  return (
    <img
      src={qrUrl}
      alt="QR Code"
      style={{ width: 200, height: 200 }}
    />
  )
}
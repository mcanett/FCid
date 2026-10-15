"use client"

import GenerateQr from "../components/checkin/GenerateQr"

export default function QrTestPage() {
  const qrCodeValue = "fe6f5b06-8943-4843-8db5-4fbbd978d416"

  return (
    <main style={{ padding: 24 }}>
      <h1>QR de prueba</h1>

      <GenerateQr value={qrCodeValue} />
      <p>Contenido: {qrCodeValue}</p>
    </main>
  )
}
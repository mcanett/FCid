"use client"

import { useState } from "react"
import QrScanner from "../components/checkin/QrScanner"
import CheckInResult from "../components/checkin/CheckInResult"

export default function CheckInPage() {
  const [result, setResult] = useState<{
    status: "success" | "error"
    message: string
  } | null>(null)

  const EVENT_ID = 1 // luego lo haces dinámico

  const handleScan = async (qrCode: string) => {
    try {
      const res = await fetch("/api/check-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          qrCode,
          eventId: EVENT_ID
        })
      })

      const data = await res.json()

      if (!res.ok) {
        setResult({ status: "error", message: data.message })
        return
      }

      setResult({ status: "success", message: data.message })
    } catch {
      setResult({
        status: "error",
        message: "Error de conexión"
      })
    }
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>Check-In de adolescentes</h1>

      <QrScanner onScanSuccess={handleScan} />

      {result && (
        <CheckInResult
          status={result.status}
          message={result.message}
        />
      )}
    </main>
  )
}
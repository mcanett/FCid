"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"

type Props = {
  eventId: number
}

export function QRScannerInput({ eventId }: Props) {
  const router = useRouter()

  const [message, setMessage] = useState<string | null>(null)
  const [isError, setIsError] = useState(false)

  const bufferRef = useRef("")
  const lastTimeRef = useRef(0)

  // ⏱️ CONFIGURACIÓN CLAVE
  const SCAN_SPEED_THRESHOLD = 50 // ms entre teclas
  const MIN_LENGTH = 8 // mínimo para considerar QR válido

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const now = Date.now()
      const diff = now - lastTimeRef.current

      lastTimeRef.current = now

      // Si pasa mucho tiempo, reiniciamos buffer (es humano)
      if (diff > SCAN_SPEED_THRESHOLD) {
        bufferRef.current = ""
      }

      // Enter = fin del scan
      if (e.key === "Enter") {
        const scanned = bufferRef.current

        bufferRef.current = ""

        if (scanned.length >= MIN_LENGTH) {
          handleScan(scanned)
        }

        return
      }

      // Solo caracteres válidos
      if (e.key.length === 1) {
        bufferRef.current += e.key
      }
    }

    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  async function handleScan(qrCode: string) {
    try {
      setMessage(null)

      const res = await fetch("/api/events/register-by-qr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventId,
          qrCode,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error)
      }

      setIsError(false)
      setMessage(data.message || "Registro exitoso")

      router.refresh()

    } catch (err: any) {
      setIsError(true)
      setMessage(err.message)
    }
  }

  // 🔔 Notificación auto-hide
  useEffect(() => {
    if (!message) return

    const timer = setTimeout(() => {
      setMessage(null)
    }, 3000)

    return () => clearTimeout(timer)
  }, [message])

  return (
    <div className="border p-4 rounded space-y-2">
      <h3 className="font-semibold">Escáner activo</h3>

      <p className="text-sm text-gray-500">
        Listo para escanear códigos QR...
      </p>

      {message && (
        <p
          className={`p-2 rounded ${
            isError
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  )
}
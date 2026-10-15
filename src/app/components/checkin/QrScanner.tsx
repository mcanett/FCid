"use client"

import { Html5QrcodeScanner } from "html5-qrcode"
import { useEffect } from "react"

type Props = {
  onScanSuccess: (qrCode: string) => void
}

export default function QrScanner({ onScanSuccess }: Props) {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "qr-reader",
      {
        fps: 10,
        qrbox: 250
      },
      false
    )

    scanner.render(
      (decodedText) => {
        scanner.clear()
        onScanSuccess(decodedText)
      },
      (error) => {
        // silencioso
      }
    )

    return () => {
      scanner.clear().catch(() => {})
    }
  }, [onScanSuccess])

  return <div id="qr-reader" />
}
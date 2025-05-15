'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'

const QrReader = dynamic(() => import('react-qr-reader'), { ssr: false })

export default function QRPage() {
  const [result, setResult] = useState('')

  const handleScan = (data: string | null) => {
    if (data) {
      setResult(data)
      console.log('Código escaneado:', data)
    }
  }

  const handleError = (err: any) => {
    console.error('Erro ao ler QR code:', err)
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">📷 Escaneie o QR Code da entrega</h1>
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: '100%' }}
      />
      <p className="mt-4 text-gray-800">Resultado: {result}</p>
    </div>
  )
}


import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Mark CDH | Sistema de Trazabilidad',
  description: 'Plataforma de gestión de inventarios RFID y monitoreo logístico para CDH.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className} suppressHydrationWarning>{children}</body>
    </html>
  )
}

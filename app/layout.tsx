import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'TechCorp Parking - Gestion du parking d\'entreprise & Travail Hybride',
  description: 'Fin des fichiers Excel ingérables. Offrez une attribution de parking équitable et fluide à vos équipes en 2 minutes chrono.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}

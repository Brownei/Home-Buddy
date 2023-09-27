import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home Buddy',
  description: 'Generated by Olatunji Temitayo and Esiti Brownson for the purpose of assisting real estates',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

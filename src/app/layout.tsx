import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'WilsonAI',
  description: 'AI chatbot powered by Ollama',
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
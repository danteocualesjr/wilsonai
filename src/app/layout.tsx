// Import global styles
import './globals.css'
// Import Next.js Metadata type
import type { Metadata } from 'next'
// Import Providers component for app-wide context/providers
import { Providers } from '@/components/Providers'

// Define metadata for the application
export const metadata: Metadata = {
  title: 'WilsonAI',
  description: 'AI chatbot powered by Ollama',
}

// Root layout component that wraps all pages
export default function RootLayout({
  children,
}: {
  children: React.ReactNode // Type definition for children prop
}) {
  return (
    <html lang="en">
      {/* Suppress hydration warnings from React */}
      <body suppressHydrationWarning={true}>
        {/* Wrap the app in Providers component */}
        <Providers>
          {/* Render page content */}
          {children}
        </Providers>
      </body>
    </html>
  )
}
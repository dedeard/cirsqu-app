import './globals.css'
import 'highlight.js/styles/github-dark.min.css'
import { Analytics } from '@vercel/analytics/react'
import Providers from './Providers'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: 'dark' }}>
      <body className="overflow-x-hidden overflow-y-scroll antialiased">
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  )
}

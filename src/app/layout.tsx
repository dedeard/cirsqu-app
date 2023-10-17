import './globals.css'
import Providers from './Providers'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: 'dark' }}>
      <body className="overflow-x-hidden overflow-y-scroll antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

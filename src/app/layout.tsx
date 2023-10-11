import './globals.css'
import { AuthProvider } from './components/contexts/AuthContext'
import Providers from './Providers'
import { getAuthData } from '@/utils/server-fetch'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const initAuthData = await getAuthData()

  return (
    <html lang="en" className="dark" style={{ colorScheme: 'dark' }}>
      <body className="antialiased">
        <AuthProvider init={initAuthData}>
          <Providers>{children}</Providers>
        </AuthProvider>
      </body>
    </html>
  )
}

import './globals.css'
import { Roboto } from 'next/font/google'
import { AuthProvider } from './components/contexts/AuthContext'
import AppProviders from './AppProviders'
import { getAuthData } from '@/utils/server-fetch'

// Define Roboto font settings
const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Initialize auth data asynchronously
  const initAuthProvider = await getAuthData()

  return (
    <html lang="en" className={roboto.variable}>
      <body className="antialiased">
        <AuthProvider init={initAuthProvider}>
          <AppProviders>{children}</AppProviders>
        </AuthProvider>
      </body>
    </html>
  )
}

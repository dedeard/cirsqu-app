import { Roboto } from 'next/font/google'
import '@/globals.css'
import AppProviders from './AppProviders'

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={roboto.variable}>
      <AppProviders>
        <body className="antialiased">{children}</body>
      </AppProviders>
    </html>
  )
}

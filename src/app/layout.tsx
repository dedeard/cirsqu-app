import './globals.css'
import 'highlight.js/styles/github-dark.min.css'
import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { Analytics } from '@vercel/analytics/react'
import cn from 'classnames'
import Providers from './Providers'

export const metadata: Metadata = {
  metadataBase: new URL('https://cirsqu.dedeard.my.id'),
  title: 'CIRSQU',
  description:
    'Immerse yourself in CIRSQU’s comprehensive screencasts, tailored for developers at all stages. Delve into our diverse coding tutorials and take your programming prowess to new heights!',
  keywords: ['Next.js', 'React', 'TypeScript', 'Server Components', 'NextUI', 'Firebase', 'Stripe', 'Online Course'],
  authors: [
    {
      name: 'Dede Ariansya',
      url: 'https://github.com/dedeard',
    },
  ],
  creator: 'Dede Ariansya',
  publisher: 'Dede Ariansya',
  openGraph: {
    images: '/images/main-og',
    title: 'CIRSQU',
    url: '/',
    description:
      'Immerse yourself in CIRSQU’s comprehensive screencasts, tailored for developers at all stages. Delve into our diverse coding tutorials and take your programming prowess to new heights!',
  },
  alternates: {
    canonical: '/',
  },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const darkModeStore = cookies().get('darkMode')
  let darkMode = true
  if (darkModeStore) {
    darkMode = darkModeStore.value === 'true'
  }

  return (
    <html lang="en" className={cn(darkMode && 'dark')} style={{ colorScheme: darkMode ? 'dark' : 'light' }}>
      <body className="overflow-x-hidden overflow-y-scroll antialiased">
        <Providers darkMode={darkMode}>{children}</Providers>
        <Analytics />
      </body>
    </html>
  )
}

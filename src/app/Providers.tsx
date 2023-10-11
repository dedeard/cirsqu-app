'use client'
import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar'
import { LayoutProvider } from './components/contexts/LayoutContext'
import { MountProvider } from './components/contexts/MountContext'
import { Toaster } from 'react-hot-toast'
import colors from 'tailwindcss/colors'

const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <ProgressBar options={{ showSpinner: false }} color={colors.indigo[600]} shallowRouting />
      <Toaster position="top-right" toastOptions={{ className: '!rounded !shadow-xl !p-4 border border-gray-50' }} />
      <NextUIProvider>
        <NextThemesProvider attribute="class" defaultTheme="dark">
          <MountProvider>
            <LayoutProvider>{children}</LayoutProvider>
          </MountProvider>
        </NextThemesProvider>
      </NextUIProvider>
    </>
  )
}

export default AppProviders

'use client'
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar'
import { LayoutProvider } from './components/contexts/LayoutContext'
import { MountProvider } from './components/contexts/MountContext'
import colors from 'tailwindcss/colors'
import { Toaster } from 'react-hot-toast'
const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <ProgressBar options={{ showSpinner: false }} color={colors.indigo[600]} shallowRouting />
      <Toaster position="top-right" toastOptions={{ className: '!rounded !shadow-xl !p-4 border border-gray-50' }} />
      <MountProvider>
        <LayoutProvider>{children}</LayoutProvider>
      </MountProvider>
    </>
  )
}

export default AppProviders

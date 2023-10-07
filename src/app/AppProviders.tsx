'use client'
import { LayoutProvider } from './components/contexts/LayoutContext'
import { MountProvider } from './components/contexts/MountContext'

const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <MountProvider>
      <LayoutProvider>{children}</LayoutProvider>
    </MountProvider>
  )
}

export default AppProviders

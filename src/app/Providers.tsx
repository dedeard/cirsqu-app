'use client'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { Toaster } from 'react-hot-toast'
import { ProgressBarProvider } from '@/components/contexts/ProgressBarContext'
import { LayoutProvider } from '@/components/contexts/LayoutContext'
import { MountProvider } from '@/components/contexts/MountContext'
import { AuthProvider } from '@/components/contexts/AuthContext'
import { ProfilesProvider } from '@/components/contexts/ProfilesContext'
import { CollectionsProvider } from '@/components/contexts/CollectionContext'
import { SearchProvider } from '@/components/contexts/SearchContext'
import { NotificationProvider } from '@/components/contexts/NotificationContext'

const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Toaster position="top-right" toastOptions={{ className: '!rounded !shadow-xl !p-4 border border-gray-50' }} />
      <ProgressBarProvider>
        <NextThemesProvider attribute="class" defaultTheme="dark">
          <MountProvider>
            <AuthProvider>
              <CollectionsProvider>
                <ProfilesProvider>
                  <NotificationProvider>
                    <LayoutProvider>
                      <SearchProvider>{children}</SearchProvider>
                    </LayoutProvider>
                  </NotificationProvider>
                </ProfilesProvider>
              </CollectionsProvider>
            </AuthProvider>
          </MountProvider>
        </NextThemesProvider>
      </ProgressBarProvider>
    </>
  )
}

export default Providers

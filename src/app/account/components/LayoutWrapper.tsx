'use client'
import Header from '@/components/features/Header'
import Footer from '@/components/elements/Footer'
import Sidebar from './Sidebar'
import { useAuth } from '@/components/contexts/AuthContext'
import AuthLoading from './AuthLoading'
import { usePathname } from 'next/navigation'
import { useLayout } from '@/components/contexts/LayoutContext'

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { initLoading, profile } = useAuth({
    whenNotAuthed: '/sign-in?next=' + pathname,
    whenAuthedProfileNotExists: '/complete-profile?next=' + pathname,
  })
  const layout = useLayout()

  return (
    <>
      <Header noSidebar />
      {(initLoading || !profile) && <AuthLoading />}
      {!initLoading && profile && (
        <>
          <div className="flex min-h-layout flex-col">
            <div className="container flex flex-col p-3 md:flex-row md:items-start">
              <div className="md:sticky md:top-0" style={{ top: layout.headerPosition }}>
                <Sidebar />
              </div>
              <main className="flex-1">{children}</main>
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  )
}

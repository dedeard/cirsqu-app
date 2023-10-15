'use client'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Sidebar from './components/Sidebar'
import { useAuth } from '@/components/contexts/AuthContext'
import AuthLoading from './components/AuthLoading'
import { usePathname } from 'next/navigation'

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { initLoading, profile } = useAuth({ whenNotAuthed: '/sign-in?next=' + pathname })
  return (
    <>
      <Header />
      {(initLoading || !profile) && <AuthLoading />}
      {!initLoading && profile && (
        <>
          <div className="flex min-h-screen flex-col">
            <div className="container flex flex-col p-3 md:flex-row md:items-start">
              <div className="md:sticky md:top-0">
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

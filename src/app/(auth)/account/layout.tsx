'use client'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Sidebar from './components/Sidebar'
import { useAuthRequired } from '@/components/contexts/AuthRequiredContext'

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const { profile } = useAuthRequired()
  return (
    <>
      <Header profile={profile} />
      <div className="flex min-h-screen flex-col">
        <div className="container flex flex-col p-3 md:flex-row md:items-start">
          <div className="md:sticky md:top-[4.75rem]">
            <Sidebar />
          </div>
          <main className="flex-1">{children}</main>
        </div>
      </div>
      <Footer />
    </>
  )
}

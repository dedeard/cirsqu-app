'use client'
import Header from '@/app/components/layout/Header'
import Footer from '@/app/components/layout/Footer'
import { useAuth } from '../components/AuthContext'
import Sidebar from './components/Sidebar'

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const { profile } = useAuth()
  return (
    <>
      <Header noSidebar container profile={profile} />
      <div className="flex min-h-screen flex-col bg-gray-100 pt-16 font-sans text-gray-700">
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

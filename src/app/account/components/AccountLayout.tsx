'use client'
import Header from '@/app/components/layout/Header'
import Footer from '@/app/components/layout/Footer'
import Sidebar from './Sidebar'
import { useAuth } from './AuthContext'
import { Toaster } from 'react-hot-toast'

const AccountLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { profile } = useAuth()
  return (
    <>
      <Toaster position="top-right" toastOptions={{ className: '!rounded !shadow-xl !p-4 border border-gray-50' }} />
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

export default AccountLayout

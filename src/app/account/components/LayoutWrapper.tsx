'use client'
import Sidebar from './Sidebar'
import { useAuth } from '@/components/contexts/AuthContext'
import { usePathname } from 'next/navigation'

const LayoutWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname()
  const { initLoading, profile } = useAuth({
    whenNotAuthed: '/sign-in?next=' + pathname,
    whenAuthedProfileNotExists: '/complete-profile?next=' + pathname,
  })

  if (initLoading || !profile) {
    return (
      <div className="m-auto flex w-full p-3">
        <div className="relative m-auto flex h-[280px] w-full overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-800 md:max-w-[420px]">
          <span className="skeleton absolute bottom-0 left-0 right-0 top-0 opacity-10" />
          <div className="m-auto h-16 w-16 animate-spin rounded-full border-2 border-neutral-200 !border-t-blue-600 dark:border-neutral-800" />
        </div>
      </div>
    )
  }

  return (
    <div className="container flex flex-col px-3 md:flex-row md:items-start">
      <div className="py-3 md:sticky md:top-16">
        <Sidebar />
      </div>
      <main className="flex-1 pb-3 md:pt-3 lg:max-w-3xl">{children}</main>
    </div>
  )
}

export default LayoutWrapper

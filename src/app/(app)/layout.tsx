'use client'
import React from 'react'
import Footer from '@/components/elements/Footer'
import Header from '@/components/features/Header'
import { useAuth } from '@/components/contexts/AuthContext'
import { SidebarLinkPropTypes } from '@/components/features/Sidebar/SidebarLink'
import SidebarWrapper from '@/components/features/Sidebar/SidebarWrapper'
import SidebarProfile from '@/components/features/Sidebar/SidebarProfile'
import SidebarLinks from '@/components/features/Sidebar/SidebarLinks'

const baseLinks: SidebarLinkPropTypes[] = [
  { href: '/', text: 'Home' },
  { href: '/lessons', text: 'Lessons' },
  { href: '/subjects', text: 'Subjects' },
  { href: '/pro', text: 'Premium' },
  {},
]

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { profile, initLoading } = useAuth()
  const [links, setLinks] = React.useState(baseLinks)

  React.useEffect(() => {
    if (!initLoading && profile) {
      setLinks([
        ...baseLinks,
        { href: '/collections', text: 'Collections' },
        { href: '/notifications', text: 'Notifications', badge: { color: 'danger', text: 9 } },
        { href: '/account', text: 'My Account' },
      ])
    } else {
      setLinks(baseLinks)
    }
  }, [initLoading, profile])

  return (
    <>
      <Header />
      <main className="flex min-h-layout flex-col">
        <div className="container flex flex-col px-3 lg:flex-row lg:items-start">
          <SidebarWrapper>
            <SidebarProfile />
            <SidebarLinks links={links} skeletonCount={initLoading ? 3 : undefined} />
          </SidebarWrapper>
          <div className="flex-1 py-3">{children}</div>
        </div>
      </main>
      <Footer />
    </>
  )
}

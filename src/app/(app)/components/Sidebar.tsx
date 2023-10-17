'use client'
import React from 'react'
import Avatar from '@/components/elements/Avatar'
import SidebarLinks from './SidebarLinks'
import { useAuth } from '@/components/contexts/AuthContext'
import { Card, CardHeader, Divider } from '@nextui-org/react'
import Link from 'next/link'
import Logo from '@/components/svg/Logo'
import MenuToggle from '@/components/layout/Header/MenuToggle'
import classNames from 'classnames'
import { useLayout } from '@/components/contexts/LayoutContext'
import { useParams } from 'next/navigation'

const Sidebar: React.FC = () => {
  const { profile } = useAuth()
  const pathname = useParams()
  const layout = useLayout()

  // React.useEffect(() => {
  //   layout.toggleSidebar(false)
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [pathname])

  return (
    <aside
      className={classNames(
        layout.sidebarOpen ? '-translate-x-0' : '-translate-x-full',
        'fixed bottom-0 left-0 top-0 z-50 flex w-64 flex-col border-r border-r-divider bg-background/50 backdrop-blur transition-transform lg:sticky lg:top-0 lg:z-10 lg:block lg:-translate-x-0 lg:border-0 lg:bg-transparent lg:pt-0 lg:backdrop-blur-none lg:transition-none',
      )}
    >
      <div className="flex h-16 px-3 lg:hidden">
        <div className="flex flex-1">
          <Link aria-label="CirSqu" href="/" className="flex items-center focus:outline-none">
            <Logo className="block h-10 w-10 text-primary" />
            <span className="ml-4 block text-xl uppercase tracking-widest">CirSqu</span>
          </Link>
        </div>
        <div className="flex items-center justify-center">
          <MenuToggle />
        </div>
      </div>

      <Divider className="lg:hidden" />

      <div className="w-full flex-1 overflow-y-auto p-3 lg:mb-0 lg:overflow-visible lg:pl-0 lg:pr-3">
        <Card className="mb-3">
          <CardHeader className="px-4">
            <div className="flex w-full items-center">
              <Avatar name={profile?.name || ''} className="h-12 w-12" file={profile?.avatar} />
              <div className="flex-1 overflow-hidden pl-2">
                <h3 className="mb-1 truncate font-semibold capitalize leading-none">{profile?.name}</h3>
                <span className="block truncate text-tiny leading-none">@{profile?.username}</span>
              </div>
            </div>
          </CardHeader>
        </Card>

        <SidebarLinks />
      </div>
    </aside>
  )
}

export default Sidebar

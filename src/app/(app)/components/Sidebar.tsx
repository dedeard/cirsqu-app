'use client'
import React from 'react'
import Avatar from '@/components/elements/Avatar'
import SidebarLinks from './SidebarLinks'
import { useAuth } from '@/components/contexts/AuthContext'
import { Card, CardBody, Divider, Skeleton } from '@nextui-org/react'
import Link from 'next/link'
import Logo from '@/components/svg/Logo'
import MenuToggle from '@/components/layout/Header/MenuToggle'
import classNames from 'classnames'
import { useLayout } from '@/components/contexts/LayoutContext'

const Sidebar: React.FC = () => {
  const { profile, initLoading } = useAuth()
  const { sidebarOpen, toggleSidebar, headerPosition } = useLayout()
  const [isSmall, setIsSmall] = React.useState(false)

  React.useEffect(() => {
    const onResize = () => {
      setIsSmall(window.innerWidth <= 1024)
    }
    const onScroll = () => {
      toggleSidebar(false)
    }
    onResize()
    window.addEventListener('resize', onResize)
    window.addEventListener('scroll', onScroll)
    return () => {
      window.removeEventListener('resize', onResize)
      window.removeEventListener('scroll', onScroll)
    }
  }, [toggleSidebar])

  return (
    <>
      <span
        className={classNames(
          sidebarOpen && isSmall ? 'pointer-events-auto opacity-30' : 'pointer-events-none opacity-0',
          'fixed bottom-0 left-0 right-0 top-0 z-[49] bg-white dark:bg-black',
        )}
        onClick={() => toggleSidebar(false)}
      />
      <aside
        className={classNames(
          sidebarOpen ? '-translate-x-0' : '-translate-x-full',
          'fixed bottom-0 left-0 top-0 z-50 flex w-64 flex-col border-r border-r-divider bg-background/50 backdrop-blur transition-transform lg:sticky lg:z-10 lg:block lg:-translate-x-0 lg:border-0 lg:bg-transparent lg:pt-0 lg:backdrop-blur-none lg:transition-none',
        )}
        style={{ top: isSmall ? 0 : headerPosition }}
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

        <div className="chrome-scrollbar w-full flex-1 overflow-y-auto p-3 lg:mb-0 lg:overflow-visible lg:pl-0 lg:pr-3">
          {!initLoading && profile && (
            <Card className="mb-3 border border-divider bg-opacity-75 dark:border-transparent" shadow="none">
              <CardBody className="px-4 py-3">
                <div className="flex w-full items-center">
                  <Avatar name={profile.name} className="h-12 w-12" file={profile.avatar} />
                  <div className="flex-1 overflow-hidden pl-2">
                    <h3 className="mb-1 truncate font-semibold capitalize leading-none">{profile.name}</h3>
                    <span className="block truncate text-tiny leading-none">@{profile.username}</span>
                  </div>
                </div>
              </CardBody>
            </Card>
          )}

          {initLoading && (
            <Card className="mb-3 border border-divider bg-opacity-75 dark:border-transparent">
              <CardBody className="px-4 py-3">
                <div className="flex w-full items-center">
                  <Skeleton className="block h-12 w-12 rounded-full" />
                  <div className="flex-1 pl-2">
                    <Skeleton className="mb-1 block h-4 w-full rounded-full" />
                    <Skeleton className="block h-3 w-3/4 rounded-full" />
                  </div>
                </div>
              </CardBody>
            </Card>
          )}

          <SidebarLinks />
        </div>
      </aside>
    </>
  )
}

export default Sidebar

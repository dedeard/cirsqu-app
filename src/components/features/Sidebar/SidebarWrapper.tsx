'use client'
import React from 'react'
import Link from 'next/link'
import cn from 'classnames'
import Logo from '@/components/svg/Logo'
import { useLayout } from '@/components/contexts/LayoutContext'
import MenuToggle from '../Header/MenuToggle'

const SidebarWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { sidebarOpen, toggleSidebar } = useLayout()
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
        className={cn(
          sidebarOpen && isSmall ? 'pointer-events-auto opacity-30' : 'pointer-events-none opacity-0',
          'fixed bottom-0 left-0 right-0 top-0 z-[49] bg-white dark:bg-black',
        )}
        onClick={() => toggleSidebar(false)}
      />
      <aside
        className={cn(
          sidebarOpen ? '-translate-x-0' : '-translate-x-full',
          'fixed bottom-0 left-0 top-0 z-50 flex w-64 flex-col border-r border-neutral-200 bg-white/80 backdrop-blur transition-transform dark:border-neutral-800 dark:bg-neutral-900/80 lg:sticky lg:top-16 lg:z-10 lg:block lg:-translate-x-0 lg:border-0 lg:bg-transparent lg:pt-0 lg:backdrop-blur-none lg:transition-none',
        )}
      >
        <div className="flex h-16 px-3 lg:hidden">
          <div className="flex flex-1">
            <Link aria-label="CirSqu" href="/" className="flex items-center focus:outline-none">
              <Logo className="block h-10 w-10 text-blue-600" />
              <span className="ml-4 block text-xl uppercase tracking-widest">CirSqu</span>
            </Link>
          </div>
          <div className="flex items-center justify-center">
            <MenuToggle />
          </div>
        </div>

        <div className="chrome-scrollbar w-full flex-1 overflow-y-auto border-t border-neutral-200 p-3 dark:border-neutral-800 lg:mb-0 lg:overflow-visible lg:border-t-0 lg:pl-0 lg:pr-3">
          {children}
        </div>
      </aside>
    </>
  )
}

export default SidebarWrapper

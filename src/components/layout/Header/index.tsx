'use client'
import Link from 'next/link'
import Logo from '../../svg/Logo'
import SearchToggle from './SearchToggle'
import MenuToggle from './MenuToggle'
import MainMenu from './MainMenu'
import { Navbar } from '@nextui-org/react'
import ThemeToggle from './ThemeToggle'

type HeaderPropTypes = {
  profile?: IProfile | null
  sidebarOpen?: boolean
  noSidebar?: boolean
  hideSearch?: boolean
  onlyBrand?: boolean
  toggleSidebar?: (sidebarOpen?: boolean) => void
}

const Header: React.FC<HeaderPropTypes> = ({ profile, noSidebar, hideSearch, onlyBrand, toggleSidebar }) => {
  return (
    <Navbar maxWidth="full" isBlurred={false} shouldHideOnScroll className="bg-content1 shadow-medium">
      <div className="container flex h-full w-full items-center">
        {onlyBrand ? (
          <>
            <Link aria-label="CirSqu" href="/" className="mr-auto flex items-center justify-center px-3 focus:outline-none">
              <Logo className="text-primary block h-10 w-10" />
              <span className="ml-4 block text-xl uppercase tracking-widest">CirSqu</span>
            </Link>
            <ThemeToggle />
          </>
        ) : (
          <>
            <div className="hidden lg:flex lg:w-64">
              <Link aria-label="CirSqu" href="/" className="flex items-center justify-center px-3 focus:outline-none">
                <Logo className="text-primary block h-10 w-10" />
                <span className="ml-4 block text-xl uppercase tracking-widest">CirSqu</span>
              </Link>
            </div>
            <div className="flex flex-1">
              <Link aria-label="CirSqu" href="/" className="flex items-center justify-center px-3 focus:outline-none lg:hidden">
                <Logo className="text-primary block h-10 w-10" />
              </Link>
              <div className="flex flex-1 items-center justify-end md:justify-start">
                <div className="flex lg:pl-3">
                  {!hideSearch && <SearchToggle />}
                  {!noSidebar && <MenuToggle toggleSidebar={toggleSidebar} />}
                  <ThemeToggle />
                </div>
              </div>
              <div className="flex p-3 md:ml-auto">
                <MainMenu profile={profile} />
              </div>
            </div>
          </>
        )}
      </div>
    </Navbar>
  )
}

export default Header

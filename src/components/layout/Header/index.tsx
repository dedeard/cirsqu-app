'use client'
import Link from 'next/link'
import Logo from '../../svg/Logo'
import SearchToggle from './SearchToggle'
import MenuToggle from './MenuToggle'
import MainMenu from './MainMenu'
import { Navbar, NavbarProps } from '@nextui-org/react'
import ThemeToggle from './ThemeToggle'
import { useAuth } from '@/components/contexts/AuthContext'
import classNames from 'classnames'

type HeaderPropTypes = {
  sidebarOpen?: boolean
  noSidebar?: boolean
  hideSearch?: boolean
  onlyBrand?: boolean
  toggleSidebar?: (sidebarOpen?: boolean) => void
} & NavbarProps

const Header: React.FC<HeaderPropTypes> = ({ noSidebar, hideSearch, onlyBrand, toggleSidebar, className, ...props }) => {
  return (
    <Navbar maxWidth="full" shouldHideOnScroll isBordered className={classNames(className, '[&>header]:px-0')} {...props}>
      <div className="container flex h-full w-full items-center">
        {onlyBrand ? (
          <>
            <Link aria-label="CirSqu" href="/" className="mr-auto flex items-center justify-center px-3 focus:outline-none">
              <Logo className="block h-10 w-10 text-primary" />
              <span className="ml-4 block text-xl uppercase tracking-widest">CirSqu</span>
            </Link>
            <div className="px-3">
              <ThemeToggle />
            </div>
          </>
        ) : (
          <>
            <div className="hidden lg:flex lg:w-64">
              <Link aria-label="CirSqu" href="/" className="flex items-center justify-center px-3 focus:outline-none">
                <Logo className="block h-10 w-10 text-primary" />
                <span className="ml-4 block text-xl uppercase tracking-widest">CirSqu</span>
              </Link>
            </div>
            <div className="flex flex-1">
              <Link aria-label="CirSqu" href="/" className="flex items-center justify-center px-3 focus:outline-none lg:hidden">
                <Logo className="block h-10 w-10 text-primary" />
              </Link>
              <div className="flex flex-1 items-center justify-end md:justify-start">
                <div className="flex lg:pl-3">
                  {!hideSearch && <SearchToggle />}
                  {!noSidebar && <MenuToggle toggleSidebar={toggleSidebar} />}
                  <ThemeToggle />
                </div>
              </div>
              <div className="flex px-3 md:ml-auto">
                <MainMenu />
              </div>
            </div>
          </>
        )}
      </div>
    </Navbar>
  )
}

export default Header

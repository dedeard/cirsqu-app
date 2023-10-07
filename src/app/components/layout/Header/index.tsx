'use client'
import Link from 'next/link'
import classNames from 'classnames'
import Logo from '../../svg/Logo'
import SearchToggle from './SearchToggle'
import MenuToggle from './MenuToggle'
import MainMenu from './MainMenu'
import { IProfile } from '@/types'

type HeaderPropTypes = {
  profile?: IProfile | null
  container?: boolean
  noSidebar?: boolean
  sidebarOpen?: boolean
  hideSearch?: boolean
  onlyBrand?: boolean
  toggleSidebar?: (sidebarOpen?: boolean) => void
}

const Header: React.FC<HeaderPropTypes> = ({ profile, container, noSidebar, sidebarOpen, hideSearch, onlyBrand, toggleSidebar }) => {
  return (
    <div
      className={classNames(
        !noSidebar && sidebarOpen && 'shadow-lg',
        'fixed left-0 right-0 top-0 z-40 flex h-16 w-full items-center border-b border-gray-200 bg-white transition-shadow lg:shadow-none',
      )}
    >
      <div className={classNames(container && 'container', 'flex flex-1')}>
        {onlyBrand ? (
          <Link aria-label="CirSqu" href="/" className="flex items-center justify-center p-3 text-primary-600 focus:outline-none">
            <Logo className="block h-9 w-9" />
            <span className="ml-4 block text-xl uppercase leading-none tracking-widest text-gray-950">CirSqu</span>
          </Link>
        ) : (
          <>
            <div className="hidden lg:flex lg:w-64">
              <Link aria-label="CirSqu" href="/" className="flex items-center justify-center p-3 text-primary-600 focus:outline-none">
                <Logo className="block h-9 w-9" />
                <span className="ml-4 block text-xl uppercase leading-none tracking-widest text-gray-950">CirSqu</span>
              </Link>
            </div>
            <div className={classNames(!container && 'container', 'flex flex-1')}>
              <Link
                aria-label="CirSqu"
                href="/"
                className="flex items-center justify-center p-3 text-primary-600 focus:outline-none lg:hidden"
              >
                <Logo className="block h-9 w-9" />
              </Link>
              <div className="flex flex-1 justify-end md:justify-start">
                <div className="flex py-3 lg:pl-3">
                  {!hideSearch && <SearchToggle />}
                  {!noSidebar && <MenuToggle toggleSidebar={toggleSidebar} />}
                </div>
              </div>
              <div className="flex p-3 md:ml-auto">
                <MainMenu profile={profile} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Header

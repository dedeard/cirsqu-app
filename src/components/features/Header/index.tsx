'use client'
import Link from 'next/link'
import cn from 'classnames'
import Logo from '../../svg/Logo'
import SearchToggle from './SearchToggle'
import MenuToggle from './MenuToggle'
import MainMenu from './MainMenu'
import ThemeToggle from './ThemeToggle'
import SearchModal from '../SearchModal'

type HeaderPropTypes = {
  sidebarOpen?: boolean
  noSidebar?: boolean
  hideSearch?: boolean
  hideTheme?: boolean
  onlyBrand?: boolean
} & React.HTMLAttributes<HTMLDivElement>

const Header: React.FC<HeaderPropTypes> = ({ noSidebar, hideSearch, onlyBrand, hideTheme, className, ...props }) => {
  return (
    <>
      <SearchModal />
      <nav
        className={cn(
          className,
          'fixed left-0 right-0 top-0 z-50 h-16 bg-white/80 ring-[1px] ring-neutral-200 backdrop-blur dark:bg-neutral-900/80 dark:ring-neutral-800',
        )}
        {...props}
      >
        <div className="container flex h-full w-full items-center">
          {onlyBrand ? (
            <>
              <Link aria-label="CirSqu" href="/" className="mr-auto flex items-center justify-center px-3 focus:outline-none">
                <Logo className="block h-10 w-10 text-blue-600" />
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
                  <Logo className="block h-10 w-10 text-blue-600" />
                  <span className="ml-4 block text-xl uppercase tracking-widest">CirSqu</span>
                </Link>
              </div>
              <div className="flex flex-1">
                <Link aria-label="CirSqu" href="/" className="flex items-center justify-center px-3 focus:outline-none lg:hidden">
                  <Logo className="block h-10 w-10 text-blue-600" />
                </Link>
                <div className="flex flex-1 items-center justify-end md:justify-start">
                  <div className="flex lg:pl-3">
                    {!hideSearch && <SearchToggle />}
                    {!noSidebar && <MenuToggle />}
                    {!hideTheme && <ThemeToggle />}
                  </div>
                </div>
                <div className="flex px-3 md:ml-auto">
                  <MainMenu />
                </div>
              </div>
            </>
          )}
        </div>
      </nav>
    </>
  )
}

export default Header

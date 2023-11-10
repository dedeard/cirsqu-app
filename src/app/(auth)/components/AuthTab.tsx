'use client'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import cn from 'classnames'

export const AuthTab: React.FC = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const next = searchParams.get('next')

  if (pathname !== '/sign-in' && pathname !== '/sign-up') return null

  return (
    <nav className="flex w-full text-sm">
      <Link
        href={`/sign-up${next ? '?next=' + next : ''}`}
        className={cn(
          pathname === '/sign-up' ? 'border-transparent' : 'border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900',
          'flex h-14 flex-1 items-center justify-center border-b  py-6 uppercase tracking-widest',
        )}
      >
        Sign up
      </Link>
      <span className="block h-14 w-px bg-neutral-200 dark:bg-neutral-800" />
      <Link
        href={`/sign-in${next ? '?next=' + next : ''}`}
        className={cn(
          pathname === '/sign-in' ? 'border-transparent' : 'border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900',
          'flex h-14 flex-1 items-center justify-center border-b  py-6 uppercase tracking-widest',
        )}
      >
        Sign in
      </Link>
    </nav>
  )
}

export default AuthTab

'use client'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'

export const AuthTab: React.FC = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const next = searchParams.get('next')

  return (
    <div className="flex w-full">
      <Link
        href={`/sign-up${next ? '?next=' + next : ''}`}
        className="flex h-14 flex-1 items-center justify-center border-b bg-gray-100 text-sm font-bold uppercase tracking-widest text-gray-700 no-underline data-[active=true]:border-transparent data-[active=true]:bg-white"
        data-active={pathname === '/sign-up'}
      >
        Sign up
      </Link>
      <i className="block w-px bg-gray-300" />
      <Link
        href={`/sign-in${next ? '?next=' + next : ''}`}
        className="flex h-14 flex-1 items-center justify-center border-b bg-gray-100 text-sm font-bold uppercase tracking-widest text-gray-700 no-underline data-[active=true]:border-transparent data-[active=true]:bg-white"
        data-active={pathname === '/sign-in'}
      >
        Sign in
      </Link>
    </div>
  )
}

export default AuthTab

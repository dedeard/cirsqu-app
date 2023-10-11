'use client'
import { Tab, Tabs } from '@nextui-org/react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'

export const AuthTab: React.FC = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const next = searchParams.get('next')

  if (pathname !== '/sign-in' && pathname !== '/sign-up') return null

  return (
    <Tabs fullWidth size="lg" selectedKey={pathname}>
      <Tab
        key="/sign-up"
        href={`/sign-up${next ? '?next=' + next : ''}`}
        title="Sign up"
        className="py-6 uppercase tracking-widest"
        as={Link}
      />
      <Tab
        key="/sign-in"
        href={`/sign-in${next ? '?next=' + next : ''}`}
        title="Sign in"
        className="py-6 uppercase tracking-widest"
        as={Link}
      />
    </Tabs>
  )
}

export default AuthTab

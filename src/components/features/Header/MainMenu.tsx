import Link from 'next/link'
import NotificationToggle from './NotificationToggle'
import ProfileDropdown from './ProfileDropdown'
import { useAuth } from '@/components/contexts/AuthContext'

const MainMenu: React.FC = () => {
  const { profile, initLoading } = useAuth()

  if (initLoading) {
    return (
      <>
        <span className="skeleton h-10 w-10 rounded-full" />
        <span className="skeleton ml-3 h-10 w-10 rounded-full" />
      </>
    )
  }

  if (profile) {
    return (
      <>
        <NotificationToggle />
        <ProfileDropdown profile={profile} />
      </>
    )
  }

  return (
    <>
      <Link
        href="/sign-in"
        className="mr-3 hidden h-10 items-center justify-center rounded-lg bg-neutral-200 px-4 text-sm text-neutral-800 dark:bg-neutral-800 dark:text-neutral-100 md:flex"
      >
        Sign In
      </Link>
      <Link href="/sign-up" className="flex h-10 items-center justify-center rounded-lg bg-blue-600 px-4 text-sm text-white">
        Create Your Account
      </Link>
    </>
  )
}

export default MainMenu

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
        className="hoverable-default mr-3 hidden h-10 items-center justify-center rounded-lg border px-4 text-sm md:flex"
      >
        Sign In
      </Link>
      <Link href="/sign-up" className="hoverable-blue flex h-10 items-center justify-center rounded-lg px-4 text-sm">
        Create Your Account
      </Link>
    </>
  )
}

export default MainMenu

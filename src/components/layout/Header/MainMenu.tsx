import Link from 'next/link'
import NotificationToggle from './NotificationToggle'
import ProfileDropdown from './ProfileDropdown'
import { Button, Skeleton } from '@nextui-org/react'
import { useAuth } from '@/components/contexts/AuthContext'

const MainMenu: React.FC = () => {
  const { profile, initLoading } = useAuth()

  if (initLoading) {
    return (
      <>
        <Skeleton className="flex h-10 w-10 rounded-full" />
        <Skeleton className="ml-3 flex h-10 w-10 rounded-full" />
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
      <Button as={Link} href="/sign-in" variant="flat" className="mr-3 hidden md:flex">
        Sign In
      </Button>
      <Button as={Link} href="/sign-up" color="primary">
        Create Your Account
      </Button>
    </>
  )
}

export default MainMenu

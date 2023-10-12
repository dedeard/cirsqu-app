import Link from 'next/link'
import NotificationToggle from './NotificationToggle'
import ProfileDropdown from './ProfileDropdown'
import { Button } from '@nextui-org/react'

const MainMenu: React.FC<{ profile?: IProfile | null }> = ({ profile }) => {
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
        Masuk
      </Button>
      <Button as={Link} href="/sign-up" color="primary">
        Buat Akun
      </Button>
    </>
  )
}

export default MainMenu

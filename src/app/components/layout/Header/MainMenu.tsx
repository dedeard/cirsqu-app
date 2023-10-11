import Link from 'next/link'
import NotificationToggle from './NotificationToggle'
import ProfileDropdown from './ProfileDropdown'

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
      <Link
        href="/sign-in"
        className="flex h-9 items-center justify-center rounded-full bg-gray-100 px-4 text-sm text-gray-700 hover:bg-gray-200"
      >
        Masuk
      </Link>
      <Link
        href="/sign-up"
        className="ml-3 flex h-9 items-center justify-center rounded-full bg-primary-600 px-4 text-sm text-white hover:bg-primary-600"
      >
        Buat Akun
      </Link>
    </>
  )
}

export default MainMenu

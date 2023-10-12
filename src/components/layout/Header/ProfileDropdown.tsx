import React from 'react'
import { Button } from '@nextui-org/react'
import Link from 'next/link'
import Avatar from '@/components/elements/Avatar'

const ProfileDropdown: React.FC<{ profile: IProfile }> = ({ profile }) => {
  return (
    <div className="dropdown-wrapper relative ml-3 h-10 w-10">
      <button className="block h-10 w-10 rounded-full p-0">
        <Avatar name={profile.name} file={profile.avatar} />
      </button>
      <div className="dropdown-drop absolute right-0 top-full mt-3 w-60">
        <span className="absolute -top-1 right-1 h-6 w-6 rotate-45 transform rounded bg-primary-600" />
        <div className="relative z-10 bg-content1 p-3 shadow-large">
          <div className="flex p-3">
            <div className="m-auto block h-24 w-24 rounded-full">
              <Avatar name={profile.name} file={profile.avatar} className="block h-full w-full" />
            </div>
          </div>
          <h3 className="text-md capitalized w-full truncate text-center font-semibold">{profile.name}</h3>
          <p className="w-full truncate text-center text-sm">@{profile.username}</p>
          <div className="grid grid-cols-1 gap-3 py-3">
            <Button href="/account" className="font-semibold uppercase tracking-wider" as={Link}>
              Dasbor Saya
            </Button>
            <Button href="/account" className="font-semibold uppercase tracking-wider" as={Link}>
              Edit Profil
            </Button>
          </div>
          <Button color="danger" className="font-semibold uppercase tracking-wider">
            Keluar
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ProfileDropdown

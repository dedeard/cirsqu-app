import React from 'react'
import Avatar from '../../elements/Avatar'
import { storageUrl } from '@/libs/firebase'

const ProfileDropdown: React.FC<{ profile: IProfile }> = ({ profile }) => {
  return (
    <div className="dropdown-wrapper relative ml-3 h-9 w-9">
      <button className="block h-9 w-9 rounded-full p-0">
        <Avatar name={profile.name} photoUrl={storageUrl(profile.avatar)} className="block h-full w-full rounded-full" />
      </button>
      <div className="dropdown-drop absolute right-0 top-full mt-3 w-60">
        <span className="absolute -top-1 right-1 h-6 w-6 rotate-45 transform rounded bg-primary-600" />
        <div className="relative z-10 border border-gray-100 bg-white p-3 shadow-lg">
          <div className="flex p-3">
            <figure className="m-auto block h-24 w-24 rounded-full">
              <Avatar name={profile.name} photoUrl={storageUrl(profile.avatar)} className="block h-full w-full rounded-full" />
            </figure>
          </div>
          <h3 className="text-md capitalized w-full truncate text-center font-semibold">{profile.name}</h3>
          <p className="w-full truncate text-center text-sm">@{profile.username}</p>
          <div className="pt-3">
            <a className="mb-3 flex h-9 w-full items-center justify-center rounded-full border bg-gray-100 p-0 text-sm font-semibold uppercase tracking-wider hover:bg-gray-200">
              Dasbor Saya
            </a>
            <a className="mb-3 flex h-9 w-full items-center justify-center rounded-full border bg-gray-100 p-0 text-sm font-semibold uppercase tracking-wider hover:bg-gray-200">
              Edit Profil
            </a>
            <a className="inline-block rounded-full bg-red-600 px-4 py-3 text-sm font-semibold uppercase leading-none tracking-wider text-white hover:bg-red-700">
              Keluar
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileDropdown

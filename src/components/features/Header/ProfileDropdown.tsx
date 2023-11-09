import React from 'react'
import Link from 'next/link'
import Avatar from '@/components/elements/Avatar'
import { auth } from '@/utils/firebase'

const ProfileDropdown: React.FC<{ profile: IProfile }> = ({ profile }) => {
  const logout = () => {
    auth.signOut()
  }

  return (
    <div className="dropdown-wrapper relative ml-3 h-10 w-10">
      <button role="button" className="block h-10 w-10 rounded-full p-0">
        <Avatar
          name={profile.name}
          file={profile.avatar}
          premium={profile.premium}
          className="bg-neutral-200 text-sm text-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
        />
      </button>
      <div className="dropdown-drop absolute right-0 top-full mt-3 w-60">
        <span className="absolute -top-1 right-2 h-6 w-6 rotate-45 transform rounded bg-primary" />
        <div className="relative z-10 overflow-hidden rounded-lg bg-white shadow-xl dark:bg-neutral-900">
          <div className="pb-0 pt-6">
            <div className="flex flex-1 flex-col items-center justify-center">
              <Avatar
                name={profile.name}
                file={profile.avatar}
                size={96}
                className="m-auto mb-3 bg-neutral-200 text-2xl text-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
              />
              <h3 className="text-md capitalized w-full truncate text-center font-semibold">{profile.name}</h3>
              <p className="w-full truncate text-center text-sm">@{profile.username}</p>
            </div>
          </div>
          <div className="flex flex-col gap-3 p-3">
            <Link href="/account/edit-profile" className="hoverable-default block rounded-lg border p-2 text-center text-sm font-semibold">
              Edit Profile
            </Link>
            <Link href="/account/subscription" className="hoverable-default block rounded-lg border p-2 text-center text-sm font-semibold">
              Subscription
            </Link>
          </div>
          <div className="bg-neutral-200/30 p-3 dark:bg-neutral-800/30">
            <button className="hoverable-red flex h-10 items-center rounded-lg px-4 text-sm font-semibold" onClick={logout}>
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileDropdown

import React from 'react'
import Avatar from '@/app/components/elements/Avatar'
import { useAuth } from './AuthContext'
import storageUrl from '@/utils/storage-url'
import SidebarLinks from './SidebarLinks'
import { timestampToDate } from '@/utils/firestore'

const Sidebar: React.FC = () => {
  const { profile } = useAuth()

  return (
    <aside className="mb-3 w-full md:mb-0 md:w-64 md:pr-3">
      <div className="mb-3 border bg-white text-center">
        <div className="flex flex-col items-center justify-center p-3 pt-8">
          <div className="mb-3 h-24 w-24 rounded-full border ">
            <Avatar name={profile.name} photoUrl={storageUrl(profile.avatar)} className="block h-full w-full rounded-full" />
          </div>
          <h3 className="mb-1 w-full truncate text-xl font-semibold capitalize leading-none">{profile.name}</h3>
          <p className="w-full truncate leading-none text-gray-700">@{profile.username}</p>
        </div>
        <div className="border-t bg-gray-50 py-1">
          <span className="text-xs">Joined {timestampToDate(profile.createdAt).fromNow()}</span>
        </div>
      </div>

      <SidebarLinks />
    </aside>
  )
}

export default Sidebar

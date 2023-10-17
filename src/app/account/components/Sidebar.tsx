'use client'
import React from 'react'
import Avatar from '@/components/elements/Avatar'
import SidebarLinks from './SidebarLinks'
import { timestampToDate } from '@/utils/firestore'
import { useAuth } from '@/components/contexts/AuthContext'

const Sidebar: React.FC = () => {
  const { profile } = useAuth()
  return (
    <aside className="mb-3 w-full md:mb-0 md:w-64 md:pr-3">
      <div className="mb-6 pt-5">
        <div className="mb-3 flex flex-col items-center justify-center text-center">
          <div className="mb-3 h-20 w-20 rounded-full border ">
            <Avatar name={profile?.name || ''} file={profile?.avatar} isBordered size="lg" className="block h-full w-full rounded-full" />
          </div>
          <h3 className="mb-1 w-full truncate text-xl font-semibold capitalize leading-none">{profile?.name}</h3>
          <p className="w-full truncate leading-none opacity-80">@{profile?.username}</p>
        </div>
        <span className="block w-full text-center text-xs">Joined {timestampToDate(profile?.createdAt)?.fromNow()}</span>
      </div>

      <SidebarLinks />
    </aside>
  )
}

export default Sidebar

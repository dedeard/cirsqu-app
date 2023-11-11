'use client'
import React from 'react'
import Avatar from '@/components/elements/Avatar'
import { useAuth } from '@/components/contexts/AuthContext'
import { timestampToDate } from '@/utils/firestore'

const SidebarProfile: React.FC<{ isFlat?: boolean }> = ({ isFlat }) => {
  const { profile, initLoading } = useAuth()

  if (!initLoading && !profile) return null

  if (isFlat) {
    return (
      <div className="mb-6 pt-5">
        {profile && (
          <>
            <div className="mb-3 flex flex-col items-center justify-center text-center">
              <Avatar
                name={profile.name}
                file={profile.avatar}
                size={80}
                className="mb-3 rounded-full bg-neutral-200 dark:bg-neutral-800"
              />
              <h3 className="mb-1 w-full truncate text-xl font-semibold capitalize leading-none">{profile.name}</h3>
              <p className="w-full truncate leading-none opacity-80">@{profile.username}</p>
            </div>
            <span className="block w-full text-center text-xs">Joined {timestampToDate(profile.createdAt)?.fromNow()}</span>
          </>
        )}
        {initLoading && (
          <>
            <div className="mb-3 flex flex-col items-center justify-center text-center">
              <span className="skeleton mb-3 h-20 w-20 rounded-full" />
              <span className="skeleton mb-1 h-5 w-3/4 rounded-full" />
              <span className="skeleton h-4 w-1/2 rounded-full" />
            </div>
            <span className="skeleton mx-auto h-4 w-3/4 rounded-full" />
          </>
        )}
      </div>
    )
  }

  return (
    <div className="mb-3 rounded-lg border border-neutral-200 bg-neutral-200/30 p-3 dark:border-neutral-800 dark:bg-neutral-800/30">
      {profile && (
        <div className="flex w-full items-center">
          <Avatar name={profile.name} file={profile.avatar} size={48} className="rounded-full bg-neutral-200 dark:bg-neutral-800" />
          <div className="flex-1 overflow-hidden pl-2">
            <h3 className="mb-1 truncate font-semibold capitalize leading-none">{profile.name}</h3>
            <span className="text-tiny block truncate leading-none">@{profile.username}</span>
          </div>
        </div>
      )}

      {initLoading && (
        <div className="flex w-full items-center">
          <span className="skeleton h-12 w-12 rounded-full" />
          <div className="flex-1 pl-2">
            <span className="skeleton mb-1 block h-4 w-full rounded-full" />
            <span className="skeleton block h-3 w-3/4 rounded-full" />
          </div>
        </div>
      )}
    </div>
  )
}

export default SidebarProfile

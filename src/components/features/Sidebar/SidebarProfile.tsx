'use client'
import React from 'react'
import Avatar from '@/components/elements/Avatar'
import { useAuth } from '@/components/contexts/AuthContext'
import { Skeleton } from '@nextui-org/react'
import Card from '@/app/(app)/components/Card'
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
              <Avatar name={profile.name} file={profile.avatar} size={80} className="mb-3 rounded-full" />
              <h3 className="mb-1 w-full truncate text-xl font-semibold capitalize leading-none">{profile.name}</h3>
              <p className="w-full truncate leading-none opacity-80">@{profile.username}</p>
            </div>
            <span className="block w-full text-center text-xs">Joined {timestampToDate(profile.createdAt)?.fromNow()}</span>
          </>
        )}
        {initLoading && (
          <>
            <div className="mb-3 flex flex-col items-center justify-center text-center">
              <Skeleton className="mb-3 h-20 w-20 rounded-full" />
              <Skeleton className="mb-1 h-5 w-3/4 rounded-medium" />
              <Skeleton className="h-4 w-1/2 rounded-medium" />
            </div>
            <Skeleton className="mx-auto h-4 w-3/4 rounded-medium" />
          </>
        )}
      </div>
    )
  }

  return (
    <Card className="mb-3" forceBodyClassName="px-4 py-3">
      {profile && (
        <div className="flex w-full items-center">
          <Avatar name={profile.name} file={profile.avatar} size={48} className="rounded-full" />
          <div className="flex-1 overflow-hidden pl-2">
            <h3 className="mb-1 truncate font-semibold capitalize leading-none">{profile.name}</h3>
            <span className="block truncate text-tiny leading-none">@{profile.username}</span>
          </div>
        </div>
      )}

      {initLoading && (
        <div className="flex w-full items-center">
          <Skeleton className="block h-12 w-12 rounded-full" />
          <div className="flex-1 pl-2">
            <Skeleton className="mb-1 block h-4 w-full rounded-full" />
            <Skeleton className="block h-3 w-3/4 rounded-full" />
          </div>
        </div>
      )}
    </Card>
  )
}

export default SidebarProfile

'use client'
import { profileIndex } from '@/utils/algolia'
import React, { useCallback, useContext, useState } from 'react'

interface ProfilesContextProps {
  loading: boolean
  profiles: IAProfile[]
  fetchProfiles: (userIds: string[]) => Promise<IAProfile[]>
}

const ProfilesContext = React.createContext<ProfilesContextProps>({
  loading: false,
  profiles: [],
  fetchProfiles: () => Promise.resolve([]),
})

export const ProfilesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(false)
  const [profiles, setProfiles] = useState<IAProfile[]>([])

  const fetchProfiles = useCallback(
    async (userIds: string[]) => {
      setLoading(true)
      try {
        // Get loaded profile IDs
        const loadedProfileIds = profiles.map((profile) => profile.objectID)

        // Determine which IDs need to be fetched
        const uniqueUserIds = userIds.filter((item, index) => userIds.indexOf(item) === index)
        const idsToFetch = uniqueUserIds.filter((id) => !loadedProfileIds.includes(id))

        // Fetch profiles from Algolia
        const data = await profileIndex.getObjects<IAProfile>(idsToFetch)

        // Filter out any null or undefined profiles
        const fetchedProfiles = data.results.filter(Boolean) as IAProfile[]

        // Add new profiles to existing profiles
        const newProfiles = [...profiles, ...fetchedProfiles]
        setProfiles(profiles)

        // Return all profile
        return newProfiles
      } catch (err: any) {
        throw err
      } finally {
        setLoading(false)
      }
    },
    [profiles],
  )

  return <ProfilesContext.Provider value={{ profiles, fetchProfiles, loading }}>{children}</ProfilesContext.Provider>
}

export const useProfiles = () => useContext(ProfilesContext)

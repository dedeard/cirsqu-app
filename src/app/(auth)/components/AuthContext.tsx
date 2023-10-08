'use client'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { User, inMemoryPersistence, signInWithCustomToken } from 'firebase/auth'
import { doc, DocumentReference } from 'firebase/firestore'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { IProfile, IUser } from '@/types'
import { auth, db } from '@/libs/firebase'
import clientFetch from '@/utils/client-fetch'

interface AuthContextProps {
  currentUser?: User | null
  user: IUser
  profile: IProfile
  loading: boolean
}

interface AuthProviderProps {
  children: React.ReactNode
  user: IUser
  profile: IProfile
}

const defaultUser: IUser = {
  uid: '',
  displayName: null,
  email: null,
  emailVerified: false,
}

const defaultProfile: IProfile = {
  name: '',
  username: '',
  createdAt: {
    seconds: 0,
    nanoseconds: 0,
  },
}

// Create context with default values
const AuthContext = createContext<AuthContextProps>({
  currentUser: null,
  user: defaultUser,
  profile: defaultProfile,
  loading: false,
})

export const AuthProvider: React.FC<AuthProviderProps> = ({ children, ...props }) => {
  // Set up hooks and states
  const [loading, setLoading] = useState(true)
  const [user] = useAuthState(auth)
  const docRef = doc(db, 'profiles', props.user.uid) as DocumentReference<IProfile>
  const [profile] = useDocumentData<IProfile>(docRef)
  // Handle authentication using Firebase auth service
  useEffect(() => {
    async function handleAuthentication() {
      setLoading(true)

      await auth.setPersistence(inMemoryPersistence)
      const response = await clientFetch('auth/custom-token', 'GET')
      if (response.ok) {
        const customTokenResult = await response.json()
        await signInWithCustomToken(auth, customTokenResult.token)
      }

      setLoading(false)
    }

    handleAuthentication()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        currentUser: user,
        user: (user?.toJSON() as IUser) || props.user,
        profile: profile || props.profile,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

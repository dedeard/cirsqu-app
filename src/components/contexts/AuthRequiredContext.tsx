'use client'
import React from 'react'
import { onAuthStateChanged, signInWithCustomToken } from 'firebase/auth'
import { doc, onSnapshot } from 'firebase/firestore'
import { auth, db } from '@/utils/firebase'
import clientFetch from '@/utils/client-fetch'
import isPremium from '@/utils/is-premium'

interface AuthRequiredProviderProps {
  children: React.ReactNode
  init: {
    user: IUser
    profile: IProfile
  }
}

interface AuthRequiredContextProps {
  user: IUser
  profile: IProfile
  premium: boolean
}

const AuthRequiredContext = React.createContext<AuthRequiredContextProps>({
  user: {
    uid: '',
    displayName: '',
    email: '',
    emailVerified: false,
  },
  profile: {
    name: '',
    username: '',
    subscription: {
      customerId: '',
    },
    createdAt: {
      seconds: 0,
      nanoseconds: 0,
    },
  },
  premium: false,
})

export const AuthRequiredProvider: React.FC<AuthRequiredProviderProps> = ({ init, children }) => {
  const [user, setUser] = React.useState<IUser>(init.user)
  const [profile, setProfile] = React.useState<IProfile>(init.profile)
  const [premium, setPremium] = React.useState(false)

  React.useEffect(() => {
    async function handleAuthentication() {
      const response = await clientFetch('auth/custom-token')
      if (response.ok) {
        const customTokenResult = await response.json()
        await signInWithCustomToken(auth, customTokenResult.token)
      } else {
        const error = await response.json()
        throw error
      }
    }
    handleAuthentication()
  }, [])

  React.useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user.toJSON() as IUser)
      }
    })
  }, [])

  React.useEffect(() => {
    if (!user.uid) return
    const ref = doc(db, 'profiles', user.uid)
    return onSnapshot(ref, (snapshot) => {
      if (snapshot.exists()) {
        setProfile(snapshot.data() as IProfile)
      }
    })
  }, [user.uid])

  React.useEffect(() => {
    setPremium(isPremium(profile.subscription))
  }, [profile.subscription])

  return <AuthRequiredContext.Provider value={{ user, profile, premium }}>{children}</AuthRequiredContext.Provider>
}

export const useAuthRequired = () => React.useContext(AuthRequiredContext)

'use client'
import React from 'react'
import { onAuthStateChanged, signInWithCustomToken } from 'firebase/auth'
import { doc, onSnapshot } from 'firebase/firestore'
import { auth, db } from '@/utils/firebase'
import clientFetch from '@/utils/client-fetch'

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
    stripeCustomerId: '',
    createdAt: {
      seconds: 0,
      nanoseconds: 0,
    },
  },
})

export const AuthRequiredProvider: React.FC<AuthRequiredProviderProps> = ({ init, children }) => {
  const [user, setUser] = React.useState<IUser>({
    uid: init.user.uid,
    displayName: init.user.displayName,
    email: init.user.email,
    emailVerified: init.user.emailVerified,
  })
  const [profile, setProfile] = React.useState<IProfile>({
    name: init.profile.name,
    username: init.profile.username,
    stripeCustomerId: init.profile.stripeCustomerId,
    avatar: init.profile.avatar,
    bio: init.profile.bio,
    website: init.profile.website,
    createdAt: {
      seconds: init.profile.createdAt.seconds,
      nanoseconds: init.profile.createdAt.nanoseconds,
    },
  })

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
      if (!user) return
      setUser({
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        emailVerified: user.emailVerified,
      })
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

  return <AuthRequiredContext.Provider value={{ user: user, profile: profile }}>{children}</AuthRequiredContext.Provider>
}

export const useAuthRequired = () => React.useContext(AuthRequiredContext)

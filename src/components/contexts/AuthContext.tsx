'use client'
import React from 'react'
import { onAuthStateChanged, signInWithCustomToken, signOut } from 'firebase/auth'
import { doc, onSnapshot } from 'firebase/firestore'
import { auth, db } from '@/utils/firebase'
import clientFetch from '@/utils/client-fetch'

interface AuthProviderProps {
  children: React.ReactNode
  init: {
    user: IUser | null
    profile: IProfile | null
  }
}

interface AuthContextProps {
  user: IUser | null
  profile: IProfile | null
  loading: boolean
}

const AuthContext = React.createContext<AuthContextProps>({
  user: null,
  profile: null,
  loading: true,
})

export const AuthProvider: React.FC<AuthProviderProps> = ({ init, children }) => {
  const [loading, setLoading] = React.useState(true)
  const [user, setUser] = React.useState<IUser | null>(() => {
    if (!init.user) return null
    return {
      uid: init.user.uid,
      displayName: init.user.displayName,
      email: init.user.email,
      emailVerified: init.user.emailVerified,
    }
  })
  const [profile, setProfile] = React.useState<IProfile | null>(() => {
    if (!init.profile) return null
    return {
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
    }
  })

  React.useEffect(() => {
    async function handleAuthentication() {
      const response = await clientFetch('auth/custom-token')
      if (response.ok) {
        const customTokenResult = await response.json()
        await signInWithCustomToken(auth, customTokenResult.token)
      } else {
        await signOut(auth)
      }
    }
    handleAuthentication()
  }, [])

  React.useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      if (!user) {
        setUser(null)
      } else {
        setUser({
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          emailVerified: user.emailVerified,
        })
      }
      setLoading(false)
    })
  }, [])

  React.useEffect(() => {
    if (!user) return setProfile(null)
    const ref = doc(db, 'profiles', user.uid)
    return onSnapshot(ref, (snapshot) => {
      if (snapshot.exists()) {
        setProfile(snapshot.data() as IProfile)
      } else {
        setProfile(null)
      }
    })
  }, [user])

  return <AuthContext.Provider value={{ user, profile, loading }}>{children}</AuthContext.Provider>
}

export const useAuth = () => React.useContext(AuthContext)

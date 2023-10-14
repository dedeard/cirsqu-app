'use client'
import React from 'react'
import { onAuthStateChanged, signInWithCustomToken, signOut } from 'firebase/auth'
import { doc, onSnapshot } from 'firebase/firestore'
import { auth, db } from '@/utils/firebase'
import clientFetch from '@/utils/client-fetch'
import isPremium from '@/utils/is-premium'

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
  premium: boolean
}

const AuthContext = React.createContext<AuthContextProps>({
  user: null,
  profile: null,
  loading: true,
  premium: false,
})

export const AuthProvider: React.FC<AuthProviderProps> = ({ init, children }) => {
  const [loading, setLoading] = React.useState(true)
  const [user, setUser] = React.useState<IUser | null>(init.user || null)
  const [profile, setProfile] = React.useState<IProfile | null>(init.profile || null)
  const [premium, setPremium] = React.useState(false)

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
        setUser(user.toJSON() as IUser)
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

  React.useEffect(() => {
    setPremium(isPremium(profile?.subscription))
  }, [profile?.subscription])

  return <AuthContext.Provider value={{ user, profile, loading, premium }}>{children}</AuthContext.Provider>
}

export const useAuth = () => React.useContext(AuthContext)

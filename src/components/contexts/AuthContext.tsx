'use client'
import React from 'react'
import { User, onAuthStateChanged } from 'firebase/auth'
import { doc, onSnapshot } from 'firebase/firestore'
import { auth, db } from '@/utils/firebase'
import isPremium from '@/utils/is-premium'
import { useRouter } from 'next/navigation'

interface AuthContextProps {
  user: User | null
  profile: IProfile | null
  initLoading: boolean
  loading: boolean
  premium: boolean
  setLoading: (loading: boolean) => void
}

const AuthContext = React.createContext<AuthContextProps>({
  user: null,
  profile: null,
  initLoading: true,
  loading: false,
  premium: false,
  setLoading: () => {},
})

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = React.useState<User | null>(null)
  const [profile, setProfile] = React.useState<IProfile | null>(null)
  const [initLoading, setInitLoading] = React.useState(true)
  const [loading, setLoading] = React.useState(true)
  const [premium, setPremium] = React.useState(false)

  React.useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      setUser(user)
      setInitLoading(!!user)
      setLoading(!!user)
    })
  }, [])

  React.useEffect(() => {
    if (!user) {
      setProfile(null)
      setPremium(false)
      return
    }

    const profileRef = doc(db, 'profiles', user.uid)
    return onSnapshot(profileRef, (snapshot) => {
      if (snapshot.exists()) {
        const profile = snapshot.data() as IProfile
        setProfile(snapshot.data() as IProfile)
        setPremium(isPremium(profile.subscription))
      } else {
        setProfile(null)
        setPremium(false)
      }
      setInitLoading(false)
      setLoading(false)
    })
  }, [user])

  return <AuthContext.Provider value={{ user, profile, premium, initLoading, loading, setLoading }}>{children}</AuthContext.Provider>
}

interface UseAuthRedirectOptions {
  whenAuthed?: string
  whenAuthedProfileExists?: string
  whenAuthedProfileNotExists?: string
  whenNotAuthed?: string
}

export const useAuth = (redirectOptions?: UseAuthRedirectOptions) => {
  const { user, profile, premium, initLoading, loading, setLoading } = React.useContext(AuthContext)
  const router = useRouter()

  React.useEffect(() => {
    if (loading || initLoading || !router) return

    if (!user && redirectOptions?.whenNotAuthed) {
      router.push(redirectOptions?.whenNotAuthed)
    } else if (user && !profile && redirectOptions?.whenAuthedProfileNotExists) {
      router.push(redirectOptions?.whenAuthedProfileNotExists)
    } else if (user && profile && redirectOptions?.whenAuthedProfileExists) {
      router.push(redirectOptions?.whenAuthedProfileExists)
    } else if (user && redirectOptions?.whenAuthed) {
      router.push(redirectOptions?.whenAuthed)
    }
  }, [user, profile, premium, initLoading, loading, router, redirectOptions])

  return { user, profile, premium, initLoading, loading, setLoading }
}

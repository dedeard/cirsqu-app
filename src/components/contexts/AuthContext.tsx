'use client'
import React from 'react'
import { User, onAuthStateChanged } from 'firebase/auth'
import { doc, onSnapshot } from 'firebase/firestore'
import { auth, db } from '@/utils/firebase/firebase'
import { useRouter } from './ProgressBarContext'

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
      return
    }

    const profileRef = doc(db, 'profiles', user.uid)
    return onSnapshot(profileRef, (snapshot) => {
      if (snapshot.exists()) {
        setProfile(snapshot.data() as IProfile)
      } else {
        setProfile(null)
      }
      setInitLoading(false)
      setLoading(false)
    })
  }, [user])

  return (
    <AuthContext.Provider value={{ user, profile, premium: !!profile?.premium, initLoading, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

interface UseAuthRedirectOptions {
  whenAuthed?: string
  whenAuthedProfileExists?: string
  whenAuthedProfileNotExists?: string
  whenNotAuthed?: string
}

export const useAuth = (redirectOptions?: UseAuthRedirectOptions) => {
  const { user, profile, premium, initLoading, loading, setLoading } = React.useContext(AuthContext)
  const { push } = useRouter()

  React.useEffect(() => {
    if (loading || initLoading) return
    if (!user && redirectOptions?.whenNotAuthed) {
      push(redirectOptions.whenNotAuthed)
    } else if (user && !profile && redirectOptions?.whenAuthedProfileNotExists) {
      push(redirectOptions.whenAuthedProfileNotExists)
    } else if (user && profile && redirectOptions?.whenAuthedProfileExists) {
      push(redirectOptions.whenAuthedProfileExists)
    } else if (user && redirectOptions?.whenAuthed) {
      push(redirectOptions.whenAuthed)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, profile, initLoading, loading])

  return { user, profile, premium, initLoading, loading, setLoading }
}

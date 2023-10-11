'use client'
import React from 'react'
import { onAuthStateChanged, signInWithCustomToken } from 'firebase/auth'
import { doc, onSnapshot } from 'firebase/firestore'
import { auth, db } from '@/utils/firebase'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
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
}

// Create context with default values
const AuthContext = React.createContext<AuthContextProps>({
  user: null,
  profile: null,
})

export const AuthProvider: React.FC<AuthProviderProps> = ({ init, children }) => {
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
      }
    }
    handleAuthentication()
  }, [])

  React.useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      if (!user) {
        return setUser(null)
      }
      setUser({
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        emailVerified: user.emailVerified,
      })
    })
  }, [])

  React.useEffect(() => {
    if (!user) return
    const ref = doc(db, 'profiles', user.uid)
    return onSnapshot(ref, (snapshot) => {
      if (!snapshot.exists()) {
        setProfile(snapshot.data() as IProfile)
      }
    })
  }, [user])

  return <AuthContext.Provider value={{ user: user, profile: profile }}>{children}</AuthContext.Provider>
}

export const useAuth = () => React.useContext(AuthContext)

export const useAuthRequired = (next?: string) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { user, profile } = useAuth()
  const oldNext = searchParams.get('next')

  if (!user) {
    const url = new URL('/sign-in')
    url.searchParams.set('next', next || oldNext || pathname)
    router.push(url.toString())
  }

  if (!profile) {
    const url = new URL('/complete-profile')
    url.searchParams.set('next', next || oldNext || pathname)
    router.push(url.toString())
  }

  return { user, profile }
}

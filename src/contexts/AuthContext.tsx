'use client'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { User, inMemoryPersistence, onAuthStateChanged, signInWithCustomToken } from 'firebase/auth'
import { IUser } from '@/types'
import { auth } from '@/libs/firebase'
import clientFetch from '@/utils/client-fetch'

interface AuthContextProps {
  currentUser: User | null
  user: IUser | null
  loading: boolean
}

interface AuthProviderProps {
  children: React.ReactNode
  user: IUser | null
}

// Create context with default values
const AuthContext = createContext<AuthContextProps>({
  currentUser: null,
  user: null,
  loading: false,
})

export const AuthProvider: React.FC<AuthProviderProps> = ({ children, ...props }) => {
  const [loading, setLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState<null | User>(null)
  const [user, setUser] = useState<null | IUser>(props.user)

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user)
        setUser(user)
      } else {
        setCurrentUser(null)
        setUser(null)
      }
    })
  }, [])

  // Handle authentication using Firebase auth service
  useEffect(() => {
    async function handleAuthentication() {
      try {
        await auth.setPersistence(inMemoryPersistence)
        const response = await clientFetch('auth/custom-token', 'GET')
        if (response.ok) {
          const customTokenResult = await response.json()
          await signInWithCustomToken(auth, customTokenResult.token)
        }
      } catch (error) {
        console.error('Authentication error:', error)
      }
      setLoading(false)
    }
    handleAuthentication()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        user: user || props.user,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext

export const useAuth = () => useContext(AuthContext)

'use client'
import { useState } from 'react'
import cn from 'classnames'
import toast from 'react-hot-toast'
import { linkWithPopup, unlink } from 'firebase/auth'
import { useAuth } from '@/components/contexts/AuthContext'
import { getProviderById } from '@/utils/firebase'
import FIREBASE_ERRORS from '@/constants/firebase-errors'
import Spinner from '@/components/svg/Spinner'

const LinkedAccountToggle: React.FC<{ id: 'facebook.com' | 'github.com' | 'google.com' }> = ({ id }) => {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)

  const connectAccount = async () => {
    if (!user) return
    setLoading(true)
    try {
      const response = await linkWithPopup(user, getProviderById(id))
      toast.success(`Account successfully linked to ${response.providerId}`)
    } catch (error: any) {
      toast.error(FIREBASE_ERRORS[error.code] || `An error occurred: ${error.message}`)
    }
    setLoading(false)
  }

  const disconnectAccount = async () => {
    if (!user) return
    setLoading(true)
    try {
      const response = await unlink(user, id)
      toast.success(`Account successfully unlinked from ${response.providerId}`)
    } catch (error: any) {
      toast.error(FIREBASE_ERRORS[error.code] || `An error occurred: ${error.message}`)
    }
    setLoading(false)
  }

  const isLinked = !!user?.providerData.find(({ providerId }) => providerId === id)
  const text = isLinked ? 'Disconnect' : 'Connect'

  return (
    <button
      disabled={loading}
      className={cn(
        isLinked ? 'hoverable-red' : 'hoverable-blue',
        'relative flex h-8 w-24 items-center justify-center rounded-lg text-center text-sm',
      )}
      onClick={isLinked ? disconnectAccount : connectAccount}
    >
      {loading ? '' : text}
      {loading && <Spinner height={16} width={16} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 stroke-white" />}
    </button>
  )
}

export default LinkedAccountToggle

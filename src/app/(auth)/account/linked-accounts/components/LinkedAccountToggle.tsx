import React from 'react'
import { Button } from '@nextui-org/react'
import { useAuth } from '@/components/contexts/AuthContext'
import toast from 'react-hot-toast'
import { getProviderById } from '@/utils/firebase'
import FIREBASE_ERRORS from '@/constants/firebase-errors'
import { linkWithPopup, unlink } from 'firebase/auth'

const LinkedAccountToggle: React.FC<{ id: 'facebook.com' | 'github.com' | 'google.com' }> = ({ id }) => {
  const { user } = useAuth()
  const [loading, setLoading] = React.useState(false)

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
    <Button
      color={isLinked ? 'danger' : 'primary'}
      isLoading={loading}
      className="w-28"
      onClick={isLinked ? disconnectAccount : connectAccount}
    >
      {loading ? '' : text}
    </Button>
  )
}

export default LinkedAccountToggle

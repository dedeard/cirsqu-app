import React from 'react'
import LoadingCard from './LoadingCard'
import clientFetch from '@/utils/client-fetch'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { useAuth } from '@/components/contexts/AuthContext'

type PropsType = {
  children: React.ReactNode
}

const PreCheckout: React.FC<PropsType> = ({ children }) => {
  const router = useRouter()
  const auth = useAuth()
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState('')

  React.useEffect(() => {
    if (error) toast.error(error)
  }, [error])

  React.useEffect(() => {
    if (auth.loading) return
    // if (!auth.profile) {
    //   setError('You must login before checkout.')
    //   router.push('/sign-in?next=/pro')
    //   return
    // }
    setLoading(false)
  }, [auth.profile, auth.loading, router])

  if (loading) return <LoadingCard />
  return <>{children}</>
}

export default PreCheckout

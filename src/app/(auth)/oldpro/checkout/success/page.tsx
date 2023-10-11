'use client'
import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import clientFetch from '@/utils/client-fetch'
import toast from 'react-hot-toast'
import LoadingIcon from '../components/LoadingIcon'

export default function Page() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState('')
  const [session, setSession] = React.useState<any>()

  const sessionId = searchParams.get('session_id')

  React.useEffect(() => {
    if (error) {
      toast.error(error)
    }
  }, [error])

  React.useEffect(() => {
    const load = async (sessionId: string | null) => {
      try {
        const res = await clientFetch('checkout-sessions/' + sessionId, 'GET')
        const data = await res.json()
        if (!res.ok) {
          setError(data.message)
        } else {
          console.log(data)
          setSession(data)
        }
      } catch (error: any) {
        setError(error.message)
      }
    }
    load(sessionId)
  }, [sessionId])

  // React.useEffect(() => {
  //   const checkout = async () => {
  //     if (product) {
  //       try {
  //         const res = await clientFetch('checkout-sessions', 'POST', { priceId: product.price.id })
  //         const data = await res.json()
  //         if (!res.ok) {
  //           setError(data.message)
  //         } else {
  //           router.push(data.url)
  //         }
  //       } catch (error: any) {
  //         setError(error.message)
  //       }
  //     }
  //   }
  //   checkout()
  // }, [product, router])

  return <LoadingIcon />
}

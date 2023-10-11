'use client'
import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import clientFetch from '@/utils/client-fetch'
import toast from 'react-hot-toast'
import LoadingIcon from '../components/LoadingIcon'

export default function Page() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [product, setProduct] = React.useState<IProduct>()
  const [error, setError] = React.useState('')

  React.useEffect(() => {
    if (error) {
      toast.error(error)
      router.push('/plans')
    }
  }, [error, router])

  React.useEffect(() => {
    const loadProduct = async (key: string | null) => {
      try {
        const res = await clientFetch('products/' + key, 'GET')
        const data = await res.json()
        if (!res.ok) {
          setError(data.message)
        } else {
          setProduct(data)
        }
      } catch (error: any) {
        setError(error.message)
      }
    }
    loadProduct(searchParams.get('plan'))
  }, [router, searchParams])

  React.useEffect(() => {
    const checkout = async () => {
      if (product) {
        try {
          const res = await clientFetch('checkout-sessions', 'POST', { priceId: product.price.id })
          const data = await res.json()
          if (!res.ok) {
            setError(data.message)
          } else {
            router.push(data.url)
          }
        } catch (error: any) {
          setError(error.message)
        }
      }
    }
    checkout()
  }, [product, router])

  return <LoadingIcon />
}

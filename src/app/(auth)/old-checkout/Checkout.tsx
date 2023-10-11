'use client'
import React from 'react'
import Script from 'next/script'
import LoadingCard from './LoadingCard'
import clientFetch from '@/utils/client-fetch'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { STRIPE_PUBLISHABLE_KEY } from '@/constants/config'
import { useAuth } from '../components/AuthContext'

type PropsType = {
  products: IProduct[]
  currentProduct: IProduct
} & React.HTMLAttributes<HTMLDivElement>

const Checkout: React.FC<PropsType> = ({ products, currentProduct, ...props }) => {
  const router = useRouter()
  const [sessionId, setSessionId] = React.useState('')
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState('')
  const { user, profile } = useAuth()
  React.useEffect(() => {
    if (error) {
      toast.error(error)
      router.push('/plans')
    }
  }, [error, router])

  React.useEffect(() => {
    const checkout = async () => {
      setLoading(true)
      try {
        const res = await clientFetch('checkout-sessions', 'POST', { priceId: currentProduct.price.id })
        const data = await res.json()
        if (!res.ok) {
          setError(data.message)
        } else {
          setSessionId(data.customer)
        }
      } catch (error: any) {
        setError(error.message)
      }
      setLoading(false)
    }
    checkout()
  }, [currentProduct, router])

  return (
    <>
      <Script async src="https://js.stripe.com/v3/buy-button.js" />
      <div {...props}>
        <div className="mb-10 text-2xl font-bold tracking-wide text-slate-900">Checkout</div>
        {loading && <LoadingCard />}
        {!loading && sessionId && (
          <div className="flex items-center justify-center overflow-hidden rounded-md border bg-white">
            {/* @ts-ignore */}
            <stripe-buy-button
              buy-button-id="buy_btn_1O02EoJ8eFVeHpyOA3a1m27S"
              client-reference-id={profile.stripeCustomerId}
              customer-email={user.email}
              publishable-key={STRIPE_PUBLISHABLE_KEY}
            />
          </div>
        )}
      </div>
    </>
  )
}

export default Checkout

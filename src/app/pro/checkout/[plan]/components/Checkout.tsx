'use client'
import React from 'react'
import toast from 'react-hot-toast'
import cn from 'classnames'
import { useRouter } from '@/components/contexts/ProgressBarContext'
import clientFetch from '@/utils/fetch/client-fetch'
import { useAuth } from '@/components/contexts/AuthContext'
import formatAmount from '@/utils/transforms/format-amount'
import Spinner from '@/components/svg/Spinner'

type PropsType = {
  products: IProduct[]
  currentProduct: IProduct
} & React.HTMLAttributes<HTMLDivElement>

const Checkout: React.FC<PropsType> = ({ products, currentProduct, className, ...props }) => {
  const router = useRouter()
  const { profile } = useAuth()
  const [loading, setLoading] = React.useState(false)

  const handleCheckout = async () => {
    setLoading(true)

    if (!profile) {
      toast.error('You must login before checkout.')
      router.push('/sign-in?next=/pro/checkout/' + currentProduct.price.lookup_key)
      return
    }

    try {
      const response = await clientFetch('checkout-sessions', { method: 'POST', data: { priceId: currentProduct.price.id } })
      if (!response.ok) {
        throw await response.json()
      }
      const session = await response.json()

      router.push(session.url)
    } catch (error: any) {
      toast.error(error.message)
      setLoading(false)
    }
  }

  return (
    <div className={cn(className, 'light')} {...props}>
      <div className="mb-10 text-2xl font-semibold tracking-wide text-neutral-800">Checkout</div>
      <div className="mb-8 flex h-[236px] flex-col items-center justify-center rounded-lg border border-neutral-200 bg-white text-neutral-800">
        <div className="pb-7">
          <div className="mb-1 text-center first-letter:uppercase">
            <span className="text-xl opacity-70">{currentProduct.price.lookup_key}</span>
          </div>
          <div className="flex items-center justify-center">
            <span className="block text-5xl font-semibold ">
              {formatAmount(currentProduct.price.unit_amount, currentProduct.price.currency)}
            </span>
            {currentProduct.price.recurring && (
              <span className="ml-2 block leading-none opacity-70">
                <span className="block">per</span>
                <span className="block">{currentProduct.price.recurring.interval}</span>
              </span>
            )}
          </div>
        </div>
        <div className="mx-auto mb-3 w-full max-w-[350px]">
          <button
            disabled={loading}
            className="hoverable-blue relative flex h-10 w-full items-center justify-center overflow-hidden rounded-lg text-sm font-semibold uppercase tracking-widest disabled:opacity-75"
            onClick={handleCheckout}
          >
            {!loading && (
              <span className="absolute right-0 top-0 flex h-5 items-center justify-center rounded-bl-lg bg-yellow-500 px-2 text-xs font-semibold tracking-normal  text-neutral-900">
                TEST MODE
              </span>
            )}
            {!loading && (currentProduct.price.recurring ? 'Subscribe Now' : 'Purchase Now')}
            {loading && <Spinner className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2" />}
          </button>
        </div>
        <p className="text-center text-sm font-light text-neutral-600">You will be redirected to Stripe for payment processing.</p>
      </div>
      <p className="font-light text-neutral-600">
        For testing purposes, you may utilize the following card number:{' '}
        <span className="font-normal">4242&nbsp;4242&nbsp;4242&nbsp;4242</span>. For additional details and other test card numbers, please{' '}
        <a href="https://stripe.com/docs/testing#cards" target="_blank" className="font-normal underline hover:text-blue-600">
          click here
        </a>
        .
      </p>
    </div>
  )
}

export default Checkout

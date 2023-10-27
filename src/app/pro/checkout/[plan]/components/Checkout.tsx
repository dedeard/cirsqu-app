'use client'

import React from 'react'
import clientFetch from '@/utils/client-fetch'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { useAuth } from '@/components/contexts/AuthContext'
import { Button, Card, CardBody, Chip } from '@nextui-org/react'
import classNames from 'classnames'
import formatAmount from '@/utils/format-amount'

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
    <>
      <div className={classNames(className, 'light')} {...props}>
        <div className="mb-10 text-2xl font-semibold tracking-wide text-slate-900">Checkout</div>
        <Card className="mb-8 shadow" shadow="none">
          <CardBody className="h-[236px] items-center justify-center py-0">
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
              <Button
                isLoading={loading}
                color="primary"
                className="font-semibold uppercase tracking-widest"
                fullWidth
                onClick={handleCheckout}
              >
                {!loading && (
                  <Chip color="warning" variant="solid" className="absolute right-0 top-0 h-5 rounded-none rounded-bl-medium">
                    <span className="text-xs font-semibold capitalize tracking-normal">TEST MODE</span>
                  </Chip>
                )}
                {!loading && (currentProduct.price.recurring ? 'Subscribe Now' : 'Purchase Now')}
              </Button>
            </div>
            <p className="text-center text-sm font-light">You will be redirected to Stripe for payment processing.</p>
          </CardBody>
        </Card>
        <p className="font-light text-slate-900 light">
          For testing purposes, you may utilize the following card number:{' '}
          <span className="font-normal">4242&nbsp;4242&nbsp;4242&nbsp;4242</span>. For additional details and other test card numbers,
          please{' '}
          <a href="https://stripe.com/docs/testing#cards" target="_blank" className="font-normal underline">
            click here
          </a>
          .
        </p>
      </div>
    </>
  )
}

export default Checkout

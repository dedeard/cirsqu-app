import React from 'react'
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js'
import { STRIPE_PUBLISHABLE_KEY } from '@/constants/config'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY, {
  betas: ['embedded_checkout_beta_1'],
})

const CheckoutForm: React.FC<{ clientSecret: string }> = ({ clientSecret }) => {
  return (
    <EmbeddedCheckoutProvider stripe={stripePromise} options={{ clientSecret }}>
      <EmbeddedCheckout />
    </EmbeddedCheckoutProvider>
  )
}

export default CheckoutForm

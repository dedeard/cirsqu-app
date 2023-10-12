'use client'
import React from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { STRIPE_PUBLISHABLE_KEY } from '@/constants/config'

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY)

const SubscriptionProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <Elements stripe={stripePromise}>{children}</Elements>
}

export default SubscriptionProviders

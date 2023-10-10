'use client'
import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowLeftCircle } from 'react-feather'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { IProduct } from '@/types'
import { STRIPE_PUBLISHABLE_KEY } from '@/constants/config'
import LoadingCard from '../LoadingCard'
import clientFetch from '@/utils/client-fetch'
import CreateForm from './CreateForm'

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY)

type PropsType = {
  onCreated?: (data: any) => void
}

const PaymentMethodForm: React.FC<PropsType> = ({ onCreated }) => {
  return (
    <Elements stripe={stripePromise}>
      <CreateForm onCreated={onCreated} />
    </Elements>
  )
}

export default PaymentMethodForm

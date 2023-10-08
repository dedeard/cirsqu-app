'use client'
import React, { FormEvent } from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import * as Stripe from '@stripe/stripe-js'
import Card from '../components/Card'

const PaymentMethod: React.FC = () => {
  const stripe = useStripe()
  const elements = useElements()

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    if (!stripe || !elements) {
      return
    }

    const cardElement = elements.getElement(CardElement)

    console.log(cardElement)
  }
  return (
    <Card title="Payment Method" className="mb-3 lg:max-w-[750px]">
      <form className="p-3" onSubmit={handleSubmit}>
        <CardElement options={{ hidePostalCode: true, classes: { base: 'p-3 border' } }} />
        <button type="submit" disabled={!stripe}>
          Pay
        </button>
      </form>
    </Card>
  )
}

export default PaymentMethod

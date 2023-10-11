import { CardCvcElement, CardExpiryElement, CardNumberElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React, { FormEvent, useState } from 'react'
import { CreditCard } from 'react-feather'
import { useAuth } from '../../components/AuthContext'
import toast from 'react-hot-toast'
import LoadingScreen from '@/app/components/elements/LoadingScreen'
import clientFetch from '@/utils/client-fetch'

type PropsType = {
  onCreated?: (data: any) => void
}

const CreateForm: React.FC<PropsType> = ({ onCreated }) => {
  const stripe = useStripe()
  const elements = useElements()
  const { profile, user } = useAuth()
  const [message, setMessage] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    setLoading(true)
    e.preventDefault()

    const cardNumberElement = elements?.getElement('cardNumber')

    if (!stripe || !cardNumberElement) {
      return
    }

    try {
      const data = await stripe.createPaymentMethod({
        element: cardNumberElement,
        params: {
          billing_details: {
            name: profile.name,
            email: user.email || undefined,
          },
        },
      })

      if (data.error) throw data.error

      const res = await clientFetch(`payment-methods?id=${data.paymentMethod.id}`, 'POST')

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.message)
      }

      onCreated?.(await res.json())
    } catch (error: any) {
      toast.error(error.message || 'An unexpected error occured.')
    }
    setLoading(false)
  }

  return (
    <form className="relative overflow-hidden border bg-white" onSubmit={handleSubmit}>
      <LoadingScreen show={loading} />
      <div className="flex items-center border-b px-3 py-5">
        <span className="flex items-center text-gray-500">
          <CreditCard className="h-6 w-6" />
        </span>
        <span className="ml-4 block flex-1">Add credit card</span>
      </div>
      <div className="p-3">
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label>
              <span className="block text-sm text-gray-600">Card Number</span>
              <CardNumberElement options={{ showIcon: true, iconStyle: 'solid' }} />
            </label>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label>
                <span className="block text-sm text-gray-600">Expiration</span>
                <CardExpiryElement />
              </label>
            </div>
            <div>
              <label>
                <span className="block text-sm text-gray-600">CVV</span>
                <CardCvcElement />
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t p-3">
        <button
          type="submit"
          className="inline-flex h-10 items-center justify-center whitespace-nowrap rounded bg-primary-600 px-8 text-sm font-medium leading-none text-white transition-all duration-200 hover:bg-primary-600 disabled:cursor-default disabled:opacity-50"
        >
          Save
        </button>
      </div>
    </form>
  )
}

export default CreateForm

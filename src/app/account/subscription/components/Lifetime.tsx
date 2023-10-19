import React from 'react'
import Link from 'next/link'
import { Button, CardBody, Chip } from '@nextui-org/react'

const Lifetime: React.FC<{ paymentIntent: any }> = ({ paymentIntent }) => {
  const statusColor = (status: string) => {
    switch (status) {
      case 'requires_payment_method':
      case 'requires_confirmation':
      case 'requires_action':
        return 'warning'

      case 'processing':
        return 'primary'

      case 'requires_capture':
        return 'secondary'

      case 'canceled':
        return 'danger'

      case 'succeeded':
        return 'success'
    }
  }

  const statusText = (status: string) => {
    switch (status) {
      case 'requires_payment_method':
        return 'Your payment method is required. Please update your billing information.'

      case 'requires_confirmation':
        return 'Your payment requires confirmation. Please follow the instructions sent to your email.'

      case 'requires_action':
        return 'Your payment requires further action. Please follow the instructions provided.'

      case 'processing':
        return "Your payment is currently being processed. You will be notified once it's completed."

      case 'requires_capture':
        return 'Payment has been authorized but requires capture. Please contact support if you need assistance.'

      case 'canceled':
        return 'The payment process was canceled. If this was not intended, please try again or contact support.'

      case 'succeeded':
        return 'With your Lifetime Membership, you have exclusive access to a wide range of premium content and perks. Enjoy limitless learning and exploration at your fingertips.'

      default:
        return `Unexpected status value: ${status}`
    }
  }

  return (
    <CardBody className="flex flex-col gap-6 py-10">
      <div className="text-center">
        <div className="mb-3">
          <span className="font-bold uppercase tracking-widest">Current Plan</span>
        </div>
        <h1 className="mb-3 text-3xl">Lifetime Membership</h1>
        <Chip color={statusColor(paymentIntent.status)} className="px-3">
          <span className="font-bold uppercase tracking-widest">{paymentIntent.status}</span>
        </Chip>
      </div>

      <p className="py-3 text-center font-light opacity-80">{statusText(paymentIntent.status)}</p>

      <div className="mx-auto flex w-full max-w-xs flex-row justify-center gap-3">
        {paymentIntent?.latest_charge?.receipt_url && (
          <Button as="a" href={paymentIntent.latest_charge.receipt_url} target="_blank" color="primary" fullWidth>
            View Receipt
          </Button>
        )}
      </div>
    </CardBody>
  )
}

export default Lifetime

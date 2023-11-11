import cn from 'classnames'

const statusColor = (status: string) => {
  switch (status) {
    case 'requires_payment_method':
    case 'requires_confirmation':
    case 'requires_action':
    case 'requires_capture':
      return 'text-neutral-900 bg-yellow-600'

    case 'processing':
      return 'text-white bg-blue-600'

    case 'canceled':
      return 'text-white bg-red-600'

    case 'succeeded':
      return 'text-neutral-900 bg-green-600'
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

const Lifetime: React.FC<{ paymentIntent: any }> = ({ paymentIntent }) => {
  return (
    <div className="flex flex-col gap-6 px-3 py-10 md:px-5">
      <div className="text-center">
        <div className="mb-3">
          <span className="uppercase tracking-widest">Current Plan</span>
        </div>
        <h1 className="mb-3 text-3xl">Lifetime Membership</h1>
        <span
          className={cn(
            statusColor(paymentIntent.status),
            'inline-flex h-7 items-center justify-center rounded-lg px-3 text-xs font-semibold uppercase tracking-widest',
          )}
        >
          {String(paymentIntent.status).replaceAll('_', ' ')}
        </span>
      </div>

      <p className="py-3 text-center font-light opacity-80">{statusText(paymentIntent.status)}</p>

      <div className="mx-auto flex w-full max-w-xs flex-row justify-center gap-3">
        {paymentIntent?.latest_charge?.receipt_url && (
          <a
            href={paymentIntent.latest_charge.receipt_url}
            target="_blank"
            className="hoverable-blue flex h-10 w-full items-center justify-center rounded-lg text-sm"
          >
            Latest Invoice
          </a>
        )}
      </div>
    </div>
  )
}

export default Lifetime

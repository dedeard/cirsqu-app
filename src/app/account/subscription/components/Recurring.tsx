import { useState } from 'react'
import toast from 'react-hot-toast'
import cn from 'classnames'
import { useRouter } from 'next/navigation'
import clientFetch from '@/utils/fetch/client-fetch'
import Spinner from '@/components/svg/Spinner'

const statusColor = (status: string) => {
  switch (status) {
    case 'incomplete':
    case 'incomplete_expired':
    case 'past_due':
      return 'text-neutral-900 bg-yellow-600'

    case 'active':
      return 'text-neutral-900 bg-green-600'

    case 'canceled':
    case 'unpaid':
      return 'text-white bg-red-600'
  }
}

const Recurring: React.FC<{ subscription: any }> = ({ subscription }) => {
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const openPortal = async () => {
    setLoading(true)
    try {
      const respose = await clientFetch('portal', { method: 'POST' })

      if (!respose.ok) {
        throw await respose.json()
      }

      const data = await respose.json()

      router.push(data.url)
    } catch (error: any) {
      toast.error(error.message)
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-6 px-3 py-10 md:px-5">
      <div className="text-center">
        <div className="mb-3">
          <span className="uppercase tracking-widest">Current Plan</span>
        </div>
        <h1 className="mb-3 text-3xl">{subscription.plan.product.name}</h1>
        <span
          className={cn(
            statusColor(subscription.status),
            'inline-flex h-7 items-center justify-center rounded-lg px-3 text-xs font-semibold uppercase tracking-widest',
          )}
        >
          {subscription.status}
        </span>
      </div>

      <p className="py-3 text-center font-light opacity-80">
        You have the ability to modify your subscription plan. This includes upgrading, downgrading or even cancelling your current plan. To
        make these changes, please click on the "Billing Portal" button below.
      </p>

      <div className="mx-auto flex w-full max-w-xs flex-row justify-center gap-3">
        {subscription?.latest_invoice?.hosted_invoice_url && (
          <a
            href={subscription.latest_invoice.hosted_invoice_url}
            target="_blank"
            className="hoverable-default flex h-10 w-full items-center justify-center rounded-lg border text-sm"
          >
            Latest Invoice
          </a>
        )}
        <button
          type="button"
          disabled={loading}
          className="hoverable-blue relative flex h-10 w-full items-center justify-center rounded-lg px-4 text-sm"
          onClick={openPortal}
        >
          {!loading && 'Billing Portal'}
          {loading && <Spinner height={18} width={18} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />}
        </button>
      </div>
    </div>
  )
}

export default Recurring

import React from 'react'
import Link from 'next/link'
import { Button, CardBody, Chip } from '@nextui-org/react'
import toast from 'react-hot-toast'
import clientFetch from '@/utils/client-fetch'
import { useRouter } from 'next/navigation'

const Recurring: React.FC<{ subscription: any }> = ({ subscription }) => {
  const router = useRouter()

  const [loading, setLoading] = React.useState(false)
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

  const statusColor = (status: string) => {
    switch (status) {
      case 'incomplete':
      case 'incomplete_expired':
      case 'past_due':
        return 'warning'

      case 'active':
        return 'success'

      case 'canceled':
      case 'unpaid':
        return 'danger'
    }
  }

  return (
    <CardBody className="flex flex-col gap-6 py-10">
      <div className="text-center">
        <div className="mb-3">
          <span className="uppercase tracking-widest">Current Plan</span>
        </div>
        <h1 className="mb-3 text-3xl">{subscription.plan.product.name}</h1>
        <Chip color={statusColor(subscription.status)} className="px-3">
          <span className="font-semibold uppercase tracking-widest">{subscription.status}</span>
        </Chip>
      </div>

      <p className="py-3 text-center font-light opacity-80">
        You have the ability to modify your subscription plan. This includes upgrading, downgrading or even cancelling your current plan. To
        make these changes, please click on the "Billing Portal" button below.
      </p>

      <div className="mx-auto flex w-full max-w-xs flex-row justify-center gap-3">
        {subscription?.latest_invoice?.hosted_invoice_url && (
          <Button as="a" href={subscription.latest_invoice.hosted_invoice_url} target="_blank" variant="flat" fullWidth>
            Latest Invoice
          </Button>
        )}
        <Button as="a" href="/pro" color="primary" fullWidth isLoading={loading} onClick={openPortal}>
          {!loading && 'Billing Portal'}
        </Button>
      </div>
    </CardBody>
  )
}

export default Recurring

'use client'
import React from 'react'
import toast from 'react-hot-toast'
import Panel from '../../components/Panel'
import Loading from './Loading'
import NotYet from './NotYet'
import Recurring from './Recurring'
import Lifetime from './Lifetime'
import Invoices from './Invoices'
import clientFetch from '@/utils/client-fetch'

export default function Main() {
  const [loading, setLoading] = React.useState(true)
  const [subscription, setSubscription] = React.useState<any>()

  React.useEffect(() => {
    const loadSubscription = async () => {
      try {
        const response = await clientFetch('subscriptions')
        if (response.ok) {
          setSubscription(await response.json())
        }
      } catch (error: any) {
        toast.error(error.message)
      }
      setLoading(false)
    }
    loadSubscription()
  }, [])

  return (
    <div className="grid grid-cols-1 gap-3 lg:max-w-[750px]">
      <Panel title="Subscription">
        {loading && <Loading />}
        {!loading && !subscription && <NotYet />}
        {!loading && subscription?.object === 'subscription' && <Recurring subscription={subscription} />}
        {!loading && subscription?.object === 'payment_intent' && <Lifetime paymentIntent={subscription} />}
      </Panel>

      <Invoices />
    </div>
  )
}

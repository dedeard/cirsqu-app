'use client'
import React from 'react'
import toast from 'react-hot-toast'
import Card from '../components/Card'
import Loading from './components/Loading'
import NotYet from './components/NotYet'
import Recurring from './components/Recurring'
import Lifetime from './components/Lifetime'
import clientFetch from '@/utils/client-fetch'

export default function SubscriptionPage() {
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
      <Card title="Subscription">
        {loading && <Loading />}
        {!loading && !subscription && <NotYet />}
        {!loading && subscription?.object === 'subscription' && <Recurring subscription={subscription} />}
        {!loading && subscription?.object === 'payment_intent' && <Lifetime paymentIntent={subscription} />}
      </Card>
    </div>
  )
}

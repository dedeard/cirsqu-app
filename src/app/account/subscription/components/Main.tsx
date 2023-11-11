'use client'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import clientFetch from '@/utils/client-fetch'
import Panel from '../../components/Panel'
import Loading from './Loading'
import NotYet from './NotYet'
import Recurring from './Recurring'
import Lifetime from './Lifetime'
import Invoices from './Invoices'

const Main: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [subscription, setSubscription] = useState<any>()

  useEffect(() => {
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
    <div className="grid grid-cols-1 gap-3">
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

export default Main

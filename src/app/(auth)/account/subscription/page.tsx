'use client'
import Card from '../components/Card'
import PaymentMethod from './PaymentMethod'
import SubscriptionProviders from './SubscriptionProviders'

export default function SubscriptionPage() {
  return (
    <SubscriptionProviders>
      <Card title="Subscription" className="mb-3 lg:max-w-[750px]"></Card>
      <PaymentMethod />
      <Card title="Billing History" className="lg:max-w-[750px]"></Card>
    </SubscriptionProviders>
  )
}

'use client'
import Card from '../components/Card'

export default function SubscriptionPage() {
  return (
    <div className="grid grid-cols-1 gap-3">
      <Card title="Subscription" className="lg:max-w-[750px]"></Card>
      <Card title="Payment Method" className="lg:max-w-[750px]"></Card>
      <Card title="Billing History" className="lg:max-w-[750px]"></Card>
    </div>
  )
}

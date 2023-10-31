import type { Metadata } from 'next'
import Main from './components/Main'

export const metadata: Metadata = {
  title: 'Your Subscription - CIRSQU',
  description:
    'This is your CIRSQU subscription page. Here, you can manage your subscription plans, check your billing details, or explore other plans. Enjoy a learning experience tailored to your needs!',
}

export default function SubscriptionPage() {
  return <Main />
}

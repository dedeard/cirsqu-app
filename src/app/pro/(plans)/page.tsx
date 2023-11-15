import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeftCircle } from 'react-feather'
import serverFetch from '@/utils/fetch/server-fetch'
import PlanItem from './components/PlanItem'
import FAQs from './components/FAQs'

export const revalidate = 7200

export const metadata: Metadata = {
  title: 'Pro - CIRSQU',
  description:
    'Upgrade to CIRSQU Pro and take your learning to the next level! Gain access to advanced courses, personalized learning paths, and premium support. Make the most of your coding journey with CIRSQU Pro.',
  openGraph: {
    title: 'Pro - CIRSQU',
    description:
      'Upgrade to CIRSQU Pro and take your learning to the next level! Gain access to advanced courses, personalized learning paths, and premium support. Make the most of your coding journey with CIRSQU Pro.',
  },
  alternates: {
    canonical: '/pro',
  },
}

export default async function PlansPage() {
  const response = await serverFetch('products', {
    next: {
      revalidate: 7200,
      tags: ['products'],
    },
  })
  if (!response.ok) {
    const data = await response.json()
    throw new Error(data.message)
  }
  const products: IProduct[] = await response.json()
  return (
    <div className="background-animate text-foreground dark min-h-screen bg-gradient-to-br from-black via-slate-950 to-black">
      <Link className="absolute block p-6 focus:outline-none" aria-label="Back toggle" href="/">
        <ArrowLeftCircle />
      </Link>
      <div className="container max-w-6xl px-3">
        <section className="flex flex-col items-center justify-center pb-12 pt-28 md:pb-28 md:pt-36">
          <div className="container flex flex-col items-center justify-center">
            <h1 className="text-center text-4xl md:w-8/12 md:text-5xl">Unlimited access with a premium membership.</h1>
            <p className="mt-4 text-center text-lg font-light md:mt-8">Join thousands of developers improving their skills every day</p>
          </div>
        </section>

        <section className="mb-12 grid grid-cols-1 gap-8 py-12 md:py-16 lg:grid-cols-3">
          {products.map((product) => (
            <div key={product.id} className="flex items-center justify-center">
              <PlanItem product={product} />
            </div>
          ))}
        </section>

        <section className="mx-auto w-full max-w-7xl px-3 pb-12 md:px-6 lg:px-8">
          <FAQs />
        </section>
      </div>
    </div>
  )
}

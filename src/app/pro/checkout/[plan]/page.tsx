import serverFetch from '@/utils/server-fetch'
import { notFound } from 'next/navigation'
import ChosenPlan from './components/ChosenPlan'
import { ArrowLeftCircle } from 'react-feather'
import Link from 'next/link'
import Checkout from './components/Checkout'

export const dynamic = 'force-dynamic'

export default async function Page({ params }: { params: { plan: string } }) {
  const res = await serverFetch(`products`, { cache: 'no-cache' })

  const products = (await res.json()) as IProduct[]

  const currentProduct = products?.find((el) => el.price.lookup_key === params.plan)

  if (!currentProduct) {
    return notFound()
  }

  return (
    <>
      <Link className="absolute block p-6 text-gray-200 focus:outline-none lg:text-slate-900" aria-label="Back toggle" href="/pro">
        <ArrowLeftCircle />
      </Link>
      <div className="grid min-h-screen grid-cols-1 bg-gray-100 dark lg:grid-cols-2">
        <ChosenPlan
          products={products}
          currentProduct={currentProduct}
          className="background-animate bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-6 py-20 text-gray-200 md:px-24 lg:px-12  xl:px-24"
        />
        <Checkout products={products} currentProduct={currentProduct} className="px-6 py-20 md:px-24 lg:order-first lg:px-12 xl:px-24" />
      </div>
    </>
  )
}

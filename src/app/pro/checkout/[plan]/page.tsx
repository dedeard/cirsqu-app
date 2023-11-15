import type { Metadata } from 'next'
import serverFetch from '@/utils/fetch/server-fetch'
import { notFound } from 'next/navigation'
import ChosenPlan from './components/ChosenPlan'
import { ArrowLeftCircle } from 'react-feather'
import Link from 'next/link'
import Checkout from './components/Checkout'

type PropTypes = {
  params: { plan: string }
}

export const runtime = 'edge'

async function getPageData({ params }: PropTypes) {
  const res = await serverFetch('products', {
    next: {
      revalidate: 7200,
      tags: ['products'],
    },
  })

  const products = (await res.json()) as IProduct[]

  const currentProduct = products?.find((el) => el.price.lookup_key === params.plan)

  if (!currentProduct) {
    return notFound()
  }

  return {
    products,
    currentProduct,
  }
}

export async function generateMetadata(props: PropTypes): Promise<Metadata> {
  const { currentProduct } = await getPageData(props)
  return {
    title: `Checkout ${currentProduct.name} - CIRSQU`,
    description:
      "You're one step away from embarking on an exciting learning journey with CIRSQU. Review your order, complete the secure payment process, and get ready to dive into the world of coding. Your future starts here!",
    openGraph: {
      title: `Checkout ${currentProduct.name} - CIRSQU`,
      description:
        "You're one step away from embarking on an exciting learning journey with CIRSQU. Review your order, complete the secure payment process, and get ready to dive into the world of coding. Your future starts here!",
    },
    alternates: {
      canonical: `/pro/checkout/${currentProduct.price.lookup_key}`,
    },
  }
}

export default async function Page(props: PropTypes) {
  const { products, currentProduct } = await getPageData(props)

  return (
    <>
      <Link title="Back to home" href="/pro" className="absolute block p-6 text-neutral-200 focus:outline-none lg:text-neutral-800">
        <ArrowLeftCircle />
      </Link>
      <div className="dark grid min-h-screen grid-cols-1 bg-neutral-100 lg:grid-cols-2">
        <ChosenPlan
          products={products}
          currentProduct={currentProduct}
          className="background-animate bg-gradient-to-br from-black via-slate-950 to-black px-6 py-20 text-neutral-200 md:px-24 lg:px-12  xl:px-24"
        />
        <Checkout products={products} currentProduct={currentProduct} className="px-6 py-20 md:px-24 lg:order-first lg:px-12 xl:px-24" />
      </div>
    </>
  )
}

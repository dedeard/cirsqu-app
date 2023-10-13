'use client'
import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowLeftCircle } from 'react-feather'
import ChosenPlan from './ChosenPlan'
import Checkout from './Checkout'

const Wrapper: React.FC<{ products: IProduct[] }> = ({ products }) => {
  const params = useSearchParams()
  const router = useRouter()

  const lookup_key = params.get('plan')
  const currentProduct = products.find((product) => product.price.lookup_key === lookup_key)

  if (!currentProduct) {
    router.push('/pro')
    return null
  }

  return (
    <>
      <button
        type="button"
        className="absolute block p-6 text-gray-200 focus:outline-none lg:text-slate-900"
        aria-label="Back toggle"
        onClick={router.back}
      >
        <ArrowLeftCircle />
      </button>
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

export default Wrapper

'use client'
import React, { useEffect, useState } from 'react'
import { IProduct } from '@/types'
import CheckoutForm from './CheckoutForm'
import LoadingCard from './LoadingCard'
import clientFetch from '@/utils/client-fetch'

type PropsType = {
  products: IProduct[]
  currentProduct: IProduct
} & React.HTMLAttributes<HTMLDivElement>

const Checkout: React.FC<PropsType> = ({ products, currentProduct, ...props }) => {
  const [clientSecret, setClientSecret] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      const res = await clientFetch(`checkout/session/${currentProduct.price.id}`, 'POST')
      if (res.ok) {
        const data = await res.json()
        window.location.href = data.url
        console.log(data)
      } else {
        setClientSecret('')
      }
      setLoading(false)
    })()
  }, [currentProduct])

  return (
    <div {...props}>
      <div className="mb-10 text-2xl font-bold tracking-wide text-slate-900">Checkout</div>
      {loading && <LoadingCard />}
      {!loading && clientSecret && <CheckoutForm clientSecret={clientSecret} />}
    </div>
  )
}

export default Checkout

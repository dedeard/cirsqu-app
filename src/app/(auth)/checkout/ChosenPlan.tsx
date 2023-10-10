import React from 'react'
import { Lock } from 'react-feather'
import { IProduct } from '@/types'
import PlanItem from './PlanItem'

type PropTypes = {
  products: IProduct[]
  currentProduct: IProduct
} & React.HTMLAttributes<HTMLDivElement>

const ChosenPlan: React.FC<PropTypes> = ({ products, currentProduct, ...props }) => {
  return (
    <div {...props}>
      <div className="mb-10 text-2xl font-bold tracking-wide">Chosen Plan</div>

      <ul className="mb-8 grid grid-cols-1 gap-4">
        {products.map((product) => (
          <PlanItem key={product.id} product={product} active={product.price.lookup_key === currentProduct.price.lookup_key} />
        ))}
      </ul>

      <p className="mb-6 font-light text-gray-400">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum iste amet reprehenderit, distinctio.
      </p>

      <p className="flex font-light text-gray-400">
        <span className="mr-3 block py-1 text-gray-600">
          <Lock className="h-4 w-4" />
        </span>
        <span className="block">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum iste amet reprehenderit, distinctio.</span>
      </p>
    </div>
  )
}

export default ChosenPlan
